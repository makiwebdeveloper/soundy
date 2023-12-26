import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchResult } from "@/types/search.types";
import SearchItem from "./search-item";

interface Props {
  items: SearchResult;
}

export default function SearchItems({ items }: Props) {
  return (
    <ScrollArea className="mt-3 h-[250px]">
      {items.profiles.length > 0 && (
        <SearchItem
          name="profiles"
          items={items.profiles.map((profile) => ({
            id: profile.id,
            name: profile.name,
            imageUrl: profile.imageUrl,
            url: `/profiles/${profile.id}`,
          }))}
        />
      )}
      {items.tracks.length > 0 && (
        <SearchItem
          name="tracks"
          items={items.tracks.map((track) => ({
            id: track.id,
            name: track.title,
            imageUrl: track.imageUrl,
            url: `/profiles/${track.profileId}/tracks/${track.id}`,
          }))}
        />
      )}
      {items.albums.length > 0 && (
        <SearchItem
          name="albums"
          items={items.albums.map((album) => ({
            id: album.id,
            name: album.title,
            imageUrl: album.imageUrl,
            url: `/profiles/${album.profileId}/albums/${album.id}`,
          }))}
        />
      )}
      {items.playlists.length > 0 && (
        <SearchItem
          name="playlists"
          items={items.playlists.map((playlist) => ({
            id: playlist.id,
            name: playlist.title,
            imageUrl: playlist.tracks[0].imageUrl,
            url: `/profiles/${playlist.profileId}/playlists/${playlist.id}`,
          }))}
        />
      )}
    </ScrollArea>
  );
}
