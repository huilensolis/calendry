"use client";

import { cn } from "@/lib/utils/cn";
import { Column } from "../../column";
import { TimeAside } from "../../time-aside";
import { useWeekViewStore } from "@/stores/week-view";
import { getWeekDayName } from "@/lib/dates/get-week-day-name";
import { createClient } from "@/lib/utils/supabase/client";
import { useEffect } from "react";

export function WeekView() {
  const weekDates = useWeekViewStore((state) => state.weekDates);
  const pushWeekEvent = useWeekViewStore((state) => state.pushWeekEvent);
  const weekEvents = useWeekViewStore((state) => state.thisWeekEvents);

  const weekDaysNames = weekDates.map((day) => getWeekDayName({ date: day }));

  useEffect(() => {
    async function getEvents() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + 1);

      const startOfNextWeek = new Date(today);
      startOfNextWeek.setDate(today.getDate() - today.getDay() + 1 + 7);

      const { data, error } = await supabase
        .from("event")
        .select("*")
        .eq("profile_id", user.id)
        .gte("start_date", startOfWeek.toDateString())
        .lt("start_date", startOfNextWeek.toDateString());

      if (error || !data?.length) return;

      for (const event of data) {
        pushWeekEvent(event);
      }
    }
    getEvents();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex bg-neutral-100 border-b border-neutral-200 sticky top-[73px]">
        <span className="py-2 w-16 text-end pr-1 border-r border-neutral-200">
          GTM-3
        </span>
        <ul className={`w-full flex-1 grid grid-cols-7`}>
          {weekDaysNames.map((dayName, i) => (
            <li key={i} className="flex flex-col h-full">
              <header
                className={cn(
                  "py-2 text-center border-r border-neutral-200",
                  `${
                    weekDates[i].getDate() === new Date().getDate() &&
                    "bg-primary text-primary-foreground"
                  }`,
                )}
              >
                {dayName} {weekDates[i].getDate()}
              </header>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex">
        <div className="w-16 border-r border-neutral-200">
          <TimeAside />
        </div>
        <ul className={`w-full flex-1 grid grid-cols-7 overflow-auto`}>
          {weekDates.map((date, i) => (
            <li key={i} className="w-full">
              <Column
                date={date}
                events={weekEvents.filter((event) => {
                  const eventStartDate = new Date(event.start_date);

                  if (eventStartDate.getDay() === date.getDay()) {
                    return event;
                  }
                })}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
