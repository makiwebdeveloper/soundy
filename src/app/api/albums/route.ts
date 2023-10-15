import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/services/profiles.service";
import { z } from "zod";
import { uploadAlbumValidator } from "@/lib/validators/albums";
import { createAlbum } from "@/services/albums.service";

export async function POST(req: Request) {
  try {
    const currentProfile = await getCurrentProfile();

    if (!currentProfile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const data = uploadAlbumValidator.parse(body);

    const albumId = await createAlbum({
      ...data,
      profileId: currentProfile.id,
    });

    return NextResponse.json({ albumId }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Failed to create album" },
      { status: 500 }
    );
  }
}
