'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from './ThemeProviderSimple';

gsap.registerPlugin(useGSAP);

const ParticleBackground = () => {
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [particleColor, setParticleColor] = useState('bg-primary/20');
    const [particleCount, setParticleCount] = useState(200);
    
    // Update particle styling based on theme
    useEffect(() => {
        if (theme === 'dark') {
            setParticleColor('bg-primary/40'); // Increased opacity for better visibility
        } else {
            setParticleColor('bg-secondary/40'); // Increased opacity for better visibility
        }
        
        // Adjust particle count based on screen size
        const updateParticleCount = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setParticleCount(100);
            } else if (width < 1280) {
                setParticleCount(150);
            } else {
                setParticleCount(200);
            }
        };
        
        updateParticleCount();
        window.addEventListener('resize', updateParticleCount);
        
        return () => {
            window.removeEventListener('resize', updateParticleCount);
        };
    }, [theme]);

    useGSAP(() => {
        // Clear previous refs to avoid duplicates
        particlesRef.current = [];
        
        // Initialize particles after a short delay to ensure DOM is ready
        setTimeout(() => {
            particlesRef.current.forEach((particle) => {
                if (!particle) return;
                
                // Larger size for better visibility
                const size = Math.random() * 4 + 2;
                
                gsap.set(particle, {
                    width: size,
                    height: size,
                    opacity: Math.random() * 0.6 + 0.2, // Higher opacity for better visibility
                    left: Math.random() * window.innerWidth,
                    top: Math.random() * (window.innerHeight * 2), // Start particles from a larger area
                });

                // Create floating animation
                gsap.to(particle, {
                    y: '-=' + (window.innerHeight + 100), // Move upward for a floating effect
                    duration: Math.random() * 20 + 15, // Slower movement for more subtle effect
                    delay: Math.random() * 5,
                    opacity: 0,
                    repeat: -1,
                    repeatRefresh: true, // Refresh values on repeat
                    ease: 'none',
                });
                
                // Add subtle horizontal movement
                gsap.to(particle, {
                    x: (Math.random() - 0.5) * 100, // Random horizontal drift
                    duration: Math.random() * 15 + 10,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            });
        }, 100);
    }, [particleColor, particleCount]); // Re-run when theme or particle count changes

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Particles with theme-based styling */}
            {[...Array(particleCount)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) particlesRef.current.push(el);
                    }}
                    className={`absolute rounded-full ${particleColor} transition-colors duration-1000`}
                />
            ))}
        </div>
    );
};

export default ParticleBackground;
