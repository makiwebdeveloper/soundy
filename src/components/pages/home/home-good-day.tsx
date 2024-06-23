import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  profileId: number;
  tracks:
    | { id: number; title: string; imageUrl: string; profileId: number }[]
    | null;
  album: {
    id: number;
    title: string;
    imageUrl: string;
    profileId: number;
  } | null;
}

export default function HomeGoodDay({ profileId, album, tracks }: Props) {
  const currentTime = new Date().getHours();
  let greetingText = "";

  if (currentTime < 12) {
    greetingText = "Good morning";
  } else if (currentTime < 18) {
    greetingText = "Good afternoon";
  } else {
    greetingText = "Good evening";
  }

  return (
    <section className="flex flex-col gap-1">
      <h6 className="font-semibold text-lg">{greetingText}</h6>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
        <Link
          href={`/profiles/${profileId}/favorites`}
          className="h-[60px] sm:h-[80px] rounded-md bg-white/10 dark:bg-black/20 transition hover:bg-white/20 dark:hover:bg-black/30 flex items-center gap-3"
        >
          <div className="bg-pink-400/80 w-[60px] sm:w-[80px] rounded-l-md h-full flex-center">
            <HeartIcon className="sm:w-10 sm:h-10" />
          </div>
          <p className="font-medium text-lg">Favorite tracks</p>
        </Link>
        {album && (
          <Link
            href={`/profiles/${album.profileId}/albums/${album.id}`}
            className="h-[60px] sm:h-[80px] rounded-md bg-white/10 dark:bg-black/20 transition hover:bg-white/20 dark:hover:bg-black/30 flex items-center gap-3"
          >
            <div className="relative bg-white/10 dark:bg-black/20 w-[60px] sm:w-[80px] rounded-l-md h-full flex-center">
              <Image
                fill
                className="object-cover rounded-l-md bg-white/20 dark:bg-black/20"
                src={album.imageUrl}
                alt={album.title}
              />
            </div>
            <p className="font-medium text-lg">{album.title}</p>
          </Link>
        )}
        {tracks &&
          tracks.map((track) => (
            <Link
              key={track.id}
              href={`/profiles/${track.profileId}/tracks/${track.id}`}
              className="h-[60px] sm:h-[80px] rounded-md bg-white/10 dark:bg-black/20 transition hover:bg-white/20 dark:hover:bg-black/30 flex items-center gap-3"
            >
              <div className="relative bg-white/10 dark:bg-black/20 w-[60px] sm:w-[80px] rounded-l-md h-full flex-center">
                <Image
                  fill
                  className="object-cover rounded-l-md bg-white/20 dark:bg-black/20"
                  src={track.imageUrl}
                  alt={track.title}
                />
              </div>
              <p className="font-medium text-lg">{track.title}</p>
            </Link>
          ))}
      </div>
    </section>
  );
}
