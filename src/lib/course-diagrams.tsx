import type { ReactElement, ReactNode } from "react";
import { COURSE_COLORS } from "@/lib/courses";

// Editorial course diagrams — one per course id.
// Cleverfox house style: 1px hairlines, no shadows, ≤2 accent colours per diagram,
// grid-aligned nodes, viewBox 320×200. Light-mode uses zinc-800 strokes,
// dark-mode uses zinc-300 (via CSS current-color).

interface DiagramFrameProps {
  color: string;
  children: ReactNode;
}

function DiagramFrame({ color, children }: DiagramFrameProps) {
  return (
    <svg
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-zinc-800 dark:text-zinc-200"
      role="img"
    >
      <defs>
        <marker id={`arrow-${color.slice(1)}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill={color} />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

// Reusable primitives
function Box({
  x, y, w, h, label, sub, color, accent = false,
}: { x: number; y: number; w: number; h: number; label: string; sub?: string; color: string; accent?: boolean }) {
  return (
    <g>
      <rect
        x={x} y={y} width={w} height={h} rx={4}
        fill={accent ? color : "transparent"}
        fillOpacity={accent ? 0.12 : 1}
        stroke={accent ? color : "currentColor"}
        strokeWidth={1}
      />
      <text x={x + w / 2} y={y + h / 2 + (sub ? -3 : 4)} textAnchor="middle" fontSize="10" fontWeight="600" fill="currentColor">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity={0.6}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ from, to, color, dashed = false }: { from: [number, number]; to: [number, number]; color: string; dashed?: boolean }) {
  return (
    <line
      x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]}
      stroke={color} strokeWidth={1}
      strokeDasharray={dashed ? "3 3" : undefined}
      markerEnd={`url(#arrow-${color.slice(1)})`}
    />
  );
}

function Title({ text }: { text: string }) {
  return (
    <text x={160} y={18} textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor" letterSpacing="0.5">
      {text.toUpperCase()}
    </text>
  );
}

// ── DIAGRAMS ──────────────────────────────────────────────────────────

// 1 Claude 101 — Layer stack of capabilities
function ClaudeStack() {
  const c = COURSE_COLORS.blue.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="Claude Capability Stack" />
      <Box x={60} y={38}  w={200} h={26} label="You (user)" color={c} />
      <Box x={60} y={72}  w={200} h={26} label="Claude" sub="thinking partner" color={c} accent />
      <Box x={40} y={112} w={80}  h={22} label="Write" color={c} />
      <Box x={125} y={112} w={70}  h={22} label="Analyse" color={c} />
      <Box x={200} y={112} w={80}  h={22} label="Code" color={c} />
      <Box x={40} y={148} w={80}  h={22} label="Chat" color={c} />
      <Box x={125} y={148} w={70}  h={22} label="Plan" color={c} />
      <Box x={200} y={148} w={80}  h={22} label="Cowork" color={c} />
    </DiagramFrame>
  );
}

// 2 Claude Code 101 — Agent loop
function AgentLoop() {
  const c = COURSE_COLORS.orange.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="The Agent Loop" />
      <Box x={20}  y={80} w={70} h={40} label="Prompt" color={c} />
      <Box x={125} y={80} w={70} h={40} label="Claude" color={c} accent />
      <Box x={230} y={80} w={70} h={40} label="Tools" color={c} />
      <Arrow from={[90, 100]}  to={[125, 100]} color={c} />
      <Arrow from={[195, 100]} to={[230, 100]} color={c} />
      <path d="M 265 120 Q 265 170 90 170 Q 55 170 55 120" fill="none" stroke={c} strokeWidth={1} strokeDasharray="3 3" markerEnd={`url(#arrow-${c.slice(1)})`} />
      <text x={160} y={185} textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity={0.55}>result feeds next turn</text>
    </DiagramFrame>
  );
}

// 3 Cowork — Team sequence
function CoworkSequence() {
  const c = COURSE_COLORS.amber.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="Cowork Session" />
      <Box x={20}  y={40} w={60} h={20} label="Owner" color={c} accent />
      <Box x={100} y={40} w={60} h={20} label="Guest" color={c} />
      <Box x={180} y={40} w={60} h={20} label="Guest" color={c} />
      <Box x={260} y={40} w={40} h={20} label="Claude" color={c} accent />
      {[50, 130, 210, 280].map((x, i) => <line key={i} x1={x} y1={60} x2={x} y2={175} stroke="currentColor" strokeOpacity={0.25} strokeDasharray="2 2" />)}
      <Arrow from={[50, 80]}  to={[280, 80]}  color={c} />
      <Arrow from={[280, 110]} to={[130, 110]} color={c} />
      <Arrow from={[130, 140]} to={[280, 140]} color={c} />
      <Arrow from={[280, 165]} to={[210, 165]} color={c} />
    </DiagramFrame>
  );
}

