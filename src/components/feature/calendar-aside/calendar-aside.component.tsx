import { CurrentDate } from "./components/current-date";
import { Tags } from "./components/tags";

export function CalendarAside() {
  return (
    <aside className="w-full h-full">
      <header className="p-6 border-b border-neutral-300">
        <CurrentDate />
      </header>
      <div className="w-full flex flex-col justify-center py-2 px-3">
        <Tags />
      </div>
    </aside>
  );
}
