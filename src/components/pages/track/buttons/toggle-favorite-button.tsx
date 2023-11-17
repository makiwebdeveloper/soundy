"use client";

import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { HeartHandshakeIcon, HeartIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props {
  trackId: number;
  isFavoriteTrack: boolean;
}

export default function ToggleFavoriteButton({
  trackId,
  isFavoriteTrack,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate: toggleFavorite, isLoading: isToggleFavoriteLoading } =
    useMutation({
      mutationFn: async (trackId: number) => {
        await axios.post("/api/tracks/favorites", { trackId });
      },
      onSuccess: () => {
        queryClient.invalidateQueries([`track ${trackId}`]);
      },
    });

  return (
    <Button
      onClick={() => toggleFavorite(trackId)}
      loading={isToggleFavoriteLoading}
      disabledLoadingIcon
      className={cn(
        isFavoriteTrack &&
          "bg-pink-400/80 hover:bg-pink-400 dark:bg-pink-400/80 dark:hover:bg-pink-400"
      )}
    >
      {isFavoriteTrack ? (
        <HeartHandshakeIcon className="mr-2 w-4 h-4" />
      ) : (
        <HeartIcon className="mr-2 w-4 h-4" />
      )}{" "}
      {isFavoriteTrack ? "Liked" : "Like"}
    </Button>
  );
}
