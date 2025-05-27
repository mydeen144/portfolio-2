import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Mydeen Pitchai - Full Stack Developer',
    description: 'Articles and insights about web development, PHP, Laravel, WordPress, and modern front-end technologies.',
};

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
    },
    {
        id: 'php-8-features',
        title: 'Essential PHP 8 Features Every Developer Should Know',
        excerpt: 'Explore the most important features in PHP 8 that can improve your code quality and development efficiency.',
        category: 'PHP',
        date: 'March 22, 2024',
    },
    {
        id: 'alpine-js-guide',
        title: 'Complete Guide to Alpine.js for Laravel Developers',
        excerpt: 'Learn how to use Alpine.js effectively in your Laravel projects to create dynamic interfaces without the complexity of larger frameworks.',
        category: 'JavaScript',
        date: 'March 5, 2024',
    },
    {
        id: 'laravel-deployment',
        title: 'Laravel Deployment Best Practices',
        excerpt: 'A comprehensive guide to deploying Laravel applications in production environments with optimal performance and security.',
        category: 'Laravel',
        date: 'February 18, 2024',
    }
];

export default function BlogPage() {
    return (
        <div className="py-20">
            <div className="container">
                {/* Page header */}
                <div className="mb-16 text-center">
                    <div className="inline-block bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-4">
                        <span className="text-primary font-medium">Blog & Insights</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-anton mb-6">Latest <span className="text-primary">Articles</span></h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Insights and tutorials about web development, PHP, Laravel, WordPress, and modern front-end technologies.
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary mx-auto mt-6"></div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <Link 
                        href="/blog" 
                        className="px-4 py-2 rounded-full bg-primary text-white"
                    >
                        All
                    </Link>
                    {['Laravel', 'WordPress', 'PHP', 'CSS', 'JavaScript'].map((category) => (
                        <Link 
                            key={category}
                            href={`/blog/category/${category.toLowerCase()}`}
                            className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:border-primary/20 hover:bg-primary/10 transition-colors duration-300"
                        >
                            {category}
                        </Link>
                    ))}
                </div>

                {/* Blog posts grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <Link 
                            href={`/blog/${post.id}`} 
                            key={post.id}
                            className="group block bg-background/40 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
                        >
                            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{post.title}</h2>
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

                {/* Back to home */}
                <div className="mt-16 text-center">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-full transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="m12 19-7-7 7-7"></path>
                            <path d="M19 12H5"></path>
                        </svg>
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}