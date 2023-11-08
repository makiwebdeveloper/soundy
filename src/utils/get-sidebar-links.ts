import {
  FolderHeart,
  Heart,
  History,
  Home,
  Music2,
  Music3,
  Save,
  Search,
  UploadCloud,
  User2,
} from "lucide-react";

export function getSidebarLinks(profileId: number) {
  const sidebarLinks = [
    {
      title: "Home",
      icon: Home,
      path: "/",
    },
    {
      title: "Search",
      icon: Search,
      path: "/search",
    },
    {
      title: "Likes",
      icon: Heart,
      path: `/profiles/${profileId}/favorites`,
    },
    {
      title: "Tracks",
      icon: Music2,
      path: `/profiles/${profileId}/tracks`,
    },
    {
      title: "Albums",
      icon: Music3,
      path: `/profiles/${profileId}/albums`,
    },
    {
      title: "Playlists",
      icon: FolderHeart,
      path: `/profiles/${profileId}/playlists`,
    },
    {
      title: "History",
      icon: History,
      path: `/history`,
    },
    {
      title: "Upload",
      icon: UploadCloud,
      path: `/upload`,
    },
    {
      title: "Profile",
      icon: User2,
      path: `/profiles/${profileId}`,
    },
  ];

  return sidebarLinks;
}
