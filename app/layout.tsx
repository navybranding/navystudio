import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NAVY — Marcas relacionais para moda e wellness",
  description:
    "A NAVY constrói marcas relacionais para moda e wellness — marcas que as pessoas não trocam, não esquecem e não largam.",
  openGraph: {
    title: "NAVY — Marcas relacionais para moda e wellness",
    description:
      "A NAVY constrói marcas relacionais para moda e wellness — marcas que as pessoas não trocam, não esquecem e não largam.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={playfair.variable}>
      <body>{children}</body>
    </html>
  );
}
