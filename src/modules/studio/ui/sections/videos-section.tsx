"use client";

import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { InfiniteScroll } from "@/components/infinite-scroll";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { DEFAULT_LIMIT } from "@/constants";
import { trpc }from "@/trpc/client";

export const VideosSection = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  )
}


const VideosSectionSuspense = () => {
  const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery({
    limit: DEFAULT_LIMIT
  }, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableHead className="pl-6 w-[510px]">Vídeo</TableHead>
            <TableHead>Visibilidade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Visualizações</TableHead>
            <TableHead className="text-right">Comentários</TableHead>
            <TableHead className="text-right pr-6">Likes</TableHead>
          </TableHeader>
          <TableBody>
            {videos.pages.flatMap((page) => page.items).map((video) => (
              <Link href={`/studio/videos/${video.id}`} key={video.id} legacyBehavior>
                <TableRow className="cursor-pointer">
                  <TableCell>
                    {video.title}
                  </TableCell>
                  <TableCell>
                    Visibilidade
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                  <TableCell>
                    Data
                  </TableCell>
                  <TableCell>
                    Visualizações
                  </TableCell>
                  <TableCell>
                    Comentários
                  </TableCell>
                  <TableCell>
                    Likes
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </div>
      <InfiniteScroll
        isManual
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  )
}