import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/services/profiles.service";
import { playTrackValidator } from "@/lib/validators/tracks";
import { playTrack } from "@/services/tracks.service";
import { z } from "zod";
import { getPlayingTrack } from "@/services/playing-tracks.service";
import {
  createListening,
  getListening,
  updateListeningDate,
} from "@/services/listenings.service";

export async function POST(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { trackId } = playTrackValidator.parse(body);

    const playingTrackId = await playTrack({
      profileId: currentProfile.id,
      trackId,
    });

    const existListening = await getListening({
      profileId: currentProfile.id,
      trackId,
    });
    if (!existListening) {
      await createListening({ profileId: currentProfile.id, trackId });
    } else {
      await updateListeningDate(existListening.id);
    }

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
