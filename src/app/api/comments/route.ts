import { NextResponse, type NextRequest } from "next/server";
import { createCommentValidator } from "@/lib/validators/comments";
import { getCurrentProfile } from "@/services/profiles.service";
import {
  createComment,
  getCommentsByTrackId,
} from "@/services/comments.service";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const trackId = searchParams.get("trackId");
  const comments = await getCommentsByTrackId(Number(trackId));

  return NextResponse.json({ comments }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = createCommentValidator.parse(body);

    const commentId = await createComment({
      ...data,
      profileId: currentProfile.id,
    });

    return NextResponse.json({ commentId }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to create comment" },
      { status: 500 }
    );
  }
}
