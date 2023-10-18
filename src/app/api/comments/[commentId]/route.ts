import { deleteComment } from "@/services/comments.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { commentId: string } }
) {
  try {
    const currentProfile = getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await deleteComment(Number(params.commentId));

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
