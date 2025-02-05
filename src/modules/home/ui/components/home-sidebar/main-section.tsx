"use client";

import Link from "next/link";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Inicío",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Inscrições",
    url: "/feeds/subscription",
    icon: PlaySquareIcon,
    auth: true,
  },
  {
    title: "Em alta",
    url: "/feeds/trending",
    icon: FlameIcon,
  },
];

export const MainSection = () => {
  return (
    <SidebarGroup>
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
