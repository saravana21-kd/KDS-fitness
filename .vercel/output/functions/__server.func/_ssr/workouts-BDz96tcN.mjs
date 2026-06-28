import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAppStore, t as todaysDate } from "./router-RUUm01Jy.mjs";
import { P as PageContainer, S as SectionHeader, G as GlassCard } from "./ui-kit-D832lOcM.mjs";
import { B as Button, I as Input } from "./input-DpSAyFTa.mjs";
import { L as Label } from "./label-D7ashUhA.mjs";
import { T as Textarea } from "./textarea-Bb0WFAgX.mjs";
import "../_libs/sonner.mjs";
import { P as Plus, D as Dumbbell, d as Trash2, e as ChevronDown } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
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
function WorkoutsPage() {
  const {
    workouts,
    addWorkout,
    deleteWorkout
  } = useAppStore();
  const [creating, setCreating] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "Workout Tracker", subtitle: "Daily logs · progressive overload", action: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setCreating(true), className: "bg-brand text-brand-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
      " Log Workout"
    ] }) }),
    creating && /* @__PURE__ */ jsxRuntimeExports.jsx(NewWorkoutForm, { onCancel: () => setCreating(false), onSave: (w) => {
      addWorkout(w);
      setCreating(false);
    } }),
    workouts.length === 0 && !creating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "size-12 text-muted-foreground mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No workouts logged yet. Log your first session to start earning XP." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mt-6", children: workouts.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(WorkoutCard, { w, onDelete: () => deleteWorkout(w.id) }, w.id)) })
  ] });
}
function WorkoutCard({
  w,
  onDelete
}) {
  const [open, setOpen] = reactExports.useState(false);
  const totalVolume = w.exercises.reduce((acc, e) => acc + e.sets.reduce((a, s) => a + s.reps * s.weight, 0), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-0 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen((o) => !o), className: "w-full p-5 md:p-6 flex flex-wrap items-start justify-between gap-3 text-left hover:bg-secondary/30 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl tracking-wide", children: w.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground uppercase tracking-widest", children: [
          w.date,
          " · ",
          w.exercises.length,
          " exercises · ",
          totalVolume.toLocaleString(),
          " kg volume"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase text-muted-foreground hidden sm:inline", children: open ? "Collapse" : "Expand" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `size-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive ml-1", onClick: (e) => {
          e.stopPropagation();
          onDelete();
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
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
    }, className: "overflow-hidden border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 md:p-6 space-y-2", children: [
      w.exercises.map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-secondary/40 border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: ex.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
            ex.sets.length,
            " sets"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: ex.sets.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono px-2 py-0.5 rounded bg-background border border-border", children: [
          s.reps,
          "×",
          s.weight,
          "kg"
        ] }, i)) })
      ] }, ex.id)),
      w.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground italic mt-3 border-t border-border pt-3", children: [
        '"',
        w.notes,
        '"'
      ] })
    ] }) }) })
  ] });
}
function NewWorkoutForm({
  onCancel,
  onSave
}) {
  const [title, setTitle] = reactExports.useState("Push Day");
  const [date, setDate] = reactExports.useState(todaysDate());
  const [notes, setNotes] = reactExports.useState("");
  const [exercises, setExercises] = reactExports.useState([{
    id: `e${Date.now()}`,
    name: "Bench Press",
    sets: [{
      reps: 8,
      weight: 60
    }]
  }]);
  function addExercise() {
    setExercises([...exercises, {
      id: `e${Date.now()}`,
      name: "",
      sets: [{
        reps: 8,
        weight: 0
      }]
    }]);
  }
  function updateExercise(id, patch) {
    setExercises(exercises.map((e) => e.id === id ? {
      ...e,
      ...patch
    } : e));
  }
  function deleteExercise(id) {
    setExercises(exercises.filter((e) => e.id !== id));
  }
  function addSet(id) {
    const ex = exercises.find((e) => e.id === id);
    if (!ex) return;
    const last = ex.sets[ex.sets.length - 1] || {
      reps: 8,
      weight: 0
    };
    updateExercise(id, {
      sets: [...ex.sets, {
        ...last
      }]
    });
  }
  function updateSet(exId, idx, patch) {
    const ex = exercises.find((e) => e.id === exId);
    if (!ex) return;
    updateExercise(exId, {
      sets: ex.sets.map((s, i) => i === idx ? {
        ...s,
        ...patch
      } : s)
    });
  }
  function deleteSet(exId, idx) {
    const ex = exercises.find((e) => e.id === exId);
    if (!ex) return;
    updateExercise(exId, {
      sets: ex.sets.filter((_, i) => i !== idx)
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl mb-4", children: "New Workout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), className: "mt-1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: "mt-1" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-4", children: [
      exercises.map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg border border-border bg-secondary/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Exercise name", value: ex.name, onChange: (e) => updateExercise(ex.id, {
            name: e.target.value
          }), className: "flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "text-destructive", onClick: () => deleteExercise(ex.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          ex.sets.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground w-10", children: [
              "SET ",
              i + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: s.reps, onChange: (e) => updateSet(ex.id, i, {
              reps: parseInt(e.target.value) || 0
            }), className: "w-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "reps ×" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: s.weight, onChange: (e) => updateSet(ex.id, i, {
              weight: parseFloat(e.target.value) || 0
            }), className: "w-24" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "kg" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "ml-auto text-destructive", onClick: () => deleteSet(ex.id, i), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3" }) })
          ] }, i)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: () => addSet(ex.id), className: "mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3 mr-1" }),
            " Add Set"
          ] })
        ] })
      ] }, ex.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: addExercise, className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
        " Add Exercise"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), rows: 2, className: "mt-1" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "flex-1 bg-brand text-brand-foreground", onClick: () => onSave({
        title,
        date,
        exercises,
        notes
      }), children: "Save Workout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onCancel, children: "Cancel" })
    ] })
  ] });
}
export {
  WorkoutsPage as component
};
