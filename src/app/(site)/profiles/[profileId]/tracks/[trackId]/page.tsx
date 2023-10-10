import { notFound } from "next/navigation";
import { TrackHeader, TrackTools } from "@/components/track-page";
import { PageLayout } from "@/components/page-layout";
import { getTrackById } from "@/services/tracks.service";

interface Props {
  params: {
    profileId: string;
    trackId: string;
  };
}

export default async function TrackPage({ params }: Props) {
  const track = await getTrackById(Number(params.trackId));

  if (!track) {
    notFound();
  }

  return (
    <PageLayout>
      <TrackHeader
        title={track.title}
        imageUrl={track.imageUrl}
        profileId={track.profile.id}
        profileName={track.profile.name}
      />
      <TrackTools trackId={track.id} />
    </PageLayout>
  );
}
