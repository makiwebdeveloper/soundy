import Loader from "@/components/loader";
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout";

export default function Loading() {
  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Upload track & album</PageTitle>
        <PageDescription>
          If you want to upload a track, add one file, and if you want to upload
          an album, add several.
        </PageDescription>
      </PageHeader>
      <PageContent>
        <div className="md:w-2/3 mt-10 md:mt-0 md:absolute md:top-[55%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%]">
          <div className="transition h-[250px] flex-center mt-1 cursor-pointer border border-dashed rounded-3xl border-white/40 dark:border-black/60 bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/30">
            <Loader />
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
