"use client";

import { lowestPackagePrice } from "@/features/marketing/queries/get-lowest-package-price";
import { usePublicPackages } from "@/features/marketing/pages/courses/queries/use-public-packages";
import { useLanguage } from "@/providers/language-provider";
import { useMemo } from "react";

/**
 * Active package gular moddhe shobcheye kom dam, "$12" hisebe. Load na hole `null`.
 * "From $12" / "just $12" — kothao ar static na.
 */
export function useLowestPackagePrice() {
  // `lang` dam bodlay na; "en" dile useOwnPackageCopy-r shathe eki query
  const { data } = usePublicPackages({ lang: "en" });

  return useMemo(() => lowestPackagePrice(data), [data]);
}

/** "From $12" / "Desde $12". Load hobar age jayga dhore rakhe, jate layout na lafay. */
export function FromLowestPrice() {
  const { language } = useLanguage();
  const price = useLowestPackagePrice();
  const prefix = language === "es" ? "Desde" : "From";

  if (!price) {
    return (
      <span aria-hidden="true" className="invisible">
        {prefix} $00
      </span>
    );
  }
  return <span translate="no">{`${prefix} ${price}`}</span>;
}

/** Shudhu dam ("$12"), bakko-r majhe boshanor jonno — server component-eo chole. */
export function LowestPrice() {
  const price = useLowestPackagePrice();
  if (!price) {
    return (
      <span aria-hidden="true" className="invisible">
        $00
      </span>
    );
  }
  return <span translate="no">{price}</span>;
}
