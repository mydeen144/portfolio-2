'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

// Dynamically import non-critical components with loading priority
// Load preloader with a slight delay to avoid blocking LCP
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
    // Separate state for preloader to delay it slightly
    const [shouldLoadPreloader, setShouldLoadPreloader] = useState(false);
    
    useEffect(() => {
        // Load preloader immediately
        setShouldLoadPreloader(true);
        
        // Load non-critical components after a short delay
        setTimeout(() => {
            setShouldLoadNonCritical(true);
        }, 500);
        
        return () => {};
    }, []);
    
    // Load components with proper prioritization
    return (
        <Suspense fallback={null}>
            {/* Only load cursor and preloader after a slight delay */}
            {shouldLoadPreloader && (
                <>
                    <CustomCursor />
                    <Preloader />
                </>
            )}
            {shouldLoadNonCritical && (
                <>
                    <ScrollProgressIndicator />
                    <ParticleBackground mode="code-flow" />
                    <StickyEmail />
                </>
            )}
        </Suspense>
    );
}
