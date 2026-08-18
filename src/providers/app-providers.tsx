import QueryProvider from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      > */}
        <QueryProvider>{children}</QueryProvider>
      {/* </ThemeProvider> */}
    </>
  );
}
