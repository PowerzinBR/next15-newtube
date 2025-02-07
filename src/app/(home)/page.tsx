import { Suspense } from "react";

import { HydrateClient } from "@/trpc/server";

import { PageClient } from "./client";

export default async function Home() {
  return (
    <HydrateClient>
      <Suspense fallback={<p>Loading...</p>}>
        <PageClient />
      </Suspense>
    </HydrateClient>
  );
}
