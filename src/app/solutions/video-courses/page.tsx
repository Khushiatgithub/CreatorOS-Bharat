'use client';

import React from 'react';
import FeaturePageLayout, { FeaturePageData } from '@/components/features/FeaturePageLayout';
import { 
  Video, 
  PlayCircle, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Lock, 
  BookOpen, 
  Zap,
  Sparkles,
  Users
} from 'lucide-react';

const videoCoursesData: FeaturePageData = {
  badge: 'Video Courses & Cohorts',
  title: 'Host High-Def Masterclasses &',
  highlightedTitle: 'Live Cohort Programs',
  description: 'The Kajabi and Teachable alternative for Indian educators. Host multi-module video courses, track student progression, issue completion certificates, and accept 1-click UPI payments.',
  metrics: [
    { label: 'Video Streaming Speed', value: '4K Ready', change: 'Adaptive Bitrate CDN' },
    { label: 'Student Course Completion', value: '78.2%', change: '+2.4x vs Udemy' },
    { label: 'Transaction Fees', value: '0%', change: 'On Pro Tier' }
  ],
  overviewTitle: 'Enterprise-Grade Video Hosting without the Western Price Tag',
  overviewDescription: 'Western course platforms charge $150+/month and force clunky USD card checkouts. CreatorOS gives you enterprise DRM-protected video streaming, student portals, quiz checkpoints, and native UPI checkout with zero hosting fees.',
  steps: [
    {
      number: '01',
      title: 'Build Modules & Upload Videos',
      description: 'Create multi-chapter curriculum with video lessons, source code attachments, and cheat sheets.',
      badge: 'Easy Upload'
    },
    {
      number: '02',
      title: 'Set One-Time or EMI Pricing',
      description: 'Price your course in INR (e.g. ₹2,499) with optional 1-click UPI or multi-part installments.',
      badge: 'Flexible INR'
    },
    {
      number: '03',
      title: 'Student Enrolls & Unlocks Portal',
      description: 'Instant student account activation with progress tracking across mobile, tablet, and desktop.',
      badge: 'Auto Access'
    },
    {
      number: '04',
      title: 'Issue Branded Certificates',
      description: 'Students automatically receive personalized PDF completion certificates when they finish the course.',
      badge: 'Auto Certs'
    }
  ],
  benefits: [
    {
      icon: Video,
      title: '4K Adaptive Bitrate Streaming',
      description: 'Smooth video playback even on 4G/5G mobile connections across Tier 2 and Tier 3 Indian towns.',
      tag: 'Buffer-Free'
    },
    {
      icon: Lock,
      title: 'DRM Video Piracy Protection',
      description: 'Dynamic watermarking with the student’s email and phone number prevents unauthorized screen recording.',
      tag: 'Piracy Guard'
    },
    {
      icon: GraduationCap,
      title: 'Student Progression Tracking',
      description: 'Track lesson completion percentages, quiz scores, and dropoff points with rich student analytics.',
      tag: 'Analytics'
    },
    {
      icon: Award,
      title: 'Automated Digital Certificates',
      description: 'Issue verifiable completion credentials that students can share on LinkedIn and resume profiles.',
      tag: 'LinkedIn Certs'
    },
    {
      icon: Users,
      title: 'Live Cohort Zoom & Meet Sync',
      description: 'Schedule live weekend lectures with automated calendar invites and attendance recording.',
      tag: 'Live Cohorts'
    },
    {
      icon: Zap,
      title: '0% Revenue Share',
      description: 'Stop giving away 63% on Udemy. Keep 100% of your course fees directly into your Indian bank account.',
      tag: '100% Profit'
    }
  ],
  previewComponent: (
    <div className="max-w-lg mx-auto rounded-[24px] border border-white/[0.15] bg-[#0A0E1A] p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] font-mono text-royal-400 font-bold uppercase tracking-wider">
            STUDENT PORTAL
          </span>
          <h4 className="font-display font-bold text-sm text-white mt-0.5">
            Full-Stack Next.js 14 & AI Engineering Masterclass
          </h4>
        </div>
        <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono font-semibold">
          78% Completed
        </span>
      </div>

      {/* Course Curriculum Preview */}
      <div className="space-y-2 text-xs">
        <div className="rounded-xl bg-white/[0.04] p-3 flex items-center justify-between border border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="font-medium text-white">Module 1: Server Components & Actions</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">42 mins</span>
        </div>

        <div className="rounded-xl bg-royal-600/15 p-3 flex items-center justify-between border border-royal-500/30">
          <div className="flex items-center gap-2.5">
            <PlayCircle className="h-4 w-4 text-royal-400 animate-pulse" />
            <span className="font-semibold text-royal-200">Module 2: Real-Time UPI Gateway Webhooks</span>
          </div>
          <span className="text-[10px] text-royal-400 font-mono font-bold">Now Playing</span>
        </div>

        <div className="rounded-xl bg-white/[0.02] p-3 flex items-center justify-between border border-white/[0.04] text-slate-400">
          <div className="flex items-center gap-2.5">
            <Lock className="h-4 w-4 text-slate-500" />
            <span>Module 3: PostgreSQL & Vector Search Setup</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">55 mins</span>
        </div>
      </div>
    </div>
  ),
  faqs: [
    {
      question: 'Where are my course videos hosted?',
      answer: 'Videos are hosted on high-performance AWS/Cloudflare edge CDN storage with adaptive streaming optimized for Indian broadband and mobile networks.'
    },
    {
      question: 'Is there video piracy protection?',
      answer: 'Yes! CreatorOS applies dynamic watermarking (displaying the student’s email and phone number on screen) and encrypted streaming to prevent illegal copying.'
    },
    {
      question: 'Can I sell live cohorts with Zoom or Google Meet?',
      answer: 'Yes! You can configure live session dates, time slots, and automated Google Meet or Zoom invites for batch-based cohorts.'
    },
    {
      question: 'Can students access the course on mobile?',
      answer: 'Yes, the student portal is 100% responsive and optimized for seamless video playback on Android and iOS browsers.'
    }
  ]
};

export default function VideoCoursesPage() {
  return <FeaturePageLayout data={videoCoursesData} />;
}
