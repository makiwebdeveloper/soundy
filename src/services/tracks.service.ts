import { db } from "@/lib/db";
import { tracks } from "@/lib/db/schema";
import { UploadTrackValidatorType } from "@/lib/validators/tracks";
import { eq } from "drizzle-orm";
import {
  PlayingTrackCreationType,
  createPlayingTrack,
  getPlayingTrack,
  updatePlayingTrack,
} from "@/services/playing-tracks.service";
import {
  FullTrackType,
  TrackType,
  TrackWithListeningsType,
} from "@/types/tracks.types";

export async function getTrackById(
  trackId: number
): Promise<FullTrackType | undefined> {
  const track = await db.query.tracks.findFirst({
    where: eq(tracks.id, trackId),
    with: {
      album: true,
      profile: true,
      listenings: true,
      favoriteTracks: true,
    },
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
      duration,
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
        duration: duration || "00:00",
      })
      .returning({ trackId: tracks.id });

    const trackId = dbTrack[0].trackId;
    return trackId;
  } catch (error) {
    throw new Error("Failed track creation");
  }
}

export async function playTrack({
  profileId,
  trackId,
}: PlayingTrackCreationType) {
  const existPlayingTrack = await getPlayingTrack(profileId);

  if (existPlayingTrack) {
    const playingTrackId = await updatePlayingTrack({ profileId, trackId });
    return playingTrackId;
  }

  const playingTrackId = await createPlayingTrack({ profileId, trackId });
  return playingTrackId;
}

export async function getTracksByProfileId(
  profileId: number,
  limit?: number
): Promise<TrackWithListeningsType[]> {
  return db.query.tracks.findMany({
    where: eq(tracks.profileId, profileId),
    limit,
    with: {
      listenings: true,
      profile: true,
    },
  });
}
