import coursesData from "@/data/courses.json";

export interface Lesson {
  id: string;
  title: string;
  path: string;
  source: "captured" | "index";
  diagram?: string;
  image?: string;
  video?: string;
}

export interface Course {
  id: string;
  title: string;
  course: number;
  folder: string;
  color: string;
  icon: string;
  description: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: number;
  domain: number;
  question: string;
  answer: string;
}

export interface ExamDomain {
  id: string;
  domain: number;
  title: string;
  color: keyof typeof COURSE_COLORS;
}

export const COURSES: Course[] = coursesData as Course[];
export const DOMAINS = COURSES;

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((course) => course.id === id);
}

export function getDomainById(id: string): Course | undefined {
  return getCourseById(id);
}

export function getCapturedLessonCount(course: Course): number {
  return course.lessons.filter((lesson) => lesson.source === "captured").length;
}

export const COURSE_COLORS: Record<string, { hex: string; bg: string; border: string; text: string; badge: string }> = {
  blue:    { hex: "#3b82f6", bg: "bg-blue-900/20",     border: "border-l-blue-500",     text: "text-blue-400",     badge: "bg-blue-900/60 text-blue-300" },
  orange:  { hex: "#f59e0b", bg: "bg-orange-900/20",   border: "border-l-orange-500",   text: "text-orange-400",   badge: "bg-orange-900/60 text-orange-300" },
  amber:   { hex: "#f59e0b", bg: "bg-amber-900/20",    border: "border-l-amber-500",    text: "text-amber-400",    badge: "bg-amber-900/60 text-amber-300" },
  red:     { hex: "#ef4444", bg: "bg-red-900/20",      border: "border-l-red-500",      text: "text-red-400",      badge: "bg-red-900/60 text-red-300" },
  green:   { hex: "#22c55e", bg: "bg-green-900/20",    border: "border-l-green-500",    text: "text-green-400",    badge: "bg-green-900/60 text-green-300" },
  cyan:    { hex: "#06b6d4", bg: "bg-cyan-900/20",     border: "border-l-cyan-500",     text: "text-cyan-400",     badge: "bg-cyan-900/60 text-cyan-300" },
  teal:    { hex: "#14b8a6", bg: "bg-teal-900/20",     border: "border-l-teal-500",     text: "text-teal-400",     badge: "bg-teal-900/60 text-teal-300" },
  lime:    { hex: "#84cc16", bg: "bg-lime-900/20",     border: "border-l-lime-500",     text: "text-lime-400",     badge: "bg-lime-900/60 text-lime-300" },
  emerald: { hex: "#10b981", bg: "bg-emerald-900/20",  border: "border-l-emerald-500",  text: "text-emerald-400",  badge: "bg-emerald-900/60 text-emerald-300" },
  indigo:  { hex: "#6366f1", bg: "bg-indigo-900/20",   border: "border-l-indigo-500",   text: "text-indigo-400",   badge: "bg-indigo-900/60 text-indigo-300" },
  yellow:  { hex: "#eab308", bg: "bg-yellow-900/20",   border: "border-l-yellow-500",   text: "text-yellow-400",   badge: "bg-yellow-900/60 text-yellow-300" },
  sky:     { hex: "#0ea5e9", bg: "bg-sky-900/20",      border: "border-l-sky-500",      text: "text-sky-400",      badge: "bg-sky-900/60 text-sky-300" },
  violet:  { hex: "#8b5cf6", bg: "bg-violet-900/20",   border: "border-l-violet-500",   text: "text-violet-400",   badge: "bg-violet-900/60 text-violet-300" },
  rose:    { hex: "#f43f5e", bg: "bg-rose-900/20",     border: "border-l-rose-500",     text: "text-rose-400",     badge: "bg-rose-900/60 text-rose-300" },
  pink:    { hex: "#ec4899", bg: "bg-pink-900/20",     border: "border-l-pink-500",     text: "text-pink-400",     badge: "bg-pink-900/60 text-pink-300" },
  purple:  { hex: "#a855f7", bg: "bg-purple-900/20",   border: "border-l-purple-500",   text: "text-purple-400",   badge: "bg-purple-900/60 text-purple-300" },
  slate:   { hex: "#64748b", bg: "bg-slate-900/20",    border: "border-l-slate-500",    text: "text-slate-400",    badge: "bg-slate-900/60 text-slate-300" },
};

