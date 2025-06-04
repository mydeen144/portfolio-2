'use client';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { MoveUpRight, Mail, Moon, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import Link from 'next/link';
import { useTheme } from './ThemeProviderSimple';

// Using theme colors from globals.css for better theme matching
const COLORS = [
    'bg-secondary text-primary-foreground',  // Rich gold
    'bg-primary text-white',                 // Deep navy
    'bg-accent text-accent-foreground',      // Gold accent
    'bg-primary-light text-white',           // Navy variant
];

const MENU_LINKS = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'About Me',
        url: '/#about-me',
    },
    {
        name: 'Experience',
        url: '/#my-experience',
    },
    {
        name: 'Projects',
        url: '/#selected-projects',
    },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle menu item click with smooth scrolling
    const handleNavigation = (url: string) => {
        setIsMenuOpen(false);
        
        // If it's a hash link, handle smooth scrolling
        if (url.includes('#') && url !== '/#') {
            const element = document.querySelector(url.split('#')[1]);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        }
        
        router.push(url);
    };

    return (
        <>
            {/* Main Navbar - Minimal and elegant */}
            <header 
                className={cn(
                    "fixed top-0 left-0 right-0 z-[40] transition-all duration-500",
                    scrolled 
                        ? "bg-background/90 backdrop-blur-md border-b border-border/30 py-3" 
                        : "py-5"
                )}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo/Brand */}
                    <Link 
                        href="/" 
                        className="font-bold text-xl text-foreground hover:text-secondary transition-colors duration-300"
                    >
                        <span className="sr-only">Mydeen Pitchai - Full Stack Developer</span>
                        {/* Portfolio */}
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="size-10 flex items-center justify-center rounded-full bg-background/60 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <Sun className="h-5 w-5 text-primary" />
                            ) : (
                                <Moon className="h-5 w-5 text-primary" />
                            )}
                        </button>
                        
                        {/* Menu Toggle Button - Hamburger style matching original */}
                        <button
                            className="group size-12 relative z-[50] flex items-center justify-center"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span
                                className={cn(
                                    'inline-block w-7 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-[5px]',
                                    {
                                        'rotate-45 -translate-y-1/2': isMenuOpen,
                                        'group-hover:rotate-12': !isMenuOpen,
                                    },
                                )}
                            ></span>
                            <span
                                className={cn(
                                    'inline-block w-7 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-[5px]',
                                    {
                                        '-rotate-45 -translate-y-1/2': isMenuOpen,
                                        'group-hover:-rotate-12': !isMenuOpen,
                                    },
                                )}
                            ></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Overlay - Dark with slight blur */}
            <div
                className={cn(
                    'fixed inset-0 z-[45] bg-black/70 backdrop-blur-sm transition-all duration-300',
                    {
                        'opacity-100 visible': isMenuOpen,
                        'opacity-0 invisible pointer-events-none': !isMenuOpen,
                    },
                )}
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Menu Panel - Matching the luxury theme */}
            <aside
                className={cn(
                    'fixed top-0 right-0 h-[100dvh] w-[500px] max-w-[calc(100vw-3rem)] bg-card z-[50]',
                    'transform transition-transform duration-700 ease-in-out overflow-hidden',
                    'flex flex-col py-20 px-8 sm:px-12',
                    isMenuOpen 
                        ? 'translate-x-0 shadow-2xl' 
                        : 'translate-x-full'
                )}
                aria-hidden={!isMenuOpen}
            >
                {/* Close button - X style matching original */}
                <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 z-10 size-10 flex items-center justify-center"
                    aria-label="Close menu"
                >
                    <span className="inline-block w-5 h-0.5 bg-foreground rounded-full absolute rotate-45"></span>
                    <span className="inline-block w-5 h-0.5 bg-foreground rounded-full absolute -rotate-45"></span>
                </button>

                {/* Background animation element - Circular reveal */}
                <div
                    className={cn(
                        'fixed inset-0 scale-150 translate-x-1/2 rounded-[50%] bg-card duration-700 delay-150 z-[-1]',
                        {
                            'translate-x-0': isMenuOpen,
                        },
                    )}
                />

                {/* Menu Content - Two column layout */}
                <div className="grow flex md:items-center w-full max-w-[300px] mx-auto">
                    <div className="flex gap-10 lg:justify-between max-lg:flex-col w-full">
                        {/* Menu Links */}
                        <div className="">
                            <h2 className="text-muted-foreground mb-5 md:mb-8 text-sm font-medium uppercase">
                                Menu
                            </h2>
                            <nav aria-label="Main navigation">
                                <ul className="space-y-3">
                                    {MENU_LINKS.map((link, idx) => (
                                        <li key={link.name}>
                                            <button
                                                onClick={() => handleNavigation(link.url)}
                                                className="group text-xl flex items-center gap-3 text-foreground hover:text-secondary transition-colors duration-300"
                                            >
                                                <span
                                                    className={cn(
                                                        'size-3.5 rounded-full flex items-center justify-center group-hover:scale-[200%] transition-all duration-500',
                                                        COLORS[idx % COLORS.length],
                                                    )}
                                                >
                                                    <MoveUpRight
                                                        size={8}
                                                        className="scale-0 group-hover:scale-100 transition-all duration-300"
                                                    />
                                                </span>
                                                {link.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Social Links */}
                        <div className="max-lg:order-2">
                            <h2 className="text-muted-foreground mb-5 md:mb-8 text-sm font-medium uppercase">
                                Social
                            </h2>
                            <ul className="space-y-3">
                                {SOCIAL_LINKS.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-lg capitalize hover:underline text-foreground hover:text-secondary transition-colors duration-300"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="w-full max-w-[300px] mx-auto mt-10">
                    <h2 className="text-muted-foreground mb-4 text-sm font-medium uppercase">Get In Touch</h2>
                    <div className="flex flex-col space-y-3">
                        <a 
                            href={`mailto:${GENERAL_INFO.email}`} 
                            className="group flex items-center gap-2 text-foreground hover:text-secondary transition-colors duration-300"
                        >
                            <Mail size={16} className="group-hover:animate-pulse" />
                            <span>{GENERAL_INFO.email}</span>
                        </a>
                        <div className="flex gap-4 mt-2">
                            <a 
                                href={GENERAL_INFO.upworkProfile}
                                target="_blank"
                                rel="noreferrer"
                                className="text-foreground hover:text-secondary transition-colors duration-300"
                            >
                                Upwork
                            </a>
                            <a 
                                href={GENERAL_INFO.fiverrrProfile}
                                target="_blank"
                                rel="noreferrer"
                                className="text-foreground hover:text-secondary transition-colors duration-300"
                            >
                                Fiverr
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
