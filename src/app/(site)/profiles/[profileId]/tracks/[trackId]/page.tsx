import { notFound, redirect } from "next/navigation";
import { Comments, TrackHeader, TrackTools } from "@/components/track-page";
import { PageLayout } from "@/components/page-layout";
import { getTrackById } from "@/services/tracks.service";
import { getCurrentProfile } from "@/services/profiles.service";
import { getCommentsByTrackId } from "@/services/comments.service";

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

  if (!track) {
    notFound();
  }

  const isCreator = track.profileId === currentProfile.id;

  if (track.isPublic && !isCreator) {
    notFound();
  }

  const comments = await getCommentsByTrackId(track.id);

  return (
    <PageLayout>
      <TrackHeader
        title={track.title}
        imageUrl={track.imageUrl}
        profileId={track.profile.id}
        profileName={track.profile.name}
      />
      <TrackTools track={track} profileId={currentProfile.id} />
      <div className="h-[3px] bg-white/20 dark:bg-black/40 w-full rounded-full"></div>
      <Comments
        initialComments={comments}
        trackId={track.id}
        currentProfileId={currentProfile.id}
      />
    </PageLayout>
  );
}
