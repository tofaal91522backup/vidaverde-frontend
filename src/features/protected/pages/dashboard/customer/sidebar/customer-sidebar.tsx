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
import { CustomerSidebarNavItems } from "./customer-sidebar-nav-items";

export function CustomerSidebar({ session }: { session: any }) {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <AppSidebarHeader
          headerInfo={{
            imageSrc: "/images/logo.png",
            companyName: "Vida Verde",
            dashboardType: "Student Portal",
          }}
        />
      </SidebarHeader>

      <SidebarContent className="pl-1">
        <AppSidebarItems items={CustomerSidebarNavItems} />
      </SidebarContent>

      <SidebarRail />

      <SidebarFooter>
        <AppSidebarFooter
          footerInfo={{
            name: session?.user?.name || "Student",
            email: session?.user?.email || "",
            avatar: "/noImage.png",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