// 4 Claude Code in Action — EPCC flowchart
function EPCCFlow() {
  const c = COURSE_COLORS.red.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="Explore · Plan · Code · Commit" />
      {["Explore", "Plan", "Code", "Commit"].map((label, i) => (
        <g key={label}>
          <Box x={15 + i * 78} y={80} w={65} h={40} label={label} color={c} accent={i === 1 || i === 2} />
          {i < 3 && <Arrow from={[80 + i * 78, 100]} to={[95 + i * 78, 100]} color={c} />}
        </g>
      ))}
      <path d="M 45 120 Q 45 165 250 165 Q 280 165 280 120" fill="none" stroke={c} strokeWidth={1} strokeDasharray="3 3" markerEnd={`url(#arrow-${c.slice(1)})`} />
      <text x={160} y={182} textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity={0.55}>iterate on the loop</text>
    </DiagramFrame>
  );
}

// 5 AI Fluency Foundations — 4D pyramid
function FluencyPyramid() {
  const c = COURSE_COLORS.green.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="4D AI Fluency" />
      <polygon points="160,40 210,80 110,80" fill={c} fillOpacity={0.25} stroke={c} />
      <polygon points="110,80 210,80 240,120 80,120" fill={c} fillOpacity={0.15} stroke={c} />
      <polygon points="80,120 240,120 270,160 50,160" fill={c} fillOpacity={0.08} stroke={c} />
      <text x={160} y={72}  textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor">Delegation</text>
      <text x={160} y={105} textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor">Discernment</text>
      <text x={160} y={145} textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor">Diligence · Description</text>
    </DiagramFrame>
  );
}

// 6 API — Request/response architecture
function ApiArch() {
  const c = COURSE_COLORS.cyan.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="Claude API" />
      <Box x={20}  y={80} w={60} h={40} label="Client" sub="your app" color={c} />
      <Box x={130} y={80} w={70} h={40} label="Anthropic" sub="/v1/messages" color={c} accent />
      <Box x={240} y={80} w={60} h={40} label="Claude" color={c} />
      <Arrow from={[80, 92]}  to={[130, 92]}  color={c} />
      <Arrow from={[200, 92]} to={[240, 92]}  color={c} />
      <Arrow from={[240, 110]} to={[200, 110]} color={c} />
      <Arrow from={[130, 110]} to={[80, 110]}  color={c} />
      <text x={105} y={88}  textAnchor="middle" fontSize="7" fill="currentColor" fillOpacity={0.6}>msgs</text>
      <text x={105} y={122} textAnchor="middle" fontSize="7" fill="currentColor" fillOpacity={0.6}>reply</text>
    </DiagramFrame>
  );
}

// 7 MCP intro — Host/Client/Server
function McpArch() {
  const c = COURSE_COLORS.teal.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="MCP Architecture" />
      <Box x={20}  y={80} w={70} h={40} label="Host" sub="Claude Code" color={c} accent />
      <Box x={125} y={80} w={70} h={40} label="Client" sub="per server" color={c} />
      <Box x={230} y={80} w={70} h={40} label="Server" sub="tools · resources" color={c} accent />
      <Arrow from={[90, 100]}  to={[125, 100]} color={c} />
      <Arrow from={[195, 100]} to={[230, 100]} color={c} />
      <text x={160} y={150} textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity={0.6}>stdio · SSE</text>
    </DiagramFrame>
  );
}

// 8 Fluency for Educators — layer stack
function EducatorLayers() {
  const c = COURSE_COLORS.lime.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="AI in the Classroom" />
      {["Curriculum design", "Lesson planning", "Assessment", "Feedback loop"].map((label, i) => (
        <Box key={label} x={40} y={40 + i * 32} w={240} h={24} label={label} color={c} accent={i === 1} />
      ))}
    </DiagramFrame>
  );
}

