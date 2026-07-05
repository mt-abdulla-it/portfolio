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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
