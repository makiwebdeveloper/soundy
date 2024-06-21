import { getAlbumById } from "@/services/albums.service";
import { getFavoriteTracksByProfileId } from "@/services/favorite-tracks.service";
import { getListeningsByProfileId } from "@/services/listenings.service";
import { getPlayingTrack } from "@/services/playing-tracks.service";
import { getPlaylistById } from "@/services/playlists.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { getTracksByProfileId, playTrack } from "@/services/tracks.service";
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

  let prevTrackId = playingTrack.id;
  let isFirstTrack = false;

  const { playingContext } = playingTrack;

  if (playingContext.albumId) {
    const album = await getAlbumById(playingContext.albumId);

    if (!album) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const currentIndex = album.tracks.findIndex(
      (track) => track.id === playingTrack.track.id
    );

    if (currentIndex !== 0) {
      isFirstTrack = false;
      prevTrackId = album.tracks[currentIndex - 1].id;
    } else {
      isFirstTrack = true;
    }
  } else if (playingContext.playlistId) {
    const playlist = await getPlaylistById(playingContext.playlistId);

    if (!playlist) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const currentIndex = playlist.tracks.findIndex(
      (track) => track.id === playingTrack.track.id
    );

    if (currentIndex !== 0) {
      isFirstTrack = false;
      prevTrackId = playlist.tracks[currentIndex - 1].id;
    } else {
      isFirstTrack = true;
    }
  } else if (playingContext.tracksProfileId) {
    const tracks = await getTracksByProfileId({
      profileId: playingContext.tracksProfileId,
      orderBy: "desc",
      onlyPublic:
        currentProfile.id === playingContext.tracksProfileId ? false : true,
    });

    const currentIndex = tracks.findIndex(
      (track) => track.id === playingTrack.track.id
    );

    if (currentIndex !== 0) {
      isFirstTrack = false;
      prevTrackId = tracks[currentIndex - 1].id;
    } else {
      isFirstTrack = true;
    }
  } else if (playingContext.favoritesProfileId) {
    const favoriteTracks = await getFavoriteTracksByProfileId({
      profileId: playingContext.favoritesProfileId,
      orderBy: "desc",
    });

    const tracks = favoriteTracks.map((fav) => fav.track);

    const currentIndex = tracks.findIndex(
      (track) => track.id === playingTrack.track.id
    );

    if (currentIndex !== 0) {
      isFirstTrack = false;
      prevTrackId = tracks[currentIndex - 1].id;
    } else {
      isFirstTrack = true;
    }
  } else if (playingContext.history) {
    const listenings = await getListeningsByProfileId({
      profileId: currentProfile.id,
      orderBy: "desc",
    });

    const tracks = listenings.map((listening) => listening.track);

    const currentIndex = tracks.findIndex(
      (track) => track.id === playingTrack.track.id
    );

    if (currentIndex !== 0) {
      isFirstTrack = false;
      prevTrackId = tracks[currentIndex - 1].id;
    } else {
      isFirstTrack = true;
    }
  }

  if (!isFirstTrack) {
    const noUpdateDate = playingContext.history ? true : false;

    const newPlayingTrackId = await playTrack(
      {
        profileId: currentProfile.id,
        trackId: prevTrackId,
        albumId: playingContext.albumId || undefined,
        playlistId: playingContext.playlistId || undefined,
        favoritesProfileId: playingContext.favoritesProfileId || undefined,
        tracksProfileId: playingContext.tracksProfileId || undefined,
        history: playingContext.history || undefined,
      },
      noUpdateDate
    );

    return NextResponse.json(
      { playingTrackId: newPlayingTrackId, trackId: prevTrackId },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { playingTrackId: playingTrack.id, trackId: prevTrackId },
      { status: 200 }
    );
  }
}
