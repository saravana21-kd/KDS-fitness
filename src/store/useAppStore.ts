import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const safeStorage = () => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return window.localStorage;
};

export type Theme = "dark" | "light";

export interface Profile {
  height: number; // cm
  weight: number; // kg
  bodyFatPct: number;
  fatMass: number;
  category: string;
}

export interface DreamPhysique {
  inspiration: string;
  goalWeight: number;
  goalBodyFatPct: number;
  deadlineYears: number;
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
  progress: number;
  notes: string;
  expanded: boolean;
}

export interface WorkoutSet {
  reps: number;
  weight: number;
}
export interface ExerciseLog {
  id: string;
  name: string;
  sets: WorkoutSet[];
}
export interface WorkoutEntry {
  id: string;
  date: string; // ISO
  title: string;
  exercises: ExerciseLog[];
  notes: string;
}

export type MealType = "breakfast" | "lunch" | "snack" | "dinner";
export interface MealEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  type?: MealType;
}
export interface NutritionDay {
  date: string;
  calorieTarget: number;
  proteinTarget: number;
  carbTarget?: number;
  fatTarget?: number;
  manualCal?: number;
  manualP?: number;
  manualC?: number;
  manualF?: number;
  meals: MealEntry[];
  completed?: boolean;
}

export interface ProgressPhoto {
  id: string;
  date: string;
  dataUrl: string;
  caption: string;
}

export interface DailyHabit {
  date: string;
  sleepHours: number;
  waterLiters: number;
  noSugar: boolean;
  noSoftDrinks: boolean;
  gym: boolean;
}

export interface BodyMetric {
  date: string;
  weight: number;
  bodyFatPct: number;
  waist: number;
  shoulder: number;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  lastDone: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  date?: string;
}

interface AppState {
  theme: Theme;
  profile: Profile;
  dream: DreamPhysique;
  roadmap: RoadmapPhase[];
  workouts: WorkoutEntry[];
  nutrition: NutritionDay[];
  photos: ProgressPhoto[];
  daily: DailyHabit[];
  metrics: BodyMetric[];
  habits: Habit[];
  achievements: Achievement[];
  xp: number;
  level: number;

  toggleTheme: () => void;
  updateProfile: (p: Partial<Profile>) => void;
  updateDream: (d: Partial<DreamPhysique>) => void;

  addPhase: () => void;
  updatePhase: (id: string, patch: Partial<RoadmapPhase>) => void;
  deletePhase: (id: string) => void;

  addWorkout: (w: Omit<WorkoutEntry, "id">) => void;
  updateWorkout: (id: string, patch: Partial<WorkoutEntry>) => void;
  deleteWorkout: (id: string) => void;

  upsertNutritionDay: (date: string, patch: Partial<NutritionDay>) => void;
  addMeal: (date: string, meal: Omit<MealEntry, "id">) => void;
  deleteMeal: (date: string, mealId: string) => void;
  setDayCompleted: (date: string, completed: boolean) => void;

  addPhoto: (p: Omit<ProgressPhoto, "id">) => void;
  deletePhoto: (id: string) => void;

  upsertDaily: (date: string, patch: Partial<DailyHabit>) => void;

  addMetric: (m: BodyMetric) => void;
  deleteMetric: (date: string) => void;

  addHabit: (name: string) => void;
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;

  awardXP: (amount: number, reason?: string) => void;
  unlockAchievement: (id: string) => void;
  resetAll: () => void;
}

const todayISO = () => new Date().toISOString().slice(0, 10);

