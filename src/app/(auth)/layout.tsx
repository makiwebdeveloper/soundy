"use client";

import { PropsWithChildren } from "react";
import { useMount } from "@/hooks/use-mount";
import Loader from "@/components/loader";

export default function AuthLayout({ children }: PropsWithChildren) {
  const isMounted = useMount();

  return (
    <main className="w-full h-screen flex-center">
      {isMounted ? children : <Loader />}
    </main>
  );
}
