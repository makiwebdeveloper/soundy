import { getFavoriteTrack } from "@/services/favorite-tracks.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { trackId: string } }
) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favoriteTrack = await getFavoriteTrack({
    trackId: Number(params.trackId),
    profileId: currentProfile.id,
  });

  return NextResponse.json({ favoriteTrack }, { status: 200 });
}
