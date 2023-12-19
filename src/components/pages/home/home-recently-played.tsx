import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function HomeRecentlyPlayed() {
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
          {new Array(5).fill(null).map((item, idx) => (
            <div
              key={idx}
              className="w-[138px] h-[138px] md:w-[124px] md:h-[124px] lg:w-[134px] lg:h-[134px] 2xl:w-[179px] 2xl:h-[179px] rounded-md bg-black/40"
            ></div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </section>
  );
}
