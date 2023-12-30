import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | Soundy",
  description:
    "Welcome to Soundy - Your Ultimate Music Hub. Sign in to access a world of immersive audio experiences. Discover, play, and share your favorite tunes with ease. Join the Soundy community and dive into a symphony of personalized playlists. Let the music unite us! 🎶🔒 #Soundy #MusicLovers #SignIn",
};

export default function Page() {
  return <SignIn redirectUrl="/" />;
}
