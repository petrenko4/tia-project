CREATE TABLE "public"."users" (
  "id" varchar(100) NOT NULL,
  "email" varchar(100) NOT NULL UNIQUE,
  "username" varchar(100) NOT NULL UNIQUE,
  "date_of_birth" date,
  "gender" varchar(10),
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."playlists" (
  "id" varchar(100) NOT NULL,
  "owner_id" varchar(100) NOT NULL UNIQUE,
  "name" varchar(255) NOT NULL,
  "owner" varchar(100) NOT NULL,
  CONSTRAINT "fk_playlists_owner" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."accounts" (
  "id" varchar(100) NOT NULL,
  "login" varchar(100) NOT NULL UNIQUE,
  "password" varchar(255),
  "is_admin" boolean,
  CONSTRAINT "fk_account_user" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
  PRIMARY KEY ("login")
);

CREATE TABLE "public"."releases" (
  "id" varchar(100) NOT NULL,
  "name" varchar(255) NOT NULL,
  "type" varchar(50) NOT NULL,
  "authors" text NOT NULL,
  CONSTRAINT "fk_release_owner" FOREIGN KEY ("authors") REFERENCES "public"."users"("id") ON DELETE CASCADE,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."tracks" (
  "id" varchar(100) NOT NULL,
  "title" varchar(255) NOT NULL,
  "release" varchar(50) NOT NULL,
  "category" varchar(50) NOT NULL,
  "file" varchar(255) NOT NULL,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "fk_release" FOREIGN KEY ("release") REFERENCES "public"."releases"("id") ON DELETE CASCADE,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."track_playlists" (
  "track_id" varchar(100) REFERENCES "public"."tracks"("id") ON DELETE CASCADE,
  "playlist_id" varchar(100) REFERENCES "public"."playlists"("id") ON DELETE CASCADE,
  PRIMARY KEY ("track_id", "playlist_id")
);

CREATE TABLE "public"."category" (
  "category_id" varchar(100) NOT NULL,
  "name" varchar(100),
  PRIMARY KEY ("category_id")
);

CREATE TABLE "session" (
    "sid" varchar NOT NULL PRIMARY KEY,
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
);







