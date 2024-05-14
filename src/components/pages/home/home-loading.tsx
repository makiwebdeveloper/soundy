import { PageLayout } from "@/components/page-layout";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { HeartIcon } from "lucide-react";

export default function HomeLoading() {
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
    <PageLayout>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3 2xl:gap-5">
          <h1 className="text-4xl 2xl:text-6xl font-bold">Soundy</h1>
          <div className="h-7 2xl:h-14 w-[3px] 2xl:w-1 bg-white rounded-full"></div>
          <h3 className="text-xl 2xl:text-2xl font-semibold">Home</h3>
        </div>
        <Skeleton className="rounded-full w-14 h-14" />
      </header>
      <section className="flex flex-col gap-1">
        <h6 className="font-semibold text-lg">{greetingText}</h6>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
          <div className="cursor-pointer h-[60px] sm:h-[80px] rounded-md bg-white/10 dark:bg-black/20 transition hover:bg-white/20 dark:hover:bg-black/30 flex items-center gap-3">
            <div className="bg-pink-400/80 w-[60px] sm:w-[80px] rounded-l-md h-full flex-center">
              <HeartIcon className="sm:w-10 sm:h-10" />
            </div>
            <p className="font-medium text-lg">Favorite tracks</p>
          </div>
          {new Array(3).fill(null).map((item, idx) => (
            <div
              key={idx}
              className="cursor-pointer h-[60px] sm:h-[80px] rounded-md bg-white/10 dark:bg-black/20 transition hover:bg-white/20 dark:hover:bg-black/30 flex items-center gap-3"
            >
              <div className="rounded-l-md bg-white/10 dark:bg-black/20 w-[60px] sm:w-[80px] h-full flex-center" />
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-1">
        <h6 className="font-semibold text-lg">For you</h6>
        <ScrollArea className="w-[calc(100vw-24px)] md:w-auto">
          <div className="flex gap-3">
            {new Array(6).fill(null).map((track, idx) => (
              <Skeleton
                key={idx}
                className="cursor-pointer w-[138px] h-[138px] md:w-[101px] md:h-[101px] lg:w-[110px] lg:h-[110px] 2xl:w-[147px] 2xl:h-[147px] rounded-md"
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </section>
      <section className="flex flex-col gap-1">
        <h6 className="font-semibold text-lg">Recently played</h6>
        <ScrollArea className="w-[calc(100vw-24px)] md:w-auto">
          <div className="flex gap-3">
            {new Array(6).fill(null).map((track, idx) => (
              <Skeleton
                key={idx}
                className="cursor-pointer w-[138px] h-[138px] md:w-[101px] md:h-[101px] lg:w-[110px] lg:h-[110px] 2xl:w-[147px] 2xl:h-[147px] rounded-md"
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </section>
    </PageLayout>
  );
}
