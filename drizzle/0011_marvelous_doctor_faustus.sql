CREATE TABLE IF NOT EXISTS "playing_contexts" (
	"id" serial PRIMARY KEY NOT NULL,
	"playing_track_id" integer NOT NULL,
	"album_id" integer,
	"playlist_id" integer,
	"favorites_profile_id" integer,
	"tracks_profile_id" integer,
	"history" boolean
);
--> statement-breakpoint
ALTER TABLE "listenings" ADD COLUMN "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playing_contexts" ADD CONSTRAINT "playing_contexts_playing_track_id_playing_tracks_id_fk" FOREIGN KEY ("playing_track_id") REFERENCES "playing_tracks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
