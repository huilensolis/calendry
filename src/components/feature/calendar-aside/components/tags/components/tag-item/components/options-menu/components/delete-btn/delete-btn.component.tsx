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
import { Database } from "@/lib/utils/supabase/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ValidationError } from "@/components/ui/validation-error";
import { deleteTag } from "@/components/feature/calendar-aside/components/tags/actions/delete";

export function DeleteBtn({
  tagId,
}: {
  tagId: Database["public"]["Tables"]["tag"]["Row"]["id"];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  const router = useRouter();

  async function handleSubmit() {
    setLoading(true);

    try {
      await deleteTag({ tagId });

      setError(false);
      setLoading(false);
      router.refresh();
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-start">Delete</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete tag</DialogTitle>
          <DialogDescription>
            This action is not reversible. Are you sure you want to permanently
            delete this tag?
          </DialogDescription>
          {error && (
            <ValidationError>
              There has been an error, please try again
            </ValidationError>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            variant="destructive"
            loading={loading}
            disabled={loading}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
