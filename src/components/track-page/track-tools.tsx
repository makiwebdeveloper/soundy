"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  BadgeInfoIcon,
  CopyPlusIcon,
  HeartHandshakeIcon,
  HeartIcon,
  Link2Icon,
  PlayCircleIcon,
  PlayIcon,
} from "lucide-react";
import { useMemo } from "react";

interface Props {
  trackId: number;
}

export default function TrackTools({ trackId }: Props) {
  const queryClient = useQueryClient();

  const { mutate: playTrack, isLoading: isPlayTrackLoading } = useMutation({
    mutationFn: async (trackId: number) => {
      const res = await axios.post<{ playingTrackId: number }>(
        "/api/tracks/play",
        { trackId }
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["playing track"]);
    },
  });

  const { data: favoriteTrackData } = useQuery({
    queryKey: [`favorite track ${trackId}`],
    queryFn: async () => {
      const res = await axios.get<{
        favoriteTrack:
          | {
              id: number;
              profileId: number;
              trackId: number;
            }
          | undefined;
      }>(`/api/tracks/favorites/${trackId}`);
      return res.data;
    },
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
      },
    });

  return (
    <div className="flex gap-3">
      <Button
        onClick={() => playTrack(trackId)}
        loading={isPlayTrackLoading}
        disabledLoadingIcon
      >
        <PlayCircleIcon className="mr-2 w-4 h-4" /> Play
      </Button>
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
      <Button>
        <Link2Icon className="mr-2 w-4 h-4" />
        Copy link
      </Button>
      <Button>
        <CopyPlusIcon className="mr-2 w-4 h-4" />
        Add to playlist
      </Button>
      <Button>
        <BadgeInfoIcon className="mr-2 w-4 h-4" />
        Details
      </Button>
    </div>
  );
}
