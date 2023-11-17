"use client";

import { FullCommentType } from "@/types/comments.types";
import { SendCommentForm } from "@/components/forms";
import CommentItem from "./comment-item";

interface Props {
  comments: FullCommentType[];
  trackId: number;
  currentProfileId: number;
}

export default function Comments({
  comments,
  trackId,
  currentProfileId,
}: Props) {
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
