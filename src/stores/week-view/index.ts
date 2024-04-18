import { create } from "zustand";

type TWeekViewStore = {
  weekDates: Date[];
};

const today = new Date();
const startOfWeek = new Date(today);
startOfWeek.setDate(today.getDate() - today.getDay() + 1);

const weekDays: Date[] = [];

for (let i = 0; i < 7; i++) {
  const current = new Date(startOfWeek);
  current.setDate(startOfWeek.getDate() + i);

  weekDays.push(current);
}

export const useWeekViewStore = create<TWeekViewStore>((set, get) => ({
  weekDates: weekDays,
}));
