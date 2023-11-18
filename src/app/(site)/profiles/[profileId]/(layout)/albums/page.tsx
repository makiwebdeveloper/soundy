import ProfileCollectionsList from "@/components/profile-collections-list";
import { getFullAlbumsByProfileId } from "@/services/albums.service";

interface Props {
  params: {
    profileId: string;
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
      }))}
    />
  );
}
