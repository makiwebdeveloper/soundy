import ProfileCollectionsList from "@/components/profile-collections-list";
import { getCurrentProfile } from "@/services/profiles.service";
import { getTracksByProfileId } from "@/services/tracks.service";
import { redirect } from "next/navigation";

interface Props {
  params: {
    profileId: string;
  };
}

export default async function TracksPage({ params }: Props) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  const tracks = await getTracksByProfileId({
    profileId: Number(params.profileId),
    orderBy: "desc",
    onlyPublic: currentProfile.id === Number(params.profileId) ? false : true,
  });

  return (
    <ProfileCollectionsList
      type="tracks"
      items={tracks.map((track) => ({
        id: track.id,
        imageUrl: track.imageUrl,
        title: track.title,
        profile: track.profile,
        isPublic: track.isPublic,
      }))}
      context={{
        tracksProfileId: Number(params.profileId),
      }}
    />
  );
}
