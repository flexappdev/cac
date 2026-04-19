"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type AccentColor = "steel" | "orange" | "pink" | "blue" | "purple" | "teal" | "rose";
export type Theme = "dark" | "light";

export const ACCENT_PRESETS: Record<AccentColor, { main: string; dark: string; light: string; name: string }> = {
  steel:  { main: "#006699", dark: "#004d73", light: "#33a6d9", name: "Steel Blue" },
  orange: { main: "#f59e0b", dark: "#d97706", light: "#fcd34d", name: "Orange" },
  pink:   { main: "#ec4899", dark: "#db2777", light: "#f9a8d4", name: "Pink" },
  blue:   { main: "#3b82f6", dark: "#2563eb", light: "#93c5fd", name: "Blue" },
  purple: { main: "#a855f7", dark: "#9333ea", light: "#d8b4fe", name: "Purple" },
  teal:   { main: "#14b8a6", dark: "#0d9488", light: "#5eead4", name: "Teal" },
  rose:   { main: "#f43f5e", dark: "#e11d48", light: "#fda4af", name: "Rose" },
};

export interface Settings {
  accentColor: AccentColor;
  navCollapsed: boolean;
  theme: Theme;
}

export const DEFAULT_SETTINGS: Settings = {
  accentColor: "steel",
  navCollapsed: false,
  theme: "dark",
};

interface SettingsContextValue {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: DEFAULT_SETTINGS,
  update: () => {},
});

export function applyAccent(color: AccentColor) {
  const p = ACCENT_PRESETS[color];
  const r = document.documentElement;
  r.style.setProperty("--app-accent", p.main);
  r.style.setProperty("--app-accent-dark", p.dark);
  r.style.setProperty("--app-accent-light", p.light);
}

export function applyTheme(theme: Theme) {
  const html = document.documentElement;
  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cca-settings");
      const parsed: Settings = saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
      setSettings(parsed);
      applyAccent(parsed.accentColor);
      applyTheme(parsed.theme);
    } catch {
      applyAccent(DEFAULT_SETTINGS.accentColor);
      applyTheme(DEFAULT_SETTINGS.theme);
    }
  }, []);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try { localStorage.setItem("cca-settings", JSON.stringify(next)); } catch {}
      if (patch.accentColor) applyAccent(patch.accentColor);
      if (patch.theme) applyTheme(patch.theme);
      return next;
    });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, update }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
