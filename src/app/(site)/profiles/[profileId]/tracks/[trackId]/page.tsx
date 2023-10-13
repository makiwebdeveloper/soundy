import { notFound, redirect } from "next/navigation";
import { TrackHeader, TrackTools } from "@/components/track-page";
import { PageLayout } from "@/components/page-layout";
import { getTrackById } from "@/services/tracks.service";
import { getFavoriteTrack } from "@/services/favorite-tracks.service";
import { getCurrentProfile } from "@/services/profiles.service";

interface Props {
  params: {
    profileId: string;
    trackId: string;
  };
}

export default async function TrackPage({ params }: Props) {
  const currentProfile = await getCurrentProfile();
  const track = await getTrackById(Number(params.trackId));

  if (!currentProfile) {
    redirect("/create-profile");
  }

  if (!track) {
    notFound();
  }

  const favoriteTrack = await getFavoriteTrack({
    profileId: currentProfile.id,
    trackId: track.id,
  });

  return (
    <PageLayout>
      <TrackHeader
        title={track.title}
        imageUrl={track.imageUrl}
        profileId={track.profile.id}
        profileName={track.profile.name}
      />
      <TrackTools track={track} initialFavoriteTrack={favoriteTrack} />
    </PageLayout>
  );
}
