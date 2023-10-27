"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { UserPlus2Icon, UserCheck2Icon } from "lucide-react";

interface Props {}

export default function FollowingButton({}: Props) {
  const isFollowLoading = false;

  return (
    <Button className="flex h-9 rounded-md px-3" loading={isFollowLoading}>
      <UserPlus2Icon
        className={cn("w-5 h-5 mr-2", isFollowLoading && "hidden")}
      />
      Follow
    </Button>
  );
}
