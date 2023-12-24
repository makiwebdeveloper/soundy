import { cn } from "@/lib/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white/40 dark:bg-black/40",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
