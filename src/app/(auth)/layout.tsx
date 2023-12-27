import { PropsWithChildren } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-full h-screen flex-center">
      {children}
      <div className="absolute top-5 right-5 sm:top-10 sm:right-10">
        <ModeToggle noText />
      </div>
    </main>
  );
}
