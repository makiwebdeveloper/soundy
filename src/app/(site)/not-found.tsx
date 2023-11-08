import { Undo2Icon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-center h-[calc(100vh-120px)] md:h-[395px] lg:h-[495px] 2xl:h-[695px]">
      <div>
        <h2 className="flex flex-col gap-2 items-center">
          <span className="text-5xl">404</span>
          <span className="h-[2px] w-[100px] bg-white rounded-full"></span>
          <span className="text-3xl">Not Found</span>
        </h2>
        <div className="mt-5">
          <p className="text-sm">Could not find requested resource</p>
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
