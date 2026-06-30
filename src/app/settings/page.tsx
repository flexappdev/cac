"use client";

import { Settings2, CheckCircle2, Sun, Moon } from "lucide-react";
import { ACCENT_PRESETS, DEFAULT_SETTINGS, useSettings, type AccentColor } from "@/lib/settings";
import { COURSES } from "@/lib/courses";

export default function SettingsPage() {
  const { settings, update } = useSettings();
  const totalLessons = COURSES.reduce((sum, course) => sum + course.lessons.length, 0);

  const handleReset = () => {
    update(DEFAULT_SETTINGS);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[900px] mx-auto px-6 py-3 flex items-center gap-3">
          <Settings2 className="h-4 w-4" style={{ color: "var(--app-accent)" }} />
          <h1 className="text-sm font-semibold text-zinc-100">Settings</h1>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-8 space-y-10">

        {/* Theme */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Theme</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => update({ theme: "dark" })}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all ${
                settings.theme === "dark"
                  ? "border-zinc-400 bg-zinc-800 text-zinc-100"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
              Dark
              {settings.theme === "dark" && <CheckCircle2 className="h-3 w-3 text-zinc-300" />}
            </button>
            <button
              onClick={() => update({ theme: "light" })}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all ${
                settings.theme === "light"
                  ? "border-zinc-400 bg-zinc-800 text-zinc-100"
                  : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
              Light
              {settings.theme === "light" && <CheckCircle2 className="h-3 w-3 text-zinc-300" />}
            </button>
          </div>
        </section>

        {/* Accent color */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Accent Color</p>
          <div className="flex flex-wrap gap-3">
            {(Object.entries(ACCENT_PRESETS) as [AccentColor, typeof ACCENT_PRESETS[AccentColor]][]).map(([key, val]) => (
              <button
                key={key}
                onClick={() => update({ accentColor: key })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all ${
                  settings.accentColor === key
                    ? "border-zinc-400 bg-zinc-800 text-zinc-100"
                    : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: val.main }} />
                {val.name}
                {settings.accentColor === key && <CheckCircle2 className="h-3 w-3 text-zinc-300" />}
              </button>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">Preview</p>
            <div className="flex items-center gap-3 flex-wrap">
              <button className="px-4 py-1.5 rounded-lg text-xs font-medium text-white" style={{ backgroundColor: "var(--app-accent)" }}>
                Action button
              </button>
              <span
                className="inline-block text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: "color-mix(in srgb, var(--app-accent) 15%, transparent)", color: "var(--app-accent-light)" }}
              >
                Badge
              </span>
              <span className="text-xs font-semibold" style={{ color: "var(--app-accent)" }}>Accent text</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-zinc-600">
                <span>Progress bar</span><span>72%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full rounded-full w-[72%]" style={{ backgroundColor: "var(--app-accent)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Navigation</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => update({ navCollapsed: false })}
              className={`px-4 py-2 rounded-lg text-xs border transition-colors ${
                !settings.navCollapsed
                  ? "bg-zinc-700 border-zinc-500 text-zinc-100"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600"
              }`}
            >
              Full nav (icons + labels)
            </button>
            <button
              onClick={() => update({ navCollapsed: true })}
              className={`px-4 py-2 rounded-lg text-xs border transition-colors ${
                settings.navCollapsed
                  ? "bg-zinc-700 border-zinc-500 text-zinc-100"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600"
              }`}
            >
              Icons only
            </button>
          </div>
        </section>

        {/* App info */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">App Info</p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl divide-y divide-zinc-800">
            {[
              { label: "App", value: "CCA Study App" },
              { label: "Port", value: "24301" },
              { label: "Default Accent", value: "#006699 (Steel Blue)" },
              { label: "Courses", value: String(COURSES.length) },
              { label: "Lessons", value: String(totalLessons) },
              { label: "Quiz Questions", value: "15" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center px-4 py-3">
                <span className="text-xs text-zinc-500">{label}</span>
                <span className="text-xs text-zinc-300 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Reset */}
        <section className="pt-4 border-t border-zinc-800">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg text-xs border border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-colors"
          >
            Reset to defaults
          </button>
        </section>

      </div>
    </div>
  );
}
