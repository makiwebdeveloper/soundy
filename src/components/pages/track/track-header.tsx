import Image from "next/image";
import Link from "next/link";
import { PageDescription, PageTitle } from "@/components/page-layout";
import { ProfileType } from "@/types/profiles.types";
import { FullTrackType } from "@/types/tracks.types";
import { formatRelativeTime } from "@/utils/format-time";
import { EditTrackDialog } from "@/components/dialogs";

interface Props {
  track: FullTrackType;
  profile: Pick<ProfileType, "id" | "name">;
}

export default function TrackHeader({ track, profile }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 2xl:gap-5">
      <div className="relative w-[200px] h-[200px] md:w-[125px] md:h-[125px] lg:w-[150px] lg:h-[150px] 2xl:w-[200px] 2xl:h-[200px]">
        <Image
          src={track.imageUrl}
          alt={`${track.title} image`}
          fill
          className="object-contain rounded-md bg-white/20 dark:bg-black/20"
        />
      </div>
      <div className="flex-1 text-center md:text-start">
        <PageTitle className="break-all">{track.title}</PageTitle>
        <PageDescription>
          Made by:{" "}
          <Link
            className="transition hover:text-white hover:underline underline-offset-2"
            href={`/profiles/${track.profile.id}`}
          >
            {track.profile.name}
          </Link>
        </PageDescription>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <p>{formatRelativeTime(new Date(track.createdAt))}</p>
        {profile.id === track.profile.id && <EditTrackDialog track={track} />}
      </div>
    </div>
  );
}
