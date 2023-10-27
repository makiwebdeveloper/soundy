import Link from "next/link";
import FollowingButton from "./following-button";

interface Props {
  followers: number;
  followings: number;
  tracks: number;
  profileId: number;
  isCurrentProfile: boolean;
}

export default function ProfilePopularity({
  followers,
  followings,
  tracks,
  profileId,
  isCurrentProfile,
}: Props) {
  const popularity = [
    {
      title: "Followers",
      value: followers,
      path: `/profiles/${profileId}/followers`,
    },
    {
      title: "Followings",
      value: followings,
      path: `/profiles/${profileId}/followings`,
    },
    {
      title: "Tracks",
      value: tracks,
      path: `/profiles/${profileId}/tracks`,
    },
  ];

  return (
    <div className="flex flex-col justify-between md:h-[125px] lg:h-[150px] 2xl:h-[200px]">
      <div className="flex md:flex-col gap-3 md:gap-0 items-center md:items-end">
        {popularity.map((item) => (
          <Link
            href={item.path}
            className="flex gap-2 md:gap-3 items-center group pb-[1px] hover:pb-0 hover:border-b"
            key={item.title}
          >
            <span className="text-sm 2xl:text-base text-white/70 dark:text-white/50 transition group-hover:text-white">
              {item.title}
            </span>
            <span className="text-lg 2xl:text-xl font-semibold text-white">
              {item.value}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
