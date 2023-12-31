import "@/styles/globals.css";
import Providers from "@/components/providers";
import type { Metadata } from "next";
import { cn } from "@/lib/cn";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Poppins } from "next/font/google";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Soundy",
  description: "Music platform",
  icons: {
    icon: "/icon.png",
  },
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
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "relative h-screen text-white")}>
          <div className="fixed z-[-1] top-0 left-0 w-full h-screen bg-background-2 bg-no-repeat bg-center bg-cover bg-fixed scale-[1.1]"></div>
          <Providers>{children}</Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
