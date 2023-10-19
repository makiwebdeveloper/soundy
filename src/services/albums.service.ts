import { UploadAlbumValidatorType } from "@/lib/validators/albums";
import { createTrack } from "./tracks.service";
import { db } from "@/lib/db";
import { albums } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { FullAlbumType } from "@/types/albums.types";

export async function createAlbum(
  data: UploadAlbumValidatorType & { profileId: number }
) {
  try {
    const {
      title,
      description,
      genre,
      imageUrl,
      audioFiles,
      profileId,
      audioDurations,
    } = data;

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
        duration: audioDurations?.find((d) => d.url === audioFiles[i].url)
          ?.duration,
      });
    }

    return albumId;
  } catch (error) {
    throw new Error("Failed album creation");
  }
}

export async function getAlbumById(
  albumId: number
): Promise<FullAlbumType | undefined> {
  return db.query.albums.findFirst({
    where: eq(albums.id, albumId),
    with: {
      profile: true,
      tracks: {
        with: {
          listenings: true,
        },
      },
    },
  });
}
