"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { AppSidebarFooter } from "@/components/layout/sidebar/app-sidebar-footer";
import { AppSidebarHeader } from "@/components/layout/sidebar/app-sidebar-header";

import AppSidebarItems from "@/components/layout/sidebar/app-sidebar-items";
import {
  AdminSidebarNavItems,
  MasterAdminSidebarNavItems,
} from "./admin-sidebar-nav-items";

export function AdminSidebar({ session }: { session: any }) {
  const items =
    session?.user?.adminRole === "master"
      ? [...AdminSidebarNavItems, ...MasterAdminSidebarNavItems]
      : AdminSidebarNavItems;

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <AppSidebarHeader
          headerInfo={{
            imageSrc: "/images/logo.png",
            companyName: "Vida Verde",
            dashboardType: "Admin Dashboard",
          }}
        />
      </SidebarHeader>

      <SidebarContent className="pl-1">
        <AppSidebarItems items={items} />
      </SidebarContent>

      <SidebarRail />

      <SidebarFooter>
        <AppSidebarFooter
          footerInfo={{
            name: session?.user?.name || "Guest User",
            email: session?.user?.email || "No email available",
            avatar: "/images/logo.png",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
