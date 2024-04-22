import { AuthButton } from "@/components/feature/auth-btn";

export default async function IndexPage() {
  return (
    <article className="flex flex-col items-center h-screen max-w-7xl">
      <header className="w-full flex justify-end items-center py-2 ">
        <AuthButton />
      </header>
      <main className="h-full flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-balance">
          organize your week on Calendry
        </h1>
        <p className="text-balance max-w-xl text-center">
          Clendry is an open source calendar to organize your week
        </p>
      </main>
    </article>
  );
}
