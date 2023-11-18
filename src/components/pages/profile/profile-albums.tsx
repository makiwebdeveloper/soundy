import Link from "next/link";
import { FullAlbumType } from "@/types/albums.types";
import { ProfileType } from "@/types/profiles.types";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface Props {
  profile: ProfileType;
  albums: FullAlbumType[];
}

export default function ProfileAlbums({ albums, profile }: Props) {
  if (albums.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mx-2 flex items-center justify-between">
        <h3 className="text-2xl font-semibold capitalize">Albums</h3>
        <Link
          href={`/profiles/${profile.id}/albums`}
          className="text-sm text-white/70 dark:text-white/50 transition hover:underline underline-offset-2 hover:text-white dark:hover:text-white"
        >
          See more
        </Link>
      </div>
      <div className="h-[90px] flex gap-[22px] mx-2 mt-2">
        {albums.map((album) => (
          <Link
            key={album.id}
            href={`/profiles/${profile.id}/albums/${album.id}`}
            className={cn(
              `relative w-[80px] h-[80px] rounded-md z-[0] after:transition-all before:transition-all`,
              "after:content-[''] after:z-[-10] after:absolute after:top-[5px] after:left-[5px] after:rounded-md after:w-full after:h-full after:bg-white/50 dark:after:bg-black/80 hover:after:left-[8px] hover:after:top-[8px] after:duration-500",
              "before:content-[''] after:z-[-20] before:absolute before:top-[10px] before:left-[10px] before:rounded-md before:w-full before:h-full before:bg-white/20 dark:before:bg-black/50 hover:before:left-[16px] hover:before:top-[16px] before:duration-500"
            )}
          >
            <Image
              fill
              src={album.imageUrl}
              alt={album.title}
              className="object-cover rounded-md bg-white/20 dark:bg-black/20"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
