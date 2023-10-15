"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CloudOffIcon, CopyPlusIcon, Disc3Icon, LockIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { PlaylistWithTracksType } from "@/types/playlists.types";
import CreatePlaylistForm from "../forms/create-playlist-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { AddToPlaylistValidatorType } from "@/lib/validators/playlists";
import { useToast } from "@/hooks/use-toast";

interface Props {
  trackId: number;
  initialPlaylists: PlaylistWithTracksType[];
}

export default function AddToPlaylistDialog({
  trackId,
  initialPlaylists,
}: Props) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"add" | "create">("add");

  const { data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => {
      const res = await axios.get<{ playlists: PlaylistWithTracksType[] }>(
        "/api/playlists"
      );
      return res.data.playlists;
    },
    initialData: initialPlaylists,
  });

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button>
          <CopyPlusIcon className="mr-2 w-4 h-4" />
          Add to playlist
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-[400px] min-h-[330px]">
        <Tabs
          value={type}
          onValueChange={(v) => setType(v as "add" | "create")}
          className="mt-5"
        >
          <TabsList className="w-full">
            <TabsTrigger value="add" className="w-full">
              Add to playlist
            </TabsTrigger>
            <TabsTrigger value="create" className="w-full">
              Create a playlist
            </TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            {playlists.length > 0 ? (
              <ScrollArea className="h-[330px]">
                {playlists.map((playlist) => (
                  <PlaylistItem
                    playlist={playlist}
                    trackId={trackId}
                    key={playlist.id}
                  />
                ))}
              </ScrollArea>
            ) : (
              <div className="flex-center h-[330px]">
                <div>
                  <p className="flex items-center gap-2">
                    No playlists <CloudOffIcon className="w-4 h-4" />
                  </p>
                  <p
                    onClick={() => setType("create")}
                    className="text-sm text-white/70 dark:text-white/50 transition hover:underline hover:text-white dark:hover:text-white cursor-pointer"
                  >
                    Create new one
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="create">
            <CreatePlaylistForm
              trackId={trackId}
              close={() => {
                setOpen(false);
                setType("add");
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function PlaylistItem({
  playlist,
  trackId,
}: {
  playlist: PlaylistWithTracksType;
  trackId: number;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: togglePlaylistTrack, isLoading } = useMutation({
    mutationFn: async (values: AddToPlaylistValidatorType) => {
      await axios.post("/api/playlists/add", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["playlists"]);
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
