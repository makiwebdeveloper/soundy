"use client";

import { useState } from "react";
import { ProfileType } from "@/types/profiles.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditProfileForm } from "@/components/forms";
import { UserCog2 } from "lucide-react";

interface Props {
  profile: Pick<ProfileType, "id" | "imageUrl" | "name">;
}

export default function EditProfileDialog({ profile }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button className="flex h-9 rounded-md px-3">
          <UserCog2 className={"w-5 h-5 mr-2"} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <EditProfileForm profile={profile} close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
