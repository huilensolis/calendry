"use server";

import { generateRandomColor } from "@/lib/utils/random-color";
import { createClient } from "@/lib/utils/supabase/server";

export async function createTag({ name }: { name: string }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("tag")
    .insert({ name, profile_id: user.id, colour: generateRandomColor(name) });

  if (error) throw new Error("erro creating tag");

  return;
}
