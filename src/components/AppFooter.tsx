"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Shuffle } from "lucide-react";
import { useSettings, ACCENT_PRESETS } from "@/lib/settings";
import { COURSES } from "@/lib/courses";

export default function AppFooter() {
  const { settings } = useSettings();
  const router = useRouter();
  const leftOffset = settings.navCollapsed ? 52 : 180;
  const accentName = ACCENT_PRESETS[settings.accentColor].name;

  const handleRandom = () => {
    const allLessons: { courseId: string; lessonId: string }[] = [];
    for (const course of COURSES) {
      for (const lesson of course.lessons) {
        allLessons.push({ courseId: course.id, lessonId: lesson.id });
      }
    }
    const pick = allLessons[Math.floor(Math.random() * allLessons.length)];
    router.push(`/domains/${pick.courseId}/${pick.lessonId}`);
  };

  return (
    <div
      className="fixed bottom-0 right-0 z-[100] border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-sm transition-[left] duration-200"
      style={{ left: `${leftOffset}px` }}
    >
      <div className="max-w-[1800px] mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left: app name + accent */}
        <div className="flex items-center gap-2">
          <GraduationCap className="h-3.5 w-3.5" style={{ color: "var(--app-accent)" }} />
          <span className="text-xs text-zinc-500">CCA Study App</span>
          <span className="text-zinc-700">·</span>
          <Link href="/settings" className="text-xs hover:text-zinc-400 transition-colors" style={{ color: "var(--app-accent-light)" }}>
            {accentName}
          </Link>
        </div>

        {/* Right: random */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleRandom}
            title="Go to a random lesson"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <Shuffle className="h-3 w-3" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </div>
    </div>
  );
}
