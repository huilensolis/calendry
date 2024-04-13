import Link from "next/link";
import { GithubAuthBtn } from "./components/github-auth-btn";
import { Button } from "@/components/ui/button";
import { SignUpBtn } from "./components/sign-up-btn/sign-up-btn.component";
import { SignInBtn } from "./components/sign-in-btn/sign-in-btn.component";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center items-center min-h-screen gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <fieldset className="flex flex-col">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border"
            name="email"
            placeholder="you@example.com"
            required
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </fieldset>
        <SignInBtn>Sign In</SignInBtn>
        <SignUpBtn>Sign Up</SignUpBtn>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
        <span className="text-center">or</span>
        <GithubAuthBtn />
      </form>
    </div>
  );
}
