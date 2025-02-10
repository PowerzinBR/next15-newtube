import { SidebarProvider } from "@/components/ui/sidebar";

import { HomeNavbar } from "../components/home-navbar";
import { HomeSidebar } from "../components/home-sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <HomeNavbar />
      <div className="w-full">
        <div className="flex min-h-screen pt-[4rem]">
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

