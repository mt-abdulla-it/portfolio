import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abdulla Thaslim - Full Stack Developer",
  description: "Portfolio of Abdulla Thaslim, a Full Stack Developer building modern, scalable, and secure web applications.",
  openGraph: {
    title: "Abdulla Thaslim - Full Stack Developer",
    description: "Portfolio of Abdulla Thaslim, a Full Stack Developer building modern, scalable, and secure web applications.",
    url: "https://abdulla-portfolio.vercel.app", // Placeholder
    siteName: "Abdulla Thaslim Portfolio",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased transition-colors duration-500`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
