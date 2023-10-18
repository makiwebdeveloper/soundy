import { db } from "@/lib/db";
import { comments } from "@/lib/db/schema";
import { CommentCreationType, FullCommentType } from "@/types/comments.types";
import { eq } from "drizzle-orm";

export async function createComment(data: CommentCreationType) {
  try {
    const dbComment = await db
      .insert(comments)
      .values(data)
      .returning({ commentId: comments.id });

    const commentId = dbComment[0].commentId;
    return commentId;
  } catch (error) {
    throw new Error("Failed comment creation");
  }
}

export async function getCommentsByTrackId(
  trackId: number
): Promise<FullCommentType[]> {
  return db.query.comments.findMany({
    where: eq(comments.trackId, trackId),
    with: {
      profile: true,
      track: true,
    },
  });
}

export async function deleteComment(commentId: number) {
  await db.delete(comments).where(eq(comments.id, commentId));
}
