import { cn } from "@/lib/cn";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soundy",
  description: "Music platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "green",
        },
        elements: {
          card: "bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-white/40 dark:border-black/40",
          footerActionLink: "text-green-400",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "relative h-screen text-white")}>
          <div className="fixed z-[-1] top-0 left-0 w-full h-screen bg-background bg-no-repeat bg-center bg-cover bg-fixed scale-[1.1]"></div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
