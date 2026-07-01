import { Network } from "lucide-react";
import DiagramCard from "@/components/DiagramCard";
import { COURSES } from "@/lib/courses";

export const metadata = {
  title: "Course Diagrams — CCA",
  description: "One editorial tech diagram per course across all 17 CCA study modules.",
};

export default function DiagramsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-3">
          <Network className="h-4 w-4" style={{ color: "var(--app-accent)" }} />
          <h1 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Course Diagrams</h1>
          <span className="text-xs text-zinc-500 dark:text-zinc-600 ml-auto">
            {COURSES.length} diagrams · one per course
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Intro */}
        <div className="mb-8 max-w-2xl">
          <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">One tech diagram per course</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Editorial-quality SVG overviews in the Cleverfox house style — 1px hairlines, minimal accents, grid-aligned. Each
            card links back to the course page for the full lesson set.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSES.map((course) => (
            <DiagramCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
