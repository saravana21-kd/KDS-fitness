import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore } from "./router-RUUm01Jy.mjs";
import { P as PageContainer, S as SectionHeader } from "./ui-kit-D832lOcM.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { F as Flame, m as Swords, n as Star, o as Crown, l as Lock, T as Trophy, Z as Zap, p as Skull } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zustand.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const RANKS = [{
  min: 1,
  rank: "E",
  title: "E-Rank Hunter",
  color: "oklch(0.55 0.04 250)"
}, {
  min: 5,
  rank: "D",
  title: "D-Rank Hunter",
  color: "oklch(0.65 0.10 200)"
}, {
  min: 10,
  rank: "C",
  title: "C-Rank Hunter",
  color: "oklch(0.68 0.14 160)"
}, {
  min: 15,
  rank: "B",
  title: "B-Rank Hunter",
  color: "oklch(0.72 0.16 90)"
}, {
  min: 20,
  rank: "A",
  title: "A-Rank Hunter",
  color: "oklch(0.70 0.20 40)"
}, {
  min: 30,
  rank: "S",
  title: "S-Rank Hunter",
  color: "oklch(0.72 0.22 320)"
}, {
  min: 50,
  rank: "★",
  title: "Shadow Monarch",
  color: "oklch(0.78 0.22 290)"
}];
function rankFor(level) {
  return [...RANKS].reverse().find((r) => level >= r.min) ?? RANKS[0];
}
function GamificationPage() {
  const {
    xp,
    level,
    achievements,
    habits,
    workouts,
    photos
  } = useAppStore();
  const xpInLevel = xp % 500;
  const progress = xpInLevel / 500 * 100;
  const unlocked = achievements.filter((a) => a.unlocked).length;
  const maxStreak = habits.reduce((m, h) => Math.max(m, h.streak), 0);
  const rank = rankFor(level);
  const nextRank = RANKS.find((r) => r.min > level);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "The System", subtitle: "Arise — your hunter status awaits" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-1 pointer-events-none", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute size-6 border-brand ${i === 0 ? "top-0 left-0 border-t-2 border-l-2" : i === 1 ? "top-0 right-0 border-t-2 border-r-2" : i === 2 ? "bottom-0 left-0 border-b-2 border-l-2" : "bottom-0 right-0 border-b-2 border-r-2"}` }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/5 via-background to-purple-500/5 backdrop-blur-md p-6 md:p-8 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.04] pointer-events-none", style: {
          backgroundImage: "linear-gradient(var(--brand) 1px,transparent 1px),linear-gradient(90deg,var(--brand) 1px,transparent 1px)",
          backgroundSize: "32px 32px"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, className: "relative grid grid-cols-1 md:grid-cols-3 gap-6 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center md:items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono uppercase tracking-[0.3em] text-brand mb-2", children: "[ Status Window ]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
                rotate: 360
              }, transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }, className: "absolute inset-0 rounded-full border-2 border-dashed", style: {
                borderColor: rank.color
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-32 rounded-full flex items-center justify-center font-display text-6xl shadow-2xl", style: {
                background: `radial-gradient(circle, ${rank.color}40, transparent 70%)`,
                color: rank.color,
                textShadow: `0 0 24px ${rank.color}`
              }, children: rank.rank })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-xl uppercase tracking-wider", style: {
              color: rank.color
            }, children: rank.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Power Level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  xp.toLocaleString(),
                  " XP"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-7xl text-brand", style: {
                  textShadow: "0 0 30px var(--brand)"
                }, children: level }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Lv" }),
                nextRank && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs font-mono text-muted-foreground", children: [
                  "Next: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: nextRank.rank }),
                  " @ Lv ",
                  nextRank.min
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 h-2 bg-secondary rounded-full overflow-hidden relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "h-full bg-gradient-to-r from-brand via-blue-500 to-purple-500", initial: {
                  width: 0
                }, animate: {
                  width: `${progress}%`
                }, transition: {
                  duration: 1.2
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 animate-pulse bg-brand/20 mix-blend-overlay pointer-events-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-mono text-muted-foreground mt-1", children: [
                xpInLevel,
                " / 500 XP to next level"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SystemStat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "size-4" }), label: "Top Streak", value: `${maxStreak}d` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SystemStat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "size-4" }), label: "Battles", value: workouts.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SystemStat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-4" }), label: "Quests", value: `${unlocked}/${achievements.length}` })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Quest Log", subtitle: "System-assigned objectives" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8", children: achievements.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.05
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative rounded-xl border p-5 backdrop-blur-md overflow-hidden ${a.unlocked ? "border-brand/50 bg-gradient-to-br from-brand/10 to-purple-500/5" : "border-border bg-card/40 opacity-70"}`, children: [
      a.unlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 left-1 size-3 border-t border-l border-brand" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1 right-1 size-3 border-t border-r border-brand" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1 left-1 size-3 border-b border-l border-brand" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1 right-1 size-3 border-b border-r border-brand" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `size-12 rounded-lg flex items-center justify-center shrink-0 ${a.unlocked ? "bg-brand/15 border border-brand/40 text-brand shadow-[0_0_20px_var(--brand)]" : "bg-secondary border border-border text-muted-foreground"}`, children: a.unlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "size-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-brand", children: "[Quest]" }),
            a.unlocked && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase text-success", children: "CLEARED" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg tracking-wide uppercase truncate", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: a.description }),
          a.unlocked && a.date && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-brand mt-2", children: [
            "CLEARED · ",
            a.date
          ] })
        ] })
      ] })
    ] }) }, a.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "System Rewards", subtitle: "How to gain experience" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3", children: [["Complete a workout", "+50 EXP", /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "size-4" }, "s")], ["Log a meal", "+10 EXP", /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "size-4" }, "t")], ["Upload a progress photo", "+20 EXP", /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-4" }, "st")], ["Complete a habit", "+5 EXP", /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "size-4" }, "f")], ["Log body metric", "+15 EXP", /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4" }, "z")], ["7-day streak", "Quest", /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "size-4" }, "c")], ["10 progress photos", "Quest", /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "size-4" }, "c2")], ["Below 15% body fat", "Quest", /* @__PURE__ */ jsxRuntimeExports.jsx(Skull, { className: "size-4" }, "sk")]].map(([what, reward, icon]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 p-3 rounded-lg border border-border bg-card/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm truncate", children: what })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-brand font-bold shrink-0", children: reward })
    ] }, what)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground font-mono mt-12", children: [
      photos.length,
      " photos · ",
      workouts.length,
      " battles · arise, hunter"
    ] })
  ] });
}
function SystemStat({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-background/60 border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest font-mono", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: value })
  ] });
}
export {
  GamificationPage as component
};
