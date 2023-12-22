"use client";

import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchModal() {
  const router = useRouter();

  return (
    <div className="transition-all fixed top-0 left-0 w-full h-screen backdrop-blur-sm flex-center">
      <div className="bg-black/80 text-white p-5 rounded-md w-[600px] h-[300px]">
        <div className="relative flex items-center justify-center">
          <p className="text-2xl 2xl:text-4xl font-semibold">Search</p>
          <button className="absolute right-0" onClick={() => router.back()}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
