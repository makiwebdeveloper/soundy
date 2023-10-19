import Image from "next/image";
import Link from "next/link";
import { PageDescription, PageTitle } from "@/components/page-layout";
import { formatRelativeTime } from "@/utils/format-time";
import { FullAlbumType } from "@/types/albums.types";
import { ProfileType } from "@/types/profiles.types";

interface Props {
  album: Pick<FullAlbumType, "title" | "imageUrl" | "createdAt">;
  profile: Pick<ProfileType, "id" | "name">;
}

export default function AlbumHeader({ album, profile }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 2xl:gap-5">
      <div className="relative w-[200px] h-[200px] md:w-[125px] md:h-[125px] lg:w-[150px] lg:h-[150px] 2xl:w-[200px] 2xl:h-[200px]">
        <Image
          src={album.imageUrl}
          alt={`${album.title} image`}
          fill
          className="object-contain rounded-md bg-white/20 dark:bg-black/20"
        />
      </div>
      <div className="flex-1 text-center md:text-start">
        <PageTitle className="break-all">{album.title}</PageTitle>
        <PageDescription>
          Made by:{" "}
          <Link
            className="transition hover:text-white hover:underline"
            href={`/profiles/${profile.id}`}
          >
            {profile.name}
          </Link>
        </PageDescription>
      </div>
      <div>
        <p>{formatRelativeTime(new Date(album.createdAt))}</p>
      </div>
    </div>
  );
}
