import "server-only";

import { db } from "@/lib/db";
import { tracks } from "@/lib/db/schema";
import { UploadTrackValidatorType } from "@/lib/validators/tracks";
import { and, eq, sql } from "drizzle-orm";
import {
  PlayingTrackType,
  createPlayingTrack,
  getPlayingTrack,
  updatePlayingTrack,
} from "@/services/playing-tracks.service";
import { FullTrackType, TrackWithListeningsType } from "@/types/tracks.types";
import {
  createListening,
  getListening,
  getListeningsByProfileId,
  updateListeningDate,
} from "./listenings.service";
import { shuffleArray } from "@/utils/shuffle-array";

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

export async function playTrack(data: PlayingTrackType) {
  const existPlayingTrack = await getPlayingTrack(data.profileId);

  if (existPlayingTrack) {
    const playingTrackId = await updatePlayingTrack(data);

    const existListening = await getListening({
      profileId: data.profileId,
      trackId: data.trackId,
    });
    if (!existListening) {
      await createListening({
        profileId: data.profileId,
        trackId: data.trackId,
      });
    } else {
      await updateListeningDate(existListening.id);
    }

    return playingTrackId;
  }

  const playingTrackId = await createPlayingTrack(data);

  const existListening = await getListening({
    profileId: data.profileId,
    trackId: data.trackId,
  });
  if (!existListening) {
    await createListening({
      profileId: data.profileId,
      trackId: data.trackId,
    });
  } else {
    await updateListeningDate(existListening.id);
  }

  return playingTrackId;
}

export async function getTracksByProfileId({
  profileId,
  limit,
  orderBy,
  onlyPublic,
}: {
  profileId: number;
  limit?: number;
  orderBy?: "asc" | "desc";
  onlyPublic?: boolean;
}): Promise<TrackWithListeningsType[]> {
  return db.query.tracks.findMany({
    where: and(eq(tracks.profileId, profileId), eq(tracks.isPublic, true)),
    limit,
    with: {
      listenings: true,
      profile: true,
    },
    orderBy: (tracks, { asc, desc }) =>
      orderBy === "desc" ? [desc(tracks.createdAt)] : [asc(tracks.createdAt)],
  });
}

export async function getTracks({
  limit,
  orderBy,
  random,
}: {
  limit?: number;
  orderBy?: "asc" | "desc";
  random?: boolean;
}): Promise<TrackWithListeningsType[]> {
  if (random) {
    const dbTracks = await db.query.tracks.findMany({
      where: eq(tracks.isPublic, true),
      with: {
        listenings: true,
        profile: true,
      },
      orderBy: (tracks, { asc, desc }) =>
        orderBy === "desc" ? [desc(tracks.createdAt)] : [asc(tracks.createdAt)],
    });

    return dbTracks.sort(() => Math.random() - 0.5).slice(0, limit);
  } else {
    const dbTracks = await db.query.tracks.findMany({
      where: eq(tracks.isPublic, true),
      limit,
      with: {
        listenings: true,
        profile: true,
      },
      orderBy: (tracks, { asc, desc }) =>
        orderBy === "desc" ? [desc(tracks.createdAt)] : [asc(tracks.createdAt)],
    });

    return dbTracks;
  }
}

export async function getRandomTrack(): Promise<FullTrackType> {
  const dbTracks = await db.query.tracks.findMany({
    with: {
      album: true,
      profile: true,
      listenings: true,
      favoriteTracks: true,
    },
  });

  return dbTracks[Math.floor(Math.random() * dbTracks.length)];
}

export async function getTracksByGenre({
  genre,
  limit,
  orderBy,
}: {
  genre: string;
  limit?: number;
  orderBy?: "asc" | "desc";
}): Promise<TrackWithListeningsType[]> {
  return db.query.tracks.findMany({
    where: and(eq(tracks.genre, genre), eq(tracks.isPublic, true)),
    limit,
    with: {
      listenings: true,
      profile: true,
    },
    orderBy: (tracks, { asc, desc }) =>
      orderBy === "desc" ? [desc(tracks.createdAt)] : [asc(tracks.createdAt)],
  });
}

export async function getRecommendedTracks(profileId: number) {
  const listeningTracks = await getListeningsByProfileId({
    profileId,
  });

  const genres = listeningTracks.map((listening) => listening.track.genre);
  const commonGenres: string[] = genres.filter(
    (item): item is string => item !== null
  );
  const commonArtists = listeningTracks.map(
    (listening) => listening.track.profileId
  );

  let restTracks: TrackWithListeningsType[] = [];

  if (commonGenres.length + commonArtists.length < 6) {
    const dbTracks = await getTracks({
      limit: 6 - (commonGenres.length + commonArtists.length),
    });

    restTracks = [...dbTracks];
  }

  let artistsTracks: TrackWithListeningsType[] = [];

  for (let i = 0; i < listeningTracks.length; i++) {
    const dbTracks = await getTracksByProfileId({
      profileId: commonArtists[i],
    });

    artistsTracks.push(dbTracks[Math.floor(Math.random() * dbTracks.length)]);
  }

  let genresTracks: TrackWithListeningsType[] = [];
  for (let i = 0; i < listeningTracks.length; i++) {
    const dbTracks = await getTracksByGenre({
      genre: commonGenres[i],
    });

    genresTracks.push(dbTracks[Math.floor(Math.random() * dbTracks.length)]);
  }

  return shuffleArray([...artistsTracks, ...genresTracks, ...restTracks]);
}
