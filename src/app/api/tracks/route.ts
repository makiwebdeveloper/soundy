import { NextRequest, NextResponse } from "next/server";
import { getCurrentProfile } from "@/services/profiles.service";
import { z } from "zod";
import { uploadTrackValidator } from "@/lib/validators/tracks";
import { createTrack, getTrackById } from "@/services/tracks.service";

export async function POST(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = uploadTrackValidator.parse(body);

    const trackId = await createTrack({
      ...data,
      profileId: currentProfile.id,
    });

    return NextResponse.json({ trackId }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to create track" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const trackId = searchParams.get("trackId");

  if (trackId) {
    const track = await getTrackById(Number(trackId));
    return NextResponse.json({ track }, { status: 200 });
  }

  return NextResponse.json({ tracks: [] }, { status: 200 });
}
