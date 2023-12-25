import ProfileCollectionsList from "@/components/profile-collections-list";
import { getProfilePlaylists } from "@/services/playlists.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { redirect } from "next/navigation";

interface Props {
  params: {
    profileId: string;
  };
}

export const revalidate = 0;

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
