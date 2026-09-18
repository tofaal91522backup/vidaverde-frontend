"use client";

import { useLanguage, type LanguageCode } from "@/providers/language-provider";
import { useEffect } from "react";

/*
  Site-er EN/ES switch — purono vidaverde.com (WordPress) jemon korto, Google
  Translate diye. Page English-e lekha; ES chaple Google browser-ei puro page
  onubad kore.

  Navbar-er LangToggle ei file-er `switchSiteLanguage()` dake. Google-er nijer
  dropdown/banner lukano thake (globals.css).
*/

const SCRIPT_ID = "google-translate-script";
const ELEMENT_ID = "google_translate_element";
const COOKIE = "googtrans";

// ── React crash guard ────────────────────────────────────────────────────────
/*
  Google Translate text node gula `<font>` e mure dey. Pore React sei node
  bodlate ba shorate gele khuje pay na ar throw kore:
    NotFoundError: Failed to execute 'removeChild' on 'Node'
  — page shada hoye jay. Purono site-e React chhilo na, tai eta kokhono hoy ni;
  amader app-e form-e type kora, menu khola, data load — shob jaygay hote pare.

  Porichito workaround: node-ta asholei ei parent-er child na hole throw na
  kore chupchap fire jay. Ekbar-i boshano hoy (HMR-e duibar na).
*/
type PatchedNode = typeof Node.prototype & { __vvTranslateGuard?: true };

if (typeof window !== "undefined" && typeof Node === "function") {
  const proto = Node.prototype as PatchedNode;

  if (!proto.__vvTranslateGuard) {
    proto.__vvTranslateGuard = true;

    const removeChild = proto.removeChild;
    proto.removeChild = function <T extends Node>(this: Node, child: T): T {
      if (child.parentNode !== this) return child;
      return removeChild.call(this, child) as T;
    };

    const insertBefore = proto.insertBefore;
    proto.insertBefore = function <T extends Node>(
      this: Node,
      node: T,
      ref: Node | null,
    ): T {
      if (ref && ref.parentNode !== this) return node;
      return insertBefore.call(this, node, ref) as T;
    };
  }
}

// ── cookie ───────────────────────────────────────────────────────────────────
/*
  Google nijer obostha `googtrans` cookie-te rakhe ("/en/es"). Oita host ar
  ".host" duitai-e boshay, tai muchteo duijaygay-i muchte hoy — na hole
  English-e fire gele-o Google abar Spanish kore dito.
*/
function readTarget(): LanguageCode {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/(\w+)/);
  return match?.[1] === "es" ? "es" : "en";
}

function writeCookie(value: string | null) {
  const host = window.location.hostname;
  const expiry = value ? "" : "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const body = `${COOKIE}=${value ?? ""}; path=/${expiry}`;

  document.cookie = body;
  // localhost-e domain boshano jay na; asol domain-e ".host" o lage
  if (host.includes(".")) document.cookie = `${body}; domain=.${host}`;
}

// ── switching ────────────────────────────────────────────────────────────────
/**
 * ES: Google-er lukano `<select>`-ta bodle dey — reload chhara onubad hoy.
 * Widget ekhono load na hole cookie boshiye reload.
 *
 * EN: cookie muche reload. Google-er "Show original" bhorsha kora jay na —
 * kichu `<font>` theke jay ar page-ta ordhek onubad obosthay atke thake.
 */
export function switchSiteLanguage(code: LanguageCode) {
  if (code === "en") {
    writeCookie(null);
    window.location.reload();
    return;
  }

  writeCookie(`/en/${code}`);

  const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (!combo) {
    window.location.reload();
    return;
  }

  combo.value = code;
  combo.dispatchEvent(new Event("change"));
}

// ── widget ───────────────────────────────────────────────────────────────────
type TranslateWindow = Window & {
  googleTranslateElementInit?: () => void;
  google?: {
    translate?: {
      TranslateElement: new (
        options: Record<string, unknown>,
        elementId: string,
      ) => unknown;
    };
  };
};

/**
 * Marketing layout-e ekbar mount hoy. Dashboard ar auth page-e na — oigulo
 * English-i thake.
 */
export function GoogleTranslate() {
  const { language } = useLanguage();

  useEffect(() => {
    /*
      Provider (localStorage) asol obostha. Cookie-ta tar sathe milie, TAR POR
      script load — Google init-er shomoy cookie pore, tai ulto order-e dile
      ES-e thaka visitor ek polok English dekhto, ba English-e thaka keu Spanish.
    */
    if (readTarget() !== language) {
      writeCookie(language === "en" ? null : `/en/${language}`);
    }

    if (document.getElementById(SCRIPT_ID)) return;

    const w = window as TranslateWindow;
    w.googleTranslateElementInit = () => {
      if (!w.google?.translate) return;
      new w.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es",
          autoDisplay: false,
        },
        ELEMENT_ID,
      );
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
    // Ichchha kore language dependency-te na: script ekbar-i load hobe, ar
    // porer bodol gula `switchSiteLanguage()` shamlay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Google-er nijer dropdown ekhane boshe; CSS diye lukano
  return <div id={ELEMENT_ID} aria-hidden="true" />;
}
