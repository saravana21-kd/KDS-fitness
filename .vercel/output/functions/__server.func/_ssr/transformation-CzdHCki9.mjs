import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useAppStore, c as cn } from "./router-RUUm01Jy.mjs";
import { P as PageContainer, S as SectionHeader, G as GlassCard } from "./ui-kit-D832lOcM.mjs";
import { B as Button, I as Input } from "./input-DpSAyFTa.mjs";
import { T as Textarea } from "./textarea-Bb0WFAgX.mjs";
import { L as Label } from "./label-D7ashUhA.mjs";
import { S as Slider$1, a as SliderTrack, b as SliderRange, c as SliderThumb } from "../_libs/radix-ui__react-slider.mjs";
import "../_libs/sonner.mjs";
import { P as Plus, e as ChevronDown, f as Check, d as Trash2 } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { R as ResponsiveContainer, P as PieChart, a as Pie, C as Cell, T as Tooltip } from "../_libs/recharts.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-collection.mjs";
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
const Slider = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Slider$1,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SliderTrack, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SliderRange, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = Slider$1.displayName;
const STATUS_LABEL = {
  completed: "COMPLETED",
  "in-progress": "IN PROGRESS",
  locked: "LOCKED"
};
function TransformationPage() {
  const {
    roadmap,
    addPhase,
    updatePhase,
    deletePhase
  } = useAppStore();
  const overall = roadmap.length ? Math.round(roadmap.reduce((a, p) => a + p.progress, 0) / roadmap.length) : 0;
  const completed = roadmap.filter((p) => p.status === "completed").length;
  const inProgress = roadmap.filter((p) => p.status === "in-progress").length;
  const locked = roadmap.filter((p) => p.status === "locked").length;
  const pieData = [{
    name: "Completed",
    value: completed,
    fill: "oklch(0.72 0.18 145)"
  }, {
    name: "In Progress",
    value: inProgress,
    fill: "var(--brand)"
  }, {
    name: "Locked",
    value: locked,
    fill: "var(--secondary)"
  }];
  const phaseData = roadmap.map((p) => ({
    name: p.title,
    value: p.progress
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Physique Roadmap", subtitle: "Editable mission timeline", action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: addPhase, className: "bg-brand text-brand-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
      " Add Phase"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "mb-8 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -right-32 size-64 bg-brand/10 rounded-full blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-brand font-mono mb-2", children: "Overall Completion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-7xl", children: [
            overall,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
            completed,
            " completed · ",
            inProgress,
            " in progress · ",
            locked,
            " locked"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-secondary rounded-full mt-4 overflow-hidden max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "h-full bg-gradient-to-r from-brand to-blue-500", initial: {
            width: 0
          }, animate: {
            width: `${overall}%`
          }, transition: {
            duration: 1.2
          } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: pieData, innerRadius: 55, outerRadius: 90, paddingAngle: 3, dataKey: "value", startAngle: 90, endAngle: -270, children: pieData.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: d.fill }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12
          } })
        ] }) }) })
      ] }),
      phaseData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-3 relative", children: phaseData.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground font-mono truncate", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl text-brand", children: [
          p.value,
          "%"
        ] })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: roadmap.map((phase, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PhaseCard, { phase, index: i, onUpdate: updatePhase, onDelete: deletePhase }, phase.id)) })
  ] });
}
function PhaseCard({
  phase,
  index,
  onUpdate,
  onDelete
}) {
  const statusColor = phase.status === "completed" ? "text-success border-success/30 bg-success/10" : phase.status === "in-progress" ? "text-brand border-brand/30 bg-brand/10" : "text-muted-foreground border-border bg-secondary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    delay: index * 0.05
  }, className: `rounded-2xl border ${phase.status === "in-progress" ? "border-brand/30" : "border-border"} bg-card/50 backdrop-blur-md overflow-hidden`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onUpdate(phase.id, {
      expanded: !phase.expanded
    }), className: "w-full p-5 md:p-6 flex items-center justify-between gap-4 text-left hover:bg-secondary/30 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl text-brand shrink-0", children: String(index + 1).padStart(2, "0") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg md:text-xl tracking-wide uppercase truncate", children: phase.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm text-muted-foreground truncate", children: phase.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 text-[10px] font-mono font-bold rounded border ${statusColor} hidden sm:inline`, children: STATUS_LABEL[phase.status] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `size-5 text-muted-foreground transition-transform ${phase.expanded ? "rotate-180" : ""}` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: phase.expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      height: 0,
      opacity: 0
    }, animate: {
      height: "auto",
      opacity: 1
    }, exit: {
      height: 0,
      opacity: 0
    }, transition: {
      duration: 0.25
    }, className: "overflow-hidden border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 md:p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: phase.title, onChange: (e) => onUpdate(phase.id, {
          title: e.target.value
        }), className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: phase.description, onChange: (e) => onUpdate(phase.id, {
          description: e.target.value
        }), className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: phase.notes, onChange: (e) => onUpdate(phase.id, {
          notes: e.target.value
        }), className: "mt-1", rows: 3 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-brand", children: [
            phase.progress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { value: [phase.progress], onValueChange: (v) => onUpdate(phase.id, {
          progress: v[0]
        }), max: 100, step: 5 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground mr-2", children: "Status" }),
        ["locked", "in-progress", "completed"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onUpdate(phase.id, {
          status: s,
          progress: s === "completed" ? 100 : phase.progress
        }), className: `px-3 py-1 rounded-full text-xs font-mono uppercase transition-colors ${phase.status === s ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`, children: [
          s === "in-progress" && phase.status === s && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "inline size-3 mr-1" }),
          STATUS_LABEL[s]
        ] }, s)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "ml-auto text-destructive hover:text-destructive", onClick: () => onDelete(phase.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
      ] })
    ] }) }) })
  ] });
}
export {
  TransformationPage as component
};
