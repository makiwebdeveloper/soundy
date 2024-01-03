import ProfileCollectionsList from "@/components/profile-collections-list";
import { getFavoriteTracksByProfileId } from "@/services/favorite-tracks.service";
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
    title: profile.name + " Favorites",
    description: `Discover the favorite tracks of ${profile.name} on Soundy! Immerse yourself in a curated collection of tracks that resonate with ${profile.name}'s musical soul. From timeless classics to contemporary gems, explore the sounds that have captured their heart. Join the experience, listen to the favorites, and let the music speak the language of ${profile.name}'s passion. 🎵💖 #Soundy #UserProfile #FavoriteTracks`,
  };
}

export default async function FavoritesPage({ params }: Props) {
  const favoriteTracks = await getFavoriteTracksByProfileId({
    profileId: Number(params.profileId),
    orderBy: "desc",
  });

  return (
    <ProfileCollectionsList
      type="favorites"
      items={favoriteTracks.map((fav) => ({
        id: fav.track.id,
        imageUrl: fav.track.imageUrl,
        title: fav.track.title,
        profile: fav.track.profile,
        isPublic: fav.track.isPublic,
      }))}
      context={{
        favoritesProfileId: Number(params.profileId),
      }}
    />
  );
}
