import { getAlbumById } from "@/services/albums.service";
import { clearPlayingContext } from "@/services/playing-contexts.service";
import { getPlayingTrack } from "@/services/playing-tracks.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { playTrack } from "@/services/tracks.service";
import { getRandomElementFromArray } from "@/utils/get-random-element-from-array";
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

  if (playingContext.albumId) {
    const album = await getAlbumById(playingContext.albumId);

    if (!album) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const currentIndex = album.tracks.findIndex(
      (track) => track.id === playingTrack.track.id
    );

    if (playingContext.isShuffle) {
      const randomTrack = getRandomElementFromArray(album.tracks, currentIndex);

      nextTrackId = randomTrack.id;
    } else {
      if (currentIndex !== album.tracks.length - 1) {
        nextTrackId = album.tracks[currentIndex + 1].id;
      } else {
        if (playingContext.repeat === "REPEAT-ALL") {
          nextTrackId = album.tracks[0].id;
        } else {
          nextTrackId = album.tracks[album.tracks.length - 1].id;
        }
      }
    }
  }

  const newPlayingTrackId = await playTrack({
    profileId: currentProfile.id,
    trackId: nextTrackId,
    albumId: playingContext.albumId || undefined,
    playlistId: playingContext.playlistId || undefined,
    favoritesProfileId: playingContext.favoritesProfileId || undefined,
    tracksProfileId: playingContext.tracksProfileId || undefined,
    history: playingContext.history || undefined,
  });

  return NextResponse.json(
    { playingTrackId: newPlayingTrackId, trackId: nextTrackId },
    { status: 200 }
  );
}
