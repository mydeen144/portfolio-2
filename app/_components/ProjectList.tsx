'use client';
// Import components and utilities
import { PROJECTS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState, MouseEvent } from 'react';
import Project from './Project';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectList = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const projectListRef = useRef<HTMLDivElement>(null);
    const imageContainer = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [selectedProject, setSelectedProject] = useState<string | null>(
        PROJECTS[0].slug,
    );

    // update imageRef.current href based on the cursor hover position
    // also update image position
    useGSAP(
        (context, contextSafe) => {
            // show image on hover
            if (window.innerWidth < 768) {
                setSelectedProject(null);
                return;
            }

            const handleMouseMove = contextSafe?.((e: MouseEvent) => {
                if (!containerRef.current) return;
                if (!imageContainer.current) return;

                if (window.innerWidth < 768) {
                    setSelectedProject(null);
                    return;
                }

                const containerRect =
                    containerRef.current?.getBoundingClientRect();
                const imageRect =
                    imageContainer.current.getBoundingClientRect();
                const offsetTop = e.clientY - containerRect.y;

                // if cursor is outside the container, hide the image
                if (
                    containerRect.y > e.clientY ||
                    containerRect.bottom < e.clientY ||
                    containerRect.x > e.clientX ||
                    containerRect.right < e.clientX
                ) {
                    return gsap.to(imageContainer.current, {
                        duration: 0.3,
                        opacity: 0,
                    });
                }

                gsap.to(imageContainer.current, {
                    y: offsetTop - imageRect.height / 2,
                    duration: 1,
                    opacity: 1,
                });
            }) as any;

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        },
        { scope: containerRef, dependencies: [containerRef.current] },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top 80%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from(containerRef.current, {
                y: 150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    const handleMouseEnter = (slug: string) => {
        if (window.innerWidth < 768) {
            setSelectedProject(null);
            return;
        }

        setSelectedProject(slug);
    };

    return (
        <section className="py-10 relative overflow-hidden" id="selected-projects">
            {/* Premium background elements */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                {/* Animated gradient blobs */}
                <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-[80px] animate-pulse-slow"></div>
                <div className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] rounded-full bg-gradient-to-tr from-secondary/30 to-transparent blur-[60px] animate-pulse-slow animation-delay-1000"></div>
                
                {/* Geometric shapes */}
                <div className="absolute top-[30%] right-[15%] w-[100px] h-[100px] border-2 border-primary/20 rotate-45 animate-float-slow"></div>
                <div className="absolute bottom-[25%] right-[20%] w-[80px] h-[80px] border-2 border-secondary/20 rounded-full animate-float-slow animation-delay-2000"></div>
                <div className="absolute top-[50%] left-[8%] w-[120px] h-[120px] border-2 border-primary/20 rounded-md rotate-12 animate-float-slow animation-delay-1500"></div>
                
                {/* Tech grid lines with animation */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-15">
                    {[...Array(10)].map((_, i) => (
                        <div 
                            key={`h-grid-${i}`} 
                            className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full origin-left"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                    ))}
                </div>
                <div className="absolute inset-0 flex flex-row justify-between opacity-15">
                    {[...Array(10)].map((_, i) => (
                        <div 
                            key={`v-grid-${i}`} 
                            className="w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent origin-top"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                    ))}
                </div>
                
                {/* Code-like pattern */}
                <div className="absolute bottom-0 left-0 right-0 h-[30%] opacity-5">
                    <div className="flex flex-col gap-2 font-mono text-xs">
                        {[...Array(8)].map((_, i) => (
                            <div key={`code-${i}`} className="flex gap-2">
                                <span className="text-primary">const</span>
                                <span className="text-secondary">project{i}</span>
                                <span>=</span>
                                <span className="text-primary">{`{ id: ${i}, title: 'Project ${i}' }`}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            
        </section>
    );
};

export default ProjectList;
