import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { GlobalProvider } from "@/providers/GlobalProvider";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/nav/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning className={`${roboto.variable}`}>
      <body className="flex min-h-screen flex-col">
        <ScrollToTop />
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
