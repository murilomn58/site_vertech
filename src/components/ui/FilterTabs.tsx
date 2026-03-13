"use client";
import { cn } from "@/lib/utils";

type FilterTabsProps = {
  tabs: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
};

export default function FilterTabs({ tabs, active, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-heading font-medium transition-all duration-300",
            active === tab.key
              ? "bg-cyan text-bg-dark"
              : "bg-white/5 text-off-white/60 hover:bg-white/10 hover:text-off-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
