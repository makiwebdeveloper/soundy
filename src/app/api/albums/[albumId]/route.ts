import { editAlbumValidator } from "@/lib/validators/albums";
import { getAlbumById, updateAlbum } from "@/services/albums.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { albumId: string } }
) {
  const currentProfile = await getCurrentProfile();
  if (!currentProfile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const album = await getAlbumById(Number(params.albumId));

  if (!album) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  return NextResponse.json({ album }, { status: 200 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { albumId: string } }
) {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = editAlbumValidator.parse(body);

    await updateAlbum(Number(params.albumId), data);

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
