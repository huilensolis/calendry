import { CalendarAside } from "@/components/feature/calendar-aside";
import { CalendarFilters } from "@/components/feature/calendar-filters";
import { CalendarGrid } from "@/components/feature/calendar-grid";
import { protectPageFromUnauthenticated } from "@/lib/guards/server/authenticated";

export default async function appPage() {
  await protectPageFromUnauthenticated();
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-full h-screen max-w-72 border-r border-neutral-300">
        <CalendarAside />
      </div>
      <section className="h-full w-full">
        <header className="w-full border-b border-neutral-300 p-6 flex justify-end">
          <CalendarFilters />
        </header>
        <CalendarGrid />
      </section>
    </div>
  );
}
