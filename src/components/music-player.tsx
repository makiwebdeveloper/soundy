"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

interface Props {
  initialPlaingTrack: any;
}

/*
 * Реализовать запуск трека после нажатия с помощью какого то контекста
 */

export default function MusicPlayer({ initialPlaingTrack }: Props) {
  const { data } = useQuery({
    queryKey: ["playing track"],
    queryFn: async () => {
      const res = await axios.get("/api/tracks/play");
      return res.data;
    },
    initialData: { playingTrack: initialPlaingTrack },
  });

  if (!data?.playingTrack) {
    return null;
  }

  return (
    <div
      className={
        "fixed bottom-0 md:bottom-5 h-20 w-full md:w-[650px] lg:w-[800px] left-0 md:left-[50%] md:translate-x-[-50%] bg-white/20 dark:bg-black/20 backdrop-blur-md md:rounded-3xl border-t md:border border-white/40 dark:border-black/40 p-3"
      }
    >
      <div className="flex gap-2">
        <Link
          href={`/profiles/${data.playingTrack.profileId}/tracks/${data.playingTrack.trackId}`}
        >
          {data.playingTrack.track.title}
        </Link>
        <audio controls>
          <source src={data.playingTrack.track.audioUrl} />
        </audio>
      </div>
    </div>
  );
}
