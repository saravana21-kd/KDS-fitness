import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Droplet, Moon, Plus, Minus, CalendarDays, Check } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { useAppStore, todaysDate } from "@/store/useAppStore";
import { GlassCard, PageContainer, SectionHeader } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StreakBadge, MilestoneRail } from "@/components/StreakKit";

export const Route = createFileRoute("/sleep-water")({
  head: () => ({ meta: [{ title: "Sleep & Water — KDS Fitness" }] }),
  component: SleepWaterPage,
});

const WATER_GOAL = 4;
const SLEEP_GOAL = 7;

function SleepWaterPage() {
  const { daily, upsertDaily } = useAppStore();
  const today = todaysDate();
  const [viewDate, setViewDate] = useState(today);
  const log = daily.find((d) => d.date === viewDate) || {
    date: viewDate, sleepHours: 0, waterLiters: 0, noSugar: false, noSoftDrinks: false, gym: false,
  };

  // Streaks calculated from `daily` array: consecutive past days (incl. today) hitting goals
  const { waterStreak, sleepStreak, completedToday, totalGoals } = useMemo(() => {
    const lookup = new Map(daily.map((d) => [d.date, d]));
    let ws = 0, ss = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const entry = lookup.get(iso);
      if (entry && entry.waterLiters >= WATER_GOAL) ws++; else break;
    }
    for (let i = 0; i < 365; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const entry = lookup.get(iso);
      if (entry && entry.sleepHours >= SLEEP_GOAL) ss++; else break;
    }
    const todayLog = lookup.get(today);
    let done = 0;
    if (todayLog) {
      if (todayLog.waterLiters >= WATER_GOAL) done++;
      if (todayLog.sleepHours >= SLEEP_GOAL) done++;
    }
    return { waterStreak: ws, sleepStreak: ss, completedToday: done, totalGoals: 2 };
  }, [daily, today]);

  const maxStreak = Math.max(waterStreak, sleepStreak);

  const last14 = useMemo(() => {
    const arr: { day: string; water: number; sleep: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const l = daily.find((x) => x.date === iso);
      arr.push({
        day: d.toLocaleDateString("en", { day: "numeric", month: "short" }),
        water: l?.waterLiters || 0,
        sleep: l?.sleepHours || 0,
      });
    }
    return arr;
  }, [daily]);

  return (
    <PageContainer>
      <SectionHeader
        title="Sleep & Water"
        subtitle="Recovery foundations"
        action={
          <div className={`px-4 py-2 rounded-full border font-mono text-xs uppercase tracking-widest flex items-center gap-2 ${
            completedToday === totalGoals
              ? "bg-success/15 text-success border-success/40"
              : completedToday > 0
                ? "bg-brand/15 text-brand border-brand/30"
                : "bg-secondary text-muted-foreground border-border"
          }`}>
            <Check className="size-3" /> Today {completedToday}/{totalGoals}
          </div>
        }
      />

      {/* Aggregate streak banner */}
      <GlassCard className="mb-6 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 size-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative">
          <div className="flex items-center gap-4">
            <StreakBadge streak={maxStreak} size="lg" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Top streak</div>
              <div className="font-display text-4xl">{maxStreak} <span className="text-base text-muted-foreground">days</span></div>
              {maxStreak >= 7 && <p className="text-xs text-orange-400 font-mono mt-1">🔥 ON FIRE</p>}
              <p className="text-[10px] font-mono text-muted-foreground mt-1">Water {waterStreak}d · Sleep {sleepStreak}d</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <MilestoneRail streak={maxStreak} />
          </div>
        </div>
      </GlassCard>

      {/* Date picker */}
      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">
              <CalendarDays className="size-3" /> Viewing day
            </Label>
            <Input type="date" value={viewDate} max={today} onChange={(e) => setViewDate(e.target.value)} className="mt-1 w-44" />
          </div>
          {viewDate !== today && (
            <Button variant="outline" size="sm" onClick={() => setViewDate(today)}>Jump to today</Button>
          )}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-brand/15 border border-brand/30 flex items-center justify-center">
              <Droplet className="size-5 text-brand" />
            </div>
            <div>
              <h3 className="font-display text-xl">Water</h3>
              <p className="text-xs text-muted-foreground font-mono">Goal {WATER_GOAL.toFixed(1)}L · streak {waterStreak}d</p>
            </div>
          </div>
          <div className="text-center my-6">
            <div className="font-display text-7xl text-brand">{log.waterLiters.toFixed(2)}<span className="text-2xl text-muted-foreground">L</span></div>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-brand to-blue-500 transition-all" style={{ width: `${Math.min(100, (log.waterLiters / WATER_GOAL) * 100)}%` }} />
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {[0.25, 0.5, 1].map((amt) => (
              <Button key={amt} variant="outline" size="sm" onClick={() => upsertDaily(viewDate, { waterLiters: log.waterLiters + amt })}>
                <Plus className="size-3 mr-1" /> {amt}L
              </Button>
            ))}
            <Button variant="ghost" size="sm" onClick={() => upsertDaily(viewDate, { waterLiters: Math.max(0, log.waterLiters - 0.25) })}>
              <Minus className="size-3 mr-1" /> 0.25L
            </Button>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-brand/15 border border-brand/30 flex items-center justify-center">
              <Moon className="size-5 text-brand" />
            </div>
            <div>
              <h3 className="font-display text-xl">Sleep</h3>
              <p className="text-xs text-muted-foreground font-mono">Target 7.5 - 8.5h · streak {sleepStreak}d</p>
            </div>
          </div>
          <div className="text-center my-6">
            <div className="font-display text-7xl text-brand">{log.sleepHours.toFixed(1)}<span className="text-2xl text-muted-foreground">h</span></div>
            <p className="text-sm text-muted-foreground mt-2">
              {log.sleepHours >= 7 ? "Optimal recovery" : log.sleepHours >= 6 ? "Decent — push for more" : "Sleep more, warrior"}
            </p>
          </div>
          <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Hours slept</Label>
          <Input
            type="number"
            step="0.25"
            value={log.sleepHours}
            onChange={(e) => upsertDaily(viewDate, { sleepHours: parseFloat(e.target.value) || 0 })}
            className="mt-1"
          />
        </GlassCard>
      </div>

      <SectionHeader title="14-Day Trend" subtitle="Recovery consistency" />
      <GlassCard>
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={last14}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Line yAxisId="left" type="monotone" dataKey="water" stroke="var(--brand)" strokeWidth={2.5} dot={{ r: 3 }} name="Water (L)" />
              <Line yAxisId="right" type="monotone" dataKey="sleep" stroke="oklch(0.68 0.18 260)" strokeWidth={2.5} dot={{ r: 3 }} name="Sleep (h)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