// 9 Fluency for Students — pyramid
function StudentPyramid() {
  const c = COURSE_COLORS.emerald.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="Student AI Ladder" />
      <polygon points="160,40 220,80 100,80" fill={c} fillOpacity={0.25} stroke={c} />
      <polygon points="100,80 220,80 250,130 70,130" fill={c} fillOpacity={0.15} stroke={c} />
      <polygon points="70,130 250,130 280,170 40,170" fill={c} fillOpacity={0.08} stroke={c} />
      <text x={160} y={70}  textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor">Master</text>
      <text x={160} y={110} textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor">Apply</text>
      <text x={160} y={155} textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor">Understand</text>
    </DiagramFrame>
  );
}

// 10 MCP Advanced — network of servers
function McpNetwork() {
  const c = COURSE_COLORS.indigo.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="MCP Server Network" />
      <Box x={130} y={80} w={60} h={40} label="Claude" sub="host" color={c} accent />
      {[
        [30, 40, "GitHub"], [230, 40, "Slack"], [20, 130, "Drive"], [240, 130, "DB"],
      ].map(([x, y, l], i) => (
        <g key={i}>
          <Box x={x as number} y={y as number} w={60} h={26} label={l as string} color={c} />
          <line x1={(x as number) + 30} y1={(y as number) + 13} x2={160} y2={100} stroke={c} strokeWidth={1} strokeOpacity={0.5} />
        </g>
      ))}
    </DiagramFrame>
  );
}

// 11 Bedrock — client → aws → claude
function BedrockArch() {
  const c = COURSE_COLORS.yellow.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="Claude on AWS Bedrock" />
      <Box x={20}  y={80} w={60} h={40} label="Client" color={c} />
      <Box x={130} y={80} w={70} h={40} label="Bedrock" sub="AWS" color={c} accent />
      <Box x={240} y={80} w={60} h={40} label="Claude" color={c} />
      <Arrow from={[80, 100]}  to={[130, 100]} color={c} />
      <Arrow from={[200, 100]} to={[240, 100]} color={c} />
      <text x={160} y={150} textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity={0.6}>IAM · VPC · CloudWatch</text>
    </DiagramFrame>
  );
}

// 12 Vertex — client → gcp → claude
function VertexArch() {
  const c = COURSE_COLORS.sky.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="Claude on Vertex AI" />
      <Box x={20}  y={80} w={60} h={40} label="Client" color={c} />
      <Box x={130} y={80} w={70} h={40} label="Vertex" sub="GCP" color={c} accent />
      <Box x={240} y={80} w={60} h={40} label="Claude" color={c} />
      <Arrow from={[80, 100]}  to={[130, 100]} color={c} />
      <Arrow from={[200, 100]} to={[240, 100]} color={c} />
      <text x={160} y={150} textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity={0.6}>IAM · Projects · Regions</text>
    </DiagramFrame>
  );
}

// 13 Teaching AI Fluency — layer stack
function TeachingLayers() {
  const c = COURSE_COLORS.violet.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="Teaching AI Fluency" />
      {["Model the workflow", "Assign practice", "Give feedback", "Reflect together"].map((label, i) => (
        <Box key={label} x={40} y={40 + i * 32} w={240} h={24} label={label} color={c} accent={i === 2} />
      ))}
    </DiagramFrame>
  );
}

// 14 Nonprofits — pyramid
function NonprofitPyramid() {
  const c = COURSE_COLORS.rose.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="AI in Nonprofits" />
      <polygon points="160,40 220,80 100,80" fill={c} fillOpacity={0.25} stroke={c} />
      <polygon points="100,80 220,80 250,130 70,130" fill={c} fillOpacity={0.15} stroke={c} />
      <polygon points="70,130 250,130 280,170 40,170" fill={c} fillOpacity={0.08} stroke={c} />
      <text x={160} y={70}  textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor">Mission impact</text>
      <text x={160} y={110} textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor">Ops efficiency</text>
      <text x={160} y={155} textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor">Volunteer support</text>
    </DiagramFrame>
  );
}

// 15 Agent Skills — chain
function SkillChain() {
  const c = COURSE_COLORS.pink.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="Skill Invocation Chain" />
      {["Trigger", "SKILL.md", "Steps", "Result"].map((label, i) => (
        <g key={label}>
          <Box x={20 + i * 75} y={80} w={60} h={40} label={label} color={c} accent={i === 1} />
          {i < 3 && <Arrow from={[80 + i * 75, 100]} to={[95 + i * 75, 100]} color={c} />}
        </g>
      ))}
    </DiagramFrame>
  );
}

