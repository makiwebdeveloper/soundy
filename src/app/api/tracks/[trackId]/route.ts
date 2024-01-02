import { editTrackValidator } from "@/lib/validators/tracks";
import { getCurrentProfile } from "@/services/profiles.service";
import { getTrackById, updateTrack } from "@/services/tracks.service";
import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function PATCH(
  req: Request,
  { params }: { params: { trackId: string } }
) {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = editTrackValidator.parse(body);

    await updateTrack(Number(params.trackId), data);

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to update track. Please try later" },
      {
        status: 500,
      }
    );
  }
}
