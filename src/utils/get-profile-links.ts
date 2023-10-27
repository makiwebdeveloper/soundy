export function getProfileLinks(profileId: number) {
  const profileLinks = [
    {
      title: "All",
      path: `/profiles/${profileId}`,
    },
    {
      title: "Tracks",
      path: `/profiles/${profileId}/tracks`,
    },
    {
      title: "Albums",
      path: `/profiles/${profileId}/albums`,
    },
    {
      title: "Playlists",
      path: `/profiles/${profileId}/playlists`,
    },
    {
      title: "Favorites",
      path: `/profiles/${profileId}/favorites`,
    },
  ];

  return profileLinks;
}
