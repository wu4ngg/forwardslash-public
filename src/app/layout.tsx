import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav_bar";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/theme_provider";
import { ToastProvider } from "@/components/toast";
import { UserProvider } from "@/components/user";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forwardslash",
  description: "My porfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <UserProvider>
              <NextTopLoader
                easing="cubic-bezier(0.4, 0, 0.2, 1)"
                color="#FFF"
                shadow={false}
                showSpinner={false}
              />
              <NavBar />
              <div className="pt-[5rem] min-h-screen flex flex-col">
                {children}
              </div>
            </UserProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
