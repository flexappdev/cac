"use client";
import LeftSidebar from "./LeftSidebar";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { useSettings } from "@/lib/settings";

export default function ShellWrapper({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();
  const sidebarWidth = settings.navCollapsed ? 52 : 180;

  return (
    <>
      <AppHeader />
      <LeftSidebar />
      <main
        className="min-h-screen pt-10 pb-12 transition-[margin] duration-200"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        {children}
      </main>
      <AppFooter />
    </>
  );
}
