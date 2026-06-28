import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, RadialBarChart, RadialBar,
} from "recharts";
import { Pencil, Check, X, Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAppStore, todaysDate } from "@/store/useAppStore";
import { GlassCard, PageContainer, SectionHeader } from "@/components/ui-kit";
import heroImg from "@/assets/hero-physique.jpg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KDS Fitness — Dashboard" },
      { name: "description", content: "Your personal dream-physique transformation command center." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <>
      <Hero />
      <PageContainer>
        <SystemOverview />
        <DailySnapshot />
      </PageContainer>
    </>
  );
}

function ResetButton() {
  const resetAll = useAppStore((s) => s.resetAll);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
          <RotateCcw className="mr-1 size-4" /> Reset Progress
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
          <AlertDialogDescription>
            This wipes workouts, nutrition, photos, daily logs, metrics, habits, XP, and achievements.
            Your profile, dream goal, and theme are kept. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => { resetAll(); toast.success("Progress wiped. Fresh start, warrior."); }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Yes, reset everything
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Hero() {
  return (
    <section className="relative px-4 md:px-8 lg:px-12 pt-12 pb-20 overflow-hidden max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 xl:col-span-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 mb-6">
            <Sparkles className="size-3 text-brand" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand font-bold">KDS Protocol Active</span>
          </div>
          <h1 className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.85] tracking-tight uppercase text-balance">
            Build Your <span className="text-gradient-brand">Dream Physique</span>
          </h1>
          <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-xl text-pretty leading-relaxed font-light">
            Transform your body, discipline, confidence, and lifestyle through a systematic roadmap of power and aesthetics.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90 font-semibold">
              <Link to="/transformation">
                Start Your Journey <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/workouts">Today's Workout</Link>
            </Button>
            <ResetButton />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 xl:col-span-4"
        >
          <div className="aspect-[4/5] rounded-2xl border border-border relative group overflow-hidden">
            <img
              src={heroImg}
              alt="Cinematic gym aesthetic"
              width={1024}
              height={1280}
              className="size-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-mono text-[10px] text-brand uppercase mb-1 tracking-widest">Active Mission</div>
              <div className="font-display text-2xl md:text-3xl tracking-wide">Hypertrophy Phase</div>
            </div>
            <div className="absolute top-4 right-4 size-2 rounded-full bg-success animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SystemOverview() {
  return (
    <section className="mb-16">
      <SectionHeader title="System Overview" subtitle="Your current state and target" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <CurrentMetricsCard />
        <DreamPhysiqueCard />
        <XPCard />
      </div>
    </section>
  );
}

function CurrentMetricsCard() {
  const profile = useAppStore((s) => s.profile);
  const update = useAppStore((s) => s.updateProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  function save() {
    update(draft);
    setEditing(false);
  }

  return (
    <GlassCard>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-display text-xl tracking-wider text-brand">Current Metrics</h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mt-1">My Details</p>
        </div>
        <button
          onClick={() => { setDraft(profile); setEditing((e) => !e); }}
          className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded hover:text-brand hover:border-brand transition-colors flex items-center gap-1"
        >
          {editing ? <X className="size-3" /> : <Pencil className="size-3" />}
          {editing ? "CANCEL" : "EDIT"}
        </button>
      </div>

      {!editing ? (
        <div className="space-y-3">
          {([
            ["Height", `${profile.height} cm`],
            ["Weight", `${profile.weight} kg`],
            ["Body Fat %", `${profile.bodyFatPct}%`, true],
            ["Fat Mass", `${profile.fatMass} kg`],
            ["Category", profile.category, false, true],
          ] as const).map(([label, val, accent, warn]) => (
            <div key={label} className="flex justify-between border-b border-border last:border-b-0 pb-3 last:pb-0">
              <span className="text-muted-foreground text-sm">{label}</span>
              <span className={`font-mono text-sm ${accent ? "text-brand" : warn ? "text-warning uppercase" : ""}`}>{val}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {(["height", "weight", "bodyFatPct", "fatMass"] as const).map((k) => (
            <div key={k}>
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</Label>
              <Input
                type="number"
                step="0.1"
                value={draft[k]}
                onChange={(e) => setDraft({ ...draft, [k]: parseFloat(e.target.value) || 0 })}
                className="mt-1"
              />
            </div>
          ))}
          <div>
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Category</Label>
            <Input value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="mt-1" />
          </div>
          <Button onClick={save} className="w-full bg-brand text-brand-foreground">
            <Check className="size-4 mr-1" /> Save
          </Button>
        </div>
      )}
    </GlassCard>
  );
}

function DreamPhysiqueCard() {
  const dream = useAppStore((s) => s.dream);
  const update = useAppStore((s) => s.updateDream);
  const profile = useAppStore((s) => s.profile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(dream);

  // progress estimate: distance from current BF to goal vs starting estimate
  const progress = useMemo(() => {
    const start = 19.3;
    const goal = dream.goalBodyFatPct;
    const cur = profile.bodyFatPct;
    if (start === goal) return 100;
    return Math.max(0, Math.min(100, Math.round(((start - cur) / (start - goal)) * 100)));
  }, [profile.bodyFatPct, dream.goalBodyFatPct]);

  function save() {
    update(draft);
    setEditing(false);
  }

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute -top-20 -right-20 size-48 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
      <div className="flex justify-between items-start mb-6 relative">
        <div>
          <h3 className="font-display text-xl tracking-wider text-brand">Dream Physique</h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mt-1">Ultimate Target</p>
        </div>
        <button
          onClick={() => { setDraft(dream); setEditing((e) => !e); }}
          className="font-mono text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded hover:text-brand hover:border-brand transition-colors flex items-center gap-1"
        >
          {editing ? <X className="size-3" /> : <Pencil className="size-3" />}
          {editing ? "CANCEL" : "EDIT"}
        </button>
      </div>

      {!editing ? (
        <div className="space-y-4 relative">
          <p className="text-sm text-muted-foreground">Inspiration: <span className="text-foreground font-medium">{dream.inspiration}</span></p>
          <div className="p-4 bg-background/40 border border-border rounded-xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-tighter">Goal Weight</div>
                <div className="text-2xl font-display">{dream.goalWeight} KG</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-tighter">Goal Body Fat</div>
                <div className="text-2xl font-display text-brand">{dream.goalBodyFatPct}%</div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Progress to Goal</span>
              <span className="font-mono">{dream.deadlineYears} yrs · {progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brand to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Inspiration</Label>
            <Input value={draft.inspiration} onChange={(e) => setDraft({ ...draft, inspiration: e.target.value })} className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Goal Weight (kg)</Label>
              <Input type="number" step="0.1" value={draft.goalWeight} onChange={(e) => setDraft({ ...draft, goalWeight: parseFloat(e.target.value) || 0 })} className="mt-1" />
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Goal BF %</Label>
              <Input type="number" step="0.1" value={draft.goalBodyFatPct} onChange={(e) => setDraft({ ...draft, goalBodyFatPct: parseFloat(e.target.value) || 0 })} className="mt-1" />
            </div>
          </div>
          <div>
            <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Deadline (years)</Label>
            <Input type="number" step="0.5" value={draft.deadlineYears} onChange={(e) => setDraft({ ...draft, deadlineYears: parseFloat(e.target.value) || 0 })} className="mt-1" />
          </div>
          <Button onClick={save} className="w-full bg-brand text-brand-foreground">
            <Check className="size-4 mr-1" /> Save
          </Button>
        </div>
      )}
    </GlassCard>
  );
}

function XPCard() {
  const { xp, level, achievements } = useAppStore();
  const xpInLevel = xp % 500;
  const data = [{ name: "xp", value: (xpInLevel / 500) * 100, fill: "var(--brand)" }];
  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <GlassCard className="md:col-span-2 xl:col-span-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-display text-xl tracking-wider text-brand">Power Level</h3>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mt-1">XP & Achievements</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="size-32 relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
              <RadialBar background={{ fill: "var(--secondary)" }} dataKey="value" cornerRadius={20} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl">{level}</span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Level</span>
          </div>
        </div>
        <div className="space-y-2 flex-1">
          <div>
            <div className="text-xs text-muted-foreground">Total XP</div>
            <div className="font-display text-2xl">{xp.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Achievements</div>
            <div className="font-display text-2xl text-brand">{unlocked}/{achievements.length}</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function DailySnapshot() {
  const daily = useAppStore((s) => s.daily);
  const upsert = useAppStore((s) => s.upsertDaily);
  const today = todaysDate();
  const todayLog = daily.find((d) => d.date === today) || {
    date: today, sleepHours: 0, waterLiters: 0, noSugar: false, noSoftDrinks: false, gym: false,
  };

  const last7 = useMemo(() => {
    const arr: { day: string; water: number; sleep: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const log = daily.find((x) => x.date === iso);
      arr.push({
        day: d.toLocaleDateString("en", { weekday: "short" }),
        water: log?.waterLiters || 0,
        sleep: log?.sleepHours || 0,
      });
    }
    return arr;
  }, [daily]);

  return (
    <section>
      <SectionHeader title="Today's Snapshot" subtitle="Quick log" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <GlassCard>
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Water Intake</h4>
          <div className="flex items-end gap-2 mb-4">
            <span className="font-display text-5xl">{todayLog.waterLiters.toFixed(1)}L</span>
            <span className="text-muted-foreground mb-2">/ 4.0L</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden mb-3">
            <div className="h-full bg-brand transition-all" style={{ width: `${Math.min(100, (todayLog.waterLiters / 4) * 100)}%` }} />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => upsert(today, { waterLiters: Math.max(0, todayLog.waterLiters - 0.25) })}>-0.25L</Button>
            <Button size="sm" className="bg-brand text-brand-foreground" onClick={() => upsert(today, { waterLiters: todayLog.waterLiters + 0.25 })}>+0.25L</Button>
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Last Sleep</h4>
          <div className="flex items-end gap-2 mb-4">
            <span className="font-display text-5xl text-brand">{todayLog.sleepHours.toFixed(1)}</span>
            <span className="text-muted-foreground mb-2">hours</span>
          </div>
          <Input
            type="number"
            step="0.25"
            min="0"
            max="14"
            value={todayLog.sleepHours}
            onChange={(e) => upsert(today, { sleepHours: parseFloat(e.target.value) || 0 })}
            placeholder="Hours slept"
          />
          <p className="text-xs text-muted-foreground mt-2">{todayLog.sleepHours >= 7 ? "Optimal recovery" : todayLog.sleepHours >= 6 ? "Decent" : "Sleep more, warrior"}</p>
        </GlassCard>

        <GlassCard>
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">7-Day Trend</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last7}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="water" stroke="var(--brand)" fill="url(#g)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
