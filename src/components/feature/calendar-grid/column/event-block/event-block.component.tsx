import { Database } from "@/lib/utils/supabase/types";

type TProps = {
  event: Database["public"]["Tables"]["event"]["Row"];
  maxDescriptionLength?: number;
};

export function EventBlock({ event, maxDescriptionLength = 30 }: TProps) {
  return (
    <article className="w-full h-full bg-purple-300 flex gap-1 rounded-md">
      <hr className="h-full w-2 bg-purple-400 rounded-l-md"></hr>
      <header className="flex flex-col gap-1 l flex-1">
        <h1 className="font-bold">{event.title}</h1>
        {event.description && (
          <p>
            {event.description.slice(0, maxDescriptionLength)}
            {event.description.slice(0, maxDescriptionLength).length <
              event.description.length && <span>...</span>}
          </p>
        )}
        <p>
          end date hours:{new Date(event.end_date).getHours()}, end date
          minutes:
          {new Date(event.end_date).getMinutes()}
        </p>
      </header>
    </article>
  );
}
