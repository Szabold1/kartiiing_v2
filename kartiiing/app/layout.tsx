import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import { GlobalProvider } from "@/contexts/GlobalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <GlobalProvider value={{ currentYear }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-1 w-full px-3 lg:px-7 max-w-[90rem] mx-auto border-x border-dashed">
              {children}
            </main>
            <Footer year={currentYear} />
          </ThemeProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
