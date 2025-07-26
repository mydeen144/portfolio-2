'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const InternalLinks = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
            });

            tl.from('.nav-link', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power2.out',
            });
        },
        { scope: container },
    );

    const navigationLinks = [
        {
            title: 'About Me',
            description: 'Learn about my background and expertise',
            href: '/#about-me',
            icon: '👨‍💻',
        },
        {
            title: 'Skills & Technologies',
            description: 'Explore my technical skills and tools',
            href: '/#my-stack',
            icon: '🛠️',
        },
        {
            title: 'Work Experience',
            description: 'View my professional journey and achievements',
            href: '/#my-experience',
            icon: '💼',
        },
        {
            title: 'Portfolio Projects',
            description: 'Browse my completed projects and case studies',
            href: '/#selected-projects',
            icon: '🚀',
        },
        {
            title: 'Contact Information',
            description: 'Get in touch for collaboration opportunities',
            href: 'mailto:mydeenpitchai.dev@gmail.com',
            icon: '📧',
        },
        {
            title: 'Resume Download',
            description: 'Download my professional resume',
            href: '/resume.pdf',
            icon: '📄',
        },
    ];

    return (
        <section className="py-16 relative overflow-hidden" id="navigation">
            <div className="container relative z-10" ref={container}>
                {/* Section header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-anton mb-4">
                        Explore My <span className="text-primary">Portfolio</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Navigate through different sections to learn more about my skills, experience, and projects
                    </p>
                </div>

                {/* Navigation grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {navigationLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="nav-link group bg-background/40 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                        >
                            <div className="flex items-start gap-4">
                                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                    {link.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                                        {link.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {link.description}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick contact section */}
                <div className="mt-12 text-center">
                    <div className="bg-background/40 backdrop-blur-sm p-8 rounded-2xl border border-primary/20">
                        <h3 className="text-2xl font-anton mb-4">
                            Ready to <span className="text-primary">Collaborate</span>?
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Let's discuss your project requirements and how I can help bring your vision to life
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="mailto:mydeenpitchai.dev@gmail.com"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300"
                            >
                                <span>📧</span>
                                <span>Send Email</span>
                            </Link>
                            <Link
                                href="https://www.upwork.com/freelancers/~011081f8ac162b3abb?mp_source=share"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                            >
                                <span>💼</span>
                                <span>Hire on Upwork</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InternalLinks;