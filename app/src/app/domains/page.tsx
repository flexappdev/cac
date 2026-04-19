import { LayoutGrid } from "lucide-react";
import DomainGrid from "@/components/DomainGrid";
import { COURSES } from "@/lib/courses";

export default function DomainsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-3">
          <LayoutGrid className="h-4 w-4" style={{ color: "var(--app-accent)" }} />
          <h1 className="text-sm font-semibold text-zinc-100">All Courses</h1>
          <span className="text-xs text-zinc-600 ml-auto">{COURSES.length} courses</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <DomainGrid domains={COURSES} />
      </div>
    </div>
  );
}
