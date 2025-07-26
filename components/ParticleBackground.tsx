'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect, useState, useMemo, useLayoutEffect } from 'react';
import { useTheme } from './ThemeProviderSimple';

gsap.registerPlugin(useGSAP);

// Throttle function to limit how often a function can be called
const throttle = <T extends (..._args: any[]) => any>(func: T, limit: number): ((..._args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return function(this: any, ..._args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(this, _args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

const ParticleBackground = () => {
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationsRef = useRef<gsap.core.Tween[]>([]);
    const { theme } = useTheme();
    const [particleColor, setParticleColor] = useState('bg-primary/20');
    const [particleCount, setParticleCount] = useState(50); // Increased count for better visual effect
    const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
    const [particlesReady, setParticlesReady] = useState(false);
    const isVisible = true; // Always visible
    
    // Check for low performance devices
    useEffect(() => {
        // Check if device is likely to be low-powered
        const isLowPower = window.navigator.userAgent.includes('Mobile') || 
                          window.navigator.userAgent.includes('Android');
        
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (isLowPower || prefersReducedMotion) {
            setIsLowPerformanceMode(true);
            setParticleCount(25); // More particles even for low-power devices
        }
    }, []);
    
    // Update particle styling based on theme
    useEffect(() => {
        if (theme === 'dark') {
            setParticleColor('bg-primary/30');
        } else {
            setParticleColor('bg-secondary/30');
        }
        
        // Adjust particle count based on screen size - throttled
        const updateParticleCount = throttle(() => {
            const width = window.innerWidth;
            if (isLowPerformanceMode) return; // Don't change if in low performance mode
            
            if (width < 768) {
                setParticleCount(35); // More particles for mobile
            } else if (width < 1280) {
                setParticleCount(70); // More particles for tablets
            } else {
                setParticleCount(100); // More particles for desktops
            }
        }, 250); // Throttle to once every 250ms
        
        updateParticleCount();
        window.addEventListener('resize', updateParticleCount);
        
        return () => {
            window.removeEventListener('resize', updateParticleCount);
        };
    }, [theme, isLowPerformanceMode]);

    // Clean up animations when component unmounts
    useEffect(() => {
        return () => {
            // Kill all animations to prevent memory leaks
            animationsRef.current.forEach(animation => {
                if (animation) animation.kill();
            });
        };
    }, []);

    // Memoize the particle array to prevent unnecessary re-renders
    const particles = useMemo(() => {
        return [...Array(particleCount)].map((_, i) => (
            <div
                key={i}
                ref={(el) => {
                    if (el) particlesRef.current[i] = el;
                }}
                className={`absolute rounded-full ${particleColor} will-change-transform`}
                style={{ contain: 'layout paint size', willChange: 'transform' }}
            />
        ));
    }, [particleCount, particleColor]);

    // Mark particles as ready after they're rendered
    useEffect(() => {
        if (particlesRef.current.length === particleCount) {
            setParticlesReady(true);
        }
    }, [particleCount, particles]);

    // Use useLayoutEffect to ensure animations run after particles are rendered
    useLayoutEffect(() => {
        // Don't initialize if not visible or particles not ready
        if (!isVisible || !particlesReady) return;
        
        // Clear previous animations
        animationsRef.current.forEach(animation => {
            if (animation) animation.kill();
        });
        animationsRef.current = [];
        
        // Initialize particles immediately
        particlesRef.current.forEach((particle) => {
            if (!particle) return;
            
            // Enhanced particle setup
            const size = Math.random() * 4 + 3; // Larger particles for better visibility
            
            gsap.set(particle, {
                width: size,
                height: size,
                opacity: Math.random() * 0.7 + 0.3, // Higher opacity for better visibility
                left: Math.random() * window.innerWidth,
                top: Math.random() * window.innerHeight,
                force3D: true, // Force GPU acceleration
            });

            // Improved animation - vertical movement
            const anim1 = gsap.to(particle, {
                y: '-=' + (window.innerHeight / 2),
                duration: Math.random() * 15 + 10, // Faster for better visibility
                delay: Math.random() * 2,
                repeat: -1,
                repeatRefresh: true,
                ease: 'none',
            });
            
            animationsRef.current.push(anim1);
            
            // Add horizontal movement for all particles
            const anim2 = gsap.to(particle, {
                x: (Math.random() - 0.5) * 50, // More movement
                duration: Math.random() * 10 + 5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
            animationsRef.current.push(anim2);
        });
        
        return () => {
            // Clean up animations on unmount
            animationsRef.current.forEach(animation => {
                if (animation) animation.kill();
            });
        };
    }, [particleColor, particleCount, isLowPerformanceMode, isVisible, particlesReady]);

    // Don't render anything until visible
    if (!isVisible) return null;
    
    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-100" // Full opacity for better visibility
            style={{ contain: 'strict' }}
        >
            {particles}
        </div>
    );
};

export default ParticleBackground;
