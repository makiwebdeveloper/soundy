import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

interface Props {
  className?: string;
}

export default function Loader({ className }: Props) {
  return (
    <div className="bg-white p-2 rounded-full">
      <Loader2
        className={cn("w-4 h-4 animate-spin text-zinc-600", className)}
      />
    </div>
  );
}
