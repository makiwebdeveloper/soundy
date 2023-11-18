import { getFullAlbumsByProfileId } from "@/services/albums.service";
import { getFavoriteTracksByProfileId } from "@/services/favorite-tracks.service";
import { getProfilePlaylists } from "@/services/playlists.service";
import { getTracksByProfileId } from "@/services/tracks.service";
import {
  ProfileAlbums,
  ProfilePlaylists,
  ProfileTracks,
} from "@/components/pages/profile";
import { getProfileById } from "@/services/profiles.service";
import { notFound } from "next/navigation";

interface Props {
  params: {
    profileId: string;
  };
}

export const revalidate = 0;

export default async function ProfilePage({ params }: Props) {
  const profileId = Number(params.profileId);
  const profileData = getProfileById(profileId);

  const limit = 3;
  const tracksData = getTracksByProfileId(profileId, 2, "desc");
  const albumsData = getFullAlbumsByProfileId(profileId, limit, "desc");
  const playlistsData = getProfilePlaylists(profileId, limit, "desc");
  const favoriteTracksData = getFavoriteTracksByProfileId(
    profileId,
    limit,
    "desc"
  );

  const [profile, tracks, albums, playlists, favoriteTracks] =
    await Promise.all([
      profileData,
      tracksData,
      albumsData,
      playlistsData,
      favoriteTracksData,
    ]);

  if (!profile) {
    notFound();
  }

  return (
    <div className="space-y-3">
      <ProfileTracks type="tracks" tracks={tracks} profile={profile} />
      <ProfileAlbums albums={albums} profile={profile} />
      <ProfilePlaylists playlists={playlists} profile={profile} />
      <ProfileTracks
        type="favorites"
        tracks={favoriteTracks.map((item) => item.track)}
        profile={profile}
      />
    </div>
  );
}
