import { addToPlaylistValidator } from "@/lib/validators/playlists";
import {
  createPlaylistTrack,
  deletePlaylistTrack,
  getPlaylistTrack,
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
    const { trackId, playlistId } = addToPlaylistValidator.parse(body);

    const existPlaylistTrack = await getPlaylistTrack({ playlistId, trackId });

    if (existPlaylistTrack) {
      await deletePlaylistTrack(existPlaylistTrack.id);
    } else {
      await createPlaylistTrack({
        trackId,
        playlistId,
      });
    }

    return NextResponse.json({ message: "OK" }, { status: 200 });
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
