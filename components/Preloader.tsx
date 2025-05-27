'use client';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('INITIALIZING');
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    // Extremely accelerated loading progress to minimize LCP impact
    useEffect(() => {
        // Start with much higher initial value to reduce perceived loading time
        setLoadingProgress(60);
        
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                const newValue = prev + Math.floor(Math.random() * 30) + 20; // Ultra-fast progress
                if (newValue >= 100) {
                    clearInterval(interval);
                    setLoadingText('WELCOME');
                    return 100;
                }
                
                // Minimal text updates
                setLoadingText('LOADING');
                
                return newValue;
            });
        }, 20); // Even faster interval for quicker completion

        return () => clearInterval(interval);
    }, []);
    
    // Extremely reduced loading time to avoid blocking LCP
    useEffect(() => {
        // Force completion after a very short maximum time to prevent blocking LCP
        const maxLoadingTime = setTimeout(() => {
            setLoadingProgress(100);
            setLoadingText('WELCOME');
            if (timelineRef.current) {
                timelineRef.current?.play();
            }
        }, 300); // Reduced to 300ms maximum loading time to minimize LCP impact
        
        // Normal completion
        if (loadingProgress >= 100 && timelineRef.current) {
            clearTimeout(maxLoadingTime);
            timelineRef.current?.play(); // Immediate play without delay
        }
        
        return () => clearTimeout(maxLoadingTime);
    }, [loadingProgress]);
    
    // Keep preloader visible for a reasonable time
    useEffect(() => {
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // Show for 3 seconds to ensure animations are visible
        
        return () => clearTimeout(hideTimer);
    }, []);

    // Use useLayoutEffect instead of useGSAP for critical animations
    // This runs synchronously before browser paint
    useLayoutEffect(() => {
        if (!isVisible) return;
        
        // Create ultra-optimized timeline
        const tl = gsap.timeline({
            defaults: {
                ease: 'power2.out',
                duration: 0.2, // Ultra-fast animations
            },
            paused: true,
        });
        
        timelineRef.current = tl;

        // Minimal animation sequence with reduced complexity
        tl.to('.name-text span', {
            y: 0,
            stagger: 0.01, // Minimal stagger
            duration: 0.3,
            ease: 'power1.out' // Simpler easing
        });
        
        // Immediate fade out
        tl.to(
            preloaderRef.current,
            {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.2,
                onComplete: () => {
                    // Clean up animations when preloader is hidden
                    if (preloaderRef.current) {
                        preloaderRef.current.style.display = 'none';
                    }
                }
            },
            '+=0.05', // Minimal delay
        );
        
        // Return cleanup function
        return () => {
            if (tl) tl.kill();
        };
    }, [isVisible]);
    
    // Animations start immediately
    useEffect(() => {
        if (!isVisible) return;
        
        // Start animations immediately
        // Hexagon animation
        const hexagonAnim = gsap.to('.hexagon', {
            rotation: 360,
            repeat: -1,
            duration: 20, // Faster rotation for better visibility
            ease: 'none',
            force3D: true,
            overwrite: true
        });

        // Code line animation
        const lineAnim = gsap.to('.code-line', {
            width: '100%',
            duration: 1,
            stagger: 0.05,
            ease: 'power1.inOut',
        });
        
        // Store animations for cleanup
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
            style={{ contain: 'strict', willChange: 'opacity' }}
        >
            {/* Removed 3D Layered Background for better performance */}
            
            {/* Multiple decorative hexagons for better visual effect */}
            <div className="absolute inset-0 overflow-hidden">
                <div 
                    className="hexagon absolute w-[80px] h-[80px] bg-transparent"
                    style={{
                        top: '20%',
                        left: '10%',
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        border: '2px solid',
                        borderColor: 'hsl(var(--primary) / 0.5)',
                        willChange: 'transform'
                    }}
                ></div>
                
                <div 
                    className="hexagon absolute w-[60px] h-[60px] bg-transparent"
                    style={{
                        top: '60%',
                        right: '15%',
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        border: '2px solid',
                        borderColor: 'hsl(var(--secondary) / 0.5)',
                        willChange: 'transform'
                    }}
                ></div>
                
                <div 
                    className="hexagon absolute w-[40px] h-[40px] bg-transparent"
                    style={{
                        bottom: '20%',
                        left: '20%',
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        border: '2px solid',
                        borderColor: 'hsl(var(--primary) / 0.5)',
                        willChange: 'transform'
                    }}
                ></div>
            </div>
            
            {/* Extremely simplified Code Lines - only show 1 on each side */}
            <div className="absolute left-[10%] top-[30%] flex flex-col gap-2 w-[200px]">
                <div key="code-left-1" className="code-line h-[1px] w-0 bg-gradient-to-r from-primary/80 to-transparent" style={{willChange: 'width'}}></div>
            </div>
            
            <div className="absolute right-[10%] bottom-[30%] flex flex-col gap-2 w-[200px]">
                <div key="code-right-1" className="code-line h-[1px] w-0 bg-gradient-to-l from-secondary/80 to-transparent" style={{willChange: 'width'}}></div>
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
                        <div className="text-center text-xs tracking-[0.5em] text-foreground mt-3 font-mono font-light">Full Stack Developer</div>
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
