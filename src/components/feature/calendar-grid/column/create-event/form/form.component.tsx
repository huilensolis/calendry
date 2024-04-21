"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label/label.component";
import { ValidationError } from "@/components/ui/validation-error";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEventStore } from "@/stores/events";
import { TTimeSpan } from "@/lib/types/time-span";
import { getWeekDayName } from "@/lib/dates/get-week-day-name";
import { createClient } from "@/lib/utils/supabase/client";

type TFormAreas = {
  title: string;
};

export function CreateEventForm({
  timeSpan,
  date,
}: {
  timeSpan: TTimeSpan;
  date: Date;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTimeSpan, setSelectedTimeSpan] = useState<TTimeSpan>(timeSpan);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TFormAreas>({ mode: "onChange" });

  async function createEvent(data: TFormAreas) {
    const { title } = data;

    const start_date = new Date(date);
    const [startHour, startMinutes] = selectedTimeSpan.start.split(":");
    start_date.setHours(Number(startHour), Number(startMinutes), 0);

    const end_date = new Date(date);
    const [endHour, endMinutes] = selectedTimeSpan.end.split(":");
    end_date.setHours(Number(endHour), Number(endMinutes), 0);

    const supabase = createClient();

    try {
      setIsLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("no user found");

      const { error } = await supabase.from("event").insert({
        title,
        start_date: start_date.toISOString(),
        end_date: end_date.toISOString(),
        profile_id: user.id,
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  const timeSpans = useEventStore((state) => state.timeSpans);

  function handleSelectStartTime(value: TTimeSpan["start"]) {
    setSelectedTimeSpan({ ...selectedTimeSpan, start: value });
  }
  function handleSelectEndTime(value: TTimeSpan["start"]) {
    setSelectedTimeSpan({ ...selectedTimeSpan, end: value });
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(createEvent)}>
      <section className="flex flex-col">
        <fieldset>
          <Label>Title</Label>
          <Input
            type="text"
            {...register("title", {
              maxLength: {
                value: 40,
                message: "Max title length is 40 characteres",
              },
              required: { value: true, message: "Title is required" },
            })}
          />
          {errors.title?.message && (
            <ValidationError>{errors.title.message}</ValidationError>
          )}
        </fieldset>
        <fieldset>
          <Label>Start time</Label>
          <Select onValueChange={handleSelectStartTime}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={timeSpan.start} />
            </SelectTrigger>
            <SelectContent>
              {timeSpans.map((time, i) => (
                <SelectItem
                  value={time}
                  key={i}
                  onClick={(e) => console.log(e)}
                >
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </fieldset>
        <fieldset>
          <Label>End time</Label>
          <Select onValueChange={handleSelectEndTime}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                defaultValue={timeSpan.end}
                placeholder={timeSpan.end}
              />
            </SelectTrigger>
            <SelectContent>
              {timeSpans.map((time, i) => (
                <SelectItem value={time} key={i}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </fieldset>
        <span>
          {getWeekDayName({ date: date })} {date.getDate()}
        </span>
      </section>
      <Button
        type="submit"
        disabled={isLoading || !isValid}
        loading={isLoading}
      >
        Create
      </Button>
    </form>
  );
}
