"use client";

import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";
import { cn } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";

interface TableSearchInputProps {
  /** Debounce shesh hole daka hoy — ei value-ta query params-e boshbe */
  onSearch: (value: string) => void;
  placeholder?: string;
  /** `isFetching` pathao — bhitore chhoto spinner othe */
  loading?: boolean;
  delay?: number;
  className?: string;
}

/**
 * Table-er search box.
 *
 * ⚠️ Ekhane debounce-ta joruri. Age proti keystroke-e query key bodlato, mane
 * proti okkhore ekta kore API call ar table-ta unmount hoye spinner hoye jeto —
 * type korle website hang kora mone hoto. Ekhon type-ta local state-e shathe
 * shathe dekhay, kintu request jay type thamar por.
 */
export function TableSearchInput({
  onSearch,
  placeholder = "Search...",
  loading = false,
  delay = 400,
  className,
}: TableSearchInputProps) {
  const { value, onChange } = useSearch(onSearch, delay);

  return (
    <div className={cn("relative min-w-56 flex-1 sm:max-w-xs", className)}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="bg-background px-9"
      />

      {loading && (
        <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
      )}
    </div>
  );
}
