'use client';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Sample blog posts data
const BLOG_POSTS = [
    {
        id: 'laravel-best-practices',
        title: 'Laravel Best Practices for 2024',
        excerpt: 'Discover the latest best practices for Laravel development that will help you build more maintainable and scalable applications.',
        category: 'Laravel',
        date: 'May 15, 2024',
    },
    {
        id: 'tailwind-tips',
        title: 'Advanced Tailwind CSS Tips and Tricks',
        excerpt: 'Learn advanced techniques for using Tailwind CSS to create beautiful, responsive interfaces with less code.',
        category: 'CSS',
        date: 'April 28, 2024',
    },
    {
        id: 'wordpress-performance',
        title: 'Optimizing WordPress Performance',
        excerpt: 'Practical strategies to improve your WordPress site speed and performance for better user experience and SEO.',
        category: 'WordPress',
        date: 'April 10, 2024',
    }
];

const BlogSection = () => {
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

            tl.from('.blog-item', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-16 relative overflow-hidden" id="blog">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-primary/20 blur-[80px]"></div>
                <div className="absolute bottom-[20%] right-[5%] w-[250px] h-[250px] rounded-full bg-secondary/20 blur-[60px]"></div>
            </div>
            
            <div className="container relative z-10" ref={containerRef}>
                {/* Section header */}
                <div className="mb-12 text-center">
                    <div className="inline-block bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-4">
                        <h2 className="text-primary font-medium m-0 p-0 text-base">Blog & Insights</h2>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-anton mb-4">Latest <span className="text-primary">Articles</span></h3>
                    <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
                </div>

                {/* Blog posts grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {BLOG_POSTS.map((post) => (
                        <Link 
                            href={`/blog/${post.id}`} 
                            key={post.id}
                            className="blog-item group block bg-background/40 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{post.title}</h4>
                                <p className="text-muted-foreground text-sm line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-4 inline-flex items-center text-sm text-primary">
                                    <span>Read more</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform duration-300">
                                        <path d="M5 12h14"></path>
                                        <path d="m12 5 7 7-7 7"></path>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View all articles link */}
                <div className="mt-10 text-center">
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-full transition-colors duration-300"
                    >
                        <span>View All Articles</span>
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

export default BlogSection;