import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export const MILESTONES = [3, 7, 14, 21, 30, 60, 100, 365] as const;

export function nextMilestone(streak: number) {
  return MILESTONES.find((m) => m > streak) ?? null;
}
export function prevMilestone(streak: number) {
  return [...MILESTONES].reverse().find((m) => m <= streak) ?? 0;
}

export function StreakBadge({ streak, size = "md" }: { streak: number; size?: "sm" | "md" | "lg" }) {
  const onFire = streak >= 7;
  const dim = size === "lg" ? "size-20" : size === "sm" ? "size-10" : "size-14";
  const num = size === "lg" ? "text-4xl" : size === "sm" ? "text-lg" : "text-2xl";
  return (
    <div className="relative inline-flex items-center justify-center">
      {onFire && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ boxShadow: [
            "0 0 12px oklch(0.72 0.22 40)",
            "0 0 32px oklch(0.72 0.22 40)",
            "0 0 12px oklch(0.72 0.22 40)",
          ] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      )}
      <div
        className={`${dim} rounded-full flex flex-col items-center justify-center font-display ${
          onFire
            ? "bg-gradient-to-br from-orange-500 to-red-600 text-white"
            : streak > 0
              ? "bg-brand/15 border border-brand/40 text-brand"
              : "bg-secondary border border-border text-muted-foreground"
        }`}
      >
        <Flame className={size === "sm" ? "size-3" : "size-4"} />
        <span className={`${num} leading-none mt-0.5`}>{streak}</span>
      </div>
    </div>
  );
}

export function MilestoneRail({ streak }: { streak: number }) {
  const next = nextMilestone(streak);
  const prev = prevMilestone(streak);
  const target = next ?? MILESTONES[MILESTONES.length - 1];
  const pct = next ? Math.min(100, ((streak - prev) / (next - prev)) * 100) : 100;
  return (
    <div>
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
        <span>{prev}d</span>
        <span>{next ? `Next: ${next}d` : "Max milestone reached 🏆"}</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 to-red-600"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1 }}
        />
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {MILESTONES.map((m) => {
          const reached = streak >= m;
          return (
            <span
              key={m}
              title={`${m}-day milestone`}
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase border ${
                reached
                  ? "bg-orange-500/15 text-orange-400 border-orange-500/40"
                  : "bg-secondary text-muted-foreground border-border"
              }`}
            >
              {reached && "🔥 "}{m}d
            </span>
          );
        })}
      </div>
    </div>
  );
}
