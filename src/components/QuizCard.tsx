"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Circle } from "lucide-react";
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const domain = EXAM_DOMAINS.find((entry) => entry.domain === question.domain);
  const colors = domain ? (COURSE_COLORS[domain.color] ?? COURSE_COLORS["blue"]) : COURSE_COLORS["blue"];

  const locked = selectedIndex !== null || currentScore !== null;

  const handleSelect = (i: number) => {
    if (locked) return;
    setSelectedIndex(i);
    const isCorrect = i === question.correctIndex;
    onScore?.(question.id, isCorrect ? "correct" : "incorrect");
  };

  const optionState = (i: number): "idle" | "correct" | "wrong" | "unpicked-correct" => {
    if (!locked) return "idle";
    if (i === question.correctIndex) return selectedIndex === i ? "correct" : "unpicked-correct";
    if (selectedIndex === i) return "wrong";
    return "idle";
  };

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all ${
        currentScore === "correct"
          ? "border-green-500/60 dark:border-green-800/60 bg-green-50 dark:bg-green-900/10"
          : currentScore === "incorrect"
          ? "border-red-500/60 dark:border-red-800/60 bg-red-50 dark:bg-red-900/10"
          : "border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/60"
      }`}
    >
      {/* Question header */}
      <div className="flex items-start gap-3 p-4">
        <span
          className="flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold text-white shrink-0 mt-0.5"
          style={{ backgroundColor: colors.hex }}
        >
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          {domain && (
            <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mb-1.5 truncate max-w-full ${colors.badge}`}>
              D{question.domain} — {domain.title}
            </span>
          )}
          <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed">{question.question}</p>
        </div>

        <div className="shrink-0 flex items-center gap-2 mt-0.5">
          {currentScore === "correct" && <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />}
          {currentScore === "incorrect" && <XCircle className="h-4 w-4 text-red-500 dark:text-red-400" />}
        </div>
      </div>

      {/* Options */}
      <div className="px-4 pb-3 space-y-2">
        {question.options.map((option, i) => {
          const state = optionState(i);
          const letter = String.fromCharCode(65 + i); // A, B, C, D
          const base = "w-full flex items-start gap-3 p-3 rounded-lg text-left text-sm border transition-all";
          const styles = {
            idle: locked
              ? "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 text-zinc-500 dark:text-zinc-500 cursor-default"
              : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 cursor-pointer",
            correct: "border-green-500 dark:border-green-600 bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-200",
            wrong: "border-red-500 dark:border-red-600 bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-200",
            "unpicked-correct": "border-green-500/70 dark:border-green-600/70 bg-green-50 dark:bg-green-900/15 text-green-800 dark:text-green-300",
          } as const;
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              disabled={locked}
              className={`${base} ${styles[state]}`}
            >
              <span
                className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border ${
                  state === "correct" || state === "unpicked-correct"
                    ? "bg-green-500 border-green-500 text-white"
                    : state === "wrong"
                    ? "bg-red-500 border-red-500 text-white"
                    : "border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {state === "correct" || state === "unpicked-correct" ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : state === "wrong" ? (
                  <XCircle className="h-3.5 w-3.5" />
                ) : (
                  letter
                )}
              </span>
              <span className="flex-1 leading-relaxed">{option}</span>
              {!locked && <Circle className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-700 shrink-0 mt-0.5" />}
            </button>
          );
        })}
      </div>

      {/* Explanation (only after locking) */}
      {locked && (
        <div className="px-4 pb-4">
          <div
            className="p-3 rounded-lg text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
            style={{ backgroundColor: `${colors.hex}15`, borderLeft: `3px solid ${colors.hex}` }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-widest block mb-1.5" style={{ color: colors.hex }}>
              Explanation
            </span>
            {question.answer}
          </div>
        </div>
      )}
    </div>
  );
}
