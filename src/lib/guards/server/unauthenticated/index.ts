import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export async function protectPageFromAunthenticated() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/protected/app");
  }
}
