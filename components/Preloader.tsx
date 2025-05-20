'use client';
import { useGSAP } from '@gsap/react';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('INITIALIZING');
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // Simulate loading progress with changing text
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                const newValue = prev + Math.floor(Math.random() * 15) + 5; // Increased speed
                if (newValue >= 100) {
                    clearInterval(interval);
                    setLoadingText('WELCOME');
                    return 100;
                }
                
                // Update loading text based on progress
                if (newValue < 30) setLoadingText('INITIALIZING');
                else if (newValue < 60) setLoadingText('LOADING ASSETS');
                else if (newValue < 90) setLoadingText('FINALIZING');
                else setLoadingText('ALMOST READY');
                
                return newValue;
            });
        }, 80); // Reduced interval time

        return () => clearInterval(interval);
    }, []);
    
    // Monitor loading progress and ensure it completes
    useEffect(() => {
        // Force completion after a maximum time to prevent getting stuck
        const maxLoadingTime = setTimeout(() => {
            setLoadingProgress(100);
            setLoadingText('WELCOME');
            if (timelineRef.current) {
                setTimeout(() => {
                    timelineRef.current?.play();
                }, 300); // Reduced delay
            }
        }, 2500); // Maximum 2.5 seconds loading time
        
        // Normal completion
        if (loadingProgress >= 100 && timelineRef.current) {
            clearTimeout(maxLoadingTime);
            setTimeout(() => {
                timelineRef.current?.play();
            }, 400); // Reduced delay
        }
        
        return () => clearTimeout(maxLoadingTime);
    }, [loadingProgress]);

    useGSAP(
        () => {
            // Create timeline and store in ref so we can access it outside this useGSAP scope
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.out',
                },
                paused: true,
            });
            
            // Store the timeline in the ref
            timelineRef.current = tl;

            // Animate the name letters first
            tl.to('.name-text span', {
                y: 0,
                stagger: 0.05,
                duration: 0.8,
                ease: 'back.out(1.7)'
            });
            
            // Then animate the 3D layers
            tl.fromTo('.layer', 
                { y: 0 },
                { 
                    y: -100, 
                    stagger: 0.05,
                    duration: 0.8
                },
                "-=0.4"
            );
            
            // Fade out the preloader
            tl.to(
                preloaderRef.current,
                {
                    opacity: 0,
                    pointerEvents: 'none',
                    duration: 0.8,
                },
                '+=0.2',
            );

            // Continuous animations for background elements - with GPU acceleration
            gsap.to('.hexagon', {
                rotation: 360,
                repeat: -1,
                duration: 20,
                ease: 'none',
                force3D: true,
                overwrite: true
            });

            gsap.to('.rotating-circle', {
                rotation: -360,
                repeat: -1,
                duration: 15,
                ease: 'none',
            });

            gsap.to('.code-line', {
                width: '100%',
                duration: 2,
                stagger: 0.2,
                ease: 'power2.inOut',
            });
            
            // Pulse animation for the name
            gsap.to('.name-highlight', {
                opacity: 0.8,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        },
        { scope: preloaderRef, dependencies: [loadingProgress] },
    );

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background contain-layout contain-paint"
            style={{ contentVisibility: 'auto' }}
        >
            {/* 3D Layered Background */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="layer layer-1 absolute w-[800px] h-[800px] rounded-full border border-primary/10 transform-style-3d rotate-x-12 rotate-y-12"></div>
                <div className="layer layer-2 absolute w-[600px] h-[600px] rounded-full border border-secondary/20 transform-style-3d rotate-x-8 rotate-y-8"></div>
                <div className="layer layer-3 absolute w-[400px] h-[400px] rounded-full border border-primary/30 transform-style-3d rotate-x-5 rotate-y-5"></div>
            </div>
            
            {/* Hexagon Grid - Pre-computed positions to avoid layout shifts */}
            <div className="absolute inset-0 overflow-hidden opacity-30 contain-layout">
                {[...Array(20)].map((_, i) => {
                    // Pre-compute positions using a deterministic pattern instead of random
                    // This creates a grid-like pattern that won't cause layout shifts
                    const row = Math.floor(i / 5);
                    const col = i % 5;
                    const top = 10 + (row * 25); // 4 rows, evenly spaced
                    const left = 5 + (col * 22); // 5 columns, evenly spaced
                    
                    return (
                        <div 
                            key={`hex-${i}`} 
                            className="hexagon absolute w-[50px] h-[50px] bg-transparent contain-layout"
                            style={{
                                top: `${top}%`,
                                left: `${left}%`,
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                border: '1px solid',
                                borderColor: i % 2 === 0 ? 'hsl(var(--primary) / 0.2)' : 'hsl(var(--secondary) / 0.2)',
                                willChange: 'transform',
                                transform: 'translateZ(0)'
                            }}
                        ></div>
                    );
                })}
            </div>
            
            {/* Code Lines */}
            <div className="absolute left-[10%] top-[30%] flex flex-col gap-2 w-[200px]">
                {[...Array(5)].map((_, i) => (
                    <div key={`code-left-${i}`} className="code-line h-[1px] w-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
                ))}
            </div>
            
            <div className="absolute right-[10%] bottom-[30%] flex flex-col gap-2 w-[200px]">
                {[...Array(5)].map((_, i) => (
                    <div key={`code-right-${i}`} className="code-line h-[1px] w-0 bg-gradient-to-l from-secondary/80 to-transparent"></div>
                ))}
            </div>

            {/* Central Content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-8 contain-layout">
                {/* Name with premium styling */}
                <div className="relative bg-background/10 backdrop-blur-md px-12 py-8 rounded-xl border border-primary/20 shadow-[0_0_40px_rgba(var(--primary),0.2)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
                    <div className="relative z-10">
                        <p className="name-text flex text-[18vw] lg:text-[150px] font-anton text-center leading-none overflow-hidden">
                            <span className="inline-block text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]">M</span>
                            <span className="inline-block">Y</span>
                            <span className="inline-block">D</span>
                            <span className="inline-block text-secondary drop-shadow-[0_0_10px_rgba(var(--secondary),0.5)]">E</span>
                            <span className="inline-block text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]">E</span>
                            <span className="inline-block">N</span>
                        </p>
                        <div className="text-center text-xs tracking-[0.5em] text-foreground mt-4 font-mono font-light">FRONTEND DEVELOPER</div>
                    </div>
                </div>
                
                {/* Loading Progress */}
                <div className="progress-container w-[300px] flex flex-col items-center gap-3">
                    <div className="w-full h-[2px] bg-muted overflow-hidden rounded-full">
                        <div 
                            className="progress-fill h-full bg-gradient-to-r from-primary to-secondary origin-left scale-x-0"
                            style={{ transform: `scaleX(${loadingProgress / 100})` }}
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
