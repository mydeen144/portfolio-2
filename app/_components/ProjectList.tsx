'use client';
import { PROJECTS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import { ExternalLink, Calendar, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectList = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Animate section title
            gsap.from('.projects-title', {
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

            // Animate project cards with staggered effect
            gsap.from('.project-card', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
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
        <section id="selected-projects" ref={containerRef} className="relative py-10">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[200px] h-[200px] bg-primary/30 rounded-3xl rotate-12"></div>
                <div className="absolute bottom-[15%] left-[5%] w-[150px] h-[150px] bg-secondary/30 rounded-full"></div>
                <div className="absolute top-[60%] right-[20%] w-[100px] h-[100px] bg-primary/20 rounded-lg rotate-45"></div>
            </div>

            <div className="container relative z-10">
                {/* Section Header */}
                <div className="projects-title mb-12">
                    <div className="inline-block bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6">
                        <h2 className="text-primary font-medium m-0 p-0 text-base flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Featured Projects
                        </h2>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-anton leading-tight text-foreground">
                        My Latest <span className="text-primary">Work</span>
                    </h3>
                </div>

                {/* Projects Grid */}
                <div className="space-y-8">
                    {PROJECTS.map((project, index) => (
                        <div
                            key={project.slug}
                            className="project-card bg-background/40 backdrop-blur-sm p-8 rounded-2xl border border-border/50 transform hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group"
                        >
                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                            
                            <div className="grid md:grid-cols-12 gap-8 items-center">
                                {/* Project Image */}
                                <div className="md:col-span-5">
                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border/30 group-hover:border-primary/30 transition-colors duration-300">
                                        <Image
                                            src={project.thumbnail}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="md:col-span-7 space-y-6">
                                    {/* Project Header */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                {project.year}
                                            </div>
                                        </div>
                                        <h4 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                                            {project.title}
                                        </h4>
                                    </div>

                                    {/* Project Description */}
                                    <div className="space-y-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                            {project.description.replace(/<[^>]*>/g, '').slice(0, 200)}...
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <h5 className="text-sm font-medium text-muted-foreground mb-3">Technologies Used</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.slice(0, 6).map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 text-xs font-medium bg-secondary/20 text-secondary rounded-full border border-secondary/30"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 6 && (
                                                <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full border border-border">
                                                    +{project.techStack.length - 6} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Project Links */}
                                    <div className="flex items-center gap-4 pt-2">
                                        {project.liveUrl && project.liveUrl !== 'Internal Project' && project.liveUrl !== 'Internal Project (Unreleased)' && (
                                            <Link
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                                            >
                                                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                                View Live Project
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                        </div>
                    ))}
                </div>
                
                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium hover:bg-primary/20 transition-colors cursor-pointer">
                        <Code className="w-5 h-5" />
                        View All Projects
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectList;
