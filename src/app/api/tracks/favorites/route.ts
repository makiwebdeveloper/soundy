import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/services/profiles.service";
import { favoriteTrackValidator } from "@/lib/validators/tracks";
import {
  createFavoriteTrack,
  deleteFavoriteTrack,
  getFavoriteTrack,
} from "@/services/favorite-tracks.service";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { trackId } = favoriteTrackValidator.parse(body);

    const existFavoriteTrack = await getFavoriteTrack({
      trackId,
      profileId: currentProfile.id,
    });

    if (existFavoriteTrack) {
      await deleteFavoriteTrack(existFavoriteTrack.id);
    } else {
      await createFavoriteTrack({
        profileId: currentProfile.id,
        trackId,
      });
    }

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
