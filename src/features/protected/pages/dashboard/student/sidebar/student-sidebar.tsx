"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { AppSidebarHeader } from "@/components/layout/sidebar/app-sidebar-header";
import AppSidebarItems from "@/components/layout/sidebar/app-sidebar-items";
import { StudentSidebarNavItems } from "./student-sidebar-nav-items";

// Footer shore jawar por ekhane ar session lage na — user menu ekhon navbar-e
export function StudentSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
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
        <AppSidebarItems items={StudentSidebarNavItems} />
      </SidebarContent>

      <SidebarRail />

    </Sidebar>
  );
}
