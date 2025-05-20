'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_STACK } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Handle image loading errors by displaying a colored div with the first letter of the skill name
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, skillName: string) => {
        const target = e.currentTarget;
        const parent = target.parentElement;
        if (parent) {
            // Create a colored div with the first letter
            const firstLetter = skillName.charAt(0).toUpperCase();
            const colors = ['#FF6B00', '#2684FF', '#8993be', '#FF2D20', '#76C39B', '#77C1D2', '#21759B', '#7B68EE', '#C00'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Hide the image
            target.style.display = 'none';
            
            // Create a fallback element
            const fallback = document.createElement('div');
            fallback.style.width = '40px';
            fallback.style.height = '40px';
            fallback.style.backgroundColor = randomColor;
            fallback.style.borderRadius = '50%';
            fallback.style.display = 'flex';
            fallback.style.justifyContent = 'center';
            fallback.style.alignItems = 'center';
            fallback.style.color = 'white';
            fallback.style.fontWeight = 'bold';
            fallback.style.fontSize = '18px';
            fallback.textContent = firstLetter;
            
            // Add the fallback to the parent
            parent.appendChild(fallback);
        }
    };

    useGSAP(
        () => {
            // Animate section title
            gsap.from('.stack-title', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            // Animate category titles with staggered effect
            gsap.from('.category-title', {
                x: -50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            // Animate skill items with staggered effect
            const categories = containerRef.current?.querySelectorAll('.skill-category');
            categories?.forEach((category) => {
                const skillItems = category.querySelectorAll('.skill-item');
                gsap.from(skillItems, {
                    opacity: 0,
                    y: 20,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: category,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            });

            // Fade out when scrolling away
            gsap.to(containerRef.current, {
                y: -100,
                opacity: 0.5,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 30%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });
        },
        { scope: containerRef },
    );

    return (
        <section id="my-stack" ref={containerRef} className="relative py-10">
            {/* Simplified background with CSS instead of multiple DOM elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Use CSS background for grid instead of DOM elements */}
                <div className="absolute inset-0 opacity-5" 
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, hsl(var(--primary)/30) 1px, transparent 1px),
                            linear-gradient(to bottom, hsl(var(--primary)/30) 1px, transparent 1px)
                        `,
                        backgroundSize: 'calc(100% / 6) calc(100% / 6)'
                    }}>
                </div>
                
                {/* Reduced to just one blob */}
                <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl opacity-30"></div>
            </div>

            <div className="container relative z-10">
                <div className="stack-title mb-8">
                    <SectionTitle title="My Stack" />
                    {/* <p className="text-muted-foreground max-w-2xl mt-4 text-center mx-auto">
                        Proficient in a wide range of modern technologies for building premium digital experiences
                    </p> */}
                </div>

                <div className="space-y-10">
                    {Object.entries(MY_STACK).map(([category, technologies]) => (
                        <div className="skill-category grid sm:grid-cols-12 group" key={category}>
                            <div className="sm:col-span-5 relative">
                                {/* Category title with premium styling */}
                                <div className="category-title relative">
                                    <div className="absolute -left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <p className="text-5xl font-anton leading-none text-muted-foreground uppercase group-hover:text-primary transition-colors duration-300">
                                        {category}
                                    </p>
                                </div>
                            </div>

                            <div className="sm:col-span-7 flex gap-x-11 gap-y-9 flex-wrap">
                                {technologies.map((tech) => (
                                    <div
                                        className="skill-item flex gap-3.5 items-center leading-none group/item relative"
                                        key={tech.name}
                                    >
                                        {/* Simplified icon with hover effects using fewer DOM elements */}
                                        <div className="relative">
                                            {/* Icon container with border and hover effects via CSS */}
                                            <div className="relative z-10 p-1 rounded-full border border-border/30 group-hover/item:border-primary/30 group-hover/item:shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)] transition-all duration-300 bg-background/50 backdrop-blur-sm">
                                                <Image
                                                    src={tech.icon}
                                                    alt={tech.name}
                                                    width="40"
                                                    height="40"
                                                    className="max-h-10 transition-transform duration-300 group-hover/item:scale-110"
                                                    onError={(e) => handleImageError(e, tech.name)}
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Tech name with hover effect */}
                                        <span className="text-2xl capitalize group-hover/item:text-primary transition-colors duration-300 relative after:absolute after:h-px after:bg-gradient-to-r after:from-primary/50 after:to-transparent after:left-0 after:right-0 after:-bottom-2 after:scale-x-0 after:group-hover/item:scale-x-100 after:origin-left after:transition-transform after:duration-300">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
