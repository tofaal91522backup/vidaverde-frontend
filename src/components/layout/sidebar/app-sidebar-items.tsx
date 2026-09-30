"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export type SidebarSubItem = {
  title: string;
  url: string;
  icon: LucideIcon; // required
};

export type SidebarSingleItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: never; // ✅ important: prevents union confusion
  defaultOpen?: never;
};

export type SidebarGroupItem = {
  title: string;
  icon: LucideIcon;
  defaultOpen?: boolean;
  url?: never; // ✅ important: group has no direct url
  items: SidebarSubItem[];
};

export type SidebarNavItem = SidebarSingleItem | SidebarGroupItem;

// ✅ type guard (best way)
function isGroupItem(item: SidebarNavItem): item is SidebarGroupItem {
  return Array.isArray((item as SidebarGroupItem).items);
}

/*
  Sidebar item-er chehara — hover/active pill-tao ei maap-e.

  shadcn-er default `h-8 p-2`, ar label-ta `truncate`. English-e chole jeto,
  kintu ES-e label gula lomba: "Email Outbox" hoy "Bandeja de salida de correo
  electrónico". Truncate hole "Bandeja de salida d…" — kon page sheta bojha
  jeto na. Tai:

  - `h-auto min-h-9` — lekha duiline hole button ta bare, kate na.
  - `py-2 px-2.5` — pill-ta lekha-r gaye lege chilo; ektu bosar jayga.
  - `leading-snug` — duiline hole line duita kachakachi thake.
  - span-er `truncate` ulto kore deওয়া (`!`) — group item-er label span-e ashe,
    single item-er bare text-e; duitai ek rokom dekhate hobe.

  Collapsed (icon-only) sidebar-e shadcn-er `size-8! p-2!` important, tai
  oikhane ekhono age-r moto-i.
*/
const labelWraps =
  "[&>span:last-child]:whitespace-normal! [&>span:last-child]:overflow-visible! [&>span:last-child]:text-clip!";

const itemClass = `h-auto min-h-9 px-2.5 py-2 leading-snug ${labelWraps}`;

/** Sub item nested, tai ektu chhoto — kintu lekha ek-i bhabe wrap kore. */
const subItemClass = `h-auto min-h-8 px-2 py-1.5 leading-snug ${labelWraps}`;

/** Ei url ta ekhonkar page ta dhore rakhe kina — nije ba tar kono child. */
function covers(pathname: string, url: string) {
  return pathname === url || pathname.startsWith(`${url}/`);
}

/**
 * Kon nav item ta highlight hobe — **shobcheye lomba match jeta**.
 *
 * Age eta `pathname === url` chilo, tai detail/create/edit page-e giye **kono
 * tab-i highlight hoto na** (`/dashboard/admin/students/<id>` kono nav url-er
 * shathe hubohu mile na).
 *
 * Shudhu `startsWith` diyeও hoy na: `/dashboard/admin` (Overview) tokhon
 * **proti ta** admin page-e match kore felto. Tai jeta match kore tar moddhe
 * **shobcheye nirdishto** ta neওয়া hoy — `/dashboard/admin/students/<id>` e
 * duita-i mile, kintu lomba ta (`/students`) jeete.
 */
function useActiveUrl(items: SidebarNavItem[], pathname: string) {
  return useMemo(() => {
    const urls = items.flatMap((item) =>
      isGroupItem(item) ? item.items.map((sub) => sub.url) : [item.url],
    );

    return urls
      .filter((url) => covers(pathname, url))
      .sort((a, b) => b.length - a.length)[0];
  }, [items, pathname]);
}

export default function AppSidebarItems({
  items,
}: {
  items: SidebarNavItem[];
}) {
  const pathname = usePathname();
  const activeUrl = useActiveUrl(items, pathname);

  return (
    <SidebarMenu>
      {items.map((item) => {
        // GROUP
        if (isGroupItem(item)) {
          const Icon = item.icon;
          const groupHasActive = item.items.some(
            (sub) => sub.url === activeUrl,
          );

          return (
            <Collapsible
              /*
                `url` ta-i asol identity — duita item-er title ek hote pare.
                `groupHasActive` key-te joda kora hoyeche ichchha kore: sidebar
                client navigation-e remount hoy na, tai `defaultOpen` ekbar-i
                kaj korto ar bondho group-er bhitorer page-e gele group ta
                bondho-i thakto. Flag bodlale key bodlay -> remount -> notun
                `defaultOpen`. Group-er bhitore ghurle flag bodlay na, tai
                admin hate kholа/bondho kora noshto hoy na.
              */
              key={`${item.url ?? item.title}:${groupHasActive}`}
              defaultOpen={item.defaultOpen ?? groupHasActive}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  {/* Group bondho thakleও bojha jay bhitore active page ache */}
                  <SidebarMenuButton
                    className={`group ${itemClass}`}
                    isActive={groupHasActive}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((sub) => {
                      const SubIcon = sub.icon;

                      return (
                        <SidebarMenuSubItem key={sub.url}>
                          <SidebarMenuSubButton
                            asChild
                            className={subItemClass}
                            isActive={sub.url === activeUrl}
                          >
                            <Link
                              href={sub.url}
                              aria-current={
                                sub.url === activeUrl ? "page" : undefined
                              }
                            >
                              <SubIcon className="h-4 w-4" />
                              {sub.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        }

        // SINGLE
        const Icon = item.icon;
        return (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton
              asChild
              className={itemClass}
              isActive={item.url === activeUrl}
            >
              <Link href={item.url} aria-current={item.url === activeUrl ? "page" : undefined}>
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
