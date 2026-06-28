import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore, t as todaysDate } from "./router-RUUm01Jy.mjs";
import { P as PageContainer, S as SectionHeader, G as GlassCard } from "./ui-kit-D832lOcM.mjs";
import { I as Input, B as Button } from "./input-DpSAyFTa.mjs";
import { L as Label } from "./label-D7ashUhA.mjs";
import { S as StreakBadge, M as MilestoneRail } from "./StreakKit-MDc0UeLi.mjs";
import "../_libs/sonner.mjs";
import { f as Check, g as CalendarDays, h as Droplet, P as Plus, i as Minus, M as Moon } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, L as LineChart, b as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, c as Line } from "../_libs/recharts.mjs";
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
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const WATER_GOAL = 4;
const SLEEP_GOAL = 7;
function SleepWaterPage() {
  const {
    daily,
    upsertDaily
  } = useAppStore();
  const today = todaysDate();
  const [viewDate, setViewDate] = reactExports.useState(today);
  const log = daily.find((d) => d.date === viewDate) || {
    sleepHours: 0,
    waterLiters: 0
  };
  const {
    waterStreak,
    sleepStreak,
    completedToday,
    totalGoals
  } = reactExports.useMemo(() => {
    const lookup = new Map(daily.map((d) => [d.date, d]));
    let ws = 0, ss = 0;
    for (let i = 0; i < 365; i++) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const entry = lookup.get(iso);
      if (entry && entry.waterLiters >= WATER_GOAL) ws++;
      else break;
    }
    for (let i = 0; i < 365; i++) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const entry = lookup.get(iso);
      if (entry && entry.sleepHours >= SLEEP_GOAL) ss++;
      else break;
    }
    const todayLog = lookup.get(today);
    let done = 0;
    if (todayLog) {
      if (todayLog.waterLiters >= WATER_GOAL) done++;
      if (todayLog.sleepHours >= SLEEP_GOAL) done++;
    }
    return {
      waterStreak: ws,
      sleepStreak: ss,
      completedToday: done,
      totalGoals: 2
    };
  }, [daily, today]);
  const maxStreak = Math.max(waterStreak, sleepStreak);
  const last14 = reactExports.useMemo(() => {
    const arr = [];
    for (let i = 13; i >= 0; i--) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const l = daily.find((x) => x.date === iso);
      arr.push({
        day: d.toLocaleDateString("en", {
          day: "numeric",
          month: "short"
        }),
        water: l?.waterLiters || 0,
        sleep: l?.sleepHours || 0
      });
    }
    return arr;
  }, [daily]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Sleep & Water", subtitle: "Recovery foundations", action: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-4 py-2 rounded-full border font-mono text-xs uppercase tracking-widest flex items-center gap-2 ${completedToday === totalGoals ? "bg-success/15 text-success border-success/40" : completedToday > 0 ? "bg-brand/15 text-brand border-brand/30" : "bg-secondary text-muted-foreground border-border"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3" }),
      " Today ",
      completedToday,
      "/",
      totalGoals
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
            maxStreak >= 7 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-orange-400 font-mono mt-1", children: "🔥 ON FIRE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground mt-1", children: [
              "Water ",
              waterStreak,
              "d · Sleep ",
              sleepStreak,
              "d"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MilestoneRail, { streak: maxStreak }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3" }),
          " Viewing day"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: viewDate, max: today, onChange: (e) => setViewDate(e.target.value), className: "mt-1 w-44" })
      ] }),
      viewDate !== today && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => setViewDate(today), children: "Jump to today" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-brand/15 border border-brand/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { className: "size-5 text-brand" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl", children: "Water" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
              "Goal ",
              WATER_GOAL.toFixed(1),
              "L · streak ",
              waterStreak,
              "d"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center my-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-7xl text-brand", children: [
          log.waterLiters.toFixed(2),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl text-muted-foreground", children: "L" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-secondary rounded-full overflow-hidden mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-brand to-blue-500 transition-all", style: {
          width: `${Math.min(100, log.waterLiters / WATER_GOAL * 100)}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-2 flex-wrap", children: [
          [0.25, 0.5, 1].map((amt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => upsertDaily(viewDate, {
            waterLiters: log.waterLiters + amt
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3 mr-1" }),
            " ",
            amt,
            "L"
          ] }, amt)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => upsertDaily(viewDate, {
            waterLiters: Math.max(0, log.waterLiters - 0.25)
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3 mr-1" }),
            " 0.25L"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-brand/15 border border-brand/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-5 text-brand" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl", children: "Sleep" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
              "Target 7.5 - 8.5h · streak ",
              sleepStreak,
              "d"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center my-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-7xl text-brand", children: [
            log.sleepHours.toFixed(1),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl text-muted-foreground", children: "h" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: log.sleepHours >= 7 ? "Optimal recovery" : log.sleepHours >= 6 ? "Decent — push for more" : "Sleep more, warrior" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Hours slept" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.25", value: log.sleepHours, onChange: (e) => upsertDaily(viewDate, {
          sleepHours: parseFloat(e.target.value) || 0
        }), className: "mt-1" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "14-Day Trend", subtitle: "Recovery consistency" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: last14, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", tick: {
        fontSize: 10,
        fill: "var(--muted-foreground)"
      }, axisLine: false, tickLine: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { yAxisId: "left", tick: {
        fontSize: 10,
        fill: "var(--muted-foreground)"
      }, axisLine: false, tickLine: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { yAxisId: "right", orientation: "right", tick: {
        fontSize: 10,
        fill: "var(--muted-foreground)"
      }, axisLine: false, tickLine: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        fontSize: 12
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { yAxisId: "left", type: "monotone", dataKey: "water", stroke: "var(--brand)", strokeWidth: 2.5, dot: {
        r: 3
      }, name: "Water (L)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { yAxisId: "right", type: "monotone", dataKey: "sleep", stroke: "oklch(0.68 0.18 260)", strokeWidth: 2.5, dot: {
        r: 3
      }, name: "Sleep (h)" })
    ] }) }) }) })
  ] });
}
export {
  SleepWaterPage as component
};
