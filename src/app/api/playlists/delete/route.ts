import { db } from "@/lib/db";
import { playlistTracks, playlists, tracks } from "@/lib/db/schema";
import { deleteFromPlaylistValidator } from "@/lib/validators/playlists";
import { getPlaylistById } from "@/services/playlists.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { trackId, playlistId } = deleteFromPlaylistValidator.parse(body);

    const playlist = await getPlaylistById(playlistId);
    if (!playlist) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    if (currentProfile.id !== playlist.profileId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db
      .delete(playlistTracks)
      .where(
        and(
          eq(playlistTracks.playlistId, playlistId),
          eq(playlistTracks.trackId, trackId)
        )
      );

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to delete playlist" },
      { status: 500 }
    );
  }
}
