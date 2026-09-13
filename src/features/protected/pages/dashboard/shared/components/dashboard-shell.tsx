import DashboardNavbar from "@/components/layout/navbar/dashboard-navbar";
import type { DashboardUser } from "@/components/layout/navbar/dashboard-user-menu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


export default function DashboardShell({
  sidebar,
  /** Navbar-er account menu-te dekhabe. Layout-er `getSession()` theke ashe. */
  user,
  navbar,
  children,
}: {
  sidebar: React.ReactNode;
  user?: DashboardUser;
  navbar?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
    // style={
    //   {
    //     "--sidebar-width": "calc(var(--spacing) * 72)",
    //     "--header-height": "calc(var(--spacing) * 12)",
    //   } as React.CSSProperties
    // }
    >
      {sidebar}

      {/* `dashboard-scope` — globals.css-er `section { padding: 96px 0 }` marketing-er
          jonno; ei subtree-te oita off (dekho globals.css) */}
      <SidebarInset className="dashboard-scope bg-white dark:bg-[#020617] rounded-l-2xl overflow-hidden">
        {navbar ?? <DashboardNavbar user={user} />}
        <div className="flex flex-1 flex-col">
          <div
            className={`@container/main flex flex-1 flex-col gap-2 bg-gray-50 dark:bg-[#020617]`}
          >
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
