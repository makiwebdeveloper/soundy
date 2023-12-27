import { db } from "@/lib/db";
import { albums, playlists, profiles, tracks } from "@/lib/db/schema";
import { AlbumType } from "@/types/albums.types";
import { PlaylistType, PlaylistWithTracksType } from "@/types/playlists.types";
import { ProfileType } from "@/types/profiles.types";
import { SearchResult } from "@/types/search.types";
import { TrackWithListeningsType } from "@/types/tracks.types";
import { and, eq, ilike } from "drizzle-orm";

export async function getSearchItems(value: string): Promise<SearchResult> {
  if (!value) {
    return {
      tracks: [],
      albums: [],
      profiles: [],
      playlists: [],
    };
  }

  const dbTracks: TrackWithListeningsType[] = await db.query.tracks.findMany({
    where: and(eq(tracks.isPublic, true), ilike(tracks.title, `%${value}%`)),
    with: {
      listenings: true,
      profile: true,
    },
    orderBy: (tracks, { desc }) => [desc(tracks.createdAt)],
  });

  const dbProfiles: ProfileType[] = await db.query.profiles.findMany({
    where: ilike(profiles.name, `%${value}%`),
    orderBy: (profiles, { desc }) => [desc(profiles.createdAt)],
  });

  const dbAlbums: AlbumType[] = await db.query.albums.findMany({
    where: ilike(albums.title, `%${value}%`),
    orderBy: (albums, { desc }) => [desc(albums.createdAt)],
  });

  const dbPlaylists = await db.query.playlists.findMany({
    where: and(
      eq(playlists.isPublic, true),
      ilike(playlists.title, `%${value}%`)
    ),
    with: {
      playlistTracks: {
        with: {
          track: true,
        },
      },
      profile: true,
    },
    orderBy: (playlists, { desc }) => [desc(playlists.createdAt)],
  });

  return {
    tracks: dbTracks,
    albums: dbAlbums,
    profiles: dbProfiles,
    playlists: dbPlaylists.map((item) => {
      const { playlistTracks, ...data } = item;
      return {
        tracks: playlistTracks.map((track) => track.track),
        ...data,
      };
    }),
  };
}
