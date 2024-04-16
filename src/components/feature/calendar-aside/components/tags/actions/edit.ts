"use server";

import { createClient } from "@/lib/utils/supabase/server";

export async function editTag({
  tagId,
  name,
}: {
  tagId: string;
  name: string;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("tag")
    .update({ name: name })
    .eq("profile_id", user.id)
    .eq("id", tagId);

  if (error) throw new Error("error deleting tag, something went wrong");
}
