import ProfileCollectionsList from "@/components/profile-collections-list";
import { getFavoriteTracksByProfileId } from "@/services/favorite-tracks.service";

interface Props {
  params: {
    profileId: string;
  };
}

export const revalidate = 0;

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
        profile: fav.profile,
        isPublic: fav.track.isPublic,
      }))}
      context={{
        favoritesProfileId: Number(params.profileId),
      }}
    />
  );
}
