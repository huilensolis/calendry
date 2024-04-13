"use client";

import { useFormStatus } from "react-dom";
import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "../../actions/sign-in";

type TProps = ComponentProps<"button">;

export function SignInBtn({ ...props }: TProps) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button
      type="submit"
      loading={isPending}
      disabled={isPending}
      variant="default"
      formAction={signIn}
    >
      Sign In
    </Button>
  );
}
