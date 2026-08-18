import AppProviders from "@/providers/app-providers";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import Script from "next/script";
import { hasLocale, type Locale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Newsreader,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning suppressContentEditableWarning>
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
        <NextIntlClientProvider messages={messages}>
          <AppProviders>{children}</AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
