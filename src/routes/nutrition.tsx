import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Trash2, Apple, Lock, CheckCircle2, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, todaysDate, type MealType } from "@/store/useAppStore";
import { GlassCard, PageContainer, SectionHeader } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/nutrition")({
  head: () => ({ meta: [{ title: "Nutrition — KDS Fitness" }] }),
  component: NutritionPage,
});

const MEAL_TYPES: { key: MealType; label: string; icon: string }[] = [
  { key: "breakfast", label: "Morning", icon: "🌅" },
  { key: "lunch", label: "Afternoon", icon: "🍱" },
  { key: "snack", label: "Snacks", icon: "🥜" },
  { key: "dinner", label: "Dinner", icon: "🌙" },
];

const HOSTEL_IDEAS: { name: string; cal: number; p: number; c: number; f: number; type: MealType; cost: string }[] = [
  // Morning
  { name: "Boiled Eggs (4) + Banana", cal: 380, p: 28, c: 30, f: 18, type: "breakfast", cost: "₹30" },
  { name: "Peanut Butter Oats", cal: 480, p: 18, c: 60, f: 18, type: "breakfast", cost: "₹35" },
  { name: "Sprouts Chaat + Curd", cal: 320, p: 22, c: 35, f: 8, type: "breakfast", cost: "₹25" },
  { name: "Besan Cheela (3) + Chutney", cal: 360, p: 20, c: 38, f: 12, type: "breakfast", cost: "₹30" },
  { name: "Banana + Milk + Honey Shake", cal: 340, p: 12, c: 55, f: 6, type: "breakfast", cost: "₹25" },
  // Afternoon
  { name: "Curd Rice + Chana", cal: 500, p: 22, c: 70, f: 12, type: "lunch", cost: "₹40" },
  { name: "Tuna + Bread + Veggies", cal: 350, p: 30, c: 30, f: 8, type: "lunch", cost: "₹60" },
  { name: "Rajma Chawal", cal: 560, p: 24, c: 80, f: 10, type: "lunch", cost: "₹45" },
  { name: "Egg Bhurji + 4 Rotis", cal: 600, p: 32, c: 65, f: 18, type: "lunch", cost: "₹50" },
  { name: "Chickpea Salad Bowl", cal: 420, p: 22, c: 50, f: 12, type: "lunch", cost: "₹40" },
  // Snacks
  { name: "Roasted Chana (50g)", cal: 200, p: 12, c: 28, f: 4, type: "snack", cost: "₹15" },
  { name: "Peanuts (handful)", cal: 250, p: 11, c: 8, f: 20, type: "snack", cost: "₹15" },
  { name: "Greek Yogurt + Berries", cal: 180, p: 15, c: 18, f: 3, type: "snack", cost: "₹40" },
  { name: "Boiled Egg + Apple", cal: 170, p: 10, c: 22, f: 5, type: "snack", cost: "₹20" },
  { name: "Whey Scoop in Milk", cal: 240, p: 30, c: 18, f: 5, type: "snack", cost: "₹50" },
  // Dinner
  { name: "Paneer Bhurji + Roti", cal: 520, p: 28, c: 45, f: 22, type: "dinner", cost: "₹55" },
  { name: "Dal Tadka + Brown Rice", cal: 480, p: 20, c: 75, f: 8, type: "dinner", cost: "₹40" },
  { name: "Chicken Curry + 3 Roti", cal: 620, p: 42, c: 55, f: 20, type: "dinner", cost: "₹80" },
  { name: "Mixed Veg + Chapati (4)", cal: 450, p: 14, c: 65, f: 12, type: "dinner", cost: "₹35" },
  { name: "Soya Chunks Curry + Rice", cal: 540, p: 34, c: 70, f: 10, type: "dinner", cost: "₹45" },
];

