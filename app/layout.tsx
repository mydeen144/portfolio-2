import type { Metadata } from 'next';
import { Anton, Roboto_Flex } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
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
            <GoogleAnalytics gaId="G-MHLY1LNGY5" />
            <Script id="hotjar" strategy="lazyOnload">
                {`(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6380611,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
            </Script>
            <body
                className={`${antonFont.variable} ${robotoFlex.variable} antialiased`}
            >
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