const defaultRoadmap: RoadmapPhase[] = [
  {
    id: "p1",
    title: "Foundation Phase",
    description: "Correct posture, build core stability, master compound lifts.",
    status: "completed",
    progress: 100,
    notes: "Squat / Bench / Deadlift form locked in.",
    expanded: false,
  },
  {
    id: "p2",
    title: "Fat Loss Phase",
    description: "Aggressive but sustainable deficit. Reveal underlying muscle.",
    status: "in-progress",
    progress: 35,
    notes: "Target: 15% body fat. 180g+ protein daily.",
    expanded: true,
  },
  {
    id: "p3",
    title: "Lean Bulk Phase",
    description: "Controlled surplus. Maximize hypertrophy with minimal fat gain.",
    status: "locked",
    progress: 0,
    notes: "Goal: +4kg lean mass over 6 months.",
    expanded: false,
  },
  {
    id: "p4",
    title: "Final Aesthetic Cut",
    description: "Single-digit body fat reveal. Hrithik-level conditioning.",
    status: "locked",
    progress: 0,
    notes: "Peak the physique.",
    expanded: false,
  },
];

const defaultAchievements: Achievement[] = [
  { id: "first-workout", title: "First Rep", description: "Log your first workout.", unlocked: false },
  { id: "7-day-streak", title: "Week Warrior", description: "7-day gym streak.", unlocked: false },
  { id: "30-day-streak", title: "Iron Discipline", description: "30-day gym streak.", unlocked: false },
  { id: "10-photos", title: "Visual Progress", description: "Upload 10 progress photos.", unlocked: false },
  { id: "hydration-hero", title: "Hydration Hero", description: "Hit 4L water 7 days in a row.", unlocked: false },
  { id: "lean-machine", title: "Lean Machine", description: "Drop below 15% body fat.", unlocked: false },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      profile: {
        height: 175,
        weight: 71,
        bodyFatPct: 19.3,
        fatMass: 13.5,
        category: "Average",
      },
      dream: {
        inspiration: "Hrithik Roshan",
        goalWeight: 70,
        goalBodyFatPct: 11,
        deadlineYears: 3,
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
        { id: "h3", name: "Gym Today", streak: 0, lastDone: null },
      ],
      achievements: defaultAchievements,
      xp: 0,
      level: 1,

      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),

      updateProfile: (p) =>
        set((s) => ({ profile: { ...s.profile, ...p } })),
      updateDream: (d) => set((s) => ({ dream: { ...s.dream, ...d } })),

      addPhase: () =>
        set((s) => ({
          roadmap: [
            ...s.roadmap,
            {
              id: `p${Date.now()}`,
              title: "New Phase",
              description: "Describe this phase.",
              status: "locked",
              progress: 0,
              notes: "",
              expanded: true,
            },
          ],
        })),
      updatePhase: (id, patch) =>
        set((s) => ({
          roadmap: s.roadmap.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      deletePhase: (id) =>
        set((s) => ({ roadmap: s.roadmap.filter((p) => p.id !== id) })),

      addWorkout: (w) => {
        const id = `w${Date.now()}`;
        set((s) => ({ workouts: [{ id, ...w }, ...s.workouts] }));
        get().awardXP(50, "workout");
        if (get().workouts.length === 1) get().unlockAchievement("first-workout");
      },
      updateWorkout: (id, patch) =>
        set((s) => ({
          workouts: s.workouts.map((w) => (w.id === id ? { ...w, ...patch } : w)),
        })),
      deleteWorkout: (id) =>
        set((s) => ({ workouts: s.workouts.filter((w) => w.id !== id) })),

      upsertNutritionDay: (date, patch) =>
        set((s) => {
          const existing = s.nutrition.find((n) => n.date === date);
          if (existing) {
            return {
              nutrition: s.nutrition.map((n) =>
                n.date === date ? { ...n, ...patch } : n
              ),
            };
          }
          return {
            nutrition: [
              { date, calorieTarget: 2400, proteinTarget: 160, meals: [], ...patch },
              ...s.nutrition,
            ],
          };
        }),
      addMeal: (date, meal) => {
        const m: MealEntry = { id: `m${Date.now()}`, ...meal };
        set((s) => {
          const existing = s.nutrition.find((n) => n.date === date);
          if (existing) {
            return {
              nutrition: s.nutrition.map((n) =>
                n.date === date ? { ...n, meals: [...n.meals, m] } : n
              ),
            };
          }
          return {
            nutrition: [
              { date, calorieTarget: 2400, proteinTarget: 160, meals: [m] },
              ...s.nutrition,
            ],
          };
        });
        get().awardXP(10, "meal");
      },
      deleteMeal: (date, mealId) =>
        set((s) => ({
          nutrition: s.nutrition.map((n) =>
            n.date === date ? { ...n, meals: n.meals.filter((m) => m.id !== mealId) } : n
          ),
        })),
      setDayCompleted: (date, completed) =>
        set((s) => {
          const existing = s.nutrition.find((n) => n.date === date);
          if (existing) {
            return {
              nutrition: s.nutrition.map((n) =>
                n.date === date ? { ...n, completed } : n
              ),
            };
          }
          return {
            nutrition: [
              { date, calorieTarget: 2400, proteinTarget: 160, meals: [], completed },
              ...s.nutrition,
            ],
          };
        }),

      addPhoto: (p) => {
        set((s) => ({
          photos: [{ id: `ph${Date.now()}`, ...p }, ...s.photos],
        }));
        if (get().photos.length >= 10) get().unlockAchievement("10-photos");
        get().awardXP(20, "photo");
      },
      deletePhoto: (id) =>
        set((s) => ({ photos: s.photos.filter((p) => p.id !== id) })),

      upsertDaily: (date, patch) =>
        set((s) => {
          const existing = s.daily.find((d) => d.date === date);
          if (existing) {
            return {
              daily: s.daily.map((d) => (d.date === date ? { ...d, ...patch } : d)),
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
                ...patch,
              },
              ...s.daily,
            ],
          };
        }),

      addMetric: (m) => {
        set((s) => ({
          metrics: [m, ...s.metrics.filter((x) => x.date !== m.date)],
        }));
        if (m.bodyFatPct < 15) get().unlockAchievement("lean-machine");
        get().awardXP(15, "metric");
      },
      deleteMetric: (date) =>
        set((s) => ({ metrics: s.metrics.filter((m) => m.date !== date) })),

      addHabit: (name) =>
        set((s) => ({
          habits: [
            ...s.habits,
            { id: `h${Date.now()}`, name, streak: 0, lastDone: null },
          ],
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
          }),
        }));
        get().awardXP(5, "habit");
        const max = Math.max(...get().habits.map((h) => h.streak));
        if (max >= 7) get().unlockAchievement("7-day-streak");
        if (max >= 30) get().unlockAchievement("30-day-streak");
      },
      deleteHabit: (id) =>
        set((s) => ({ habits: s.habits.filter((h) => h.id !== id) })),

      awardXP: (amount) =>
        set((s) => {
          const newXP = s.xp + amount;
          const newLevel = Math.floor(newXP / 500) + 1;
          return { xp: newXP, level: newLevel };
        }),
      unlockAchievement: (id) =>
        set((s) => ({
          achievements: s.achievements.map((a) =>
            a.id === id && !a.unlocked
              ? { ...a, unlocked: true, date: todayISO() }
              : a
          ),
        })),
      resetAll: () =>
        set(() => ({
          roadmap: defaultRoadmap.map((p) => ({
            ...p,
            status: "locked" as const,
            progress: 0,
            expanded: false,
          })),
          workouts: [],
          nutrition: [],
          photos: [],
          daily: [],
          metrics: [],
          habits: [
            { id: "h1", name: "No Sugar", streak: 0, lastDone: null },
            { id: "h2", name: "No Soft Drinks", streak: 0, lastDone: null },
            { id: "h3", name: "Gym Today", streak: 0, lastDone: null },
          ],
          achievements: defaultAchievements.map((a) => ({ ...a, unlocked: false, date: undefined })),
          xp: 0,
          level: 1,
        })),
    }),
    {
      name: "kds-fitness-store",
      storage: createJSONStorage(() => safeStorage() as Storage),
    }
  )
);

export const todaysDate = todayISO;
