"use client";

import { PropsWithChildren } from "react";
import { useMount } from "@/hooks/use-mount";
import Loader from "@/components/loader";
import { ModeToggle } from "@/components/mode-toggle";

export default function AuthLayout({ children }: PropsWithChildren) {
  const isMounted = useMount();

  return (
    <main className="w-full h-screen flex-center">
      {isMounted ? children : <Loader />}
      <div className="absolute top-5 right-5 sm:top-10 sm:right-10">
        <ModeToggle noText />
      </div>
    </main>
  );
}
