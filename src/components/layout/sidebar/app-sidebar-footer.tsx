import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import SignOut from "@/features/auth/components/sign-out";
import {
  ChevronUp,
  CircleHelp,
  Home,
  KeyRound,
  Settings,
  UserRound,
} from "lucide-react";
import Link from "next/link";

export function AppSidebarFooter({
  footerInfo,
}: {
  footerInfo: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group cursor-pointer bg-sidebar-accent text-sidebar-accent-foreground"
            >
              <Settings className="size-4" />
              <span>Settings</span>
              <ChevronUp className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-sidebar text-sidebar-foreground border-sidebar-border **:[[role=menuitem]]:focus:bg-sidebar-accent **:[[role=menuitem]]:focus:text-sidebar-accent-foreground"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={footerInfo.avatar} alt={footerInfo.name} />
                  <AvatarFallback className="rounded-lg bg-sidebar-accent text-sidebar-accent-foreground">
                    {footerInfo.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-sidebar-foreground">
                    {footerInfo.name}
                  </span>
                  <span className="truncate text-xs text-sidebar-foreground/50">
                    {footerInfo.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-sidebar-border" />

            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer gap-2">
                <UserRound className="size-4" />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/forget-password" className="cursor-pointer gap-2">
                <KeyRound className="size-4" />
                Change Password
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/contact" className="cursor-pointer gap-2">
                <CircleHelp className="size-4" />
                Help & Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/" className="cursor-pointer gap-2">
                <Home className="size-4" />
                View Website
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-sidebar-border" />

            <SignOut />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
