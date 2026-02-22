CREATE TABLE "infra_bootstrap" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "attempts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"quiz_id" text NOT NULL,
	"role" text NOT NULL,
	"questions_count" smallint NOT NULL,
	"correct_count" smallint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
