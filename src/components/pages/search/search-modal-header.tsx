"use client";

import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchModalHeader() {
  const router = useRouter();

  return (
    <header className="relative flex items-center justify-center">
      <p className="text-2xl 2xl:text-4xl font-semibold">Search</p>
      <button className="absolute right-0" onClick={() => router.back()}>
        <XIcon className="w-5 h-5" />
      </button>
    </header>
  );
}
