import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DashboardUserMenu,
  type DashboardUser,
} from "@/components/layout/navbar/dashboard-user-menu";

const DashboardNavbar = ({ user }: { user?: DashboardUser }) => {
  return (
    <header
      className="
        sticky top-0 z-20
        flex shrink-0 items-center justify-between gap-2
        border-b
        dark:bg-[#02091A]
        px-4 py-1.5
        backdrop-blur
        transition-[width,height,background-color]
        ease-linear
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)
      "
    >
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
      </div>

      {/* Age ekhane khali ekta "Sign out" button chilo ar baki account-er kaj
          sidebar footer-e chilo — duita jayga bhag kora chilo. Ekhon shob ek
          menu-te. */}
      <DashboardUserMenu user={user} />
    </header>
  );
};

export default DashboardNavbar;
