import DomainCard from "./DomainCard";
import type { Course } from "@/lib/courses";

interface DomainGridProps {
  domains: Course[];
}

export default function DomainGrid({ domains }: DomainGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {domains.map((domain) => (
        <DomainCard key={domain.id} domain={domain} />
      ))}
    </div>
  );
}
