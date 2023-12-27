import { getPlaylistById } from "@/services/playlists.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    profileId: string;
    playlistId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const playlist = await getPlaylistById(Number(params.playlistId));

  if (!playlist)
    return {
      title: "Not found",
      description: "The page is not found.",
    };

  return {
    title: playlist.title,
    description: `Dive into the curated world of ${playlist.title} on Soundy! Explore a playlist handcrafted by the artist, featuring their favorite tracks and hidden gems. Immerse yourself in the sonic journey crafted by the musical genius. Join the experience, discover new favorites, and let the playlist resonate with your musical soul. 🎶🎨 #Soundy #ArtistPlaylist #MusicCurated`,
  };
}

export default async function PlaylistPage({ params }: Props) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  const playlist = await getPlaylistById(Number(params.playlistId));

  if (!playlist) {
    notFound();
  }

  const isCreator = playlist.profileId === currentProfile.id;

  if (!playlist.isPublic && !isCreator) {
    notFound();
  }

  return <div>PlaylistPage</div>;
}
