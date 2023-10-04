import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/ui/page-layout";
import Upload from "@/components/upload";

export default function UploadPage() {
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
        <Upload />
      </PageContent>
    </PageLayout>
  );
}
