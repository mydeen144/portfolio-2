'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Separate state to track if LCP has occurred
    const [lcpComplete, setLcpComplete] = React.useState(false);

    // Prioritize LCP rendering before any other operations
    React.useEffect(() => {
        // Only run in browser environment
        if (typeof window === 'undefined') return;
        
        // Use high priority rendering for LCP
        let immediateRender: number | null = null;
        
        if ('requestIdleCallback' in window) {
            const rIC = window.requestIdleCallback as (_callback: IdleRequestCallback, _options?: IdleRequestOptions) => number;
            immediateRender = rIC(() => {
                // Mark LCP element with high priority
                const lcpElement = document.querySelector('.lcp-element');
                if (lcpElement && 'setAttribute' in lcpElement) {
                    (lcpElement as HTMLElement).setAttribute('fetchpriority', 'high');
                    (lcpElement as HTMLElement).getBoundingClientRect();
                }
            }, { timeout: 10 });
        } else if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
            immediateRender = (window as Window & typeof globalThis).requestAnimationFrame(() => {
                const lcpElement = document.querySelector('.lcp-element');
                if (lcpElement) {
                    (lcpElement as HTMLElement).getBoundingClientRect();
                }
            });
        }

        // Monitor LCP completion
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                if (entries.length > 0) {
                    setLcpComplete(true);
                    lcpObserver.disconnect();
                }
            });
            
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
            
            // Even shorter fallback timeout for faster animation start
            const fallbackTimer = setTimeout(() => {
                setLcpComplete(true);
            }, 300);
            
            return () => {
                if (typeof window !== 'undefined') {
                    if (immediateRender !== null) {
                        if ('cancelIdleCallback' in window) {
                            const cIC = window.cancelIdleCallback as (handle: number) => void;
                            cIC(immediateRender);
                        } else if (typeof window !== 'undefined' && 'cancelAnimationFrame' in window) {
                            (window as Window & typeof globalThis).cancelAnimationFrame(immediateRender);
                        }
                    }
                }
                lcpObserver.disconnect();
                clearTimeout(fallbackTimer);
            };
        } else {
            // Fallback for browsers without PerformanceObserver - faster timeout
            const timer = setTimeout(() => {
                setLcpComplete(true);
            }, 300);
            return () => {
                if (typeof window !== 'undefined') {
                    if (immediateRender !== null) {
                        if ('cancelIdleCallback' in window) {
                            const cIC = window.cancelIdleCallback as (handle: number) => void;
                            cIC(immediateRender);
                        } else if (typeof window !== 'undefined' && 'cancelAnimationFrame' in window) {
                            (window as Window & typeof globalThis).cancelAnimationFrame(immediateRender);
                        }
                    }
                }
                clearTimeout(timer);
            };
        }
    }, []);
    
    // Optimized animations that only run after LCP
    useGSAP(
        () => {
            // Skip animations if LCP hasn't completed
            if (!lcpComplete) return;
            
            // Initial animation on page load - deferred until after LCP
            const loadTl = gsap.timeline();
            
            // Animate the grid lines first
            loadTl.fromTo('.grid-line', 
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 0.5, stagger: 0.05, duration: 1, ease: 'power3.out' },
                0
            );
            
            // Then animate the text elements - explicitly excluding LCP element
            loadTl.fromTo('.title-word:not(.lcp-element)', 
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(1.7)' },
                0.1 // Reduced delay for faster animation start
            );
            
            loadTl.fromTo('.badge', 
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
                0.5
            );
            
            loadTl.fromTo('.banner-description', 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 },
                0.7
            );
            
            // Animate the stats cards with a staggered effect - except LCP elements
            loadTl.fromTo('.stat-card:not(.lcp-card)', 
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out' },
                0.6
            );
            
            loadTl.fromTo('.cta-button', 
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 },
                0.9
            );

            // Scroll animation
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            scrollTl.to('.parallax-element', {
                y: -100,
                opacity: 0.5,
                stagger: 0.1,
                ease: 'none',
            });

            // Reduced continuous animations for better performance
            gsap.to('.floating-shape', {
                y: -20,
                rotation: '+=8',
                duration: 6, // Slower animation for better performance
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: 0.8, // Increased stagger for less CPU usage
            });
            
            gsap.to('.rotating-circle', {
                rotation: 360,
                duration: 40, // Much slower rotation for better performance
                ease: 'none',
                repeat: -1,
            });
            
            // Only animate pulse elements if device is powerful enough
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                gsap.to('.pulse-element', {
                    scale: 1.05, // Reduced scale change
                    opacity: 0.8,
                    duration: 3, // Slower animation
                    ease: 'sine.inOut',
                    repeat: -1,
                    yoyo: true,
                    stagger: 1.0, // Increased stagger for better performance
                });
            }
        },
        { scope: containerRef },
    );

    return (
        <section className="relative overflow-hidden min-h-[100svh]" id="banner" ref={containerRef}>
            {/* Premium background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Grid Lines using CSS background instead of DOM elements */}
                <div 
                    className="absolute inset-0 opacity-5" 
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, hsl(var(--primary)/30) 1px, transparent 1px),
                            linear-gradient(to bottom, hsl(var(--primary)/30) 1px, transparent 1px)
                        `,
                        backgroundSize: 'calc(100% / 12) calc(100% / 12)',
                        willChange: 'transform'
                    }}
                ></div>
                
                {/* Reduced floating shapes with blur effects */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl opacity-30"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl opacity-30"></div>
                
                {/* Rotating circles */}
                <div className="rotating-circle absolute top-[20%] left-[30%] w-[400px] h-[400px] rounded-full border border-dashed border-primary/10 opacity-30"></div>
                <div className="rotating-circle absolute bottom-[10%] right-[20%] w-[300px] h-[300px] rounded-full border border-dashed border-secondary/10 opacity-30"></div>
            </div>
            
            {/* Content container */}
            <div className="container min-h-[100svh] py-16 flex flex-col justify-center items-center relative z-10">
                {/* Main content with split design */}
                <div className="w-full grid lg:grid-cols-2 gap-10 items-center">
                    {/* Left column - Text content */}
                    <div className="order-2 lg:order-1 space-y-8 max-w-[600px] mx-auto lg:mx-0 group">
                        <div className="space-y-6">
                            {/* Premium badge */}
                            <div className="badge inline-block bg-background/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
                                <span className="text-primary font-medium tracking-wide">Full Stack Developer</span>
                            </div>
                            
                            {/* Main heading with prioritized LCP element - Improved for SEO */}
                            <h1 className="text-3xl sm:text-5xl font-anton leading-tight tracking-wide" id="main-heading">
                                <div className="overflow-hidden">
                                    <span 
                                        className="title-word lcp-element inline-block text-foreground relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-foreground/20 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-100"
                                        style={{ 
                                            willChange: 'auto',
                                            contentVisibility: 'auto',
                                            contain: 'paint layout',
                                            textRendering: 'optimizeSpeed',
                                            fontDisplay: 'swap',
                                            transform: 'translateZ(0)' // Force hardware acceleration
                                        } as React.CSSProperties}
                                        suppressHydrationWarning
                                    >
                                        Mydeen Pitchai
                                    </span>
                                </div>{' '}
                                <div className="overflow-hidden">
                                    <span className="title-word inline-block text-primary drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary/30 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-100">Full Stack</span>
                                </div>{' '}
                                <div className="overflow-hidden">
                                    <span 
                                        className="title-word inline-block text-secondary drop-shadow-[0_0_15px_rgba(var(--secondary-rgb),0.4)] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-secondary/30 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-100"
                                    >Developer</span>
                                </div>
                            </h1>
                            
                            {/* Description with premium styling - Optimized for LCP */}
                            <p 
                                className="banner-description text-lg text-muted-foreground/90 leading-relaxed py-2 px-1 rounded-md border-l-2 border-primary/30 pl-4"
                                style={{ 
                                    willChange: 'auto',
                                    contentVisibility: 'auto',
                                    contain: 'paint layout',
                                    textRendering: 'optimizeSpeed'
                                } as React.CSSProperties}
                                suppressHydrationWarning
                            >
                                Hi! I&apos;m{' '}
                                <span className="font-medium text-foreground font-anton relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary/40 group-hover:text-primary transition-colors duration-300">
                                    MYDEEN
                                </span>
                                . A seasoned Full Stack Developer with <span className="text-primary font-medium">5+</span> years of experience crafting <span className="text-foreground/90">PHP solutions with Laravel & WordPress</span>. I blend modern front-end tech like <span className="text-secondary/90">Tailwind CSS & Alpine.js</span> to build human-centered digital experiences that solve real problems.
                            </p>
                        </div>
                        
                        {/* CTA button with enhanced styling */}
                        <Button
                            as="link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={GENERAL_INFO.upworkProfile}
                            variant="primary"
                            className="cta-button inline-flex items-center gap-2 px-7 py-3.5 text-lg shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] transition-all"
                        >
                            <span>Hire Me</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Button>
                    </div>
                    
                    {/* Right column - Premium stats cards */}
                    <div className="order-1 lg:order-2 flex flex-col gap-5 md:gap-7">
                        {/* Experience card - This is the LCP element */}
                        <div 
                            className="stat-card lcp-card group bg-background/20 backdrop-blur-xl border border-primary/20 rounded-2xl p-7 transform hover:scale-105 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] hover:before:opacity-100 relative overflow-hidden before:content-[''] before:absolute before:-inset-1 before:bg-primary/5 before:rounded-full before:blur-xl before:opacity-0 before:transition-opacity before:duration-500" 
                            style={{ contentVisibility: 'auto', contain: 'layout' }}
                            suppressHydrationWarning
                        >
                            
                            <div className="relative z-10 flex items-center gap-5">
                                <div className="flex-shrink-0 size-14 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-2xl text-primary">5+</span>
                                </div>
                                <div>
                                    <h5 
                                        className="lcp-element text-3xl font-anton text-primary mb-1" 
                                        style={{ 
                                            willChange: 'auto',
                                            contentVisibility: 'auto',
                                            contain: 'paint layout',
                                            textRendering: 'optimizeSpeed'
                                        }}
                                        {...{
                                            fetchPriority: "high",
                                            suppressHydrationWarning: true
                                        } as React.HTMLAttributes<HTMLHeadingElement>}
                                    >
                                        Years of Experience
                                    </h5>
                                    <p className="text-muted-foreground">
                                        Building modern web applications
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Projects card */}
                        <div className="stat-card group bg-background/20 backdrop-blur-xl border border-secondary/20 rounded-2xl p-7 transform hover:scale-105 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--secondary-rgb),0.2)] hover:before:opacity-100 relative overflow-hidden md:ml-12 before:content-[''] before:absolute before:-inset-1 before:bg-secondary/5 before:rounded-full before:blur-xl before:opacity-0 before:transition-opacity before:duration-500">
                            
                            <div className="relative z-10 flex items-center gap-5">
                                <div className="flex-shrink-0 size-14 rounded-full bg-secondary/10 flex items-center justify-center">
                                    <span className="text-2xl text-secondary">15+</span>
                                </div>
                                <div>
                                    <h5 className="text-3xl font-anton text-secondary mb-1">
                                        Completed Projects
                                    </h5>
                                    <p className="text-muted-foreground">
                                        Delivering quality solutions
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Hours card */}
                        <div className="stat-card group bg-background/20 backdrop-blur-xl border border-primary/20 rounded-2xl p-7 transform hover:scale-105 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] hover:before:opacity-100 relative overflow-hidden before:content-[''] before:absolute before:-inset-1 before:bg-primary/5 before:rounded-full before:blur-xl before:opacity-0 before:transition-opacity before:duration-500">
                            
                            <div className="relative z-10 flex items-center gap-5">
                                <div className="flex-shrink-0 size-14 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-2xl text-primary">10K+</span>
                                </div>
                                <div>
                                    <h5 className="text-3xl font-anton text-primary mb-1">
                                        Hours Worked
                                    </h5>
                                    <p className="text-muted-foreground">
                                        Dedicated to perfection
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Arrow animation at the bottom */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 parallax-element">
                    <ArrowAnimation />
                </div>
            </div>
        </section>
    );
};

export default Banner;
