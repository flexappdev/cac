# CCA Cheat Sheet — Codex Architect Certification

> Last-minute reference. One key fact per bullet. All 5 domains, plus where each topic now lives in the imported course library.

---

## Domain 1 — Prompt Engineering & AI Fluency

Primary course anchors: `courses/1-claude-101/`, `courses/5-ai-fluency-framework-foundations/`, `courses/17-ai-capabilities-and-limitations/`

- **System prompt anatomy:** role | context | format | constraints
- **Turn hierarchy:** system > human > assistant (each layer can constrain the next)
- **Extended thinking:** enable with `thinking: {type: "enabled", budget_tokens: N}`; model outputs `<thinking>` block before answer
- **Prefill:** set the start of the assistant turn to force output format and skip preamble
- **Few-shot examples:** place in human/assistant turns, not the system prompt
- **Chain-of-thought:** ask Claude to reason step-by-step before answering; improves accuracy on multi-step problems
- **Output shaping:** use XML tags (`<answer>`, `<json>`) to delimit structured sections
- **Temperature:** 0 for deterministic/factual; higher for creative variation
- **Instruction following:** Claude follows the most specific instruction; later instructions override earlier ones within the same turn

---

## Domain 2 — Claude Code Development

Primary course anchors: `courses/2-claude-code-101/`, `courses/4-claude-code-in-action/`, `courses/15-introduction-to-agent-skills/`

- **CLAUDE.md load order:** `~/.claude/CLAUDE.md` → project root → subdirectory (all merged)
- **Memory types:** `user` | `feedback` | `project` | `reference` (stored in `.claude/projects/.../memory/`)
- **Hook types:** `PreToolUse` | `PostToolUse` | `Notification` | `Stop`
- **Hooks are shell scripts** — they run outside the agent loop; no agent context, deterministic
- **Hook use cases:** lint on save, log every tool call, block dangerous commands, send notifications
- **6 Claude Code extensions:** CLAUDE.md · Skills · MCP · Subagents · Hooks · Plugins/Marketplaces
- **SDK languages:** Python (`anthropic`) and TypeScript (`@anthropic-ai/sdk`)
- **GitHub integration:** `gh` CLI + Claude Code can create PRs, review diffs, manage issues
- **Plan mode:** read-only — Claude can explore but cannot write files or run commands

---

## Domain 3 — Agentic Architecture

Primary course anchors: `courses/4-claude-code-in-action/`, `courses/6-building-with-the-claude-api/`, `courses/16-introduction-to-subagents/`

- **Orchestrator:** plans tasks, routes to workers, synthesises results
- **Worker / subagent:** executes a single subtask in an isolated context loop
- **Tool call vs subagent:** tool call = simple external operation (one round trip); subagent = multi-step autonomous loop with its own context
- **When to use subagent:** task needs multiple tool calls, has isolated state, or benefits from parallel execution
- **Parallel tool calls:** issue multiple tool calls in one response → reduced latency
- **Worktrees:** isolated git copy for agents — safe for destructive or experimental work
- **Agent loop:** perceive → think → act → observe → repeat until done
- **Context hygiene:** summarise long threads, use memory files, avoid stuffing full file contents into context

---

## Domain 4 — Model Context Protocol (MCP)

Primary course anchors: `courses/7-introduction-to-model-context-protocol/`, `courses/10-model-context-protocol-advanced-topics/`, `courses/11-claude-with-amazon-bedrock/`, `courses/12-claude-with-google-clouds-vertex-ai/`

- **Architecture:** Host (Claude Code) → MCP Client → MCP Server → external resource
- **Transports:** `stdio` (subprocess, local) | `SSE` (HTTP, remote)
- **Tool definition:** JSON Schema — `name`, `description`, `inputSchema` (required)
- **Tool result format:** `{content: [{type: "text", text: "..."}]}`
- **Server types:** tools | resources | prompts (servers can expose any combination)
- **Error handling:** servers must return structured errors; clients must handle gracefully
- **MCP config:** `~/.claude/claude_desktop_config.json` → `mcpServers` block
- **Use cases:** databases, file systems, APIs, GitHub, Slack, custom business tools

---

## Domain 5 — Projects, Artifacts & Skills

Primary course anchors: `courses/1-claude-101/`, `courses/2-claude-code-101/`, `courses/15-introduction-to-agent-skills/`

- **Skill trigger:** `/skill-name` → agent loop executes the SKILL.md instructions
- **Hook trigger:** event fires → shell script runs — no agent, no LLM call
- **Plan mode (EnterPlanMode):** read-only exploration; `ExitPlanMode` re-enables writes
- **Worktrees:** `isolation: "worktree"` in Agent tool → safe isolated git copy
- **5 artifact types:** `code` | `markdown` | `SVG` | `React` | `HTML`
- **Artifact persistence:** artifacts live in the conversation; reference them by type/title
- **Projects:** group conversations + shared instructions; CLAUDE.md scopes context to project
- **Skills location:** `~/.claude/skills/<name>/SKILL.md` (user) or `.claude/skills/<name>/SKILL.md` (project)
- **MEMORY.md:** index file Claude reads every session; links to individual memory files

---

## Quick Reference

### Model IDs (April 2026)

| Model | ID |
|---|---|
| Opus 4.6 | `Codex-opus-4-6` |
| Sonnet 4.6 | `Codex-sonnet-4-6` |
| Haiku 4.5 | `Codex-haiku-4-5-20251001` |

> Never hardcode model IDs — store as constants or environment variables.

### Memory Types

| Type | What it stores |
|---|---|
| `user` | Role, preferences, expertise level |
| `feedback` | Corrections and behavioural guidance |
| `project` | Goals, decisions, deadlines |
| `reference` | Pointers to external systems |

### Hook Types

| Hook | When it fires |
|---|---|
| `PreToolUse` | Before any tool call |
| `PostToolUse` | After any tool call |
| `Notification` | On agent notifications |
| `Stop` | When the agent loop ends |

### Artifact Types

| Type | Use for |
|---|---|
| `code` | Source files, scripts |
| `markdown` | Docs, guides, READMEs |
| `SVG` | Vector graphics |
| `React` | Interactive UI components |
| `HTML` | Static web content |

### MCP Transports

| Transport | Protocol | Use case |
|---|---|---|
| `stdio` | Subprocess stdin/stdout | Local servers |
| `SSE` | HTTP Server-Sent Events | Remote servers |

---

## Top 5 Anti-Patterns (Most Tested)

1. **Over-prompting** — stuffing every constraint into one giant system prompt instead of layering context across turns and AGENTS.md
2. **Subagent when a tool suffices** — unnecessary overhead; use a tool call for single-step external operations
3. **Skipping AGENTS.md** — losing persistent context between sessions; always scaffold AGENTS.md first
4. **MCP servers without error handling** — tool failures must return structured errors, not exceptions
5. **Hardcoding model IDs** — always use named constants (`Codex-sonnet-4-6`), never string literals scattered through code

---

*Source: [github.com/flexappdev/cca](https://github.com/flexappdev/cca) · CCA / CCA exam prep*
