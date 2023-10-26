import { PageLayout } from "@/components/page-layout";
import { ProfileHeader } from "@/components/pages/profile";
import {
  getCurrentProfile,
  getFullProfileById,
} from "@/services/profiles.service";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    profileId: string;
  };
  children: React.ReactNode;
}

export default async function ProfileLayout({ children, params }: Props) {
  const profileData = getFullProfileById(Number(params.profileId));
  const currentProfileData = getCurrentProfile();

  const [profile, currentProfile] = await Promise.all([
    profileData,
    currentProfileData,
  ]);

  if (!profile) {
    notFound();
  }

  if (!currentProfile) {
    redirect("/create-profile");
  }

  return (
    <PageLayout>
      <ProfileHeader />
      <div>{children}</div>
    </PageLayout>
  );
}
