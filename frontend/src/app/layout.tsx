import React from "react";
import ThemeRegistry from "@/components/Theme/ThemeRegistry/ThemeRegistry";
import "./globals.css";

export const metadata = {
  title: "Tango",
  description: "next app with mui5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
