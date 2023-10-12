import { db } from "@/lib/db";
import { favoriteTracks } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export type FavoriteTrackType = {
  profileId: number;
  trackId: number;
};

export async function getFavoriteTrack({
  profileId,
  trackId,
}: FavoriteTrackType) {
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
}: FavoriteTrackType) {
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
