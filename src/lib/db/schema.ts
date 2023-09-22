import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

/****************** PROFILES ******************/
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  imageUrl: text("image_url").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
});
