import { Info, GraduationCap, BookOpen, Brain, Trophy } from "lucide-react";
import Link from "next/link";
import { COURSES, EXAM_DOMAINS } from "@/lib/courses";

export default function AboutPage() {
  const totalLessons = COURSES.reduce((sum, course) => sum + course.lessons.length, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[900px] mx-auto px-6 py-3 flex items-center gap-3">
          <Info className="h-4 w-4" style={{ color: "var(--app-accent)" }} />
          <h1 className="text-sm font-semibold text-zinc-100">About the CCA Certification</h1>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-8 space-y-10">

        {/* Hero */}
        <section className="flex items-start gap-5">
          <div
            className="flex items-center justify-center w-16 h-16 rounded-2xl shrink-0"
            style={{ backgroundColor: "var(--app-accent)20" }}
          >
            <GraduationCap className="h-8 w-8" style={{ color: "var(--app-accent)" }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">CCA Study System</h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-[600px]">
              This repo combines a certification guide, cheat sheets, a captured Anthropic course
              library, and a local Next.js dashboard. The quiz content still targets the five CCA
              exam domains, while the catalog page now tracks the full imported course archive.
            </p>
          </div>
        </section>

        {/* Exam overview */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Exam Overview</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Courses", value: String(COURSES.length), icon: BookOpen },
              { label: "Lessons", value: String(totalLessons), icon: Brain },
              { label: "Exam Domains", value: String(EXAM_DOMAINS.length), icon: Trophy },
              { label: "Quiz Questions", value: "15", icon: GraduationCap },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <Icon className="h-4 w-4 text-zinc-400 mx-auto mb-2" />
                <p className="text-xl font-bold text-zinc-100" style={{ color: "var(--app-accent)" }}>
                  {value}
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Domains list */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Highlighted Courses</p>
          <div className="space-y-2">
            {COURSES.slice(0, 6).map((domain) => (
              <Link
                key={domain.id}
                href={`/domains/${domain.id}`}
                className="flex items-center gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-800/60 transition-all group"
              >
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold text-white shrink-0"
                  style={{
                    backgroundColor:
                      domain.color === "blue" ? "#3b82f6" :
                      domain.color === "orange" ? "#f59e0b" :
                      domain.color === "green" ? "#22c55e" :
                      domain.color === "red" ? "#ef4444" :
                      domain.color === "amber" ? "#f59e0b" :
                      domain.color === "purple" ? "#a855f7" :
                      domain.color === "teal" ? "#14b8a6" :
                      "#ec4899"
                  }}
                >
                  {domain.course}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors">
                    {domain.title}
                  </p>
                  <p className="text-xs text-zinc-600 truncate">{domain.description}</p>
                </div>
                <span className="text-xs text-zinc-600 shrink-0">{domain.lessons.length} lessons</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Exam body note */}
        <section className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">How To Use It</p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Use the course catalog for source material, the quiz page for domain-based recall, and
            the repo docs for the long-form guide. The current exam registration path remains{" "}
            <a
              href="https://claudecertifications.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-200 underline underline-offset-2 transition-colors"
              style={{ color: "var(--app-accent-light)" }}
            >
              claudecertifications.com
            </a>{" "}
            via Skilljar.
          </p>
          <div className="mt-3 flex gap-3">
            <Link
              href="/resources"
              className="text-xs px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
            >
              View Resources
            </Link>
            <Link
              href="/"
              className="text-xs px-3 py-1.5 rounded-lg text-white transition-colors"
              style={{ backgroundColor: "var(--app-accent-dark)" }}
            >
              Start Studying
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
