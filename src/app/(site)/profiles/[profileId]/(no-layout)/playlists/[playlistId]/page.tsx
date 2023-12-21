import { getPlaylistById } from "@/services/playlists.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    profileId: string;
    playlistId: string;
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
