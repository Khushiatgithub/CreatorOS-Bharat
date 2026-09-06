'use client';

import React, { useState, useEffect } from 'react';
import { useCreatorStore } from '@/lib/store';
import { 
  Bot, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Zap, 
  Users, 
  Target, 
  Check, 
  ArrowRight, 
  RefreshCw, 
  Flame, 
  ChevronRight, 
  ShieldCheck, 
  Percent, 
  ShoppingBag, 
  DollarSign, 
  MessageSquare, 
  CheckCircle2,
  Tag,
  BarChart3,
  Award,
  Calendar,
  Layers,
  Sliders,
  Send,
  HelpCircle,
  X,
  ExternalLink,
  Lightbulb,
  ArrowUpRight,
  TrendingDown,
  Info,
  Smartphone,
  Share2,
  Bell,
  MapPin,
  Laptop,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  History,
  Activity
} from 'lucide-react';
import { HoverCard, RippleButton, AnimatedCounter, PageTransition, FadeIn } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';
import { formatINR, formatINRDecimal } from '@/lib/gst';
import Link from 'next/link';

export interface PriceHistoryPoint {
  date: string;
  price: number;
  orders?: number;
  conversionRate?: number;
  label?: string;
  changeType?: string;
}

export interface ProductOptimizationItem {
  productId: string;
  title: string;
  category?: string;
  currentPrice: number;
  suggestedPrice: number;
  baselinePrice?: number;
  priceDiff: number;
  expectedRevenueIncrease: number;
  elasticity: string;
  confidence: number;
  reason: string;
  coverImage: string;
  history?: PriceHistoryPoint[];
}

export interface HourlyHeatmapCell {
  hour: number;
  hourLabel: string;
  intensity: number;
  expectedReach: number;
  expectedConversion: number;
  salesCount: number;
  isGoldenHour: boolean;
  isPeak: boolean;
  tag: string;
  bestFormat: string;
  tip?: string;
}

export interface DayHeatmapRow {
  dayIndex: number;
  dayShort: string;
  dayName: string;
  peakWindow: string;
  dayScore: number;
  bestFormat?: string;
  tip?: string;
  hours: HourlyHeatmapCell[];
}

export interface BestTimeToPostData {
  bestDay: string;
  bestDaySecondary?: string;
  bestHour: string;
  bestHourNumber: number;
  expectedReach: number;
  expectedReachFormatted: string;
  expectedConversion: number;
  expectedConversionFormatted: string;
  reachMultiplier: string;
  confidence: number;
  analyzedSalesCount: number;
  analyzedEngagementCount: number;
  goldenHours: { day: string; time: string; format: string; reach: number; conversion: number }[];
  heatmap: DayHeatmapRow[];
}

interface AICoachData {
  creator: {
    id: string;
    name: string;
    state: string;
  };
  metrics: {
    monthlyRevenue: number;
    aov: number;
    returningCustomerPct: number;
    membershipMRR: number;
    bookingUtilization: number;
    topPerformingCategory: {
      name: string;
      revenue: number;
      salesCount: number;
      sharePct: number;
    };
  };
  hero: {
    title: string;
    healthScore: number;
    healthScoreMax: number;
    healthTier: string;
    growthTrend: string;
    aiConfidence: number;
    weeklyChange: string;
    lastUpdated: string;
  };
  revenueIntelligence: {
    predictedRevenue30Days: number;
    predictedGrowthPct: number;
    currentGMV: number;
    monthlyRevenue: number;
    aov: number;
    conversionRate: number;
    totalOrders: number;
    bestSellingProduct: {
      id: string;
      title: string;
      price: number;
      salesCount: number;
      grossRevenue: number;
      conversionRate: string;
      coverImage: string;
    };
    lowestPerformingProduct: {
      id: string;
      title: string;
      price: number;
      salesCount: number;
      grossRevenue: number;
      conversionRate: string;
      recommendation: string;
      coverImage: string;
    };
    channelBreakdown: { name: string; amount: number; percentage: number }[];
  };
  priceOptimization: {
    totalExpectedIncrease: number;
    suggestions: ProductOptimizationItem[];
  };
  bestTimeToPost: BestTimeToPostData;
  audienceInsights: {
    topCities: { name: string; percentage: number; studentRatio: string }[];
    ageGroups: { label: string; percentage: number; badge: string }[];
    deviceUsage: {
      mobile: number;
      desktop: number;
      paymentApps: { name: string; percentage: number; speed: string }[];
    };
    returningCustomers: {
      cohortSize: number;
      repeatPurchaseRate: string;
      ltvMultiplier: string;
      summary: string;
    };
  };
  smartRecommendations: {
    postingSchedule: {
      bestDays: string;
      bestTime: string;
      confidence: number;
      channelAnalysis: { platform: string; time: string; impact: string }[];
    };
    webinarLaunch: {
      recommendedTitle: string;
      recommendedDayTime: string;
      recommendedTicketPrice: number;
      targetSeats: number;
      projectedRevenue: number;
      reason: string;
    };
    membershipUpsell: {
      targetCohortCount: number;
      membershipPlanName: string;
      monthlyPrice: number;
      currentMRR?: number;
      recommendedDiscountCode: string;
      expectedConversionPct: number;
      expectedARRAddition: number;
    };
    brandCollaboration: {
      suggestedBrand: string;
      category: string;
      matchScore: number;
      suggestedFee: number;
      proposedDeliverable: string;
      reason: string;
    };
  };
}

