#!/usr/bin/env node
/**
 * Generate diagram + hero image + video URL for every lesson in courses.json.
 *
 * - Diagram: reuses courses/<folder>/<lessonId>-diagram.png when present;
 *            otherwise writes a programmatic SVG diagram derived from the md.
 * - Hero:    always writes a programmatic SVG hero (course-color gradient +
 *            lesson title + course number badge).
 * - Video:   YouTube channel URL fallback (rendered as an external link card;
 *            per-lesson overrides can be added in scripts/lesson-videos.json).
 *
 * Run from repo root: node scripts/generate-lesson-assets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const coursesJsonPath = path.join(repoRoot, "src/data/courses.json");
const publicRoot = path.join(repoRoot, "public/lessons");
const videosOverridePath = path.join(repoRoot, "scripts/lesson-videos.json");

const DEFAULT_VIDEO_URL = "https://www.youtube.com/@anthropic-ai/videos";

const COURSE_HEX = {
  blue: "#3b82f6", orange: "#f59e0b", amber: "#f59e0b", red: "#ef4444",
  green: "#22c55e", cyan: "#06b6d4", teal: "#14b8a6", lime: "#84cc16",
  emerald: "#10b981", indigo: "#6366f1", yellow: "#eab308", sky: "#0ea5e9",
  violet: "#8b5cf6", rose: "#f43f5e", pink: "#ec4899", purple: "#a855f7",
  slate: "#64748b",
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function readVideoOverrides() {
  try {
    return JSON.parse(fs.readFileSync(videosOverridePath, "utf-8"));
  } catch {
    return {};
  }
}

function extractSubtopics(mdPath) {
  try {
    const raw = fs.readFileSync(mdPath, "utf-8");
    const lines = raw.split("\n");
    const h2 = lines
      .filter((l) => /^##\s+/.test(l) && !/^##\s+(Learning objectives|Lesson reflection|Screenshot)/i.test(l))
      .map((l) => l.replace(/^##\s+/, "").trim())
      .slice(0, 4);
    if (h2.length >= 2) return h2;
    const bullets = lines
      .filter((l) => /^-\s+/.test(l))
      .map((l) => l.replace(/^-\s+/, "").replace(/\*\*/g, "").split(" — ")[0].split(":")[0].trim())
      .filter((s) => s.length > 0 && s.length < 60)
      .slice(0, 4);
    return bullets.length ? bullets : ["Concept", "Approach", "Practice", "Outcome"];
  } catch {
    return ["Overview", "Approach", "Practice", "Outcome"];
  }
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars) {
      if (cur) lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function heroSvg({ courseNum, courseTitle, lessonIndex, lessonTotal, lessonTitle, colorHex }) {
  const W = 1200, H = 480;
  const titleLines = wrapText(lessonTitle, 26).slice(0, 3);
  const titleY = H / 2 - (titleLines.length - 1) * 40;
  const titleTspans = titleLines
    .map((ln, i) => `<tspan x="60" dy="${i === 0 ? 0 : 78}">${esc(ln)}</tspan>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(lessonTitle)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colorHex}" stop-opacity="0.95"/>
      <stop offset="60%" stop-color="${colorHex}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0a0a0a" stop-opacity="1"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.2" fill="#ffffff" fill-opacity="0.06"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="#0a0a0a"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <g font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" fill="#ffffff">
    <text x="60" y="90" font-size="18" font-weight="600" letter-spacing="2" fill="#ffffff" fill-opacity="0.85">CCA · COURSE ${courseNum} · ${esc(courseTitle.toUpperCase())}</text>
    <text x="60" y="${titleY}" font-size="66" font-weight="800">${titleTspans}</text>
    <text x="60" y="${H - 50}" font-size="16" font-weight="500" fill="#ffffff" fill-opacity="0.85">Lesson ${lessonIndex} of ${lessonTotal}</text>
    <g transform="translate(${W - 200}, ${H - 100})">
      <rect x="0" y="0" width="140" height="60" rx="12" fill="#ffffff" fill-opacity="0.14"/>
      <text x="70" y="38" text-anchor="middle" font-size="22" font-weight="700">v2.1</text>
    </g>
  </g>
</svg>`;
}

function diagramSvg({ lessonTitle, subtopics, colorHex }) {
  const W = 1200, H = 720;
  const items = subtopics.slice(0, 4);
  while (items.length < 4) items.push("");
  const positions = [
    { x: 100,  y: 300 },
    { x: 660,  y: 300 },
    { x: 100,  y: 500 },
    { x: 660,  y: 500 },
  ];
  const boxes = items
    .map((label, i) => {
      if (!label) return "";
      const p = positions[i];
      const lines = wrapText(label, 30).slice(0, 3);
      const tspans = lines
        .map((ln, j) => `<tspan x="${p.x + 30}" dy="${j === 0 ? 0 : 26}">${esc(ln)}</tspan>`)
        .join("");
      return `<g>
        <rect x="${p.x}" y="${p.y}" width="440" height="150" rx="18" fill="#111827" stroke="${colorHex}" stroke-width="2" stroke-opacity="0.6"/>
        <circle cx="${p.x + 26}" cy="${p.y + 26}" r="14" fill="${colorHex}" fill-opacity="0.25" stroke="${colorHex}" stroke-width="1.5"/>
        <text x="${p.x + 26}" y="${p.y + 31}" text-anchor="middle" font-size="14" font-weight="700" fill="${colorHex}" font-family="Inter, system-ui">${i + 1}</text>
        <text x="${p.x + 30}" y="${p.y + 70}" font-size="20" font-weight="600" fill="#e5e7eb" font-family="Inter, system-ui">${tspans}</text>
      </g>`;
    })
    .join("");
  const titleLines = wrapText(lessonTitle, 40).slice(0, 2);
  const titleTspans = titleLines
    .map((ln, i) => `<tspan x="${W / 2}" dy="${i === 0 ? 0 : 42}" text-anchor="middle">${esc(ln)}</tspan>`)
    .join("");
  const titleY = 140 - (titleLines.length - 1) * 20;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(lessonTitle)} diagram">
  <rect width="${W}" height="${H}" fill="#0a0a0a"/>
  <g font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif">
    <rect x="80" y="60" width="${W - 160}" height="140" rx="18" fill="${colorHex}" fill-opacity="0.12" stroke="${colorHex}" stroke-width="2" stroke-opacity="0.5"/>
    <text x="${W / 2}" y="${titleY}" font-size="34" font-weight="800" fill="#f5f5f5">${titleTspans}</text>
    <text x="${W / 2}" y="200" text-anchor="middle" font-size="16" font-weight="500" fill="${colorHex}">Key ideas in this lesson</text>
    <line x1="600" y1="230" x2="600" y2="670" stroke="${colorHex}" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="4 6"/>
    <line x1="100" y1="450" x2="1100" y2="450" stroke="${colorHex}" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="4 6"/>
    ${boxes}
  </g>
</svg>`;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyFile(src, dst) {
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

function writeFile(dst, content) {
  ensureDir(path.dirname(dst));
  fs.writeFileSync(dst, content, "utf-8");
}

function main() {
  const courses = JSON.parse(fs.readFileSync(coursesJsonPath, "utf-8"));
  const videoOverrides = readVideoOverrides();
  let touched = 0, copied = 0, generatedDiagrams = 0, generatedHeroes = 0;

  for (const course of courses) {
    const colorHex = COURSE_HEX[course.color] ?? COURSE_HEX.slate;
    const courseOutDir = path.join(publicRoot, course.id);
    ensureDir(courseOutDir);

    for (let i = 0; i < course.lessons.length; i++) {
      const lesson = course.lessons[i];
      const lessonMdPath = path.join(repoRoot, lesson.path);
      const sourceDiagramPng = path.join(
        repoRoot,
        course.folder,
        `${lesson.id}-diagram.png`
      );

      // ---- Diagram ----
      let diagramWebPath;
      if (fs.existsSync(sourceDiagramPng)) {
        const dst = path.join(courseOutDir, `${lesson.id}-diagram.png`);
        copyFile(sourceDiagramPng, dst);
        diagramWebPath = `/lessons/${course.id}/${lesson.id}-diagram.png`;
        copied++;
      } else {
        const subtopics = extractSubtopics(lessonMdPath);
        const svg = diagramSvg({ lessonTitle: lesson.title, subtopics, colorHex });
        const dst = path.join(courseOutDir, `${lesson.id}-diagram.svg`);
        writeFile(dst, svg);
        diagramWebPath = `/lessons/${course.id}/${lesson.id}-diagram.svg`;
        generatedDiagrams++;
      }

      // ---- Hero ----
      const hero = heroSvg({
        courseNum: course.course,
        courseTitle: course.title,
        lessonIndex: i + 1,
        lessonTotal: course.lessons.length,
        lessonTitle: lesson.title,
        colorHex,
      });
      const heroDst = path.join(courseOutDir, `${lesson.id}-hero.svg`);
      writeFile(heroDst, hero);
      const heroWebPath = `/lessons/${course.id}/${lesson.id}-hero.svg`;
      generatedHeroes++;

      // ---- Video ----
      const overrideKey = `${course.id}/${lesson.id}`;
      const video = videoOverrides[overrideKey] ?? DEFAULT_VIDEO_URL;

      lesson.diagram = diagramWebPath;
      lesson.image = heroWebPath;
      lesson.video = video;
      touched++;
    }
  }

  fs.writeFileSync(coursesJsonPath, JSON.stringify(courses, null, 2) + "\n", "utf-8");
  console.log(`Updated ${touched} lessons`);
  console.log(`  copied diagrams:     ${copied}`);
  console.log(`  generated diagrams:  ${generatedDiagrams}`);
  console.log(`  generated heroes:    ${generatedHeroes}`);
  console.log(`Wrote ${coursesJsonPath}`);
}

main();
