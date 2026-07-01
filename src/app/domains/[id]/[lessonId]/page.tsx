import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight, FileText, List, PlayCircle, Youtube } from "lucide-react";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { COURSE_COLORS, COURSES, getCourseById } from "@/lib/courses";
import LessonToggle from "@/components/LessonToggle";

interface Props {
  params: Promise<{ id: string; lessonId: string }>;
}

export async function generateStaticParams() {
  const params: { id: string; lessonId: string }[] = [];
  for (const course of COURSES) {
    for (const lesson of course.lessons) {
      params.push({ id: course.id, lessonId: lesson.id });
    }
  }
  return params;
}

function extractYoutubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function readInlineSvg(webPath: string): string | null {
  try {
    const filePath = path.join(process.cwd(), "public", webPath.replace(/^\//, ""));
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

export default async function LessonPage({ params }: Props) {
  const { id, lessonId } = await params;
  const course = getCourseById(id);
  if (!course) notFound();

  const lesson = course.lessons.find((l) => l.id === lessonId);
  if (!lesson) notFound();

  const lessonIndex = course.lessons.indexOf(lesson);
  const prev = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const next = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;

  const colors = COURSE_COLORS[course.color] ?? COURSE_COLORS["blue"];

  // Read markdown from repo root
  let content = "";
  try {
    const filePath = path.join(process.cwd(), lesson.path);
    const raw = fs.readFileSync(filePath, "utf-8");
    // Strip screenshot reference lines and image links to screenshots/
    content = raw
      .split("\n")
      .filter((line) => {
        if (/^\*\*Screenshot:\*\*/.test(line)) return false;
        if (/!\[.*\]\(.*screenshots\//.test(line)) return false;
        if (/!\[.*\]\(\.\.\/\.\.\/screenshots\//.test(line)) return false;
        return true;
      })
      .join("\n");
  } catch {
    content = `# ${lesson.title}\n\n_Content not yet available for this lesson._`;
  }

  const diagramSvg = lesson.diagram?.endsWith(".svg") ? readInlineSvg(lesson.diagram) : null;
  const videoId = lesson.video ? extractYoutubeVideoId(lesson.video) : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-10 z-10">
        <div className="max-w-[860px] mx-auto px-6 py-3 flex items-center gap-3">
          <Link
            href={`/domains/${id}`}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {course.title}
          </Link>
          <div className="h-4 w-px bg-zinc-800 shrink-0" />
          <span className="text-xs text-zinc-400 truncate">{lesson.title}</span>
          <div className="ml-auto flex items-center gap-1.5 shrink-0">
            {lesson.source === "captured" ? (
              <FileText className="h-3 w-3 text-zinc-600" />
            ) : (
              <List className="h-3 w-3 text-zinc-600" />
            )}
            <span className="text-[10px] text-zinc-600">{lesson.source === "captured" ? "note" : "outline"}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[860px] mx-auto px-6 py-8">
        {/* Lesson header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                style={{ backgroundColor: colors.hex }}
              >
                {course.course} · {lessonIndex + 1}/{course.lessons.length}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-100">{lesson.title}</h1>
          </div>
          <LessonToggle courseId={id} lessonId={lessonId} accentHex={colors.hex} />
        </div>

        {/* Hero image */}
        {lesson.image && (
          <div className="mb-6 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
            <Image
              src={lesson.image}
              alt={`${lesson.title} — hero`}
              width={1200}
              height={480}
              className="w-full h-auto"
              unoptimized
              priority
            />
          </div>
        )}

        {/* Diagram */}
        {lesson.diagram && (
          <div className="mb-6 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
            <div className="px-4 py-2 border-b border-zinc-800 flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">Diagram</span>
            </div>
            <div className="p-4 flex justify-center">
              {diagramSvg ? (
                <div
                  className="w-full max-w-[1000px] [&_svg]:w-full [&_svg]:h-auto"
                  dangerouslySetInnerHTML={{ __html: diagramSvg }}
                />
              ) : (
                <Image
                  src={lesson.diagram}
                  alt={`${lesson.title} — diagram`}
                  width={1000}
                  height={600}
                  className="w-full max-w-[1000px] h-auto rounded-lg"
                  unoptimized
                />
              )}
            </div>
          </div>
        )}

        {/* Video */}
        {lesson.video && (
          <div className="mb-8 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
            <div className="px-4 py-2 border-b border-zinc-800 flex items-center gap-2">
              <PlayCircle className="h-3.5 w-3.5" style={{ color: colors.hex }} />
              <span className="text-[10px] uppercase tracking-wider text-zinc-500">Video</span>
            </div>
            {videoId ? (
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`${lesson.title} — video`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <a
                href={lesson.video}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-4 hover:bg-zinc-900/60 transition-colors group"
              >
                <Youtube className="h-5 w-5 text-red-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-zinc-200 group-hover:text-white truncate">
                    Watch related videos on Anthropic&rsquo;s YouTube channel
                  </p>
                  <p className="text-[11px] text-zinc-500 truncate">{lesson.video}</p>
                </div>
                <span className="text-xs text-zinc-500 group-hover:text-zinc-300 shrink-0">Open →</span>
              </a>
            )}
          </div>
        )}

        {/* Markdown content */}
        <div className="prose prose-invert prose-sm max-w-none
          prose-headings:text-zinc-100 prose-headings:font-semibold
          prose-h1:text-xl prose-h1:mt-8 prose-h1:mb-4
          prose-h2:text-base prose-h2:mt-6 prose-h2:mb-3
          prose-h3:text-sm prose-h3:mt-4 prose-h3:mb-2
          prose-p:text-zinc-400 prose-p:leading-relaxed
          prose-strong:text-zinc-200
          prose-li:text-zinc-400
          prose-code:text-zinc-300 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl
          prose-blockquote:border-l-zinc-700 prose-blockquote:text-zinc-500
          prose-a:text-zinc-300 hover:prose-a:text-zinc-100
          prose-hr:border-zinc-800
          prose-table:text-zinc-400 prose-thead:text-zinc-300 prose-th:border-zinc-700 prose-td:border-zinc-800
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-10 pt-6 border-t border-zinc-800 grid grid-cols-2 gap-3">
          <div>
            {prev && (
              <Link
                href={`/domains/${id}/${prev.id}`}
                className="flex items-center gap-2 p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all group"
              >
                <ChevronLeft className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5">Previous</p>
                  <p className="text-xs text-zinc-300 group-hover:text-zinc-100 truncate transition-colors">{prev.title}</p>
                </div>
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link
                href={`/domains/${id}/${next.id}`}
                className="flex items-center gap-2 p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all group text-right justify-end"
              >
                <div className="min-w-0">
                  <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5">Next</p>
                  <p className="text-xs text-zinc-300 group-hover:text-zinc-100 truncate transition-colors">{next.title}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 shrink-0" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
