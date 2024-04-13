import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

export async function protectPageFromUnauthenticated() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }
}
