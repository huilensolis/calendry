import { CalendarAside } from "@/components/feature/calendar-aside";
import { CalendarFilters } from "@/components/feature/calendar-filters";
import { CalendarGrid } from "@/components/feature/calendar-grid";
import { EventsLoadingState } from "@/components/feature/events-loading-state";
import { protectPageFromUnauthenticated } from "@/lib/guards/server/authenticated";

export default async function appPage() {
  await protectPageFromUnauthenticated();
  return (
    <div className="flex w-full">
      <div className="w-full h-screen max-w-72 border-r border-neutral-200">
        <CalendarAside />
      </div>
      <section className="h-full w-full overflow-y-auto">
        <header className="w-full bg-neutral-50 border-b border-neutral-200 p-6 flex justify-between gap-2 items-center sticky top-0">
          <EventsLoadingState />
          <CalendarFilters />
        </header>
        <CalendarGrid />
      </section>
    </div>
  );
}
