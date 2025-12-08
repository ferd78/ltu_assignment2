import type { Metadata } from "next";
import { SUSE } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ThemedLayout from "./ThemedLayout";

const suse = SUSE({
  subsets: ["latin"],
  weight: ["200"],
});

export const metadata: Metadata = {
  title: "LTU Assignment 2",
  description: "Generated for Assignment 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${suse.className}`}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <ThemedLayout>{children}</ThemedLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