const DEFAULT_COACH_DATA: AICoachData = {
  creator: {
    id: 'creator_aarav',
    name: 'Aarav Sharma',
    state: 'Karnataka'
  },
  metrics: {
    monthlyRevenue: 258000,
    aov: 349,
    returningCustomerPct: 28.4,
    membershipMRR: 124800,
    bookingUtilization: 78.5,
    topPerformingCategory: {
      name: 'System Design & FAANG Roadmaps',
      revenue: 148500,
      salesCount: 890,
      sharePct: 58
    }
  },
  hero: {
    title: 'AI Business Coach',
    healthScore: 94,
    healthScoreMax: 100,
    healthTier: 'Top 2% Creator Tier',
    growthTrend: '+34.2% MoM',
    aiConfidence: 96.8,
    weeklyChange: '+4.8 pts this week',
    lastUpdated: new Date().toISOString()
  },
  revenueIntelligence: {
    predictedRevenue30Days: 185000,
    predictedGrowthPct: 34.2,
    currentGMV: 258000,
    monthlyRevenue: 258000,
    aov: 349,
    conversionRate: 12.5,
    totalOrders: 4280,
    bestSellingProduct: {
      id: 'prod_sys_design',
      title: 'System Design Interview Blueprint (FAANG Edition)',
      price: 499,
      salesCount: 890,
      grossRevenue: 444110,
      conversionRate: '14.8%',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80'
    },
    lowestPerformingProduct: {
      id: 'prod_notion',
      title: 'Notion Freelance Invoice & Client Tracker',
      price: 199,
      salesCount: 42,
      grossRevenue: 8358,
      conversionRate: '3.2%',
      recommendation: 'Bundle as a free bonus with live courses or increase thumbnail CTR with Indian student case studies.',
      coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80'
    },
    channelBreakdown: [
      { name: 'Digital PDF Notes', amount: 116100, percentage: 45 },
      { name: 'Live Cohort Courses', amount: 82560, percentage: 32 },
      { name: '1:1 Mentorship Bookings', amount: 38700, percentage: 15 },
      { name: 'Community Memberships', amount: 20640, percentage: 8 }
    ]
  },
  priceOptimization: {
    totalExpectedIncrease: 58600,
    suggestions: [
      {
        productId: 'prod_dsa_sheet',
        title: 'DSA Cracking Master Sheet (SDE Sheet Bharat)',
        category: 'Interview Prep',
        currentPrice: 299,
        suggestedPrice: 349,
        baselinePrice: 299,
        priceDiff: 50,
        expectedRevenueIncrease: 18400,
        elasticity: 'Extremely Inelastic (<0.8% drop)',
        confidence: 96,
        reason: '88% of buyers checkout under 40s via 1-click PhonePe/GPay. A ₹50 increase lifts monthly bottom-line with zero volume impact.',
        coverImage: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=600&q=80',
        history: [
          { date: 'Jan 2026', price: 249, orders: 180, conversionRate: 12.2, label: 'Launch' },
          { date: 'Feb 2026', price: 299, orders: 240, conversionRate: 14.5, label: 'Previous' },
          { date: 'Current', price: 299, orders: 310, conversionRate: 14.8, label: 'Active' },
          { date: 'AI Target', price: 349, orders: 360, conversionRate: 14.5, label: 'Projected' }
        ]
      },
      {
        productId: 'prod_sys_design',
        title: 'System Design Interview Blueprint',
        category: 'Architecture & System Design',
        currentPrice: 499,
        suggestedPrice: 599,
        baselinePrice: 499,
        priceDiff: 100,
        expectedRevenueIncrease: 14200,
        elasticity: 'Inelastic Demand (<1.4% drop)',
        confidence: 94,
        reason: 'Benchmark comparison against peer Indian tech creators indicates willingness to pay up to ₹699 for System Design.',
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
        history: [
          { date: 'Jan 2026', price: 399, orders: 120, conversionRate: 11.5, label: 'Launch' },
          { date: 'Feb 2026', price: 449, orders: 190, conversionRate: 13.8, label: 'Previous' },
          { date: 'Current', price: 499, orders: 280, conversionRate: 14.8, label: 'Active' },
          { date: 'AI Target', price: 599, orders: 320, conversionRate: 14.2, label: 'Projected' }
        ]
      },
      {
        productId: 'prod_resume_bundle',
        title: 'FAANG ATS Resume & Cover Letter Kit',
        category: 'Career & Placement',
        currentPrice: 199,
        suggestedPrice: 249,
        baselinePrice: 199,
        priceDiff: 50,
        expectedRevenueIncrease: 12000,
        elasticity: 'High Impulse Purchase',
        confidence: 91,
        reason: 'Peak hiring season in Bengaluru and Pune creates strong impulse conversion for ATS-ready resume templates.',
        coverImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80',
        history: [
          { date: 'Jan 2026', price: 149, orders: 210, conversionRate: 13.0, label: 'Launch' },
          { date: 'Feb 2026', price: 199, orders: 340, conversionRate: 15.2, label: 'Previous' },
          { date: 'Current', price: 199, orders: 420, conversionRate: 15.6, label: 'Active' },
          { date: 'AI Target', price: 249, orders: 480, conversionRate: 15.1, label: 'Projected' }
        ]
      }
    ]
  },
  bestTimeToPost: {
    bestDay: 'Tuesday',
    bestDaySecondary: 'Thursday',
    bestHour: '08:00 PM IST',
    bestHourNumber: 20,
    expectedReach: 54200,
    expectedReachFormatted: '54.2K Reach',
    expectedConversion: 16.4,
    expectedConversionFormatted: '16.4% Conversion',
    reachMultiplier: '2.4x Viral Reach',
    confidence: 98,
    analyzedSalesCount: 4280,
    analyzedEngagementCount: 14280,
    goldenHours: [
      { day: 'Tuesday', time: '08:00 PM IST', format: 'Instagram Reel (30-45s)', reach: 54200, conversion: 16.4 },
      { day: 'Thursday', time: '07:30 PM IST', format: 'Instagram Reel & Threads', reach: 52100, conversion: 15.8 },
      { day: 'Sunday', time: '07:30 PM IST', format: 'YouTube Live & Community AMA', reach: 48900, conversion: 14.6 },
      { day: 'Saturday', time: '11:30 AM IST', format: 'YouTube 20m Masterclass', reach: 46800, conversion: 14.2 }
    ],
    heatmap: [
      {
        dayIndex: 0,
        dayShort: 'Mon',
        dayName: 'Monday',
        peakWindow: '08:00 PM – 09:30 PM IST',
        dayScore: 88,
        hours: Array.from({ length: 24 }, (_, h) => ({
          hour: h,
          hourLabel: h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`,
          intensity: h >= 19 && h <= 21 ? 88 : h >= 8 && h <= 11 ? 68 : h >= 0 && h <= 5 ? 10 : 45,
          expectedReach: h >= 19 && h <= 21 ? 43500 : 22000,
          expectedConversion: h >= 19 && h <= 21 ? 13.2 : 6.8,
          salesCount: h >= 19 && h <= 21 ? 24 : 5,
          isGoldenHour: false,
          isPeak: h >= 19 && h <= 21,
          tag: h >= 19 && h <= 21 ? 'Peak Reach ⚡' : 'Moderate ⚖️',
          bestFormat: 'LinkedIn Post & Tech Carousel',
          tip: 'Career roadmaps, interview prep & weekly motivation'
        }))
      },
      {
        dayIndex: 1,
        dayShort: 'Tue',
        dayName: 'Tuesday',
        peakWindow: '07:30 PM – 09:30 PM IST',
        dayScore: 98,
        hours: Array.from({ length: 24 }, (_, h) => ({
          hour: h,
          hourLabel: h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`,
          intensity: h === 20 ? 98 : h === 19 ? 94 : h === 21 ? 92 : h >= 8 && h <= 11 ? 72 : h >= 0 && h <= 5 ? 10 : 48,
          expectedReach: h === 20 ? 54200 : h === 19 ? 49800 : 25000,
          expectedConversion: h === 20 ? 16.4 : h === 19 ? 15.2 : 7.4,
          salesCount: h === 20 ? 42 : h === 19 ? 34 : 8,
          isGoldenHour: h === 19 || h === 20,
          isPeak: h >= 19 && h <= 21,
          tag: h === 20 ? 'Golden Hour 🔥' : h === 19 ? 'Golden Hour 🔥' : 'Peak Reach ⚡',
          bestFormat: 'Instagram Reel (30-45s) & YouTube Shorts',
          tip: 'Algorithm surge window for fast-paced coding hacks'
        }))
      },
      {
        dayIndex: 2,
        dayShort: 'Wed',
        dayName: 'Wednesday',
        peakWindow: '08:00 PM – 10:00 PM IST',
        dayScore: 90,
        hours: Array.from({ length: 24 }, (_, h) => ({
          hour: h,
          hourLabel: h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`,
          intensity: h >= 19 && h <= 21 ? 90 : h >= 8 && h <= 11 ? 65 : h >= 0 && h <= 5 ? 12 : 44,
          expectedReach: h >= 19 && h <= 21 ? 44000 : 21000,
          expectedConversion: h >= 19 && h <= 21 ? 13.5 : 6.5,
          salesCount: h >= 19 && h <= 21 ? 26 : 6,
          isGoldenHour: false,
          isPeak: h >= 19 && h <= 21,
          tag: h >= 19 && h <= 21 ? 'Peak Reach ⚡' : 'Moderate ⚖️',
          bestFormat: 'DSA Visual Carousels & Infographics',
          tip: 'System design deep-dives and problem breakdown sheets'
        }))
      },
      {
        dayIndex: 3,
        dayShort: 'Thu',
        dayName: 'Thursday',
        peakWindow: '07:30 PM – 09:30 PM IST',
        dayScore: 96,
        hours: Array.from({ length: 24 }, (_, h) => ({
          hour: h,
          hourLabel: h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`,
          intensity: h === 20 ? 96 : h === 19 ? 94 : h === 21 ? 90 : h >= 8 && h <= 11 ? 70 : h >= 0 && h <= 5 ? 10 : 46,
          expectedReach: h === 20 ? 52100 : h === 19 ? 48500 : 24000,
          expectedConversion: h === 20 ? 15.8 : h === 19 ? 14.8 : 7.2,
          salesCount: h === 20 ? 38 : h === 19 ? 31 : 7,
          isGoldenHour: h === 20,
          isPeak: h >= 19 && h <= 21,
          tag: h === 20 ? 'Golden Hour 🔥' : 'Peak Reach ⚡',
          bestFormat: 'Instagram Reel & Threads Tech Debate',
          tip: 'Tech salary roasts, FAANG interview stories & hot takes'
        }))
      },
      {
        dayIndex: 4,
        dayShort: 'Fri',
        dayName: 'Friday',
        peakWindow: '06:30 PM – 08:30 PM IST',
        dayScore: 85,
        hours: Array.from({ length: 24 }, (_, h) => ({
          hour: h,
          hourLabel: h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`,
          intensity: h >= 18 && h <= 20 ? 85 : h >= 8 && h <= 11 ? 60 : h >= 0 && h <= 5 ? 14 : 42,
          expectedReach: h >= 18 && h <= 20 ? 39000 : 19000,
          expectedConversion: h >= 18 && h <= 20 ? 11.8 : 5.9,
          salesCount: h >= 18 && h <= 20 ? 18 : 4,
          isGoldenHour: false,
          isPeak: h >= 18 && h <= 20,
          tag: h >= 18 && h <= 20 ? 'Peak Reach ⚡' : 'Moderate ⚖️',
          bestFormat: 'GitHub Repos & Developer Tool Stacks',
          tip: 'Weekend project repositories, starter kits & AI tools'
        }))
      },
      {
        dayIndex: 5,
        dayShort: 'Sat',
        dayName: 'Saturday',
        peakWindow: '11:00 AM – 01:30 PM IST',
        dayScore: 93,
        hours: Array.from({ length: 24 }, (_, h) => ({
          hour: h,
          hourLabel: h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`,
          intensity: h >= 11 && h <= 13 ? 93 : h >= 18 && h <= 20 ? 82 : h >= 0 && h <= 5 ? 12 : 50,
          expectedReach: h >= 11 && h <= 13 ? 46800 : 26000,
          expectedConversion: h >= 11 && h <= 13 ? 14.2 : 7.9,
          salesCount: h >= 11 && h <= 13 ? 32 : 8,
          isGoldenHour: h === 11 || h === 12,
          isPeak: h >= 11 && h <= 13,
          tag: h >= 11 && h <= 13 ? 'Golden Hour 🔥' : 'Peak Reach ⚡',
          bestFormat: 'Long-Form YouTube Masterclass',
          tip: '15-30m comprehensive tutorial masterclasses & code-alongs'
        }))
      },
      {
        dayIndex: 6,
        dayShort: 'Sun',
        dayName: 'Sunday',
        peakWindow: '07:00 PM – 09:30 PM IST',
        dayScore: 94,
        hours: Array.from({ length: 24 }, (_, h) => ({
          hour: h,
          hourLabel: h === 0 ? '12 AM' : h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`,
          intensity: h >= 19 && h <= 21 ? 94 : h >= 11 && h <= 14 ? 74 : h >= 0 && h <= 5 ? 15 : 52,
          expectedReach: h >= 19 && h <= 21 ? 48900 : 27000,
          expectedConversion: h >= 19 && h <= 21 ? 14.6 : 8.2,
          salesCount: h >= 19 && h <= 21 ? 35 : 9,
          isGoldenHour: h === 19 || h === 20,
          isPeak: h >= 19 && h <= 21,
          tag: h >= 19 && h <= 21 ? 'Golden Hour 🔥' : 'Peak Reach ⚡',
          bestFormat: 'Weekly AMA, Live Q&A & Community Stream',
          tip: 'Community Q&A, tech news breakdown & week ahead preview'
        }))
      }
    ]
  },
  audienceInsights: {
    topCities: [
      { name: 'Bengaluru', percentage: 34, studentRatio: '42% Tech Techies & SDE-1s' },
      { name: 'Mumbai & Pune', percentage: 24, studentRatio: '28% Engineering Undergrads' },
      { name: 'Delhi NCR', percentage: 18, studentRatio: '18% Tier-1 Placement Aspirants' },
      { name: 'Hyderabad', percentage: 14, studentRatio: '12% SDE Job Seekers' },
      { name: 'Tier-2/3 Bharat (Jaipur, Indore, Patna)', percentage: 10, studentRatio: 'Fastest growing segment (+54% YoY)' }
    ],
    ageGroups: [
      { label: '18–24 yrs (College / Fresh Grads)', percentage: 58, badge: 'Highest Volume (78% UPI)' },
      { label: '25–34 yrs (Mid-Level Software Engineers)', percentage: 32, badge: 'Highest AOV (₹1,499+)' },
      { label: '35+ yrs (Engineering Managers & Leads)', percentage: 10, badge: 'Consulting Intent' }
    ],
    deviceUsage: {
      mobile: 84,
      desktop: 16,
      paymentApps: [
        { name: 'PhonePe UPI', percentage: 48, speed: '< 22s Checkout' },
        { name: 'Google Pay', percentage: 34, speed: '< 18s Checkout' },
        { name: 'Paytm & CRED UPI', percentage: 14, speed: '< 25s Checkout' },
        { name: 'Debit/Credit Cards & Netbanking', percentage: 4, speed: 'GST B2B Invoices' }
      ]
    },
    returningCustomers: {
      cohortSize: 42,
      repeatPurchaseRate: '28.4%',
      ltvMultiplier: '3.4x',
      summary: '42 student buyers completed all PDF downloads and opened WhatsApp study links within 2 hours. Prime candidates for your ₹2,499 live cohort.'
    }
  },
  smartRecommendations: {
    postingSchedule: {
      bestDays: 'Tuesday & Thursday',
      bestTime: '07:30 PM – 09:30 PM IST',
      confidence: 98,
      channelAnalysis: [
        { platform: 'Instagram Reels', time: '08:00 PM IST', impact: '4.1x organic saves & share velocity' },
        { platform: 'YouTube Shorts & Community', time: '07:30 PM IST', impact: 'Peak evening learning intent' },
        { platform: 'LinkedIn Tech Roadmaps', time: '08:30 AM & 06:15 PM IST', impact: '62% higher CTR on pinned links' },
        { platform: 'WhatsApp Broadcasts', time: '08:45 PM IST', impact: '94% open rate in 15 mins' }
      ]
    },
    webinarLaunch: {
      recommendedTitle: 'Zero to FAANG System Design: Live 90-Min Masterclass',
      recommendedDayTime: 'Upcoming Saturday • 06:00 PM IST',
      recommendedTicketPrice: 499,
      targetSeats: 150,
      projectedRevenue: 74850,
      reason: 'High student search volume for concurrency & distributed caching during placement season.'
    },
    membershipUpsell: {
      targetCohortCount: 42,
      membershipPlanName: 'FAANG Inner Circle VIP',
      monthlyPrice: 999,
      currentMRR: 124800,
      recommendedDiscountCode: 'BHARAT20 (20% OFF)',
      expectedConversionPct: 21.4,
      expectedARRAddition: 100692
    },
    brandCollaboration: {
      suggestedBrand: 'boAt Lifestyle / Swiggy Instamart',
      category: 'Consumer Tech & Student Productivity',
      matchScore: 96,
      suggestedFee: 85000,
      proposedDeliverable: '1x Dedicated YouTube Integration + 2x Instagram Focus Sprint Reels',
      reason: '78% young engineering demographic matches active Q3 boAt Audio & Smartwear brand brief in CreatorOS marketplace.'
    }
  }
};

/**
 * Interactive SVG Price History & Trajectory Chart
 */
function ProductPriceHistoryChart({
  history = [],
  currentPrice,
  suggestedPrice,
  productId
}: {
  history: PriceHistoryPoint[];
  currentPrice: number;
  suggestedPrice: number;
  productId: string;
}) {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

  const dataPoints: PriceHistoryPoint[] = history.length > 0 ? history : [
    { date: 'Jan 2026', price: Math.max(99, Math.round(currentPrice * 0.75)), label: 'Launch' },
    { date: 'Feb 2026', price: Math.max(149, Math.round(currentPrice * 0.88)), label: 'Previous' },
    { date: 'Current', price: currentPrice, label: 'Active' },
    { date: 'AI Target', price: suggestedPrice, label: 'Projected' }
  ];

  const minPrice = Math.min(...dataPoints.map((p) => p.price)) * 0.85;
  const maxPrice = Math.max(...dataPoints.map((p) => p.price), suggestedPrice) * 1.15;
  const priceRange = maxPrice - minPrice || 1;

  const points = dataPoints.map((pt, idx) => {
    const x = 32 + idx * (236 / Math.max(dataPoints.length - 1, 1));
    const y = 82 - ((pt.price - minPrice) / priceRange) * 58;
    return { x, y, ...pt };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x} 96 L ${points[0].x} 96 Z`;

  return (
    <div className="rounded-xl bg-black/40 border border-white/[0.06] p-3 space-y-2">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold text-slate-300 flex items-center gap-1.5">
          <History className="h-3 w-3 text-royal-400" />
          <span>Price History & Target Curve</span>
        </span>
        <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
          Target: ₹{suggestedPrice}
        </span>
      </div>

      {/* SVG Chart */}
      <div className="relative h-24 w-full select-none">
        <svg viewBox="0 0 300 105" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id={`grad-${productId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="20" y1="24" x2="280" y2="24" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="20" y1="54" x2="280" y2="54" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1="20" y1="84" x2="280" y2="84" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

          {/* Area Fill */}
          <path d={areaD} fill={`url(#grad-${productId})`} />

          {/* Line Path */}
          <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {points.map((pt, i) => {
            const isLast = i === points.length - 1;
            const isCurrent = pt.label === 'Active' || pt.date === 'Current';
            const isActive = activePointIndex === i;

            return (
              <g 
                key={i} 
                className="cursor-pointer transition-all"
                onMouseEnter={() => setActivePointIndex(i)}
                onMouseLeave={() => setActivePointIndex(null)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? 6 : isLast || isCurrent ? 4.5 : 3.5}
                  fill={isLast ? '#10B981' : isCurrent ? '#3B82F6' : '#94A3B8'}
                  stroke="#0A0E17"
                  strokeWidth={isActive ? 3 : 2}
                  className="transition-all duration-200"
                />
                <text
                  x={pt.x}
                  y={pt.y - 7}
                  textAnchor="middle"
                  className={`text-[9px] font-bold ${
                    isLast ? 'fill-emerald-400 font-extrabold' : isCurrent ? 'fill-blue-300' : 'fill-slate-400'
                  }`}
                >
                  ₹{pt.price}
                </text>
                <text
                  x={pt.x}
                  y="99"
                  textAnchor="middle"
                  className="text-[8px] fill-slate-500 font-medium"
                >
                  {pt.date}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active Point Details Tooltip */}
      {activePointIndex !== null && points[activePointIndex] && (
        <div className="text-[10px] text-slate-300 bg-white/[0.04] p-1.5 rounded-lg border border-white/[0.08] flex items-center justify-between">
          <span className="font-semibold text-white">{points[activePointIndex].label || points[activePointIndex].date}</span>
          <span>Price: <strong className="text-emerald-400">₹{points[activePointIndex].price}</strong></span>
          {points[activePointIndex].conversionRate && (
            <span>Est. CR: <strong className="text-royal-300">{points[activePointIndex].conversionRate}%</strong></span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * AI Best Time to Post Engine with Weekly Monday-to-Sunday Hourly Heatmap
 */
function WeeklyPostingHeatmapEngine({
  bestTimeToPost,
  onSetReminder
}: {
  bestTimeToPost: BestTimeToPostData;
  onSetReminder: (title: string, detail: string) => void;
}) {
  const [selectedCell, setSelectedCell] = useState<{ day: DayHeatmapRow; hour: HourlyHeatmapCell } | null>(() => {
    const tue = bestTimeToPost?.heatmap?.find(d => d.dayIndex === 1) || bestTimeToPost?.heatmap?.[0];
    const peakHour = tue?.hours?.find(h => h.hour === 20) || tue?.hours?.[20] || tue?.hours?.[0];
    return tue && peakHour ? { day: tue, hour: peakHour } : null;
  });

  const [hoveredCell, setHoveredCell] = useState<{ day: DayHeatmapRow; hour: HourlyHeatmapCell } | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [reminderSetKey, setReminderSetKey] = useState<string | null>(null);

  const activeInspection = hoveredCell || selectedCell;

  const handleReminderClick = (key: string, title: string, timeDetail: string) => {
    setReminderSetKey(key);
    onSetReminder(title, timeDetail);
  };

  const getCellBg = (intensity: number, isGoldenHour: boolean, isHighlighted: boolean) => {
    if (isHighlighted) {
      return 'ring-2 ring-amber-400 scale-110 z-20 shadow-lg shadow-amber-500/40';
    }
    if (isGoldenHour) {
      return 'bg-gradient-to-br from-amber-400 via-pink-500 to-royal-600 text-white border border-amber-300 shadow-md shadow-pink-500/30';
    }
    if (intensity >= 85) {
      return 'bg-indigo-600/80 border border-indigo-400 text-white shadow-sm shadow-indigo-500/20';
    }
    if (intensity >= 65) {
      return 'bg-royal-600/50 border border-royal-500/40 text-royal-100';
    }
    if (intensity >= 40) {
      return 'bg-royal-950/70 border border-royal-900/40 text-royal-300';
    }
    if (intensity >= 20) {
      return 'bg-white/[0.05] border border-white/[0.04] text-slate-400';
    }
    return 'bg-white/[0.02] border border-white/[0.02] text-slate-600';
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-amber-500/20 text-pink-400 border border-pink-500/30 shadow-sm">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-display font-bold text-white">AI Best Time to Post Engine</h2>
              <span className="rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/30 px-2 py-0.5 text-[10px] font-bold">
                {bestTimeToPost?.confidence || 98}% Telemetry Match
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Audience engagement, watch time & checkout velocity analyzed across {bestTimeToPost?.analyzedSalesCount || 4280} orders & {(bestTimeToPost?.analyzedEngagementCount || 14280).toLocaleString()} engagement signals.
            </p>
          </div>
        </div>

        {/* Platform filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: '🔥 All Channels' },
            { id: 'reels', label: '📸 Instagram Reels' },
            { id: 'youtube', label: '🎥 YouTube Shorts' },
            { id: 'linkedin', label: '💼 LinkedIn Guides' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                activeFilter === tab.id
                  ? 'bg-royal-600 text-white shadow-royal'
                  : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Core Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Best Day */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2.5 hover:border-pink-500/40 transition shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-pink-400 font-semibold">
              <Calendar className="h-3.5 w-3.5" />
              <span>Best Day to Broadcast</span>
            </span>
            <span className="rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30 px-2 py-0.5 text-[10px] font-bold">
              Golden Surge
            </span>
          </div>
          <div className="text-2xl font-display font-extrabold text-white flex items-baseline gap-2">
            <span>{bestTimeToPost?.bestDay || 'Tuesday'}</span>
            <span className="text-xs font-normal text-pink-300">+{bestTimeToPost?.reachMultiplier || '2.4x Viral Reach'}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Runner-up: <strong className="text-slate-200">{bestTimeToPost?.bestDaySecondary || 'Thursday'}</strong> • Peak student learning intent
          </div>
        </div>

        {/* Card 2: Best Hour */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2.5 hover:border-amber-500/40 transition shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Clock className="h-3.5 w-3.5" />
              <span>Optimal Hour Window</span>
            </span>
            <span className="rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold">
              Peak Slot
            </span>
          </div>
          <div className="text-2xl font-display font-extrabold text-white flex items-baseline gap-2">
            <span>{bestTimeToPost?.bestHour || '08:00 PM IST'}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Prime Window: <strong className="text-slate-200">07:30 PM – 09:30 PM IST</strong> (88% UPI checkouts)
          </div>
        </div>

        {/* Card 3: Expected Reach */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2.5 hover:border-royal-500/40 transition shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-royal-400 font-semibold">
              <Zap className="h-3.5 w-3.5" />
              <span>Expected Reach Lift</span>
            </span>
            <span className="rounded-full bg-royal-500/15 text-royal-300 border border-royal-500/30 px-2 py-0.5 text-[10px] font-bold">
              Top 1% Slot
            </span>
          </div>
          <div className="text-2xl font-display font-extrabold text-white flex items-baseline gap-2">
            <span>{bestTimeToPost?.expectedReachFormatted || '54.2K Reach'}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            <strong className="text-emerald-400">+184%</strong> vs weekday morning baseline impressions
          </div>
        </div>

        {/* Card 4: Expected Conversion */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2.5 hover:border-emerald-500/40 transition shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Expected Conversion</span>
            </span>
            <span className="rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold">
              High Intent
            </span>
          </div>
          <div className="text-2xl font-display font-extrabold text-emerald-400 flex items-baseline gap-2">
            <span>{bestTimeToPost?.expectedConversionFormatted || '16.4% Conversion'}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            <strong className="text-emerald-400">3.8x baseline</strong> checkout velocity during golden window
          </div>
        </div>

      </div>

      {/* Weekly Heatmap Matrix Box */}
      <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E17] p-5 sm:p-6 space-y-5 shadow-xl">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Weekly Hourly Activity Heatmap (Monday to Sunday)</span>
              <span className="text-[10px] text-slate-400 font-normal">All times shown in Indian Standard Time (IST)</span>
            </h3>
          </div>

          {/* Intensity Legend */}
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span>Low (0%)</span>
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-3 rounded-sm bg-white/[0.04]" />
              <div className="h-2.5 w-3 rounded-sm bg-royal-950/70 border border-royal-900/40" />
              <div className="h-2.5 w-3 rounded-sm bg-royal-600/60 border border-royal-500/40" />
              <div className="h-2.5 w-3 rounded-sm bg-indigo-600/80 border border-indigo-400" />
              <div className="h-2.5 w-3 rounded-sm bg-gradient-to-r from-amber-400 to-pink-500 border border-amber-300" />
            </div>
            <span>Golden Peak (100% 🔥)</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[760px] space-y-2">
            
            {/* Hour Timeline Header */}
            <div className="grid grid-cols-[90px_repeat(24,1fr)] gap-1 text-[9px] text-slate-400 font-mono text-center">
              <div className="text-left font-sans font-semibold text-slate-500">Day / Hour</div>
              {Array.from({ length: 24 }, (_, h) => {
                const label = h === 0 ? '12A' : h === 6 ? '6A' : h === 9 ? '9A' : h === 12 ? '12P' : h === 15 ? '3P' : h === 18 ? '6P' : h === 20 ? '8P' : h === 21 ? '9P' : `${h}`;
                const isHighlightHour = h === 19 || h === 20 || h === 21;
                return (
                  <div key={h} className={`${isHighlightHour ? 'text-amber-400 font-bold' : ''}`}>
                    {label}
                  </div>
                );
              })}
            </div>

            {/* Rows for Mon to Sun */}
            {(bestTimeToPost?.heatmap || []).map((dayRow) => {
              const isBestDay = dayRow.dayIndex === 1; // Tuesday
              return (
                <div key={dayRow.dayIndex} className="grid grid-cols-[90px_repeat(24,1fr)] gap-1 items-center">
                  
                  {/* Left Day Tag */}
                  <div className="flex items-center justify-between pr-2 text-xs">
                    <span className={`font-bold ${isBestDay ? 'text-pink-400 flex items-center gap-1' : 'text-slate-300'}`}>
                      {dayRow.dayShort}
                      {isBestDay && <Flame className="h-3 w-3 text-pink-400 inline" />}
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">{dayRow.dayScore}</span>
                  </div>

                  {/* 24 Hour Block Cells */}
                  {dayRow.hours.map((cell) => {
                    const isSelected = selectedCell?.day.dayIndex === dayRow.dayIndex && selectedCell?.hour.hour === cell.hour;
                    const isHovered = hoveredCell?.day.dayIndex === dayRow.dayIndex && hoveredCell?.hour.hour === cell.hour;
                    const isHighlighted = isSelected || isHovered;

                    return (
                      <button
                        key={cell.hour}
                        onClick={() => setSelectedCell({ day: dayRow, hour: cell })}
                        onMouseEnter={() => setHoveredCell({ day: dayRow, hour: cell })}
                        onMouseLeave={() => setHoveredCell(null)}
                        title={`${dayRow.dayName} @ ${cell.hourLabel}: ${cell.intensity}% engagement • ${cell.expectedReach.toLocaleString()} reach`}
                        className={`h-7 rounded-[6px] transition-all duration-150 flex items-center justify-center relative cursor-pointer ${
                          getCellBg(cell.intensity, cell.isGoldenHour, isHighlighted)
                        }`}
                      >
                        {cell.isGoldenHour && (
                          <span className="text-[9px] leading-none select-none">🔥</span>
                        )}
                        {!cell.isGoldenHour && cell.intensity >= 85 && (
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 select-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}

          </div>
        </div>

        {/* Selected / Hovered Slot Detailed Telemetry Card */}
        {activeInspection && (
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-royal-400" />
                  <span>{activeInspection.day.dayName} • {activeInspection.hour.hourLabel} IST</span>
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeInspection.hour.isGoldenHour
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : activeInspection.hour.intensity >= 80
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
                }`}>
                  {activeInspection.hour.tag}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Recommended Format: <strong className="text-white">{activeInspection.hour.bestFormat}</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                {activeInspection.hour.tip || activeInspection.day.tip}
              </p>
            </div>

            {/* Metrics Breakdown in Inspector */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-center px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.06]">
                <div className="text-[10px] text-slate-400">Engagement Score</div>
                <div className="text-sm font-bold text-royal-300">{activeInspection.hour.intensity} / 100</div>
              </div>
              <div className="text-center px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.06]">
                <div className="text-[10px] text-slate-400">Expected Reach</div>
                <div className="text-sm font-bold text-white">{activeInspection.hour.expectedReach.toLocaleString()}</div>
              </div>
              <div className="text-center px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.06]">
                <div className="text-[10px] text-slate-400">Expected Conversion</div>
                <div className="text-sm font-bold text-emerald-400">{activeInspection.hour.expectedConversion}%</div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleReminderClick(
                  `slot_${activeInspection.day.dayIndex}_${activeInspection.hour.hour}`,
                  `Reminder: Post on ${activeInspection.day.dayName}`,
                  `${activeInspection.hour.hourLabel} IST • ${activeInspection.hour.bestFormat}`
                )}
                className="py-2 px-3.5 rounded-[12px] bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 text-pink-300 text-xs font-bold transition flex items-center gap-1.5 shrink-0"
              >
                <Bell className="h-3.5 w-3.5" />
                <span>
                  {reminderSetKey === `slot_${activeInspection.day.dayIndex}_${activeInspection.hour.hour}`
                    ? 'Reminder Set ✓'
                    : `Set ${activeInspection.hour.hourLabel} Reminder`}
                </span>
              </button>
            </div>

          </div>
        )}

        {/* Curated Golden Hours Quick Scheduling Strip */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>Top 4 Golden Hour Windows (Verified Peak Algorithm & Payment Velocity)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(bestTimeToPost?.goldenHours || []).map((gh, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-500/30 transition flex flex-col justify-between gap-2.5"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{gh.day}</span>
                    <span className="text-amber-400 font-mono font-bold text-[11px]">{gh.time}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{gh.format}</div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/[0.04]">
                  <span className="text-slate-400">{gh.reach.toLocaleString()} Reach</span>
                  <span className="text-emerald-400 font-bold">{gh.conversion}% CR</span>
                </div>

                <button
                  onClick={() => handleReminderClick(
                    `gh_${idx}`,
                    `Golden Hour: ${gh.day} ${gh.time}`,
                    `${gh.format} • ${gh.reach.toLocaleString()} est. reach`
                  )}
                  className="w-full py-1.5 px-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] text-[10px] font-semibold transition flex items-center justify-center gap-1"
                >
                  <Bell className="h-3 w-3 text-pink-400" />
                  <span>{reminderSetKey === `gh_${idx}` ? 'Reminder Active ✓' : 'Set Reminder'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function AIBusinessCoachPage() {
  const { 
    products, 
    orders, 
    activeCreator, 
    updateProductPrice, 
    revertProductPrice, 
    priceHistory, 
    baselinePrices 
  } = useCreatorStore();

  const [coachData, setCoachData] = useState<AICoachData>(DEFAULT_COACH_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [appliedPrices, setAppliedPrices] = useState<Record<string, boolean>>({});
  const [appliedRecommendations, setAppliedRecommendations] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Chat Simulation State
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Namaste! I am your CreatorOS AI Business Coach. I analyze your PostgreSQL sales data, traffic patterns, and Indian audience telemetry 24/7. How can I help maximize your revenue today?',
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Fetch AI Coach analytics from PostgreSQL API endpoint
  const fetchCoachData = async () => {
    try {
      const res = await fetch(`/api/ai-coach?userId=${activeCreator?.id || 'creator_aarav'}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setCoachData(json.data);
        }
      }
    } catch (err) {
      console.warn('AI Coach fetch fallback to local telemetry:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Re-fetch automatically whenever active creator or new orders arrive in store
  useEffect(() => {
    fetchCoachData();

    // Event listener for real-time order arrival
    const handleNewOrder = () => {
      fetchCoachData();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('creatoros_new_order', handleNewOrder);
      window.addEventListener('storage', handleNewOrder);
    }

    // Auto-sync polling every 15 seconds to ensure PostgreSQL tables are fresh
    const interval = setInterval(() => {
      fetchCoachData();
    }, 15000);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('creatoros_new_order', handleNewOrder);
        window.removeEventListener('storage', handleNewOrder);
      }
      clearInterval(interval);
    };
  }, [activeCreator?.id, orders.length]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      fetchCoachData();
      showToast('AI Business Telemetry & PostgreSQL calculations successfully refreshed!');
    }, 600);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  // Apply New Price
  const handleApplyNewPrice = (productId: string, suggestedPrice: number, title: string) => {
    try {
      updateProductPrice(productId, suggestedPrice, 'ai_optimized');
      setAppliedPrices((prev) => ({ ...prev, [productId]: true }));
      showToast(`Price updated to ₹${suggestedPrice} for "${title}"! Live on your storefront.`);
    } catch (e) {
      console.error('Failed to update price:', e);
    }
  };

  // Revert Price
  const handleRevertPrice = (productId: string, title: string) => {
    try {
      revertProductPrice(productId);
      setAppliedPrices((prev) => ({ ...prev, [productId]: false }));
      const base = baselinePrices[productId] || 299;
      showToast(`Price reverted back to ₹${base} for "${title}".`);
    } catch (e) {
      console.error('Failed to revert price:', e);
    }
  };

  const handleApplyRecommendation = (key: string, label: string) => {
    setAppliedRecommendations((prev) => ({ ...prev, [key]: true }));
    showToast(`${label} action executed successfully!`);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg = { sender: 'user' as const, text, time: 'Just now' };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Based on your conversion data in Bangalore and Pune, increasing course cohort capacity and sending a WhatsApp loyalty code will yield the highest return.";
      const lower = text.toLowerCase();
      
      if (lower.includes('price') || lower.includes('pricing')) {
        reply = "For Indian tech & engineering students, digital PDF checklists convert best at ₹299 - ₹349 (<40s UPI impulse window). For live interactive cohorts, ₹2,499 - ₹3,499 with 2-part milestone payments maximizes overall enrollments.";
      } else if (lower.includes('cohort') || lower.includes('double') || lower.includes('sales')) {
        reply = "To double your sales this month:\n1. Broadcast a 20% loyalty discount code (BHARAT20) to your 42 verified PDF buyers via WhatsApp.\n2. Host a 60-min live YouTube masterclass this Saturday at 6:00 PM IST.\n3. Offer a 1-click bundle with your System Design blueprint.";
      } else if (lower.includes('boat') || lower.includes('brand') || lower.includes('collab')) {
        reply = "Your 78% male 18–24 student engineering audience is a 96% match for the active boAt Lifestyle Q3 sponsorship. Pitch a 'Deep Focus 10-Hour Coding Sprint' Reel at ₹85,000 fee with verified metrics from your CreatorOS Media Kit.";
      } else if (lower.includes('post') || lower.includes('time') || lower.includes('instagram')) {
        reply = "Optimal posting window for Bharat audience is Tuesday & Thursday between 7:30 PM and 9:30 PM IST. 8:00 PM Reels receive 4.1x more organic saves as developers study after office/college.";
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: reply, time: 'Just now' }]);
      setIsTyping(false);
    }, 850);
  };

  const metrics = coachData.metrics || DEFAULT_COACH_DATA.metrics;

  // Build product suggestions for EVERY product in catalog
  const catalogSuggestions: ProductOptimizationItem[] = (
    coachData.priceOptimization.suggestions.length > 0 
      ? coachData.priceOptimization.suggestions 
      : DEFAULT_COACH_DATA.priceOptimization.suggestions
  ).map((item) => {
    // Check if live product in store has an updated price
    const liveProd = products.find((p) => p.id === item.productId);
    const currentPrice = liveProd ? liveProd.price : item.currentPrice;
    const history = (priceHistory && priceHistory[item.productId]) || item.history || [];

    return {
      ...item,
      currentPrice,
      history
    };
  });

  return (
    <PageTransition>
      <div className="space-y-8 font-sans pb-16">
        
        {/* Toast Notification Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-[18px] border border-emerald-500/40 bg-[#091510]/95 px-4 py-3 text-sm text-emerald-300 shadow-2xl backdrop-blur-xl"
            >
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              <span className="font-medium text-xs sm:text-sm">{toastMessage}</span>
              <button onClick={() => setToastMessage(null)} className="ml-2 text-emerald-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 1. HERO CARD SECTION */}
        {/* ========================================================================= */}
        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.12] bg-gradient-to-br from-[#0B0F19] via-[#0D1322] to-[#080B12] p-6 sm:p-8 shadow-2xl">
          {/* Background Glow Accents */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-royal-600/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-600/15 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Left Info */}
            <div className="space-y-2 max-w-xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-2 rounded-full bg-royal-500/15 px-3 py-1 border border-royal-500/30 text-royal-300 text-xs font-semibold">
                  <Bot className="h-3.5 w-3.5 text-royal-400 animate-pulse" />
                  <span>AI Business Coach</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>PostgreSQL Active Tables</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {coachData.hero.healthTier}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight flex items-center gap-3">
                <span>AI Business Coach & Growth Engine</span>
                <Sparkles className="h-6 w-6 text-amber-400 hidden sm:inline-block" />
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Autonomous creator intelligence calculated from PostgreSQL <span className="text-white font-mono">orders</span>, <span className="text-white font-mono">products</span>, <span className="text-white font-mono">memberships</span>, and <span className="text-white font-mono">bookings</span> tables. 
                Updates automatically as new transactions settle.
              </p>
            </div>

            {/* Right Health Score & AI Confidence Widget */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 bg-white/[0.03] border border-white/[0.08] rounded-[20px] p-4 backdrop-blur-md">
              
              {/* Radial Score */}
              <div className="flex items-center gap-3 pr-4 border-r border-white/[0.08]">
                <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-royal-600/30 to-indigo-600/30 border border-royal-500/40 shadow-inner">
                  <span className="text-2xl font-display font-extrabold text-white">
                    <AnimatedCounter value={coachData.hero.healthScore} />
                  </span>
                  <span className="absolute -bottom-1 text-[9px] font-bold text-slate-400">/100</span>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Weekly Health Score</div>
                  <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>{coachData.hero.weeklyChange}</span>
                  </div>
                </div>
              </div>

              {/* Confidence & Trend */}
              <div className="space-y-1.5 pl-1">
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span className="text-slate-400">Growth Trend:</span>
                  <span className="font-bold text-white bg-royal-600/20 px-2 py-0.5 rounded-md border border-royal-500/30">
                    {coachData.hero.growthTrend}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 text-xs">
                  <span className="text-slate-400">AI Confidence:</span>
                  <span className="font-bold text-indigo-300">
                    {coachData.hero.aiConfidence}%
                  </span>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="mt-1 w-full flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] py-1 px-2 rounded-lg transition"
                >
                  <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin text-royal-400' : ''}`} />
                  <span>{isRefreshing ? 'Syncing Tables...' : 'Recalculate Models'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. REVENUE INTELLIGENCE SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <Target className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-display font-bold text-white">Revenue Intelligence & PostgreSQL Metrics</h2>
            </div>
            <span className="text-xs text-slate-400">Monthly Revenue: ₹{formatINR(metrics.monthlyRevenue)} • AOV: ₹{formatINR(metrics.aov)}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: 30-Day Predicted Revenue */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-3 relative overflow-hidden group hover:border-royal-500/30 transition shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Predicted 30-Day Revenue</span>
                <span className="rounded-full bg-emerald-500/15 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
                  +{coachData.revenueIntelligence.predictedGrowthPct}% MoM
                </span>
              </div>
              <div className="text-2xl font-display font-bold text-white flex items-baseline gap-1">
                <span>₹</span>
                <AnimatedCounter value={coachData.revenueIntelligence.predictedRevenue30Days} />
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-royal-500 to-emerald-400 h-full rounded-full w-[78%]" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>MRR: ₹{formatINR(metrics.membershipMRR)}</span>
                <span className="text-emerald-400 font-medium">AOV: ₹{formatINR(metrics.aov)}</span>
              </div>
            </div>

            {/* Card 2: Storefront Conversion Rate & Booking Utilization */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-3 hover:border-royal-500/30 transition shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Store Conversion Rate</span>
                <span className="rounded-full bg-royal-500/15 text-royal-300 px-2 py-0.5 text-[10px] font-bold">
                  {metrics.bookingUtilization}% Booking Util
                </span>
              </div>
              <div className="text-2xl font-display font-bold text-white flex items-baseline gap-1">
                <span>{coachData.revenueIntelligence.conversionRate}%</span>
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>Returning Customer: {metrics.returningCustomerPct}%</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Top Category: <span className="text-slate-200 font-semibold">{metrics.topPerformingCategory.name}</span>
              </p>
            </div>

            {/* Card 3: Best Selling Product */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-3 hover:border-emerald-500/30 transition shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Award className="h-3.5 w-3.5" />
                  <span>Best Selling Product</span>
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                  {coachData.revenueIntelligence.bestSellingProduct.conversionRate} CR
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <img 
                  src={coachData.revenueIntelligence.bestSellingProduct.coverImage} 
                  alt="Best Seller" 
                  className="h-10 w-10 rounded-lg object-cover border border-white/10 shrink-0" 
                />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">
                    {coachData.revenueIntelligence.bestSellingProduct.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {coachData.revenueIntelligence.bestSellingProduct.salesCount} sales • ₹{formatINR(coachData.revenueIntelligence.bestSellingProduct.grossRevenue)}
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-slate-300 bg-white/[0.03] p-2 rounded-lg border border-white/[0.05]">
                💡 AI Tip: Bundle with 1:1 Mock Interviews to lift Average Order Value by +₹600.
              </div>
            </div>

            {/* Card 4: Lowest Performing Product */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-3 hover:border-amber-500/30 transition shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Lowest Performer</span>
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-1.5 py-0.5 rounded">
                  {coachData.revenueIntelligence.lowestPerformingProduct.conversionRate} CR
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img 
                  src={coachData.revenueIntelligence.lowestPerformingProduct.coverImage} 
                  alt="Lowest Performer" 
                  className="h-10 w-10 rounded-lg object-cover border border-white/10 shrink-0" 
                />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">
                    {coachData.revenueIntelligence.lowestPerformingProduct.title}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {coachData.revenueIntelligence.lowestPerformingProduct.salesCount} sales • ₹{formatINR(coachData.revenueIntelligence.lowestPerformingProduct.grossRevenue)}
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-amber-300/90 bg-amber-950/20 p-2 rounded-lg border border-amber-500/20">
                🔧 Diagnosis: Add case studies or offer as free cohort bonus to lift conversion.
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. AI PRICE OPTIMIZATION ENGINE SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-white">AI Price Optimization Engine</h2>
                <p className="text-xs text-slate-400">Elasticity modeling, interactive price adjustments, and historical trajectory</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Total Potential ARR Lift: +₹{formatINR(coachData.priceOptimization.totalExpectedIncrease)}/mo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {catalogSuggestions.map((item) => {
              const isApplied = appliedPrices[item.productId] || item.currentPrice === item.suggestedPrice;
              const hasChanged = item.currentPrice !== item.baselinePrice;

              return (
                <div 
                  key={item.productId}
                  className="rounded-[22px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-4 flex flex-col justify-between hover:border-royal-500/30 transition shadow-xl"
                >
                  <div className="space-y-3.5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.coverImage} 
                          alt={item.title} 
                          className="h-12 w-12 rounded-xl object-cover border border-white/10 shrink-0" 
                        />
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1">{item.title}</h3>
                          <span className="text-[10px] text-royal-300 font-mono">{item.category || item.elasticity}</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold shrink-0">
                        {item.confidence}% Confidence
                      </span>
                    </div>

                    {/* Price Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div>
                        <div className="text-[10px] text-slate-400">Current Price</div>
                        <div className="text-sm font-bold text-slate-200">₹{item.currentPrice}</div>
                      </div>
                      <div className="border-l border-white/[0.08] pl-3">
                        <div className="text-[10px] text-emerald-400 font-semibold">Suggested Price</div>
                        <div className="text-base font-extrabold text-emerald-400">₹{item.suggestedPrice}</div>
                      </div>
                    </div>

                    {/* Expected Revenue Increase */}
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="text-slate-400">Estimated Revenue Uplift:</span>
                      <span className="font-bold text-emerald-400">+₹{formatINR(item.expectedRevenueIncrease)}/mo</span>
                    </div>

                    {/* AI Reasoning */}
                    <p className="text-[11px] text-slate-400 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-white/[0.04]">
                      {item.reason}
                    </p>

                    {/* Price History Chart */}
                    <ProductPriceHistoryChart 
                      history={item.history || []}
                      currentPrice={item.currentPrice}
                      suggestedPrice={item.suggestedPrice}
                      productId={item.productId}
                    />
                  </div>

                  {/* Interactive Actions (Apply New Price & Revert) */}
                  <div className="flex items-center gap-2 pt-1">
                    <RippleButton
                      onClick={() => handleApplyNewPrice(item.productId, item.suggestedPrice, item.title)}
                      disabled={isApplied}
                      className={`flex-1 py-2.5 px-3 rounded-[14px] text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        isApplied
                          ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-royal-600 hover:bg-royal-500 text-white shadow-royal'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Applied (₹{item.suggestedPrice}) ✓</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Apply New Price</span>
                        </>
                      )}
                    </RippleButton>

                    <button
                      onClick={() => handleRevertPrice(item.productId, item.title)}
                      title="Revert to baseline price"
                      className="py-2.5 px-3 rounded-[14px] bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-medium transition flex items-center justify-center gap-1 shrink-0"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Revert</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. AI BEST TIME TO POST ENGINE */}
        {/* ========================================================================= */}
        <WeeklyPostingHeatmapEngine 
          bestTimeToPost={coachData.bestTimeToPost}
          onSetReminder={(title, detail) => handleApplyRecommendation('posting_reminder', `${title} (${detail})`)}
        />

        {/* ========================================================================= */}
        {/* 5. AUDIENCE INSIGHTS SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                <Users className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-display font-bold text-white">Audience Insights (Bharat Demographics)</h2>
            </div>
            <span className="text-xs text-slate-400">Returning Customer Cohort: {metrics.returningCustomerPct}%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Top Cities */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-3 hover:border-indigo-500/30 transition shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Top Cities</span>
                </span>
                <span className="text-[10px] text-slate-400">Share</span>
              </div>
              <div className="space-y-2.5">
                {coachData.audienceInsights.topCities.map((city, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-300 font-medium">{city.name}</span>
                      <span className="font-bold text-white">{city.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full" 
                        style={{ width: `${city.percentage * 2.5}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Age Groups */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-3 hover:border-indigo-500/30 transition shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                <span className="flex items-center gap-1.5 text-royal-400">
                  <Users className="h-3.5 w-3.5" />
                  <span>Age Groups</span>
                </span>
                <span className="text-[10px] text-slate-400">Volume</span>
              </div>
              <div className="space-y-3">
                {coachData.audienceInsights.ageGroups.map((age, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-white">
                      <span>{age.label}</span>
                      <span className="text-royal-300">{age.percentage}%</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">{age.badge}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Usage & Checkout Apps */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-3 hover:border-indigo-500/30 transition shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                <span className="flex items-center gap-1.5 text-pink-400">
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Device & UPI Split</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">
                  {coachData.audienceInsights.deviceUsage.mobile}% Mobile
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-base font-extrabold text-white">{coachData.audienceInsights.deviceUsage.mobile}%</div>
                  <div className="text-[10px] text-slate-400">Mobile Phone</div>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="text-base font-extrabold text-white">{coachData.audienceInsights.deviceUsage.desktop}%</div>
                  <div className="text-[10px] text-slate-400">Desktop / Mac</div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                {coachData.audienceInsights.deviceUsage.paymentApps.map((app, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] text-slate-300">
                    <span>{app.name}</span>
                    <span className="font-bold text-white">{app.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Returning Customers Cohort */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-3 hover:border-emerald-500/30 transition shadow-lg flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Returning Customers</span>
                  </span>
                  <span className="rounded-full bg-emerald-500/15 text-emerald-400 px-2 py-0.5 text-[10px] font-bold">
                    {metrics.returningCustomerPct}% Repeat Rate
                  </span>
                </div>
                <div className="text-2xl font-display font-extrabold text-white">
                  {coachData.audienceInsights.returningCustomers.cohortSize} High-Intent Buyers
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {coachData.audienceInsights.returningCustomers.summary}
                </p>
              </div>

              <button 
                onClick={() => handleApplyRecommendation('whatsapp_upsell', 'WhatsApp Cohort Campaign')}
                className="w-full py-2 px-3 rounded-[12px] bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{appliedRecommendations['whatsapp_upsell'] ? 'Campaign Queued ✓' : 'Queue WhatsApp Upsell'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. SMART RECOMMENDATIONS SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Lightbulb className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-display font-bold text-white">Smart Strategic Recommendations</h2>
            </div>
            <span className="text-xs text-slate-400">High-leverage actions based on active PostgreSQL data</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Rec 1: Best Posting Day & Time */}
            <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4 hover:border-pink-500/30 transition shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-pink-500/15 text-pink-400 border border-pink-500/30">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Optimal Posting Day & Golden Hour</h3>
                    <p className="text-[11px] text-slate-400">Algorithm Peak Engagement Telemetry</p>
                  </div>
                </div>
                <span className="rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/30 px-2.5 py-0.5 text-xs font-bold">
                  {coachData.smartRecommendations.postingSchedule.confidence}% Match
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-xs text-slate-400">Recommended Broadcast Window</div>
                <div className="text-base font-extrabold text-white">
                  {coachData.smartRecommendations.postingSchedule.bestDays} • {coachData.smartRecommendations.postingSchedule.bestTime}
                </div>
              </div>

              <div className="space-y-2">
                {coachData.smartRecommendations.postingSchedule.channelAnalysis.map((ch, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02]">
                    <span className="font-semibold text-slate-200">{ch.platform}</span>
                    <span className="text-slate-400 text-[11px]">{ch.time}</span>
                    <span className="text-emerald-400 text-[10px] font-bold">{ch.impact}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleApplyRecommendation('posting_reminder', 'Reminder Alert')}
                className="w-full py-2.5 px-4 rounded-[14px] bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 text-pink-300 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Bell className="h-3.5 w-3.5" />
                <span>{appliedRecommendations['posting_reminder'] ? 'Reminder Set for 07:30 PM IST ✓' : 'Set Posting Reminder Notification'}</span>
              </button>
            </div>

            {/* Rec 2: Launch Webinar Recommendation */}
            <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4 hover:border-royal-500/30 transition shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-royal-500/15 text-royal-400 border border-royal-500/30">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Launch High-Ticket Paid Webinar</h3>
                    <p className="text-[11px] text-slate-400">Placement Season Demand Capture</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold">
                  +₹{formatINR(coachData.smartRecommendations.webinarLaunch.projectedRevenue)} Projected
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-xs font-bold text-white">{coachData.smartRecommendations.webinarLaunch.recommendedTitle}</div>
                <div className="text-xs text-royal-300 font-semibold">{coachData.smartRecommendations.webinarLaunch.recommendedDayTime}</div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-slate-400 text-[10px]">Ticket Price</div>
                  <div className="font-bold text-white">₹{coachData.smartRecommendations.webinarLaunch.recommendedTicketPrice}</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-slate-400 text-[10px]">Target Seats</div>
                  <div className="font-bold text-white">{coachData.smartRecommendations.webinarLaunch.targetSeats} Seats</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-slate-400 text-[10px]">Gross GMV</div>
                  <div className="font-bold text-emerald-400">₹{formatINR(coachData.smartRecommendations.webinarLaunch.projectedRevenue)}</div>
                </div>
              </div>

              <Link
                href="/dashboard/bookings"
                className="w-full py-2.5 px-4 rounded-[14px] bg-royal-600 hover:bg-royal-500 text-white text-xs font-bold shadow-royal transition flex items-center justify-center gap-2"
              >
                <span>Draft 1-Click Webinar Page</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Rec 3: Membership Upsell Opportunity */}
            <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4 hover:border-purple-500/30 transition shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Membership Tier Upsell Cohort</h3>
                    <p className="text-[11px] text-slate-400">Current MRR: ₹{formatINR(metrics.membershipMRR)}/mo</p>
                  </div>
                </div>
                <span className="rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 px-2.5 py-0.5 text-xs font-bold">
                  {coachData.smartRecommendations.membershipUpsell.targetCohortCount} Warm Leads
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="text-xs text-slate-400">Recommended Plan & Discount</div>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{coachData.smartRecommendations.membershipUpsell.membershipPlanName} (₹{coachData.smartRecommendations.membershipUpsell.monthlyPrice}/mo)</span>
                  <span className="text-emerald-400 font-mono text-xs">{coachData.smartRecommendations.membershipUpsell.recommendedDiscountCode}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs px-1 text-slate-300">
                <span>Expected ARR Addition:</span>
                <span className="font-bold text-purple-300">+₹{formatINR(coachData.smartRecommendations.membershipUpsell.expectedARRAddition)} / year</span>
              </div>

              <Link
                href="/dashboard/memberships"
                className="w-full py-2.5 px-4 rounded-[14px] bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <span>Configure Membership Cohort</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Rec 4: Brand Collaboration Suggestion */}
            <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4 hover:border-amber-500/30 transition shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <Flame className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Brand Sponsorship Opportunity</h3>
                    <p className="text-[11px] text-slate-400">CreatorOS Marketplace Brief Match</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold">
                  {coachData.smartRecommendations.brandCollaboration.matchScore}% Match
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{coachData.smartRecommendations.brandCollaboration.suggestedBrand}</span>
                  <span className="text-xs font-extrabold text-amber-400">₹{formatINR(coachData.smartRecommendations.brandCollaboration.suggestedFee)} Fee</span>
                </div>
                <div className="text-[11px] text-slate-400">{coachData.smartRecommendations.brandCollaboration.proposedDeliverable}</div>
              </div>

              <p className="text-[11px] text-slate-400 leading-tight">
                {coachData.smartRecommendations.brandCollaboration.reason}
              </p>

              <Link
                href="/dashboard/marketplace"
                className="w-full py-2.5 px-4 rounded-[14px] bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <span>Submit 1-Click Proposal with Media Kit</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7. INTERACTIVE AI BUSINESS COACH CHAT ASSISTANT */}
        {/* ========================================================================= */}
        <div className="rounded-[24px] border border-white/[0.12] bg-gradient-to-b from-[#0A0D17] to-[#06080F] p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-royal-600/20 border border-royal-500/30 flex items-center justify-center text-royal-400">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Ask AI Business Coach</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-xs text-slate-400">Instant answers regarding pricing, cohorts, conversions, and sponsorships</p>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="hidden lg:flex items-center gap-2">
              <button 
                onClick={() => handleSendMessage('How can I double my cohort course sales this month?')}
                className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] transition"
              >
                🚀 Double Cohort Sales
              </button>
              <button 
                onClick={() => handleSendMessage('What is the optimal price point for Tier-2 Indian students?')}
                className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] transition"
              >
                💰 Tier-2 Student Pricing
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs leading-relaxed ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="h-7 w-7 rounded-lg bg-royal-600/20 border border-royal-500/30 flex items-center justify-center text-royal-400 shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-[16px] max-w-xl whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-royal-600 text-white rounded-br-none'
                      : 'bg-white/[0.04] border border-white/[0.08] text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
                <Bot className="h-3.5 w-3.5 text-royal-400 animate-spin" />
                <span>AI Coach is analyzing your telemetry...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything (e.g. 'How should I pitch the ₹85K boAt sponsorship?', 'What is my best performing channel?')"
              className="flex-1 bg-white/[0.03] border border-white/[0.08] focus:border-royal-500 rounded-[14px] px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition"
            />
            <RippleButton
              onClick={() => handleSendMessage()}
              className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2.5 text-xs font-bold text-white shadow-royal shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </RippleButton>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
