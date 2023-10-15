import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

interface Props {
  className?: string;
  wrapperStyles?: string;
}

export default function Loader({ className, wrapperStyles }: Props) {
  return (
    <div className={cn("bg-white p-2 rounded-full", wrapperStyles)}>
      <Loader2
        className={cn("w-4 h-4 animate-spin text-zinc-600", className)}
      />
    </div>
  );
}
