"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

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

    </Sidebar>
  );
}
