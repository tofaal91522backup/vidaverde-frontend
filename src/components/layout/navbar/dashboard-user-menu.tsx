"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOut from "@/features/auth/components/sign-out";
import { useStudentProfile } from "@/features/protected/pages/dashboard/student/pages/profile/queries/use-student-profile";
import { initials } from "@/utils/initials";
import { Home, LayoutDashboard, UserRound } from "lucide-react";
import Link from "next/link";

export type DashboardUser = {
  name?: string;
  email?: string;
  role?: string;
};

/**
 * Navbar-er dan pashe user menu.
 *
 * Age ei menu-ta **sidebar-er footer-e** chilo ar navbar-e alada ekta "Sign out"
 * button jhulto — mane account-er kaj duijaygay bhag hoye chilo, ar sidebar
 * collapse korle footer-ta chhoto hoye jeto.
 *
 * Avatar-e chhobi deওয়া hoy na: session-e shudhu naam, email ar role thake
 * (`profile_img_url` student-er nijer profile endpoint-e, session-e na). Tai
 * initials-i dekhano hoy — bhanga `<img>` er cheye bhalo.
 */
export function DashboardUserMenu({
  user,
  /**
   * Dashboard-er bhitore naki public site-e. Ei ta dhore ekta link bodlay:
   * dashboard-e "View website", site-e "Go to dashboard" — jekhane acho
   * shekhanei jawar link dekhanor mane nai.
   */
  inDashboard = true,
  onSignedOut,
}: {
  user?: DashboardUser;
  inDashboard?: boolean;
  /** Navbar-e local state thakle sign out-er por reset korar jonno */
  onSignedOut?: () => void;
}) {
  const isStudent = user?.role === "STUDENT";

  /*
    Avatar-er chhobi `GET /student/me/` theke — session-e rakha hoy na.

    Session ekta signed JWT; chhobi oikhane bosale student photo bodlanor por-o
    next login porjonto purono chhobi-i dekhato. Ekhane profile query-r **ek-i
    key** use kora hoy, tai profile save-er invalidate-e navbar-o shathe shathe
    bodlay.

    `enabled` shudhu STUDENT-e: eta authenticated endpoint, ar admin-er kono
    `/student/me/` nai.
  */
  const { data: profileData } = useStudentProfile(isStudent);
  const profile = profileData?.profile;

  /*
    Naam ar email-o profile theke, session theke na.

    Session ekta JWT — login-er shomoy ja chilo tai bosano. Student pore
    profile-e naam bodlale menu-te **purono naam** jhulto (profile page-e ek
    naam, navbar-e onno)। Chhobi-r shathe ek-i karon.

    Profile na thakle (admin, ba ekhono load hoy nai) session-er value fallback.
  */
  const name = profile?.name || user?.name || "Account";
  const email = profile?.email || user?.email || "";
  const avatarUrl = profile?.profile_img_url || undefined;
  const dashboardHref = isStudent
    ? "/dashboard/student"
    : user?.role === "ADMIN"
      ? "/dashboard/admin"
      : "/";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-full"
          aria-label="Account menu"
        >
          <Avatar className="size-9">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="text-xs font-medium">
              {initials(name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-64">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2.5 px-1 py-1.5 text-left">
            <Avatar className="size-9">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="text-xs font-medium">
                {initials(name)}
              </AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 flex-1 leading-tight">
              <span className="truncate text-sm font-medium">{name}</span>
              {email && (
                <span className="truncate text-xs text-muted-foreground">
                  {email}
                </span>
              )}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Shudhu student-er ekta profile page ache; admin-er nai, tai dekhano hoy na */}
        {isStudent && (
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/student/profile"
              className="cursor-pointer gap-2"
            >
              <UserRound className="size-4" />
              My profile
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          {inDashboard ? (
            <Link href="/" className="cursor-pointer gap-2">
              <Home className="size-4" />
              View website
            </Link>
          ) : (
            <Link href={dashboardHref} className="cursor-pointer gap-2">
              <LayoutDashboard className="size-4" />
              Go to dashboard
            </Link>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="p-1">
          <SignOut
            onSignedOut={onSignedOut}
            variant="ghost"
            className="h-9 justify-start gap-2 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
