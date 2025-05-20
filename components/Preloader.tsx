'use client';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('INITIALIZING');
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    // Simulate loading progress with even faster progression
    useEffect(() => {
        // Start with higher initial value to reduce perceived loading time
        setLoadingProgress(30);
        
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                const newValue = prev + Math.floor(Math.random() * 25) + 15; // Even faster progress
                if (newValue >= 100) {
                    clearInterval(interval);
                    setLoadingText('WELCOME');
                    return 100;
                }
                
                // Simplified text updates
                if (newValue < 50) setLoadingText('LOADING');
                else setLoadingText('ALMOST READY');
                
                return newValue;
            });
        }, 30); // Faster interval for quicker completion

        return () => clearInterval(interval);
    }, []);
    
    // Further reduced loading time and faster transitions
    useEffect(() => {
        // Force completion after a very short maximum time to prevent blocking LCP
        const maxLoadingTime = setTimeout(() => {
            setLoadingProgress(100);
            setLoadingText('WELCOME');
            if (timelineRef.current) {
                timelineRef.current?.play();
            }
        }, 500); // Reduced to 500ms maximum loading time
        
        // Normal completion
        if (loadingProgress >= 100 && timelineRef.current) {
            clearTimeout(maxLoadingTime);
            timelineRef.current?.play(); // Immediate play without delay
        }
        
        return () => clearTimeout(maxLoadingTime);
    }, [loadingProgress]);
    
    // Hide preloader completely after animation completes
    useEffect(() => {
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 2000); // Hide after 2 seconds regardless of animation state
        
        return () => clearTimeout(hideTimer);
    }, []);

    // Use useLayoutEffect instead of useGSAP for critical animations
    // This runs synchronously before browser paint
    useLayoutEffect(() => {
        if (!isVisible) return;
        
        // Create highly optimized timeline
        const tl = gsap.timeline({
            defaults: {
                ease: 'power2.out',
                duration: 0.3, // Even faster animations
            },
            paused: true,
        });
        
        timelineRef.current = tl;

        // Minimal animation sequence
        tl.to('.name-text span', {
            y: 0,
            stagger: 0.02, // Faster stagger
            duration: 0.4,
            ease: 'back.out(1.2)' // Less extreme easing
        });
        
        // Faster fade out
        tl.to(
            preloaderRef.current,
            {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.3,
                onComplete: () => {
                    // Clean up animations when preloader is hidden
                    if (preloaderRef.current) {
                        preloaderRef.current.style.display = 'none';
                    }
                }
            },
            '+=0.1',
        );
        
        // Return cleanup function
        return () => {
            if (tl) tl.kill();
        };
    }, [isVisible]);
    
    // Use useEffect for non-critical animations
    useEffect(() => {
        if (!isVisible) return;
        
        // Minimal background animations - only if visible
        const hexagonAnim = gsap.to('.hexagon', {
            rotation: 360,
            repeat: -1,
            duration: 40, // Even slower rotation
            ease: 'none',
            force3D: true,
            overwrite: true
        });

        // Simplified code line animation
        const lineAnim = gsap.to('.code-line', {
            width: '100%',
            duration: 1,
            stagger: 0.05,
            ease: 'power1.inOut',
        });
        
        // Clean up animations
        return () => {
            hexagonAnim.kill();
            lineAnim.kill();
        };
    }, [isVisible]);

    // Don't render anything if not visible
    if (!isVisible) return null;
    
    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background contain-layout"
            style={{ contain: 'strict' }}
        >
            {/* Removed 3D Layered Background for better performance */}
            
            {/* Background Hexagons - Reduced count */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => { // Reduced from 10 to 6
                    const row = Math.floor(i / 3);
                    const col = i % 3;
                    const top = 20 + (row * 50);
                    const left = 10 + (col * 30);
                    
                    return (
                        <div 
                            key={`hex-${i}`} 
                            className="hexagon absolute w-[50px] h-[50px] bg-transparent"
                            style={{
                                top: `${top}%`,
                                left: `${left}%`,
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                border: '1px solid',
                                borderColor: i % 2 === 0 ? 'hsl(var(--primary) / 0.2)' : 'hsl(var(--secondary) / 0.2)',
                                willChange: 'transform'
                            }}
                        ></div>
                    );
                })}
            </div>
            
            {/* Further simplified Code Lines - only show 2 on each side */}
            <div className="absolute left-[10%] top-[30%] flex flex-col gap-2 w-[200px]">
                {[...Array(2)].map((_, i) => (
                    <div key={`code-left-${i}`} className="code-line h-[1px] w-0 bg-gradient-to-r from-primary/80 to-transparent" style={{willChange: 'width'}}></div>
                ))}
            </div>
            
            <div className="absolute right-[10%] bottom-[30%] flex flex-col gap-2 w-[200px]">
                {[...Array(2)].map((_, i) => (
                    <div key={`code-right-${i}`} className="code-line h-[1px] w-0 bg-gradient-to-l from-secondary/80 to-transparent" style={{willChange: 'width'}}></div>
                ))}
            </div>

            {/* Further optimized Central Content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                {/* Name with simplified styling - removed backdrop-blur for better performance */}
                <div className="relative bg-background px-8 py-5 rounded-xl border border-primary/20 overflow-hidden">
                    <div className="relative z-10">
                        <p className="name-text flex text-[12vw] lg:text-[100px] font-anton text-center leading-none overflow-hidden">
                            <span className="inline-block text-primary" style={{transform: 'translateY(100%)', display: 'inline-block'}}>M</span>
                            <span className="inline-block" style={{transform: 'translateY(100%)', display: 'inline-block'}}>Y</span>
                            <span className="inline-block" style={{transform: 'translateY(100%)', display: 'inline-block'}}>D</span>
                            <span className="inline-block text-secondary" style={{transform: 'translateY(100%)', display: 'inline-block'}}>E</span>
                            <span className="inline-block text-primary" style={{transform: 'translateY(100%)', display: 'inline-block'}}>E</span>
                            <span className="inline-block" style={{transform: 'translateY(100%)', display: 'inline-block'}}>N</span>
                        </p>
                        <div className="text-center text-xs tracking-[0.5em] text-foreground mt-3 font-mono font-light">FRONTEND DEVELOPER</div>
                    </div>
                </div>
                
                {/* Loading Progress - Further optimized */}
                <div className="progress-container w-[250px] flex flex-col items-center gap-2">
                    <div className="w-full h-[2px] bg-muted overflow-hidden rounded-full">
                        <div 
                            className="progress-fill h-full bg-primary origin-left scale-x-0"
                            style={{ transform: `scaleX(${loadingProgress / 100})`, willChange: 'transform' }}
                        ></div>
                    </div>
                    <div className="flex justify-between w-full text-xs font-mono">
                        <div className="text-muted-foreground">{loadingProgress >= 100 ? '100%' : `${loadingProgress}%`}</div>
                        <div className="status-text text-primary">{loadingText}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
