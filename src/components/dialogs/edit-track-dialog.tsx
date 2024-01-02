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
import { FullTrackType } from "@/types/tracks.types";
import { EditTrackForm } from "@/components/forms";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  track: FullTrackType;
}

export default function EditTrackDialog({ track }: Props) {
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
          <DialogTitle>Edit track</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] md:h-auto">
          <EditTrackForm track={track} close={() => setOpen(false)} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
