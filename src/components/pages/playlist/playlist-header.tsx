import { EditPlaylistDialog } from "@/components/dialogs";
import { PageDescription, PageTitle } from "@/components/page-layout";
import { PlaylistWithTracksType } from "@/types/playlists.types";
import { ProfileType } from "@/types/profiles.types";
import { formatRelativeTime } from "@/utils/format-time";
import Image from "next/image";
import Link from "next/link";

interface Props {
  playlist: PlaylistWithTracksType;
  profile: ProfileType;
}

export default function PlaylistHeader({ playlist, profile }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 2xl:gap-5">
      <div className="relative w-[200px] h-[200px] md:w-[125px] md:h-[125px] lg:w-[150px] lg:h-[150px] 2xl:w-[200px] 2xl:h-[200px]">
        <Image
          src={playlist.tracks[0].imageUrl}
          alt={`${playlist.title} image`}
          fill
          className="object-contain rounded-md bg-white/20 dark:bg-black/20"
        />
      </div>
      <div className="flex-1 text-center md:text-start">
        <PageTitle className="break-all">{playlist.title}</PageTitle>
        <PageDescription>
          Made by:{" "}
          <Link
            className="transition hover:text-white hover:underline underline-offset-2"
            href={`/profiles/${playlist.profile.id}`}
          >
            {playlist.profile.name}
          </Link>
        </PageDescription>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <p>{formatRelativeTime(new Date(playlist.createdAt))}</p>
        {profile.id === playlist.profile.id && (
          <EditPlaylistDialog playlist={playlist} />
        )}
      </div>
    </div>
  );
}
