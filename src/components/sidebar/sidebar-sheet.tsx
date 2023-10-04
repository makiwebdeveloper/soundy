"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import SidebarItems from "./sidebar-items";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Props {
  className?: string;
  currentProfileId: number;
}

export default function SidebarSheet({ className, currentProfileId }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <SheetTrigger asChild className={className}>
        <Button variant="ghost">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Soundy</SheetTitle>
        </SheetHeader>
        <SidebarItems profileId={currentProfileId} className="pt-2 pb-4" />
      </SheetContent>
    </Sheet>
  );
}
