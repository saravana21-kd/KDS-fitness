import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  Route as RouteIcon,
  Camera,
  Moon,
  Trophy,
  Activity,
  Sun,
  Menu,
  X,
  Flame,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transformation", label: "Transformation", icon: RouteIcon },
  { to: "/workouts", label: "Workouts", icon: Dumbbell },
  { to: "/nutrition", label: "Nutrition", icon: Apple },
  { to: "/photos", label: "Progress Photos", icon: Camera },
  { to: "/sleep-water", label: "Sleep & Water", icon: Moon },
  { to: "/habits", label: "Habit Tracker", icon: CheckCheck },
  { to: "/body-metrics", label: "Body Metrics", icon: Activity },
  { to: "/gamification", label: "Achievements", icon: Trophy },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggleTheme, xp, level, habits } = useAppStore();
  const xpInLevel = xp % 500;
  const xpProgress = (xpInLevel / 500) * 100;
  const maxStreak = habits.reduce((m, h) => Math.max(m, h.streak), 0);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Ambient glow */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-[-15%] left-[10%] w-[400px] h-[400px] bg-brand/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-20 border-r border-border bg-background/60 backdrop-blur-xl z-40 flex-col items-center py-6 gap-2">
        <Link to="/" className="size-12 rounded-xl bg-brand/15 border border-brand/40 flex items-center justify-center font-display text-2xl text-brand mb-4 hover:bg-brand/25 transition-colors">
          K
        </Link>
        <nav className="flex flex-col gap-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group relative size-12 rounded-xl flex items-center justify-center transition-all",
                  active
                    ? "bg-brand/15 text-brand"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                )}
                title={item.label}
              >
                <Icon className="size-5 transition-transform group-hover:scale-110" strokeWidth={1.6} />
                {active && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute -left-px top-1/2 -translate-y-1/2 w-0.5 h-6 bg-brand rounded-r"
                  />
                )}
                <span className="absolute left-full ml-3 px-2 py-1 rounded bg-card border border-border text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <button
          onClick={toggleTheme}
          className="size-12 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 h-full w-72 bg-card border-r border-border z-50 flex flex-col py-6 px-4"
            >
              <div className="flex items-center justify-between mb-8 px-2">
                <span className="font-display text-2xl text-brand tracking-wider">KDS FITNESS</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="size-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        active
                          ? "bg-brand/15 text-brand border border-brand/30"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.6} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <button
                onClick={toggleTheme}
                className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
                <span className="text-sm">Toggle {theme === "dark" ? "Light" : "Dark"} Mode</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="md:pl-20 relative z-10">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3 md:gap-6">
            <button
              className="md:hidden size-10 rounded-lg flex items-center justify-center hover:bg-secondary"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Status</span>
                <span className="font-bold text-sm tracking-tight">LVL {level} · {level >= 10 ? "SUPER SAIYAN" : level >= 5 ? "ASCENDED" : "WARRIOR"}</span>
              </div>
              <div className="h-3 w-32 sm:w-48 bg-secondary rounded-full overflow-hidden border border-border">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand to-blue-600"
                  style={{ boxShadow: "0 0 10px color-mix(in oklab, var(--brand) 60%, transparent)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="font-mono text-xs font-bold hidden sm:inline">{xp} XP</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium flex items-center gap-1.5">
              <Flame className="size-3.5 text-warning" />
              <span>{maxStreak}d</span>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
}
