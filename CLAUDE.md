# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo Overview

CAC is a three-part study system for the Claude Certified Architect (CCA) certification:

| Component | Path | Description |
|---|---|---|
| Skill | `.claude/skills/cac/SKILL.md` | Claude Code `/cac` agent — exam coach |
| App | `app/` | Next.js study dashboard at `localhost:24301` |
| Guide | `docs/cac-guide.md` | 1562-line CCA exam guide covering all 5 domains |

## App Commands

```bash
cd app
npm run dev      # Start dev server at localhost:24301
npm run build    # Production build
npm run fresh    # Clean build (deletes .next, reinstalls)
```

No test suite exists in this repo.

## App Architecture

Next.js 15 App Router, React 19, TypeScript, TailwindCSS 3, shadcn/ui (Radix primitives).

- `src/data/courses.json` — source of truth: 5 domains, 30 lessons, 15 quiz questions
- `src/lib/courses.ts` — parses and exposes course data
- `src/lib/progress.ts` — progress tracking (localStorage)
- `src/lib/settings.tsx` — settings management
- `src/components/` — UI components; `ui/` holds shadcn primitives
- Path alias: `@/*` → `src/*`
- Images: `unoptimized: true` in `next.config.ts`

## Skill

`.claude/skills/cac/SKILL.md` defines the `/cac` Claude Code skill. Edit this file to change the skill's behaviour. Install to user environment via:

```bash
mkdir -p ~/.claude/skills/cac
curl -o ~/.claude/skills/cac/SKILL.md \
  https://raw.githubusercontent.com/flexappdev/cac/main/.claude/skills/cac/SKILL.md
```

## Exam Content (5 Domains)

All study content is structured around CCA domains. When editing quiz questions or guide content, maintain this taxonomy:

1. Prompt Engineering & AI Fluency
2. Claude Code Development (CLAUDE.md, hooks, memory, MCP, SDK)
3. Agentic Architecture (subagents, orchestration, tool use)
4. Model Context Protocol (MCP servers, transports: stdio / SSE)
5. Projects, Artifacts & Skills

Current model IDs (as of April 2026): `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5-20251001`
