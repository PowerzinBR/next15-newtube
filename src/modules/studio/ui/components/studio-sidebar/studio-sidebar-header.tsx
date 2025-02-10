import Link from "next/link";
import { useUser } from "@clerk/nextjs";

import { SidebarHeader, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { UserAvatar } from "@/components/user-avatar";
import { Skeleton } from "@/components/ui/skeleton";

export const StudioSidebarHeader = () => {
  const { user } = useUser();

  const { state } = useSidebar();

  if (!user) return null;

  /* I don't use user.fullName directly because if a Google account has no last name,
   * user.lastName will be null, which could result in a name like "User Null"
   */
  const userName = user.lastName ? user.fullName : user.firstName || "Usuário";

  if (!user || !userName)
    return (
      <SidebarHeader className="flex items-center justify-center pb-4">
        <Skeleton className="size-[122px] rounded-full" />
        <div className="flex flex-col items-center mt-2 gap-y-2">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </SidebarHeader>
    );

  if (state === "collapsed") {
    <SidebarMenuItem>
      <SidebarMenuButton tooltip="Seu perfil" asChild>
        <Link href="/users/current">
          <UserAvatar 
            imageUrl={user.imageUrl}
            name={userName}
            size="xs"
          />
          <span className="text-sm">
            Seu perfil
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  }

  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Link href="/users/current">
        <UserAvatar
          imageUrl={user?.imageUrl}
          name={userName}
          className="size-[122px] hover:opacity-80 transition-opacity"
        />
      </Link>
      <div className="flex flex-col items-center mt-2 gap-y-1">
        <p className="text-sm font-medium">Seu perfil</p>
        <p className="text-xs text-muted-foreground">{userName}</p>
      </div>
    </SidebarHeader>
  );
};
