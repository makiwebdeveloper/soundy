"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaylistWithTracksType } from "@/types/playlists.types";
import EditPlaylistForm from "../forms/edit-playlist-form";

interface Props {
  playlist: PlaylistWithTracksType;
}

export default function EditPlaylistDialog({ playlist }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button className="flex h-9 rounded-md px-3">
          <Settings2Icon className={"w-5 h-5 mr-2"} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit playlist</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] md:h-auto">
          <EditPlaylistForm playlist={playlist} close={() => setOpen(false)} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
