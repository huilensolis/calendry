"use client";

import { useFormStatus } from "react-dom";
import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { signUp } from "../../actions/sign-up";

type TProps = ComponentProps<"button">;
export function SignUpBtn({ ...props }: TProps) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button
      type="submit"
      loading={isPending}
      disabled={isPending}
      variant="outline"
      formAction={signUp}
    >
      Sign Up
    </Button>
  );
}
