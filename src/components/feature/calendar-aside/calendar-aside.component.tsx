import { CurrentDate } from "./components/current-date";

export function CalendarAside() {
  return (
    <aside className="w-full h-full">
      <header className="p-6 border-b border-neutral-300">
        <CurrentDate />
      </header>
    </aside>
  );
}
