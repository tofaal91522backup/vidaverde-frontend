"use client";

import { useEffect } from "react";

/*
  Dashboard ar profile English-i thakbe. Kintu Spanish site theke link-e click
  kore ashle Google Translate-er script browser-e cholte-i thake, ar dashboard-er
  notun lekha-o anubad kore dito — form label, table, dialog shob mishe jeto.

  Wrapper div-e `translate="no"` dile portal (dialog, dropdown, mobile sidebar)
  bad pore jay, karon oigulo <body>-te boshe. Tai puro <html>-e boshai, ar page
  chhere gele fire dei — marketing site-e ferar por Google abar kaj kore.
*/
export function NoTranslateDocument() {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.getAttribute("translate");
    root.setAttribute("translate", "no");
    return () => {
      if (previous === null) root.removeAttribute("translate");
      else root.setAttribute("translate", previous);
    };
  }, []);

  return null;
}
