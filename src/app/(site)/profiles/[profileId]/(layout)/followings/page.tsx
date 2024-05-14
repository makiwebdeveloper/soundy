import { FollowingsList } from "@/components/pages/followings";
import { getProfileFollowings } from "@/services/followings.service";

interface Props {
  params: {
    profileId: string;
  };
}

export default async function FollowingsPage({ params }: Props) {
  const followings = await getProfileFollowings(Number(params.profileId));

  return <FollowingsList followings={followings} />;
}
