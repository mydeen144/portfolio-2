'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect, useState, useMemo } from 'react';
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
    const [particleCount, setParticleCount] = useState(30); // Increased count for better visual effect
    const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
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
            setParticleCount(15); // Fewer particles for low-power devices
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
                setParticleCount(20); // More particles for mobile
            } else if (width < 1280) {
                setParticleCount(40); // More particles for tablets
            } else {
                setParticleCount(60); // More particles for desktops
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

    // Use regular useEffect instead of useGSAP to avoid unnecessary registrations
    useEffect(() => {
        // Don't initialize if not visible yet
        if (!isVisible) return;
        
        // Clear previous refs and animations
        particlesRef.current = [];
        animationsRef.current.forEach(animation => {
            if (animation) animation.kill();
        });
        animationsRef.current = [];
        
        // Initialize particles immediately
        particlesRef.current.forEach((particle) => {
            if (!particle) return;
            
            // Enhanced particle setup
            const size = Math.random() * 3 + 2; // Larger particles for better visibility
            
            gsap.set(particle, {
                width: size,
                height: size,
                opacity: Math.random() * 0.5 + 0.2, // Higher opacity for better visibility
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
        
        return () => {};
    }, [particleColor, particleCount, isLowPerformanceMode]);

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

    // Don't render anything until visible
    if (!isVisible) return null;
    
    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-80" // Increased opacity
            style={{ contain: 'strict' }}
        >
            {particles}
        </div>
    );
};

export default ParticleBackground;
