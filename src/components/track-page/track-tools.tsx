"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  BadgeInfoIcon,
  CopyPlusIcon,
  HeartIcon,
  Link2Icon,
  PlayCircleIcon,
  PlayIcon,
} from "lucide-react";

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

  return (
    <div className="flex gap-3">
      <Button
        onClick={() => playTrack(trackId)}
        loading={isPlayTrackLoading}
        disabledLoadingIcon
      >
        <PlayCircleIcon className="mr-2 w-4 h-4" /> Play
      </Button>
      <Button>
        <HeartIcon className="mr-2 w-4 h-4" /> Like
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
