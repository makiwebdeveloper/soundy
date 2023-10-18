"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../ui/button";
import axios from "axios";
import { FavoriteTrackType } from "@/types/tracks.types";
import { useMemo } from "react";
import { HeartHandshakeIcon, HeartIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface Props {
  trackId: number;
  initialFavoriteTrack: FavoriteTrackType | undefined;
}

export default function ToggleFavoriteButton({
  trackId,
  initialFavoriteTrack,
}: Props) {
  const queryClient = useQueryClient();

  const { data: favoriteTrackData } = useQuery({
    queryKey: [`favorite track ${trackId}`],
    queryFn: async () => {
      const res = await axios.get<{
        favoriteTrack: FavoriteTrackType | undefined;
      }>(`/api/tracks/favorites/${trackId}`);
      return res.data;
    },
    initialData: { favoriteTrack: initialFavoriteTrack },
  });

  const isFavoriteTrack = useMemo(
    () => (favoriteTrackData?.favoriteTrack ? true : false),
    [favoriteTrackData]
  );

  const { mutate: toggleFavorite, isLoading: isToggleFavoriteLoading } =
    useMutation({
      mutationFn: async (trackId: number) => {
        await axios.post("/api/tracks/favorites", { trackId });
      },
      onSuccess: () => {
        queryClient.invalidateQueries([`favorite track ${trackId}`]);
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
