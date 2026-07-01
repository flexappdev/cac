import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Course } from "@/lib/courses";
import { COURSE_COLORS } from "@/lib/courses";
import { getCourseDiagram, DIAGRAM_TYPE } from "@/lib/course-diagrams";

interface DiagramCardProps {
  course: Course;
}

export default function DiagramCard({ course }: DiagramCardProps) {
  const colors = COURSE_COLORS[course.color] ?? COURSE_COLORS["blue"];
  const diagram = getCourseDiagram(course.id);
  const diagramType = DIAGRAM_TYPE[course.id] ?? "Diagram";

  return (
    <Link
      href={`/domains/${course.id}`}
      className="group block border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
    >
      {/* Diagram body */}
      <div className="aspect-[16/10] bg-slate-50 dark:bg-zinc-950/40 border-b border-zinc-200 dark:border-zinc-800 p-4">
        {diagram ?? (
          <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600">
            Diagram coming soon
          </div>
        )}
      </div>

      {/* Meta footer */}
      <div className="px-4 py-3 flex items-center gap-3">
        <span
          className="flex items-center justify-center w-6 h-6 rounded text-[10px] font-bold text-white shrink-0"
          style={{ backgroundColor: colors.hex }}
        >
          {course.course}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 truncate">{course.title}</div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mt-0.5">{diagramType}</div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-zinc-400 dark:text-zinc-600 shrink-0 group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors" />
      </div>
    </Link>
  );
}
