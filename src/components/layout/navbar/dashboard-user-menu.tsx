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
import { dashboardHref } from "@/features/auth/utils/dashboard-href";
import { useStudentProfile } from "@/features/protected/pages/dashboard/student/pages/profile/queries/use-student-profile";
import { initials } from "@/utils/initials";
import { Home, LayoutDashboard, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Avatar-er chhobi-ta `next/image` diye ase, kacha `<img>` diye na.
 *
 * Google login-e `profile_img_url` hoy `lh3.googleusercontent.com/...` — oi URL
 * server theke thik-i 200 dey, kintu browser-e chhobi-ta ashto na: ad/privacy
 * blocker ar shield gula `googleusercontent.com` ke third-party hisebe atke
 * dey, ar tokhon navbar-e initials ar profile-e bhanga icon-i thakto.
 *
 * `next/image` chhobi-ta **amader nijer origin** theke dey (`/_next/image`),
 * tai cross-origin blocking-er proshno-i othe na. Shathe webp ar joto-ta
 * dorkar tototai — 96px-er chhobi 36px-er ghor-e purota namato.
 *
 * Load fail korle chhobi-ta shore jay ar nicher `AvatarFallback` (initials)
 * beriye ase.
 */
export function ProfileAvatar({
  src,
  name,
  className,
}: {
  src?: string;
  name: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <Avatar className={className}>
      <AvatarFallback className="text-xs font-medium">
        {initials(name)}
      </AvatarFallback>

      {src && !failed && (
        <Image
          src={src}
          alt={name}
          fill
          sizes="36px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </Avatar>
  );
}

export type DashboardUser = {
  name?: string;
  email?: string;
  role?: string;
};

type MobileMenuAccountSectionProps = {
  user: DashboardUser;
  onSignedOut?: () => void;
  onNavigate?: () => void;
  labels: {
    account: string;
    profile: string;
    dashboard: string;
    signOut: string;
  };
};

/**
 * Marketing site-er hamburger-er account block.
 *
 * Mobile-e avatar dropdown-ta header-er pashe chhilo, tai user-er account
 * options menu-te thakar expectation-er shathe milto na. Ei section-ta sheet-er
 * footer-e account-er porichoy ar shob primary action ekjaygay rakhe.
 */
export function MobileMenuAccountSection({
  user,
  onSignedOut,
  onNavigate,
  labels,
}: MobileMenuAccountSectionProps) {
  const isStudent = user.role === "STUDENT";
  const { data: profileData } = useStudentProfile(isStudent);
  const profile = profileData?.profile;
  const name = profile?.name || user.name || "Account";
  const email = profile?.email || user.email || "";
  const avatarUrl = profile?.profile_img_url || undefined;
  const href = dashboardHref(user) ?? "/";

  return (
    <section
      aria-label={labels.account}
      className="rounded-[18px] border border-vv-line bg-vv-bg-warm p-3"
    >
      <div className="flex items-center gap-3 px-1 pb-3">
        <ProfileAvatar src={avatarUrl} name={name} className="size-11" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-vv-ink">{name}</p>
          {email && (
            <p className="truncate text-xs text-vv-muted">{email}</p>
          )}
        </div>
      </div>

      <div className="border-t border-vv-line pt-2">
        {isStudent && (
          <Link
            href="/dashboard/student/profile"
            onClick={onNavigate}
            className="flex h-10 items-center gap-2 rounded-[10px] px-2 text-sm font-medium text-vv-ink transition-colors hover:bg-vv-line/40"
          >
            <UserRound className="size-4" aria-hidden="true" />
            {labels.profile}
          </Link>
        )}
        <Link
          href={href}
          onClick={onNavigate}
          className="flex h-10 items-center gap-2 rounded-[10px] px-2 text-sm font-medium text-vv-ink transition-colors hover:bg-vv-line/40"
        >
          <LayoutDashboard className="size-4" aria-hidden="true" />
          {labels.dashboard}
        </Link>
        <SignOut
          label={labels.signOut}
          onSignedOut={onSignedOut}
          variant="ghost"
          className="h-10 gap-2 rounded-[10px] px-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
        />
      </div>
    </section>
  );
}

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
  const href = dashboardHref(user) ?? "/";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-full"
          aria-label="Account menu"
        >
          <ProfileAvatar src={avatarUrl} name={name} className="size-9" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-64">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2.5 px-1 py-1.5 text-left">
            <ProfileAvatar src={avatarUrl} name={name} className="size-9" />
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
            <Link href={href} className="cursor-pointer gap-2">
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
