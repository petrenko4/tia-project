CREATE TABLE "public"."users" (
  "id" varchar(100) NOT NULL,
  "email" varchar(100) NOT NULL UNIQUE,
  "username" varchar(100),
  "date_of_birth" date,
  "gender" varchar(10),
  "releases" text[] NOT NULL,
  "playlists" text[] NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."playlists" (
  "id" varchar(100) NOT NULL,
  "owner_id" varchar(100) NOT NULL UNIQUE,
  "name" varchar(255) NOT NULL,
  "owner" varchar(100) NOT NULL,
  "tracks" text[] NOT NULL,
  CONSTRAINT "fk_playlists_owner" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."account" (
  "id" varchar(100) NOT NULL,
  "login" varchar(100) NOT NULL UNIQUE,
  "password" varchar(255),
  "is_admin" boolean,
  CONSTRAINT "fk_account_user" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
  PRIMARY KEY ("login")
);

CREATE TABLE "public"."tracks" (
  "id" varchar(100) NOT NULL,
  "title" varchar(255) NOT NULL,
  "release" varchar(50) NOT NULL,
  "category" varchar(50) NOT NULL,
  "file" varchar(255) NOT NULL,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."category" (
  "category_id" varchar(100) NOT NULL,
  "name" varchar(100),
  PRIMARY KEY ("category_id")
);

CREATE TABLE "public"."releases" (
  "id" varchar(100) NOT NULL,
  "name" varchar(255) NOT NULL,
  "authors" text NOT NULL,
  "tracks" text[] NOT NULL,
  "length" integer NOT NULL,
  CONSTRAINT "fk_release_owner" FOREIGN KEY ("authors") REFERENCES "public"."users"("id") ON DELETE CASCADE,
  PRIMARY KEY ("id")
);








