import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "AtomicPNP - Atomic Design System for Next.js",
    description: "A comprehensive plug-and-play atomic design system for Next.js projects. Built with TypeScript, Tailwind CSS, and React 19.",
    keywords: ["atomic design", "design system", "next.js", "react", "typescript", "tailwind", "components"],
    authors: [{name: "M2B Creator"}],
    creator: "M2B Creator",
    applicationName: "AtomicPNP",
    publisher: "M2B Creator",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    //metadataBase: new URL('https://atomicpnp.dev'),
    openGraph: {
        title: "AtomicPNP - Atomic Design System for Next.js",
        description: "A comprehensive plug-and-play atomic design system for Next.js projects",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "AtomicPNP - Atomic Design System for Next.js",
        description: "A comprehensive plug-and-play atomic design system for Next.js projects",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light" style={{colorScheme: 'light'}}>
        <head>
            <meta name="color-scheme" content="light"/>
            <meta name="theme-color" content="#ffffff"/>
            <title></title>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 design-system-page`}
        >
        {children}
        </body>
        </html>
    );
}
