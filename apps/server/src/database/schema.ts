import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

// use this as a barrel file only to re-export feature schemas
// export * from "../foo/foo-repository.js";
// export * from "../bar/bar-schema.js";

export * from "../health/health-schema.js";

// this table exists solely to validate migration wiring
// TODO: remove once the first real feature schema lands
export const infraBootstrap = pgTable("infra_bootstrap", {
  id: text("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
