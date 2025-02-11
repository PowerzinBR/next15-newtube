"use client";

import { Loader2Icon, PlusIcon, AlertTriangleIcon } from "lucide-react";
import { useState } from "react";

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";

export const StudioUploadModal = () => {
  const [error, setError] = useState(false);

  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      setError(false);
    },
    onError: (error) => {
      setError(true);
      console.log("[videos_error]:", error);
    },
  });

  return (
    <Button
      variant="secondary"
      onClick={() => create.mutate()}
      disabled={create.isPending}
    >
      {create.isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : error ? (
        <AlertTriangleIcon className="text-red-500" />
      ) : (
        <PlusIcon />
      )}
      {error ? " Algo deu errado" : " Novo vídeo"}
    </Button>
  );
};
