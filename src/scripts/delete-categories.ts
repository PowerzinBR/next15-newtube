// TODO: Create a script to seed categories

import { db } from "@/db";
import { categories } from "@/db/schema";

async function main() {
  console.log("Deleting categories...");

  try {
    console.log("Categories deleted!");

    await db.delete(categories);
  } catch (error) {
    console.error("Error deleting categories", error);
    process.exit(1);
  }
}

main();
