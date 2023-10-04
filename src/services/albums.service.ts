import { UploadAlbumValidatorType } from "@/lib/validators/albums";
import { createTrack } from "./tracks.service";
import { db } from "@/lib/db";
import { albums } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function createAlbum(
  data: UploadAlbumValidatorType & { profileId: number }
) {
  try {
    const { title, description, genre, imageUrl, audioFiles, profileId } = data;

    if (!audioFiles) {
      return null;
    }

    const dbAlbum = await db
      .insert(albums)
      .values({
        title,
        description: description || undefined,
        genre: genre || undefined,
        imageUrl,
        profileId,
      })
      .returning({ albumId: albums.id });

    const albumId = dbAlbum[0].albumId;

    for (let i = 0; i < audioFiles.length; i++) {
      await createTrack({
        title: audioFiles[i].name,
        imageUrl,
        description: description || undefined,
        genre: genre || undefined,
        profileId,
        audioUrl: audioFiles[i].url,
        isPublic: true,
        position: audioFiles[i].position,
        albumId,
      });
    }

    return albumId;
  } catch (error) {
    throw new Error("Failed album creation");
  }
}
