import { getAlbumById } from "@/services/albums.service";
import { getFavoriteTracksByProfileId } from "@/services/favorite-tracks.service";
import { getListeningsByProfileId } from "@/services/listenings.service";
import { getPlayingTrack } from "@/services/playing-tracks.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { getTracksByProfileId, playTrack } from "@/services/tracks.service";
import { getNextTrack } from "@/utils/get-next-track";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const playingTrack = await getPlayingTrack(currentProfile.id);

  if (!playingTrack) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { playingContext } = playingTrack;

  let nextTrackId = playingTrack.track.id;

  const contextInfo = {
    playingTrackId: playingTrack.track.id,
    isShuffle: playingContext.isShuffle,
    repeat: playingContext.repeat,
  };

  if (playingContext.albumId) {
    const album = await getAlbumById(playingContext.albumId);

    if (!album) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    nextTrackId = getNextTrack({
      tracks: album.tracks,
      ...contextInfo,
    });
  } else if (playingContext.tracksProfileId) {
    const tracks = await getTracksByProfileId({
      profileId: playingContext.tracksProfileId,
      orderBy: "desc",
      onlyPublic:
        currentProfile.id === playingContext.tracksProfileId ? false : true,
    });

    nextTrackId = getNextTrack({
      tracks,
      ...contextInfo,
    });
  } else if (playingContext.favoritesProfileId) {
    const favoriteTracks = await getFavoriteTracksByProfileId({
      profileId: currentProfile.id,
      orderBy: "desc",
    });

    nextTrackId = getNextTrack({
      tracks: favoriteTracks.map((fav) => fav.track),
      ...contextInfo,
    });
  } else if (playingContext.history) {
    const listenings = await getListeningsByProfileId({
      profileId: currentProfile.id,
      orderBy: "desc",
    });

    nextTrackId = getNextTrack({
      tracks: listenings.map((listening) => listening.track),
      ...contextInfo,
    });
  }

  const noUpdateDate = playingContext.history ? true : false;

  const newPlayingTrackId = await playTrack(
    {
      profileId: currentProfile.id,
      trackId: nextTrackId,
      albumId: playingContext.albumId || undefined,
      playlistId: playingContext.playlistId || undefined,
      favoritesProfileId: playingContext.favoritesProfileId || undefined,
      tracksProfileId: playingContext.tracksProfileId || undefined,
      history: playingContext.history || undefined,
    },
    noUpdateDate
  );

  return NextResponse.json(
    { playingTrackId: newPlayingTrackId, trackId: nextTrackId },
    { status: 200 }
  );
}
