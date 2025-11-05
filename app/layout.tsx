import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "On Track - Health & Time Management",
  description: "Track your time and maintain balance across physical, mental, emotional, spiritual, and social dimensions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
