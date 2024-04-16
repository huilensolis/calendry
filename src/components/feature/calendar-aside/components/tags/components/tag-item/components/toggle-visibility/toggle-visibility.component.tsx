"use client";
import { EyeToggle } from "@/components/ui/eye-toggle/eye-toggle.component";
import { useState } from "react";

export function ToggleVisibility() {
  const [isTagHidden, setTagHidden] = useState(false);

  function handleToggleEye() {
    setTagHidden(!isTagHidden);
  }

  return <EyeToggle isActive={!isTagHidden} onClick={handleToggleEye} />;
}
