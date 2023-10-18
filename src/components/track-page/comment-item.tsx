"use client";

import axios from "axios";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FullCommentType } from "@/types/comments.types";
import { formatRelativeTime } from "@/utils/format-time";
import { Button } from "@/components/ui/button";

interface Props {
  comment: FullCommentType;
  currentProfileId: number;
}

export default function CommentItem({ comment, currentProfileId }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: deleteComment, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/comments/${comment.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`comments ${comment.trackId}`]);
    },
    onError: () => {
      toast({
        title: "Failed to delete comment",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex items-center gap-3 group">
      <div className="relative w-[40px] h-[40px]">
        <Image
          fill
          src={comment.profile.imageUrl}
          alt={comment.profile.name}
          className="object-cover rounded-full bg-white/20 dark:bg-black/20"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm break-all text-white/70 dark:text-white/50">
          {comment.profile.name}
        </p>
        <p className="text-sm break-all">{comment.text}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-white/70 dark:text-white/50">
          {formatRelativeTime(new Date(comment.createdAt))}
        </p>
        {comment.profile.id === currentProfileId && (
          <Button
            onClick={() => deleteComment()}
            loading={isLoading}
            disabledLoadingIcon
            className="h-7 w-7 p-0 hover:bg-red-500/90 dark:hover:bg-red-500/90"
          >
            <Trash2Icon className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
