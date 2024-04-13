import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center gap-4">
        {user.email}!
        <form action={signOut}>
          <Button variant="outline">Logout</Button>
        </form>
      </div>
      <Link
        href="/protected"
        className="underline hover:brightness-90 text-sm font-medium transition-colors text-neutral-950 py-2 px-4"
      >
        Launch app
      </Link>
    </div>
  ) : (
    <Link
      href="/login"
      className="underline hover:brightness-90 text-sm font-medium transition-colors text-neutral-950 py-2 px-4"
    >
      Login
    </Link>
  );
}
