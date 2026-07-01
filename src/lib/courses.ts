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
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
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
  // Domain 1 — Prompt Engineering & AI Fluency
  {
    id: 1,
    domain: 1,
    question: "Which element takes the LOWEST precedence when instructions conflict?",
    answer: "Content in the human turn typically loses to system prompt directives — the system prompt sits at the top of the instruction hierarchy.",
    options: [
      "Content later in the human turn",
      "The system prompt itself",
      "Text inside <thinking> blocks",
      "The first message in a conversation",
    ],
    correctIndex: 0,
  },
  {
    id: 2,
    domain: 1,
    question: "When is extended thinking the right choice over a standard response?",
    answer: "Extended thinking is designed for complex multi-step reasoning where letting the model show its work materially improves the answer.",
    options: [
      "Simple factual lookups where speed matters most",
      "High-volume batch processing where cost matters",
      "Complex multi-step reasoning problems",
      "Any task that includes a system prompt",
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    domain: 1,
    question: "What is prefilling the assistant turn used for?",
    answer: "Prefilling forces an output format, skips the preamble, or resumes a partial response — it anchors the assistant's first tokens.",
    options: [
      "Persisting memory across separate conversations",
      "Forcing output format or skipping the preamble",
      "Preventing the model from calling any tools",
      "Turning on extended thinking automatically",
    ],
    correctIndex: 1,
  },

  // Domain 2 — Claude Code Development
  {
    id: 4,
    domain: 2,
    question: "What are the four types of Claude Code memory?",
    answer: "The four memory types are user, feedback, project, and reference — used by the auto-memory system to build up context over sessions.",
    options: [
      "short-term, long-term, working, session",
      "system, user, tool, thinking",
      "user, feedback, project, reference",
      "local, remote, cached, persistent",
    ],
    correctIndex: 2,
  },
  {
    id: 5,
    domain: 2,
    question: "Which hook type runs BEFORE a tool is executed?",
    answer: "PreToolUse fires before the tool call, letting you validate, block, or log the call. The four hook types are PreToolUse, PostToolUse, Notification, Stop.",
    options: [
      "BeforeCall hook",
      "PreToolUse hook",
      "OnRequest hook",
      "PreExecute hook",
    ],
    correctIndex: 1,
  },
  {
    id: 6,
    domain: 2,
    question: "What filename configures Claude Code's project-level instructions?",
    answer: "CLAUDE.md at the project root (with an optional user-level ~/.claude/CLAUDE.md above it) is the canonical instruction file.",
    options: [
      ".claude.json",
      "config.claude",
      "settings.md",
      "CLAUDE.md",
    ],
    correctIndex: 3,
  },

  // Domain 3 — Agentic Architecture
  {
    id: 7,
    domain: 3,
    question: "When should you use a subagent instead of a direct tool call?",
    answer: "Use a subagent when the task needs its own multi-step agent loop or when context isolation matters — the subagent's messages don't pollute the orchestrator's context.",
    options: [
      "Any time you need to make more than one tool call",
      "Only when a single tool call would exceed the context window",
      "Multi-step tasks that need an isolated agent loop",
      "Whenever the user asks any question",
    ],
    correctIndex: 2,
  },
  {
    id: 8,
    domain: 3,
    question: "What is the main benefit of parallel tool calls?",
    answer: "Independent operations run simultaneously, which reduces total latency compared to a serial chain.",
    options: [
      "Reduced latency — independent operations run at the same time",
      "Automatic retry on error for every tool",
      "Lower token cost per individual call",
      "Access to more tools per conversation turn",
    ],
    correctIndex: 0,
  },
  {
    id: 9,
    domain: 3,
    question: "In an orchestrator/worker pattern, what does the orchestrator do?",
    answer: "The orchestrator plans, coordinates, and delegates subtasks to worker subagents — it does not execute the work itself.",
    options: [
      "Executes every subtask itself to keep results consistent",
      "Handles authentication and permissions for workers",
      "Renders the final UI back to the user",
      "Plans and coordinates; delegates subtasks to workers",
    ],
    correctIndex: 3,
  },

  // Domain 4 — Model Context Protocol
  {
    id: 10,
    domain: 4,
    question: "What are the three components of MCP architecture?",
    answer: "Host (e.g. Claude Code) → Client (manages the connection) → Server (provides tools, resources, and prompts).",
    options: [
      "Host, Client, Server",
      "Frontend, Backend, Database",
      "Producer, Broker, Consumer",
      "Agent, Tool, Result",
    ],
    correctIndex: 0,
  },
  {
    id: 11,
    domain: 4,
    question: "Which transport types does MCP support?",
    answer: "stdio (child-process pipe) and SSE (HTTP Server-Sent Events) are the two supported transports.",
    options: [
      "HTTP and gRPC",
      "stdio and SSE",
      "WebSocket and REST",
      "TCP and UDP",
    ],
    correctIndex: 1,
  },
  {
    id: 12,
    domain: 4,
    question: "What format must MCP tool input schemas use?",
    answer: "MCP tool inputs are described with JSON Schema — the same schema shape you see across the tool ecosystem.",
    options: [
      "OpenAPI 3.0",
      "YAML",
      "JSON Schema",
      "TypeScript interfaces",
    ],
    correctIndex: 2,
  },

  // Domain 5 — Projects, Artifacts & Skills
  {
    id: 13,
    domain: 5,
    question: "What is the difference between a Skill and a Hook?",
    answer: "Skills are markdown workflows the agent invokes inside the loop. Hooks are shell scripts the harness runs outside the loop — deterministic, no agent involvement.",
    options: [
      "Skills are billed separately; Hooks are free",
      "Skills only work in the CLI; Hooks work in Claude.ai too",
      "Skills are agent-invoked markdown workflows; Hooks are shell scripts run outside the loop",
      "There is no functional difference — they are aliases",
    ],
    correctIndex: 2,
  },
  {
    id: 14,
    domain: 5,
    question: "What does plan mode (EnterPlanMode) prevent Claude from doing?",
    answer: "Plan mode is read-only — no file writes, no edits, no non-readonly tool use. Only the plan file itself is editable.",
    options: [
      "Making file changes — plan mode is read-only",
      "Calling any MCP servers",
      "Reading files outside the working directory",
      "Using more than one subagent",
    ],
    correctIndex: 0,
  },
  {
    id: 15,
    domain: 5,
    question: "What are the six Claude Code extensions?",
    answer: "CLAUDE.md, Skills, MCP, Subagents, Hooks, Plugins/Marketplaces — the six extension surfaces that shape Claude Code's behaviour.",
    options: [
      "CLAUDE.md, Skills, MCP, Subagents, Hooks, Plugins",
      "CLAUDE.md, Skills, MCP, Memory, Hooks, Templates",
      "Skills, Hooks, MCP, Memory, Sessions, Tools",
      "Prompts, Templates, Hooks, MCP, Subagents, Plugins",
    ],
    correctIndex: 0,
  },
];
