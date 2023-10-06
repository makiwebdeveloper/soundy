import {
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout";
import { getTrackById } from "@/services/tracks.service";
import Image from "next/image";
import { notFound } from "next/navigation";

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
      <PageHeader>
        <div className="relative w-[300px] h-[300px] aspect-[500/300]">
          <Image
            src={track.imageUrl}
            alt={track.title}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <PageTitle>{track.title}</PageTitle>
          <PageDescription>
            If you want to upload a track, add one file, and if you want to
            upload an album, add several.
          </PageDescription>
        </div>
      </PageHeader>
    </PageLayout>
  );
}
