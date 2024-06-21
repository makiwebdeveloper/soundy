import "server-only";

import { db } from "@/lib/db";
import { playlistTracks, playlists } from "@/lib/db/schema";
import {
  AddToPlaylistValidatorType,
  CreatePlaylistValidatorType,
} from "@/lib/validators/playlists";
import {
  PlaylistTracksType,
  PlaylistType,
  PlaylistWithTracksType,
} from "@/types/playlists.types";
import { and, eq } from "drizzle-orm";

type PlaylistCreationType = Pick<
  CreatePlaylistValidatorType,
  "title" | "isPublic"
> & {
  profileId: number;
};

export async function getProfilePlaylists({
  profileId,
  limit,
  orderBy,
  onlyPublic,
}: {
  profileId: number;
  limit?: number;
  orderBy?: "asc" | "desc";
  onlyPublic?: boolean;
}): Promise<PlaylistWithTracksType[]> {
  if (onlyPublic) {
    const dbPlatlists = await db.query.playlists.findMany({
      where: and(
        eq(playlists.profileId, profileId),
        eq(playlists.isPublic, true)
      ),
      with: {
        playlistTracks: {
          with: {
            track: {
              with: {
                listenings: true,
              },
            },
          },
        },
        profile: true,
      },
      limit,
      orderBy: (playlists, { asc, desc }) =>
        orderBy === "desc"
          ? [desc(playlists.createdAt)]
          : [asc(playlists.createdAt)],
    });

    return dbPlatlists.map((item) => {
      const { playlistTracks, ...data } = item;
      return {
        tracks: playlistTracks.map((track) => track.track),
        ...data,
      };
    });
  } else {
    const dbPlatlists = await db.query.playlists.findMany({
      where: eq(playlists.profileId, profileId),
      with: {
        playlistTracks: {
          with: {
            track: {
              with: {
                listenings: true,
              },
            },
          },
        },
        profile: true,
      },
      limit,
      orderBy: (playlists, { asc, desc }) =>
        orderBy === "desc"
          ? [desc(playlists.createdAt)]
          : [asc(playlists.createdAt)],
    });

    return dbPlatlists.map((item) => {
      const { playlistTracks, ...data } = item;
      return {
        tracks: playlistTracks.map((track) => track.track),
        ...data,
      };
    });
  }
}

export async function createPlaylist(data: PlaylistCreationType) {
  try {
    const dbPlaylist = await db
      .insert(playlists)
      .values(data)
      .returning({ playlistId: playlists.id });

    const playlistId = dbPlaylist[0].playlistId;
    return playlistId;
  } catch (error) {
    throw new Error("Failed playlist creation");
  }
}

export async function createPlaylistTrack(data: AddToPlaylistValidatorType) {
  try {
    const dbPlaylist = await db
      .insert(playlistTracks)
      .values(data)
      .returning({ playlistTrackId: playlistTracks.id });

    const playlistTrackId = dbPlaylist[0].playlistTrackId;
    return playlistTrackId;
  } catch (error) {
    throw new Error("Failed track adding to playlist");
  }
}

export async function deletePlaylistTrack(playlistTrackId: number) {
  await db.delete(playlistTracks).where(eq(playlistTracks.id, playlistTrackId));
}

export async function getPlaylistTrack({
  playlistId,
  trackId,
}: AddToPlaylistValidatorType) {
  const dbPlatlistTrack = await db.query.playlistTracks.findMany({
    where: eq(playlistTracks.playlistId, playlistId),
  });

  const playlistTrack = dbPlatlistTrack.find(
    (item) => item.trackId === trackId
  );
  return playlistTrack;
}

export async function getPlaylistsByProfileId(
  profileId: number,
  limit?: number
): Promise<PlaylistType[]> {
  return db.query.playlists.findMany({
    where: eq(playlists.profileId, profileId),
    limit,
  });
}

export async function getPlaylistById(
  playlistId: number
): Promise<PlaylistWithTracksType | undefined> {
  const dbPlaylist = await db.query.playlists.findFirst({
    where: eq(playlists.id, playlistId),
    with: {
      playlistTracks: {
        with: {
          track: {
            with: {
              listenings: true,
            },
          },
        },
      },
      profile: true,
    },
  });

  if (!dbPlaylist) return undefined;

  return {
    ...dbPlaylist,
    tracks: dbPlaylist.playlistTracks.map((item) => item.track),
  };
}

export async function updatePlaylistTitle(playlistId: number, title?: string) {
  await db.update(playlists).set({ title }).where(eq(playlists.id, playlistId));
}
