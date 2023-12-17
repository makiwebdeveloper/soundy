import "server-only";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { playingContexts } from "@/lib/db/schema";
import { IPlayingContext } from "@/types/playing-contexts.types";
import { ContextRepeatType } from "@/types/tracks.types";

export type PlayingContextCreationType = IPlayingContext & {
  playingTrackId: number;
};

export async function createPlayingContext(data: PlayingContextCreationType) {
  await db.insert(playingContexts).values(data);
}

export async function updatePlayingContext({
  playingTrackId,
  ...contextData
}: PlayingContextCreationType) {
  await clearPlayingContext(playingTrackId);

  await db
    .update(playingContexts)
    .set(contextData)
    .where(eq(playingContexts.playingTrackId, playingTrackId));
}

export async function clearPlayingContext(playingTrackId: number) {
  await db
    .update(playingContexts)
    .set({
      albumId: null,
      playlistId: null,
      favoritesProfileId: null,
      history: null,
      tracksProfileId: null,
    })
    .where(eq(playingContexts.playingTrackId, playingTrackId));
}

export async function toggleShuffle(
  playingTrackId: number,
  currentIsShuffle: boolean
): Promise<boolean> {
  const playingContext = await db
    .update(playingContexts)
    .set({
      isShuffle: !currentIsShuffle,
    })
    .where(eq(playingContexts.playingTrackId, playingTrackId))
    .returning({
      isShuffle: playingContexts.isShuffle,
    });

  return playingContext[0].isShuffle;
}

export async function changeRepeat(
  playingTrackId: number,
  repeat: ContextRepeatType
) {
  const playingContext = await db
    .update(playingContexts)
    .set({
      repeat,
    })
    .where(eq(playingContexts.playingTrackId, playingTrackId))
    .returning({ repeat: playingContexts.repeat });

  return playingContext[0].repeat;
}
