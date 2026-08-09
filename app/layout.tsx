import type { Metadata, Viewport } from "next";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/600.css";
import "@fontsource/cairo/700.css";
import "@fontsource/aref-ruqaa/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "البراء | نوّر دنيتنا",
  description: "بشارة ميلاد البراء — الحمد لله الذي بنعمته تتم الصالحات",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#CDEAF4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
