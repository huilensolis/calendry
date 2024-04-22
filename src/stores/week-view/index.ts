import { Database } from "@/lib/utils/supabase/types";
import { create } from "zustand";

type TWeekViewStore = {
  weekDates: Date[];
  thisWeekEvents: Database["public"]["Tables"]["event"]["Row"][];
  pushWeekEvent: (event: Database["public"]["Tables"]["event"]["Row"]) => void;
  deleteWeekEvent: (
    eventId: Database["public"]["Tables"]["event"]["Row"]["id"],
  ) => void;
  updateWeekEvent: (
    event: Database["public"]["Tables"]["event"]["Row"],
  ) => void;
  isFetchingEvents: boolean;
  toggleIsFetchingEvents: () => void;
};

const today = new Date();
const startOfWeek = new Date(today);
function getDay(date: Date) {
  return date.getDay() === 0 ? 7 : date.getDay();
}
startOfWeek.setDate(today.getDate() - getDay(today) + 1);

const weekDays: Date[] = [];

for (let i = 0; i < 7; i++) {
  const current = new Date(startOfWeek);
  current.setDate(startOfWeek.getDate() + i);

  weekDays.push(current);
}

export const useWeekViewStore = create<TWeekViewStore>((set, get) => ({
  weekDates: weekDays,
  thisWeekEvents: [],
  pushWeekEvent: (event) =>
    set({ thisWeekEvents: [...get().thisWeekEvents, event] }),
  deleteWeekEvent: (eventId) => {
    const currentWeekEvents = get().thisWeekEvents;

    const indexOfEvent = currentWeekEvents.findIndex(
      (eventInStore) => eventInStore.id === eventId,
    );

    if (indexOfEvent === -1) return;

    currentWeekEvents.splice(indexOfEvent, 1);

    set({ thisWeekEvents: currentWeekEvents });
  },
  updateWeekEvent: (event) => {
    const currentWeekEvents = get().thisWeekEvents;

    const indexOfEvent = currentWeekEvents.findIndex(
      (eventInStore) => eventInStore.id === event.id,
    );

    if (indexOfEvent === -1) return;

    currentWeekEvents.splice(indexOfEvent, 1, event);

    set({ thisWeekEvents: currentWeekEvents });
  },
  isFetchingEvents: false,
  toggleIsFetchingEvents: () =>
    set({ isFetchingEvents: !get().isFetchingEvents }),
}));
