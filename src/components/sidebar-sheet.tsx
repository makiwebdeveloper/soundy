import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ModeToggle } from "./mode-toggle";

export default function SidebarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild className="sm:hidden">
        <Button>
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Soundy</SheetTitle>
        </SheetHeader>
        <div>...</div>
        <ModeToggle />
      </SheetContent>
    </Sheet>
  );
}
