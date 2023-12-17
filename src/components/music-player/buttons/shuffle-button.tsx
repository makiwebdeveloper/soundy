"use client";

import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShuffleIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props {
  isShuffle: boolean;
}

export default function ShuffleButton({ isShuffle }: Props) {
  const queryClient = useQueryClient();

  const { mutate: shuffle, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await axios.patch<{ isShuffle: boolean }>(
        "/api/tracks/play/shuffle"
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["playing track"]);
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
