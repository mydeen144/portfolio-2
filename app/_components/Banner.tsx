'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Enhanced animations on load and scroll
    useGSAP(
        () => {
            // Initial animation on page load
            const loadTl = gsap.timeline();
            
            // Animate the grid lines first
            loadTl.fromTo('.grid-line', 
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 0.5, stagger: 0.05, duration: 1.2, ease: 'power3.out' },
                0
            );
            
            // Then animate the text elements
            loadTl.fromTo('.title-word', 
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'back.out(1.7)' },
                0.3
            );
            
            loadTl.fromTo('.badge', 
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
                0.5
            );
            
            loadTl.fromTo('.banner-description', 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                0.7
            );
            
            // Animate the stats cards with a staggered effect
            loadTl.fromTo('.stat-card', 
                { x: 100, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out' },
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

            // Continuous animations for background elements
            gsap.to('.floating-shape', {
                y: -30,
                rotation: '+=10',
                duration: 5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: 0.5,
            });
            
            gsap.to('.rotating-circle', {
                rotation: 360,
                duration: 25,
                ease: 'none',
                repeat: -1,
            });
            
            gsap.to('.pulse-element', {
                scale: 1.1,
                opacity: 0.8,
                duration: 2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: 0.5,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="relative overflow-hidden min-h-[100svh]" id="banner" ref={containerRef}>
            {/* Premium background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Grid lines for tech aesthetic */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                    {[...Array(6)].map((_, i) => (
                        <div key={`h-grid-${i}`} className="grid-line h-px bg-primary origin-left"></div>
                    ))}
                </div>
                <div className="absolute inset-0 flex flex-row justify-between opacity-10">
                    {[...Array(6)].map((_, i) => (
                        <div key={`v-grid-${i}`} className="grid-line w-px h-full bg-primary origin-top"></div>
                    ))}
                </div>
                
                {/* Floating shapes with blur effects - increased opacity for better visibility */}
                <div className="floating-shape absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-primary/30 blur-[80px] opacity-50 dark:opacity-40"></div>
                <div className="floating-shape absolute top-[40%] right-[10%] w-[250px] h-[250px] rounded-full bg-secondary/30 blur-[60px] opacity-50 dark:opacity-40"></div>
                <div className="floating-shape absolute bottom-[15%] left-[20%] w-[200px] h-[200px] rounded-full bg-primary/25 blur-[50px] opacity-50 dark:opacity-40"></div>
                
                {/* Rotating circles */}
                <div className="rotating-circle absolute top-[20%] left-[30%] w-[400px] h-[400px] rounded-full border border-dashed border-primary/10 opacity-30"></div>
                <div className="rotating-circle absolute bottom-[10%] right-[20%] w-[300px] h-[300px] rounded-full border border-dashed border-secondary/10 opacity-30"></div>
            </div>
            
            {/* Content container */}
            <div className="container min-h-[100svh] py-16 flex flex-col justify-center items-center relative z-10">
                {/* Main content with split design */}
                <div className="w-full grid lg:grid-cols-2 gap-10 items-center">
                    {/* Left column - Text content */}
                    <div className="order-2 lg:order-1 space-y-8 max-w-[600px] mx-auto lg:mx-0">
                        <div className="space-y-6">
                            {/* Premium badge */}
                            <div className="badge inline-block bg-background/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
                                <span className="text-primary font-medium tracking-wide">Frontend Developer</span>
                            </div>
                            
                            {/* Main heading with word-by-word animation */}
                            <h1 className="text-3xl sm:text-5xl font-anton leading-tight tracking-wide">
                                <div className="overflow-hidden">
                                    <span className="title-word inline-block text-foreground">Crafting</span>
                                </div>{' '}
                                <div className="overflow-hidden">
                                    <span className="title-word inline-block text-primary drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]">Digital</span>
                                </div>{' '}
                                <div className="overflow-hidden">
                                    <span className="title-word inline-block text-secondary drop-shadow-[0_0_10px_rgba(var(--secondary-rgb),0.3)]">Experiences</span>
                                </div>
                            </h1>
                            
                            {/* Description with premium styling */}
                            <p className="banner-description text-lg text-muted-foreground leading-relaxed">
                                Hi! I&apos;m{' '}
                                <span className="font-medium text-foreground font-anton">
                                    MYDEEN
                                </span>
                                . A creative Frontend Developer with 3+ years of
                                experience in building high-performance, scalable, and
                                responsive web solutions.
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
                        {/* Experience card */}
                        <div className="stat-card group bg-background/20 backdrop-blur-xl border border-primary/20 rounded-2xl p-7 transform hover:scale-105 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] relative overflow-hidden">
                            {/* Pulsing background effect */}
                            <div className="pulse-element absolute -inset-1 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10 flex items-center gap-5">
                                <div className="flex-shrink-0 size-14 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-2xl text-primary">3+</span>
                                </div>
                                <div>
                                    <h5 className="text-3xl font-anton text-primary mb-1">
                                        Years of Experience
                                    </h5>
                                    <p className="text-muted-foreground">
                                        Building modern web applications
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Projects card */}
                        <div className="stat-card group bg-background/20 backdrop-blur-xl border border-secondary/20 rounded-2xl p-7 transform hover:scale-105 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--secondary-rgb),0.2)] relative overflow-hidden md:ml-12">
                            {/* Pulsing background effect */}
                            <div className="pulse-element absolute -inset-1 bg-secondary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10 flex items-center gap-5">
                                <div className="flex-shrink-0 size-14 rounded-full bg-secondary/10 flex items-center justify-center">
                                    <span className="text-2xl text-secondary">7+</span>
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
                        <div className="stat-card group bg-background/20 backdrop-blur-xl border border-primary/20 rounded-2xl p-7 transform hover:scale-105 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] relative overflow-hidden">
                            {/* Pulsing background effect */}
                            <div className="pulse-element absolute -inset-1 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
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
