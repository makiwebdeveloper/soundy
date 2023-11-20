import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/****************** PROFILES ******************/
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  imageUrl: text("image_url").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

export const profilesRelations = relations(profiles, ({ many, one }) => ({
  tracks: many(tracks),
  albums: many(albums),
  playingTrack: one(playingTracks, {
    fields: [profiles.id],
    references: [playingTracks.profileId],
  }),
  favoriteTracks: many(favoriteTracks),
  comments: many(comments),
  listenings: many(listenings),
  followers: many(followings, { relationName: "followers" }),
  followings: many(followings, { relationName: "followings" }),
  playlists: many(playlists),
}));

/****************** TRACKS ******************/
export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  imageUrl: text("image_url").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  genre: varchar("genre", { length: 256 }),
  isPublic: boolean("is_public").notNull(),
  audioUrl: text("audio_url").notNull(),
  duration: varchar("duration", { length: 256 }).notNull(),
  position: integer("position"),

  profileId: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  albumId: integer("album_id").references(() => albums.id, {
    onDelete: "cascade",
  }),
});

export const tracksRelations = relations(tracks, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [tracks.profileId],
    references: [profiles.id],
  }),
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),
  playings: many(playingTracks),
  favoriteTracks: many(favoriteTracks),
  playlistTracks: many(playlistTracks),
  comments: many(comments),
  listenings: many(listenings),
}));

/****************** ALBUMS ******************/
export const albums = pgTable("albums", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  imageUrl: text("image_url").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  genre: varchar("genre", { length: 256 }),

  profileId: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
});

export const albumsRelations = relations(albums, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [albums.profileId],
    references: [profiles.id],
  }),
  tracks: many(tracks),
}));

/****************** PLAYING TRACK ******************/
export const playingTracks = pgTable("playing_tracks", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  profileId: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  trackId: integer("track_id")
    .references(() => tracks.id, { onDelete: "cascade" })
    .notNull(),
});

export const playingTracksRelations = relations(playingTracks, ({ one }) => ({
  profile: one(profiles, {
    fields: [playingTracks.profileId],
    references: [profiles.id],
  }),
  track: one(tracks, {
    fields: [playingTracks.trackId],
    references: [tracks.id],
  }),
}));

/****************** FAVORITE TRACK ******************/
export const favoriteTracks = pgTable("favorite_tracks", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  profileId: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  trackId: integer("track_id")
    .references(() => tracks.id, { onDelete: "cascade" })
    .notNull(),
});

export const favoriteTracksRelations = relations(favoriteTracks, ({ one }) => ({
  profile: one(profiles, {
    fields: [favoriteTracks.profileId],
    references: [profiles.id],
  }),
  track: one(tracks, {
    fields: [favoriteTracks.trackId],
    references: [tracks.id],
  }),
}));

/****************** PLAYLISTS ******************/
export const playlists = pgTable("playlists", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  isPublic: boolean("is_public").notNull(),
  profileId: integer("profile_id")
    .references(() => profiles.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const playlistsRelations = relations(playlists, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [playlists.profileId],
    references: [profiles.id],
  }),
  playlistTracks: many(playlistTracks),
}));

/****************** PLAYLIST TRACKS ******************/
export const playlistTracks = pgTable("playlist_tracks", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  playlistId: integer("playlist_id")
    .references(() => playlists.id, { onDelete: "cascade" })
    .notNull(),
  trackId: integer("track_id")
    .references(() => tracks.id, { onDelete: "cascade" })
    .notNull(),
});

export const playlistTracksRelations = relations(
  playlistTracks,
  ({ one, many }) => ({
    playlist: one(playlists, {
      fields: [playlistTracks.playlistId],
      references: [playlists.id],
    }),
    track: one(tracks, {
      fields: [playlistTracks.trackId],
      references: [tracks.id],
    }),
  })
);

/****************** COMMENTS ******************/
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  text: varchar("text", { length: 256 }).notNull(),
  trackId: integer("track_id")
    .references(() => tracks.id, { onDelete: "cascade" })
    .notNull(),
  profileId: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
});

export const commentsRelations = relations(comments, ({ one, many }) => ({
  track: one(tracks, {
    fields: [comments.trackId],
    references: [tracks.id],
  }),
  profile: one(profiles, {
    fields: [comments.profileId],
    references: [profiles.id],
  }),
}));

/****************** LISTENINGS ******************/
export const listenings = pgTable("listenings", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  profileId: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  trackId: integer("track_id")
    .references(() => tracks.id, { onDelete: "cascade" })
    .notNull(),
});

export const listeningsRelations = relations(listenings, ({ one }) => ({
  profile: one(profiles, {
    fields: [listenings.profileId],
    references: [profiles.id],
  }),
  track: one(tracks, {
    fields: [listenings.trackId],
    references: [tracks.id],
  }),
}));

/****************** FOLLOWING ******************/
export const followings = pgTable("followings", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  followerId: integer("follower_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  followingId: integer("following_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
});

export const followingsRelations = relations(followings, ({ one }) => ({
  follower: one(profiles, {
    fields: [followings.followerId],
    references: [profiles.id],
    relationName: "followers",
  }),
  following: one(profiles, {
    fields: [followings.followingId],
    references: [profiles.id],
    relationName: "followings",
  }),
}));
