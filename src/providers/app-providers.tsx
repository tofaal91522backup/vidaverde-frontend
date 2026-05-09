// import { Toaster } from "sonner";
import { LanguageProvider } from "./language-provider";
import QueryProvider from "./query-provider";

import { ThemeProvider } from "./theme-provider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        <QueryProvider>{children}</QueryProvider>
      </LanguageProvider>
      {/* <Toaster position="bottom-right" /> */}
    </ThemeProvider>
  );
}
