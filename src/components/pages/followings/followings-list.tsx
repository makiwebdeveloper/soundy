import { AlbumType } from "@/types/albums.types";
import { FollowingType } from "@/types/followings.types";
import { TrackType } from "@/types/tracks.types";
import Image from "next/image";
import Link from "next/link";
import { Disc3Icon, ListMusicIcon, UsersIcon } from "lucide-react";

interface Props {
  followings: {
    id: number;
    name: string;
    createdAt: Date;
    imageUrl: string;
    tracks: TrackType[];
    albums: AlbumType[];
    followers: FollowingType[];
  }[];
}

export default function FollowingsList({ followings }: Props) {
  return (
    <ul className="space-y-[5px]">
      {followings.map((user) => (
        <li key={user.id}>
          <Link
            href={`/profiles/${user.id}`}
            className="group flex justify-between items-start p-[10px] transition hover:bg-black/40 rounded-lg"
          >
            <div className="flex gap-[10px]">
              <div className="relative w-[60px] h-[60px] md:w-[80px] md:h-[80px] xl:w-[100px] xl:h-[100px] 2xl:w-[120px] 2xl:h-[120px]">
                <Image
                  src={user.imageUrl}
                  alt={user.name}
                  fill
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-between">
                <p className="group-hover:underline text-lg md:text-xl">
                  {user.name}
                </p>
              </div>
            </div>
            <div className="flex gap-[10px]">
              <p className="flex items-center gap-1 text-xs">
                <UsersIcon className="w-[14px] h-[14px] xl:w-[16px] xl:h-[16px] 2xl:w-[18px] 2xl:h-[18px]" />
                {user.followers.length}
              </p>
              <p className="flex items-center gap-1 text-xs">
                <ListMusicIcon className="w-[14px] h-[14px] xl:w-[16px] xl:h-[16px] 2xl:w-[18px] 2xl:h-[18px]" />
                {user.tracks.length}
              </p>
              <p className="flex items-center gap-1 text-xs">
                <Disc3Icon className="w-[14px] h-[14px] xl:w-[16px] xl:h-[16px] 2xl:w-[18px] 2xl:h-[18px]" />
                {user.albums.length}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
