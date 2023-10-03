import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white/20 text-white border-white/40 hover:bg-white/40 dark:bg-black/40 dark:text-white dark:hover:bg-black/60 dark:border-black",
        secondary:
          "bg-white hover:bg-white/80 text-black/80 dark:bg-black dark:hover:bg-black/80 dark:text-white",
        destructive: "bg-red-500 text-zinc-50 hover:bg-red-500/90",
        ghost: "",
        link: "w-full px-4 py-2 rounded-md transition hover:bg-white/10 dark:hover:bg-black/30",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  border?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      border,
      children,
      loading,
      disabled,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          border && "border"
        )}
        ref={ref}
        {...props}
        disabled={disabled || loading}
      >
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
