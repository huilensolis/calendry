import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, ReactNode } from "react";

type TProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function ValidationError({ children, className, ...props }: TProps) {
  return (
    <p className={cn("text-sm text-neutral-800", className)} {...props}>
      {children}
    </p>
  );
}
