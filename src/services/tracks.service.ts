import { db } from "@/lib/db";
import { tracks } from "@/lib/db/schema";
import { UploadTrackValidatorType } from "@/lib/validators/tracks";

export async function createTrack(
  data: UploadTrackValidatorType & {
    profileId: number;
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
      })
      .returning({ trackId: tracks.id });

    const trackId = dbTrack[0].trackId;
    return trackId;
  } catch (error) {
    throw new Error("Failed track creation");
  }
}
