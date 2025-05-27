import type { Metadata } from 'next';
import { Anton, Roboto_Flex } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { ThemeProvider } from '@/components/ThemeProviderSimple';
import { ThemeToggle } from '@/components/ThemeToggleSimple';
import ClientComponents from './_components/ClientComponents';

// Optimize font loading with block period to reduce CLS
const antonFont = Anton({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-anton',
    display: 'optional', // Better for LCP text elements
    preload: true,
    fallback: ['Arial', 'sans-serif'],
});

const robotoFlex = Roboto_Flex({
    weight: ['400', '500', '700'], // Reduced font weights
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-roboto-flex',
    display: 'swap',
    preload: true,
    fallback: ['Arial', 'sans-serif'],
});

export const metadata: Metadata = {
    title: 'Portfolio - Mydeen Pitchai',
    description: 'Personal portfolio of Mydeen Pitchai',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Google Tag Manager */}
                <Script id="gtm-script" strategy="afterInteractive">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-NRPMNQP6');
                    `}
                </Script>
                {/* End Google Tag Manager */}

                {/* Preload critical assets */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                
                {/* Next.js handles font optimization automatically */}
                
                {/* Add font-display CSS to help with LCP */}
                <style dangerouslySetInnerHTML={{ __html: `
                    .lcp-element {
                        font-family: var(--font-anton), Arial, sans-serif;
                        font-display: optional;
                    }
                `}} />

            </head>
            <body
                className={`${antonFont.variable} ${robotoFlex.variable} antialiased`}
            >
                {/* Google Tag Manager (noscript) */}
                <noscript dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NRPMNQP6" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
                }} />
                <ThemeProvider>
                    <ReactLenis
                        root
                        options={{
                            lerp: 0.1,
                            duration: 1.2, // Slightly reduced for better performance
                        }}
                    >
                        <Navbar />
                        <ThemeToggle />
                        <main>{children}</main>
                        <Footer />

                        {/* Load non-critical UI elements via client component */}
                        <ClientComponents />
                    </ReactLenis>
                </ThemeProvider>
            </body>
        </html>
    );
}
