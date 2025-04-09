CREATE TABLE "public"."tracks" (
  "id" varchar(100) NOT NULL,
  "title" varchar(255) NOT NULL,
  "release" varchar(50) NOT NULL,
  "category" varchar(50) NOT NULL,
  /*"file_hash" varchar(255) NOT NULL,    maybe we need this?*/
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_playlist_tracks_playlist" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE CASCADE,
  CONSTRAINT "fk_playlist_tracks_track" FOREIGN KEY ("track_id") REFERENCES "public"."releases"("id") ON DELETE CASCADE
  CONSTRAINT "fk_track_category" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE SET NULL
  PRIMARY KEY ("id"),
);

CREATE TABLE "public"."releases" (
  "id" varchar(100) NOT NULL,
  "name" varchar(255) NOT NULL,
  "authors" text NOT NULL,
  "tracks" text[] NOT NULL,
  "length" integer NOT NULL,
  CONSTRAINT "fk_release_owner" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE CASCADE
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."playlists" (
  "id" varchar(100) NOT NULL,
  "name" varchar(255) NOT NULL,
  "owner" varchar(100) NOT NULL,
  "tracks" text[] NOT NULL,
  CONSTRAINT "fk_playlists_owner" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE CASCADE
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."users" (
  "email" varchar(100) NOT NULL,
  "username" varchar(100),
  "date_of_birth" date,
  "gender" varchar(10),
  "releases" text[] NOT NULL,
  "playlists" text[] NOT NULL,
  PRIMARY KEY ("email")
);

CREATE TABLE "public"."category" (
  "category_id" varchar(100) NOT NULL,
  "name" varchar(100),
  PRIMARY KEY ("category_id")
);

CREATE TABLE "public"."account" (
  "login" varchar(100) NOT NULL,
  "password" varchar(255),
  "is_admin" boolean,
  CONSTRAINT "fk_account_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE
  PRIMARY KEY ("login")
);

