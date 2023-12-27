import ProfileCollectionsList from "@/components/profile-collections-list";
import { getProfilePlaylists } from "@/services/playlists.service";
import { getCurrentProfile, getProfileById } from "@/services/profiles.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
    title: profile.name + " Playlists",
    description: `Dive into the musical world of ${profile.name} on Soundy! Explore a collection of meticulously crafted playlists that reflect ${profile.name}'s diverse taste. From mood-setting mixes to thematic compilations, ${profile.name}'s playlists offer a sonic journey through their musical universe. Join the experience, discover new playlists, and let the music playlists tell the story of ${profile.name}'s unique soundscape. 🎶🎧 #Soundy #UserProfile #MusicPlaylists`,
  };
}

export default async function PlaylistsPage({ params }: Props) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  const playlists = await getProfilePlaylists({
    profileId: Number(params.profileId),
    orderBy: "desc",
    onlyPublic: currentProfile.id === Number(params.profileId) ? false : true,
  });

  return (
    <ProfileCollectionsList
      type="playlists"
      items={playlists.map((playlist) => ({
        id: playlist.id,
        imageUrl: playlist.tracks[0].imageUrl,
        title: playlist.title,
        profile: playlist.profile,
        isPublic: playlist.isPublic,
      }))}
      context={{}}
    />
  );
}
