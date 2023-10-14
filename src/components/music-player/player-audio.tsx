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

interface Props {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  track: Pick<TrackType, "audioUrl" | "duration">;
  volume: number;
  currentTime: number;
  setCurrentTime: (v: number) => void;
  durationSeconds: number;
}

export default function PlayerAudio({
  audioRef,
  track,
  volume,
  currentTime,
  setCurrentTime,
  durationSeconds,
}: Props) {
  const { status, toggleStatus } = usePlayingTrackStore();

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
        <button className="w-7 h-7 flex-center">
          <SkipBackIcon className="w-4 h-4" />
        </button>
        <button
          className="transition flex-center rounded-full "
          onClick={toggleStatus}
        >
          {status === "play" ? (
            <PauseCircleIcon className="w-7 h-7" />
          ) : (
            <PlayCircleIcon className="w-7 h-7" />
          )}
        </button>
        <button className="w-7 h-7 flex-center">
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
