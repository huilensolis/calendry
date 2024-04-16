import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu/context-menu.component";
import { Database } from "@/lib/utils/supabase/types";
import { DeleteBtn } from "./components/delete-btn";
import { EditBtn } from "./components/edit-btn";
export function OptionsMenu({
  tag,
}: {
  tag: Database["public"]["Tables"]["tag"]["Row"];
}) {
  return (
    <>
      <ContextMenuItem inset>
        <EditBtn tag={tag} />
      </ContextMenuItem>
      <ContextMenuItem inset>
        <DeleteBtn tagId={tag.id} />
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger inset>Colour</ContextMenuSubTrigger>
        <ContextMenuSubContent className="w-48">
          <ContextMenuItem>Colour 1</ContextMenuItem>
          <ContextMenuItem>Colour 2</ContextMenuItem>
          <ContextMenuItem>Colour 3</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </>
  );
}
