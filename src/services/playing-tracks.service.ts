import { db } from "@/lib/db";
import { playingTracks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export type PlayingTrackCreationType = {
  profileId: number;
  trackId: number;
};

export async function getPlayingTrack(profileId: number) {
  const dbPlayingTrack = await db.query.playingTracks.findFirst({
    where: eq(playingTracks.profileId, profileId),
    with: {
      track: {
        with: {
          profile: true,
        },
      },
      profile: true,
    },
  });

  return dbPlayingTrack;
}

export async function createPlayingTrack({
  trackId,
  profileId,
}: PlayingTrackCreationType) {
  const dbPlayingTrack = await db
    .insert(playingTracks)
    .values({ trackId, profileId })
    .returning({ playingTrackId: playingTracks.id });

  const playingTrackId = dbPlayingTrack[0].playingTrackId;
  return playingTrackId;
}

export async function updatePlayingTrack({
  profileId,
  trackId,
}: PlayingTrackCreationType) {
  const dbPlayingTrack = await db
    .update(playingTracks)
    .set({
      trackId,
    })
    .where(eq(playingTracks.profileId, profileId))
    .returning({ playingTrackId: playingTracks.id });

  const playingTrackId = dbPlayingTrack[0].playingTrackId;
  return playingTrackId;
}
