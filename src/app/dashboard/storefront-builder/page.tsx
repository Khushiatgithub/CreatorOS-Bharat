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
  ArrowUpRight 
} from 'lucide-react';
import { THEMES } from '@/lib/mock-data';
import { PageTransition, RippleButton, HoverCard } from '@/components/ui/motion';
import { motion } from 'framer-motion';

export default function StorefrontBuilderPage() {
  const { 
    activeCreator, 
    activeTheme, 
    updateCreator, 
    products, 
    courses, 
    bookingServices 
  } = useCreatorStore();

  const [activeTab, setActiveTab] = useState<'theme' | 'profile' | 'links' | 'payouts'>('theme');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Local form state
  const [name, setName] = useState(activeCreator?.name || '');
  const [tagline, setTagline] = useState(activeCreator?.tagline || '');
  const [bio, setBio] = useState(activeCreator?.bio || '');
  const [category, setCategory] = useState(activeCreator?.category || '');
  const [location, setLocation] = useState(activeCreator?.location || '');
  const [themeId, setThemeId] = useState(activeCreator?.themeId || 'linear-royal');
  const [upiId, setUpiId] = useState(activeCreator?.upiId || '');
  const [upiName, setUpiName] = useState(activeCreator?.upiName || '');
  const [gstNumber, setGstNumber] = useState(activeCreator?.gstNumber || '');

  // Custom links state
  const [links, setLinks] = useState(activeCreator?.customLinks || []);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  const handleSave = () => {
    updateCreator({
      name,
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
    ...activeCreator,
    name,
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
              <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
                <div>
                  <h3 className="font-display text-base font-bold text-white">Creator Bio & Identity</h3>
                  <p className="text-xs text-slate-400">Update how your audience sees you on your bio link storefront.</p>
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
