import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-zinc-700 text-zinc-300 hover:bg-zinc-600",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border-zinc-600 text-zinc-400",
        blue:   "border-transparent bg-blue-900/60 text-blue-300",
        amber:  "border-transparent bg-amber-900/60 text-amber-300",
        orange: "border-transparent bg-amber-900/60 text-amber-300",
        red:    "border-transparent bg-red-900/60 text-red-300",
        green:  "border-transparent bg-green-900/60 text-green-300",
        cyan:   "border-transparent bg-cyan-900/60 text-cyan-300",
        lime:   "border-transparent bg-lime-900/60 text-lime-300",
        emerald:"border-transparent bg-emerald-900/60 text-emerald-300",
        indigo: "border-transparent bg-indigo-900/60 text-indigo-300",
        yellow: "border-transparent bg-yellow-900/60 text-yellow-300",
        sky:    "border-transparent bg-sky-900/60 text-sky-300",
        violet: "border-transparent bg-violet-900/60 text-violet-300",
        rose:   "border-transparent bg-rose-900/60 text-rose-300",
        purple: "border-transparent bg-purple-900/60 text-purple-300",
        teal:   "border-transparent bg-teal-900/60 text-teal-300",
        pink:   "border-transparent bg-pink-900/60 text-pink-300",
        slate:  "border-transparent bg-slate-900/60 text-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
