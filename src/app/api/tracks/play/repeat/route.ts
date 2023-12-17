import { changeRepeat } from "@/services/playing-contexts.service";
import { getPlayingTrack } from "@/services/playing-tracks.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { ContextRepeatType } from "@/types/tracks.types";
import { NextResponse } from "next/server";

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

    let newRepeatType: ContextRepeatType = playingTrack.playingContext.repeat;
    if (newRepeatType === "NO-REPEAT") {
      newRepeatType = "REPEAT-ALL";
    } else if (newRepeatType === "REPEAT-ALL") {
      newRepeatType = "REPEAT-TRACK";
    } else {
      newRepeatType = "NO-REPEAT";
    }

    const newRepeat = await changeRepeat(playingTrack.id, newRepeatType);

    return NextResponse.json({ repeat: newRepeat }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
