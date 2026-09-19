"use client";

import {
  getStoredLanguage,
  type LanguageCode,
} from "@/providers/language-provider";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

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

// ── re-scan nudge ────────────────────────────────────────────────────────────
/*
  Booking-e "Continue" chaple notun step English-ei theke jeto — Google-er
  MutationObserver cholche (hat diye bosano notun node anubad kore), kintu
  React-er kichu insert se dhore na; kono karone batch-ta badh pore. Porer
  je kono DOM bodol-e se abar puro page scan kore, tokhon oi step-o anubad hoy.

  Tai: Spanish chalu thakle React-er bodol dekhle ektu por body-te ekta khali
  span dhukiye shoriye dei — oituku-i Google-ke abar scan korte bole. Nijer
  nudge, Google-er nijer <font>, ar `translate="no"`-er bhetorer bodol
  (typewriter, count-up) dhora hoy na, na hole eta thamto na.
*/
const NUDGE_ATTR = "data-vv-translate-nudge";
const NUDGE_DELAY = 300;

function isReactChange(record: MutationRecord) {
  const el =
    record.target.nodeType === Node.ELEMENT_NODE
      ? (record.target as Element)
      : record.target.parentElement;
  if (!el) return false;
  if (el.closest(`[translate="no"], font, .skiptranslate, #${ELEMENT_ID}`)) {
    return false;
  }
  if (record.type === "characterData") return true;

  return Array.from(record.addedNodes).some((node) => {
    if (node.nodeType === Node.TEXT_NODE) return !!node.textContent?.trim();
    if (node.nodeType !== Node.ELEMENT_NODE) return false;
    const added = node as Element;
    return added.nodeName !== "FONT" && !added.hasAttribute(NUDGE_ATTR);
  });
}

/** Body-te khali span dhukiye shoriye dei — Google puro page abar scan kore */
function nudgeGoogle() {
  const nudge = document.createElement("span");
  nudge.setAttribute(NUDGE_ATTR, "");
  document.body.appendChild(nudge);
  nudge.remove();
}

function watchForMissedTranslations() {
  let timer: number | undefined;

  const observer = new MutationObserver((records) => {
    if (timer !== undefined) return;
    if (!document.documentElement.classList.contains("translated-ltr")) return;
    if (!records.some(isReactChange)) return;

    // Throttle, debounce na — typewriter-er moto chhoto bodol thamle-i na,
    // proti 300ms-e ekbar
    timer = window.setTimeout(() => {
      timer = undefined;
      nudgeGoogle();
    }, NUDGE_DELAY);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  return () => {
    observer.disconnect();
    window.clearTimeout(timer);
  };
}

// ── curtain: English jhilik na dekhano ──────────────────────────────────────
/*
  Server shob shomoy English pathay, Google browser-e pore anubad kore — tai
  Spanish visitor notun page-e ~0.5–1s English dekhto (full load), link-e
  click-e ~0.2s. Tai Spanish hole anubad shesh na howa porjonto page lukano:
  - full load: root layout-er <head> script `vv-translating` boshay (paint-er
    agei); ekhane shorai. Oi script-er nijer 2.5s failsafe ache.
  - link click: `vv-translating-main` — shudhu <main>, navbar age-i anubad kora.

  "Shesh" mane: Google `translated-ltr` boshiyeche, ar <font> dhukano 250ms
  dhore themeche. Kono <font>-i na ashle (sob lekha `translate="no"` ba cache)
  ektu por khule dei. Google block/offline hole failsafe-e English dekhay —
  khali page kokhono na.
*/
const CURTAIN_CLASSES = ["vv-translating", "vv-translating-main"];
// Google anubad batch-e pathay (viewport age, baki pore) — 120ms-e majh-khane
// khule jeto, /blog-e heading English dekha jeto
const SETTLE_MS = 250;
const NO_FONT_MS = 600;

function revealWhenTranslated(maxWait: number) {
  const root = document.documentElement;
  const start = performance.now();
  let lastFont = 0;
  // `translated-ltr` Google <font> dhokanor AGE boshay — "kichu-i anubad nai"
  // sheta theke gunte hoy, page load theke na, na hole shuru-r agei khule jay
  let translatedAt = 0;

  const fontObserver = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of Array.from(record.addedNodes)) {
        if (node.nodeName === "FONT") lastFont = performance.now();
      }
    }
  });
  fontObserver.observe(document.body, { childList: true, subtree: true });

  const reveal = () => {
    fontObserver.disconnect();
    window.clearInterval(poll);
    root.classList.remove(...CURTAIN_CLASSES);
  };

  const poll = window.setInterval(() => {
    const now = performance.now();
    const translated = root.classList.contains("translated-ltr");
    if (translated && !translatedAt) translatedAt = now;
    const settled = lastFont > 0 && now - lastFont > SETTLE_MS;
    const nothingToTranslate =
      lastFont === 0 && translatedAt > 0 && now - translatedAt > NO_FONT_MS;
    if ((translated && (settled || nothingToTranslate)) || now - start > maxWait) {
      reveal();
    }
  }, 40);

  return reveal;
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
  const pathname = usePathname();

  useEffect(() => watchForMissedTranslations(), []);

  /*
    Layout effect — notun page paint howar AGE chole, tai English ekbaro dekha
    jay na. Full load-e class head script age-i boshiyeche; link click-e
    (Google age thekei chalu, `translated-ltr` ache) ekhane boshai.
  */
  useLayoutEffect(() => {
    if (getStoredLanguage() !== "es") return;
    const root = document.documentElement;
    const fullLoad = root.classList.contains("vv-translating");

    if (!fullLoad) {
      if (!root.classList.contains("translated-ltr")) return;
      root.classList.add("vv-translating-main");
      nudgeGoogle();
    }

    const reveal = revealWhenTranslated(fullLoad ? 2500 : 1500);
    return reveal;
  }, [pathname]);

  useEffect(() => {
    /*
      `useLanguage()` na — hydration-er prothom commit-e provider ichchha kore
      "en" dey, ar ei effect oi commit-er por-i chole. Oita pore cookie milale
      Spanish-e thaka visitor-er cookie muche jeto. Tai asol pochhondo shoja
      storage theke.
    */
    const language = getStoredLanguage();

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
    // Script ekbar-i load hobe; porer bodol gula `switchSiteLanguage()` shamlay
  }, []);

  // Google-er nijer dropdown ekhane boshe; CSS diye lukano
  return <div id={ELEMENT_ID} aria-hidden="true" />;
}
