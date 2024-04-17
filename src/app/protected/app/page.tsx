import { CalendarAside } from "@/components/feature/calendar-aside";
import { CalendarFilters } from "@/components/feature/calendar-filters";
import { CalendarGrid } from "@/components/feature/calendar-grid";
import { protectPageFromUnauthenticated } from "@/lib/guards/server/authenticated";

export default async function appPage() {
  await protectPageFromUnauthenticated();
  return (
    <div className="flex w-full">
      <div className="w-full h-screen max-w-72 border-r border-neutral-200">
        <CalendarAside />
      </div>
      <section className="h-full w-full overflow-y-auto">
        <header className="w-full bg-neutral-50 border-b border-neutral-200 p-6 flex justify-end sticky top-0">
          <CalendarFilters />
        </header>
        <CalendarGrid />
      </section>
    </div>
  );
}
