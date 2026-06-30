"use client";

const STORAGE_KEY = "cca-progress";

export interface ProgressData {
  completedLessons: Record<string, boolean>; // key: "domainId/lessonId"
}

export function loadProgress(): ProgressData {
  if (typeof window === "undefined") return { completedLessons: {} };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { completedLessons: {} };
  } catch {
    return { completedLessons: {} };
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function toggleLesson(domainId: string, lessonId: string): ProgressData {
  const data = loadProgress();
  const key = `${domainId}/${lessonId}`;
  if (data.completedLessons[key]) {
    delete data.completedLessons[key];
  } else {
    data.completedLessons[key] = true;
  }
  saveProgress(data);
  return data;
}

export function isLessonCompleted(domainId: string, lessonId: string): boolean {
  const data = loadProgress();
  return !!data.completedLessons[`${domainId}/${lessonId}`];
}

export function getDomainProgress(domainId: string, totalLessons: number): number {
  const data = loadProgress();
  const completed = Object.keys(data.completedLessons).filter(
    (key) => key.startsWith(`${domainId}/`) && data.completedLessons[key]
  ).length;
  return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
}

export function getOverallProgress(domains: { id: string; lessons: { id: string }[] }[]): number {
  const data = loadProgress();
  const total = domains.reduce((sum, d) => sum + d.lessons.length, 0);
  const completed = Object.values(data.completedLessons).filter(Boolean).length;
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}
