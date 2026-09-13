"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { initials } from "@/utils/initials";
import { CircleHelp, Home, KeyRound, UserRound } from "lucide-react";
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
export function DashboardUserMenu({ user }: { user?: DashboardUser }) {
  const name = user?.name || "Account";
  const email = user?.email || "";
  const isStudent = user?.role === "STUDENT";

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
          <Link href="/auth/forget-password" className="cursor-pointer gap-2">
            <KeyRound className="size-4" />
            Change password
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/contact" className="cursor-pointer gap-2">
            <CircleHelp className="size-4" />
            Help &amp; support
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/" className="cursor-pointer gap-2">
            <Home className="size-4" />
            View website
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="p-1">
          <SignOut
            variant="ghost"
            className="h-9 justify-start gap-2 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
