import { cn } from "@/lib/utils/cn";
import { Eye, EyeOff } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

type TEyeToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
};

export const EyeToggle = forwardRef<HTMLButtonElement, TEyeToggleProps>(
  ({ isActive = false, className, ...props }: TEyeToggleProps, ref) => {
    return (
      <button
        className={cn(
          "hover:bg-neutral-100 transition-colors duration-150 p-2 rounded-md text-neutral-400 hover:text-neutral-950",
          className,
        )}
        {...props}
        ref={ref}
      >
        {isActive ? <Eye /> : <EyeOff />}
      </button>
    );
  },
);
