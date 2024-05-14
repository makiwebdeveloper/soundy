import { FollowingsList } from "@/components/pages/followings";
import { getProfileFollowers } from "@/services/followings.service";

interface Props {
  params: {
    profileId: string;
  };
}

export default async function FollowersPage({ params }: Props) {
  const followers = await getProfileFollowers(Number(params.profileId));

  return <FollowingsList followings={followers} />;
}
