import { GENERAL_INFO } from '@/lib/data';
import { ArrowUpRight, Github, GitFork, Linkedin, Mail, Phone, Star } from 'lucide-react';

interface RepoStats {
    stargazers_count: number;
    forks_count: number;
}

const Footer = async () => {
    const repoStats = await fetch(
        'https://api.github.com/repos/mydeen/portfolio-2.0',
        {
            next: {
                revalidate: 60 * 60, // 1 hour
            },
        },
    );

    const { stargazers_count, forks_count } =
        (await repoStats.json()) as RepoStats;

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-20 pb-10 overflow-hidden" id="contact">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-[80px] animate-pulse-slow"></div>
                <div className="absolute bottom-[15%] left-[10%] w-[250px] h-[250px] rounded-full bg-gradient-to-tr from-secondary/30 to-transparent blur-[60px] animate-pulse-slow animation-delay-1000"></div>
                
                {/* Tech grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-15">
                    {[...Array(5)].map((_, i) => (
                        <div key={`h-grid-${i}`} className="h-px bg-primary/20 w-full origin-left"></div>
                    ))}
                </div>
            </div>
            
            {/* Contact section */}
            <div className="container relative z-10 mb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-4 shadow-sm">
                            <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                            <span className="text-primary font-medium font-mono tracking-wider">GET IN TOUCH</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-anton mb-6">Let&apos;s Work <span className="text-primary">Together</span></h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-10">Have a project in mind or want to discuss potential opportunities? I&apos;m always open to new ideas and collaborations.</p>
                    </div>
                    
                    {/* Contact card */}
                    <div className="bg-background/40 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-border/50 shadow-lg relative overflow-hidden">
                        {/* Decorative corner elements */}
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-xl"></div>
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-xl"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/20 rounded-bl-xl"></div>
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-xl"></div>
                        
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl md:text-3xl font-anton mb-4">Ready to bring your <span className="text-primary">ideas to life?</span></h3>
                                <p className="text-muted-foreground mb-6 max-w-md">Whether you need a website, web application, or digital solution, I&apos;m here to help you achieve your goals.</p>
                                
                                <div className="space-y-4">
                                    <a
                                        href={`mailto:${GENERAL_INFO.email}`}
                                        className="group inline-flex items-center gap-2 text-xl font-medium text-primary hover:text-primary/80 transition-all duration-300"
                                    >
                                        <Mail className="size-5" />
                                        {GENERAL_INFO.email}
                                        <ArrowUpRight className="size-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </a>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap justify-center gap-4">
                                <a href="https://github.com/mydeen144" target="_blank" rel="noopener noreferrer" className="size-12 flex items-center justify-center rounded-full bg-background/60 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group">
                                    <Github className="size-5 text-muted-foreground group-hover:text-primary transition-all duration-300" />
                                </a>
                                <a href="https://linkedin.com/in/mydeenpitchai" target="_blank" rel="noopener noreferrer" className="size-12 flex items-center justify-center rounded-full bg-background/60 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group">
                                    <Linkedin className="size-5 text-muted-foreground group-hover:text-primary transition-all duration-300" />
                                </a>
                                <a href="tel:+918807375255" className="size-12 flex items-center justify-center rounded-full bg-background/60 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group">
                                    <Phone className="size-5 text-muted-foreground group-hover:text-primary transition-all duration-300" />
                                </a>
                                <a href="https://wa.me/918807375255" target="_blank" rel="noopener noreferrer" className="size-12 flex items-center justify-center rounded-full bg-background/60 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        className="size-5 text-muted-foreground group-hover:text-primary transition-all duration-300"
                                        fill="currentColor"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer navigation */}
            <div className="container relative z-10 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">About</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/#about-me" className="text-muted-foreground hover:text-primary transition-colors duration-300">About Me</a>
                            </li>
                            <li>
                                <a href="/#my-experience" className="text-muted-foreground hover:text-primary transition-colors duration-300">Experience</a>
                            </li>
                            <li>
                                <a href="/#my-stack" className="text-muted-foreground hover:text-primary transition-colors duration-300">Skills</a>
                            </li>
                            <li>
                                <a href="/#selected-projects" className="text-muted-foreground hover:text-primary transition-colors duration-300">Projects</a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 2: Projects */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Projects</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/projects/proudify" className="text-muted-foreground hover:text-primary transition-colors duration-300">Proudify</a>
                            </li>
                            <li>
                                <a href="/projects/digital-dopamine" className="text-muted-foreground hover:text-primary transition-colors duration-300">Digital Dopamine</a>
                            </li>
                            <li>
                                <a href="/projects/students-xerox" className="text-muted-foreground hover:text-primary transition-colors duration-300">Students Xerox</a>
                            </li>
                            <li>
                                <a href="/projects/wpblazer" className="text-muted-foreground hover:text-primary transition-colors duration-300">WPBlazer</a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 3: Blog */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Blog</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/blog/laravel-best-practices" className="text-muted-foreground hover:text-primary transition-colors duration-300">Laravel Best Practices</a>
                            </li>
                            <li>
                                <a href="/blog/tailwind-tips" className="text-muted-foreground hover:text-primary transition-colors duration-300">Tailwind CSS Tips</a>
                            </li>
                            <li>
                                <a href="/blog/wordpress-performance" className="text-muted-foreground hover:text-primary transition-colors duration-300">WordPress Performance</a>
                            </li>
                            <li>
                                <a href="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-300">All Articles</a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 4: Contact */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href={`mailto:${GENERAL_INFO.email}`} className="text-muted-foreground hover:text-primary transition-colors duration-300">Email Me</a>
                            </li>
                            <li>
                                <a href="https://github.com/mydeen144" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">GitHub</a>
                            </li>
                            <li>
                                <a href="https://linkedin.com/in/mydeenpitchai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">LinkedIn</a>
                            </li>
                            <li>
                                <a href="https://wa.me/918807375255" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">WhatsApp</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Footer bottom */}
            <div className="container relative z-10 border-t border-border/30 pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-muted-foreground text-sm">
                            © {currentYear} <span className="text-foreground font-medium">Mydeen Pitchai</span>. All rights reserved.
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 justify-center md:justify-start">
                            <a href="/sitemap.xml" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300">Sitemap</a>
                            <a href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300">Privacy Policy</a>
                            <a href="/terms-of-service" className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300">Terms of Service</a>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <a
                                href="tel:+918807375255"
                                className="size-10 flex items-center justify-center rounded-full bg-background/60 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
                            >
                                <Phone className="size-4 text-muted-foreground group-hover:text-primary transition-all duration-300" />
                            </a>
                            <a
                                href="https://wa.me/918807375255"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="size-10 flex items-center justify-center rounded-full bg-background/60 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    className="size-4 text-muted-foreground group-hover:text-primary transition-all duration-300"
                                    fill="currentColor"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </a>
                        </div>
                        
                        <a
                            href="https://github.com/mydeen144"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <span>Designed & Built with ❤️</span>
                                <div className="flex items-center gap-3 bg-background/60 px-3 py-1.5 rounded-full border border-border/50 group-hover:border-primary/20 transition-all duration-300">
                                    <span className="flex items-center gap-1">
                                        <Star size={14} className="text-secondary" /> {stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork size={14} className="text-primary" /> {forks_count}
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
