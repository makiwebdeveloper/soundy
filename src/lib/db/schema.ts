import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

/****************** PROFILES ******************/
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  imageUrl: text("image_url").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});

export const profilesRelations = relations(profiles, ({ many }) => ({
  tracks: many(tracks),
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

  position: integer("position"),

  profileId: integer("profile_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  albumId: integer("album_id").references(() => albums.id, {
    onDelete: "cascade",
  }),
});

export const tracksRelations = relations(tracks, ({ one }) => ({
  profile: one(profiles, {
    fields: [tracks.profileId],
    references: [profiles.id],
  }),
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),
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
