"use client";

import { FullTrackType } from "@/types/tracks.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { HeartIcon, PlayIcon } from "lucide-react";

interface Props {
  initialTrack: FullTrackType;
}

export default function TrackPopularity({ initialTrack }: Props) {
  const { data: track } = useQuery({
    queryKey: [`track ${initialTrack.id}`],
    queryFn: async () => {
      const res = await axios.get<{ track: FullTrackType }>(
        `/api/tracks?trackId=${initialTrack.id}`
      );
      return res.data.track;
    },
    initialData: initialTrack,
  });
  return (
    <div className="flex items-center gap-4">
      <p className="flex items-center gap-2 text-white/70 dark:text-white/50">
        <PlayIcon className="w-4 h-4" /> {track.listenings.length}
      </p>
      <p className="flex items-center gap-2 text-white/70 dark:text-white/50">
        <HeartIcon className="w-4 h-4" />
        {track.favoriteTracks.length}
      </p>
    </div>
  );
}
