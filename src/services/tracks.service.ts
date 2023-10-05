import { db } from "@/lib/db";
import { tracks } from "@/lib/db/schema";
import { UploadTrackValidatorType } from "@/lib/validators/tracks";
import { eq } from "drizzle-orm";

export async function getTrackById(trackId: number) {
  const track = await db.query.tracks.findFirst({
    where: eq(tracks.id, trackId),
  });

  return track;
}

export async function createTrack(
  data: UploadTrackValidatorType & {
    profileId: number;
    position?: number;
    albumId?: number;
  }
) {
  try {
    const {
      title,
      description,
      genre,
      isPublic,
      imageUrl,
      audioUrl,
      profileId,
      position,
      albumId,
    } = data;

    const dbTrack = await db
      .insert(tracks)
      .values({
        title,
        description: description || undefined,
        genre: genre || undefined,
        isPublic,
        imageUrl,
        audioUrl,
        profileId,
        position,
        albumId,
      })
      .returning({ trackId: tracks.id });

    const trackId = dbTrack[0].trackId;
    return trackId;
  } catch (error) {
    throw new Error("Failed track creation");
  }
}