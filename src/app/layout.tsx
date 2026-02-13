import type { Metadata } from "next";
import { Cairo, Tajawal, Playfair_Display } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
    subsets: ["latin", "arabic"],
    variable: "--font-cairo",
    weight: ["300", "400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
    weight: ["300", "400", "500", "700", "800"],
    subsets: ["latin", "arabic"],
    variable: "--font-tajawal"
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Luxury Arabic Perfume",
    description: "Exclusive collection of premium fragrances.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl" className={`${cairo.variable} ${tajawal.variable} ${playfair.variable}`}>
            <body className={`font-sans ${cairo.className}`}>
                {children}
            </body>
        </html>
    );
}
