import { getCurrentProfile } from "@/services/profiles.service";
import { getTrackById } from "@/services/tracks.service";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { trackId: string } }
) {
  const currentProfile = await getCurrentProfile();
  if (!currentProfile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const track = await getTrackById(Number(params.trackId));

  if (!track) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  return NextResponse.json({ track }, { status: 200 });
}
