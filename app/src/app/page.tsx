import { GraduationCap, BookOpen, Map, CheckSquare, Layers, Cpu } from "lucide-react";
import DomainGrid from "@/components/DomainGrid";
import { COURSES } from "@/lib/courses";

const STUDY_FLOW = [
  { step: 1, label: "Read the guide index", detail: "Understand the overall study path" },
  { step: 2, label: "Work through the 5 exam domains", detail: "Prompt Eng · Claude Code · Agentic · MCP · Projects" },
  { step: 3, label: "Read the captured course notes", detail: "17 courses from the Anthropic training library" },
  { step: 4, label: "Use the cheat sheet for review", detail: "Condensed cram sheet for memorisation" },
  { step: 5, label: "Practice the quiz", detail: "15 CCA exam questions across all 5 domains" },
];

const DOMAINS = [
  { n: 1, label: "Prompt Engineering & AI Fluency", icon: Layers },
  { n: 2, label: "Claude Code Development",         icon: Cpu },
  { n: 3, label: "Agentic Architecture",             icon: Map },
  { n: 4, label: "Model Context Protocol",           icon: BookOpen },
  { n: 5, label: "Projects, Artifacts & Skills",     icon: CheckSquare },
];

export default function Home() {
  const totalLessons = COURSES.reduce((sum, course) => sum + course.lessons.length, 0);
  const capturedLessons = COURSES.reduce(
    (sum, course) => sum + course.lessons.filter((lesson) => lesson.source === "captured").length,
    0
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Page header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center gap-3">
          <GraduationCap className="h-5 w-5 shrink-0" style={{ color: "var(--app-accent)" }} />
          <div>
            <h1 className="text-sm font-semibold text-zinc-100">CAC Study App</h1>
            <p className="text-xs text-zinc-500">{COURSES.length} courses · {totalLessons} lessons · 15 CCA review questions</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8 space-y-10">

        {/* Hero intro */}
        <section className="rounded-2xl border border-l-4 border-zinc-800 p-6" style={{ borderLeftColor: "var(--app-accent)", background: "color-mix(in srgb, var(--app-accent) 5%, transparent)" }}>
          <h2 className="text-lg font-bold text-zinc-100 mb-2">Codex Certified Architect (CCA)</h2>
          <p className="text-sm text-zinc-400 leading-relaxed mb-5">
            A complete study system for the CCA certification. Combines long-form guides, captured course notes,
            cheat sheets, and progress tracking in one place.
          </p>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Courses", value: String(COURSES.length) },
              { label: "Lessons", value: String(totalLessons) },
              { label: "Captured Notes", value: String(capturedLessons) },
            ].map(({ label, value }) => (
              <div key={label} className="text-center p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <p className="text-2xl font-bold" style={{ color: "var(--app-accent)" }}>{value}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Study flow */}
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Suggested Study Flow</p>
          <div className="space-y-2">
            {STUDY_FLOW.map(({ step, label, detail }) => (
              <div key={step} className="flex items-start gap-3">
                <span
                  className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: "var(--app-accent)" }}
                >
                  {step}
                </span>
                <div>
                  <p className="text-xs font-medium text-zinc-200">{label}</p>
                  <p className="text-[11px] text-zinc-600">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5 Exam Domains */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">5 Exam Domains</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DOMAINS.map(({ n, label, icon: Icon }) => (
              <div key={n} className="flex items-center gap-3 p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl">
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: "var(--app-accent)" }}
                >
                  {n}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-200 truncate">{label}</p>
                </div>
                <Icon className="h-3.5 w-3.5 text-zinc-600 shrink-0" />
              </div>
            ))}
          </div>
        </section>

        {/* Course catalog */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-4 w-4 text-zinc-400" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Course Catalog
            </h2>
          </div>
          <DomainGrid domains={COURSES} />
        </section>

      </div>
    </div>
  );
}
