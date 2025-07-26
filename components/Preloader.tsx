'use client';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('INITIALIZING');
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    // Simplified loading logic with better performance
    useEffect(() => {
        // Start with higher initial value for faster perceived loading
        setLoadingProgress(70);
        
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                const newValue = prev + Math.floor(Math.random() * 25) + 15;
                if (newValue >= 100) {
                    clearInterval(interval);
                    setLoadingText('WELCOME');
                    return 100;
                }
                setLoadingText('LOADING');
                return newValue;
            });
        }, 25);

        // Force completion after 500ms maximum to prevent blocking LCP
        const maxLoadingTime = setTimeout(() => {
            setLoadingProgress(100);
            setLoadingText('WELCOME');
            if (timelineRef.current) {
                timelineRef.current.play();
            }
        }, 500);

        return () => {
            clearInterval(interval);
            clearTimeout(maxLoadingTime);
        };
    }, []);
    
    // Simplified visibility management
    useEffect(() => {
        if (loadingProgress >= 100) {
            // Hide preloader after animation completes (reduced from 3s to 1.5s)
            const hideTimer = setTimeout(() => {
                setIsVisible(false);
            }, 1500);
            
            return () => clearTimeout(hideTimer);
        }
    }, [loadingProgress]);

    // Optimized animation setup
    useLayoutEffect(() => {
        if (!isVisible) return;
        
        const tl = gsap.timeline({
            defaults: {
                ease: 'power2.out',
                duration: 0.2,
            },
            paused: true,
        });
        
        timelineRef.current = tl;

        // Simplified animation sequence
        tl.to('.name-text span', {
            y: 0,
            stagger: 0.02,
            duration: 0.4,
            ease: 'power1.out'
        });
        
        tl.to(
            preloaderRef.current,
            {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.3,
                onComplete: () => {
                    if (preloaderRef.current) {
                        preloaderRef.current.style.display = 'none';
                    }
                }
            },
            '+=0.1'
        );
        
        return () => {
            if (tl) tl.kill();
        };
    }, [isVisible]);
    
    // Start animations when loading completes
    useEffect(() => {
        if (loadingProgress >= 100 && timelineRef.current) {
            timelineRef.current.play();
        }
    }, [loadingProgress]);
    
    // Optimized background animations
    useEffect(() => {
        if (!isVisible) return;
        
        // Hexagon animation with better performance
        const hexagonAnim = gsap.to('.hexagon', {
            rotation: 360,
            repeat: -1,
            duration: 25,
            ease: 'none',
            force3D: true,
            overwrite: true
        });

        // Code line animation
        const lineAnim = gsap.to('.code-line', {
            width: '100%',
            duration: 1.2,
            stagger: 0.1,
            ease: 'power1.inOut',
        });
        
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
            {/* Optimized decorative elements */}
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
            
            {/* Simplified code lines */}
            <div className="absolute left-[10%] top-[30%] flex flex-col gap-2 w-[200px]">
                <div key="code-left-1" className="code-line h-[1px] w-0 bg-gradient-to-r from-primary/80 to-transparent" style={{willChange: 'width'}}></div>
            </div>
            
            <div className="absolute right-[10%] bottom-[30%] flex flex-col gap-2 w-[200px]">
                <div key="code-right-1" className="code-line h-[1px] w-0 bg-gradient-to-l from-secondary/80 to-transparent" style={{willChange: 'width'}}></div>
            </div>

            {/* Central content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                {/* Name with optimized styling */}
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
                
                {/* Progress bar */}
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
