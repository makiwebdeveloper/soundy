import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/services/profiles.service";
import { getPlayingTrack } from "@/services/playing-tracks.service";
import { toggleShuffle } from "@/services/playing-contexts.service";

export async function PATCH(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const playingTrack = await getPlayingTrack(currentProfile.id);

    if (!playingTrack) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const isShuffle = await toggleShuffle(
      playingTrack.id,
      playingTrack.playingContext.isShuffle
    );

    return NextResponse.json({ isShuffle }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
