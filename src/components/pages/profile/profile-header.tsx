"use client";

import { PageTitle } from "@/components/page-layout";
import { FullProfileType } from "@/types/profiles.types";
import Image from "next/image";
import ProfilePopularity from "./profile-popularity";
import FollowingButton from "./following-button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  initialProfile: FullProfileType;
  currentProfileId: number;
}

export default function ProfileHeader({
  initialProfile,
  currentProfileId,
}: Props) {
  const { data: profile } = useQuery({
    queryKey: [`profile ${initialProfile.id}`],
    queryFn: async () => {
      const res = await axios.get<{ profile: FullProfileType }>(
        `/api/profiles?profileId=${initialProfile.id}`
      );

      return res.data.profile;
    },
    initialData: initialProfile,
  });

  const isCurrentProfile = profile.id === currentProfileId;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 2xl:gap-5">
      <div className="relative w-[200px] h-[200px] md:w-[125px] md:h-[125px] lg:w-[150px] lg:h-[150px] 2xl:w-[200px] 2xl:h-[200px]">
        <Image
          src={profile.imageUrl}
          alt={`${profile.name} image`}
          fill
          className="object-cover rounded-full bg-white/20 dark:bg-black/20"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between items-center gap-3 md:items-start md:h-[125px] lg:h-[150px] 2xl:h-[200px]">
        <PageTitle className="break-all">{profile.name}</PageTitle>
        {!isCurrentProfile && (
          <FollowingButton
            profileId={profile.id}
            currentProfileId={currentProfileId}
            isFollow={
              !!profile.followers.some(
                (item) => item.followerId === currentProfileId
              )
            }
          />
        )}
      </div>
      <ProfilePopularity
        followers={profile.followers.length}
        followings={profile.followings.length}
        tracks={profile.tracks.length}
        profileId={profile.id}
        isCurrentProfile={isCurrentProfile}
      />
    </div>
  );
}
