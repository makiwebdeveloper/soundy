"use client";

import Loader from "@/components/loader";
import { ModeToggle } from "@/components/mode-toggle";

export default function Loading() {
  return (
    <main className="w-full h-screen flex-center">
      <Loader />
      <div className="absolute top-5 right-5 sm:top-10 sm:right-10">
        <ModeToggle noText />
      </div>
    </main>
  );
}
