import { createClient } from "@/lib/utils/supabase/server";
import { TagItem } from "./components/tag-item";
import { CreateTag } from "./components/create-tag";

export async function Tags() {
  const supabase = createClient();

  const {
    data: { user },
    error: errorGettingUser,
  } = await supabase.auth.getUser();
  if (errorGettingUser || !user) return <Error />;

  const { data: tags, error: errorGettingTags } = await supabase
    .from("tag")
    .select("*")
    .eq("profile_id", user?.id);
  if (errorGettingTags || !tags) return <Error />;

  return (
    <ul className="flex flex-col justify-center items-center w-full">
      {tags.length !== undefined &&
        tags.length > 0 &&
        tags.map((tag) => (
          <li key={tag.id} className="w-full">
            <TagItem tag={tag} />
          </li>
        ))}
      <CreateTag />
    </ul>
  );
}

function Error() {
  return <p>could not get tags, please reload the page</p>;
}
