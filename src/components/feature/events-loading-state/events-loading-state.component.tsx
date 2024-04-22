"use client";

import { useWeekViewStore } from "@/stores/week-view";

export function EventsLoadingState() {
  const isFetching = useWeekViewStore((state) => state.isFetchingEvents);

  if (isFetching) {
    return <p>loading events...</p>;
  }

  return <p></p>;
}
