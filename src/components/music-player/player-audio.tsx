"use client";

import { TrackType } from "@/types/tracks.types";
import { formatTime } from "@/utils/format-time";
import {
  PauseCircleIcon,
  PlayCircleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { usePlayingTrackStore } from "@/hooks/use-playing-track-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { cn } from "@/lib/cn";

interface Props {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  track: Pick<TrackType, "audioUrl" | "duration" | "id">;
  volume: number;
  currentTime: number;
  setCurrentTime: (v: number) => void;
  durationSeconds: number;
  isPlayingTrackLoading: boolean;
}

export default function PlayerAudio({
  audioRef,
  track,
  volume,
  currentTime,
  setCurrentTime,
  durationSeconds,
  isPlayingTrackLoading,
}: Props) {
  const queryClient = useQueryClient();
  const { status, toggleStatus, setTrackId, setStatus } =
    usePlayingTrackStore();

  const { mutate: playNextTrack, isLoading: isPlayTrackLoading } = useMutation({
    mutationFn: async () => {
      const res = await axios.post<{ playingTrackId: number; trackId: number }>(
        "/api/tracks/play/next",
        { trackId: track.id }
      );
      return res;
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(["playing track"]);
      queryClient.invalidateQueries([`track ${data.trackId}`]);
      setTrackId(data.trackId);
      setStatus("play");
    },
    onError: () => {
      setTrackId(null);
      setStatus("pause");
    },
  });

  const isLoading = isPlayTrackLoading || isPlayingTrackLoading;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="metadata"
        onCanPlay={(e) => (e.currentTarget.volume = volume)}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
        }}
      ></audio>
      <div className="flex-center gap-2">
        <button
          disabled={isLoading}
          className={cn("w-7 h-7 flex-center", isLoading && "text-white/50")}
        >
          <SkipBackIcon className="w-4 h-4" />
        </button>
        <button
          className="transition flex-center rounded-full "
          onClick={() => {
            toggleStatus();
            setTrackId(track.id);
          }}
        >
          {status === "play" ? (
            <PauseCircleIcon
              className={cn("w-7 h-7 ", isLoading && "text-white/50")}
            />
          ) : (
            <PlayCircleIcon
              className={cn("w-7 h-7 ", isLoading && "text-white/50")}
            />
          )}
        </button>
        <button
          disabled={isLoading}
          onClick={() => playNextTrack()}
          className={cn("w-7 h-7 flex-center", isLoading && "text-white/50")}
        >
          <SkipForwardIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[70px] flex-center">
          <p className="text-sm">{formatTime(Math.floor(currentTime))}</p>
        </div>
        {durationSeconds ? (
          <Slider
            className="w-full"
            min={0}
            max={durationSeconds}
            value={[currentTime]}
            onValueChange={(v) => {
              if (!audioRef.current) return;
              audioRef.current.currentTime = v[0];
              setCurrentTime(v[0]);
            }}
          />
        ) : (
          <Slider className="w-full" min={0} max={100} value={[0]} />
        )}
        <div className="w-[70px] flex-center">
          <p className="text-sm">{track.duration}</p>
        </div>
      </div>
    </div>
  );
}
