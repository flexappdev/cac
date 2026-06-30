"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, FileText, List, ChevronRight } from "lucide-react";
import type { Course, Lesson } from "@/lib/courses";
import { COURSE_COLORS } from "@/lib/courses";
import { loadProgress, toggleLesson } from "@/lib/progress";

interface LessonListProps {
  domain: Course;
}

export default function LessonList({ domain }: LessonListProps) {
  const colors = COURSE_COLORS[domain.color] ?? COURSE_COLORS["blue"];
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const data = loadProgress();
    const domainCompleted: Record<string, boolean> = {};
    domain.lessons.forEach((lesson) => {
      domainCompleted[lesson.id] = !!data.completedLessons[`${domain.id}/${lesson.id}`];
    });
    setCompleted(domainCompleted);
  }, [domain.id, domain.lessons]);

  const handleToggle = (e: React.MouseEvent, lesson: Lesson) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLesson(domain.id, lesson.id);
    setCompleted((prev) => ({ ...prev, [lesson.id]: !prev[lesson.id] }));
  };

  return (
    <div className="space-y-2">
      {domain.lessons.map((lesson, idx) => {
        const isDone = completed[lesson.id] ?? false;
        return (
          <Link
            key={lesson.id}
            href={`/domains/${domain.id}/${lesson.id}`}
            className={`group w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
              isDone
                ? "bg-zinc-800/60 border-zinc-700"
                : "bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/40"
            }`}
          >
            {/* Lesson number */}
            <span className="text-[11px] text-zinc-600 w-5 text-center shrink-0 font-mono">
              {idx + 1}
            </span>

            {/* Toggle check (click stops propagation so it doesn't navigate) */}
            <button
              onClick={(e) => handleToggle(e, lesson)}
              className="shrink-0"
              title={isDone ? "Mark incomplete" : "Mark complete"}
            >
              {isDone ? (
                <CheckCircle2 className="h-4 w-4" style={{ color: colors.hex }} />
              ) : (
                <Circle className="h-4 w-4 text-zinc-700 hover:text-zinc-500 transition-colors" />
              )}
            </button>

            {/* Title */}
            <span className={`flex-1 text-sm ${isDone ? "text-zinc-500 line-through" : "text-zinc-200"}`}>
              {lesson.title}
            </span>

            {/* Source tag */}
            <div className="flex items-center gap-1 text-zinc-600 text-[11px] shrink-0">
              {lesson.source === "captured" ? <FileText className="h-3 w-3" /> : <List className="h-3 w-3" />}
              <span>{lesson.source === "captured" ? "note" : "outline"}</span>
            </div>

            <ChevronRight className="h-3.5 w-3.5 text-zinc-700 group-hover:text-zinc-500 shrink-0 transition-colors" />
          </Link>
        );
      })}
    </div>
  );
}
