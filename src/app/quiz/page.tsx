"use client";

import { useState } from "react";
import { Brain, RotateCcw, CheckCircle2, XCircle, Trophy } from "lucide-react";
import QuizCard, { type ScoreResult } from "@/components/QuizCard";
import { EXAM_DOMAINS, QUIZ_QUESTIONS } from "@/lib/courses";

export default function QuizPage() {
  const [domainFilter, setDomainFilter] = useState<number | null>(null);
  const [scores, setScores] = useState<Record<number, ScoreResult>>({});

  const filtered = domainFilter
    ? QUIZ_QUESTIONS.filter((q) => q.domain === domainFilter)
    : QUIZ_QUESTIONS;

  const handleScore = (id: number, result: ScoreResult) => {
    setScores((prev) => ({ ...prev, [id]: result }));
  };

  const correct = filtered.filter((q) => scores[q.id] === "correct").length;
  const incorrect = filtered.filter((q) => scores[q.id] === "incorrect").length;
  const answered = correct + incorrect;
  const pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;

  const handleReset = () => {
    setScores({});
    setDomainFilter(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[800px] mx-auto px-6 py-3 flex items-center gap-3">
          <Brain className="h-4 w-4" style={{ color: "var(--app-accent)" }} />
          <h1 className="text-sm font-semibold text-zinc-100">Practice Quiz</h1>
          <span className="text-xs text-zinc-600 ml-auto">
            {filtered.length} question{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-8">

        {/* Score summary */}
        {answered > 0 && (
          <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="font-semibold text-green-400">{correct}</span>
                  <span className="text-zinc-600 text-xs">correct</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <XCircle className="h-4 w-4 text-red-400" />
                  <span className="font-semibold text-red-400">{incorrect}</span>
                  <span className="text-zinc-600 text-xs">missed</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Trophy className="h-4 w-4 text-zinc-500" />
                  <span className="font-semibold text-zinc-300">{pct}%</span>
                  <span className="text-zinc-600 text-xs">score</span>
                </div>
              </div>
              {answered === filtered.length && (
                <span className="text-xs font-semibold" style={{ color: pct >= 80 ? "#22c55e" : pct >= 60 ? "#f59e0b" : "#ef4444" }}>
                  {pct >= 80 ? "Exam Ready ✓" : pct >= 60 ? "Keep Studying" : "Needs Work"}
                </span>
              )}
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(answered / filtered.length) * 100}%`, backgroundColor: pct >= 80 ? "#22c55e" : pct >= 60 ? "#f59e0b" : "var(--app-accent)" }}
              />
            </div>
            <p className="text-[10px] text-zinc-600 mt-1.5">{answered}/{filtered.length} answered</p>
          </div>
        )}

        {/* Domain filter */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <button
            onClick={() => setDomainFilter(null)}
            className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
              domainFilter === null
                ? "border-zinc-500 text-white"
                : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
            }`}
            style={domainFilter === null ? { backgroundColor: "var(--app-accent)", borderColor: "var(--app-accent)" } : undefined}
          >
            All
          </button>
          {EXAM_DOMAINS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDomainFilter(d.domain)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                domainFilter === d.domain
                  ? "border-zinc-500 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
              style={domainFilter === d.domain ? { backgroundColor: "var(--app-accent)", borderColor: "var(--app-accent)" } : undefined}
            >
              D{d.domain} — {d.title.split(" ")[0]}
            </button>
          ))}
          {(domainFilter !== null || answered > 0) && (
            <button
              onClick={handleReset}
              className="ml-auto flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          )}
        </div>

        {/* Hint */}
        <p className="text-xs text-zinc-600 mb-4">
          Click a question to reveal the answer, then mark whether you got it right.
        </p>

        {/* Quiz cards */}
        <div className="space-y-3">
          {filtered.map((q, idx) => (
            <QuizCard
              key={q.id}
              question={q}
              index={idx}
              onScore={handleScore}
              currentScore={scores[q.id] ?? null}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-zinc-600 text-sm">
            No questions for this domain.
          </div>
        )}
      </div>
    </div>
  );
}
