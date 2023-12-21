import { createPlaylistValidator } from "@/lib/validators/playlists";
import {
  createPlaylist,
  createPlaylistTrack,
  getProfilePlaylists,
} from "@/services/playlists.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, isPublic, trackId } = createPlaylistValidator.parse(body);

    const playlistId = await createPlaylist({
      title,
      isPublic,
      profileId: currentProfile.id,
    });

    await createPlaylistTrack({ playlistId, trackId });

    return NextResponse.json({ playlistId }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to create playlist" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const playlists = await getProfilePlaylists({
      profileId: currentProfile.id,
    });

    return NextResponse.json({ playlists }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
