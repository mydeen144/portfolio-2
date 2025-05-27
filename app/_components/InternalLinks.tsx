'use client';
import { PROJECTS } from '@/lib/data';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const InternalLinks = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: 1,
                },
            });

            tl.from('.link-item', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-16 relative overflow-hidden" id="explore-more">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-primary/20 blur-[80px]"></div>
                <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] rounded-full bg-secondary/20 blur-[60px]"></div>
            </div>
            
            <div className="container relative z-10" ref={containerRef}>
                {/* Section header */}
                <div className="mb-12 text-center">
                    <div className="inline-block bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-4">
                        <h2 className="text-primary font-medium m-0 p-0 text-base">Explore More</h2>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-anton mb-4">Discover My <span className="text-primary">Projects</span></h3>
                    <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
                </div>

                {/* Project links grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.slice(0, 6).map((project) => (
                        <Link 
                            href={`/projects/${project.slug}`} 
                            key={project.slug}
                            className="link-item group block bg-background/40 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                    <span className="text-primary text-xl font-bold">{project.slug.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h4>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.techStack.slice(0, 3).map((tech) => (
                                            <span key={tech} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">{tech}</span>
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground text-sm line-clamp-2">
                                        {project.description.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View all projects link */}
                <div className="mt-10 text-center">
                    <Link 
                        href="/#selected-projects" 
                        className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-full transition-colors duration-300"
                    >
                        <span>View All Projects</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default InternalLinks;