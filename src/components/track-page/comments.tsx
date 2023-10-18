"use client";

import { FullCommentType } from "@/types/comments.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SendCommentForm } from "../forms";
import CommentItem from "./comment-item";

interface Props {
  initialComments: FullCommentType[];
  trackId: number;
  currentProfileId: number;
}

export default function Comments({
  initialComments,
  trackId,
  currentProfileId,
}: Props) {
  const { data: comments } = useQuery({
    queryKey: [`comments ${trackId}`],
    queryFn: async () => {
      const res = await axios.get<{ comments: FullCommentType[] }>(
        `/api/comments?trackId=${trackId}`
      );
      return res.data.comments;
    },
    initialData: initialComments,
  });

  return (
    <div>
      <SendCommentForm trackId={trackId} />
      <div className="space-y-3 my-3">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentProfileId={currentProfileId}
          />
        ))}
      </div>
    </div>
  );
}
