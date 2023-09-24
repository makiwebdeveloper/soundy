import CreateProfileForm from "@/components/forms/create-profile-form";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentProfile } from "@/services/profiles.service";
import { redirect } from "next/navigation";

export default async function CreateProfile() {
  const profile = await getCurrentProfile();

  if (profile) {
    redirect("/");
  }

  return (
    <>
      <main className="w-full h-screen flex-center">
        <Card className="w-10/12 sm:w-[500px]">
          <CardHeader>
            <CardTitle>Create profile</CardTitle>
            <CardDescription>
              for listening and uploading tracks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateProfileForm />
          </CardContent>
        </Card>
      </main>
      <div className="absolute top-5 right-5 sm:top-10 sm:right-10">
        <ModeToggle />
      </div>
    </>
  );
}
