import { AuthButton } from "@/components/feature/auth-btn";

export default async function IndexPage() {
  return (
    <article className="flex flex-col items-center h-screen max-w-7xl">
      <header className="w-full flex justify-end items-center py-2 ">
        <AuthButton />
      </header>
      <main className="h-full flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-balance">
          Spend 5 minutes, save hours
        </h1>
        <p className="text-balance max-w-xl text-center">
          Clendry is an open source calendar that saves you time, with minimal
          time spent organizating and full week organization.
        </p>
      </main>
    </article>
  );
}
