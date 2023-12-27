"use client";

import Link from "next/link";
import { getSidebarLinks } from "@/utils/get-sidebar-links";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../mode-toggle";
import { buttonVariants } from "../ui/button";

interface Props {
  profileId: number;
  className?: string;
}

export default function SidebarItems({ profileId, className }: Props) {
  const pathname = usePathname();
  const sidebarLinks = getSidebarLinks(profileId);

  return (
    <div className={cn("flex flex-col justify-between h-full", className)}>
      <div className={"space-y-2 md:space-y-1 2xl:space-y-2 flex flex-col"}>
        {sidebarLinks.map((item) => (
          <Link
            href={item.path}
            key={item.path}
            className={cn(
              buttonVariants({
                variant: "link",
              }),
              "justify-start gap-2",
              pathname === item.path &&
                "bg-white/20 dark:bg-black/60 hover:bg-white/20 dark:hover:bg-black/50"
            )}
            scroll={item.path === "/search" && false}
          >
            <item.icon className="w-5 h-5" /> {item.title}
          </Link>
        ))}
      </div>
      <ModeToggle />
    </div>
  );
}
