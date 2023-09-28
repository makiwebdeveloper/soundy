import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { getCurrentProfile } from "@/services/profiles.service";
import { redirect } from "next/navigation";
import SidebarItems from "./sidebar-items";

interface Props {
  className?: string;
}

export default async function SidebarSheet({ className }: Props) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/create-profile");
  }

  return (
    <Sheet>
      <SheetTrigger asChild className={className}>
        <Button variant="ghost">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Soundy</SheetTitle>
        </SheetHeader>
        <SidebarItems profileId={currentProfile.id} className="pt-2 pb-4" />
      </SheetContent>
    </Sheet>
  );
}
