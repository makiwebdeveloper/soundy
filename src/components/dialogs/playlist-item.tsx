import axios from "axios";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddToPlaylistValidatorType } from "@/lib/validators/playlists";
import { useToast } from "@/hooks/use-toast";
import { PlaylistWithTracksType } from "@/types/playlists.types";
import { Disc3Icon, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlaylistItem({
  playlist,
  trackId,
  profileId,
}: {
  playlist: PlaylistWithTracksType;
  trackId: number;
  profileId: number;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: togglePlaylistTrack, isLoading } = useMutation({
    mutationFn: async (values: AddToPlaylistValidatorType) => {
      await axios.post("/api/playlists/add", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`profile ${profileId} playlists`]);
      toast({
        title: "Successfully added track to playlist",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Failed to add track to playlist",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex gap-2">
        {playlist.tracks.length > 0 ? (
          <div className="relative w-[50px] h-[50px]">
            <Image
              fill
              src={playlist.tracks[0].imageUrl}
              alt={playlist.tracks[0].title}
              className="object-contain rounded-md bg-white/20 dark:bg-black/20"
            />
          </div>
        ) : (
          <div className="w-[50px] h-[50px] rounded-md bg-white/20 dark:bg-black/20"></div>
        )}
        <div className="flex flex-col justify-evenly">
          <p className="text-sm">{playlist.title}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-white/70 dark:text-white/50 flex items-center gap-1">
              <Disc3Icon className="w-4 h-4" />
              {playlist.tracks.length}
            </p>
            {!playlist.isPublic && (
              <LockIcon className="w-4 h-4 text-white/70 dark:text-white/50" />
            )}
          </div>
        </div>
      </div>
      <Button
        loading={isLoading}
        disabledLoadingIcon
        onClick={() =>
          togglePlaylistTrack({ playlistId: playlist.id, trackId })
        }
      >
        {playlist.tracks.find((track) => track.id === trackId)
          ? "Added"
          : "Add to playlist"}
      </Button>
    </div>
  );
}
