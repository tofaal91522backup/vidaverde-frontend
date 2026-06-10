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
import { AdminSidebarNavItems } from "./admin-sidebar-nav-items";

export function AdminSidebar({ session }: { session: any }) {
  return (
    <Sidebar collapsible="icon" variant="inset">
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
        <AppSidebarItems items={AdminSidebarNavItems} />
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