function NutritionPage() {
  const today = todaysDate();
  const { nutrition, upsertNutritionDay, addMeal, deleteMeal, setDayCompleted } = useAppStore();
  const [viewDate, setViewDate] = useState(today);
  const [filter, setFilter] = useState<MealType | "all">("all");

  const day = nutrition.find((n) => n.date === viewDate) || {
    date: viewDate, calorieTarget: 2400, proteinTarget: 160, meals: [], completed: false,
  };
  const locked = !!day.completed;
  const isToday = viewDate === today;

  const carbTarget = day.carbTarget ?? 300;
  const fatTarget = day.fatTarget ?? 70;

  const totals = useMemo(() => {
    const sum = day.meals.reduce(
      (acc, m) => ({
        cal: acc.cal + m.calories,
        p: acc.p + m.protein,
        c: acc.c + m.carbs,
        f: acc.f + m.fats,
      }),
      { cal: 0, p: 0, c: 0, f: 0 }
    );
    return {
      cal: sum.cal + (day.manualCal ?? 0),
      p: sum.p + (day.manualP ?? 0),
      c: sum.c + (day.manualC ?? 0),
      f: sum.f + (day.manualF ?? 0),
    };
  }, [day.meals, day.manualCal, day.manualP, day.manualC, day.manualF]);

  const [meal, setMeal] = useState<{ name: string; calories: number; protein: number; carbs: number; fats: number; type: MealType }>({
    name: "", calories: 0, protein: 0, carbs: 0, fats: 0, type: "breakfast",
  });

  const filteredMeals = day.meals.filter((m) => filter === "all" || m.type === filter);
  const filteredIdeas = HOSTEL_IDEAS.filter((i) => filter === "all" || i.type === filter);

  // History — completed days sorted desc
  const history = [...nutrition].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <PageContainer>
      <SectionHeader title="Nutrition Dashboard" subtitle="Calories · Macros · Hostel-friendly meals" />

      {/* Day picker + completion banner */}
      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-end gap-3 justify-between">
          <div className="flex items-end gap-3 flex-wrap">
            <div>
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                <CalendarDays className="size-3" /> Viewing day
              </Label>
              <Input type="date" value={viewDate} onChange={(e) => setViewDate(e.target.value)} max={today} className="mt-1 w-44" />
            </div>
            {!isToday && (
              <Button variant="outline" size="sm" onClick={() => setViewDate(today)}>Jump to today</Button>
            )}
          </div>
          {isToday && !locked && (
            <Button
              className="bg-success text-background hover:bg-success/90"
              onClick={() => setDayCompleted(viewDate, true)}
              disabled={day.meals.length === 0}
            >
              <CheckCircle2 className="size-4 mr-1" /> Complete Day
            </Button>
          )}
          {locked && (
            <Button variant="outline" size="sm" onClick={() => setDayCompleted(viewDate, false)}>
              <Lock className="size-3 mr-1" /> Unlock
            </Button>
          )}
        </div>
        {locked && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-lg bg-success/10 border border-success/30 text-sm flex items-center gap-2"
          >
            <CheckCircle2 className="size-4 text-success" />
            <span><strong>Day saved.</strong> Edits are locked. Visit history below to review.</span>
          </motion.div>
        )}
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <GlassCard className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display text-xl">{isToday ? "Today's Intake" : "Day's Intake"}</h3>
            <span className="text-xs text-muted-foreground font-mono">{viewDate}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <EditableStat
              label="Calories" value={totals.cal} target={day.calorieTarget} unit="kcal" locked={locked}
              onValueChange={(v) => upsertNutritionDay(viewDate, { manualCal: Math.max(0, v - day.meals.reduce((a, m) => a + m.calories, 0)) })}
              onTargetChange={(v) => upsertNutritionDay(viewDate, { calorieTarget: v })}
            />
            <EditableStat
              label="Protein" value={totals.p} target={day.proteinTarget} unit="g" accent locked={locked}
              onValueChange={(v) => upsertNutritionDay(viewDate, { manualP: Math.max(0, v - day.meals.reduce((a, m) => a + m.protein, 0)) })}
              onTargetChange={(v) => upsertNutritionDay(viewDate, { proteinTarget: v })}
            />
            <EditableStat
              label="Carbs" value={totals.c} target={carbTarget} unit="g" locked={locked}
              onValueChange={(v) => upsertNutritionDay(viewDate, { manualC: Math.max(0, v - day.meals.reduce((a, m) => a + m.carbs, 0)) })}
              onTargetChange={(v) => upsertNutritionDay(viewDate, { carbTarget: v })}
            />
            <EditableStat
              label="Fats" value={totals.f} target={fatTarget} unit="g" locked={locked}
              onValueChange={(v) => upsertNutritionDay(viewDate, { manualF: Math.max(0, v - day.meals.reduce((a, m) => a + m.fats, 0)) })}
              onTargetChange={(v) => upsertNutritionDay(viewDate, { fatTarget: v })}
            />
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-4">
            Tap any number to edit · totals combine logged meals + your manual entry
          </p>
        </GlassCard>

        <GlassCard>
          <h3 className="font-display text-lg mb-3">Add Meal</h3>
          <fieldset disabled={locked} className="space-y-2 disabled:opacity-50">
            <Input placeholder="Meal name" value={meal.name} onChange={(e) => setMeal({ ...meal, name: e.target.value })} />
            <select
              value={meal.type}
              onChange={(e) => setMeal({ ...meal, type: e.target.value as MealType })}
              className="w-full h-10 px-3 rounded-md bg-background border border-input text-sm"
            >
              {MEAL_TYPES.map((t) => (
                <option key={t.key} value={t.key}>{t.icon} {t.label}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" placeholder="Cal" value={meal.calories || ""} onChange={(e) => setMeal({ ...meal, calories: parseInt(e.target.value) || 0 })} />
              <Input type="number" placeholder="Protein g" value={meal.protein || ""} onChange={(e) => setMeal({ ...meal, protein: parseInt(e.target.value) || 0 })} />
              <Input type="number" placeholder="Carbs g" value={meal.carbs || ""} onChange={(e) => setMeal({ ...meal, carbs: parseInt(e.target.value) || 0 })} />
              <Input type="number" placeholder="Fats g" value={meal.fats || ""} onChange={(e) => setMeal({ ...meal, fats: parseInt(e.target.value) || 0 })} />
            </div>
            <Button
              className="w-full bg-brand text-brand-foreground"
              onClick={() => {
                if (!meal.name) return;
                addMeal(viewDate, meal);
                setMeal({ name: "", calories: 0, protein: 0, carbs: 0, fats: 0, type: meal.type });
              }}
            >
              <Plus className="size-4 mr-1" /> Add
            </Button>
          </fieldset>
        </GlassCard>
      </div>

      {/* Meal-type filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="All" />
        {MEAL_TYPES.map((t) => (
          <FilterChip key={t.key} active={filter === t.key} onClick={() => setFilter(t.key)} label={`${t.icon} ${t.label}`} />
        ))}
      </div>

      <SectionHeader title="Day's Meals" subtitle={`${filteredMeals.length} ${filter === "all" ? "logged" : MEAL_TYPES.find(m => m.key === filter)?.label}`} />
      {filteredMeals.length === 0 ? (
        <GlassCard className="text-center py-12">
          <Apple className="size-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">No meals here yet.</p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {filteredMeals.map((m) => {
            const typeInfo = MEAL_TYPES.find((t) => t.key === m.type);
            return (
              <GlassCard key={m.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{m.name}</h4>
                      {typeInfo && <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{typeInfo.icon} {typeInfo.label}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      {m.calories} kcal · {m.protein}P / {m.carbs}C / {m.fats}F
                    </p>
                  </div>
                  {!locked && (
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteMeal(viewDate, m.id)}>
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      <SectionHeader title="Hostel & Budget Ideas" subtitle={`Quick templates · ${filteredIdeas.length} options`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {filteredIdeas.map((idea) => {
          const typeInfo = MEAL_TYPES.find((t) => t.key === idea.type)!;
          return (
            <GlassCard key={idea.name} className="hover:border-brand/40 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{idea.name}</h4>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-brand/10 text-brand shrink-0">{idea.cost}</span>
              </div>
              <p className="text-[10px] font-mono uppercase text-muted-foreground mb-2">{typeInfo.icon} {typeInfo.label}</p>
              <p className="text-xs text-muted-foreground font-mono mb-3">
                {idea.cal} kcal · {idea.p}P / {idea.c}C / {idea.f}F
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                disabled={locked}
                onClick={() => addMeal(viewDate, { name: idea.name, calories: idea.cal, protein: idea.p, carbs: idea.c, fats: idea.f, type: idea.type })}
              >
                <Plus className="size-3 mr-1" /> Quick add
              </Button>
            </GlassCard>
          );
        })}
      </div>

      <SectionHeader title="History" subtitle={`${history.length} logged days · completed days persist`} />
      {history.length === 0 ? (
        <GlassCard className="text-center py-10 text-muted-foreground text-sm">No history yet.</GlassCard>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {history.map((d) => {
              const t = d.meals.reduce((a, m) => ({ cal: a.cal + m.calories, p: a.p + m.protein }), { cal: 0, p: 0 });
              const pct = Math.min(100, d.calorieTarget ? Math.round((t.cal / d.calorieTarget) * 100) : 0);
              return (
                <motion.div key={d.date} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <GlassCard className="flex flex-wrap items-center gap-4">
                    <button onClick={() => setViewDate(d.date)} className="font-mono text-xs text-brand hover:underline w-24 text-left">{d.date}</button>
                    <span className="text-sm">{d.meals.length} meals</span>
                    <span className="text-sm">{t.cal} / {d.calorieTarget} kcal</span>
                    <span className="text-sm text-brand">{t.p}g P</span>
                    <div className="flex-1 min-w-[100px] h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
                    </div>
                    {d.completed ? (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-success/15 text-success border border-success/30 flex items-center gap-1">
                        <CheckCircle2 className="size-3" /> Completed
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-secondary text-muted-foreground">Draft</span>
                    )}
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </PageContainer>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors border ${
        active
          ? "bg-brand text-brand-foreground border-brand"
          : "bg-secondary text-muted-foreground border-border hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function EditableStat({
  label, value, target, unit, accent, locked, onValueChange, onTargetChange,
}: {
  label: string; value: number; target: number; unit: string; accent?: boolean; locked?: boolean;
  onValueChange: (v: number) => void; onTargetChange: (v: number) => void;
}) {
  const [mode, setMode] = useState<"none" | "value" | "target">("none");
  const [draft, setDraft] = useState("");
  const pct = Math.min(100, target > 0 ? (value / target) * 100 : 0);

  function commit() {
    const n = parseInt(draft) || 0;
    if (mode === "value") onValueChange(n);
    else if (mode === "target") onTargetChange(Math.max(1, n));
    setMode("none");
  }

  return (
    <motion.div whileHover={{ y: -2 }} className="group">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">{label}</div>
      <div className="flex items-baseline gap-1">
        {mode === "value" && !locked ? (
          <Input
            autoFocus type="number" value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setMode("none"); }}
            className="h-9 w-20 text-2xl font-display"
          />
        ) : (
          <button
            disabled={locked}
            onClick={() => { setDraft(String(value)); setMode("value"); }}
            className={`font-display text-3xl ${accent ? "text-brand" : ""} hover:underline disabled:no-underline disabled:cursor-not-allowed`}
            title={locked ? "Day locked" : "Click to edit"}
          >
            {value}
          </button>
        )}
        <span className="text-xs text-muted-foreground">/</span>
        {mode === "target" && !locked ? (
          <Input
            autoFocus type="number" value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setMode("none"); }}
            className="h-7 w-16 text-xs"
          />
        ) : (
          <button
            disabled={locked}
            onClick={() => { setDraft(String(target)); setMode("target"); }}
            className="text-xs text-muted-foreground hover:text-brand"
          >
            {target} {unit}
          </button>
        )}
      </div>
      <div className="h-1 bg-secondary rounded-full mt-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full ${accent ? "bg-brand" : "bg-foreground/60"}`}
        />
      </div>
    </motion.div>
  );
}
