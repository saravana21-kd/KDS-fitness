import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore, t as todaysDate } from "./router-RUUm01Jy.mjs";
import { P as PageContainer, S as SectionHeader, G as GlassCard } from "./ui-kit-D832lOcM.mjs";
import { I as Input, B as Button } from "./input-DpSAyFTa.mjs";
import { L as Label } from "./label-D7ashUhA.mjs";
import "../_libs/sonner.mjs";
import { P as Plus, d as Trash2 } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, P as PieChart, a as Pie, C as Cell, T as Tooltip, d as Legend, L as LineChart, b as CartesianGrid, X as XAxis, Y as YAxis, c as Line } from "../_libs/recharts.mjs";
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
function MetricsPage() {
  const {
    metrics,
    addMetric,
    deleteMetric,
    profile
  } = useAppStore();
  const [draft, setDraft] = reactExports.useState({
    date: todaysDate(),
    weight: profile.weight,
    bodyFatPct: profile.bodyFatPct,
    waist: 80,
    shoulder: 110
  });
  const sorted = reactExports.useMemo(() => [...metrics].sort((a, b) => a.date.localeCompare(b.date)), [metrics]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Body Metrics", subtitle: "Weight · BF% · Measurements" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: draft.date, onChange: (e) => setDraft({
            ...draft,
            date: e.target.value
          }), className: "mt-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Weight (kg)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.1", value: draft.weight, onChange: (e) => setDraft({
            ...draft,
            weight: parseFloat(e.target.value) || 0
          }), className: "mt-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Body Fat %" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.1", value: draft.bodyFatPct, onChange: (e) => setDraft({
            ...draft,
            bodyFatPct: parseFloat(e.target.value) || 0
          }), className: "mt-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Waist (cm)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.5", value: draft.waist, onChange: (e) => setDraft({
            ...draft,
            waist: parseFloat(e.target.value) || 0
          }), className: "mt-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Shoulder (cm)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.5", value: draft.shoulder, onChange: (e) => setDraft({
            ...draft,
            shoulder: parseFloat(e.target.value) || 0
          }), className: "mt-1" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-4 bg-brand text-brand-foreground", onClick: () => addMetric(draft), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
        " Log Measurement"
      ] })
    ] }),
    sorted.length >= 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-4", children: "Body Composition" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CompositionPie, { weight: sorted[sorted.length - 1].weight, bfPct: sorted[sorted.length - 1].bodyFatPct })
    ] }),
    sorted.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg mb-4", children: "Progress Charts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartBlock, { title: "Weight (kg)", data: sorted, dataKey: "weight" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartBlock, { title: "Body Fat %", data: sorted, dataKey: "bodyFatPct" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartBlock, { title: "Waist (cm)", data: sorted, dataKey: "waist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartBlock, { title: "Shoulder (cm)", data: sorted, dataKey: "shoulder" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "History", subtitle: `${sorted.length} entries` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [...sorted].reverse().map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "flex flex-wrap items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground w-24", children: m.date }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
        m.weight,
        "kg"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-brand", children: [
        m.bodyFatPct,
        "% BF"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
        "W ",
        m.waist,
        "cm"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
        "SH ",
        m.shoulder,
        "cm"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "ml-auto text-destructive", onClick: () => deleteMetric(m.date), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
    ] }, m.date)) })
  ] });
}
function ChartBlock({
  title,
  data,
  dataKey
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tick: {
        fontSize: 10,
        fill: "var(--muted-foreground)"
      }, axisLine: false, tickLine: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
        fontSize: 10,
        fill: "var(--muted-foreground)"
      }, axisLine: false, tickLine: false, domain: ["auto", "auto"] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        fontSize: 12
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey, stroke: "var(--brand)", strokeWidth: 2.5, dot: {
        r: 3
      } })
    ] }) }) })
  ] });
}
function CompositionPie({
  weight,
  bfPct
}) {
  const fatMass = +(weight * (bfPct / 100)).toFixed(1);
  const leanMass = +(weight - fatMass).toFixed(1);
  const data = [{
    name: "Lean Mass",
    value: leanMass,
    fill: "var(--brand)"
  }, {
    name: "Fat Mass",
    value: fatMass,
    fill: "oklch(0.65 0.18 30)"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data, innerRadius: 60, outerRadius: 100, paddingAngle: 3, dataKey: "value", startAngle: 90, endAngle: -270, children: data.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: d.fill }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        fontSize: 12
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
        fontSize: 12
      } })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-background/40 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: "Total Weight" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-3xl", children: [
          weight,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base text-muted-foreground", children: "kg" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-brand/10 border border-brand/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono uppercase tracking-widest text-brand", children: "Lean Mass" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl", children: [
            leanMass,
            " kg"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            (100 - bfPct).toFixed(1),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-border bg-background/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: "Fat Mass" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl", children: [
            fatMass,
            " kg"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            bfPct,
            "%"
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  MetricsPage as component
};
