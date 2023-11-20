"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CloudOffIcon, CopyPlusIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaylistWithTracksType } from "@/types/playlists.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreatePlaylistForm from "@/components/forms/create-playlist-form";
import PlaylistItem from "./playlist-item";

interface Props {
  trackId: number;
  playlists: PlaylistWithTracksType[];
  profileId: number;
}

export default function AddToPlaylistDialog({
  trackId,
  playlists,
  profileId,
}: Props) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"add" | "create">("add");

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
                    profileId={profileId}
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
                    className="text-sm text-white/70 dark:text-white/50 transition hover:underline underline-offset-2 hover:text-white dark:hover:text-white cursor-pointer"
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
              profileId={profileId}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
