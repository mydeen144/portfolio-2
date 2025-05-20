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
    const [particleCount, setParticleCount] = useState(10); // Drastically reduced count to minimize DOM elements
    const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // Start hidden
    
    // Check for low performance devices and delay initialization
    useEffect(() => {
        // Check if device is likely to be low-powered
        const isLowPower = window.navigator.userAgent.includes('Mobile') || 
                          window.navigator.userAgent.includes('Android');
        
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (isLowPower || prefersReducedMotion) {
            setIsLowPerformanceMode(true);
            setParticleCount(15); // Even fewer particles for low-power devices
        }
        
        // Significantly delay showing particles until after LCP
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000); // Delay particles by 2 seconds to ensure LCP is complete
        
        return () => clearTimeout(timer);
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
                setParticleCount(5); // Minimal for mobile
            } else if (width < 1280) {
                setParticleCount(8); // Minimal for tablets
            } else {
                setParticleCount(10); // Minimal for desktops
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
        
        // Initialize particles with a much longer delay to ensure LCP completes first
        const initTimeout = setTimeout(() => {
            particlesRef.current.forEach((particle) => {
                if (!particle) return;
                
                // Even simpler particle setup
                const size = Math.random() * 2 + 1; // Smaller particles
                
                gsap.set(particle, {
                    width: size,
                    height: size,
                    opacity: Math.random() * 0.3 + 0.1, // Lower opacity
                    left: Math.random() * window.innerWidth,
                    top: Math.random() * window.innerHeight,
                    force3D: true, // Force GPU acceleration
                });

                // Simplified animation - just vertical movement with longer duration
                const anim1 = gsap.to(particle, {
                    y: '-=' + (window.innerHeight / 2),
                    duration: Math.random() * 20 + 15, // Even slower for better performance
                    delay: Math.random() * 3,
                    repeat: -1,
                    repeatRefresh: true,
                    ease: 'none',
                });
                
                animationsRef.current.push(anim1);
                
                // Only add horizontal movement if not in low performance mode
                // and for a subset of particles (further reducing calculations)
                if (!isLowPerformanceMode && Math.random() > 0.5) {
                    const anim2 = gsap.to(particle, {
                        x: (Math.random() - 0.5) * 30, // Even less movement
                        duration: Math.random() * 15 + 10,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                    });
                    animationsRef.current.push(anim2);
                }
            });
        }, 1000); // Much longer delay to ensure LCP completes first
        
        return () => clearTimeout(initTimeout);
    }, [particleColor, particleCount, isLowPerformanceMode, isVisible]);

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
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-50" // Reduced opacity
            style={{ contain: 'strict' }}
        >
            {particles}
        </div>
    );
};

export default ParticleBackground;
