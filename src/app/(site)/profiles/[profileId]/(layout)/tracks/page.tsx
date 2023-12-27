import ProfileCollectionsList from "@/components/profile-collections-list";
import { getCurrentProfile, getProfileById } from "@/services/profiles.service";
import { getTracksByProfileId } from "@/services/tracks.service";
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
    title: profile.name + " Tracks",
    description: `Explore the musical tapestry of ${profile.name} on Soundy! Immerse yourself in a collection of tracks that define their unique sonic journey. From cherished classics to contemporary favorites, ${profile.name}'s profile tracks showcase a curated selection that resonates with their musical soul. Join the experience, discover new tracks, and let the music tell the story of ${profile.name}'s diverse musical palette. 🎵🌈 #Soundy #UserProfile #MusicTracks`,
  };
}

export default async function TracksPage({ params }: Props) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  const tracks = await getTracksByProfileId({
    profileId: Number(params.profileId),
    orderBy: "desc",
    onlyPublic: currentProfile.id === Number(params.profileId) ? false : true,
  });

  return (
    <ProfileCollectionsList
      type="tracks"
      items={tracks.map((track) => ({
        id: track.id,
        imageUrl: track.imageUrl,
        title: track.title,
        profile: track.profile,
        isPublic: track.isPublic,
      }))}
      context={{
        tracksProfileId: Number(params.profileId),
      }}
    />
  );
}
