import { cn } from "@/lib/utils/cn";
import { LabelHTMLAttributes, ReactNode, forwardRef } from "react";

type TProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export const Label = forwardRef<HTMLLabelElement, TProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <label ref={ref} className={cn("text-md", className)} {...props}>
        {children}
      </label>
    );
  },
);
