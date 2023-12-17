"use client";

import axios from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ShuffleIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props {
  isShuffle: boolean;
}

export default function ShuffleButton({ isShuffle: initialIsShuffle }: Props) {
  const [isShuffle, setIsShuffle] = useState(initialIsShuffle);

  const { mutate: shuffle, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await axios.patch<{ isShuffle: boolean }>(
        "/api/tracks/play/shuffle"
      );

      setIsShuffle(res.data.isShuffle);

      return res.data;
    },
  });

  return (
    <button disabled={isLoading} onClick={() => shuffle()}>
      <ShuffleIcon
        className={cn(
          "w-4 h-4 cursor-pointer",
          isShuffle && "text-black/40 dark:text-green-400"
        )}
      />
    </button>
  );
}
