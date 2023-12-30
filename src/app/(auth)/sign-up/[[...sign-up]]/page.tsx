import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | Soundy",
  description:
    "Join Soundy - Your Ultimate Music Hub! Sign up to unlock a world of musical delights. Create personalized playlists, explore new genres, and connect with fellow music enthusiasts. Experience the joy of sharing your favorite tunes. Start your musical journey with Soundy today! 🎵✨ #Soundy #MusicCommunity #SignUp",
};

export default function Page() {
  return <SignUp redirectUrl="/" />;
}
