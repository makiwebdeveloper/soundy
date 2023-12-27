import ProfileCollectionsList from "@/components/profile-collections-list";
import { getFullAlbumsByProfileId } from "@/services/albums.service";
import { getProfileById } from "@/services/profiles.service";
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
    title: profile.name + " Albums",
    description: `Explore the musical world of ${profile.name} on Soundy! Delve into a collection of handpicked albums that define their unique taste. From favorite classics to hidden gems, ${profile.name}'s profile albums showcase a curated journey through the sounds they love. Join the experience, discover new albums, and let the music tell the story of [User's Name]'s sonic adventure. 🎶📚 #Soundy #UserProfile #MusicJourney`,
  };
}

export default async function AlbumsPage({ params }: Props) {
  const albums = await getFullAlbumsByProfileId(
    Number(params.profileId),
    undefined,
    "desc"
  );

  return (
    <ProfileCollectionsList
      type="albums"
      items={albums.map((album) => ({
        id: album.id,
        imageUrl: album.imageUrl,
        title: album.title,
        profile: album.profile,
        isPublic: true,
      }))}
      context={{}}
    />
  );
}
