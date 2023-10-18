"use client";

import { Button } from "@/components/ui/button";
import { usePlayingTrackStore } from "@/hooks/use-playing-track-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PauseCircleIcon, PlayCircleIcon } from "lucide-react";

interface Props {
  trackId: number;
}

export default function PlayTrackButton({ trackId }: Props) {
  const queryClient = useQueryClient();
  const {
    setTrackId,
    setStatus,
    status,
    toggleStatus,
    trackId: playingTrackId,
  } = usePlayingTrackStore();

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
      queryClient.invalidateQueries([`track ${trackId}`]);
      setTrackId(trackId);
      setStatus("play");
    },
    onError: () => {
      setTrackId(null);
      setStatus("pause");
    },
  });

  if (status === "play" && trackId === playingTrackId) {
    return (
      <Button onClick={toggleStatus} disabledLoadingIcon>
        <PauseCircleIcon className="mr-2 w-4 h-4" /> Pause
      </Button>
    );
  }

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
