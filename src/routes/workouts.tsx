import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Dumbbell, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, todaysDate, type WorkoutEntry, type ExerciseLog } from "@/store/useAppStore";
import { GlassCard, PageContainer, SectionHeader } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/workouts")({
  head: () => ({ meta: [{ title: "Workouts — KDS Fitness" }] }),
  component: WorkoutsPage,
});

function WorkoutsPage() {
  const { workouts, addWorkout, deleteWorkout } = useAppStore();
  const [creating, setCreating] = useState(false);

  return (
    <PageContainer>
      <SectionHeader
        title="Workout Tracker"
        subtitle="Daily logs · progressive overload"
        action={
          <Button onClick={() => setCreating(true)} className="bg-brand text-brand-foreground">
            <Plus className="size-4 mr-1" /> Log Workout
          </Button>
        }
      />

      {creating && (
        <NewWorkoutForm onCancel={() => setCreating(false)} onSave={(w) => { addWorkout(w); setCreating(false); }} />
      )}

      {workouts.length === 0 && !creating ? (
        <GlassCard className="text-center py-16">
          <Dumbbell className="size-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No workouts logged yet. Log your first session to start earning XP.</p>
        </GlassCard>
      ) : (
        <div className="space-y-4 mt-6">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} w={w} onDelete={() => deleteWorkout(w.id)} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}

function WorkoutCard({ w, onDelete }: { w: WorkoutEntry; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const totalVolume = w.exercises.reduce(
    (acc, e) => acc + e.sets.reduce((a, s) => a + s.reps * s.weight, 0),
    0
  );
  return (
    <GlassCard className="p-0 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full p-5 md:p-6 flex flex-wrap items-start justify-between gap-3 text-left hover:bg-secondary/30 transition-colors"
      >
        <div className="min-w-0">
          <h3 className="font-display text-2xl tracking-wide">{w.title}</h3>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            {w.date} · {w.exercises.length} exercises · {totalVolume.toLocaleString()} kg volume
          </p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono uppercase text-muted-foreground hidden sm:inline">
            {open ? "Collapse" : "Expand"}
          </span>
          <ChevronDown className={`size-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive ml-1"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="p-5 md:p-6 space-y-2">
              {w.exercises.map((ex) => (
                <div key={ex.id} className="p-3 rounded-lg bg-secondary/40 border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{ex.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">{ex.sets.length} sets</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ex.sets.map((s, i) => (
                      <span key={i} className="text-xs font-mono px-2 py-0.5 rounded bg-background border border-border">
                        {s.reps}×{s.weight}kg
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {w.notes && <p className="text-sm text-muted-foreground italic mt-3 border-t border-border pt-3">"{w.notes}"</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

function NewWorkoutForm({ onCancel, onSave }: { onCancel: () => void; onSave: (w: Omit<WorkoutEntry, "id">) => void }) {
  const [title, setTitle] = useState("Push Day");
  const [date, setDate] = useState(todaysDate());
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState<ExerciseLog[]>([
    { id: `e${Date.now()}`, name: "Bench Press", sets: [{ reps: 8, weight: 60 }] },
  ]);

  function addExercise() {
    setExercises([...exercises, { id: `e${Date.now()}`, name: "", sets: [{ reps: 8, weight: 0 }] }]);
  }
  function updateExercise(id: string, patch: Partial<ExerciseLog>) {
    setExercises(exercises.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }
  function deleteExercise(id: string) {
    setExercises(exercises.filter((e) => e.id !== id));
  }
  function addSet(id: string) {
    const ex = exercises.find((e) => e.id === id);
    if (!ex) return;
    const last = ex.sets[ex.sets.length - 1] || { reps: 8, weight: 0 };
    updateExercise(id, { sets: [...ex.sets, { ...last }] });
  }
  function updateSet(exId: string, idx: number, patch: Partial<{ reps: number; weight: number }>) {
    const ex = exercises.find((e) => e.id === exId);
    if (!ex) return;
    updateExercise(exId, { sets: ex.sets.map((s, i) => (i === idx ? { ...s, ...patch } : s)) });
  }
  function deleteSet(exId: string, idx: number) {
    const ex = exercises.find((e) => e.id === exId);
    if (!ex) return;
    updateExercise(exId, { sets: ex.sets.filter((_, i) => i !== idx) });
  }

  return (
    <GlassCard className="mb-6">
      <h3 className="font-display text-xl mb-4">New Workout</h3>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div>
          <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" />
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {exercises.map((ex) => (
          <div key={ex.id} className="p-3 rounded-lg border border-border bg-secondary/40">
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Exercise name"
                value={ex.name}
                onChange={(e) => updateExercise(ex.id, { name: e.target.value })}
                className="flex-1"
              />
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteExercise(ex.id)}>
                <Trash2 className="size-4" />
              </Button>
            </div>
            <div className="space-y-1.5">
              {ex.sets.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground w-10">SET {i + 1}</span>
                  <Input type="number" value={s.reps} onChange={(e) => updateSet(ex.id, i, { reps: parseInt(e.target.value) || 0 })} className="w-20" />
                  <span className="text-xs text-muted-foreground">reps ×</span>
                  <Input type="number" value={s.weight} onChange={(e) => updateSet(ex.id, i, { weight: parseFloat(e.target.value) || 0 })} className="w-24" />
                  <span className="text-xs text-muted-foreground">kg</span>
                  <Button variant="ghost" size="sm" className="ml-auto text-destructive" onClick={() => deleteSet(ex.id, i)}>
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addSet(ex.id)} className="mt-1">
                <Plus className="size-3 mr-1" /> Add Set
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addExercise} className="w-full">
          <Plus className="size-4 mr-1" /> Add Exercise
        </Button>
      </div>

      <div className="mb-4">
        <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Notes</Label>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="mt-1" />
      </div>

      <div className="flex gap-2">
        <Button className="flex-1 bg-brand text-brand-foreground" onClick={() => onSave({ title, date, exercises, notes })}>
          Save Workout
        </Button>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </GlassCard>
  );
}
