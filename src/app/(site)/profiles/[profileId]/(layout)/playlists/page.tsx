import ProfileCollectionsList from "@/components/profile-collections-list";
import { getProfilePlaylists } from "@/services/playlists.service";

interface Props {
  params: {
    profileId: string;
  };
}

export default async function PlaylistsPage({ params }: Props) {
  const playlists = await getProfilePlaylists(Number(params.profileId));

  return (
    <ProfileCollectionsList
      type="playlists"
      items={playlists.map((playlist) => ({
        id: playlist.id,
        imageUrl: playlist.tracks[0].imageUrl,
        title: playlist.title,
        profile: playlist.profile,
      }))}
    />
  );
}