// 16 Subagents — orchestrator/worker
function SubagentNested() {
  const c = COURSE_COLORS.purple.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="Orchestrator & Workers" />
      <Box x={110} y={35} w={100} h={30} label="Orchestrator" color={c} accent />
      {[
        [20, 100, "Worker A"], [125, 100, "Worker B"], [230, 100, "Worker C"],
      ].map(([x, y, l], i) => (
        <g key={i}>
          <Box x={x as number} y={y as number} w={70} h={40} label={l as string} color={c} />
          <line x1={160} y1={65} x2={(x as number) + 35} y2={(y as number)} stroke={c} strokeWidth={1} />
        </g>
      ))}
      <text x={160} y={165} textAnchor="middle" fontSize="8" fill="currentColor" fillOpacity={0.6}>isolated context per worker</text>
    </DiagramFrame>
  );
}

// 17 Capabilities & Limitations — quadrant
function CapsQuadrant() {
  const c = COURSE_COLORS.slate.hex;
  return (
    <DiagramFrame color={c}>
      <Title text="Capabilities × Limits" />
      <line x1={160} y1={35} x2={160} y2={175} stroke="currentColor" strokeWidth={1} strokeOpacity={0.4} />
      <line x1={40}  y1={105} x2={280} y2={105} stroke="currentColor" strokeWidth={1} strokeOpacity={0.4} />
      <text x={100} y={65}  textAnchor="middle" fontSize="9" fontWeight="600" fill={c}>Text · Code</text>
      <text x={220} y={65}  textAnchor="middle" fontSize="9" fontWeight="600" fill={c}>Reasoning</text>
      <text x={100} y={145} textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity={0.7}>Real-time data</text>
      <text x={220} y={145} textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity={0.7}>Long context</text>
      <text x={165} y={30}  textAnchor="start"  fontSize="7" fill="currentColor" fillOpacity={0.5}>strengths →</text>
      <text x={165} y={192} textAnchor="start"  fontSize="7" fill="currentColor" fillOpacity={0.5}>watch-outs →</text>
    </DiagramFrame>
  );
}

const DIAGRAMS: Record<string, () => ReactElement> = {
  "claude-101": ClaudeStack,
  "claude-code-101": AgentLoop,
  "introduction-to-claude-cowork": CoworkSequence,
  "claude-code-in-action": EPCCFlow,
  "ai-fluency-framework-foundations": FluencyPyramid,
  "building-with-the-claude-api": ApiArch,
  "introduction-to-model-context-protocol": McpArch,
  "ai-fluency-for-educators": EducatorLayers,
  "ai-fluency-for-students": StudentPyramid,
  "model-context-protocol-advanced-topics": McpNetwork,
  "claude-with-amazon-bedrock": BedrockArch,
  "claude-with-google-clouds-vertex-ai": VertexArch,
  "teaching-ai-fluency": TeachingLayers,
  "ai-fluency-for-nonprofits": NonprofitPyramid,
  "introduction-to-agent-skills": SkillChain,
  "introduction-to-subagents": SubagentNested,
  "ai-capabilities-and-limitations": CapsQuadrant,
};

export function getCourseDiagram(courseId: string): ReactElement | null {
  const Fn = DIAGRAMS[courseId];
  return Fn ? <Fn /> : null;
}

export const DIAGRAM_TYPE: Record<string, string> = {
  "claude-101": "Layer Stack",
  "claude-code-101": "Architecture",
  "introduction-to-claude-cowork": "Sequence",
  "claude-code-in-action": "Flowchart",
  "ai-fluency-framework-foundations": "Pyramid",
  "building-with-the-claude-api": "Architecture",
  "introduction-to-model-context-protocol": "Architecture",
  "ai-fluency-for-educators": "Layer Stack",
  "ai-fluency-for-students": "Pyramid",
  "model-context-protocol-advanced-topics": "Network",
  "claude-with-amazon-bedrock": "Architecture",
  "claude-with-google-clouds-vertex-ai": "Architecture",
  "teaching-ai-fluency": "Layer Stack",
  "ai-fluency-for-nonprofits": "Pyramid",
  "introduction-to-agent-skills": "Chain",
  "introduction-to-subagents": "Nested",
  "ai-capabilities-and-limitations": "Quadrant",
};
