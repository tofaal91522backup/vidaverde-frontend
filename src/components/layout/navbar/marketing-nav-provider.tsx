"use client";

import type { DashboardUser } from "@/components/layout/navbar/dashboard-user-menu";
import { readNavbarUser } from "@/features/auth/utils/session";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type MarketingNavValue = {
  /**
   * `undefined` mane **ekhono jana jay ni**. Oi obosthay na "Sign in" dekhano
   * hoy, na avatar — na hole logged-in user ek polok "Sign in" dekhto ar tar
   * por sheta bodle jeto.
   */
  user: DashboardUser | null | undefined;
  /** Sign out-er por — navbar ar tab bar ek shathe bodlay */
  clearUser: () => void;
  /** Hamburger sheet-ta. Tab bar-er "More" button-o ei ta-i khole */
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

const MarketingNavContext = createContext<MarketingNavValue>({
  user: undefined,
  clearUser: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
});

/*
  Navbar ar MobileTabBar duijon-i ek-i duita jinis jane dorkar: ke login ache,
  ar menu kholа ki na. Kintu tara tree-r duimatha-y. Alada rakhle duita server
  round-trip hoto, sign out-e ekta bodlato onno-ta na, ar tab bar-er "More"
  navbar-er sheet-ta kholte-i parto na.

  Session client theke pora hoy, server component theke na — server-e porle
  `cookies()`-er karone **proti ta marketing page dynamic** hoye jeto ar static
  generation (SEO-r jonno joruri) chole jeto.
*/
export function MarketingNavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<DashboardUser | null | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    readNavbarUser().then((value) => {
      if (!cancelled) setUser(value ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const clearUser = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, clearUser, menuOpen, setMenuOpen }),
    [user, clearUser, menuOpen],
  );

  return (
    <MarketingNavContext.Provider value={value}>
      {children}
    </MarketingNavContext.Provider>
  );
}

export const useMarketingNav = () => useContext(MarketingNavContext);
