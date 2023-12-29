"use client";

import { Undo2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-center h-[calc(100vh-120px)] md:h-[395px] lg:h-[495px] 2xl:h-[695px]">
      <div>
        <h2 className="flex flex-col gap-2 items-center">
          <span className="text-5xl">Something</span>
          <span className="text-3xl">went wrong</span>
        </h2>
        <div className="mt-5">
          <Link
            href="/"
            className="flex items-center justify-center gap-1 text-sm mx-auto text-white/70 dark:text-white/50 transition hover:text-white dark:hover:text-white hover:underline underline-offset-2"
          >
            Return Home <Undo2Icon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
