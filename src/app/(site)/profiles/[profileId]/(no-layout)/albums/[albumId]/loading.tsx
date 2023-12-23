import { PageLayout } from "@/components/page-layout";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="space-y-2">
        {new Array(5).fill(null).map((item, idx) => (
          <Skeleton
            key={idx}
            className="group flex items-center gap-3 h-[50px] transition rounded-md"
          />
        ))}
      </div>
    </PageLayout>
  );
}
