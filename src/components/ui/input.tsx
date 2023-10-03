import * as React from "react";

import { cn } from "@/lib/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  border?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, border, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-white/40 bg-white/20 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-black/40 dark:placeholder:text-white/40",
          border && "border",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
