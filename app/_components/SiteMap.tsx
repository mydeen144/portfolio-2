'use client';
import Link from 'next/link';
import { PROJECTS, MY_STACK } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SiteMap = () => {
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

            tl.from('.sitemap-section', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-16 relative overflow-hidden bg-background/50" id="site-map">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
                <div className="absolute inset-0" 
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, hsl(var(--primary)/30) 1px, transparent 1px),
                            linear-gradient(to bottom, hsl(var(--primary)/30) 1px, transparent 1px)
                        `,
                        backgroundSize: 'calc(100% / 10) calc(100% / 10)'
                    }}>
                </div>
            </div>
            
            <div className="container relative z-10" ref={containerRef}>
                {/* Section header */}
                <div className="mb-12 text-center">
                    <div className="inline-block bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-4">
                        <h2 className="text-primary font-medium m-0 p-0 text-base">Site Map</h2>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-anton mb-4">Explore <span className="text-primary">My Website</span></h3>
                    <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
                </div>

                {/* Site map grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Main Navigation */}
                    <div className="sitemap-section">
                        <h4 className="text-xl font-bold mb-4 pb-2 border-b border-border">Main Navigation</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-foreground hover:text-primary transition-colors duration-300">Home</Link>
                            </li>
                            <li>
                                <Link href="/#about-me" className="text-foreground hover:text-primary transition-colors duration-300">About Me</Link>
                            </li>
                            <li>
                                <Link href="/#my-stack" className="text-foreground hover:text-primary transition-colors duration-300">Skills</Link>
                            </li>
                            <li>
                                <Link href="/#my-experience" className="text-foreground hover:text-primary transition-colors duration-300">Experience</Link>
                            </li>
                            <li>
                                <Link href="/#selected-projects" className="text-foreground hover:text-primary transition-colors duration-300">Projects</Link>
                            </li>
                            <li>
                                <Link href="/#blog" className="text-foreground hover:text-primary transition-colors duration-300">Blog</Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="text-foreground hover:text-primary transition-colors duration-300">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Projects */}
                    <div className="sitemap-section">
                        <h4 className="text-xl font-bold mb-4 pb-2 border-b border-border">Featured Projects</h4>
                        <ul className="space-y-2">
                            {PROJECTS.slice(0, 5).map((project) => (
                                <li key={project.slug}>
                                    <Link href={`/projects/${project.slug}`} className="text-foreground hover:text-primary transition-colors duration-300">
                                        {project.title}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href="/#selected-projects" className="text-primary hover:underline transition-colors duration-300">
                                    View All Projects →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Skills */}
                    <div className="sitemap-section">
                        <h4 className="text-xl font-bold mb-4 pb-2 border-b border-border">Skills & Technologies</h4>
                        <ul className="space-y-2">
                            {Object.keys(MY_STACK).slice(0, 5).map((category) => (
                                <li key={category}>
                                    <Link href={`/#my-stack`} className="text-foreground hover:text-primary transition-colors duration-300">
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href="/#my-stack" className="text-primary hover:underline transition-colors duration-300">
                                    View All Skills →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Blog */}
                    <div className="sitemap-section">
                        <h4 className="text-xl font-bold mb-4 pb-2 border-b border-border">Blog Categories</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/blog/category/laravel" className="text-foreground hover:text-primary transition-colors duration-300">
                                    Laravel
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/category/wordpress" className="text-foreground hover:text-primary transition-colors duration-300">
                                    WordPress
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/category/tailwind" className="text-foreground hover:text-primary transition-colors duration-300">
                                    Tailwind CSS
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/category/php" className="text-foreground hover:text-primary transition-colors duration-300">
                                    PHP
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog/category/javascript" className="text-foreground hover:text-primary transition-colors duration-300">
                                    JavaScript
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-primary hover:underline transition-colors duration-300">
                                    View All Articles →
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SiteMap;