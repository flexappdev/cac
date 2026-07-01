import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/lib/settings";
import ShellWrapper from "@/components/ShellWrapper";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CCA Study App",
  description: "Claude Certified Architect exam preparation — 5 domains, lessons, and practice quizzes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-zinc-800 dark:text-zinc-100`}>
        <AuthProvider>
          <SettingsProvider>
            <ShellWrapper>
              {children}
            </ShellWrapper>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
