"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

interface Props {
  cancel: () => void;
}

export default function CancelUploadDialog({ cancel }: Props) {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button border>Cancel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px]">
        <DialogHeader>
          <DialogTitle>Cancel track upload</DialogTitle>
          <DialogDescription>
            Are you sure you want to stop your track upload?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 justify-end">
          <Button onClick={close}>Nope</Button>
          <Button onClick={cancel}>Yep</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
