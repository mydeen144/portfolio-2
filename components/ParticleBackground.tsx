'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect, useState, useMemo, useLayoutEffect, useCallback } from 'react';
import { useTheme } from './ThemeProviderSimple';

gsap.registerPlugin(useGSAP);

interface CodeParticle {
    element: HTMLDivElement;
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: 'function' | 'variable' | 'string' | 'number' | 'operator' | 'comment';
    content: string;
    size: number;
    opacity: number;
    life: number;
    maxLife: number;
    isActive: boolean;
}

interface DataFlow {
    from: CodeParticle;
    to: CodeParticle;
    element: SVGPathElement;
    strength: number;
    type: 'function-call' | 'data-transfer' | 'dependency';
}

type DevMode = 'code-flow' | 'data-structures' | 'git-branches' | 'api-endpoints' | 'debug-console';

interface ParticleBackgroundProps {
    mode?: DevMode;
}

const ParticleBackground = ({ mode = 'code-flow' }: ParticleBackgroundProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const { theme } = useTheme();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    
    // Developer particle system state
    const particlesRef = useRef<CodeParticle[]>([]);
    const dataFlowsRef = useRef<DataFlow[]>([]);
    const animationFrameRef = useRef<number>();
    const timeRef = useRef(0);
    
    // Developer constants
    const PARTICLE_COUNT = 20; // Reduced count for lighter feel
    const FLOW_DISTANCE = 100; // Shorter connections
    const MAX_FLOWS = 6; // Fewer connections
    
    // Code syntax elements
    const codeElements = {
        function: ['useState', 'useEffect', 'map', 'filter', 'reduce', 'fetch', 'async', 'await'],
        variable: ['data', 'result', 'config', 'options', 'params', 'response', 'error'],
        string: ['"Hello"', '"API"', '"data"', '"config"', '"error"', '"success"'],
        number: ['0', '1', '2', '3', '42', '100', '200', '404', '500'],
        operator: ['=>', '=', '==', '===', '&&', '||', '?', ':', '...'],
        comment: ['// TODO', '// FIXME', '// NOTE', '/* */', '// API', '// DB']
    };
    
    // Check for low performance devices
    const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
    
    useEffect(() => {
        const isLowPower = window.navigator.userAgent.includes('Mobile') || 
                          window.navigator.userAgent.includes('Android');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (isLowPower || prefersReducedMotion) {
            setIsLowPerformanceMode(true);
        }
    }, []);

    // Mouse interaction handlers
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            setMousePos({ 
                x: e.clientX - rect.left, 
                y: e.clientY - rect.top
            });
        }
    }, []);

    const handleMouseDown = useCallback((e: MouseEvent) => {
        setIsMouseDown(true);
        createCodeExecution(e.clientX, e.clientY);
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsMouseDown(false);
    }, []);

    const handleScroll = useCallback(() => {
        setScrollY(window.scrollY);
    }, []);

    // Add event listeners
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleMouseMove, handleMouseDown, handleMouseUp, handleScroll]);

    // Get particle styling based on type
    const getParticleStyle = (type: CodeParticle['type']) => {
        const baseClasses = 'absolute rounded-md font-mono text-xs font-medium';
        
        switch (type) {
            case 'function':
                return `${baseClasses} bg-blue-500/8 text-blue-400/60 border border-blue-500/15`;
            case 'variable':
                return `${baseClasses} bg-green-500/8 text-green-400/60 border border-green-500/15`;
            case 'string':
                return `${baseClasses} bg-yellow-500/8 text-yellow-400/60 border border-yellow-500/15`;
            case 'number':
                return `${baseClasses} bg-purple-500/8 text-purple-400/60 border border-purple-500/15`;
            case 'operator':
                return `${baseClasses} bg-red-500/8 text-red-400/60 border border-red-500/15`;
            case 'comment':
                return `${baseClasses} bg-gray-500/8 text-gray-400/60 border border-gray-500/15`;
            default:
                return `${baseClasses} bg-primary/8 text-primary/60 border border-primary/15`;
        }
    };

    // Create code execution effect
    const createCodeExecution = (x: number, y: number) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const centerX = x - rect.left;
        const centerY = y - rect.top;
        
        // Create execution particles
        const executionTypes: CodeParticle['type'][] = ['function', 'variable', 'operator'];
        
        for (let i = 0; i < 5; i++) {
            const type = executionTypes[Math.floor(Math.random() * executionTypes.length)];
            const content = codeElements[type][Math.floor(Math.random() * codeElements[type].length)];
            
            const particle = document.createElement('div');
            particle.className = getParticleStyle(type);
            particle.textContent = content;
            particle.style.pointerEvents = 'none';
            containerRef.current?.appendChild(particle);
            
            const particleData: CodeParticle = {
                element: particle,
                x: centerX,
                y: centerY,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                type: type,
                content: content,
                size: content.length * 6 + 12,
                opacity: 1,
                life: 180,
                maxLife: 180,
                isActive: true
            };
            
            particlesRef.current.push(particleData);
            
            gsap.set(particle, {
                width: particleData.size,
                height: 24,
                left: centerX,
                top: centerY,
                opacity: 1,
                scale: 0,
            });
            
            // Animate in
            gsap.to(particle, {
                scale: 1,
                duration: 0.3,
                ease: 'back.out(1.7)',
            });
        }
    };

    // Initialize particle system
    const initializeParticleSystem = useCallback(() => {
        if (!containerRef.current || !svgRef.current) return;
        
        // Clear existing particles and flows
        particlesRef.current.forEach(p => p.element.remove());
        dataFlowsRef.current.forEach(f => f.element.remove());
        particlesRef.current = [];
        dataFlowsRef.current = [];
        
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        
        // Create code particles
        const types: CodeParticle['type'][] = ['function', 'variable', 'string', 'number', 'operator', 'comment'];
        
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            const content = codeElements[type][Math.floor(Math.random() * codeElements[type].length)];
            
            const particle = document.createElement('div');
            particle.className = getParticleStyle(type);
            particle.textContent = content;
            particle.style.pointerEvents = 'none';
            containerRef.current.appendChild(particle);
            
            const particleData: CodeParticle = {
                element: particle,
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.05, // Very slow initial velocity
                vy: (Math.random() - 0.5) * 0.05, // Very slow initial velocity
                type: type,
                content: content,
                size: content.length * 6 + 12,
                opacity: Math.random() * 0.3 + 0.1,
                life: Infinity,
                maxLife: Infinity,
                isActive: true
            };
            
            particlesRef.current.push(particleData);
            
            gsap.set(particle, {
                width: particleData.size,
                height: 24,
                left: particleData.x,
                top: particleData.y,
                opacity: particleData.opacity,
            });
        }
        
        // Create initial data flows
        createDataFlows();
    }, []);

    // Create data flows between particles
    const createDataFlows = useCallback(() => {
        if (!svgRef.current) return;
        
        // Clear existing flows
        dataFlowsRef.current.forEach(f => f.element.remove());
        dataFlowsRef.current = [];
        
        // Create new flows
        for (let i = 0; i < particlesRef.current.length; i++) {
            const from = particlesRef.current[i];
            
            for (let j = i + 1; j < particlesRef.current.length; j++) {
                const to = particlesRef.current[j];
                
                const dx = to.x - from.x;
                const dy = to.y - from.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Create flows based on particle types
                if (distance < FLOW_DISTANCE && dataFlowsRef.current.length < MAX_FLOWS) {
                    let flowType: DataFlow['type'] = 'data-transfer';
                    
                    // Determine flow type based on particle types
                    if (from.type === 'function' && to.type === 'variable') {
                        flowType = 'function-call';
                    } else if (from.type === 'variable' && to.type === 'string') {
                        flowType = 'data-transfer';
                    } else if (from.type === 'function' && to.type === 'function') {
                        flowType = 'dependency';
                    }
                    
                    // Create SVG path
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    const strokeColor = theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(147, 51, 234, 0.15)';
                    path.setAttribute('stroke', strokeColor);
                    path.setAttribute('stroke-width', '1');
                    path.setAttribute('fill', 'none');
                    path.setAttribute('opacity', '0.3');
                    svgRef.current.appendChild(path);
                    
                    const flow: DataFlow = {
                        from: from,
                        to: to,
                        element: path,
                        strength: 1 - (distance / FLOW_DISTANCE),
                        type: flowType
                    };
                    
                    dataFlowsRef.current.push(flow);
                }
            }
        }
    }, [theme]);

    // Update particle physics and flows
    const updatePhysics = useCallback(() => {
        const width = containerRef.current?.offsetWidth || 800;
        const height = containerRef.current?.offsetHeight || 600;
        
        // Update particle physics
        particlesRef.current.forEach((particle, i) => {
            // Mouse interaction
            const dx = mousePos.x - particle.x;
            const dy = mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) { // Reduced interaction distance
                const force = isMouseDown ? -0.0002 : 0.00008; // Very gentle forces
                const strength = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * strength;
                particle.vy += (dy / distance) * force * strength;
            }
            
            // Particle interactions
            particlesRef.current.forEach((other, j) => {
                if (i === j) return;
                
                const dx = other.x - particle.x;
                const dy = other.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 0 && distance < 60) { // Reduced particle interaction distance
                    const force = -0.0001; // Very gentle particle repulsion
                    const strength = (60 - distance) / 60;
                    particle.vx -= (dx / distance) * force * strength;
                    particle.vy -= (dy / distance) * force * strength;
                }
            });
            
            // Apply damping
            particle.vx *= 0.92; // Even stronger damping for very smooth movement
            particle.vy *= 0.92; // Even stronger damping for very smooth movement
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary constraints
            if (particle.x < 0) { particle.x = 0; particle.vx *= -0.5; }
            if (particle.x > width) { particle.x = width; particle.vx *= -0.5; }
            if (particle.y < 0) { particle.y = 0; particle.vy *= -0.5; }
            if (particle.y > height) { particle.y = height; particle.vy *= -0.5; }
            
            // Update life for temporary particles
            if (particle.life < Infinity) {
                particle.life--;
                particle.opacity = particle.life / particle.maxLife;
                
                if (particle.life <= 0) {
                    particle.element.remove();
                    particlesRef.current.splice(i, 1);
                    return;
                }
            }
            
            // Update visual representation
            gsap.set(particle.element, {
                left: particle.x,
                top: particle.y,
                opacity: particle.opacity,
            });
        });
        
        // Update data flows
        dataFlowsRef.current.forEach(flow => {
            const dx = flow.to.x - flow.from.x;
            const dy = flow.to.y - flow.from.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Create curved path
            const midX = (flow.from.x + flow.to.x) / 2;
            const midY = (flow.from.y + flow.to.y) / 2 + Math.sin(timeRef.current * 0.02) * 20;
            
            const pathData = `M ${flow.from.x} ${flow.from.y} Q ${midX} ${midY} ${flow.to.x} ${flow.to.y}`;
            flow.element.setAttribute('d', pathData);
            
            const opacity = Math.max(0, 0.3 * (1 - distance / FLOW_DISTANCE));
            flow.element.setAttribute('opacity', opacity.toString());
        });
        
        // Recreate flows periodically
        if (timeRef.current % 400 === 0) {
            createDataFlows();
        }
    }, [mousePos, isMouseDown, createDataFlows]);

    // Animation loop
    const animate = useCallback(() => {
        timeRef.current++;
        updatePhysics();
        animationFrameRef.current = requestAnimationFrame(animate);
    }, [updatePhysics]);

    // Initialize and start animation
    useEffect(() => {
        initializeParticleSystem();
        animate();
        
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [initializeParticleSystem, animate]);

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            particlesRef.current.forEach(p => p.element.remove());
            dataFlowsRef.current.forEach(f => f.element.remove());
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            style={{ contain: 'strict' }}
        >
            <svg
                ref={svgRef}
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: 'none' }}
            />
        </div>
    );
};

export default ParticleBackground;
