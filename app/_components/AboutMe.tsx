'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: 150,
                opacity: 0,
                stagger: 0.05,
            });

            // Animate the background elements
            gsap.to('.about-shape', {
                x: '+=20',
                y: '+=20',
                rotation: 15,
                duration: 8,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: 0.3,
            });
        },
        { scope: container },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-out',
                    trigger: container.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 0.5,
                },
            });

            tl.to('.slide-up-and-fade', {
                y: -150,
                opacity: 0,
                stagger: 0.02,
            });
        },
        { scope: container },
    );

    return (
        <section className="py-10 relative overflow-hidden" id="about-me">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="about-shape absolute top-[20%] right-[10%] w-[200px] h-[200px] bg-primary/30 rounded-3xl rotate-12"></div>
                <div className="about-shape absolute bottom-[15%] left-[5%] w-[150px] h-[150px] bg-secondary/30 rounded-full"></div>
                <div className="about-shape absolute top-[60%] right-[20%] w-[100px] h-[100px] bg-primary/20 rounded-lg rotate-45"></div>
            </div>
            
            <div className="container relative z-10" ref={container}>
                {/* Quote card with visual styling */}
                <div className="max-w-4xl mx-auto mb-20 slide-up-and-fade bg-background/40 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-primary/10 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                    <div className="absolute -left-4 top-10 text-8xl text-primary/10 font-anton">&ldquo;</div>
                    <h2 className="text-3xl md:text-5xl font-thin leading-tight text-foreground relative z-10">
                        I craft digital solutions where user needs guide every line of code—turning functionality into intuitive experiences
                    </h2>
                    <div className="absolute -right-4 bottom-0 text-8xl text-primary/10 font-anton">&rdquo;</div>
                </div>

                {/* About me content with cards */}
                <div className="relative">
                    <div className="slide-up-and-fade inline-block bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-8">
                        <span className="text-primary font-medium">About Me</span>
                    </div>
                    
                    <div className="grid md:grid-cols-12 gap-8 items-center">
                        {/* Left column with name and image placeholder */}
                        <div className="md:col-span-5 slide-up-and-fade">
                            <div className="bg-background/40 backdrop-blur-sm p-6 rounded-2xl border border-border/50 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                                <h3 className="text-4xl md:text-5xl font-anton mb-4 pl-4">
                                    Hi, I&apos;m <span className="text-primary">Mydeen</span>.
                                </h3>
                                <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-background via-background/80 to-primary/10 flex items-center justify-center">
                                    <div className="text-8xl font-anton text-primary/20">MP</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right column with text content */}
                        <div className="md:col-span-7">
                            <div className="space-y-6 text-lg">
                                <p className="slide-up-and-fade bg-background/40 backdrop-blur-sm p-6 rounded-2xl border border-border/50 transform hover:scale-[1.02] transition-transform duration-300">
                                    I&apos;m a seasoned <a href="/#selected-projects" className="text-primary hover:underline">Full Stack Developer</a> with over 5 years of experience, specializing in PHP frameworks (Laravel, Symfony, Phalcon), WordPress, and modern front-end technologies including Tailwind CSS and Alpine.js. Check out my <a href="/#my-experience" className="text-primary hover:underline">professional experience</a> and <a href="/#skills" className="text-primary hover:underline">technical skills</a>.
                                </p>
                                <p className="slide-up-and-fade bg-background/40 backdrop-blur-sm p-6 rounded-2xl border border-border/50 transform hover:scale-[1.02] transition-transform duration-300">
                                    My approach focuses on creating scalable, high-performing solutions tailored to both user needs and business objectives. I&apos;ve transformed digital ecosystems, led interface redesigns, and delivered <a href="/#selected-projects" className="text-primary hover:underline">award-winning work</a> that drives tangible results through performance optimization, accessibility, and responsive design. <a href="mailto:mydeenpitchai.dev@gmail.com" className="text-primary hover:underline">Contact me</a> to discuss your project needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
