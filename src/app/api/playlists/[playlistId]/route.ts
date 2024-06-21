import { editPlaylistValidator } from "@/lib/validators/playlists";
import {
  getPlaylistById,
  updatePlaylistTitle,
} from "@/services/playlists.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  const currentProfile = await getCurrentProfile();
  if (!currentProfile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const playlist = await getPlaylistById(Number(params.playlistId));
  if (!playlist) {
    return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
  }

  return NextResponse.json({ playlist }, { status: 200 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { playlistId: string } }
) {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const playlist = await getPlaylistById(Number(params.playlistId));
    if (!playlist) {
      return NextResponse.json(
        { error: "Playlist not found" },
        { status: 404 }
      );
    }

    if (playlist.profileId != currentProfile.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title } = editPlaylistValidator.parse(body);

    await updatePlaylistTitle(playlist.id, title);

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
