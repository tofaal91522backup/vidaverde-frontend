"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { destroySession } from "@/features/auth/utils/session";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { type ComponentProps, useState } from "react";

type SignOutProps = {
  className?: string;
  label?: string;
  size?: ComponentProps<typeof Button>["size"];
  variant?: ComponentProps<typeof Button>["variant"];
};

const SignOut = ({
  className,
  label = "Sign Out",
  size = "sm",
  variant = "default",
}: SignOutProps) => {
  const [loading, setLoading] = useState(false);
  const qc = useQueryClient();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await destroySession();
      qc.clear();
    } catch (err) {
      console.error("Signout error:", err);
    } finally {
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
