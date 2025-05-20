import TransitionLink from '@/components/TransitionLink';
import { cn } from '@/lib/utils';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';

interface Props {
    index: number;
    project: IProject;
    selectedProject: string | null;
    onMouseEnter: (_slug: string) => void;
}

/*
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link">
    <path id="arrow-line" d="M15 3h6v6"></path>
    <path id="arrow-curb" d="M10 14 21 3"></path>
    <path id="box" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
</svg>

<svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M39.9996 6.18259H10.2846C5.70915 6.18259 2 9.89172 2 14.4672V60.0324C2 64.6079 5.70914 68.317 10.2846 68.317H55.8498C60.4253 68.317 64.1344 64.6079 64.1344 60.0324V24.9401" stroke="#DDDDDD" stroke-width="3.10672" stroke-linecap="round"/>
<rect x="38.2451" y="30.0007" width="40.3874" height="3.10672" rx="1.55336" transform="rotate(-45 38.2451 30.0007)" fill="#DDDDDD"/>
<path d="M58.5561 3.23069L67.9426 1.59357C68.1983 1.54899 68.4231 1.76656 68.387 2.02352L67.0827 11.2992" stroke="#DDDDDD" stroke-width="2.07115" stroke-linecap="round"/>
</svg>

*/

gsap.registerPlugin(useGSAP);

const Project = ({ index, project, selectedProject, onMouseEnter }: Props) => {
    const externalLinkSVGRef = useRef<SVGSVGElement>(null);

    const { context, contextSafe } = useGSAP(() => {}, {
        scope: externalLinkSVGRef,
        revertOnUpdate: true,
    });

    const handleMouseEnter = contextSafe?.(() => {
        onMouseEnter(project.slug);

        const arrowLine = externalLinkSVGRef.current?.querySelector(
            '#arrow-line',
        ) as SVGPathElement;
        const arrowCurb = externalLinkSVGRef.current?.querySelector(
            '#arrow-curb',
        ) as SVGPathElement;
        const box = externalLinkSVGRef.current?.querySelector(
            '#box',
        ) as SVGPathElement;

        gsap.set(box, {
            opacity: 0,
            strokeDasharray: box?.getTotalLength(),
            strokeDashoffset: box?.getTotalLength(),
        });
        gsap.set(arrowLine, {
            opacity: 0,
            strokeDasharray: arrowLine?.getTotalLength(),
            strokeDashoffset: arrowLine?.getTotalLength(),
        });
        gsap.set(arrowCurb, {
            opacity: 0,
            strokeDasharray: arrowCurb?.getTotalLength(),
            strokeDashoffset: arrowCurb?.getTotalLength(),
        });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        tl.to(externalLinkSVGRef.current, {
            autoAlpha: 1,
        })
            .to(box, {
                opacity: 1,
                strokeDashoffset: 0,
            })
            .to(
                arrowLine,
                {
                    opacity: 1,
                    strokeDashoffset: 0,
                },
                '<0.2',
            )
            .to(arrowCurb, {
                opacity: 1,
                strokeDashoffset: 0,
            })
            .to(
                externalLinkSVGRef.current,
                {
                    autoAlpha: 0,
                },
                '+=1',
            );
    });

    const handleMouseLeave = contextSafe?.(() => {
        context.kill();
    });

    return (
        <TransitionLink
            href={`/projects/${project.slug}`}
            className="project-item group relative py-6 md:py-8 px-5 md:border-b first:!pt-0 last:pb-0 last:border-none md:group-hover/projects:opacity-30 md:hover:!opacity-100 transition-all rounded-xl hover:bg-background/40 hover:backdrop-blur-sm hover:border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Premium hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
            
            {/* Project number badge */}
            <div className="absolute -left-3 top-6 size-10 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full flex items-center justify-center font-anton text-primary z-10 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                {(index + 1).toString().padStart(2, '0')}
            </div>
            
            <div className="relative z-10">
                {selectedProject === null && (
                    <div className="relative mb-6 overflow-hidden rounded-lg border border-border/50 group-hover:border-primary/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            width="600"
                            height="400"
                            className={cn(
                                'w-full object-cover aspect-[3/2] object-top transform group-hover:scale-105 transition-all duration-700',
                            )}
                            key={project.slug}
                            loading="lazy"
                        />
                    </div>
                )}
                
                <div className="flex flex-col gap-4">
                    <div className="">
                        <h4 className="text-4xl xs:text-6xl flex items-center gap-4 font-anton transition-all duration-700 bg-gradient-to-r from-primary to-foreground from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left">
                            {project.title}
                            <span className="text-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    ref={externalLinkSVGRef}
                                    className="transform group-hover:rotate-12 transition-all duration-300"
                                >
                                    <path
                                        id="box"
                                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                    ></path>
                                    <path id="arrow-line" d="M10 14 21 3"></path>
                                    <path id="arrow-curb" d="M15 3h6v6"></path>
                                </svg>
                            </span>
                        </h4>
                        
                        {/* Project description */}
                        <p className="text-muted-foreground mt-3 mb-4 max-w-2xl opacity-80 group-hover:opacity-100 transition-all duration-300">
                            {project.description || "A premium web application built with modern technologies and best practices."}
                        </p>
                        
                        {/* Tech stack tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.techStack.map((tech) => (
                                <span 
                                    key={tech} 
                                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md transform group-hover:translate-y-[-2px] transition-all duration-300 hover:bg-primary/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </TransitionLink>
    );
};

export default Project;
