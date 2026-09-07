'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCreatorStore } from '@/lib/store';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Download, 
  FileText, 
  Layers, 
  Receipt, 
  Share2, 
  Sparkles, 
  Check, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Eye,
  Clock,
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';
import UPICheckoutModal from '@/components/checkout/UPICheckoutModal';
import { formatINR } from '@/lib/gst';
import { PageTransition, RippleButton, HoverCard } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const rawUsername = params?.username as string;
  const username = decodeURIComponent(rawUsername || '');
  const productId = params?.productId as string;

  const { allProducts, creators } = useCreatorStore();

  const creator = creators.find((c) => c.username.toLowerCase() === username.toLowerCase()) || creators[0];
  const product = allProducts.find((p) => p.id === productId) || allProducts[0];

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Other related products by the same creator
  const relatedProducts = allProducts.filter((p) => p.id !== product?.id && (!p.creatorId || p.creatorId === creator?.id));

  // Preview images mock for rich product previews
  const previewImages = [
    product?.coverImage,
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80'
  ].filter(Boolean) as string[];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#05070B] text-white flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <h2 className="text-xl font-bold">Product Not Found</h2>
          <p className="text-xs text-slate-400">The requested digital asset or study guide could not be located.</p>
          <Link
            href={`/${creator?.username || 'aarav.tech'}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-royal-600 text-xs font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to {creator?.name || 'Creator'}'s Store</span>
          </Link>
        </div>
      </div>
    );
  }

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070B] text-slate-100 font-sans selection:bg-royal-600 selection:text-white">
        
        {/* Top Sticky Mini Header */}
        <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#05070B]/85 backdrop-blur-2xl px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link
              href={`/${creator.username}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Storefront</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 text-xs text-slate-300 transition"
                title="Share product link"
              >
                <Share2 className="h-3.5 w-3.5 text-royal-400" />
                <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>

              <RippleButton
                onClick={() => setShowCheckoutModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-royal-600 hover:bg-royal-500 px-4 py-1.5 text-xs font-bold text-white shadow-royal"
              >
                <Zap className="h-3.5 w-3.5 fill-white" />
                <span>Buy with UPI (₹{formatINR(product.price)})</span>
              </RippleButton>
            </div>
          </div>
        </header>

        {/* Main Product Container */}
        <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-12">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono overflow-x-auto no-scrollbar">
            <Link href={`/${creator.username}`} className="hover:text-white transition">/{creator.username}</Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <Link href={`/${creator.username}#offerings-section`} className="hover:text-white transition">{product.category}</Link>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-slate-200 truncate max-w-xs">{product.title}</span>
          </div>

          {/* Product Hero: Two Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Product Visuals */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main High-Res Image Card */}
              <div className="relative aspect-[4/3] w-full rounded-[24px] overflow-hidden border border-white/[0.12] bg-[#0A0E1A] shadow-2xl group">
                <img
                  src={previewImages[activeImageIndex] || product.coverImage}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded-[10px] bg-black/85 backdrop-blur-md px-3 py-1 text-xs font-bold text-royal-400 border border-royal-500/30 font-mono">
                    {product.fileType}
                  </span>
                  {product.fileSizeBytes && (
                    <span className="rounded-[10px] bg-black/85 backdrop-blur-md px-3 py-1 text-xs font-semibold text-slate-300 border border-white/[0.1] font-mono">
                      {product.fileSizeBytes}
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4">
                  <span className="rounded-[10px] bg-emerald-950/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30 font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Instant Delivery</span>
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPreviewImage(previewImages[activeImageIndex] || product.coverImage)}
                  className="absolute bottom-4 right-4 rounded-xl bg-black/80 backdrop-blur border border-white/[0.15] p-2.5 text-white hover:bg-black transition opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-semibold"
                  title="Expand image preview"
                >
                  <Eye className="h-4 w-4 text-royal-400" />
                  <span>Enlarge Preview</span>
                </button>
              </div>

              {/* Preview Image Thumbnails Carousel */}
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
                {previewImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-20 w-24 rounded-[16px] overflow-hidden shrink-0 border transition-all ${
                      activeImageIndex === idx
                        ? 'border-royal-500 ring-2 ring-royal-500/40 scale-105'
                        : 'border-white/[0.08] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* GST Tax Invoice Guarantee Box */}
              <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0D17]/85 p-4.5 space-y-2.5">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-xs">
                  <Receipt className="h-4 w-4" />
                  <span>Official GST Tax Invoice Included (SAC 998439)</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tax invoice with CGST + SGST (18%) itemized calculation generated instantly upon UPI completion. Compatible for business expense claiming.
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                  <span>✓ 100% Direct UPI</span>
                  <span>•</span>
                  <span>✓ WhatsApp Delivery</span>
                  <span>•</span>
                  <span>✓ Lifetime Access</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Info & Purchase Action */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Category & Ratings Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-lg bg-royal-600/20 text-royal-300 border border-royal-500/30 px-3 py-1 text-xs font-semibold">
                  {product.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold font-mono">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewsCount || 42} verified reviews)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {product.title}
                </h1>
                {product.subtitle && (
                  <p className="text-sm sm:text-base text-slate-300 font-medium mt-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Pricing Block */}
              <div className="rounded-[22px] border border-white/[0.1] bg-gradient-to-r from-royal-950/40 to-[#0A0D17] p-5 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl sm:text-4xl font-extrabold text-white font-mono">
                      ₹{formatINR(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-slate-500 line-through font-mono">
                        ₹{formatINR(product.originalPrice)}
                      </span>
                    )}
                    {discountPercent && (
                      <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold font-mono">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">All taxes included</span>
                </div>

                {/* Primary Buy with UPI Button */}
                <RippleButton
                  onClick={() => setShowCheckoutModal(true)}
                  className="w-full rounded-[16px] bg-gradient-to-r from-royal-600 via-blue-600 to-royal-500 hover:from-royal-500 hover:to-royal-400 py-3.5 text-sm font-bold text-white shadow-royal flex items-center justify-center gap-2"
                >
                  <Zap className="h-4 w-4 fill-white" />
                  <span>Buy with UPI (₹{formatINR(product.price)})</span>
                </RippleButton>

                {/* Accepted Payment VPAs Strip */}
                <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-slate-400">
                  <span>PhonePe</span>
                  <span>•</span>
                  <span>Google Pay</span>
                  <span>•</span>
                  <span>Paytm</span>
                  <span>•</span>
                  <span>CRED</span>
                  <span>•</span>
                  <span>Cards / Netbanking</span>
                </div>
              </div>

              {/* Creator Information Strip */}
              <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={creator.avatarUrl}
                    alt={creator.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-royal-500/50 p-0.5 bg-black shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-display text-sm font-bold text-white">{creator.name}</h4>
                      {creator.verified && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-royal-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{creator.tagline}</p>
                  </div>
                </div>

                <Link
                  href={`/${creator.username}`}
                  className="rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-slate-200 transition shrink-0 flex items-center gap-1"
                >
                  <span>View Store</span>
                  <ArrowUpRight className="h-3 w-3 text-royal-400" />
                </Link>
              </div>

              {/* What's Included / Key Features Checklist */}
              <div className="space-y-3 pt-2">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-royal-400 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>What's Included in This Package</span>
                </h3>

                <div className="space-y-2.5">
                  {(product.features && product.features.length > 0 ? product.features : [
                    'Instant digital access upon UPI payment confirmation',
                    'High-resolution PDF roadmap with visual diagrams',
                    'Curated problem index with time complexity breakdowns',
                    'Lifetime access with free future roadmap updates',
                    'Official GST Tax Invoice delivered directly to email'
                  ]).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Detailed Product Description Section */}
          <section className="rounded-[24px] border border-white/[0.08] bg-[#0A0D17]/90 p-6 sm:p-8 space-y-6">
            <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-royal-400" />
              <span>Full Product Overview & Details</span>
            </h2>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
              <p>
                {product.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
                <div className="p-4 rounded-[16px] bg-black/40 border border-white/[0.04]">
                  <span className="text-[10px] font-bold text-royal-400 uppercase tracking-wider block font-mono">Format</span>
                  <span className="text-sm font-bold text-white mt-1 block">{product.fileType} Document</span>
                  <span className="text-xs text-slate-400 mt-0.5 block">Cross-platform readable on Mobile, Tablet & PC</span>
                </div>
                
                <div className="p-4 rounded-[16px] bg-black/40 border border-white/[0.04]">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block font-mono">Delivery Method</span>
                  <span className="text-sm font-bold text-white mt-1 block">Instant WhatsApp & Email</span>
                  <span className="text-xs text-slate-400 mt-0.5 block">Direct download link sent within 5 seconds</span>
                </div>

                <div className="p-4 rounded-[16px] bg-black/40 border border-white/[0.04]">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block font-mono">Support & Updates</span>
                  <span className="text-sm font-bold text-white mt-1 block">Lifetime Access</span>
                  <span className="text-xs text-slate-400 mt-0.5 block">Access all future revisions at no additional charge</span>
                </div>
              </div>
            </div>
          </section>

          {/* Related Products by Creator */}
          {relatedProducts.length > 0 && (
            <section className="space-y-5 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold text-white">More Offerings from {creator.name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Complementary study sheets, interview bundles, and architectural templates.</p>
                </div>
                <Link
                  href={`/${creator.username}#offerings-section`}
                  className="text-xs font-semibold text-royal-400 hover:text-royal-300 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedProducts.slice(0, 3).map((rel) => (
                  <HoverCard key={rel.id} hoverY={-4}>
                    <div 
                      onClick={() => router.push(`/${creator.username}/product/${rel.id}`)}
                      className="cursor-pointer rounded-[20px] border border-white/[0.08] bg-[#0A0D17]/80 p-4 flex flex-col justify-between hover:border-royal-500/40 hover:bg-[#0A0D17] transition shadow-glass-card group h-full"
                    >
                      <div>
                        <div className="relative h-36 w-full rounded-[14px] overflow-hidden bg-black/40 mb-3">
                          <img src={rel.coverImage} alt={rel.title} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                          <span className="absolute top-2 left-2 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[9px] font-bold text-royal-400 font-mono">
                            {rel.fileType}
                          </span>
                        </div>

                        <span className="text-[10px] font-semibold text-royal-400 font-mono uppercase">{rel.category}</span>
                        <h4 className="font-display text-sm font-bold text-white mt-1 line-clamp-1 group-hover:text-royal-300 transition-colors">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {rel.subtitle || rel.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] mt-4">
                        <span className="font-display text-base font-bold text-white font-mono">₹{formatINR(rel.price)}</span>
                        <span className="text-xs font-semibold text-royal-400 flex items-center gap-1">
                          <span>View Details</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </HoverCard>
                ))}
              </div>
            </section>
          )}

        </main>

        {/* Enlarged Image Preview Modal */}
        {selectedPreviewImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in" onClick={() => setSelectedPreviewImage(null)}>
            <div className="relative max-w-4xl w-full max-h-[85vh] rounded-[24px] overflow-hidden border border-white/[0.15] bg-[#0A0D17] shadow-2xl">
              <img src={selectedPreviewImage} alt="Preview" className="w-full h-full object-contain max-h-[80vh]" />
              <button
                onClick={() => setSelectedPreviewImage(null)}
                className="absolute top-4 right-4 rounded-full bg-black/80 p-2 text-white hover:bg-black"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Razorpay UPI Checkout Modal */}
        {showCheckoutModal && (
          <UPICheckoutModal
            isOpen={showCheckoutModal}
            onClose={() => setShowCheckoutModal(false)}
            item={{
              id: product.id,
              title: product.title,
              price: product.price,
              type: 'product',
              category: product.category,
              downloadUrl: product.downloadUrl
            }}
          />
        )}

      </div>
    </PageTransition>
  );
}
