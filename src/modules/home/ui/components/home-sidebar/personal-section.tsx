"use client";

import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Histórico",
    url: "/playlist/history",
    icon: HistoryIcon,
  },
  {
    title: "Vídeos curtidos",
    url: "/playlist/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "Todas as playlists",
    url: "/playlist",
    icon: ListVideoIcon,
    auth: true
  },
];

export const PersonalSection = () => {
  const { isSignedIn: signedIn } = useAuth();
  const clerk = useClerk();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Você</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className="h-[40px]"
                tooltip={item.title}
                asChild
                isActive={false} // TODO: Change to look at current pathname
                onClick={(e) => {
                  if (!signedIn && item.auth) {
                    e.preventDefault();
                    return clerk.openSignIn();
                  }
                }}
              >
                <Link className="flex items-center gap-4" href={item.url}>
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
