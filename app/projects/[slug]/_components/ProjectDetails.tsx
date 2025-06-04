'use client';
import parse from 'html-react-parser';
import TransitionLink from '@/components/TransitionLink';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft, Calendar, Code2, ExternalLink, Github, Globe } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

interface Props {
    project: IProject;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectDetails = ({ project }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.set('.fade-in-later', {
                autoAlpha: 0,
                y: 30,
            });
            const tl = gsap.timeline({
                delay: 0.8,
            });

            tl.to('.fade-in-later', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.15,
                duration: 1,
                ease: 'power2.out'
            });
        },
        { scope: containerRef },
    );

    // blur info div and make it smaller on scroll
    useGSAP(
        () => {
            if (window.innerWidth < 992) return;

            gsap.to('#info', {
                filter: 'blur(3px)',
                autoAlpha: 0,
                scale: 0.9,
                // position: 'sticky',
                scrollTrigger: {
                    trigger: '#info',
                    start: 'bottom bottom',
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: false,
                    scrub: 1.5,
                },
            });
        },
        { scope: containerRef },
    );



    return (
        <section className="py-16 md:py-24">
            <div className="container max-w-7xl mx-auto px-4" ref={containerRef}>
                <TransitionLink
                    back
                    href="/"
                    className="mb-16 inline-flex gap-2 items-center group h-12 hover:text-primary transition-all duration-300"
                >
                    <ArrowLeft className="group-hover:-translate-x-2 transition-all duration-300" />
                    <span className="text-lg">Back to Projects</span>
                </TransitionLink>

                <div className="grid md:grid-cols-[2fr,1fr] gap-12 lg:gap-20 mb-24" id="info">
                    <div className="order-2 md:order-1">
                        <div className="fade-in-later opacity-0 space-y-6">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-anton leading-tight">
                                {project.title}
                            </h1>
                            
                            <div className="text-lg prose-xl markdown-text text-muted-foreground">
                                {parse(project.description)}
                            </div>

                            {project.role && (
                                <div>
                                    <h3 className="text-xl font-anton mb-3">My Role</h3>
                                    <div className="text-lg text-muted-foreground">
                                        {parse(project.role)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <div className="sticky top-24 fade-in-later opacity-0">
                            <div className="bg-background-light/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-background-light/50">
                                <div className="p-6 space-y-8">
                                    <div>
                                        <h3 className="font-anton text-lg mb-4">Project Details</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-lg bg-background/50 flex items-center justify-center">
                                                    <Calendar size={20} className="text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Year</p>
                                                    <p className="font-medium">{project.year}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="size-10 rounded-lg bg-background/50 flex items-center justify-center">
                                                        <Code2 size={20} className="text-primary" />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">Tech Stack</p>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.techStack.map((tech) => (
                                                        <span 
                                                            key={tech} 
                                                            className="px-3 py-1.5 bg-background/50 hover:bg-background rounded-lg text-sm transition-colors duration-300"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-anton text-lg">Links</h3>
                                        <div className="flex flex-col gap-3">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="inline-flex items-center gap-3 px-4 py-3 bg-primary/10 hover:bg-primary/90 hover:text-primary-foreground text-primary rounded-xl transition-all duration-300 group"
                                                >
                                                    <div className="size-10 rounded-lg bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center transition-colors duration-300">
                                                        <Globe size={20} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium">Live Demo</p>
                                                        <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-300">View the live project</p>
                                                    </div>
                                                </a>
                                            )}
                                            {project.sourceCode && (
                                                <a
                                                    href={project.sourceCode}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="inline-flex items-center gap-3 px-4 py-3 bg-background/50 hover:bg-background rounded-xl transition-all duration-300 group"
                                                >
                                                    <div className="size-10 rounded-lg bg-background flex items-center justify-center">
                                                        <Github size={20} className="group-hover:text-primary transition-colors duration-300" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium">Source Code</p>
                                                        <p className="text-sm text-muted-foreground">View on GitHub</p>
                                                    </div>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8 fade-in-later opacity-0" id="images">
                    {project.images.map((image) => (
                        <div
                            key={image}
                            className="group relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-background-light hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-full h-full overflow-hidden">
                                <Image 
                                    src={image}
                                    alt={`${project.title} project screenshot`}
                                    fill
                                    className="object-cover animate-none group-hover:animate-slowScroll"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px"
                                    priority={true}
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="flex items-center gap-2 px-4 py-2 bg-primary/90 hover:bg-primary text-primary-foreground rounded-lg transition-all duration-300"
                                            title="Visit Live Site"
                                        >
                                            <Globe size={20} />
                                            <span>Visit Site</span>
                                        </a>
                                    )}
                                    <a
                                        href={image}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="flex items-center gap-2 px-4 py-2 bg-background/90 hover:bg-background text-foreground rounded-lg transition-all duration-300"
                                        title="View Full Image"
                                    >
                                        <ExternalLink size={20} />
                                        <span>Full Image</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectDetails;
