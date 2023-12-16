"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  CollectionsItemType,
  CollectionsType,
} from "./profile-collections-list";
import { Button } from "@/components/ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";
import { usePlayingTrackStore } from "@/hooks/use-playing-track-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/cn";
import { IPlayingContext } from "@/types/playing-contexts.types";

interface Props {
  type: CollectionsType;
  item: CollectionsItemType;
  context: IPlayingContext;
}

export default function ProfileCollectionsItem({ type, item, context }: Props) {
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
        { trackId, ...context }
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["playing track"]);
      setTrackId(item.id);
      setStatus("play");
    },
    onError: () => {
      setTrackId(null);
      setStatus("pause");
    },
  });

  if (type === "tracks" || type === "favorites") {
    return (
      <div className="group relative w-[100px] sm:w-[125px] md:w-full h-[100px] sm:h-[125px] lg:h-[135px] 2xl:h-[180px]">
        <Image
          fill
          src={item.imageUrl}
          alt={item.title}
          className="object-cover rounded-md bg-white/20 dark:bg-black/20"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            setTrackId(item.id);
            if (status === "play" && playingTrackId === item.id) {
              setStatus("pause");
            } else {
              if (playingTrackId === item.id) {
                setStatus("play");
              } else {
                playTrack(item.id);
              }
            }
          }}
          disabled={isPlayTrackLoading}
          variant="ghost"
          className="w-[60px] h-[60px] hidden rounded-full group-hover:flex absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] p-0 flex-center bg-green-500/80 hover:bg-green-500"
        >
          {status === "play" && item.id === playingTrackId ? (
            <PauseIcon className="w-[38px] h-[38px] absolute top-[50%] translate-x-[-55%] left-[55%] translate-y-[-50%]" />
          ) : (
            <PlayIcon className="w-[38px] h-[38px] absolute top-[50%] translate-x-[-50%] left-[55%] translate-y-[-50%]" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <Link
      href={`/profiles/${item.profile.id}/${type}/${item.id}`}
      className={cn(
        "relative w-[100px] sm:w-[125px] md:w-full h-[100px] sm:h-[125px] md:h-[125px] lg:h-[135px] 2xl:h-[180px]",
        "after:absolute after:rounded-md after:content-[''] after:w-full after:h-full hover:after:bg-black/40 hover:after:transition"
      )}
    >
      <Image
        fill
        src={item.imageUrl}
        alt={item.title}
        className="object-cover rounded-md bg-white/20 dark:bg-black/20"
      />
    </Link>
  );
}
