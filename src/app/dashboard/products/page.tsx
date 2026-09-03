'use client';

import React, { useState } from 'react';
import { useCreatorStore } from '@/lib/store';
import { 
  Plus, 
  FileText, 
  Star, 
  Trash2, 
  Download, 
  Zap, 
  Sparkles, 
  ShoppingBag, 
  ExternalLink,
  X,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Search,
  Filter,
  RefreshCw,
  Tag,
  CheckCircle2,
  TrendingUp,
  Layers
} from 'lucide-react';
import { DigitalProduct } from '@/types';
import { INITIAL_PRODUCTS } from '@/lib/mock-data';
import { formatINR } from '@/lib/gst';
import { PageTransition, RippleButton, HoverCard, AnimatedCounter } from '@/components/ui/motion';
import UPICheckoutModal from '@/components/checkout/UPICheckoutModal';

export default function ProductsManagerPage() {
  const { products, addProduct, deleteProduct, activeCreator } = useCreatorStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<DigitalProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // New product form
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('299');
  const [originalPrice, setOriginalPrice] = useState('999');
  const [category, setCategory] = useState('Notes & Sheets');
  const [fileType, setFileType] = useState<'PDF' | 'ZIP' | 'NOTION' | 'CODE' | 'TEMPLATE'>('PDF');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80');
  const [downloadUrl, setDownloadUrl] = useState('https://example.com/sample-notes.pdf');

  // Effective products list (with fallback to INITIAL_PRODUCTS if empty)
  const currentProducts = products && products.length > 0 ? products : INITIAL_PRODUCTS;

  // Filter products by creator or global, plus search & category
  const creatorProducts = currentProducts.filter((p) => {
    // Match creator or show all if creator match
    const creatorMatch = !p.creatorId || p.creatorId === activeCreator?.id || currentProducts.length <= 3;
    return creatorMatch;
  });

  const displayList = (creatorProducts.length > 0 ? creatorProducts : currentProducts).filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'ALL' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addProduct({
      title,
      subtitle,
      description: description || subtitle,
      price: Number(price),
      originalPrice: Number(originalPrice),
      category,
      fileType,
      coverImage,
      downloadUrl,
      features: [
        'Instant digital access upon UPI confirmation',
        'Automatic WhatsApp download link delivery',
        'Official GST Tax Invoice included'
      ]
    });

    setShowAddModal(false);
    setTitle('');
    setSubtitle('');
    setDescription('');
  };

  const totalSalesVolume = displayList.reduce((sum, p) => sum + (p.salesCount || 0) * p.price, 0);

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Digital Products Studio</span>
              <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                Razorpay & UPI Enabled
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Publish PDFs, Notion systems, and code bundles with 1-click Razorpay UPI & Card checkout.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {displayList.length > 0 && (
              <button
                type="button"
                onClick={() => setCheckoutProduct(displayList[0])}
                className="rounded-[14px] border border-royal-500/30 bg-royal-600/15 hover:bg-royal-600/25 px-3.5 py-2.5 text-xs font-semibold text-royal-300 flex items-center gap-1.5 transition btn-press"
              >
                <Zap className="h-4 w-4 text-royal-400 fill-royal-400" />
                <span>Test Razorpay Checkout</span>
              </button>
            )}

            <RippleButton
              onClick={() => setShowAddModal(true)}
              className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2.5 text-xs font-semibold text-white shadow-royal flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Product</span>
            </RippleButton>
          </div>
        </div>

        {/* TOP STATS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-[16px] bg-[#0A0E1A]/85 border border-white/[0.08]">
            <span className="text-[10px] text-slate-400 block uppercase">Active Products</span>
            <span className="font-bold text-white text-lg">{displayList.length}</span>
          </div>
          <div className="p-3.5 rounded-[16px] bg-[#0A0E1A]/85 border border-white/[0.08]">
            <span className="text-[10px] text-slate-400 block uppercase">Total Copies Sold</span>
            <span className="font-bold text-emerald-400 text-lg">
              {formatINR(displayList.reduce((s, p) => s + (p.salesCount || 0), 0))}
            </span>
          </div>
          <div className="p-3.5 rounded-[16px] bg-[#0A0E1A]/85 border border-white/[0.08]">
            <span className="text-[10px] text-slate-400 block uppercase">Estimated Volume</span>
            <span className="font-bold text-royal-400 text-lg">
              ₹{formatINR(totalSalesVolume)}
            </span>
          </div>
          <div className="p-3.5 rounded-[16px] bg-[#0A0E1A]/85 border border-white/[0.08]">
            <span className="text-[10px] text-slate-400 block uppercase">Gateway SLA</span>
            <span className="font-bold text-teal-400 text-lg">Instant UPI</span>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-[16px] bg-[#0A0E1A]/90 border border-white/[0.08]">
          
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'ALL', label: 'All Formats' },
              { id: 'Interview', label: 'Interview Prep' },
              { id: 'System Design', label: 'System Design' },
              { id: 'Career', label: 'Career Templates' },
              { id: 'Notion', label: 'Notion OS' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold whitespace-nowrap transition btn-press ${
                  selectedCategory === cat.id
                    ? 'bg-royal-600 text-white shadow-royal-sm'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or sheets..."
              className="w-full rounded-[10px] border border-white/[0.1] bg-black/50 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-royal-500 focus:outline-none"
            />
          </div>

        </div>

        {/* Product List Grid with Hover Lift Cards */}
        {displayList.length === 0 ? (
          <div className="py-16 text-center rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-6 space-y-3">
            <ShoppingBag className="h-10 w-10 text-royal-400 mx-auto opacity-70" />
            <h3 className="font-display text-base font-bold text-white">No products found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Create your first digital guide, cheat sheet, or template to start collecting direct UPI payments.
            </p>
            <RippleButton
              onClick={() => setShowAddModal(true)}
              className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2 text-xs font-bold text-white shadow-royal inline-flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Publish Product Now</span>
            </RippleButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayList.map((prod) => (
              <HoverCard
                key={prod.id}
                className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 flex flex-col justify-between shadow-glass-card hover:border-royal-500/35 group"
              >
                <div>
                  {/* Cover image & badges */}
                  <div className="relative h-44 w-full rounded-[16px] overflow-hidden mb-4 bg-black/40">
                    <img src={prod.coverImage} alt={prod.title} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-2.5 left-2.5 rounded-[8px] bg-black/85 backdrop-blur px-2 py-0.5 text-[9px] font-bold text-royal-400 border border-royal-500/30 font-mono">
                      {prod.fileType}
                    </span>
                    <span className="absolute top-2.5 right-2.5 rounded-[8px] bg-emerald-950/80 backdrop-blur px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/30 font-mono">
                      {prod.salesCount} Sold
                    </span>
                  </div>

                  {/* Title & Info */}
                  <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-slate-300">
                    {prod.category}
                  </span>
                  <h3 className="font-display text-base font-bold text-white mt-2 line-clamp-1">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {prod.subtitle || prod.description}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="mt-5 pt-3 border-t border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-lg font-bold text-white font-mono">₹{formatINR(prod.price)}</span>
                        {prod.originalPrice && (
                          <span className="text-xs text-slate-500 line-through font-mono">₹{formatINR(prod.originalPrice)}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-royal-400 font-semibold">
                        <Star className="h-3 w-3 fill-royal-400 text-royal-400" />
                        <span>{prod.rating} ({prod.reviewsCount || 42} reviews)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        title="Delete product"
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition btn-press"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <a
                        href={`/${activeCreator?.username || 'aarav.tech'}`}
                        target="_blank"
                        rel="noreferrer"
                        title="View on live storefront"
                        className="flex items-center gap-1 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-semibold transition btn-press"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5 text-royal-400" />
                      </a>
                    </div>
                  </div>

                  {/* Direct Razorpay Checkout Trigger */}
                  <button
                    type="button"
                    onClick={() => setCheckoutProduct(prod)}
                    className="w-full flex items-center justify-center gap-2 rounded-[14px] bg-royal-600/20 hover:bg-royal-600/35 border border-royal-500/35 py-2.5 text-xs font-semibold text-royal-300 hover:text-white transition btn-press shadow-sm"
                  >
                    <Zap className="h-3.5 w-3.5 text-royal-400 fill-royal-400" />
                    <span>Test Razorpay Checkout (₹{formatINR(prod.price)})</span>
                  </button>
                </div>

              </HoverCard>
            ))}
          </div>
        )}

        {/* ADD PRODUCT MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
            <div className="relative w-full max-w-lg rounded-[24px] border border-white/[0.12] bg-[#0A0D17] p-6 shadow-2xl text-slate-100 animate-scale-in my-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <h3 className="font-display text-lg font-bold text-white mb-0.5">Publish Digital Product</h3>
              <p className="text-xs text-slate-400 mb-5">Set up instant UPI delivery for your study materials or templates.</p>

              <form onSubmit={handleCreateProduct} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="SDE Coding Cheat Sheet & Interview Roadmap"
                    className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subtitle / Summary</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="500+ handpicked solutions with diagrams"
                    className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Original Price (₹)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    >
                      <option value="Interview Prep">Interview Prep</option>
                      <option value="System Design">System Design</option>
                      <option value="Career Templates">Career Templates</option>
                      <option value="Productivity & Notion">Productivity & Notion</option>
                      <option value="Notes & Sheets">Notes & Sheets</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Format Type</label>
                    <select
                      value={fileType}
                      onChange={(e) => setFileType(e.target.value as any)}
                      className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    >
                      <option value="PDF">PDF Document</option>
                      <option value="ZIP">ZIP Code Bundle</option>
                      <option value="NOTION">Notion Workspace</option>
                      <option value="TEMPLATE">Template / Doc</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Download Asset URL</label>
                  <input
                    type="url"
                    value={downloadUrl}
                    onChange={(e) => setDownloadUrl(e.target.value)}
                    className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <RippleButton
                  type="submit"
                  className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal mt-2"
                >
                  Publish & Enable Razorpay Checkout
                </RippleButton>
              </form>
            </div>
          </div>
        )}

        {/* RAZORPAY CHECKOUT MODAL SHEET */}
        {checkoutProduct && (
          <UPICheckoutModal
            isOpen={!!checkoutProduct}
            onClose={() => setCheckoutProduct(null)}
            item={{
              id: checkoutProduct.id,
              title: checkoutProduct.title,
              price: checkoutProduct.price,
              type: 'product',
              category: checkoutProduct.category,
              downloadUrl: checkoutProduct.downloadUrl
            }}
          />
        )}

      </div>
    </PageTransition>
  );
}
