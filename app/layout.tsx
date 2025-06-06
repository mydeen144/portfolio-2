import type { Metadata } from 'next';
import { Anton, Roboto_Flex } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { ThemeProvider } from '@/components/ThemeProviderSimple';
import ClientComponentsWrapper from './_components/ClientComponentsWrapper';

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
    title: 'Mydeen Pitchai | Full Stack Developer | PHP, Laravel & WordPress Expert',
    description: 'Experienced Full Stack Developer with 5+ years specializing in PHP, Laravel, WordPress, and modern front-end technologies like Tailwind CSS & Alpine.js',
    keywords: 'Full Stack Developer, PHP Developer, Laravel Expert, WordPress Developer, Web Development, Tailwind CSS, Alpine.js',
    alternates: {
        canonical: 'https://mydeen-pitchai.vercel.app',
    },
    authors: [{ name: 'Mydeen Pitchai', url: 'https://mydeen-pitchai.vercel.app' }],
    creator: 'Mydeen Pitchai',
    publisher: 'Mydeen Pitchai',
    formatDetection: {
        email: true,
        address: true,
        telephone: true,
    },
    metadataBase: new URL('https://mydeen-pitchai.vercel.app'),
    openGraph: {
        title: 'Mydeen Pitchai | Full Stack Developer',
        description: 'Experienced Full Stack Developer with 5+ years specializing in PHP, Laravel, WordPress, and modern front-end technologies.',
        url: 'https://mydeen-pitchai.vercel.app',
        siteName: 'Mydeen Pitchai Portfolio',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mydeen Pitchai | Full Stack Developer',
        description: 'Experienced Full Stack Developer with 5+ years specializing in PHP, Laravel, WordPress, and modern front-end technologies.',
        creator: '@mydeenpitchai',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f9f5f0' },
        { media: '(prefers-color-scheme: dark)', color: '#050a14' }
    ]
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Google Tag Manager - Deferred loading */}
                <Script id="gtm-script" strategy="lazyOnload">
                    {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-NRPMNQP6');
                    `}
                </Script>
                {/* End Google Tag Manager */}

                {/* Google Analytics 4 - Deferred loading */}
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZQNTQ9HK0V" strategy="lazyOnload" />
                <Script id="google-analytics" strategy="lazyOnload">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-ZQNTQ9HK0V');
                    `}
                </Script>
                {/* End Google Analytics 4 */}

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

                {/* Manual canonical link for additional SEO benefit */}
                <link rel="canonical" href="https://mydeen-pitchai.vercel.app" />

                {/* Schema.org structured data */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "@id": "https://mydeen-pitchai.vercel.app/#person",
                        "name": "Mydeen Pitchai",
                        "givenName": "Mydeen",
                        "familyName": "Pitchai",
                        "jobTitle": "Full Stack Developer",
                        "description": "Experienced Full Stack Developer with 5+ years specializing in PHP, Laravel, WordPress, and modern front-end technologies like Tailwind CSS & Alpine.js",
                        "url": "https://mydeen-pitchai.vercel.app",
                        "sameAs": [
                            "https://github.com/mydeen144",
                            "https://www.linkedin.com/in/mydeen-pitchai-developer/",
                            "https://www.facebook.com/mydeenpitchai.2000"
                        ],
                        "knowsAbout": [
                            "PHP", "Laravel", "WordPress", "Tailwind CSS", "Alpine.js", 
                            "Full Stack Development", "Web Development", "MySQL"
                        ],
                        "email": "mydeenpitchai.dev@gmail.com",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "Freelance"
                        }
                    }
                `}} />

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "@id": "https://mydeen-pitchai.vercel.app/#website",
                        "url": "https://mydeen-pitchai.vercel.app",
                        "name": "Mydeen Pitchai | Full Stack Developer",
                        "description": "Experienced Full Stack Developer with 5+ years specializing in PHP, Laravel, WordPress, and modern front-end technologies",
                        "publisher": {
                            "@id": "https://mydeen-pitchai.vercel.app/#person"
                        },
                        "inLanguage": "en-US"
                    }
                `}} />

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "@id": "https://mydeen-pitchai.vercel.app/#webpage",
                        "url": "https://mydeen-pitchai.vercel.app",
                        "name": "Mydeen Pitchai | Full Stack Developer | PHP, Laravel & WordPress Expert",
                        "description": "Experienced Full Stack Developer with 5+ years specializing in PHP, Laravel, WordPress, and modern front-end technologies like Tailwind CSS & Alpine.js",
                        "isPartOf": {
                            "@id": "https://mydeen-pitchai.vercel.app/#website"
                        },
                        "about": {
                            "@id": "https://mydeen-pitchai.vercel.app/#person"
                        },
                        "breadcrumb": {
                            "@id": "https://mydeen-pitchai.vercel.app/#breadcrumb"
                        },
                        "inLanguage": "en-US",
                        "potentialAction": [
                            {
                                "@type": "ReadAction",
                                "target": ["https://mydeen-pitchai.vercel.app"]
                            }
                        ]
                    }
                `}} />

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "@id": "https://mydeen-pitchai.vercel.app/#breadcrumb",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://mydeen-pitchai.vercel.app"
                            }
                        ]
                    }
                `}} />

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "ProfilePage",
                        "@id": "https://mydeen-pitchai.vercel.app/#profilepage",
                        "url": "https://mydeen-pitchai.vercel.app",
                        "name": "Mydeen Pitchai | Full Stack Developer Portfolio",
                        "about": {
                            "@id": "https://mydeen-pitchai.vercel.app/#person"
                        },
                        "mainEntity": {
                            "@id": "https://mydeen-pitchai.vercel.app/#person"
                        },
                        "isPartOf": {
                            "@id": "https://mydeen-pitchai.vercel.app/#website"
                        }
                    }
                `}} />

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "@id": "https://mydeen-pitchai.vercel.app/#service",
                        "name": "Full Stack Development Services",
                        "description": "Professional web development services including PHP, Laravel, WordPress, and modern front-end technologies",
                        "provider": {
                            "@id": "https://mydeen-pitchai.vercel.app/#person"
                        },
                        "serviceType": "Web Development",
                        "areaServed": "Worldwide",
                        "offers": {
                            "@type": "Offer",
                            "availability": "https://schema.org/InStock",
                            "price": "0",
                            "priceCurrency": "USD",
                            "url": "https://mydeen-pitchai.vercel.app"
                        }
                    }
                `}} />

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
                    {
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "@id": "https://mydeen-pitchai.vercel.app/#skillslist",
                        "name": "Skills & Technologies",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "PHP Development",
                                "url": "https://mydeen-pitchai.vercel.app/#my-stack"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Laravel Framework",
                                "url": "https://mydeen-pitchai.vercel.app/#my-stack"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "WordPress Development",
                                "url": "https://mydeen-pitchai.vercel.app/#my-stack"
                            },
                            {
                                "@type": "ListItem",
                                "position": 4,
                                "name": "Tailwind CSS",
                                "url": "https://mydeen-pitchai.vercel.app/#my-stack"
                            },
                            {
                                "@type": "ListItem",
                                "position": 5,
                                "name": "Alpine.js",
                                "url": "https://mydeen-pitchai.vercel.app/#my-stack"
                            }
                        ]
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
                            lerp: 0.08,
                            duration: 1.0, // Further reduced for better performance
                            smoothWheel: true,
                            // smoothTouch option removed as it's not supported in this version
                            wheelMultiplier: 0.8,
                        }}
                    >
                        <Navbar />
                        <main>{children}</main>
                        <Footer />

                        {/* Load non-critical UI elements via client component */}
                        <ClientComponentsWrapper />
                    </ReactLenis>
                </ThemeProvider>
            </body>
        </html>
    );
}
