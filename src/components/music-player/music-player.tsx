"use client";

import axios from "axios";
import { FullPlayingTrackType } from "@/types/tracks.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { usePlayingTrackStore } from "@/hooks/use-playing-track-store";
import PlayerInfo from "./player-info";
import PlayerVolume from "./player-volume";
import PlayerAudio from "./player-audio";
import { formatTimeToSeconds } from "@/utils/format-time";

interface Props {
  initialPlaingTrack: any;
}

export default function MusicPlayer({ initialPlaingTrack }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { status } = usePlayingTrackStore();

  const [volume, setVolume] = useState(0.8);
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(volume);

  const [durationSeconds, setDurationSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { data, isLoading } = useQuery<{
    playingTrack: FullPlayingTrackType | undefined;
  }>({
    queryKey: ["playing track"],
    queryFn: async () => {
      const res = await axios.get<{
        playingTrack: FullPlayingTrackType | undefined;
      }>("/api/tracks/play");

      return res.data;
    },
    initialData: { playingTrack: initialPlaingTrack },
  });

  useEffect(() => {
    if (!audioRef.current || !data.playingTrack) return;
    setDurationSeconds(formatTimeToSeconds(data.playingTrack.track.duration));
  }, [audioRef.current, data]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (status === "play") {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [status, data]);

  if (!data?.playingTrack) {
    return (
      <div
        className={
          "fixed flex items-center justify-center gap-3 bottom-0 md:bottom-5 h-20 w-full md:w-[650px] lg:w-[800px] left-0 md:left-[50%] md:translate-x-[-50%] bg-white/20 dark:bg-black/50 md:dark:bg-black/20 backdrop-blur-md md:rounded-3xl border-t md:border border-white/40 dark:border-black/40 p-3"
        }
      >
        <p className="text-sm text-white dark:text-white/80">
          Try playing some track. It's worth it!
        </p>
      </div>
    );
  }

  const { track, playingContext } = data.playingTrack;

  function handleVolumeChange(volumeValue: number) {
    if (!audioRef.current) return;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  }

  function toggleMute() {
    if (!audioRef.current) return;
    if (audioRef.current.volume !== 0) {
      audioRef.current.volume = 0;
      setVolumeBeforeMute(volume);
      setVolume(0);
    } else {
      audioRef.current.volume = volumeBeforeMute;
      setVolume(volumeBeforeMute);
    }
  }

  return (
    <div
      className={
        "fixed flex gap-3 bottom-0 md:bottom-5 h-20 w-full md:w-[650px] lg:w-[800px] left-0 md:left-[50%] md:translate-x-[-50%] bg-white/20 dark:bg-black/50 md:dark:bg-black/20 backdrop-blur-md md:rounded-3xl border-t md:border border-white/40 dark:border-black/40 p-3"
      }
    >
      <PlayerInfo track={track} />
      <PlayerAudio
        audioRef={audioRef}
        track={track}
        volume={volume}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        durationSeconds={durationSeconds}
        isPlayingTrackLoading={isLoading}
        playingContext={playingContext}
      />
      <PlayerVolume
        volume={volume}
        toggleMute={toggleMute}
        handleVolumeChange={handleVolumeChange}
      />
    </div>
  );
}
