"use client";

import { editTag } from "@/components/feature/calendar-aside/components/tags/actions/edit";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label/label.component";
import { ValidationError } from "@/components/ui/validation-error";
import { Database } from "@/lib/utils/supabase/types";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type TFormData = {
  name: string;
};

export function EditBtn({
  tag,
}: {
  tag: Database["public"]["Tables"]["tag"]["Row"];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  const router = useRouter();

  async function handleEditTag(data: TFormData) {
    if (!data.name) return;

    setLoading(true);
    try {
      const name = data.name;

      await editTag({ name, tagId: tag.id });

      setError(false);
      setLoading(false);
      router.refresh();
    } catch (error) {
      setError(true);
    }
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TFormData>({ mode: "onBlur" });

  const tagName = useMemo(() => tag.name, [tag.name]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full text-start">Edit</button>
        </DialogTrigger>
        <DialogContent>
          <form
            onSubmit={handleSubmit(() => {
              console.log("submitting");
            })}
            className="flex flex-col gap-2"
          >
            <DialogHeader>
              <DialogTitle>Create New Tag</DialogTitle>
              <DialogDescription>
                Create a new tag to link to your events.
              </DialogDescription>
              <Label htmlFor="name">Name</Label>
              <Input
                placeholder="Birthday"
                {...register("name", {
                  required: { message: "Tag name is required", value: true },
                  maxLength: {
                    value: 30,
                    message: "Tag Name cannot be grater than 30",
                  },
                })}
              />
              {errors.name?.message && (
                <ValidationError>{errors.name.message}</ValidationError>
              )}
            </DialogHeader>
            <DialogFooter>
              <Button type="submit" disabled={!isValid}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
