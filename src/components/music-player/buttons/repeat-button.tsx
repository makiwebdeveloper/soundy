import { RepeatIcon, Repeat1Icon } from "lucide-react";
import { ContextRepeatType } from "@/types/tracks.types";

interface Props {
  type: ContextRepeatType;
}

export default function RepeatButton({}: Props) {
  return (
    <div>
      <RepeatIcon className="w-4 h-4 cursor-pointer" />
    </div>
  );
}
