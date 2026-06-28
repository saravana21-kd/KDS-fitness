import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { F as Flame } from "../_libs/lucide-react.mjs";
const MILESTONES = [3, 7, 14, 21, 30, 60, 100, 365];
function nextMilestone(streak) {
  return MILESTONES.find((m) => m > streak) ?? null;
}
function prevMilestone(streak) {
  return [...MILESTONES].reverse().find((m) => m <= streak) ?? 0;
}
function StreakBadge({ streak, size = "md" }) {
  const onFire = streak >= 7;
  const dim = size === "lg" ? "size-20" : size === "sm" ? "size-10" : "size-14";
  const num = size === "lg" ? "text-4xl" : size === "sm" ? "text-lg" : "text-2xl";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-flex items-center justify-center", children: [
    onFire && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "absolute inset-0 rounded-full",
        animate: { boxShadow: [
          "0 0 12px oklch(0.72 0.22 40)",
          "0 0 32px oklch(0.72 0.22 40)",
          "0 0 12px oklch(0.72 0.22 40)"
        ] },
        transition: { duration: 1.6, repeat: Infinity }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `${dim} rounded-full flex flex-col items-center justify-center font-display ${onFire ? "bg-gradient-to-br from-orange-500 to-red-600 text-white" : streak > 0 ? "bg-brand/15 border border-brand/40 text-brand" : "bg-secondary border border-border text-muted-foreground"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: size === "sm" ? "size-3" : "size-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${num} leading-none mt-0.5`, children: streak })
        ]
      }
    )
  ] });
}
function MilestoneRail({ streak }) {
  const next = nextMilestone(streak);
  const prev = prevMilestone(streak);
  const pct = next ? Math.min(100, (streak - prev) / (next - prev) * 100) : 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        prev,
        "d"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: next ? `Next: ${next}d` : "Max milestone reached 🏆" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-secondary rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "h-full bg-gradient-to-r from-orange-500 to-red-600",
        initial: { width: 0 },
        animate: { width: `${pct}%` },
        transition: { duration: 1 }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-3", children: MILESTONES.map((m) => {
      const reached = streak >= m;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          title: `${m}-day milestone`,
          className: `px-2 py-0.5 rounded-full text-[10px] font-mono uppercase border ${reached ? "bg-orange-500/15 text-orange-400 border-orange-500/40" : "bg-secondary text-muted-foreground border-border"}`,
          children: [
            reached && "🔥 ",
            m,
            "d"
          ]
        },
        m
      );
    }) })
  ] });
}
export {
  MilestoneRail as M,
  StreakBadge as S
};
