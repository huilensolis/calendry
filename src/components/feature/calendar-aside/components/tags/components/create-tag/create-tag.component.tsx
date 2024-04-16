"use client";

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
import { Plus } from "lucide-react";
import { createTag } from "../../actions";
import { useForm } from "react-hook-form";
import { ValidationError } from "@/components/ui/validation-error";
import { useRouter } from "next/navigation";

type TFormData = {
  name: string;
};

export function CreateTag() {
  const router = useRouter();

  async function handleCreateTag(data: TFormData) {
    await createTag({ name: data.name });
    router.refresh();
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TFormData>({ mode: "onBlur" });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full py-2.5 h-max gap-2 text-neutral-500 hover:text-neutral-950 transition-colors duration-150"
          >
            <Plus /> Create Tag
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form
            onSubmit={handleSubmit(handleCreateTag)}
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
