import axios from "axios";
import { useState } from "react";
import { RepeatIcon, Repeat1Icon } from "lucide-react";
import { ContextRepeatType } from "@/types/tracks.types";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/cn";

interface Props {
  type: ContextRepeatType;
}

export default function RepeatButton({ type: initialType }: Props) {
  const [type, setType] = useState(initialType);

  const { mutate: changeRepeat, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await axios.patch<{ repeat: ContextRepeatType }>(
        "/api/tracks/play/repeat"
      );

      setType(res.data.repeat);

      return res.data;
    },
  });

  return (
    <button disabled={isLoading} onClick={() => changeRepeat()}>
      {type !== "REPEAT-TRACK" ? (
        <RepeatIcon
          className={cn(
            "w-4 h-4 cursor-pointer",
            type === "REPEAT-ALL" && "text-black/40 dark:text-green-400"
          )}
        />
      ) : (
        <Repeat1Icon className="w-4 h-4 cursor-pointer text-black/40 dark:text-green-400" />
      )}
    </button>
  );
}
