'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

// Dynamically import non-critical components with loading priority
const Preloader = dynamic(() => import('../../components/Preloader'), {
    ssr: false,
    loading: () => null, // Don't show anything while loading
});

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
    ssr: false,
});

const ScrollProgressIndicator = dynamic(
    () => import('@/components/ScrollProgressIndicator'),
    { ssr: false }
);

const ParticleBackground = dynamic(
    () => import('@/components/ParticleBackground'),
    { ssr: false }
);

const StickyEmail = dynamic(() => import('../_components/StickyEmail'), {
    ssr: false,
});

export default function ClientComponents() {
    // Only load non-critical components after main content is rendered
    const [shouldLoadNonCritical, setShouldLoadNonCritical] = useState(false);
    
    useEffect(() => {
        // Set up intersection observer to detect when main content is visible
        const observer = new IntersectionObserver((entries) => {
            // If main content is visible, load non-critical components
            if (entries[0].isIntersecting) {
                // Delay loading non-critical components slightly
                setTimeout(() => {
                    setShouldLoadNonCritical(true);
                }, 100);
                observer.disconnect();
            }
        });
        
        // Start observing the main element
        const mainElement = document.querySelector('main');
        if (mainElement) {
            observer.observe(mainElement);
        } else {
            // If main element isn't found, load after a short delay anyway
            setTimeout(() => setShouldLoadNonCritical(true), 500);
        }
        
        return () => observer.disconnect();
    }, []);
    
    // Load preloader immediately but delay other components
    return (
        <Suspense fallback={null}>
            <CustomCursor />
            <Preloader />
            {shouldLoadNonCritical && (
                <>
                    <ScrollProgressIndicator />
                    <ParticleBackground />
                    <StickyEmail />
                </>
            )}
        </Suspense>
    );
}
