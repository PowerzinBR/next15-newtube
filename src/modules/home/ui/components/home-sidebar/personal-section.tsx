"use client";

import Link from "next/link";
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
    url: "/feeds/trending",
    icon: ListVideoIcon,
  },
];

export const PersonalSection = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Você
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className="h-[40px]"
                tooltip={item.title}
                asChild
                isActive={false} // TODO: Change to look at current pathname
                onClick={() => {}} // TODO: Do something on click
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
