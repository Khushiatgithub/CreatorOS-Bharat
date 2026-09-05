'use client';

import React, { useState, useMemo } from 'react';
import { useCreatorStore } from '@/lib/store';
import { formatINR } from '@/lib/gst';
import { 
  Users, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Search, 
  Pin, 
  Heart, 
  Send, 
  MoreVertical, 
  Lock, 
  Unlock, 
  Trash2, 
  Crown, 
  CheckCircle2, 
  X, 
  Hash, 
  Volume2, 
  Award, 
  Filter, 
  Check, 
  ExternalLink, 
  UserCheck, 
  UserX, 
  Shield, 
  Zap, 
  ArrowRight,
  Share2,
  Calendar,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Image as ImageIcon,
  Flame
} from 'lucide-react';
import { Community, CommunityPost, CommunityMember, CommunityTier } from '@/types';
import { PageTransition, HoverCard, RippleButton } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';
import UPICheckoutModal from '@/components/checkout/UPICheckoutModal';

const CATEGORIES = [
  'Tech & Engineering',
  'Product & UI/UX',
  'AI & Machine Learning',
  'Creator Economy & Growth',
  'Finance & Wealth'
];

export default function CommunityPage() {
  const {
    activeCreator,
    activeCreatorId,
    communities,
    activeCommunity,
    activeCommunityId,
    communityPosts,
    communityMembers,
    switchActiveCommunity,
    createCommunity,
    joinCommunity,
    leaveCommunity,
    createPost,
    likePost,
    addComment,
    pinPost,
    lockPost,
    deletePost,
    moderateMember
  } = useCreatorStore();

  // Navigation & Filter State
  const [activeTab, setActiveTab] = useState<'discussions' | 'announcements' | 'memberships' | 'members' | 'rules'>('discussions');
  const [selectedChannelId, setSelectedChannelId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [memberRoleFilter, setMemberRoleFilter] = useState<string>('all');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedMemberProfile, setSelectedMemberProfile] = useState<CommunityMember | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedTierForCheckout, setSelectedTierForCheckout] = useState<CommunityTier | null>(null);

  // Post composer state
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostChannelId, setNewPostChannelId] = useState<string>('');
  const [newPostTag, setNewPostTag] = useState('General');
  const [newPostMediaUrl, setNewPostMediaUrl] = useState('');
  const [newPostIsAnnouncement, setNewPostIsAnnouncement] = useState(false);
  const [showPostComposer, setShowPostComposer] = useState(false);

  // Comments drawer toggle per post
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Form state for creating new community
  const [newCommName, setNewCommName] = useState('');
  const [newCommTagline, setNewCommTagline] = useState('');
  const [newCommDescription, setNewCommDescription] = useState('');
  const [newCommCategory, setNewCommCategory] = useState(CATEGORIES[0]);
  const [newCommCoverUrl, setNewCommCoverUrl] = useState('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80');
  const [newCommChannels, setNewCommChannels] = useState('announcements, general, system-design, questions, career-advice');
  const [newCommHasPaidTier, setNewCommHasPaidTier] = useState(true);
  const [newCommPaidPrice, setNewCommPaidPrice] = useState(999);
  const [newCommPaidPerks, setNewCommPaidPerks] = useState('1:1 Mock Interviews, Private VIP Channel, Resume Review, Direct DM access');
  const [newCommRules, setNewCommRules] = useState('1. Be respectful to all members\n2. No spam or self-promotion outside #showcase\n3. Protect privacy and confidential interview questions');

  // Check if current user is community founder or moderator
  const isFounder = activeCommunity?.creatorId === activeCreatorId;
  const isJoined = activeCommunity?.isJoined;

  // Filter posts
  // Filter posts
  const filteredPosts = useMemo(() => {
    return communityPosts.filter((post) => {
      // Tab filter
      if (activeTab === 'announcements' && !post.isAnnouncement && !post.isPinned) {
        return false;
      }
      // Channel filter
      if (selectedChannelId !== 'all' && post.channelId !== selectedChannelId) {
        return false;
      }
      // Tag filter
      const postTags = post.tags || (post.categoryTag ? [post.categoryTag] : []);
      if (selectedTag !== 'all' && !postTags.includes(selectedTag)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const authorStr = post.author || post.authorName || '';
        return (
          post.title.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q) ||
          authorStr.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [communityPosts, activeTab, selectedChannelId, selectedTag, searchQuery]);

  // Unique tags for active community
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    communityPosts.forEach((p) => {
      if (p.tags) p.tags.forEach((t) => set.add(t));
      if (p.categoryTag) set.add(p.categoryTag);
    });
    return Array.from(set);
  }, [communityPosts]);

  // Filtered members
  const filteredMembers = useMemo(() => {
    return communityMembers.filter((m) => {
      if (memberRoleFilter !== 'all' && m.role !== memberRoleFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const handleStr = m.handle || m.username || '';
        return m.name.toLowerCase().includes(q) || handleStr.toLowerCase().includes(q);
      }
      return true;
    });
  }, [communityMembers, memberRoleFilter, searchQuery]);

  // Handle Post Creation
  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const channelId = newPostChannelId || (activeCommunity?.channels[0]?.id || 'general');

    createPost({
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      channelId,
      tags: newPostTag ? [newPostTag] : ['General'],
      mediaUrl: newPostMediaUrl.trim() || undefined,
      isAnnouncement: newPostIsAnnouncement
    });

    setNewPostTitle('');
    setNewPostContent('');
    setNewPostMediaUrl('');
    setNewPostIsAnnouncement(false);
    setShowPostComposer(false);
  };

  // Handle Add Comment
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    addComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  // Handle Create Community Form Submission
  const handleCreateCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommName.trim() || !newCommTagline.trim()) return;

    const channelList = newCommChannels
      .split(',')
      .map((c) => c.trim().toLowerCase().replace(/[^a-z0-9-]/g, ''))
      .filter(Boolean)
      .map((slug, idx) => ({
        id: `chan_${slug}_${Date.now()}`,
        name: slug.replace(/-/g, ' '),
        slug,
        isPrivate: false,
        icon: idx === 0 ? '📢' : '💬'
      }));

    const tiers: CommunityTier[] = [
      {
        id: `tier_free_${Date.now()}`,
        name: 'Free Community Access',
        description: 'Instant access to open discussions, public study channels, and live events.',
        price: 0,
        billingCycle: 'monthly',
        perks: ['Open discussion channels', 'Weekly community AMA access', 'Resource library'],
        type: 'free',
        membersCount: 1
      }
    ];

    if (newCommHasPaidTier) {
      tiers.push({
        id: `tier_paid_${Date.now()}`,
        name: 'VIP Inner Circle Pro',
        description: 'Exclusive tier with direct mentor access, private workshops & priority reviews.',
        price: newCommPaidPrice,
        billingCycle: 'monthly',
        perks: newCommPaidPerks.split(',').map((p) => p.trim()).filter(Boolean),
        type: 'paid',
        membersCount: 0
      });
    }

    const rulesList = newCommRules.split('\n').map((r) => r.trim()).filter(Boolean);

    createCommunity({
      name: newCommName.trim(),
      tagline: newCommTagline.trim(),
      description: newCommDescription.trim() || newCommTagline.trim(),
      category: newCommCategory,
      coverUrl: newCommCoverUrl,
      avatarUrl: activeCreator?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      channels: channelList.length > 0 ? channelList : [
        { id: 'c1', name: 'announcements', slug: 'announcements', isPrivate: false, icon: '📢' },
        { id: 'c2', name: 'general', slug: 'general', isPrivate: false, icon: '💬' }
      ],
      membershipTiers: tiers,
      rules: rulesList
    });

    setIsCreateModalOpen(false);
    // Reset inputs
    setNewCommName('');
    setNewCommTagline('');
    setNewCommDescription('');
  };

  // Handle Paid Tier UPI Checkout
  const handleUpgradeTier = (tier: CommunityTier) => {
    if (tier.type === 'free') {
      if (activeCommunity) joinCommunity(activeCommunity.id, tier.id);
    } else {
      setSelectedTierForCheckout(tier);
      setIsCheckoutOpen(true);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070B] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* TOP BAR: Header, Switcher & Create Community CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-royal-600/20 border border-royal-500/30 flex items-center justify-center text-royal-400">
                <Users className="h-5 w-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                Community Hub
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-royal-600/20 text-royal-400 border border-royal-500/30">
                  Bharat Creators
                </span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Host micro-cohorts, free & paid memberships, discussion channels, and moderated member feeds.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Community Switcher */}
            <div className="relative">
              <select
                value={activeCommunityId}
                onChange={(e) => switchActiveCommunity(e.target.value)}
                className="appearance-none bg-[#0E1322] border border-white/[0.12] rounded-xl px-4 py-2.5 pr-9 text-xs font-semibold text-white focus:outline-none focus:border-royal-500 transition cursor-pointer shadow-glass-subtle"
              >
                {communities.map((comm) => (
                  <option key={comm.id} value={comm.id} className="bg-[#0A0D17] text-white">
                    {comm.name} ({comm.membersCount} members)
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Users className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Create New Community Button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 px-4 py-2.5 text-xs font-semibold text-white shadow-royal hover:brightness-110 transition btn-press"
            >
              <Plus className="h-4 w-4" />
              <span>Create Community</span>
            </button>
          </div>
        </div>

        {/* ACTIVE COMMUNITY BANNER */}
        {activeCommunity && (
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0A0E1A] shadow-xl">
            {/* Cover image banner */}
            <div className="h-32 sm:h-44 w-full relative overflow-hidden bg-slate-900">
              <img
                src={activeCommunity.coverUrl || activeCommunity.bannerUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80'}
                alt={activeCommunity.name}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/40 to-transparent" />
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-royal-400 border border-royal-500/30">
                  {activeCommunity.category}
                </span>
                {isFounder && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Crown className="h-3 w-3" /> Host Admin
                  </span>
                )}
              </div>
            </div>

            {/* Header Details */}
            <div className="px-5 pb-5 -mt-10 sm:-mt-12 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <img
                  src={activeCommunity.avatarUrl}
                  alt={activeCommunity.name}
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl object-cover ring-4 ring-[#0A0E1A] shadow-2xl bg-slate-800"
                />
                <div className="mb-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    {activeCommunity.name}
                    <ShieldCheck className="h-4 w-4 text-royal-400" />
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-1">{activeCommunity.tagline}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-royal-400" />
                      <strong className="text-white">{activeCommunity.membersCount.toLocaleString('en-IN')}</strong> members
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
                      <strong className="text-white">{activeCommunity.postsCount}</strong> discussions
                    </span>
                    {activeCommunity.myRole && (
                      <span className="px-2 py-0.5 rounded bg-royal-600/30 text-royal-300 font-sans text-[11px] font-medium capitalize">
                        Role: {activeCommunity.myRole}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Join / Leave / Upgrade actions */}
              <div className="flex items-center gap-2.5">
                {isJoined ? (
                  <>
                    <button
                      onClick={() => setActiveTab('memberships')}
                      className="rounded-xl border border-royal-500/40 bg-royal-600/15 hover:bg-royal-600/25 px-4 py-2 text-xs font-semibold text-royal-300 transition flex items-center gap-1.5"
                    >
                      <Zap className="h-3.5 w-3.5 text-royal-400" />
                      <span>Membership Tiers</span>
                    </button>
                    {!isFounder && (
                      <button
                        onClick={() => leaveCommunity(activeCommunity.id)}
                        className="rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-2 text-xs font-medium text-rose-400 transition"
                      >
                        Leave
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => joinCommunity(activeCommunity.id)}
                    className="rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:brightness-110 px-5 py-2.5 text-xs font-bold text-white shadow-royal transition flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Join Community (Free)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'discussions', label: 'Discussion Feed', icon: MessageSquare, count: communityPosts.length },
            { id: 'announcements', label: 'Announcements', icon: Volume2, count: communityPosts.filter((p) => p.isAnnouncement || p.isPinned).length },
            { id: 'memberships', label: 'Free & Paid Tiers', icon: Crown, count: (activeCommunity?.membershipTiers || activeCommunity?.tiers || []).length },
            { id: 'members', label: 'Member Directory', icon: Users, count: communityMembers.length },
            { id: 'rules', label: 'Rules & Guidelines', icon: Shield, count: activeCommunity?.rules.length }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-royal-600 text-white shadow-royal'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT 1: DISCUSSIONS */}
        {activeTab === 'discussions' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Channel Sidebar */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-xl p-4 shadow-glass-subtle">
                <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5 text-royal-400" />
                    Channels
                  </span>
                  <span className="text-[10px] font-mono text-royal-400">{activeCommunity?.channels.length || 0}</span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedChannelId('all')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                      selectedChannelId === 'all'
                        ? 'bg-royal-600 text-white shadow-sm font-semibold'
                        : 'text-slate-300 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Flame className="h-3.5 w-3.5 text-amber-400" />
                      # all-discussions
                    </span>
                    <span className="text-[10px] font-mono opacity-70">{communityPosts.length}</span>
                  </button>

                  {activeCommunity?.channels.map((ch) => {
                    const count = communityPosts.filter((p) => p.channelId === ch.id).length;
                    const isSelected = selectedChannelId === ch.id;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => setSelectedChannelId(ch.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                          isSelected
                            ? 'bg-royal-600 text-white shadow-sm font-semibold'
                            : 'text-slate-300 hover:bg-white/[0.05]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-xs">{ch.icon || '💬'}</span>
                          <span>#{ch.slug}</span>
                        </span>
                        <span className="text-[10px] font-mono opacity-70">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tag filters */}
              {availableTags.length > 0 && (
                <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-xl p-4 shadow-glass-subtle">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Filter className="h-3.5 w-3.5 text-royal-400" />
                    Filter by Tag
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSelectedTag('all')}
                      className={`px-2.5 py-1 rounded-lg text-xs transition ${
                        selectedTag === 'all'
                          ? 'bg-royal-600 text-white font-semibold'
                          : 'bg-white/[0.04] text-slate-400 hover:text-white'
                      }`}
                    >
                      All
                    </button>
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-2.5 py-1 rounded-lg text-xs transition ${
                          selectedTag === tag
                            ? 'bg-royal-600 text-white font-semibold'
                            : 'bg-white/[0.04] text-slate-400 hover:text-white'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Search and Start Discussion Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search discussions, interview questions, tags..."
                    className="w-full bg-[#0E1322] border border-white/[0.1] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500 transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setShowPostComposer(!showPostComposer)}
                  className="rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:brightness-110 px-4 py-2.5 text-xs font-semibold text-white shadow-royal transition flex items-center justify-center gap-2 whitespace-nowrap btn-press"
                >
                  <Plus className="h-4 w-4" />
                  <span>{showPostComposer ? 'Close Composer' : 'Start Discussion'}</span>
                </button>
              </div>

              {/* POST COMPOSER */}
              <AnimatePresence>
                {showPostComposer && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl border border-royal-500/30 bg-[#0E1528] p-5 shadow-2xl relative"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={activeCreator?.avatarUrl}
                          alt={activeCreator?.name}
                          className="h-8 w-8 rounded-full object-cover ring-1 ring-royal-500"
                        />
                        <div>
                          <p className="text-xs font-semibold text-white">{activeCreator?.name}</p>
                          <p className="text-[10px] text-royal-400 font-mono">Posting as {isFounder ? 'Host' : 'Member'}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowPostComposer(false)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <form onSubmit={handlePublishPost} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                          placeholder="Discussion title (e.g. LLD / HLD design review for Swiggy food delivery)"
                          className="w-full bg-black/40 border border-white/[0.12] rounded-xl px-3.5 py-2 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Post to Channel</label>
                          <select
                            value={newPostChannelId}
                            onChange={(e) => setNewPostChannelId(e.target.value)}
                            className="w-full bg-black/40 border border-white/[0.12] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-royal-500"
                          >
                            {activeCommunity?.channels.map((ch) => (
                              <option key={ch.id} value={ch.id}>
                                #{ch.slug}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Category Tag</label>
                          <input
                            type="text"
                            value={newPostTag}
                            onChange={(e) => setNewPostTag(e.target.value)}
                            placeholder="DSA, System Design, Career"
                            className="w-full bg-black/40 border border-white/[0.12] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                          />
                        </div>
                      </div>

                      <div>
                        <textarea
                          required
                          rows={4}
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder="Share code snippets, interview experiences, architecture diagrams, or ask questions to the community..."
                          className="w-full bg-black/40 border border-white/[0.12] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500 resize-none font-sans"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          value={newPostMediaUrl}
                          onChange={(e) => setNewPostMediaUrl(e.target.value)}
                          placeholder="Optional image/media URL (https://...)"
                          className="w-full bg-black/40 border border-white/[0.12] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                        />
                      </div>

                      {isFounder && (
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id="announcementCheck"
                            checked={newPostIsAnnouncement}
                            onChange={(e) => setNewPostIsAnnouncement(e.target.checked)}
                            className="rounded bg-black border-white/20 text-royal-600 focus:ring-royal-500 cursor-pointer"
                          />
                          <label htmlFor="announcementCheck" className="text-xs text-amber-300 font-medium cursor-pointer flex items-center gap-1">
                            <Pin className="h-3 w-3" /> Pin as official community announcement
                          </label>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowPostComposer(false)}
                          className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:brightness-110 px-5 py-2 text-xs font-bold text-white shadow-royal transition flex items-center gap-1.5"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Publish Discussion</span>
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* POSTS LIST */}
              {filteredPosts.length === 0 ? (
                <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/60 p-12 text-center">
                  <MessageSquare className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                  <h3 className="text-sm font-semibold text-white">No discussions found</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Be the first to start a conversation in this channel or adjust your search filter.
                  </p>
                  <button
                    onClick={() => setShowPostComposer(true)}
                    className="mt-4 px-4 py-2 rounded-xl bg-royal-600/20 text-royal-300 border border-royal-500/30 text-xs font-semibold hover:bg-royal-600/30 transition"
                  >
                    Start Discussion
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post) => {
                    const isCommentsOpen = openCommentsPostId === post.id;
                    const channel = activeCommunity?.channels.find((c) => c.id === post.channelId);

                    return (
                      <div
                        key={post.id}
                        className={`rounded-2xl border transition duration-200 ${
                          post.isPinned
                            ? 'border-amber-500/40 bg-gradient-to-b from-[#161208]/90 to-[#0E1322]/90 shadow-lg'
                            : 'border-white/[0.08] bg-[#0E1322]/80 hover:border-white/[0.14]'
                        } p-5`}
                      >
                        {/* Pinned / Announcement Header */}
                        {post.isPinned && (
                          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-3 pb-2 border-b border-amber-500/20">
                            <Pin className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span>Pinned Community Announcement</span>
                          </div>
                        )}

                        {/* Author & Channel Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.authorAvatar}
                              alt={post.author}
                              className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10"
                            />
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-xs font-bold text-white">{post.author}</h4>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                  post.authorRole === 'creator'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : post.authorRole === 'moderator'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : post.authorRole === 'vip'
                                    ? 'bg-royal-500/20 text-royal-300 border border-royal-500/30'
                                    : 'bg-white/[0.06] text-slate-400'
                                }`}>
                                  {post.authorBadge || post.authorRole}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                                <span>{post.createdAt}</span>
                                <span>•</span>
                                <span className="text-royal-400 font-sans">#{channel?.slug || 'general'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Admin Moderation Actions */}
                          {isFounder && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => pinPost(post.id)}
                                title={post.isPinned ? 'Unpin post' : 'Pin to top'}
                                className={`p-1.5 rounded-lg text-xs transition ${
                                  post.isPinned ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                                }`}
                              >
                                <Pin className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => lockPost(post.id)}
                                title={post.isLocked ? 'Unlock comments' : 'Lock discussion comments'}
                                className={`p-1.5 rounded-lg text-xs transition ${
                                  post.isLocked ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                                }`}
                              >
                                {post.isLocked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                              </button>
                              <button
                                onClick={() => deletePost(post.id)}
                                title="Delete post"
                                className="p-1.5 rounded-lg text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 transition"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Post Title & Body */}
                        <div className="mt-3">
                          <h3 className="text-sm font-bold text-white mb-1.5">{post.title}</h3>
                          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                            {post.content}
                          </p>

                          {/* Optional media attachment */}
                          {post.mediaUrl && (
                            <div className="mt-3 rounded-xl overflow-hidden border border-white/[0.08] max-h-80 bg-black/40">
                              <img
                                src={post.mediaUrl}
                                alt="Post attachment"
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}

                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                              {post.tags.map((t) => (
                                <span
                                  key={t}
                                  className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-royal-600/15 text-royal-300 border border-royal-500/20"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons: Like, Comment, Status */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06] text-xs">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => likePost(post.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition ${
                                post.isLiked
                                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                              }`}
                            >
                              <Heart className={`h-3.5 w-3.5 ${post.isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                              <span>{post.likes}</span>
                            </button>

                            <button
                              onClick={() => setOpenCommentsPostId(isCommentsOpen ? null : post.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium transition ${
                                isCommentsOpen
                                  ? 'bg-royal-600/20 text-royal-300 border border-royal-500/30'
                                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                              }`}
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                              <span>{post.commentsCount} comments</span>
                            </button>
                          </div>

                          {post.isLocked && (
                            <span className="flex items-center gap-1 text-[11px] font-mono text-rose-400">
                              <Lock className="h-3 w-3" /> Comments Locked
                            </span>
                          )}
                        </div>

                        {/* EXPANDABLE COMMENTS DRAWER */}
                        <AnimatePresence>
                          {isCommentsOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-3 border-t border-white/[0.08] space-y-3"
                            >
                              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Discussion Replies ({post.comments?.length || 0})
                              </div>

                              {/* Comment List */}
                              <div className="space-y-2.5">
                                {post.comments && post.comments.length > 0 ? (
                                  post.comments.map((comment) => (
                                    <div
                                      key={comment.id}
                                      className="rounded-xl bg-black/40 border border-white/[0.06] p-3 space-y-1.5"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <img
                                            src={comment.authorAvatar}
                                            alt={comment.author}
                                            className="h-6 w-6 rounded-full object-cover"
                                          />
                                          <span className="text-xs font-semibold text-white">{comment.author}</span>
                                          {comment.authorRole === 'creator' && (
                                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                                              Host
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-[10px] text-slate-500 font-mono">{comment.createdAt}</span>
                                      </div>
                                      <p className="text-xs text-slate-300 pl-8">{comment.content}</p>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-xs text-slate-500 italic">No comments yet. Share your thoughts!</p>
                                )}
                              </div>

                              {/* Add comment input if not locked */}
                              {!post.isLocked ? (
                                <div className="flex items-center gap-2 pt-2">
                                  <img
                                    src={activeCreator?.avatarUrl}
                                    alt={activeCreator?.name}
                                    className="h-7 w-7 rounded-full object-cover shrink-0"
                                  />
                                  <input
                                    type="text"
                                    value={commentInputs[post.id] || ''}
                                    onChange={(e) =>
                                      setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleAddComment(post.id);
                                    }}
                                    placeholder="Write a helpful response..."
                                    className="flex-1 bg-black/50 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                                  />
                                  <button
                                    onClick={() => handleAddComment(post.id)}
                                    className="rounded-xl bg-royal-600 hover:bg-royal-500 px-3.5 py-2 text-xs font-semibold text-white transition flex items-center gap-1"
                                  >
                                    <Send className="h-3 w-3" />
                                  </button>
                                </div>
                              ) : (
                                <div className="text-center py-2 text-xs text-slate-500 bg-black/20 rounded-xl">
                                  Comments have been locked by the host.
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB CONTENT 2: ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#0E1322] to-royal-600/10 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Volume2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Official Broadcasts & Community Updates</h3>
                  <p className="text-xs text-slate-400">Important notices, event links, and curriculum updates from the host.</p>
                </div>
              </div>

              {isFounder && (
                <button
                  onClick={() => {
                    setNewPostIsAnnouncement(true);
                    setShowPostComposer(true);
                    setActiveTab('discussions');
                  }}
                  className="rounded-xl bg-amber-500 hover:bg-amber-400 text-black px-4 py-2 text-xs font-bold transition shadow-lg shrink-0 flex items-center gap-1.5"
                >
                  <Pin className="h-3.5 w-3.5" />
                  <span>Post Announcement</span>
                </button>
              )}
            </div>

            {communityPosts.filter((p) => p.isAnnouncement || p.isPinned).length === 0 ? (
              <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/60 p-12 text-center">
                <Volume2 className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-white">No active announcements</h3>
                <p className="text-xs text-slate-400 mt-1">Check back soon for official updates from the host.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {communityPosts
                  .filter((p) => p.isAnnouncement || p.isPinned)
                  .map((ann) => (
                    <div
                      key={ann.id}
                      className="rounded-2xl border border-amber-500/30 bg-[#0F1320] p-5 space-y-3 shadow-glass"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={ann.authorAvatar}
                            alt={ann.author}
                            className="h-8 w-8 rounded-full object-cover ring-2 ring-amber-400/50"
                          />
                          <div>
                            <span className="text-xs font-bold text-white flex items-center gap-1.5">
                              {ann.author}
                              <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                                {ann.authorBadge || 'Host'}
                              </span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{ann.createdAt}</span>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Pin className="h-3 w-3" /> Broadcast
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-white mb-1">{ann.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{ann.content}</p>
                      </div>

                      {ann.mediaUrl && (
                        <div className="rounded-xl overflow-hidden border border-white/[0.08] max-h-72">
                          <img src={ann.mediaUrl} alt="Announcement media" className="w-full h-full object-contain" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT 3: MEMBERSHIPS & TIERS */}
        {activeTab === 'memberships' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Choose Your Membership Tier
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Join our free discussions or upgrade to the VIP Inner Circle for 1:1 mentorship and direct UPI checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(activeCommunity?.membershipTiers || activeCommunity?.tiers || []).map((tier) => {
                const isPaid = tier.type === 'paid';
                const isCurrentTier = activeCommunity.isJoined && ((isPaid && activeCommunity.myRole === 'vip') || (!isPaid && activeCommunity.myRole === 'member'));

                return (
                  <div
                    key={tier.id}
                    className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 relative ${
                      isPaid
                        ? 'border-royal-500/40 bg-gradient-to-b from-[#0F172E] to-[#0A0E1A] shadow-royal hover:border-royal-400'
                        : 'border-white/[0.1] bg-[#0E1322]/80 hover:border-white/[0.2]'
                    }`}
                  >
                    {isPaid && (
                      <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-royal-600 text-white shadow-royal flex items-center gap-1">
                        <Crown className="h-3 w-3" /> Most Popular
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                          isPaid ? 'bg-royal-600/20 text-royal-300 border border-royal-500/30' : 'bg-white/[0.06] text-slate-300'
                        }`}>
                          {tier.name}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-white">
                            {tier.price === 0 ? 'Free' : formatINR(tier.price)}
                          </span>
                          {tier.price > 0 && (
                            <span className="text-xs text-slate-400 font-mono">/{tier.billingCycle || 'month'}</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{tier.description}</p>
                      </div>

                      <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Included Perks & Access:
                        </div>
                        {tier.perks.map((perk, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                            <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${isPaid ? 'text-royal-400' : 'text-emerald-400'}`} />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/[0.08]">
                      {isCurrentTier ? (
                        <div className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                          <Check className="h-4 w-4" /> Active Membership
                        </div>
                      ) : (
                        <button
                          onClick={() => handleUpgradeTier(tier)}
                          className={`w-full py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 btn-press shadow-lg ${
                            isPaid
                              ? 'bg-gradient-to-r from-royal-600 to-royal-700 hover:brightness-110 text-white shadow-royal'
                              : 'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.1]'
                          }`}
                        >
                          {isPaid ? (
                            <>
                              <Zap className="h-4 w-4 fill-white" />
                              <span>Subscribe with UPI (1-Click)</span>
                            </>
                          ) : (
                            <span>Join Free Tier</span>
                          )}
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB CONTENT 4: MEMBER DIRECTORY & ROLES */}
        {activeTab === 'memberships' || activeTab === 'members' ? (
          activeTab === 'members' && (
            <div className="space-y-4">
              
              {/* Member filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="flex items-center gap-2 flex-wrap">
                  {['all', 'creator', 'moderator', 'vip', 'member'].map((role) => (
                    <button
                      key={role}
                      onClick={() => setMemberRoleFilter(role)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                        memberRoleFilter === role
                          ? 'bg-royal-600 text-white shadow-sm'
                          : 'bg-white/[0.04] text-slate-400 hover:text-white'
                      }`}
                    >
                      {role === 'all' ? 'All Members' : role === 'creator' ? 'Hosts' : role === 'vip' ? 'VIPs' : role}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search members..."
                    className="w-full bg-[#0E1322] border border-white/[0.1] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                  />
                </div>
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMembers.map((member) => {
                  return (
                    <div
                      key={member.id}
                      className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-xl p-4 flex flex-col justify-between hover:border-white/[0.15] transition shadow-glass-subtle"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10"
                          />
                          {member.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#0E1322]" />
                          )}
                        </div>

                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-white truncate">{member.name}</h4>
                            {member.role === 'creator' && <Crown className="h-3.5 w-3.5 text-amber-400 shrink-0" />}
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono truncate">{member.handle}</p>
                          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                            <span className={`px-2 py-0.2 rounded text-[10px] font-semibold ${
                              member.role === 'creator'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : member.role === 'moderator'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : member.role === 'vip'
                                ? 'bg-royal-500/20 text-royal-300 border border-royal-500/30'
                                : 'bg-white/[0.06] text-slate-300'
                            }`}>
                              {member.roleBadge || member.role}
                            </span>
                            <span className="text-[10px] text-amber-400 font-mono flex items-center gap-0.5">
                              ⭐ {member.reputationPoints} pts
                            </span>
                          </div>
                        </div>
                      </div>

                      {member.bio && (
                        <p className="text-xs text-slate-300 line-clamp-2 mt-3 pt-3 border-t border-white/[0.06]">
                          {member.bio}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-white/[0.06]">
                        <button
                          onClick={() => setSelectedMemberProfile(member)}
                          className="text-xs font-medium text-royal-400 hover:text-royal-300 transition"
                        >
                          View Profile
                        </button>

                        {/* Host Moderation Quick Buttons */}
                        {isFounder && member.role !== 'creator' && (
                          <div className="flex items-center gap-1">
                            {member.role !== 'moderator' ? (
                              <button
                                onClick={() => moderateMember(member.id, 'promote_mod')}
                                title="Promote to Moderator"
                                className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-[10px] font-semibold transition"
                              >
                                + Mod
                              </button>
                            ) : (
                              <button
                                onClick={() => moderateMember(member.id, 'demote_member')}
                                title="Demote to Member"
                                className="px-2 py-1 rounded-lg bg-white/[0.06] text-slate-400 hover:bg-white/[0.1] text-[10px] font-semibold transition"
                              >
                                - Mod
                              </button>
                            )}

                            {member.role !== 'vip' ? (
                              <button
                                onClick={() => moderateMember(member.id, 'promote_vip')}
                                title="Give VIP Pro badge"
                                className="px-2 py-1 rounded-lg bg-royal-500/10 text-royal-400 hover:bg-royal-500/20 text-[10px] font-semibold transition"
                              >
                                + VIP
                              </button>
                            ) : (
                              <button
                                onClick={() => moderateMember(member.id, 'demote_member')}
                                title="Demote from VIP"
                                className="px-2 py-1 rounded-lg bg-white/[0.06] text-slate-400 hover:bg-white/[0.1] text-[10px] font-semibold transition"
                              >
                                - VIP
                              </button>
                            )}

                            <button
                              onClick={() => moderateMember(member.id, 'ban')}
                              title="Ban member"
                              className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/20 transition"
                            >
                              <UserX className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )
        ) : null}

        {/* TAB CONTENT 5: RULES & GUIDELINES */}
        {activeTab === 'rules' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="rounded-2xl border border-white/[0.1] bg-[#0E1322] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-royal-600/20 border border-royal-500/30 flex items-center justify-center text-royal-400">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Community Code of Conduct & Rules</h3>
                  <p className="text-xs text-slate-400">Maintained by {activeCommunity?.name} moderators</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {activeCommunity?.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-black/30 border border-white/[0.06]">
                    <span className="h-5 w-5 rounded-full bg-royal-600/30 text-royal-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/[0.08] text-xs text-slate-400">
                <p>
                  Violations of community rules may result in temporary post locks, tier revocation, or permanent removal by admins.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: CREATE COMMUNITY MODAL */}
        <AnimatePresence>
          {isCreateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl rounded-2xl border border-white/[0.15] bg-[#0A0D17] p-6 shadow-2xl space-y-5 my-8"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-royal-600/20 text-royal-400 flex items-center justify-center">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Create New Community</h3>
                      <p className="text-xs text-slate-400">Launch a private hub for your students & followers</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateCommunitySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Community Name *</label>
                      <input
                        type="text"
                        required
                        value={newCommName}
                        onChange={(e) => setNewCommName(e.target.value)}
                        placeholder="e.g. Bharat AI & LLM Builders"
                        className="w-full bg-black/50 border border-white/[0.12] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
                      <select
                        value={newCommCategory}
                        onChange={(e) => setNewCommCategory(e.target.value)}
                        className="w-full bg-black/50 border border-white/[0.12] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-royal-500"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Catchy Tagline *</label>
                    <input
                      type="text"
                      required
                      value={newCommTagline}
                      onChange={(e) => setNewCommTagline(e.target.value)}
                      placeholder="e.g. Master generative AI models, LangChain, and real-world deployments"
                      className="w-full bg-black/50 border border-white/[0.12] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Channels (comma-separated)</label>
                    <input
                      type="text"
                      value={newCommChannels}
                      onChange={(e) => setNewCommChannels(e.target.value)}
                      placeholder="announcements, general, system-design, questions"
                      className="w-full bg-black/50 border border-white/[0.12] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500 font-mono"
                    />
                  </div>

                  {/* Paid VIP Membership Toggle */}
                  <div className="rounded-xl border border-royal-500/30 bg-royal-600/10 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Crown className="h-3.5 w-3.5 text-amber-400" />
                          Enable Paid VIP Membership (UPI Monetization)
                        </h4>
                        <p className="text-[11px] text-slate-400">Offer an inner circle paid tier with automated UPI settlement</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={newCommHasPaidTier}
                        onChange={(e) => setNewCommHasPaidTier(e.target.checked)}
                        className="h-4 w-4 rounded bg-black border-white/20 text-royal-600 cursor-pointer"
                      />
                    </div>

                    {newCommHasPaidTier && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Monthly Price (₹ INR)</label>
                          <input
                            type="number"
                            min="99"
                            value={newCommPaidPrice}
                            onChange={(e) => setNewCommPaidPrice(Number(e.target.value))}
                            className="w-full bg-black/60 border border-white/[0.12] rounded-xl px-3 py-2 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">VIP Perks (comma separated)</label>
                          <input
                            type="text"
                            value={newCommPaidPerks}
                            onChange={(e) => setNewCommPaidPerks(e.target.value)}
                            className="w-full bg-black/60 border border-white/[0.12] rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Community Rules (One per line)</label>
                    <textarea
                      rows={3}
                      value={newCommRules}
                      onChange={(e) => setNewCommRules(e.target.value)}
                      className="w-full bg-black/50 border border-white/[0.12] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500 resize-none font-sans"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:brightness-110 px-5 py-2.5 text-xs font-bold text-white shadow-royal transition btn-press"
                    >
                      Launch Community
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 2: MEMBER PROFILE DETAIL MODAL */}
        <AnimatePresence>
          {selectedMemberProfile && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md rounded-2xl border border-white/[0.15] bg-[#0A0D17] p-6 shadow-2xl space-y-4"
              >
                <button
                  onClick={() => setSelectedMemberProfile(null)}
                  className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-4">
                  <img
                    src={selectedMemberProfile.avatarUrl}
                    alt={selectedMemberProfile.name}
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-royal-500 shadow-lg"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedMemberProfile.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedMemberProfile.handle}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-royal-600/20 text-royal-300 border border-royal-500/30">
                      {selectedMemberProfile.roleBadge || selectedMemberProfile.role}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-black/40 border border-white/[0.08] p-3 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Membership Tier:</span>
                    <span className="font-semibold text-white">{selectedMemberProfile.tierName || 'Standard Member'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Joined:</span>
                    <span className="font-mono text-white">{selectedMemberProfile.joinedAt}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Community Reputation:</span>
                    <span className="text-amber-400 font-bold">⭐ {selectedMemberProfile.reputationPoints} Points</span>
                  </div>
                </div>

                {selectedMemberProfile.bio && (
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">About</h4>
                    <p className="text-xs text-slate-300 leading-relaxed bg-black/20 p-3 rounded-xl border border-white/[0.06]">
                      {selectedMemberProfile.bio}
                    </p>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedMemberProfile(null)}
                    className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-white transition"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 3: UPI CHECKOUT FOR PAID MEMBERSHIP TIER */}
        {selectedTierForCheckout && (
          <UPICheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => {
              setIsCheckoutOpen(false);
              // Upon closing or success, join the community with paid tier
              if (activeCommunity) {
                joinCommunity(activeCommunity.id, selectedTierForCheckout.id);
              }
            }}
            item={{
              id: selectedTierForCheckout.id,
              title: `${activeCommunity?.name || 'Community'} - ${selectedTierForCheckout.name}`,
              price: selectedTierForCheckout.price,
              type: 'course'
            }}
          />
        )}

      </div>
    </PageTransition>
  );
}
