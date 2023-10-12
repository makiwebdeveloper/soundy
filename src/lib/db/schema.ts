import { relations } from "drizzle-orm";
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
  name: varchar("name", { length: 256 }).notNull(),
  imageUrl: text("image_url").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

export const profilesRelations = relations(profiles, ({ many, one }) => ({
  tracks: many(tracks),
  playingTrack: one(playingTracks, {
    fields: [profiles.id],
    references: [playingTracks.profileId],
  }),
  favoriteTracks: many(favoriteTracks),
}));

/****************** TRACKS ******************/
export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  genre: varchar("genre", { length: 256 }),
  isPublic: boolean("is_public").notNull(),
  audioUrl: text("audio_url").notNull(),
  duration: varchar("duration", { length: 256 }).notNull(),
  position: integer("position"),
  createdAt: timestamp("created_at").defaultNow(),

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
}));

/****************** ALBUMS ******************/
export const albums = pgTable("albums", {
  id: serial("id").primaryKey(),
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
