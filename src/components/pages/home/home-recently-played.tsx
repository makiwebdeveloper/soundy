import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/cn";
import { TrackType } from "@/types/tracks.types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  recentlyTracks: TrackType[];
}

export default function HomeRecentlyPlayed({ recentlyTracks }: Props) {
  if (recentlyTracks.length === 0) return null;

  return (
    <section className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h6 className="font-semibold text-lg">Recently played</h6>
        <Link
          href={`/history`}
          className="text-sm text-white/70 dark:text-white/50 transition hover:underline underline-offset-2 hover:text-white dark:hover:text-white"
        >
          See all
        </Link>
      </div>
      <ScrollArea className="w-[calc(100vw-24px)] md:w-auto">
        <div className="flex gap-3">
          {recentlyTracks.map((track, idx) => (
            <Link
              key={idx}
              href={`/profiles/${track.profileId}/tracks/${track.id}`}
              className={cn(
                "relative group w-[138px] h-[138px] md:w-[101px] md:h-[101px] lg:w-[110px] lg:h-[110px] 2xl:w-[147px] 2xl:h-[147px] rounded-md",
                "after:absolute after:rounded-md after:content-[''] after:w-full after:h-full hover:after:bg-gradient-to-t hover:after:from-black/90 hover:after:to-black/20 hover:after:transition"
              )}
            >
              <Image
                fill
                className="object-cover rounded-md"
                src={track.imageUrl}
                alt={track.title}
              />
              <div className="absolute hidden group-hover:block z-[10] bottom-1 left-2">
                <p className="truncate w-[128px] md:w-[90px] lg:w-[100px] 2xl:w-[135px] text-xs 2xl:text-base font-semibold ">
                  {track.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}
