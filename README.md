# CAC — Claude Architect Certification

A complete study system for the **Claude Certified Architect (CCA)** certification by Anthropic. Three components:

| Component | What it is |
|---|---|
| `/cac` skill | Claude Code agent that coaches you through exam prep |
| `app/` | Next.js study dashboard with practice questions and progress tracking |
| `cheat/` | Markdown cheat guide + exportable PDF |

---

## The Certification

The **Claude Certified Architect** is Anthropic's official practitioner certification. It validates real-world ability to design, build, and deploy production AI systems using Claude — not just API knowledge.

- **Register:** [anthropic.skilljar.com](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request)
- **Study resources:** [claudecertifications.com](https://claudecertifications.com/) (free — no paywall)
- **Official cookbook:** [github.com/anthropics/anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook)

---

## The 5 Exam Domains

### 1. Prompt Engineering & AI Fluency
Writing accurate, well-structured prompts. Understanding Claude's reasoning, formatting behaviour, and instruction following. Covers system prompts, few-shot examples, chain-of-thought, and output shaping.

### 2. Claude Code Development
- Context management (CLAUDE.md, memory system)
- Hooks — deterministic scripts that run outside the agent loop
- MCP servers — connecting Claude to external services
- GitHub integration
- Anthropic SDK usage (Python / TypeScript)

### 3. Agentic Architecture
Multi-agent system design. Subagents running isolated context loops. Tool integration. Workflow orchestration. Knowing when to use a subagent vs. a tool call vs. a direct response.

Key patterns from the cookbook:
- `patterns/agents/` — orchestrator/worker patterns
- `managed_agents/` — Claude Agent SDK usage
- `claude_agent_sdk/` — building custom agents

### 4. Model Context Protocol (MCP)
Building and consuming MCP servers. Understanding the MCP client/server architecture. Connecting Claude to databases, APIs, file systems, and external services via standardised tool definitions.

### 5. Projects, Artifacts & Skills
Persistent project organisation. Custom skill automation via Claude Code's skill system. Managing artifacts across conversations. Context hygiene.

---

## Study Plan (12 Weeks)

| Weeks | Focus |
|---|---|
| 1–2 | Prompt engineering fundamentals + Claude's unique behaviours |
| 3–4 | Claude Code: CLAUDE.md, hooks, memory, SDK basics |
| 5–6 | Agentic architecture: subagents, tool use, orchestration |
| 7–8 | MCP: build a server, consume one, understand the protocol |
| 9–10 | Skills, projects, artifacts, context management |
| 11 | Practice questions + anti-pattern review |
| 12 | Final review + exam |

---

## Key Resources

| Resource | Purpose |
|---|---|
| [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) | Canonical code examples — start here |
| [claudecertifications.com](https://claudecertifications.com/) | Free study guide, 25+ practice Qs, anti-patterns |
| [Skilljar Training Courses](https://anthropic.skilljar.com/) | Official Anthropic training modules |
| [Cookbook: managed_agents](https://github.com/anthropics/anthropic-cookbook/tree/main/managed_agents) | Agent SDK patterns |
| [Cookbook: tool_use](https://github.com/anthropics/anthropic-cookbook/tree/main/tool_use) | Tool integration examples |
| [Cookbook: claude_agent_sdk](https://github.com/anthropics/anthropic-cookbook/tree/main/claude_agent_sdk) | Building agents |

---

## Anti-Patterns to Avoid

- Over-prompting — stuffing every constraint into one giant system prompt instead of layering context
- Using subagents when a tool call is sufficient (unnecessary overhead)
- Skipping CLAUDE.md — losing persistent context between sessions
- Building MCP servers without error handling for tool failures
- Hardcoding model IDs — use `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5-20251001` variables

---

## This Repo Structure

```
cac/
├── README.md          # This file
├── LICENSE
├── cheat/
│   ├── cac-cheat.md   # Full cheat guide (all 5 domains)
│   └── cac-cheat.pdf  # Exportable PDF version
└── app/               # Next.js study dashboard
    ├── src/
    └── ...
```

---

## /cac Skill

The `/cac` Claude Code skill acts as an exam coach. Invoke it from any Claude Code session:

```
/cac               # Status + what to study next
/cac quiz          # Random practice question
/cac domain 3      # Deep dive into domain 3 (Agentic Architecture)
/cac cheat         # Open the cheat guide
/cac plan          # Personalised 12-week study plan
```

---

## License

MIT — Mat Siems, 2026
