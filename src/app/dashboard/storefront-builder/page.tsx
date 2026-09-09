'use client';

import React, { useState } from 'react';
import { useCreatorStore } from '@/lib/store';
import PhoneMockup from '@/components/storefront/PhoneMockup';
import StorefrontContent from '@/components/storefront/StorefrontContent';
import { 
  Palette, 
  User, 
  Smartphone, 
  Check, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Globe, 
  Save, 
  ShieldCheck,
  ArrowUpRight,
  Camera,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { THEMES } from '@/lib/mock-data';
import { PageTransition, RippleButton, HoverCard } from '@/components/ui/motion';
import { motion } from 'framer-motion';

const AVATAR_PRESETS = [
  { name: 'Aarav', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Ananya', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { name: 'Priya', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
  { name: 'Rohan', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
  { name: 'Sneha', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
  { name: 'Diya', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
];

export default function StorefrontBuilderPage() {
  const { 
    activeCreator, 
    activeTheme, 
    updateCreator, 
    products, 
    courses, 
    bookingServices,
    creators
  } = useCreatorStore();

  const [activeTab, setActiveTab] = useState<'theme' | 'profile' | 'links' | 'payouts'>('theme');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const fallbackCreator = activeCreator || creators[0];

  // Local form state
  const [name, setName] = useState(activeCreator?.name || fallbackCreator.name);
  const [avatarUrl, setAvatarUrl] = useState(activeCreator?.avatarUrl || fallbackCreator.avatarUrl || '/avatars/user-avatar.png');
  const [tagline, setTagline] = useState(activeCreator?.tagline || fallbackCreator.tagline);
  const [bio, setBio] = useState(activeCreator?.bio || fallbackCreator.bio);
  const [category, setCategory] = useState(activeCreator?.category || fallbackCreator.category);
  const [location, setLocation] = useState(activeCreator?.location || fallbackCreator.location);
  const [themeId, setThemeId] = useState(activeCreator?.themeId || fallbackCreator.themeId || 'linear-royal');
  const [upiId, setUpiId] = useState(activeCreator?.upiId || fallbackCreator.upiId);
  const [upiName, setUpiName] = useState(activeCreator?.upiName || fallbackCreator.upiName);
  const [gstNumber, setGstNumber] = useState(activeCreator?.gstNumber || fallbackCreator.gstNumber || '');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Custom links state
  const [links, setLinks] = useState(activeCreator?.customLinks || fallbackCreator.customLinks || []);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setAvatarUrl(base64);
        updateCreator({ avatarUrl: base64 });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateCreator({
      name,
      avatarUrl,
      tagline,
      bio,
      category,
      location,
      themeId,
      upiId,
      upiName,
      gstNumber,
      customLinks: links
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddLink = () => {
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) return;
    const newLink = {
      id: `link_${Date.now()}`,
      title: newLinkTitle,
      url: newLinkUrl,
      highlight: true
    };
    const updated = [...links, newLink];
    setLinks(updated);
    setNewLinkTitle('');
    setNewLinkUrl('');
    updateCreator({ customLinks: updated });
  };

  const handleDeleteLink = (id: string) => {
    const updated = links.filter((l) => l.id !== id);
    setLinks(updated);
    updateCreator({ customLinks: updated });
  };

  const currentPreviewTheme = THEMES.find((t) => t.id === themeId) || activeTheme;
  const currentPreviewCreator = {
    ...fallbackCreator,
    name,
    avatarUrl,
    tagline,
    bio,
    category,
    location,
    themeId,
    upiId,
    upiName,
    gstNumber,
    customLinks: links
  };

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Top Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Storefront Studio & Theme Builder</span>
              <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                Framer Live Sync
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Customize your bio-link storefront themes, verified profile, and custom links in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={`/${activeCreator?.username}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-[14px] border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] transition btn-press"
            >
              <ArrowUpRight className="h-3.5 w-3.5 text-royal-400" />
              <span>Open Live Store</span>
            </a>
            <RippleButton
              onClick={handleSave}
              className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2 text-xs font-bold text-white shadow-royal"
            >
              <Save className="h-3.5 w-3.5" />
              <span>{savedSuccess ? 'Saved Changes!' : 'Save & Publish'}</span>
            </RippleButton>
          </div>
        </div>

        {/* 2-Column Split: Controls on Left (7 cols), iPhone Mockup on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Studio Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Navigation Tabs - 20px rounded */}
            <div className="flex items-center gap-1 p-1 rounded-[16px] bg-white/[0.04] border border-white/[0.08]">
              {[
                { id: 'theme', label: 'Color Theme', icon: Palette },
                { id: 'profile', label: 'Profile & Bio', icon: User },
                { id: 'links', label: 'Bio Links', icon: Globe },
                { id: 'payouts', label: 'UPI & GST', icon: ShieldCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[12px] text-xs font-semibold transition btn-press ${
                      isActive
                        ? 'bg-royal-600 text-white shadow-royal-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: THEMES SELECTION */}
            {activeTab === 'theme' && (
              <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
                <div>
                  <h3 className="font-display text-base font-bold text-white">Curated Aesthetic Themes</h3>
                  <p className="text-xs text-slate-400">Select a colorway tailored for Indian creators.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  {THEMES.map((th) => {
                    const isSelected = themeId === th.id;
                    return (
                      <HoverCard
                        hoverY={-2}
                        key={th.id}
                        onClick={() => setThemeId(th.id)}
                        className={`cursor-pointer rounded-[18px] border p-4 transition text-left ${
                          isSelected
                            ? 'border-royal-500 bg-royal-600/15 shadow-royal-sm ring-1 ring-royal-500/40'
                            : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.18]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: th.accentColor }} />
                            <span className="font-semibold text-xs text-white">{th.name}</span>
                          </div>
                          {isSelected && (
                            <div className="h-5 w-5 rounded-full bg-royal-600 text-white flex items-center justify-center">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </div>

                        {/* Theme Preview Swatch */}
                        <div className={`h-12 w-full rounded-[12px] bg-gradient-to-r ${th.bgGradient} border border-white/10 p-2 flex items-center justify-between`}>
                          <span className="text-[10px] font-mono text-white/80">{th.id}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/40 text-white">Preview</span>
                        </div>
                      </HoverCard>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: PROFILE & BIO */}
            {activeTab === 'profile' && (
              <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-5">
                <div>
                  <h3 className="font-display text-base font-bold text-white">Creator Bio & Identity</h3>
                  <p className="text-xs text-slate-400">Update how your audience sees you on your bio link storefront.</p>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarFileUpload}
                  accept="image/png, image/jpeg, image/webp, image/gif"
                  className="hidden"
                />

                {/* Profile Picture Section */}
                <div className="p-4 rounded-[18px] bg-white/[0.02] border border-white/[0.08] space-y-3">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    Profile Picture / Avatar
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative group shrink-0">
                      <img
                        src={avatarUrl}
                        alt="Avatar Preview"
                        className="h-16 w-16 rounded-full object-cover ring-2 ring-royal-500/50 shadow-md bg-black"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-200 cursor-pointer"
                        title="Upload Photo"
                      >
                        <Camera className="h-4 w-4 text-royal-400" />
                      </button>
                    </div>

                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] bg-royal-600 hover:bg-royal-500 text-white text-xs font-semibold shadow-royal-sm transition btn-press cursor-pointer"
                        >
                          <Upload className="h-3.5 w-3.5" />
                          <span>Upload Photo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const initialsUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || 'Creator')}&backgroundColor=0f172a,1e293b&textColor=38bdf8`;
                            setAvatarUrl(initialsUrl);
                            updateCreator({ avatarUrl: initialsUrl });
                          }}
                          className="px-3 py-1.5 rounded-[10px] bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 text-xs font-medium border border-white/[0.08] transition"
                        >
                          Generate Initials
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400">JPG, PNG or WEBP up to 5MB</p>
                    </div>
                  </div>

                  {/* Preset Quick Chooser */}
                  <div className="pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] text-slate-400 font-mono mb-1.5 block">Or select a quick preset:</span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {AVATAR_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setAvatarUrl(preset.url);
                            updateCreator({ avatarUrl: preset.url });
                          }}
                          className={`shrink-0 rounded-full p-0.5 border transition cursor-pointer ${
                            avatarUrl === preset.url
                              ? 'border-royal-500 ring-2 ring-royal-500/50 scale-105'
                              : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                          }`}
                          title={preset.name}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Display Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Tagline (One-liner)</label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Extended Bio</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Niche Category</label>
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">City / Region</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CUSTOM BIO LINKS */}
            {activeTab === 'links' && (
              <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
                <div>
                  <h3 className="font-display text-base font-bold text-white">Highlighted Bio Links</h3>
                  <p className="text-xs text-slate-400">Linktree-style featured buttons appearing at the top of your bio.</p>
                </div>

                <div className="space-y-2.5">
                  {links.map((lnk) => (
                    <div key={lnk.id} className="flex items-center justify-between p-3 rounded-[16px] bg-white/[0.03] border border-white/[0.08]">
                      <div>
                        <p className="font-semibold text-xs text-white">{lnk.title}</p>
                        <p className="text-[11px] text-royal-400 font-mono">{lnk.url}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteLink(lnk.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/[0.08] space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Add New Link</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newLinkTitle}
                      onChange={(e) => setNewLinkTitle(e.target.value)}
                      placeholder="Button Label (e.g. Free Discord)"
                      className="rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    />
                    <input
                      type="url"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      placeholder="https://discord.gg/..."
                      className="rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleAddLink}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-[14px] bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white transition btn-press border border-white/[0.08]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Link Button</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: UPI & GST SETTINGS */}
            {activeTab === 'payouts' && (
              <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
                <div>
                  <h3 className="font-display text-base font-bold text-white">Indian Payment & Tax Settings</h3>
                  <p className="text-xs text-slate-400">Configure your primary UPI VPA and SAC tax details.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Primary UPI ID (VPA)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="creator@okaxis"
                    className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none transition"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Directly receives instant payments from PhonePe, GPay, Paytm, and BHIM.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">UPI Payee Display Name</label>
                  <input
                    type="text"
                    value={upiName}
                    onChange={(e) => setUpiName(e.target.value)}
                    placeholder="Aarav Sharma Tech"
                    className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">GSTIN (Optional)</label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    placeholder="29AAECS4567M1ZV"
                    className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none transition"
                  />
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Live Responsive Phone Mockup (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="flex items-center justify-between w-full max-w-[390px] mb-3 px-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Smartphone className="h-3.5 w-3.5 text-royal-400" />
                <span>Real-Time Store Preview</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                Sync Active
              </span>
            </div>

            <PhoneMockup>
              <StorefrontContent
                creator={currentPreviewCreator as any}
                theme={currentPreviewTheme}
                products={products}
                courses={courses}
                bookingServices={bookingServices}
                isMobilePreview={true}
              />
            </PhoneMockup>
          </div>

        </div>

      </div>
    </PageTransition>
  );
}
