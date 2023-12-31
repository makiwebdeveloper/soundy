"use client";

import { FullTrackType } from "@/types/tracks.types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  track: Pick<FullTrackType, "id" | "title" | "imageUrl" | "profile">;
}

export default function PlayerInfo({ track }: Props) {
  return (
    <Link
      passHref
      href={`/profiles/${track.profile.id}/tracks/${track.id}`}
      className="transition w-[60px] md:w-[150px] cursor-pointer bg-white/20 dark:bg-black/30 hover:bg-white/30 hover:dark:bg-black/40 rounded-md flex items-center gap-2 px-2"
    >
      <div className="relative mx-auto md:mx-0 w-[40px] h-[40px]">
        <Image
          fill
          src={track.imageUrl}
          alt={track.title}
          className="object-contain rounded-md bg-white/20 dark:bg-black/20"
        />
      </div>
      <div className="hidden md:block w-[80px]">
        <p className="text-sm truncate">{track.title}</p>
        <p className="text-xs text-white/70 dark:text-white/50 truncate">
          {track.profile.name}
        </p>
      </div>
    </Link>
  );
}
