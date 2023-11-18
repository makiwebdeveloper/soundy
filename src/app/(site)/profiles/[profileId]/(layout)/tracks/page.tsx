import ProfileCollectionsList from "@/components/profile-collections-list";
import { getTracksByProfileId } from "@/services/tracks.service";

interface Props {
  params: {
    profileId: string;
  };
}

export default async function TracksPage({ params }: Props) {
  const tracks = await getTracksByProfileId(Number(params.profileId));

  return (
    <ProfileCollectionsList
      type="tracks"
      items={tracks.map((track) => ({
        id: track.id,
        imageUrl: track.imageUrl,
        title: track.title,
        profile: track.profile,
      }))}
    />
  );
}
