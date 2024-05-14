"use client";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { usePlayingTrackStore } from "@/hooks/use-playing-track-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ListeningTrackType } from "@/types/listenings.types";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { LockIcon, PauseIcon, PlayIcon } from "lucide-react";

interface Props {
  listening: ListeningTrackType;
}

export default function HistoryTrackItem({ listening: { track } }: Props) {
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
        { trackId, history: true }
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["playing track"]);
      setTrackId(track.id);
      setStatus("play");
    },
    onError: () => {
      setTrackId(null);
      setStatus("pause");
    },
  });

  return (
    <Link
      href={`/profiles/${track.profileId}/tracks/${track.id}`}
      className={cn(
        "group relative w-[100px] sm:w-[125px] md:w-full h-[100px] sm:h-[125px] lg:h-[135px] 2xl:h-[180px]",
        "after:absolute after:rounded-md after:content-[''] after:w-full after:h-full hover:after:bg-gradient-to-t hover:after:from-black/90 hover:after:to-black/20 hover:after:transition"
      )}
    >
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
        className="w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] hidden rounded-full group-hover:flex absolute z-[10] top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] p-0 flex-center bg-green-500/80 hover:bg-green-500"
      >
        {status === "play" && track.id === playingTrackId ? (
          <PauseIcon className="w-[30px] h-[30px] 2xl:w-[38px] 2xl:h-[38px] absolute top-[50%] translate-x-[-55%] left-[55%] translate-y-[-50%]" />
        ) : (
          <PlayIcon className="w-[30px] h-[30px] 2xl:w-[38px] 2xl:h-[38px] absolute top-[50%] translate-x-[-50%] left-[55%] translate-y-[-50%]" />
        )}
      </Button>
      <div className="absolute hidden group-hover:block z-[10] bottom-1 left-2">
        <p className="truncate w-[80px] sm:w-[100px] lg:w-[118px] 2xl:w-[160px] text-xs 2xl:text-base font-semibold ">
          {track.title}
        </p>
      </div>
      {!track.isPublic && (
        <div className="absolute z-[10] top-1 right-1 w-7 h-7 bg-black/80 flex-center rounded-full">
          <LockIcon className="w-3 h-3" />
        </div>
      )}
    </Link>
  );
}
