"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { usePlayingTrackStore } from "@/hooks/use-playing-track-store";
import { TrackType } from "@/types/tracks.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LockIcon, PauseIcon, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileType } from "@/types/profiles.types";
import { formatNumber } from "@/utils/format-number";
import { cn } from "@/lib/cn";

interface Props {
  track: TrackType;
  profile: Pick<ProfileType, "id" | "name">;
}

export default function ProfileTrackItem({ track, profile }: Props) {
  const queryClient = useQueryClient();
  const {
    setTrackId,
    setStatus,
    status,
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
      queryClient.invalidateQueries([`track ${track.id}`]);
      setTrackId(track.id);
      setStatus("play");
    },
    onError: () => {
      setTrackId(null);
      setStatus("pause");
    },
  });

  return (
    <div className="group flex items-center gap-3 transition hover:bg-white/20 dark:hover:bg-black/40 p-2 rounded-md">
      <div className={`relative w-[80px] h-[80px] rounded-md z-[0]`}>
        <Image
          fill
          src={track.imageUrl}
          alt={track.title}
          className="object-cover rounded-md bg-white/20 dark:bg-black/20"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            setTrackId(track.id);
            if (status === "play" && playingTrackId === track.id) {
              setStatus("pause");
            } else {
              if (playingTrackId === track.id) {
                setStatus("play");
              } else {
                playTrack(track.id);
              }
            }
          }}
          disabled={isPlayTrackLoading}
          variant="ghost"
          className="hidden rounded-full group-hover:flex absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] w-[42px] h-[42px] p-0 flex-center bg-green-500/80 hover:bg-green-500"
        >
          {status === "play" && track.id === playingTrackId ? (
            <PauseIcon className="w-[28px] h-[28px] absolute top-[50%] translate-x-[-55%] left-[55%] translate-y-[-50%]" />
          ) : (
            <PlayIcon className="w-[28px] h-[28px] absolute top-[50%] translate-x-[-50%] left-[55%] translate-y-[-50%]" />
          )}
        </Button>
      </div>
      <div className="flex-1 flex flex-col">
        <Link
          href={`/profiles/${track.profileId}/tracks/${track.id}`}
          className="text-sm hover:underline underline-offset-2 w-fit"
        >
          {track.title}
        </Link>
        <Link
          href={`/profiles/${profile.id}`}
          passHref={true}
          className="w-fit text-sm text-white/70 dark:text-white/50 transition hover:underline underline-offset-2 hover:text-white dark:hover:text-white"
        >
          {profile.name}
        </Link>
        <div className="flex gap-2 items-center">
          <p className="flex items-center gap-2 text-white/70">
            <PlayIcon className="w-4 h-4" /> {formatNumber(4)}
          </p>
          <span className="text-white/70">·</span>
          <p className="text-white/70">{track.duration}</p>
          {!track.isPublic && (
            <>
              <span className="text-white/70">·</span>
              <LockIcon className="w-4 h-4 text-white/70" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
