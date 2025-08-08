'use client';
import { PROJECTS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { ExternalLink, Calendar, Code, ArrowRight, Sparkles, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectList = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    useGSAP(
        () => {
            // Horizontal scroll animation - starts when cards container touches top navbar
            const horizontalScroll = gsap.to('.project-card', {
                x: () => -(horizontalRef.current?.scrollWidth || 0) + (window.innerWidth - 200),
                ease: 'none',
                scrollTrigger: {
                    trigger: cardsContainerRef.current,
                    start: 'top top+=0', // Start exactly when top of cards container reaches top of viewport
                    end: 'bottom top+=0', // End when bottom of cards container reaches top of viewport
                    scrub: 1,
                    pin: cardsContainerRef.current,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        // Reverse scroll effect - when scrolling back up
                        if (self.direction === -1) {
                            // Cards move back to original position
                            gsap.set('.project-card', {
                                x: self.progress * ((horizontalRef.current?.scrollWidth || 0) - window.innerWidth + 200)
                            });
                        }
                    }
                },
            });

            // Animate section title
            gsap.from('.projects-title', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });

            // Animate project cards with staggered effect
            gsap.from('.project-card', {
                y: 100,
                opacity: 0,
                scale: 0.8,
                stagger: 0.2,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            // Parallax background elements
            gsap.to('.bg-element', {
                y: -100,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            return () => {
                horizontalScroll.kill();
            };
        },
        { scope: containerRef },
    );

    const handleProjectHover = (projectSlug: string) => {
        setHoveredProject(projectSlug);
        // Removed auto-scroll functionality - only manual scrolling now
    };

    const handleProjectLeave = () => {
        setHoveredProject(null);
    };

    return (
        <section id="selected-projects" ref={containerRef} className="relative py-20 overflow-hidden">
            {/* Enhanced Background Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
                <div className="bg-element absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-3xl"></div>
                <div className="bg-element absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-gradient-to-tr from-secondary/30 to-primary/30 rounded-full blur-3xl"></div>
                <div className="bg-element absolute top-[60%] right-[25%] w-[300px] h-[300px] bg-gradient-to-bl from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container relative z-10 max-w-7xl mx-auto px-4">
                {/* Modern Section Header - Fixed */}
                <div className="projects-title text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-xl px-6 py-3 rounded-full border border-primary/20 mb-8">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-primary font-medium text-sm">Featured Work</span>
                        <Sparkles className="w-4 h-4 text-secondary" />
                    </div>
                    <h3 className="text-5xl md:text-7xl font-anton leading-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-4">
                        Latest <span className="text-primary">Projects</span>
                    </h3>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Scroll to top position to explore projects horizontally
                    </p>
                </div>

                {/* Horizontal Scroll Container - This gets pinned */}
                <div ref={cardsContainerRef} className="relative">
                    {/* Scroll Indicator */}
                    <div className="absolute top-4 right-4 z-20">
                        <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-xl rounded-full border border-primary/20">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-xs text-primary font-medium">Scroll to top</span>
                        </div>
                    </div>

                    {/* Horizontal Projects Container */}
                    <div 
                        ref={horizontalRef}
                        className="flex gap-8 lg:gap-12 pb-8 overflow-x-auto scrollbar-hide"
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {PROJECTS.map((project, index) => (
                            <div
                                key={project.slug}
                                data-project={project.slug}
                                className="project-card group relative flex-shrink-0 w-[400px] lg:w-[500px]"
                                style={{ scrollSnapAlign: 'start' }}
                                onMouseEnter={() => handleProjectHover(project.slug)}
                                onMouseLeave={handleProjectLeave}
                            >
                                {/* Modern Card Design */}
                                <div className="relative bg-gradient-to-br from-background/60 to-background/40 backdrop-blur-xl p-8 rounded-3xl border border-border/30 hover:border-primary/30 transition-all duration-500 overflow-hidden h-full">
                                    {/* Animated gradient border */}
                                    <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute inset-0 rounded-3xl bg-background"></div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="relative z-10 h-full flex flex-col">
                                        {/* Enhanced Project Image */}
                                        <div className="relative group/image mb-6">
                                            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                                                <Image
                                                    src={project.thumbnail}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-all duration-700 group-hover/image:scale-110"
                                                    sizes="(max-width: 1024px) 400px, 500px"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                                                
                                                {/* Play overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-500">
                                                    <div className="bg-background/90 backdrop-blur-sm p-4 rounded-full border border-primary/20">
                                                        <Play className="w-6 h-6 text-primary fill-primary" />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Floating tech badges */}
                                            <div className="absolute -top-2 -right-2 flex flex-wrap gap-1 max-w-[60%]">
                                                {project.techStack.slice(0, 3).map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30 backdrop-blur-sm"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Enhanced Project Content */}
                                        <div className="flex-1 space-y-4">
                                            {/* Project Header */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                                                        <Calendar className="w-4 h-4" />
                                                        {project.year}
                                                    </div>
                                                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                                                </div>
                                                
                                                <h4 className="text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors duration-300">
                                                    {project.title}
                                                </h4>
                                            </div>

                                            {/* Enhanced Project Description */}
                                            <div className="space-y-4">
                                                <p className="text-muted-foreground leading-relaxed text-sm">
                                                    {project.description.replace(/<[^>]*>/g, '').slice(0, 120)}...
                                                </p>
                                            </div>

                                            {/* Enhanced Tech Stack */}
                                            <div className="space-y-3">
                                                <h5 className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">Tech Stack</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.techStack.slice(0, 6).map((tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.techStack.length > 6 && (
                                                        <span className="px-2 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded-lg border border-border">
                                                            +{project.techStack.length - 6}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Enhanced Project Links */}
                                            <div className="flex items-center gap-3 pt-4 mt-auto">
                                                {project.liveUrl && project.liveUrl !== 'Internal Project' && project.liveUrl !== 'Internal Project (Unreleased)' && (
                                                    <Link
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/link flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
                                                    >
                                                        <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                                        Live Demo
                                                    </Link>
                                                )}
                                                
                                                <Link
                                                    href={`/projects/${project.slug}`}
                                                    className="group/link flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-foreground/5 to-foreground/10 text-foreground font-medium rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:scale-105"
                                                >
                                                    Details
                                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectList;
