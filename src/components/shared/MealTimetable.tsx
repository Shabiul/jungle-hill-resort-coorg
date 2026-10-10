import type { MealTime } from "@/types";
import { cn } from "@/lib/utils";

interface MealTimetableProps {
  meals: MealTime[];
  hours: string;
  tone?: "light" | "dark";
}

/** Restaurant timetable: open hours on top, then each meal and its window. */
export function MealTimetable({ meals, hours, tone = "light" }: MealTimetableProps) {
  const line = tone === "light" ? "border-pearl/20" : "border-night/25";
  return (
    <div>
      <p className="label-mono opacity-75">Open daily</p>
      <p className="mt-1 font-display text-4xl">{hours}</p>
      <dl className={cn("mt-6 border-t", line)}>
        {meals.map((meal) => (
          <div
            key={meal.name}
            className={cn(
              "flex items-baseline justify-between gap-6 border-b py-3",
              line,
            )}
          >
            <dt>{meal.name}</dt>
            <dd className="label-mono shrink-0">{meal.time}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
