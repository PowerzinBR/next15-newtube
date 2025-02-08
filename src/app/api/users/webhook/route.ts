import { eq } from "drizzle-orm";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET!;

  if (!SIGNING_SECRET) {
    throw new Error(
      "[MISSING_ENV]: Please add CLERK_SIGNING_SECRET from Clerk dashboard to your local enviroment file"
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response(`Verification error: ${err}`, { status: 400 });
  }

  const eventType = evt.type;

  if (eventType == "user.created") {
    const { data } = evt;

    const name = data.last_name !== null
      ? `${data.first_name} ${data.last_name}`
      : `${data.first_name}`;

    await db.insert(users).values({
      clerkId: data.id,
      name: name,
      imageUrl: data.image_url,
    });
  }

  if (eventType == "user.deleted") {
    const { data } = evt;

    if (!data.id) {
      return new Response("User id is missing", { status: 400 });
    }

    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  if (eventType == "user.updated") {
    const { data } = evt;

    const name = !data.last_name
      ? `${data.first_name} ${data.last_name}`
      : `${data.first_name}`;

    if (!data.id) {
      return new Response("User id is missing", { status: 400 });
    }

    await db.update(users).set({
      name: name,
      imageUrl: data.image_url,
    });
  }

  return new Response("Webhook receveid", { status: 200 });
}
