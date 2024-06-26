"use client";

import Image from "next/image";
import Link from "next/link";
import { PauseIcon, PlayIcon, Trash2Icon } from "lucide-react";
import { TrackWithListeningsType } from "@/types/albums.types";
import { ProfileType } from "@/types/profiles.types";
import { formatNumber } from "@/utils/format-number";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePlayingTrackStore } from "@/hooks/use-playing-track-store";
import axios from "axios";
import { cn } from "@/lib/cn";
import { PlaylistWithTracksType } from "@/types/playlists.types";

interface Props {
  track: TrackWithListeningsType;
  profile: Pick<ProfileType, "id" | "name">;
  playlist: Pick<PlaylistWithTracksType, "id" | "profileId">;
}

export default function PlaylistTrackItem({ track, profile, playlist }: Props) {
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
        { trackId, playlistId: playlist.id }
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

  const { mutate: deleteListening, isLoading: isDeleteLoading } = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/playlists/delete", {
        trackId: track.id,
        playlistId: playlist.id,
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`playlist ${playlist.id}`]);
    },
  });

  return (
    <div
      className={cn(
        "group flex items-center gap-3 transition hover:bg-white/20 dark:hover:bg-black/40 p-2 rounded-md",
        playingTrackId === track.id && "bg-white/20 dark:bg-black/40"
      )}
    >
      <div className="relative w-[40px] h-[40px]">
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
          className="hidden rounded-full group-hover:flex absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] w-[26px] h-[26px] p-0 flex-center bg-green-500/80 hover:bg-green-500"
        >
          {status === "play" && track.id === playingTrackId ? (
            <PauseIcon className="w-[16px] h-[16px] absolute top-[50%] translate-x-[-55%] left-[55%] translate-y-[-50%]" />
          ) : (
            <PlayIcon className="w-[16px] h-[16px] absolute top-[50%] translate-x-[-50%] left-[55%] translate-y-[-50%]" />
          )}
        </Button>
      </div>
      <div className="flex-1 flex items-center gap-3">
        <Link
          href={`/profiles/${profile.id}`}
          className="text-sm text-white/70 dark:text-white/50 transition hover:underline underline-offset-2 hover:text-white dark:hover:text-white"
        >
          {profile.name}
        </Link>
        <Link
          href={`/profiles/${profile.id}/tracks/${track.id}`}
          className="text-sm hover:underline underline-offset-2"
        >
          {track.title}
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <p className="flex items-center gap-2 text-white/70">
          <PlayIcon className="w-4 h-4" />{" "}
          {formatNumber(track.listenings.length)}
        </p>
        <button
          disabled={isDeleteLoading}
          onClick={() => deleteListening()}
          className="w-6 h-6 flex items-center justify-center text-white/70 transition hover:text-red-400 dark:hover:text-red-500"
        >
          <Trash2Icon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
