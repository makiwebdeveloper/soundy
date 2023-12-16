import ProfileCollectionsList from "@/components/profile-collections-list";
import { getFavoriteTracksByProfileId } from "@/services/favorite-tracks.service";

interface Props {
  params: {
    profileId: string;
  };
}

export default async function FavoritesPage({ params }: Props) {
  const favoriteTracks = await getFavoriteTracksByProfileId(
    Number(params.profileId)
  );

  return (
    <ProfileCollectionsList
      type="favorites"
      items={favoriteTracks.map((fav) => ({
        id: fav.track.id,
        imageUrl: fav.track.imageUrl,
        title: fav.track.title,
        profile: fav.profile,
      }))}
      context={{
        favoritesProfileId: Number(params.profileId),
      }}
    />
  );
}
