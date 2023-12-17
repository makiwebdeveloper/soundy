"use client";

import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShuffleIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { useState } from "react";

interface Props {
  isShuffle: boolean;
}

export default function ShuffleButton({ isShuffle }: Props) {
  const queryClient = useQueryClient();

  const [value, setValue] = useState(isShuffle);

  const { mutate: shuffle, isLoading } = useMutation({
    mutationFn: async () => {
      setValue((prev) => !prev);

      const res = await axios.patch<{ isShuffle: boolean }>(
        "/api/tracks/play/shuffle"
      );

      return res.data;
    },
    onSuccess: ({ isShuffle }) => {
      setValue(isShuffle);
      queryClient.invalidateQueries(["playing track"]);
    },
    onError: () => {
      setValue(false);
    },
  });

  return (
    <button disabled={isLoading} onClick={() => shuffle()}>
      <ShuffleIcon
        className={cn(
          "w-4 h-4 cursor-pointer",
          value && "text-black/40 dark:text-green-400"
        )}
      />
    </button>
  );
}
