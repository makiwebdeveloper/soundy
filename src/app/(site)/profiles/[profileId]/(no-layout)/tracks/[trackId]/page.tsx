import { notFound, redirect } from "next/navigation";
import { getTrackById } from "@/services/tracks.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { getCommentsByTrackId } from "@/services/comments.service";
import { Track } from "@/components/pages/track";
import { getProfilePlaylists } from "@/services/playlists.service";

interface Props {
  params: {
    profileId: string;
    trackId: string;
  };
}

export default async function TrackPage({ params }: Props) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  const track = await getTrackById(Number(params.trackId));
  const playlists = await getProfilePlaylists(currentProfile.id);

  if (!track) {
    notFound();
  }

  const isCreator = track.profileId === currentProfile.id;

  if (!track.isPublic && !isCreator) {
    notFound();
  }

  const comments = await getCommentsByTrackId(track.id, "desc");

  return (
    <Track
      currentProfile={currentProfile}
      initialTrack={track}
      initialComments={comments}
      initialPlaylists={playlists}
    />
  );
}
