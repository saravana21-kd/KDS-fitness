import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAppStore, t as todaysDate, c as cn } from "./router-RUUm01Jy.mjs";
import { P as PageContainer, S as SectionHeader, G as GlassCard } from "./ui-kit-D832lOcM.mjs";
import { B as Button, I as Input, b as buttonVariants } from "./input-DpSAyFTa.mjs";
import { L as Label } from "./label-D7ashUhA.mjs";
import { R as Root2, T as Trigger2, P as Portal2, C as Content2, a as Title2, D as Description2, b as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { q as Sparkles, r as ArrowRight, s as RotateCcw, X, t as Pencil, f as Check } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, A as AreaChart, X as XAxis, Y as YAxis, T as Tooltip, e as Area, f as RadialBarChart, g as RadialBar } from "../_libs/recharts.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
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
const heroImg = "/assets/hero-physique-dTFEkoxE.jpg";
const AlertDialog = Root2;
const AlertDialogTrigger = Trigger2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
function DashboardPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SystemOverview, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DailySnapshot, {})
    ] })
  ] });
}
function ResetButton() {
  const resetAll = useAppStore((s) => s.resetAll);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "ghost", className: "text-destructive hover:text-destructive hover:bg-destructive/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-1 size-4" }),
      " Reset Progress"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Reset all progress?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This wipes workouts, nutrition, photos, daily logs, metrics, habits, XP, and achievements. Your profile, dream goal, and theme are kept. This cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => {
          resetAll();
          toast.success("Progress wiped. Fresh start, warrior.");
        }, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Yes, reset everything" })
      ] })
    ] })
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative px-4 md:px-8 lg:px-12 pt-12 pb-20 overflow-hidden max-w-7xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }, className: "lg:col-span-7 xl:col-span-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3 text-brand" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-brand font-bold", children: "KDS Protocol Active" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.85] tracking-tight uppercase text-balance", children: [
        "Build Your ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-brand", children: "Dream Physique" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-base md:text-xl text-muted-foreground max-w-xl text-pretty leading-relaxed font-light", children: "Transform your body, discipline, confidence, and lifestyle through a systematic roadmap of power and aesthetics." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-brand text-brand-foreground hover:bg-brand/90 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/transformation", children: [
          "Start Your Journey ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 size-4" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workouts", children: "Today's Workout" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResetButton, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.7,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1]
    }, className: "lg:col-span-5 xl:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[4/5] rounded-2xl border border-border relative group overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImg, alt: "Cinematic gym aesthetic", width: 1024, height: 1280, className: "size-full object-cover transition-all duration-700 group-hover:scale-105" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-6 right-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] text-brand uppercase mb-1 tracking-widest", children: "Active Mission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl md:text-3xl tracking-wide", children: "Hypertrophy Phase" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 size-2 rounded-full bg-success animate-pulse" })
    ] }) })
  ] }) });
}
function SystemOverview() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "System Overview", subtitle: "Your current state and target" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CurrentMetricsCard, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DreamPhysiqueCard, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(XPCard, {})
    ] })
  ] });
}
function CurrentMetricsCard() {
  const profile = useAppStore((s) => s.profile);
  const update = useAppStore((s) => s.updateProfile);
  const [editing, setEditing] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState(profile);
  function save() {
    update(draft);
    setEditing(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl tracking-wider text-brand", children: "Current Metrics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground font-mono mt-1", children: "My Details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setDraft(profile);
        setEditing((e) => !e);
      }, className: "font-mono text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded hover:text-brand hover:border-brand transition-colors flex items-center gap-1", children: [
        editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3" }),
        editing ? "CANCEL" : "EDIT"
      ] })
    ] }),
    !editing ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [["Height", `${profile.height} cm`], ["Weight", `${profile.weight} kg`], ["Body Fat %", `${profile.bodyFatPct}%`, true], ["Fat Mass", `${profile.fatMass} kg`], ["Category", profile.category, false, true]].map(([label, val, accent, warn]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-border last:border-b-0 pb-3 last:pb-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono text-sm ${accent ? "text-brand" : warn ? "text-warning uppercase" : ""}`, children: val })
    ] }, label)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      ["height", "weight", "bodyFatPct", "fatMass"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.1", value: draft[k], onChange: (e) => setDraft({
          ...draft,
          [k]: parseFloat(e.target.value) || 0
        }), className: "mt-1" })
      ] }, k)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.category, onChange: (e) => setDraft({
          ...draft,
          category: e.target.value
        }), className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, className: "w-full bg-brand text-brand-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4 mr-1" }),
        " Save"
      ] })
    ] })
  ] });
}
function DreamPhysiqueCard() {
  const dream = useAppStore((s) => s.dream);
  const update = useAppStore((s) => s.updateDream);
  const profile = useAppStore((s) => s.profile);
  const [editing, setEditing] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState(dream);
  const progress = reactExports.useMemo(() => {
    const start = 19.3;
    const goal = dream.goalBodyFatPct;
    const cur = profile.bodyFatPct;
    if (start === goal) return 100;
    return Math.max(0, Math.min(100, Math.round((start - cur) / (start - goal) * 100)));
  }, [profile.bodyFatPct, dream.goalBodyFatPct]);
  function save() {
    update(draft);
    setEditing(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 size-48 bg-brand/10 rounded-full blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-6 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl tracking-wider text-brand", children: "Dream Physique" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground font-mono mt-1", children: "Ultimate Target" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setDraft(dream);
        setEditing((e) => !e);
      }, className: "font-mono text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded hover:text-brand hover:border-brand transition-colors flex items-center gap-1", children: [
        editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3" }),
        editing ? "CANCEL" : "EDIT"
      ] })
    ] }),
    !editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Inspiration: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: dream.inspiration })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-background/40 border border-border rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-tighter", children: "Goal Weight" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-display", children: [
            dream.goalWeight,
            " KG"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-tighter", children: "Goal Body Fat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-display text-brand", children: [
            dream.goalBodyFatPct,
            "%"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress to Goal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
            dream.deadlineYears,
            " yrs · ",
            progress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-secondary rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "h-full bg-gradient-to-r from-brand to-blue-500", initial: {
          width: 0
        }, animate: {
          width: `${progress}%`
        }, transition: {
          duration: 1.2,
          ease: "easeOut"
        } }) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Inspiration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.inspiration, onChange: (e) => setDraft({
          ...draft,
          inspiration: e.target.value
        }), className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Goal Weight (kg)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.1", value: draft.goalWeight, onChange: (e) => setDraft({
            ...draft,
            goalWeight: parseFloat(e.target.value) || 0
          }), className: "mt-1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Goal BF %" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.1", value: draft.goalBodyFatPct, onChange: (e) => setDraft({
            ...draft,
            goalBodyFatPct: parseFloat(e.target.value) || 0
          }), className: "mt-1" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Deadline (years)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.5", value: draft.deadlineYears, onChange: (e) => setDraft({
          ...draft,
          deadlineYears: parseFloat(e.target.value) || 0
        }), className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: save, className: "w-full bg-brand text-brand-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4 mr-1" }),
        " Save"
      ] })
    ] })
  ] });
}
function XPCard() {
  const {
    xp,
    level,
    achievements
  } = useAppStore();
  const xpInLevel = xp % 500;
  const data = [{
    name: "xp",
    value: xpInLevel / 500 * 100,
    fill: "var(--brand)"
  }];
  const unlocked = achievements.filter((a) => a.unlocked).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "md:col-span-2 xl:col-span-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-start mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl tracking-wider text-brand", children: "Power Level" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground font-mono mt-1", children: "XP & Achievements" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "size-32 relative shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RadialBarChart, { innerRadius: "70%", outerRadius: "100%", data, startAngle: 90, endAngle: -270, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RadialBar, { background: {
          fill: "var(--secondary)"
        }, dataKey: "value", cornerRadius: 20 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl", children: level }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground uppercase", children: "Level" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Total XP" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: xp.toLocaleString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Achievements" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl text-brand", children: [
            unlocked,
            "/",
            achievements.length
          ] })
        ] })
      ] })
    ] })
  ] });
}
function DailySnapshot() {
  const daily = useAppStore((s) => s.daily);
  const upsert = useAppStore((s) => s.upsertDaily);
  const today = todaysDate();
  const todayLog = daily.find((d) => d.date === today) || {
    sleepHours: 0,
    waterLiters: 0
  };
  const last7 = reactExports.useMemo(() => {
    const arr = [];
    for (let i = 6; i >= 0; i--) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const log = daily.find((x) => x.date === iso);
      arr.push({
        day: d.toLocaleDateString("en", {
          weekday: "short"
        }),
        water: log?.waterLiters || 0,
        sleep: log?.sleepHours || 0
      });
    }
    return arr;
  }, [daily]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Today's Snapshot", subtitle: "Quick log" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3", children: "Water Intake" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-5xl", children: [
            todayLog.waterLiters.toFixed(1),
            "L"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground mb-2", children: "/ 4.0L" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-secondary rounded-full overflow-hidden mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-brand transition-all", style: {
          width: `${Math.min(100, todayLog.waterLiters / 4 * 100)}%`
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => upsert(today, {
            waterLiters: Math.max(0, todayLog.waterLiters - 0.25)
          }), children: "-0.25L" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-brand text-brand-foreground", onClick: () => upsert(today, {
            waterLiters: todayLog.waterLiters + 0.25
          }), children: "+0.25L" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3", children: "Last Sleep" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-5xl text-brand", children: todayLog.sleepHours.toFixed(1) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground mb-2", children: "hours" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", step: "0.25", min: "0", max: "14", value: todayLog.sleepHours, onChange: (e) => upsert(today, {
          sleepHours: parseFloat(e.target.value) || 0
        }), placeholder: "Hours slept" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: todayLog.sleepHours >= 7 ? "Optimal recovery" : todayLog.sleepHours >= 6 ? "Decent" : "Sleep more, warrior" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3", children: "7-Day Trend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: last7, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--brand)", stopOpacity: 0.6 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--brand)", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "day", tick: {
            fontSize: 10,
            fill: "var(--muted-foreground)"
          }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { hide: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "water", stroke: "var(--brand)", fill: "url(#g)", strokeWidth: 2 })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as component
};
