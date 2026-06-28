import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as create, p as persist, a as createJSONStorage } from "../_libs/zustand.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { L as LayoutDashboard, R as Route$b, D as Dumbbell, A as Apple, C as Camera, M as Moon, a as CheckCheck, b as Activity, T as Trophy, S as Sun, X, c as Menu, F as Flame } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const appCss = "/assets/styles-0m7dVwqt.css";
const safeStorage = () => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {
      },
      removeItem: () => {
      }
    };
  }
  return window.localStorage;
};
const todayISO = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
const defaultRoadmap = [
  {
    id: "p1",
    title: "Foundation Phase",
    description: "Correct posture, build core stability, master compound lifts.",
    status: "completed",
    progress: 100,
    notes: "Squat / Bench / Deadlift form locked in.",
    expanded: false
  },
  {
    id: "p2",
    title: "Fat Loss Phase",
    description: "Aggressive but sustainable deficit. Reveal underlying muscle.",
    status: "in-progress",
    progress: 35,
    notes: "Target: 15% body fat. 180g+ protein daily.",
    expanded: true
  },
  {
    id: "p3",
    title: "Lean Bulk Phase",
    description: "Controlled surplus. Maximize hypertrophy with minimal fat gain.",
    status: "locked",
    progress: 0,
    notes: "Goal: +4kg lean mass over 6 months.",
    expanded: false
  },
  {
    id: "p4",
    title: "Final Aesthetic Cut",
    description: "Single-digit body fat reveal. Hrithik-level conditioning.",
    status: "locked",
    progress: 0,
    notes: "Peak the physique.",
    expanded: false
  }
];
const defaultAchievements = [
  { id: "first-workout", title: "First Rep", description: "Log your first workout.", unlocked: false },
  { id: "7-day-streak", title: "Week Warrior", description: "7-day gym streak.", unlocked: false },
  { id: "30-day-streak", title: "Iron Discipline", description: "30-day gym streak.", unlocked: false },
  { id: "10-photos", title: "Visual Progress", description: "Upload 10 progress photos.", unlocked: false },
  { id: "hydration-hero", title: "Hydration Hero", description: "Hit 4L water 7 days in a row.", unlocked: false },
  { id: "lean-machine", title: "Lean Machine", description: "Drop below 15% body fat.", unlocked: false }
];
const useAppStore = create()(
  persist(
    (set, get) => ({
      theme: "dark",
      profile: {
        height: 175,
        weight: 71,
        bodyFatPct: 19.3,
        fatMass: 13.5,
        category: "Average"
      },
      dream: {
        inspiration: "Hrithik Roshan",
        goalWeight: 70,
        goalBodyFatPct: 11,
        deadlineYears: 3
      },
      roadmap: defaultRoadmap,
      workouts: [],
      nutrition: [],
      photos: [],
      daily: [],
      metrics: [],
      habits: [
        { id: "h1", name: "No Sugar", streak: 0, lastDone: null },
        { id: "h2", name: "No Soft Drinks", streak: 0, lastDone: null },
        { id: "h3", name: "Gym Today", streak: 0, lastDone: null }
      ],
      achievements: defaultAchievements,
      xp: 0,
      level: 1,
      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      updateProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      updateDream: (d) => set((s) => ({ dream: { ...s.dream, ...d } })),
      addPhase: () => set((s) => ({
        roadmap: [
          ...s.roadmap,
          {
            id: `p${Date.now()}`,
            title: "New Phase",
            description: "Describe this phase.",
            status: "locked",
            progress: 0,
            notes: "",
            expanded: true
          }
        ]
      })),
      updatePhase: (id, patch) => set((s) => ({
        roadmap: s.roadmap.map((p) => p.id === id ? { ...p, ...patch } : p)
      })),
      deletePhase: (id) => set((s) => ({ roadmap: s.roadmap.filter((p) => p.id !== id) })),
      addWorkout: (w) => {
        const id = `w${Date.now()}`;
        set((s) => ({ workouts: [{ id, ...w }, ...s.workouts] }));
        get().awardXP(50, "workout");
        if (get().workouts.length === 1) get().unlockAchievement("first-workout");
      },
      updateWorkout: (id, patch) => set((s) => ({
        workouts: s.workouts.map((w) => w.id === id ? { ...w, ...patch } : w)
      })),
      deleteWorkout: (id) => set((s) => ({ workouts: s.workouts.filter((w) => w.id !== id) })),
      upsertNutritionDay: (date, patch) => set((s) => {
        const existing = s.nutrition.find((n) => n.date === date);
        if (existing) {
          return {
            nutrition: s.nutrition.map(
              (n) => n.date === date ? { ...n, ...patch } : n
            )
          };
        }
        return {
          nutrition: [
            { date, calorieTarget: 2400, proteinTarget: 160, meals: [], ...patch },
            ...s.nutrition
          ]
        };
      }),
      addMeal: (date, meal) => {
        const m = { id: `m${Date.now()}`, ...meal };
        set((s) => {
          const existing = s.nutrition.find((n) => n.date === date);
          if (existing) {
            return {
              nutrition: s.nutrition.map(
                (n) => n.date === date ? { ...n, meals: [...n.meals, m] } : n
              )
            };
          }
          return {
            nutrition: [
              { date, calorieTarget: 2400, proteinTarget: 160, meals: [m] },
              ...s.nutrition
            ]
          };
        });
        get().awardXP(10, "meal");
      },
      deleteMeal: (date, mealId) => set((s) => ({
        nutrition: s.nutrition.map(
          (n) => n.date === date ? { ...n, meals: n.meals.filter((m) => m.id !== mealId) } : n
        )
      })),
      setDayCompleted: (date, completed) => set((s) => {
        const existing = s.nutrition.find((n) => n.date === date);
        if (existing) {
          return {
            nutrition: s.nutrition.map(
              (n) => n.date === date ? { ...n, completed } : n
            )
          };
        }
        return {
          nutrition: [
            { date, calorieTarget: 2400, proteinTarget: 160, meals: [], completed },
            ...s.nutrition
          ]
        };
      }),
      addPhoto: (p) => {
        set((s) => ({
          photos: [{ id: `ph${Date.now()}`, ...p }, ...s.photos]
        }));
        if (get().photos.length >= 10) get().unlockAchievement("10-photos");
        get().awardXP(20, "photo");
      },
      deletePhoto: (id) => set((s) => ({ photos: s.photos.filter((p) => p.id !== id) })),
      upsertDaily: (date, patch) => set((s) => {
        const existing = s.daily.find((d) => d.date === date);
        if (existing) {
          return {
            daily: s.daily.map((d) => d.date === date ? { ...d, ...patch } : d)
          };
        }
        return {
          daily: [
            {
              date,
              sleepHours: 0,
              waterLiters: 0,
              noSugar: false,
              noSoftDrinks: false,
              gym: false,
              ...patch
            },
            ...s.daily
          ]
        };
      }),
      addMetric: (m) => {
        set((s) => ({
          metrics: [m, ...s.metrics.filter((x) => x.date !== m.date)]
        }));
        if (m.bodyFatPct < 15) get().unlockAchievement("lean-machine");
        get().awardXP(15, "metric");
      },
      deleteMetric: (date) => set((s) => ({ metrics: s.metrics.filter((m) => m.date !== date) })),
      addHabit: (name) => set((s) => ({
        habits: [
          ...s.habits,
          { id: `h${Date.now()}`, name, streak: 0, lastDone: null }
        ]
      })),
      toggleHabit: (id) => {
        const today = todayISO();
        set((s) => ({
          habits: s.habits.map((h) => {
            if (h.id !== id) return h;
            if (h.lastDone === today) {
              return { ...h, streak: Math.max(0, h.streak - 1), lastDone: null };
            }
            return { ...h, streak: h.streak + 1, lastDone: today };
          })
        }));
        get().awardXP(5, "habit");
        const max = Math.max(...get().habits.map((h) => h.streak));
        if (max >= 7) get().unlockAchievement("7-day-streak");
        if (max >= 30) get().unlockAchievement("30-day-streak");
      },
      deleteHabit: (id) => set((s) => ({ habits: s.habits.filter((h) => h.id !== id) })),
      awardXP: (amount) => set((s) => {
        const newXP = s.xp + amount;
        const newLevel = Math.floor(newXP / 500) + 1;
        return { xp: newXP, level: newLevel };
      }),
      unlockAchievement: (id) => set((s) => ({
        achievements: s.achievements.map(
          (a) => a.id === id && !a.unlocked ? { ...a, unlocked: true, date: todayISO() } : a
        )
      })),
      resetAll: () => set(() => ({
        roadmap: defaultRoadmap.map((p) => ({
          ...p,
          status: "locked",
          progress: 0,
          expanded: false
        })),
        workouts: [],
        nutrition: [],
        photos: [],
        daily: [],
        metrics: [],
        habits: [
          { id: "h1", name: "No Sugar", streak: 0, lastDone: null },
          { id: "h2", name: "No Soft Drinks", streak: 0, lastDone: null },
          { id: "h3", name: "Gym Today", streak: 0, lastDone: null }
        ],
        achievements: defaultAchievements.map((a) => ({ ...a, unlocked: false, date: void 0 })),
        xp: 0,
        level: 1
      }))
    }),
    {
      name: "kds-fitness-store",
      storage: createJSONStorage(() => safeStorage())
    }
  )
);
const todaysDate = todayISO;
function ThemeProvider({ children }) {
  const theme = useAppStore((s) => s.theme);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transformation", label: "Transformation", icon: Route$b },
  { to: "/workouts", label: "Workouts", icon: Dumbbell },
  { to: "/nutrition", label: "Nutrition", icon: Apple },
  { to: "/photos", label: "Progress Photos", icon: Camera },
  { to: "/sleep-water", label: "Sleep & Water", icon: Moon },
  { to: "/habits", label: "Habit Tracker", icon: CheckCheck },
  { to: "/body-metrics", label: "Body Metrics", icon: Activity },
  { to: "/gamification", label: "Achievements", icon: Trophy }
];
function AppShell({ children }) {
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggleTheme, xp, level, habits } = useAppStore();
  const xpInLevel = xp % 500;
  const xpProgress = xpInLevel / 500 * 100;
  const maxStreak = habits.reduce((m, h) => Math.max(m, h.streak), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground relative overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-[-15%] left-[10%] w-[400px] h-[400px] bg-brand/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow", style: { animationDelay: "3s" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex fixed left-0 top-0 h-full w-20 border-r border-border bg-background/60 backdrop-blur-xl z-40 flex-col items-center py-6 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "size-12 rounded-xl bg-brand/15 border border-brand/40 flex items-center justify-center font-display text-2xl text-brand mb-4 hover:bg-brand/25 transition-colors", children: "K" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1.5 flex-1", children: navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.to;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: cn(
              "group relative size-12 rounded-xl flex items-center justify-center transition-all",
              active ? "bg-brand/15 text-brand" : "text-muted-foreground hover:bg-card hover:text-foreground"
            ),
            title: item.label,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5 transition-transform group-hover:scale-110", strokeWidth: 1.6 }),
              active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  layoutId: "active-indicator",
                  className: "absolute -left-px top-1/2 -translate-y-1/2 w-0.5 h-6 bg-brand rounded-r"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-full ml-3 px-2 py-1 rounded bg-card border border-border text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50", children: item.label })
            ]
          },
          item.to
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: toggleTheme,
          className: "size-12 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-card hover:text-foreground transition-colors",
          title: "Toggle theme",
          "aria-label": "Toggle theme",
          children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40",
          onClick: () => setMobileOpen(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.aside,
        {
          initial: { x: -280 },
          animate: { x: 0 },
          exit: { x: -280 },
          transition: { type: "spring", stiffness: 300, damping: 30 },
          className: "md:hidden fixed left-0 top-0 h-full w-72 bg-card border-r border-border z-50 flex flex-col py-6 px-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8 px-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-brand tracking-wider", children: "KDS FITNESS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMobileOpen(false), "aria-label": "Close menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1", children: navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: item.to,
                  onClick: () => setMobileOpen(false),
                  className: cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    active ? "bg-brand/15 text-brand border border-brand/30" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5", strokeWidth: 1.6 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: item.label })
                  ]
                },
                item.to
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: toggleTheme,
                className: "mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors",
                children: [
                  theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
                    "Toggle ",
                    theme === "dark" ? "Light" : "Dark",
                    " Mode"
                  ] })
                ]
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:pl-20 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 md:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 md:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "md:hidden size-10 rounded-lg flex items-center justify-center hover:bg-secondary",
              onClick: () => setMobileOpen(true),
              "aria-label": "Open menu",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex flex-col leading-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm tracking-tight", children: [
                "LVL ",
                level,
                " · ",
                level >= 10 ? "SUPER SAIYAN" : level >= 5 ? "ASCENDED" : "WARRIOR"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-32 sm:w-48 bg-secondary rounded-full overflow-hidden border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full bg-gradient-to-r from-brand to-blue-600",
                style: { boxShadow: "0 0 10px color-mix(in oklab, var(--brand) 60%, transparent)" },
                initial: { width: 0 },
                animate: { width: `${xpProgress}%` },
                transition: { duration: 1, ease: "easeOut" }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs font-bold hidden sm:inline", children: [
              xp,
              " XP"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 md:gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "size-3.5 text-warning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            maxStreak,
            "d"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-[calc(100vh-4rem)]", children })
    ] })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-display text-brand", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex mt-6 items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:opacity-90", children: "Go home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-md border border-border px-4 py-2 text-sm font-medium", children: "Home" })
    ] })
  ] }) });
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KDS Fitness — Build Your Dream Physique" },
      { name: "description", content: "Cinematic transformation system: workouts, nutrition, sleep, water, habits, body metrics, and a gamified roadmap to your dream physique." },
      { property: "og:title", content: "KDS Fitness — Build Your Dream Physique" },
      { property: "og:description", content: "Cinematic transformation system: workouts, nutrition, sleep, water, habits, body metrics, and a gamified roadmap to your dream physique." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "KDS Fitness — Build Your Dream Physique" },
      { name: "twitter:description", content: "Cinematic transformation system: workouts, nutrition, sleep, water, habits, body metrics, and a gamified roadmap to your dream physique." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5dca14d6-718f-4b74-8f71-66c5d9ac8c5a" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5dca14d6-718f-4b74-8f71-66c5d9ac8c5a" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", style: { colorScheme: "dark" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$a.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] }) });
}
const $$splitComponentImporter$8 = () => import("./workouts-BDz96tcN.mjs");
const Route$9 = createFileRoute("/workouts")({
  head: () => ({
    meta: [{
      title: "Workouts — KDS Fitness"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./transformation-CzdHCki9.mjs");
const Route$8 = createFileRoute("/transformation")({
  head: () => ({
    meta: [{
      title: "Transformation Roadmap — KDS Fitness"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./sleep-water-BUm1u2ey.mjs");
const Route$7 = createFileRoute("/sleep-water")({
  head: () => ({
    meta: [{
      title: "Sleep & Water — KDS Fitness"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const BASE_URL = "";
const Route$6 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/transformation", changefreq: "weekly", priority: "0.8" },
          { path: "/workouts", changefreq: "weekly", priority: "0.8" },
          { path: "/nutrition", changefreq: "weekly", priority: "0.8" },
          { path: "/photos", changefreq: "weekly", priority: "0.7" },
          { path: "/sleep-water", changefreq: "weekly", priority: "0.7" },
          { path: "/habits", changefreq: "weekly", priority: "0.7" },
          { path: "/body-metrics", changefreq: "weekly", priority: "0.7" },
          { path: "/gamification", changefreq: "weekly", priority: "0.6" }
        ];
        const urls = entries.map(
          (e) => `  <url>
    <loc>${BASE_URL}${e.path}</loc>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }
        });
      }
    }
  }
});
const $$splitComponentImporter$5 = () => import("./photos-U6UmCqcF.mjs");
const Route$5 = createFileRoute("/photos")({
  head: () => ({
    meta: [{
      title: "Progress Photos — KDS Fitness"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./nutrition-C88_q7gR.mjs");
const Route$4 = createFileRoute("/nutrition")({
  head: () => ({
    meta: [{
      title: "Nutrition — KDS Fitness"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./habits-B8KqvrOm.mjs");
const Route$3 = createFileRoute("/habits")({
  head: () => ({
    meta: [{
      title: "Habits — KDS Fitness"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./gamification-DZWO3V18.mjs");
const Route$2 = createFileRoute("/gamification")({
  head: () => ({
    meta: [{
      title: "System — KDS Fitness"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./body-metrics-B6p-mu66.mjs");
const Route$1 = createFileRoute("/body-metrics")({
  head: () => ({
    meta: [{
      title: "Body Metrics — KDS Fitness"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-I97air4s.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "KDS Fitness — Dashboard"
    }, {
      name: "description",
      content: "Your personal dream-physique transformation command center."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WorkoutsRoute = Route$9.update({
  id: "/workouts",
  path: "/workouts",
  getParentRoute: () => Route$a
});
const TransformationRoute = Route$8.update({
  id: "/transformation",
  path: "/transformation",
  getParentRoute: () => Route$a
});
const SleepWaterRoute = Route$7.update({
  id: "/sleep-water",
  path: "/sleep-water",
  getParentRoute: () => Route$a
});
const SitemapDotxmlRoute = Route$6.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$a
});
const PhotosRoute = Route$5.update({
  id: "/photos",
  path: "/photos",
  getParentRoute: () => Route$a
});
const NutritionRoute = Route$4.update({
  id: "/nutrition",
  path: "/nutrition",
  getParentRoute: () => Route$a
});
const HabitsRoute = Route$3.update({
  id: "/habits",
  path: "/habits",
  getParentRoute: () => Route$a
});
const GamificationRoute = Route$2.update({
  id: "/gamification",
  path: "/gamification",
  getParentRoute: () => Route$a
});
const BodyMetricsRoute = Route$1.update({
  id: "/body-metrics",
  path: "/body-metrics",
  getParentRoute: () => Route$a
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const rootRouteChildren = {
  IndexRoute,
  BodyMetricsRoute,
  GamificationRoute,
  HabitsRoute,
  NutritionRoute,
  PhotosRoute,
  SitemapDotxmlRoute,
  SleepWaterRoute,
  TransformationRoute,
  WorkoutsRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  cn as c,
  router as r,
  todaysDate as t,
  useAppStore as u
};
