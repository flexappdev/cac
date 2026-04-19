"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { loadProgress, toggleLesson } from "@/lib/progress";

interface Props {
  courseId: string;
  lessonId: string;
  accentHex: string;
}

export default function LessonToggle({ courseId, lessonId, accentHex }: Props) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const data = loadProgress();
    setDone(!!data.completedLessons[`${courseId}/${lessonId}`]);
  }, [courseId, lessonId]);

  const handleToggle = () => {
    toggleLesson(courseId, lessonId);
    setDone((d) => !d);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all shrink-0 ${
        done
          ? "border-zinc-700 bg-zinc-800/60 text-zinc-400"
          : "border-zinc-700 bg-zinc-900 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
      }`}
    >
      {done ? (
        <CheckCircle2 className="h-3.5 w-3.5" style={{ color: accentHex }} />
      ) : (
        <Circle className="h-3.5 w-3.5 text-zinc-600" />
      )}
      {done ? "Completed" : "Mark complete"}
    </button>
  );
}
