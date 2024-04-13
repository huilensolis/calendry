import { protectPageFromUnauthenticated } from "@/lib/guards/server/authenticated";

export default async function appPage() {
  await protectPageFromUnauthenticated();
  return <h1>app Page</h1>;
}
