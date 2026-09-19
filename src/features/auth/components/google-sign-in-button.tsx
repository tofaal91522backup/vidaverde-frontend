"use client";

import { GoogleSignInAction } from "@/features/auth/actions/google-sign-in.action";
import { Spinner } from "@/components/ui/spinner";
import { env } from "@/lib/env";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getStoredLanguage,
  useLanguage,
} from "@/providers/language-provider";
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
          /** Button-er bhasha — na dile browser-er bhasha */
          locale?: string;
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

      if (!result.success) {
        setPending(false);
        toast.error(result.errors?.formError?.[0] ?? "Google sign-in failed.");
        return;
      }

      toast.success("Login successful!");

      /*
        ⚠️ `refresh()` age, navigate por-e. Ulto dile refresh-ta cholti
        route-take refetch kore pending navigation-ta bati kore dey.

        `pending` ekhane ar `false` kora hoy na — navigation shuru hoye geche,
        tai redirect na howa porjonto loading-i thaka uchit.
      */
      router.refresh();
      router.replace(result.redirectTo ?? "/");
    },
    [router],
  );

  // Button Google-er iframe-e — browser-er bhasha nito (Bengali browser-e Bengali)
  const { language } = useLanguage();

  const initialise = useCallback(() => {
    /*
      `window.google` thaklei hobe na — Google Translate-o `window.google`
      banay (`.translate`), tokhon `.accounts` nai. Spanish site theke link-e
      ashle ei effect oi obosthay chole "reading 'id'" crash korto.
    */
    const gsi = window.google?.accounts?.id;
    if (!clientId || !gsi || !holder.current) return;

    gsi.initialize({
      client_id: clientId,
      callback: handleCredential,
    });

    gsi.renderButton(holder.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text,
      logo_alignment: "center",
      locale: language,
      // GIS nijer iframe-e button ta ake, tai CSS diye chowra kora jay na —
      // pixel-e bolte hoy. Card-er bhitorer prostho-ta ei 360.
      width: 360,
    });
  }, [clientId, handleCredential, text, language]);

  /*
    `<Script onReady>` prothom render-er callback-tai dhore rakhe — tokhon
    bhasha ekhono "en" (hydration), tai Spanish visitor-o English button pet.
    Ref-e shob shomoy sheshe-r ta; ar bhasha bodlale script age-i load thakle
    button abar aki.
  */
  const initialiseRef = useRef(initialise);
  useEffect(() => {
    initialiseRef.current = initialise;
    initialise();
  }, [initialise]);

  /*
    Client id na thakle kichu-i render hoy na. Ekta mora "Sign in with Google"
    button dekhano-r cheye na dekhano bhalo — click korle Google `invalid_client`
    diye fire pathato.
  */
  if (!clientId) return null;

  return (
    <div className="flex flex-col gap-3">
      <Script
        /*
          `hl` na dile Google button-er lekha location dekhe bachhe — Bangladesh
          theke English/Spanish duitai Bengali ashto. Storage theke pori, provider
          na: hydration-e provider "en" dey, ar script ekbar-i load hoy.
        */
        src={`https://accounts.google.com/gsi/client?hl=${getStoredLanguage()}`}
        strategy="afterInteractive"
        onReady={() => initialiseRef.current()}
      />

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-vv-line" />
        <span className="text-xs text-muted-foreground">or</span>
        <span className="h-px flex-1 bg-vv-line" />
      </div>

      <div className="relative flex justify-center">
        <div ref={holder} aria-busy={pending} />

        {/* GIS button-ta nijer iframe-e ake, tai oitar bhitore kichu bosano
            jay na — upore ekta layer diye dhaka hoy */}
        {pending && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-full bg-background/85 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            Signing you in…
          </div>
        )}
      </div>
    </div>
  );
}
