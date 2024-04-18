import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu/context-menu.component";
import { CreateEventSheet } from "../create-event";
import { TTimeSpan } from "@/lib/types/time-span";

export function TimeBlock({
  timeSpan,
  date,
}: {
  timeSpan: TTimeSpan;
  date: Date;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-full h-full">
        <div className="w-full h-full"></div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <CreateEventSheet timeSpan={timeSpan} date={date} />
      </ContextMenuContent>
    </ContextMenu>
  );
}
