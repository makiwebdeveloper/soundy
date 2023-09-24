import CreateProfileForm from "@/components/forms/create-profile-form";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateProfile() {
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
      <div className="absolute bottom-10 right-10">
        <ModeToggle />
      </div>
    </>
  );
}
