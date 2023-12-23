import { PageLayout } from "@/components/page-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayIcon } from "lucide-react";

export default function Loading() {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-3 2xl:gap-5">
        <Skeleton className="relative w-[200px] h-[200px] md:w-[125px] md:h-[125px] lg:w-[150px] lg:h-[150px] 2xl:w-[200px] 2xl:h-[200px] rounded-md" />
        <div className="flex-1 text-center md:text-start">
          <Skeleton className="mx-auto md:mx-0 w-[100px] h-[25px] md:h-[20px] 2xl:h-[25px] mb-2" />
          <Skeleton className="mx-auto md:mx-0 w-[200px] h-[15px] 2xl:h-[20px]" />
        </div>
        <div>
          <Skeleton className="w-[100px] h-[15px] 2xl:h-[20px]" />
        </div>
      </div>
      <div className="space-y-1">
        {new Array(5).fill(null).map((item, idx) => (
          <div
            key={idx}
            className="group flex items-center gap-3 p-2 transition rounded-md"
          >
            <Skeleton className="rounded-md w-[40px] h-[40px]" />
            <div className="flex-1 flex items-center gap-3">
              <p className="w-5 flex justify-center text-sm text-white/70 dark:text-white/50">
                {idx + 1}
              </p>
              <Skeleton className="w-[70px] h-[20px]" />
              <Skeleton className="w-[70px] h-[20px]" />
            </div>
            <div>
              <p className="flex items-center gap-2 text-white/70 ">
                <PlayIcon className="w-4 h-4" /> 0
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
