import { Database } from "@/lib/utils/supabase/types";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui/context-menu/context-menu.component";
import { ToggleVisibility } from "./components/toggle-visibility/toggle-visibility.component";
import { OptionsMenu } from "./components/options-menu";

type TProps = {
  tag: Database["public"]["Tables"]["tag"]["Row"];
};

export function TagItem({ tag }: TProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-full font-medium flex justify-between items-center gap-2 rounded-md px-2 py-1 transition-all duration-150 hover:bg-neutral-100">
        <div>
          <h1>{tag.name}</h1>
        </div>
        <div>
          <ToggleVisibility />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <OptionsMenu tag={tag} />
      </ContextMenuContent>
    </ContextMenu>
  );
}
