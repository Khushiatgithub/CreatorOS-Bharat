'use client';

import React from 'react';
import { useCreatorStore } from '@/lib/store';
import { 
  Video, 
  Plus, 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  PlayCircle, 
  CheckCircle, 
  Sparkles, 
  ExternalLink,
  ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';
import { PageTransition, HoverCard, RippleButton } from '@/components/ui/motion';

export default function CoursesManagerPage() {
  const { courses, activeCreator } = useCreatorStore();

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Courses & Cohorts Studio</span>
              <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                Kajabi Alternative
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Host video courses, cohort curriculum, certificates, and student portals with instant UPI access.
            </p>
          </div>

          <RippleButton
            onClick={() => alert('Course curriculum wizard opened! Configure video lessons and downloadable files.')}
            className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2.5 text-xs font-semibold text-white shadow-royal"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Course</span>
          </RippleButton>
        </div>

        {/* Courses List */}
        <div className="space-y-5">
          {courses.map((c) => (
            <HoverCard
              hoverY={-3}
              key={c.id}
              className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-6 shadow-glass-card space-y-5 hover:border-royal-500/35"
            >
              {/* Top row with cover, title, and metrics */}
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="relative h-40 md:w-60 rounded-[16px] overflow-hidden shrink-0 bg-black/40">
                  <img src={c.coverImage} alt={c.title} className="h-full w-full object-cover" />
                  <div className="absolute top-2.5 left-2.5 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[9px] font-bold text-royal-400 border border-royal-500/30">
                    {c.level}
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-slate-300">
                      {c.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-royal-400 font-bold">
                      <Star className="h-3 w-3 fill-royal-400 text-royal-400" />
                      <span>{c.rating}</span>
                      <span className="text-slate-500 font-normal text-[11px]">({c.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <h3 className="font-display text-base font-bold text-white">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {c.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-1.5 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-royal-400" />
                      <span>{c.totalDuration}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Users className="h-3.5 w-3.5 text-blue-400" />
                      <span>{c.studentCount} Students</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono text-[11px]">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span>Certificate Enabled</span>
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0 md:border-l md:border-white/[0.08] md:pl-6 space-y-3">
                  <div>
                    <span className="font-display text-2xl font-bold text-white">₹{c.price}</span>
                    {c.originalPrice && (
                      <p className="text-xs text-slate-500 line-through">₹{c.originalPrice}</p>
                    )}
                  </div>

                  <Link
                    href={`/${activeCreator?.username}/course/${c.id}`}
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 rounded-[14px] bg-white/[0.05] hover:bg-white/[0.08] px-4 py-2 text-xs font-semibold text-white transition btn-press"
                  >
                    <span>Student View</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-royal-400" />
                  </Link>
                </div>
              </div>

              {/* Modules Curriculum Accordion */}
              <div className="rounded-[16px] bg-black/30 border border-white/[0.05] p-4 space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Curriculum Breakdown ({c.modules.length} Modules)
                </h4>

                <div className="space-y-2">
                  {c.modules.map((m, mIdx) => (
                    <div key={mIdx} className="rounded-[12px] bg-white/[0.03] p-3 text-xs">
                      <div className="font-semibold text-white flex items-center justify-between mb-2">
                        <span>{m.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{m.lessons.length} Lessons</span>
                      </div>

                      <div className="space-y-1.5 pl-2 border-l border-white/[0.08]">
                        {m.lessons.map((les, lIdx) => (
                          <div key={lIdx} className="flex items-center justify-between text-slate-300 text-[11px]">
                            <div className="flex items-center gap-2">
                              <PlayCircle className="h-3.5 w-3.5 text-royal-400" />
                              <span>{les.title}</span>
                              {les.isFreePreview && (
                                <span className="rounded bg-royal-600/20 text-royal-300 text-[9px] font-bold font-mono">
                                  Free Preview
                                </span>
                              )}
                            </div>
                            <span className="text-slate-500 font-mono text-[10px]">{les.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </HoverCard>
          ))}
        </div>

      </div>
    </PageTransition>
  );
}
