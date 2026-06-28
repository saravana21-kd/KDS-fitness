import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Trash2, Check, CalendarDays } from "lucide-react";
import { useAppStore, todaysDate } from "@/store/useAppStore";
import { GlassCard, PageContainer, SectionHeader } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StreakBadge, MilestoneRail } from "@/components/StreakKit";

export const Route = createFileRoute("/habits")({
  head: () => ({ meta: [{ title: "Habits — KDS Fitness" }] }),
  component: HabitsPage,
});

function HabitsPage() {
  const { habits, addHabit, toggleHabit, deleteHabit } = useAppStore();
  const [newName, setNewName] = useState("");
  const today = todaysDate();
  const [viewDate, setViewDate] = useState(today);

  const completedToday = habits.filter((h) => h.lastDone === today).length;
  const total = habits.length;
  const allDone = total > 0 && completedToday === total;
  const maxStreak = useMemo(() => habits.reduce((m, h) => Math.max(m, h.streak), 0), [habits]);

  return (
    <PageContainer>
      <SectionHeader
        title="Habit Tracker"
        subtitle="Streaks build the warrior"
        action={
          <div className={`px-4 py-2 rounded-full border font-mono text-xs uppercase tracking-widest flex items-center gap-2 ${
            allDone
              ? "bg-success/15 text-success border-success/40"
              : completedToday > 0
                ? "bg-brand/15 text-brand border-brand/30"
                : "bg-secondary text-muted-foreground border-border"
          }`}>
            <Check className="size-3" />
            Today {completedToday}/{total}
          </div>
        }
      />

      {/* Aggregate streak / Duolingo card */}
      <GlassCard className="mb-6 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 size-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative">
          <div className="flex items-center gap-4">
            <StreakBadge streak={maxStreak} size="lg" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Top streak</div>
              <div className="font-display text-4xl">{maxStreak} <span className="text-base text-muted-foreground">days</span></div>
              {maxStreak >= 7 && <p className="text-xs text-orange-400 font-mono mt-1">🔥 ON FIRE</p>}
            </div>
          </div>
          <div className="md:col-span-2">
            <MilestoneRail streak={maxStreak} />
          </div>
        </div>
      </GlassCard>

      <GlassCard className="mb-8">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <CalendarDays className="size-3" /> Date
            </Label>
            <Input type="date" value={viewDate} max={today} onChange={(e) => setViewDate(e.target.value)} className="mt-1 w-44" />
          </div>
          <div className="flex-1 min-w-[220px]">
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">New habit</Label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="e.g. 10k steps, meditate, no doomscroll"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newName.trim()) { addHabit(newName.trim()); setNewName(""); }
                }}
              />
              <Button
                className="bg-brand text-brand-foreground"
                onClick={() => { if (!newName.trim()) return; addHabit(newName.trim()); setNewName(""); }}
              >
                <Plus className="size-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((h) => {
          const doneToday = h.lastDone === today;
          const onFire = h.streak >= 7;
          return (
            <GlassCard
              key={h.id}
              className={`transition-all ${doneToday ? "border-brand/40 glow-accent" : ""} ${onFire ? "ring-1 ring-orange-500/30" : ""}`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleHabit(h.id)}
                  aria-label="toggle"
                  className={`size-12 rounded-xl flex items-center justify-center border-2 transition-all shrink-0 ${
                    doneToday ? "bg-brand text-brand-foreground border-brand" : "border-border hover:border-brand"
                  }`}
                >
                  {doneToday && <Check className="size-5" strokeWidth={3} />}
                </button>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{h.name}</h4>
                  <div className="mt-1.5">
                    <MilestoneRail streak={h.streak} />
                  </div>
                </div>
                <StreakBadge streak={h.streak} size="sm" />
                <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteHabit(h.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </PageContainer>
  );
}
