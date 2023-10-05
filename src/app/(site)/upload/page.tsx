import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout";
import Upload from "@/components/upload";
import { getCurrentProfile } from "@/services/profiles.service";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

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
        <Upload profileId={currentProfile.id} />
      </PageContent>
    </PageLayout>
  );
}
