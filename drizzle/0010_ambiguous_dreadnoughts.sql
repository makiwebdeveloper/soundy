CREATE TABLE IF NOT EXISTS "followings" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"follower_id" integer NOT NULL,
	"following_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "followings" ADD CONSTRAINT "followings_follower_id_profiles_id_fk" FOREIGN KEY ("follower_id") REFERENCES "profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "followings" ADD CONSTRAINT "followings_following_id_profiles_id_fk" FOREIGN KEY ("following_id") REFERENCES "profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
