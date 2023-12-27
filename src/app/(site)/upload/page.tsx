import {
  PageContent,
  PageDescription,
  PageHeader,
  PageLayout,
  PageTitle,
} from "@/components/page-layout";
import Upload from "@/components/upload";
import { getCurrentProfile } from "@/services/profiles.service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Upload | Soundy",
  description:
    "Elevate your musical presence with Soundy's Upload Page! Share your unique sound with the world effortlessly. Whether you're an artist, creator, or music lover, our intuitive upload process makes it easy to contribute to the global soundscape. Join us in spreading the rhythm – your music, your way. 🎤🌍 #Soundy #UploadMusic #ShareYourSound",
};

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
