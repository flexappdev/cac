"use client";

import { useEffect, useState } from "react";
import { Trophy, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { COURSE_COLORS, COURSES } from "@/lib/courses";
import { loadProgress } from "@/lib/progress";

interface DomainStat {
  id: string;
  title: string;
  color: string;
  completed: number;
  total: number;
  pct: number;
  remaining: number;
}

export default function ProgressPage() {
  const [stats, setStats] = useState<DomainStat[]>([]);
  const [overall, setOverall] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);

  useEffect(() => {
    const data = loadProgress();
    let allCompleted = 0;
    let allTotal = 0;
    let allRemaining = 0;

    const computed: DomainStat[] = COURSES.map((domain) => {
      const completedKeys = domain.lessons.filter(
        (l) => data.completedLessons[`${domain.id}/${l.id}`]
      );
      const completed = completedKeys.length;
      const total = domain.lessons.length;
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      const remaining = total - completed;

      allCompleted += completed;
      allTotal += total;
      allRemaining += remaining;

      return { id: domain.id, title: domain.title, color: domain.color, completed, total, pct, remaining };
    });

    setStats(computed);
    setOverall(allTotal > 0 ? Math.round((allCompleted / allTotal) * 100) : 0);
    setTotalRemaining(allRemaining);
    setTotalCompleted(allCompleted);
    setTotalLessons(allTotal);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[800px] mx-auto px-6 py-3 flex items-center gap-3">
          <Trophy className="h-4 w-4" style={{ color: "var(--app-accent)" }} />
          <h1 className="text-sm font-semibold text-zinc-100">Progress</h1>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-8 space-y-8">

        {/* Overall stats */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Overall Progress</p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-4xl font-bold text-zinc-100" style={{ color: "var(--app-accent)" }}>
                  {overall}%
                </p>
                <p className="text-xs text-zinc-600 mt-1">
                  {totalCompleted} / {totalLessons} lessons complete
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-zinc-300">{totalRemaining}</p>
                <p className="text-xs text-zinc-600 mt-0.5">lessons remaining</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${overall}%`, backgroundColor: "var(--app-accent)" }}
              />
            </div>
            {overall === 100 && (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-medium">All lessons complete! Good luck on the exam.</span>
              </div>
            )}
          </div>
        </section>

        {/* Per-domain stats */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">By Course</p>
          <div className="space-y-3">
            {stats.map((stat) => {
              const colors = COURSE_COLORS[stat.color] ?? COURSE_COLORS["blue"];
              return (
                <Link
                  key={stat.id}
                  href={`/domains/${stat.id}`}
                  className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors truncate">
                        {stat.title}
                      </p>
                      <span className="text-xs font-semibold ml-4 shrink-0" style={{ color: colors.hex }}>
                        {stat.pct}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${stat.pct}%`, backgroundColor: colors.hex }}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-600 mt-1.5">
                      {stat.completed}/{stat.total} lessons
                      {stat.remaining > 0 && ` · ${stat.remaining} left`}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
