import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BadgeInfoIcon,
  CopyPlusIcon,
  HeartIcon,
  Link2Icon,
  PlayCircleIcon,
  PlayIcon,
  SendIcon,
} from "lucide-react";

export default function Loading() {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-3 2xl:gap-5">
        <Skeleton className="w-[200px] h-[200px] md:w-[125px] md:h-[125px] lg:w-[150px] lg:h-[150px] 2xl:w-[200px] 2xl:h-[200px] rounded-md" />
        <div className="flex-1 text-center md:text-start">
          <Skeleton className="mx-auto md:mx-0 w-[100px] h-[25px] md:h-[20px] 2xl:h-[25px] mb-2" />
          <Skeleton className="mx-auto md:mx-0 w-[200px] h-[15px] 2xl:h-[20px]" />
        </div>
        <div>
          <Skeleton className="w-[100px] h-[15px] 2xl:h-[20px]" />
        </div>
      </div>
      <div className="flex gap-3 flex-col lg:flex-row items-center md:items-start lg:items-center lg:justify-between">
        <div className="flex gap-3 w-full flex-col sm:flex-row justify-center md:justify-normal">
          <Button>
            <PlayCircleIcon className="mr-2 w-4 h-4" /> Play
          </Button>
          <Button>
            <HeartIcon className="mr-2 w-4 h-4" /> Like
          </Button>
          <Button>
            <Link2Icon className="mr-2 w-4 h-4" /> Copy link
          </Button>
          <Button>
            <CopyPlusIcon className="mr-2 w-4 h-4" /> Add to playlist
          </Button>
          <Button>
            <BadgeInfoIcon className="mr-2 w-4 h-4" /> Details
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <p className="flex items-center gap-2 text-white/70 dark:text-white/50">
            <PlayIcon className="w-4 h-4" /> 0
          </p>
          <p className="flex items-center gap-2 text-white/70 dark:text-white/50">
            <HeartIcon className="w-4 h-4" /> 0
          </p>
        </div>
      </div>
      <div className="h-[3px] bg-white/20 dark:bg-black/40 w-full rounded-full"></div>
      <form className="flex gap-3">
        <Input id="text" placeholder="write a comment" />
        <Button type="submit" className="flex gap-2">
          <span className="hidden sm:block">Send</span>{" "}
          <SendIcon className="w-4 h-4" />
        </Button>
      </form>
    </PageLayout>
  );
}
