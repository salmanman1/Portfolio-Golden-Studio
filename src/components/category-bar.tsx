
"use client";

import { CATEGORIES } from "@/lib/video-data";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function CategoryBar() {
  const [active, setActive] = useState("All");

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 sm:gap-8 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "relative py-2 px-1 text-sm sm:text-base font-medium uppercase tracking-[0.2em] transition-all duration-300",
                active === cat 
                  ? "text-primary font-bold" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
              {active === cat && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
