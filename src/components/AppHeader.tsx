"use client";
import Link from "next/link";
import { GraduationCap, Sun, Moon } from "lucide-react";
import { useSettings } from "@/lib/settings";
import { APP_VERSION } from "@/lib/version";
import SignInButton from "@/components/SignInButton";

export default function AppHeader() {
  const { settings, update } = useSettings();
  const isDark = settings.theme === "dark";

  return (
    <div className="fixed top-0 left-0 right-0 z-[110] h-10 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm">
      <div className="h-full px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <GraduationCap className="h-4 w-4" style={{ color: "var(--app-accent)" }} />
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">CCA</span>
          <span className="text-zinc-400 dark:text-zinc-700">·</span>
          <span className="text-xs text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors">{APP_VERSION}</span>
        </Link>

        <div className="flex items-center gap-1">
          <SignInButton />
          <button
            onClick={() => update({ theme: isDark ? "light" : "dark" })}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
            className="flex items-center justify-center h-7 w-7 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
