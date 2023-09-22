CREATE TABLE IF NOT EXISTS "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"image_url" text NOT NULL,
	"user_id" varchar(256) NOT NULL
);
