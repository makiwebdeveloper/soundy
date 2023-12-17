import "server-only";

import { db } from "@/lib/db";
import { playingTracks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PlayTrackValidatorType } from "@/lib/validators/tracks";
import {
  clearPlayingContext,
  createPlayingContext,
  updatePlayingContext,
} from "./playing-contexts.service";
import { FullPlayingTrackType } from "@/types/tracks.types";
import { getCurrentProfile } from "./profiles.service";

export type PlayingTrackType = PlayTrackValidatorType & {
  profileId: number;
};

export async function getPlayingTrack(
  profileId: number
): Promise<FullPlayingTrackType | undefined> {
  const dbPlayingTrack = await db.query.playingTracks.findFirst({
    where: eq(playingTracks.profileId, profileId),
    with: {
      track: {
        with: {
          profile: true,
        },
      },
      profile: true,
      playingContext: true,
    },
  });

  return dbPlayingTrack;
}

export async function createPlayingTrack(data: PlayingTrackType) {
  const { profileId, trackId, ...contextData } = data;

  const dbPlayingTrack = await db
    .insert(playingTracks)
    .values({
      profileId,
      trackId,
    })
    .returning({ playingTrackId: playingTracks.id });

  const playingTrackId = dbPlayingTrack[0].playingTrackId;

  try {
    await createPlayingContext({ playingTrackId, ...contextData });
  } catch (error) {
    await deletePlayingTrack(playingTrackId);
  }

  return playingTrackId;
}

export async function updatePlayingTrack(data: PlayingTrackType) {
  const { profileId, trackId, ...contextData } = data;

  const dbPlayingTrack = await db
    .update(playingTracks)
    .set({
      trackId,
    })
    .where(eq(playingTracks.profileId, profileId))
    .returning({ playingTrackId: playingTracks.id });

  const playingTrackId = dbPlayingTrack[0].playingTrackId;

  try {
    await updatePlayingContext({ playingTrackId, ...contextData });
  } catch (error) {
    await clearPlayingContext(playingTrackId);
  }

  return playingTrackId;
}

export async function deletePlayingTrack(playingTrackId: number) {
  await db.delete(playingTracks).where(eq(playingTracks.id, playingTrackId));
}
