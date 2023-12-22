import "server-only";

import { db } from "@/lib/db";
import { favoriteTracks } from "@/lib/db/schema";
import {
  FavoriteTrackCreationType,
  FullFavoriteTrackType,
} from "@/types/favorite-tracks.types";
import { eq } from "drizzle-orm";

export async function getFavoriteTrack({
  profileId,
  trackId,
}: FavoriteTrackCreationType) {
  const dbFavoriteTracks = await db.query.favoriteTracks.findMany({
    where: eq(favoriteTracks.profileId, profileId),
  });

  const favoriteTrack = dbFavoriteTracks.find(
    (item) => item.trackId === trackId
  );
  return favoriteTrack;
}

export async function createFavoriteTrack({
  profileId,
  trackId,
}: FavoriteTrackCreationType) {
  const dbFavoriteTrack = await db
    .insert(favoriteTracks)
    .values({ profileId, trackId })
    .returning({ favoriteTrackId: favoriteTracks.id });

  const favoriteTrackId = dbFavoriteTrack[0].favoriteTrackId;
  return favoriteTrackId;
}

export async function deleteFavoriteTrack(favoriteTrackId: number) {
  await db.delete(favoriteTracks).where(eq(favoriteTracks.id, favoriteTrackId));
}

export async function getFavoriteTracksByProfileId({
  profileId,
  limit,
  orderBy,
}: {
  profileId: number;
  limit?: number;
  orderBy?: "asc" | "desc";
}): Promise<FullFavoriteTrackType[]> {
  const dbFavoriteTracks = await db.query.favoriteTracks.findMany({
    where: eq(favoriteTracks.profileId, profileId),
    with: {
      profile: true,
      track: {
        with: {
          listenings: true,
          profile: true,
        },
      },
    },
    limit,
    orderBy: (favoriteTracks, { asc, desc }) =>
      orderBy === "desc"
        ? [desc(favoriteTracks.createdAt)]
        : [asc(favoriteTracks.createdAt)],
  });

  return dbFavoriteTracks.map((fav) => ({
    ...fav,
    track: { ...fav.track, profile: fav.track.profile },
  }));
}
