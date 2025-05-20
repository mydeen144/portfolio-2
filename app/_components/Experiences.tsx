'use client';
import { MY_EXPERIENCE } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 50%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from('.experience-item', {
                y: 50,
                opacity: 0,
                stagger: 0.3,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 50%',
                    end: 'bottom 20%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-10 relative overflow-hidden" id="my-experience">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-primary/20 blur-[80px]"></div>
                <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] rounded-full bg-secondary/20 blur-[60px]"></div>
                
                {/* Tech grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-15">
                    {[...Array(8)].map((_, i) => (
                        <div key={`h-grid-${i}`} className="h-px bg-primary/20 w-full origin-left"></div>
                    ))}
                </div>
                <div className="absolute inset-0 flex flex-row justify-between opacity-15">
                    {[...Array(8)].map((_, i) => (
                        <div key={`v-grid-${i}`} className="w-px h-full bg-primary/20 origin-top"></div>
                    ))}
                </div>
            </div>
            
            <div className="container relative z-10" ref={containerRef}>
                {/* Premium section header */}
                <div className="mb-8">
                    <div className="inline-block bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-4">
                        <span className="text-primary font-medium font-mono tracking-wider">EXPERIENCE</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-anton mb-4">Professional <span className="text-primary">Journey</span></h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary"></div>
                </div>

                <div className="grid gap-8">
                    {MY_EXPERIENCE.map((item, index) => (
                        <div key={item.title} className="experience-item group relative">
                            {/* Timeline connector */}
                            {index < MY_EXPERIENCE.length - 1 && (
                                <div className="absolute left-[22px] top-[50px] bottom-[-50px] w-[2px] bg-gradient-to-b from-primary/30 to-transparent"></div>
                            )}
                            
                            <div className="flex gap-10">
                                {/* Timeline dot */}
                                <div className="relative">
                                    <div className="size-11 rounded-full bg-background flex items-center justify-center border border-primary/30 group-hover:border-primary/60 transition-all duration-300">
                                        <div className="size-5 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-all duration-300"></div>
                                    </div>
                                </div>
                                
                                <div className="flex-1 p-6 rounded-xl bg-background/40 backdrop-blur-sm border border-border/50 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/5 transition-all duration-300">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                        <p className="text-xl text-primary font-medium">
                                            {item.company}
                                        </p>
                                        <p className="text-sm text-muted-foreground bg-background/80 px-3 py-1 rounded-full border border-border/50 inline-flex">
                                            {item.duration}
                                        </p>
                                    </div>
                                    <p className="text-4xl font-anton leading-none mb-4">
                                        {item.title}
                                    </p>
                                    <p className="text-muted-foreground">
                                        Led development of responsive web applications using modern JavaScript frameworks and best practices.
                                    </p>
                                    
                                    {/* Skills tags */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {[
                                            "React", "TypeScript", "Next.js", "Tailwind CSS"
                                        ].map((skill: string) => (
                                            <span key={skill} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
