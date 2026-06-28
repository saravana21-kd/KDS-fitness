import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore, t as todaysDate } from "./router-RUUm01Jy.mjs";
import { P as PageContainer, S as SectionHeader, G as GlassCard } from "./ui-kit-D832lOcM.mjs";
import { I as Input, B as Button } from "./input-DpSAyFTa.mjs";
import { L as Label } from "./label-D7ashUhA.mjs";
import { S as StreakBadge, M as MilestoneRail } from "./StreakKit-MDc0UeLi.mjs";
import "../_libs/sonner.mjs";
import { f as Check, g as CalendarDays, P as Plus, d as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
function HabitsPage() {
  const {
    habits,
    addHabit,
    toggleHabit,
    deleteHabit
  } = useAppStore();
  const [newName, setNewName] = reactExports.useState("");
  const today = todaysDate();
  const [viewDate, setViewDate] = reactExports.useState(today);
  const completedToday = habits.filter((h) => h.lastDone === today).length;
  const total = habits.length;
  const allDone = total > 0 && completedToday === total;
  const maxStreak = reactExports.useMemo(() => habits.reduce((m, h) => Math.max(m, h.streak), 0), [habits]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Habit Tracker", subtitle: "Streaks build the warrior", action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-4 py-2 rounded-full border font-mono text-xs uppercase tracking-widest flex items-center gap-2 ${allDone ? "bg-success/15 text-success border-success/40" : completedToday > 0 ? "bg-brand/15 text-brand border-brand/30" : "bg-secondary text-muted-foreground border-border"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3" }),
      "Today ",
      completedToday,
      "/",
      total
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "mb-6 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -right-32 size-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StreakBadge, { streak: maxStreak, size: "lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground font-mono", children: "Top streak" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl", children: [
              maxStreak,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base text-muted-foreground", children: "days" })
            ] }),
            maxStreak >= 7 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-orange-400 font-mono mt-1", children: "🔥 ON FIRE" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MilestoneRail, { streak: maxStreak }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3" }),
          " Date"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: viewDate, max: today, onChange: (e) => setViewDate(e.target.value), className: "mt-1 w-44" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[220px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "New habit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "e.g. 10k steps, meditate, no doomscroll", value: newName, onChange: (e) => setNewName(e.target.value), onKeyDown: (e) => {
            if (e.key === "Enter" && newName.trim()) {
              addHabit(newName.trim());
              setNewName("");
            }
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-brand text-brand-foreground", onClick: () => {
            if (!newName.trim()) return;
            addHabit(newName.trim());
            setNewName("");
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
            " Add"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: habits.map((h) => {
      const doneToday = h.lastDone === today;
      const onFire = h.streak >= 7;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: `transition-all ${doneToday ? "border-brand/40 glow-accent" : ""} ${onFire ? "ring-1 ring-orange-500/30" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleHabit(h.id), "aria-label": "toggle", className: `size-12 rounded-xl flex items-center justify-center border-2 transition-all shrink-0 ${doneToday ? "bg-brand text-brand-foreground border-brand" : "border-border hover:border-brand"}`, children: doneToday && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-5", strokeWidth: 3 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium truncate", children: h.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MilestoneRail, { streak: h.streak }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StreakBadge, { streak: h.streak, size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive", onClick: () => deleteHabit(h.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
      ] }) }, h.id);
    }) })
  ] });
}
export {
  HabitsPage as component
};
