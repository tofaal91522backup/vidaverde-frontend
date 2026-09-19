import AppProviders from "@/providers/app-providers";
import type { Metadata } from "next";
import Script from "next/script";
import {
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Newsreader,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["italic"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vida Verde Spanish School in Quito, Ecuador",
  description:
    "One-on-one Spanish immersion, homestays, and cultural activities in Quito, Ecuador.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <head>
        {/*
          Spanish visitor-er jonno page anubad na howa porjonto lukano — paint-er
          agei (React-er age). Khole `GoogleTranslate` (dekho google-translate.tsx);
          2.5s failsafe — Google block hole English dekhabe, khali page na.
          Dashboard/profile English-i, oikhane na.
        */}
        {/*
          Inline — stylesheet load howar age-i paint hoy, tai rule-ta ekhanei.
          Lukano obosthay khali page na, spinner: full load-e majhe "Cargando…"
          shoho, link click-e shudhu content-er jaygay. 150ms por fade-in —
          druto link click-e (beshir bhag 0ms) spinner jhilik dey na.
          Pseudo-element, React-er DOM-e kichu na — hydration-e hat nei.
        */}
        <style
          dangerouslySetInnerHTML={{
            __html: [
              "html.vv-translating body>*,html.vv-translating-main main{visibility:hidden}",
              "@keyframes vv-spin{to{transform:rotate(360deg)}}",
              "@keyframes vv-in{to{opacity:1}}",
              "html.vv-translating body::after,html.vv-translating-main main::after{content:'';position:fixed;left:50%;top:50%;z-index:9999;width:40px;height:40px;margin:-20px 0 0 -20px;box-sizing:border-box;border-radius:50%;border:3px solid rgba(163,214,53,.28);border-top-color:#a3d635;visibility:visible;opacity:0;animation:vv-in .25s ease .15s forwards,vv-spin .8s linear infinite}",
              "html.vv-translating body::before{content:'Cargando…';position:fixed;left:0;right:0;top:50%;z-index:9999;margin-top:34px;text-align:center;font:500 13px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif;letter-spacing:.02em;color:#6b7268;visibility:visible;opacity:0;animation:vv-in .25s ease .15s forwards}",
              "@media (prefers-reduced-motion:reduce){html.vv-translating body::after,html.vv-translating-main main::after{animation:vv-in .25s ease .15s forwards}}",
            ].join(""),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("vv-language")!=="es")return;var p=location.pathname+"/";if(p.indexOf("/dashboard/")===0||p.indexOf("/profile/")===0)return;var h=document.documentElement;h.classList.add("vv-translating");setTimeout(function(){h.classList.remove("vv-translating")},2500)}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} ${newsreader.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
