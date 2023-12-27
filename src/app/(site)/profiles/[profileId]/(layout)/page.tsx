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
import { Metadata } from "next";

interface Props {
  params: {
    profileId: string;
  };
}

export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await getProfileById(Number(params.profileId));

  if (!profile)
    return {
      title: "Not found",
      description: "The page is not found.",
    };

  return {
    title: profile.name,
    description: `Discover the musical universe of ${profile.name} on Soundy! Explore their favorite tracks, handpicked playlists, and curated albums. ${profile.name}'s profile is a reflection of their unique musical journey, featuring a diverse collection that resonates with their soul. Join the experience, connect with ${profile.name}, and let the music be the language that unites us all. 🎶🔗 #Soundy #UserProfile #MusicDiscovery`,
  };
}

export default async function ProfilePage({ params }: Props) {
  const profileId = Number(params.profileId);
  const profileData = getProfileById(profileId);

  const limit = 3;
  const tracksData = getTracksByProfileId({
    profileId,
    limit: 2,
    orderBy: "desc",
  });
  const albumsData = getFullAlbumsByProfileId(profileId, limit, "desc");
  const playlistsData = getProfilePlaylists({
    profileId,
    limit,
    orderBy: "desc",
  });
  const favoriteTracksData = getFavoriteTracksByProfileId({
    profileId,
    limit,
    orderBy: "desc",
  });

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
