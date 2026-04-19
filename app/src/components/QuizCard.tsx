"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, XCircle } from "lucide-react";
import type { QuizQuestion } from "@/lib/courses";
import { EXAM_DOMAINS, COURSE_COLORS } from "@/lib/courses";

export type ScoreResult = "correct" | "incorrect" | null;

interface QuizCardProps {
  question: QuizQuestion;
  index: number;
  onScore?: (id: number, result: ScoreResult) => void;
  currentScore?: ScoreResult;
}

export default function QuizCard({ question, index, onScore, currentScore }: QuizCardProps) {
  const [revealed, setRevealed] = useState(false);
  const domain = EXAM_DOMAINS.find((entry) => entry.domain === question.domain);
  const colors = domain ? (COURSE_COLORS[domain.color] ?? COURSE_COLORS["blue"]) : COURSE_COLORS["blue"];

  const handleReveal = () => setRevealed((r) => !r);

  const handleScore = (result: ScoreResult) => {
    onScore?.(question.id, result === currentScore ? null : result);
  };

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all ${
        currentScore === "correct"
          ? "border-green-800/60 bg-green-900/10"
          : currentScore === "incorrect"
          ? "border-red-800/60 bg-red-900/10"
          : revealed
          ? "border-zinc-700 bg-zinc-900"
          : "border-zinc-800 bg-zinc-900/60"
      }`}
    >
      {/* Question header */}
      <button
        onClick={handleReveal}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-zinc-800/30 transition-colors"
      >
        {/* Number */}
        <span
          className="flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold text-white shrink-0 mt-0.5"
          style={{ backgroundColor: colors.hex }}
        >
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          {/* Domain tag */}
          {domain && (
            <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mb-1.5 truncate max-w-full ${colors.badge}`}>
              D{question.domain} — {domain.title}
            </span>
          )}
          <p className="text-sm text-zinc-200 leading-relaxed">{question.question}</p>
        </div>

        <div className="shrink-0 flex items-center gap-2 mt-0.5">
          {currentScore === "correct" && <CheckCircle2 className="h-4 w-4 text-green-400" />}
          {currentScore === "incorrect" && <XCircle className="h-4 w-4 text-red-400" />}
          {revealed ? <ChevronUp className="h-4 w-4 text-zinc-600" /> : <ChevronDown className="h-4 w-4 text-zinc-600" />}
        </div>
      </button>

      {/* Answer + scoring */}
      {revealed && (
        <div className="px-4 pb-4 space-y-3">
          <div
            className="mt-1 p-3 rounded-lg text-sm text-zinc-300 leading-relaxed"
            style={{ backgroundColor: `${colors.hex}15`, borderLeft: `3px solid ${colors.hex}` }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest block mb-1.5" style={{ color: colors.hex }}>
              Answer
            </span>
            {question.answer}
          </div>

          {/* Score buttons */}
          {onScore && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] text-zinc-600 mr-1">Did you get it?</span>
              <button
                onClick={() => handleScore("correct")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${
                  currentScore === "correct"
                    ? "bg-green-900/40 border-green-700 text-green-300"
                    : "bg-zinc-900 border-zinc-700 text-zinc-500 hover:border-green-700 hover:text-green-400"
                }`}
              >
                <CheckCircle2 className="h-3 w-3" />
                Got it
              </button>
              <button
                onClick={() => handleScore("incorrect")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${
                  currentScore === "incorrect"
                    ? "bg-red-900/40 border-red-700 text-red-300"
                    : "bg-zinc-900 border-zinc-700 text-zinc-500 hover:border-red-700 hover:text-red-400"
                }`}
              >
                <XCircle className="h-3 w-3" />
                Missed it
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
