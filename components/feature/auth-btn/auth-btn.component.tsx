import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
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
        className="bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 px-4 nline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Launch app
      </Link>
    </div>
  ) : (
    <Link
      href="/login"
      className="bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 px-4 nline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    >
      Login
    </Link>
  );
}
