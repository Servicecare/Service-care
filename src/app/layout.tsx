import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { businessConfig } from "@/config/business";
import { MotionProvider } from "@/components/providers/MotionProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Service for Life Care | NDIS & Aged Care Provider Sydney",
  description: "Service for Life Care is an NDIS and Aged Care Provider based in Sydney supporting individuals through high quality support services.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": businessConfig.companyName,
  "legalName": businessConfig.legalName,
  "description": metadata.description,
  "email": businessConfig.contact.email,
  "telephone": businessConfig.contact.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": businessConfig.address.street,
    "addressLocality": businessConfig.address.suburb,
    "addressRegion": businessConfig.address.state,
    "postalCode": businessConfig.address.postcode,
    "addressCountry": businessConfig.address.country
  },
  "url": process.env.NEXT_PUBLIC_SITE_URL || "https://serviceforlifecare.com.au",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <MotionProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
