"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PlayCircleIcon } from "lucide-react";

interface Props {
  trackId: number;
}

export default function PlayTrackButton({ trackId }: Props) {
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
    <Button
      onClick={() => playTrack(trackId)}
      loading={isPlayTrackLoading}
      disabledLoadingIcon
    >
      <PlayCircleIcon className="mr-2 w-4 h-4" /> Play
    </Button>
  );
}
