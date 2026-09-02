'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useCreatorStore } from '@/lib/store';
import Link from 'next/link';
import { 
  PlayCircle, 
  CheckCircle, 
  Lock, 
  Download, 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  FileText, 
  Clock, 
  BookOpen,
  Award 
} from 'lucide-react';
import UPICheckoutModal from '@/components/checkout/UPICheckoutModal';

export default function CourseViewerPage() {
  const params = useParams();
  const rawUsername = params?.username as string;
  const username = decodeURIComponent(rawUsername || '');
  const courseId = params?.courseId as string;

  const { allCourses, creators } = useCreatorStore();

  const creator = creators.find((c) => c.username.toLowerCase() === username.toLowerCase()) || creators[0];
  const course = allCourses.find((c) => c.id === courseId) || allCourses[0];

  const firstLesson = course?.modules[0]?.lessons[0];
  const [selectedLesson, setSelectedLesson] = useState(firstLesson || {
    id: 'les_1_1',
    title: 'Welcome & The 18 Must-Know LeetCode Patterns',
    duration: '18 mins',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isFreePreview: true,
    notes: 'Summary: Master the fundamentals of pattern matching in technical coding rounds.'
  });

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([firstLesson?.id || 'les_1_1']);

  const toggleLessonComplete = (id: string) => {
    if (completedLessons.includes(id)) {
      setCompletedLessons(completedLessons.filter((l) => l !== id));
    } else {
      setCompletedLessons([...completedLessons, id]);
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-[#05070B] text-white flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-lg font-bold">Course Not Found</h2>
          <Link href={`/${creator.username}`} className="text-royal-400 mt-2 inline-block text-xs">Return to Storefront</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 font-sans">
      
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#05070B]/85 backdrop-blur-2xl px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href={`/${creator.username}`}
            className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{creator.name}'s Store</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-royal-400 hidden sm:inline">{course.title}</span>
            {!isEnrolled ? (
              <button
                onClick={() => setShowCheckoutModal(true)}
                className="flex items-center gap-1.5 rounded-[12px] bg-royal-600 hover:bg-royal-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-royal btn-press"
              >
                <Zap className="h-3.5 w-3.5 fill-white" />
                <span>Unlock Course (₹{course.price})</span>
              </button>
            ) : (
              <span className="rounded-[12px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-bold flex items-center gap-1.5 font-mono">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Lifetime Access</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* TWO COLUMN COURSE INTERFACE */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Video Player & Lesson Notes (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* HD Video Player Container - 20px rounded */}
          <div className="relative aspect-video w-full rounded-[24px] overflow-hidden bg-black border border-white/[0.1] shadow-2xl flex items-center justify-center">
            {selectedLesson.isFreePreview || isEnrolled ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#090E1F] to-[#04060C] p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-royal-600 text-white flex items-center justify-center mb-4 shadow-royal hover:scale-105 transition cursor-pointer btn-press">
                  <PlayCircle className="h-10 w-10 fill-white text-royal-600" />
                </div>
                <h3 className="font-display text-lg font-bold text-white max-w-md">{selectedLesson.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Duration: {selectedLesson.duration} • 1080p HD Stream</p>
                <span className="mt-3 rounded-full bg-white/[0.06] px-3 py-1 text-[10px] text-royal-300 font-mono border border-white/[0.08]">
                  HD Video Stream Simulator
                </span>
              </div>
            ) : (
              <div className="text-center p-8 bg-black/90">
                <div className="h-12 w-12 rounded-full bg-royal-600/20 border border-royal-500/30 text-royal-400 flex items-center justify-center mx-auto mb-3">
                  <Lock className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-white">This Lesson is Locked</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Unlock all {course.modules.reduce((s, m) => s + m.lessons.length, 0)} lessons and downloadable source files via instant UPI checkout.
                </p>
                <button
                  onClick={() => setShowCheckoutModal(true)}
                  className="mt-4 inline-flex items-center gap-2 rounded-[14px] bg-royal-600 hover:bg-royal-500 px-5 py-2 text-xs font-bold text-white shadow-royal btn-press"
                >
                  <Zap className="h-4 w-4 fill-white" />
                  <span>Enroll for ₹{course.price}</span>
                </button>
              </div>
            )}
          </div>

          {/* Lesson Details & Notes - 20px rounded */}
          <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-royal-400 uppercase tracking-wider font-mono">Current Lesson</span>
                <h2 className="font-display text-lg font-bold text-white mt-0.5">{selectedLesson.title}</h2>
              </div>

              <button
                onClick={() => toggleLessonComplete(selectedLesson.id)}
                className={`flex items-center gap-1.5 rounded-[12px] px-3.5 py-1.5 text-xs font-medium border transition btn-press ${
                  completedLessons.includes(selectedLesson.id)
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                <span>{completedLessons.includes(selectedLesson.id) ? 'Completed' : 'Mark as Complete'}</span>
              </button>
            </div>

            {selectedLesson.notes && (
              <div className="rounded-[14px] bg-black/30 border border-white/[0.04] p-4 text-xs text-slate-300 leading-relaxed">
                <p className="font-semibold text-white mb-1">Key Takeaways & Notes:</p>
                <p>{selectedLesson.notes}</p>
              </div>
            )}

            {/* Certificate Status */}
            <div className="rounded-[16px] border border-royal-500/25 bg-gradient-to-r from-[#0C1226] to-[#0A0E1A] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[10px] bg-royal-600/20 text-royal-400">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white">Verified Completion Certificate</h4>
                  <p className="text-[10px] text-slate-400">Awarded automatically upon 100% completion</p>
                </div>
              </div>
              <span className="text-xs font-mono text-royal-300 font-bold">
                {Math.round((completedLessons.length / (course.modules.reduce((s, m) => s + m.lessons.length, 0) || 1)) * 100)}%
              </span>
            </div>

          </div>

        </div>

        {/* Right: Course Curriculum Playlist (4 cols) */}
        <div className="lg:col-span-4 rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-5 shadow-glass-card space-y-4">
          <div>
            <h3 className="font-display text-base font-bold text-white">Course Curriculum</h3>
            <p className="text-xs text-slate-400">{course.modules.length} Modules • {course.totalDuration}</p>
          </div>

          <div className="space-y-2.5 max-h-[580px] overflow-y-auto no-scrollbar">
            {course.modules.map((m) => (
              <div key={m.id} className="rounded-[16px] bg-white/[0.03] border border-white/[0.05] p-3 space-y-1.5">
                <p className="text-xs font-semibold text-white">{m.title}</p>

                <div className="space-y-1">
                  {m.lessons.map((les) => {
                    const isSelected = selectedLesson.id === les.id;
                    const isCompleted = completedLessons.includes(les.id);

                    return (
                      <button
                        key={les.id}
                        onClick={() => setSelectedLesson(les)}
                        className={`w-full flex items-center justify-between p-2 rounded-[10px] text-left text-xs transition ${
                          isSelected
                            ? 'bg-royal-600 text-white font-semibold shadow-royal-sm'
                            : 'text-slate-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          {isCompleted ? (
                            <CheckCircle className={`h-3.5 w-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                          ) : (
                            <PlayCircle className={`h-3.5 w-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 pl-2">
                          {les.isFreePreview && (
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded font-mono ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-royal-600/20 text-royal-300'
                            }`}>
                              Free
                            </span>
                          )}
                          {!les.isFreePreview && !isEnrolled && (
                            <Lock className={`h-3 w-3 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* UPI Checkout Modal */}
      {showCheckoutModal && (
        <UPICheckoutModal
          isOpen={true}
          onClose={() => {
            setShowCheckoutModal(false);
            setIsEnrolled(true);
          }}
          item={{
            id: course.id,
            title: course.title,
            price: course.price,
            type: 'course'
          }}
        />
      )}

    </div>
  );
}
