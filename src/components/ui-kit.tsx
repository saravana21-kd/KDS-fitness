import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  glow = false,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "glass rounded-2xl p-6 transition-shadow",
        hover && "hover:shadow-[0_8px_40px_-12px_color-mix(in_oklab,var(--brand)_30%,transparent)]",
        glow && "glow-accent",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-end justify-between gap-4 mb-8"
    >
      <div>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight uppercase">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </motion.div>
  );
}

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-4 md:px-8 lg:px-12 py-8 md:py-12 max-w-7xl mx-auto w-full"
    >
      {children}
    </motion.div>
  );
}
