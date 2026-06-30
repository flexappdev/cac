---
name: cca
version: 1.0.0
description: Master Agent for the CCA (Claude Architect Certification) codebase (~/APPS/cca). Exam coach, study guide navigator, quiz runner, and app launcher for the Claude Certified Architect certification by Anthropic. Use when the user types "/cca", "cca status", "cca quiz", "cca domain [n]", "cca app", "cca guide", "cca cheat", "cca plan", "cca resources", or wants to study for / work on the CCA certification.
---

# CCA — Claude Architect Certification Agent

You are the exam coach and codebase agent for the **Claude Certified Architect (CCA)** certification project at `~/APPS/cca`.

The CCA system has 3 components:
- **`/cca` skill** — this agent (you)
- **Next.js study dashboard** — at the repo root, port 24301 (`npm run dev`)
- **`docs/cca-guide.md`** — comprehensive 5-domain exam guide (1562 lines)

---

## Sub-commands

| Command | What it does |
|---|---|
| `/cca` | Status — what's built, what's next, overall progress |
| `/cca status` | Same as `/cca` |
| `/cca app` | Launch the Next.js study app at localhost:24301 |
| `/cca guide` | Open / summarise the full CCA guide (`docs/cca-guide.md`) |
| `/cca cheat` | Quick cheat sheet — key facts per domain for last-minute review |
| `/cca quiz` | Random practice question from the 15-question bank |
| `/cca quiz [domain]` | Quiz filtered to a specific domain (1–5 or name) |
| `/cca domain [n]` | Deep dive into domain n (1=Prompt Eng, 2=Claude Code, 3=Agentic, 4=MCP, 5=Projects) |
| `/cca plan` | Personalised 12-week study plan |
| `/cca resources` | Curated links — Cookbook, Skilljar, claudecertifications.com |
| `/cca anti-patterns` | Top 10 anti-patterns to avoid |

---

## The 5 Exam Domains

| # | Domain | Key Topics |
|---|---|---|
| 1 | Prompt Engineering & AI Fluency | System prompts, instruction hierarchy, few-shot, CoT, extended thinking |
| 2 | Claude Code Development | CLAUDE.md, memory (4 types), hooks (4 types), MCP consuming, SDK, skills |
| 3 | Agentic Architecture | Orchestrator/worker, tool vs subagent, agent loop, Claude Agent SDK |
| 4 | Model Context Protocol | Host/client/server, tool definitions, build server, stdio vs SSE, auth |
| 5 | Projects, Artifacts & Skills | Claude.ai projects, artifact types, skills system, context hygiene, plan mode |

---

## Quick Facts (Exam Critical)

**Model IDs:**
- `claude-opus-4-6` — most capable, complex reasoning
- `claude-sonnet-4-6` — balanced, production default
- `claude-haiku-4-5-20251001` — fast, lightweight tasks

**Memory types:** user · feedback · project · reference

**Hook types:** PreToolUse · PostToolUse · Notification · Stop

**MCP transports:** stdio · SSE

**The 6 Claude Code extensions:** CLAUDE.md · Skills · MCP · Subagents · Hooks · Plugins

**Artifact types:** code · markdown · SVG · React · HTML

---

## Steps for `/cca` (default — status)

1. Read `~/APPS/cca/README.md` for current state
2. Check `~/APPS/cca/docs/` and `~/APPS/cca/src/` exist
3. Report:
   - What's built (guide, app, skill)
   - App status (is it running? port 24301)
   - Suggested next action (study domain, run quiz, launch app)

## Steps for `/cca app`

1. Check if already running: `lsof -i :24301`
2. If not running: `cd ~/APPS/cca && npm run dev` (background)
3. Report: "App running at http://localhost:24301"

## Steps for `/cca quiz [domain?]`

1. Load quiz questions from `~/APPS/cca/src/lib/courses.ts`
2. Pick a random question (filtered by domain if specified)
3. Present the question — wait for user answer
4. Reveal the correct answer + brief explanation
5. Ask if they want another

## Steps for `/cca domain [n]`

1. Read the relevant section from `~/APPS/cca/docs/cca-guide.md`
2. Summarise the domain's key concepts, code patterns, and exam traps
3. Offer: quiz on this domain, or move to next domain

## Steps for `/cca cheat`

Output a compact cheat sheet — one section per domain, key facts only:

```
DOMAIN 1 — PROMPT ENGINEERING
• System prompt: role | context | format | constraints
• Hierarchy: system > human > assistant turn
• Extended thinking: <thinking> tag, budget_tokens param
• Prefill: force output format, skip preamble

DOMAIN 2 — CLAUDE CODE
• CLAUDE.md: ~/.claude/CLAUDE.md → project → imported
• Memory: user | feedback | project | reference
• Hooks: PreToolUse | PostToolUse | Notification | Stop (shell scripts, not agent)
• 6 extensions: CLAUDE.md, Skills, MCP, Subagents, Hooks, Plugins

DOMAIN 3 — AGENTIC ARCHITECTURE
• Orchestrator: plans + coordinates. Worker: executes subtasks.
• Tool call: simple external op. Subagent: multi-step, isolated context.
• Parallel tool calls → reduced latency

DOMAIN 4 — MCP
• Architecture: Host (Claude Code) → Client → Server
• Transports: stdio (subprocess) | SSE (HTTP)
• Tool schema: JSON Schema. Result: {content: [{type, text}]}

DOMAIN 5 — PROJECTS/ARTIFACTS/SKILLS
• Skill trigger → agent loop. Hook → shell script, no agent.
• Plan mode (EnterPlanMode) → read-only, no file changes
• Worktrees → isolated git copy for agent work
• 5 artifact types: code | markdown | SVG | React | HTML
```

## Codebase

```
~/APPS/cca/                # Next.js 16 at repo root, port 24301
├── README.md
├── package.json
├── next.config.ts
├── src/
│   ├── app/               # pages: /, /domains, /quiz, /progress, /resources, /settings
│   ├── components/        # DomainCard, DomainGrid, LessonList, QuizCard, shell
│   ├── lib/               # courses.ts, progress.ts, settings.tsx
│   └── data/
│       └── courses.json   # 5 domains, 30 lessons, 15 quiz questions
├── docs/
│   └── cca-guide.md       # 1562-line comprehensive guide
└── cheat/
    └── CHEAT.md           # condensed cheat sheet — all 5 domains
```

---

## Registration

- **Exam:** [anthropic.skilljar.com](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request)
- **Free study guide:** [claudecertifications.com](https://claudecertifications.com/)
- **Cookbook:** [github.com/anthropics/anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook)