export const DOMAIN_COLORS = COURSE_COLORS;

export const EXAM_DOMAINS: ExamDomain[] = [
  { id: "prompt-engineering", domain: 1, title: "Prompt Engineering & AI Fluency", color: "blue" },
  { id: "claude-code", domain: 2, title: "Claude Code Development", color: "orange" },
  { id: "agentic-architecture", domain: 3, title: "Agentic Architecture", color: "purple" },
  { id: "mcp", domain: 4, title: "Model Context Protocol", color: "teal" },
  { id: "projects-artifacts", domain: 5, title: "Projects, Artifacts & Skills", color: "pink" },
];

export function getExamDomain(domain: number): ExamDomain | undefined {
  return EXAM_DOMAINS.find((entry) => entry.domain === domain);
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Domain 1
  {
    id: 1,
    domain: 1,
    question: "Which element of a system prompt takes lowest precedence when instructions conflict?",
    answer: "Content later in the context window / human turn instructions typically lose to system prompt",
  },
  {
    id: 2,
    domain: 1,
    question: "When should you use extended thinking vs standard response?",
    answer: "Complex multi-step reasoning problems where showing work matters",
  },
  {
    id: 3,
    domain: 1,
    question: "What is prefilling the assistant turn used for?",
    answer: "Forcing output format, skipping preamble, resuming partial responses",
  },
  // Domain 2
  {
    id: 4,
    domain: 2,
    question: "What are the 4 types of Claude Code memory?",
    answer: "user, feedback, project, reference",
  },
  {
    id: 5,
    domain: 2,
    question: "Which hook type runs before a tool is executed?",
    answer: "PreToolUse hook",
  },
  {
    id: 6,
    domain: 2,
    question: "What file configures Claude Code's project-level instructions?",
    answer: "CLAUDE.md",
  },
  // Domain 3
  {
    id: 7,
    domain: 3,
    question: "When should you use a subagent instead of a direct tool call?",
    answer: "Multi-step tasks requiring their own agent loop, or when context isolation is needed",
  },
  {
    id: 8,
    domain: 3,
    question: "What is the benefit of parallel tool calls?",
    answer: "Reduced latency — independent operations run simultaneously",
  },
  {
    id: 9,
    domain: 3,
    question: "In an orchestrator/worker pattern, what does the orchestrator do?",
    answer: "Plans and coordinates; delegates subtasks to worker subagents",
  },
  // Domain 4
  {
    id: 10,
    domain: 4,
    question: "What are the 3 components of MCP architecture?",
    answer: "Host (Claude Code), Client (manages connection), Server (provides tools/resources)",
  },
  {
    id: 11,
    domain: 4,
    question: "What transport types does MCP support?",
    answer: "stdio (subprocess) and SSE (HTTP Server-Sent Events)",
  },
  {
    id: 12,
    domain: 4,
    question: "What format must MCP tool input schemas use?",
    answer: "JSON Schema",
  },
  // Domain 5
  {
    id: 13,
    domain: 5,
    question: "What is the difference between a Skill and a Hook?",
    answer: "Skills are agent-invocable workflows (markdown prompts); Hooks run as shell scripts outside the agent loop",
  },
  {
    id: 14,
    domain: 5,
    question: "What does plan mode (EnterPlanMode) prevent Claude from doing?",
    answer: "Making any file changes — read-only exploration for architectural decisions",
  },
  {
    id: 15,
    domain: 5,
    question: "What are the 6 Claude Code extensions?",
    answer: "CLAUDE.md, Skills, MCP, Subagents, Hooks, Plugins/Marketplaces",
  },
];
