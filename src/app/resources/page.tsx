import { ExternalLink, FolderOpen } from "lucide-react";

interface Resource {
  name: string;
  url: string;
  description: string;
  category: string;
}

const RESOURCES: Resource[] = [
  {
    name: "Anthropic Cookbook",
    url: "https://github.com/anthropics/anthropic-cookbook",
    description: "Code examples and guides for building with Claude APIs",
    category: "Official",
  },
  {
    name: "Claude Certifications",
    url: "https://claudecertifications.com",
    description: "Official CCA certification portal and exam registration",
    category: "Official",
  },
  {
    name: "Skilljar — CCA Course",
    url: "https://anthropic.skilljar.com",
    description: "Anthropic's official training platform for certification prep",
    category: "Official",
  },
  {
    name: "CCA Exam Guide",
    url: "https://claudecertifications.com/exam-guide",
    description: "Official exam guide with domain breakdown and objectives",
    category: "Official",
  },
  {
    name: "Claude Code Playbook",
    url: "https://docs.anthropic.com/en/docs/claude-code",
    description: "Comprehensive guide to Claude Code features, hooks, and extensions",
    category: "Docs",
  },
  {
    name: "Anthropic API Docs",
    url: "https://docs.anthropic.com",
    description: "Full API reference, model specs, and feature documentation",
    category: "Docs",
  },
  {
    name: "Model Context Protocol",
    url: "https://modelcontextprotocol.io",
    description: "MCP specification, SDKs, and server development guides",
    category: "Docs",
  },
  {
    name: "Claude API Reference",
    url: "https://docs.anthropic.com/en/api",
    description: "Complete API reference for messages, tool use, and streaming",
    category: "Docs",
  },
  {
    name: "Prompt Engineering Guide",
    url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering",
    description: "Best practices for system prompts, few-shot, chain-of-thought",
    category: "Guides",
  },
  {
    name: "Claude Code GitHub",
    url: "https://github.com/anthropics/claude-code",
    description: "Claude Code source, issues, and community examples",
    category: "Community",
  },
];

const CATEGORIES = ["Official", "Docs", "Guides", "Community"];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[900px] mx-auto px-6 py-3 flex items-center gap-3">
          <ExternalLink className="h-4 w-4" style={{ color: "var(--app-accent)" }} />
          <h1 className="text-sm font-semibold text-zinc-100">Resources</h1>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-8 space-y-8">
        <section className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <FolderOpen className="h-4 w-4 text-zinc-400" />
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Repo Entry Points</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm text-zinc-400">
            <div className="rounded-xl border border-zinc-800 p-4">
              <p className="text-zinc-200 font-medium mb-1">`guides/`</p>
              <p>Long-form study guides and navigation docs.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 p-4">
              <p className="text-zinc-200 font-medium mb-1">`courses/`</p>
              <p>Captured lesson markdown, indexes, and diagram assets.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 p-4">
              <p className="text-zinc-200 font-medium mb-1">`cheat/`</p>
              <p>Fast cram sheets for last-minute review.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 p-4">
              <p className="text-zinc-200 font-medium mb-1">`docs/`</p>
              <p>Canonical repo docs including the main CCA guide.</p>
            </div>
          </div>
        </section>

        {CATEGORIES.map((cat) => {
          const catResources = RESOURCES.filter((r) => r.category === cat);
          if (catResources.length === 0) return null;
          return (
            <section key={cat}>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                {cat}
              </p>
              <div className="overflow-hidden border border-zinc-800 rounded-xl">
                {catResources.map((resource, idx) => (
                  <a
                    key={resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 px-5 py-4 hover:bg-zinc-800/60 transition-colors group ${
                      idx > 0 ? "border-t border-zinc-800" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors">
                        {resource.name}
                      </p>
                      <p className="text-xs text-zinc-600 mt-0.5 truncate">{resource.description}</p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-700 group-hover:text-zinc-400 transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </section>
          );
        })}

        {/* Study tip */}
        <section className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Study Tip</p>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Start with the captured course notes in this repo, then use the Anthropic Cookbook,
            Claude Code docs, and the official exam guide to fill in implementation details and
            confirm scope for each exam domain.
          </p>
        </section>
      </div>
    </div>
  );
}
