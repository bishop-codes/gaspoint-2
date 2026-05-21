import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GasPoint | Fast & Reliable Gas Delivery",
  description: "GasPoint provides fast, reliable, and secure cooking gas delivery right to your doorstep. Experience real-time tracking and verified vendors for peace of mind.",
  icons: {
    icon: "/gas.jpg",
    apple: "/gas.jpg",
  },
  openGraph: {
    title: "GasPoint | Fast & Reliable Gas Delivery",
    description: "GasPoint provides fast, reliable, and secure cooking gas delivery right to your doorstep.",
    images: [
      {
        url: "/gas.jpg",
        width: 1200,
        height: 630,
        alt: "GasPoint App",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GasPoint | Fast & Reliable Gas Delivery",
    description: "GasPoint provides fast, reliable, and secure cooking gas delivery right to your doorstep.",
    images: ["/gas.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
