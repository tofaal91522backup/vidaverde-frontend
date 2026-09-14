"use client";

import { GoogleSignInAction } from "@/features/auth/actions/google-sign-in.action";
import { env } from "@/lib/env";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

/*
  Google Identity Services (GIS), authorization-code flow na.

  OAuth client-ta (docs/client_secret_*.json) `javascript_origins` niye toiri,
  `redirect_uris` ekdom nai — mane eta browser-e chalanor jonno banano. Code
  flow-e jete hole Google Console-e redirect URI add korte hoto ar client
  secret-ta server-e lagto; GIS-e frontend shudhu ekta `id_token` pay ar
  secret-er dorkar-i porena.
*/

type GoogleCredentialResponse = { credential?: string };

type GoogleIdApi = {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
        ux_mode?: "popup" | "redirect";
      }) => void;
      renderButton: (
        parent: HTMLElement,
        options: {
          theme?: "outline" | "filled_blue" | "filled_black";
          size?: "small" | "medium" | "large";
          text?: "signin_with" | "signup_with" | "continue_with";
          shape?: "rectangular" | "pill";
          width?: number;
          logo_alignment?: "left" | "center";
        },
      ) => void;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleIdApi;
  }
}

export function GoogleSignInButton({
  text = "signin_with",
}: {
  /** Signin page-e "Sign in with Google", registration-e "Sign up with Google" */
  text?: "signin_with" | "signup_with" | "continue_with";
}) {
  const router = useRouter();
  const holder = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(false);

  const clientId = env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleCredential = useCallback(
    async (response: GoogleCredentialResponse) => {
      setPending(true);
      const result = await GoogleSignInAction(response.credential ?? "");
      setPending(false);

      if (!result.success) {
        toast.error(
          result.errors?.formError?.[0] ?? "Google sign-in failed.",
        );
        return;
      }

      toast.success("Login successful!");
      router.replace(result.redirectTo ?? "/");
      router.refresh();
    },
    [router],
  );

  const initialise = useCallback(() => {
    if (!clientId || !window.google || !holder.current) return;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredential,
    });

    window.google.accounts.id.renderButton(holder.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text,
      logo_alignment: "center",
      // GIS nijer iframe-e button ta ake, tai CSS diye chowra kora jay na —
      // pixel-e bolte hoy. Card-er bhitorer prostho-ta ei 360.
      width: 360,
    });
  }, [clientId, handleCredential, text]);

  /*
    Client id na thakle kichu-i render hoy na. Ekta mora "Sign in with Google"
    button dekhano-r cheye na dekhano bhalo — click korle Google `invalid_client`
    diye fire pathato.
  */
  if (!clientId) return null;

  return (
    <div className="flex flex-col gap-3">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={initialise}
      />

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-vv-line" />
        <span className="text-xs text-muted-foreground">or</span>
        <span className="h-px flex-1 bg-vv-line" />
      </div>

      <div className="flex justify-center">
        <div ref={holder} aria-busy={pending} />
      </div>
    </div>
  );
}
