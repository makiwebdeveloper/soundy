"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/cn";

interface Props {
  trackStyles?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & Props
>(({ className, trackStyles, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center transition-all",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "cursor-pointer relative h-[5px] w-full grow overflow-hidden rounded-full bg-black/20 dark:bg-black/40",
        trackStyles
      )}
    >
      <SliderPrimitive.Range className="absolute h-full bg-white" />
    </SliderPrimitive.Track>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
