CREATE TABLE IF NOT EXISTS "listenings" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"profile_id" integer NOT NULL,
	"track_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "albums" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "albums" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "favorite_tracks" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "favorite_tracks" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "playing_tracks" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "playing_tracks" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "playlist_tracks" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "playlist_tracks" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "playlists" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "playlists" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tracks" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "tracks" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listenings" ADD CONSTRAINT "listenings_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listenings" ADD CONSTRAINT "listenings_track_id_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
