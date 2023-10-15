"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { CloudOffIcon, CopyPlusIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { PlaylistWithTracksType } from "@/types/playlists.types";
import CreatePlaylistForm from "../forms/create-playlist-form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
      <DialogContent className="sm:max-w-[400px] min-h-[330px]">
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
              <div>
                {playlists.map((playlist) => (
                  <div key={playlist.id}>{playlist.title}</div>
                ))}
              </div>
            ) : (
              <div className="py-16">
                <p className="flex items-center gap-2 w-fit mx-auto">
                  No playlists <CloudOffIcon className="w-4 h-4" />
                </p>
                <p
                  onClick={() => setType("create")}
                  className="mx-auto w-fit text-sm text-white/70 dark:text-white/50 transition hover:underline hover:text-white dark:hover:text-white cursor-pointer"
                >
                  Create new one
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="create">
            <CreatePlaylistForm
              close={() => {
                setType("add");
                setOpen(false);
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
