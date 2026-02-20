CREATE TABLE "infra_bootstrap" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "attempts" (
	"user_id" text NOT NULL,
	"quiz_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"role" text NOT NULL,
	"questions_count" integer NOT NULL,
	"correct_count" integer NOT NULL
);
