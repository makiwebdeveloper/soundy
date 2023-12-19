"use client";

import { PlayingContextType, TrackType } from "@/types/tracks.types";
import { formatTime } from "@/utils/format-time";
import {
  Loader2,
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
import { RepeatButton, ShuffleButton } from "./buttons";

interface Props {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  track: Pick<TrackType, "audioUrl" | "duration" | "id">;
  volume: number;
  currentTime: number;
  setCurrentTime: (v: number) => void;
  durationSeconds: number;
  isPlayingTrackLoading: boolean;
  playingContext: PlayingContextType;
}

export default function PlayerAudio({
  audioRef,
  track,
  volume,
  currentTime,
  setCurrentTime,
  durationSeconds,
  isPlayingTrackLoading,
  playingContext,
}: Props) {
  const queryClient = useQueryClient();
  const { status, toggleStatus, setTrackId, setStatus } =
    usePlayingTrackStore();

  const { mutate: playNextTrack, isLoading: isNextTrackLoading } = useMutation({
    mutationFn: async () => {
      const res = await axios.post<{ playingTrackId: number; trackId: number }>(
        "/api/tracks/play/next"
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

  const { mutate: playPrevTrack, isLoading: isPrevTrackLoading } = useMutation({
    mutationFn: async () => {
      const res = await axios.post<{ playingTrackId: number; trackId: number }>(
        "/api/tracks/play/prev"
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

  const isLoading =
    isNextTrackLoading || isPrevTrackLoading || isPlayingTrackLoading;

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
        onEnded={() => {
          if (!audioRef.current) return;
          if (playingContext.repeat === "REPEAT-TRACK") {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            audioRef.current.currentTime = 0;
            playNextTrack();
          }
        }}
      ></audio>
      <div className="flex-center gap-2">
        <ShuffleButton isShuffle={playingContext.isShuffle} />
        <button
          disabled={isLoading}
          onClick={() => playPrevTrack()}
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
          {isLoading ? (
            <div className="rounded-full w-7 h-7 flex-center">
              <Loader2
                className={cn(
                  "w-4 h-4 animate-spin text-zinc-600 dark:text-zinc-300"
                )}
              />
            </div>
          ) : status === "play" ? (
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
        <RepeatButton type={playingContext.repeat} />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[70px] flex-center">
          <p className="text-sm">{formatTime(Math.floor(currentTime))}</p>
        </div>
        {durationSeconds ? (
          <Slider
            className="w-full"
            trackStyles="h-[7px] md:h-[5px]"
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
