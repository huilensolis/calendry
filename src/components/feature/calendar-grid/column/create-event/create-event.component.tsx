import { CalendarPlus } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CreateEventForm } from "./form";
import { TTimeSpan } from "@/lib/types/time-span";

export function CreateEventSheet({
  timeSpan,
  date,
}: {
  timeSpan: TTimeSpan;
  date: Date;
}) {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="w-full rounded-none justify-start">
            <CalendarPlus /> Create Event
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create Event</SheetTitle>
          </SheetHeader>
          <CreateEventForm timeSpan={timeSpan} date={date} />
        </SheetContent>
      </Sheet>
    </>
  );
}
