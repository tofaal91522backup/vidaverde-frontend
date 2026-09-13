"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { clearSession } from "@/features/auth/utils/session";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { type ComponentProps, useState } from "react";

type SignOutProps = {
  className?: string;
  label?: string;
  /** Sign out shofol hole — jemon navbar-er local user state reset kora */
  onSignedOut?: () => void;
  size?: ComponentProps<typeof Button>["size"];
  variant?: ComponentProps<typeof Button>["variant"];
};

const SignOut = ({
  className,
  label = "Sign Out",
  onSignedOut,
  size = "sm",
  variant = "default",
}: SignOutProps) => {
  const [loading, setLoading] = useState(false);
  const qc = useQueryClient();
  const router = useRouter();

  /*
    Age ekhane `destroySession()` daka hoto, ja `redirect()` kore — ar
    `redirect()` throw kore. Fole:
      1. tar por-er `qc.clear()` **kokhono cholto na**, ar
      2. `catch` oi redirect-ke error hisebe dhore "Signout error" log korto.
    Ei karone-i sign out korar por navbar-e purono user theke jeto.

    Ekhon `clearSession()` shudhu cookie muche (redirect kore na), tai
    cache clear, caller-er state reset ar navigation — tinta-i chole.
  */
  const handleSignOut = async () => {
    try {
      setLoading(true);
      await clearSession();

      qc.clear();
      onSignedOut?.();

      router.replace("/");
      // Layout gula server-e session pore — refresh na dile purono
      // (logged-in) RSC payload cache-e theke jeto
      router.refresh();
    } catch (err) {
      console.error("Signout error:", err);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      disabled={loading}
      variant={variant}
      size={size}
      className={cn("w-full items-center justify-start", className)}
    >
      {loading && <Spinner className="mr-2" />}
      {/* Rong inherit kore — age `text-white` hardcode chilo, tai ghost/outline
          button-e ba light theme-e icon-ta dekha jeto na */}
      <LogOut className="translate-y-0.1" size={16} />
      {label}
    </Button>
  );
};

export default SignOut;
