import AppImage from "@/components/shared/app-image";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebarHeader({
  headerInfo,
}: {
  headerInfo: {
    imageSrc?: string | null;
    companyName?: string;
    dashboardType?: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
          >
            <AppImage
              src={headerInfo.imageSrc}
              width={55}
              height={55}
              alt="logo"
              className="rounded-md mr-2 object-cover"
            />

            <div className="grid flex-1 text-left text-sm leading-tight cursor-pointer gap-0.5">
              <span className="truncate font-semibold">
                {headerInfo.companyName}
              </span>
              <span className="truncate text-xs flex items-center gap-1">
                {headerInfo.dashboardType}
              </span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
