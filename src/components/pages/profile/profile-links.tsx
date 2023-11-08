"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProfileLinks } from "@/utils/get-profile-links";
import { cn } from "@/lib/cn";

interface Props {
  profileId: number;
}

export default function ProfileLinks({ profileId }: Props) {
  const profileLinks = getProfileLinks(profileId);
  const pathname = usePathname();

  return (
    <div className="hidden sm:flex">
      {profileLinks.map((link) => (
        <Link
          href={link.path}
          key={link.path}
          className={cn(
            "flex-1 text-center p-2 transition border-b-2",
            pathname === link.path
              ? "border-white/40 dark:border-black/60 border-b-4"
              : "border-white/20 dark:border-black/30 text-white/70 dark:text-white/50 hover:text-white dark:hover:text-white"
          )}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}
