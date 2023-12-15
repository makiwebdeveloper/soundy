import "server-only";

import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { UploadAlbumValidatorType } from "@/lib/validators/albums";
import { createTrack } from "./tracks.service";
import { albums } from "@/lib/db/schema";
import { AlbumType, FullAlbumType } from "@/types/albums.types";

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
        orderBy: (tracks, { asc }) => [asc(tracks.position)],
      },
    },
  });
}

export async function getAlbumsByProfileId(
  profileId: number,
  limit?: number
): Promise<AlbumType[]> {
  return db.query.albums.findMany({
    where: eq(albums.profileId, profileId),
    limit,
  });
}

export async function getFullAlbumsByProfileId(
  profileId: number,
  limit?: number,
  orderBy?: "asc" | "desc"
): Promise<FullAlbumType[]> {
  return db.query.albums.findMany({
    where: eq(albums.profileId, profileId),
    with: {
      tracks: {
        with: {
          listenings: true,
        },
      },
      profile: true,
    },
    limit,
    orderBy: (albums, { asc, desc }) =>
      orderBy === "desc" ? [desc(albums.createdAt)] : [asc(albums.createdAt)],
  });
}
