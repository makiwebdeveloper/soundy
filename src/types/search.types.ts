import { AlbumType } from "@/types/albums.types";
import { PlaylistWithTracksType } from "@/types/playlists.types";
import { ProfileType } from "@/types/profiles.types";
import { TrackWithListeningsType } from "@/types/tracks.types";

export interface SearchResult {
  tracks: TrackWithListeningsType[];
  albums: AlbumType[];
  profiles: ProfileType[];
  playlists: PlaylistWithTracksType[];
}
