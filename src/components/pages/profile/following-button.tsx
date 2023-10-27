"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserPlus2Icon, UserCheck2Icon } from "lucide-react";
import { FollowProfileValidatorType } from "@/lib/validators/followings";
import { useToast } from "@/hooks/use-toast";

interface Props {
  profileId: number;
  currentProfileId: number;
}

export default function FollowingButton({
  profileId,
  currentProfileId,
}: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const isFollow = true;

  const { mutate: follow, isLoading: isFollowLoading } = useMutation({
    mutationFn: async (values: FollowProfileValidatorType) => {
      await axios.post("/api/followings/", values);
    },
    onSuccess: () => {},
    onError: () => {
      toast({
        title: "Failed to follow profile",
        description: "Try later",
        variant: "destructive",
      });
    },
  });

  const { mutate: unfollow, isLoading: isUnfollowLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/followings/${profileId}`);
    },
    onSuccess: () => {},
    onError: () => {
      toast({
        title: "Failed to unfollow profile",
        description: "Try later",
        variant: "destructive",
      });
    },
  });

  return isFollow ? (
    <Button
      onClick={() => unfollow()}
      className="flex h-9 rounded-md px-3"
      loading={isUnfollowLoading}
    >
      <UserCheck2Icon
        className={cn("w-5 h-5 mr-2", isUnfollowLoading && "hidden")}
      />
      Unfollow
    </Button>
  ) : (
    <Button
      onClick={() => follow({ profileId })}
      className="flex h-9 rounded-md px-3"
      loading={isFollowLoading}
    >
      <UserPlus2Icon
        className={cn("w-5 h-5 mr-2", isFollowLoading && "hidden")}
      />
      Follow
    </Button>
  );
}
