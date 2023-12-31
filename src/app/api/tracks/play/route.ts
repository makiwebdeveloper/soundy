import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/services/profiles.service";
import { playTrackValidator } from "@/lib/validators/tracks";
import { playTrack } from "@/services/tracks.service";
import { z } from "zod";
import { getPlayingTrack } from "@/services/playing-tracks.service";

export async function POST(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { trackId, ...contextData } = playTrackValidator.parse(body);

    const playingTrackId = await playTrack({
      profileId: currentProfile.id,
      trackId,
      ...contextData,
    });

    return NextResponse.json({ playingTrackId }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const playingTrack = await getPlayingTrack(currentProfile.id);

    return NextResponse.json({ playingTrack }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
