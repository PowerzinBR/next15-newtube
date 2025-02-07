import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

// Use .notNull() if you want the key to be required
// Use .unique() if the key is unique (like clerkId)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerk_id").unique().notNull(),
  name: text("name").notNull(),
  // TODO: add banner fields
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("created_at").defaultNow().notNull(),

}, (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)]);
