import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Sample blog posts data
const BLOG_POSTS = [
    {
        id: 'laravel-best-practices',
        title: 'Laravel Best Practices for 2024',
        excerpt: 'Discover the latest best practices for Laravel development that will help you build more maintainable and scalable applications.',
        category: 'Laravel',
        date: 'May 15, 2024',
        content: `
            <p>Laravel continues to be one of the most popular PHP frameworks for web application development. As we move through 2024, several best practices have emerged that can help developers build more maintainable, scalable, and efficient Laravel applications.</p>
            
            <h2>1. Use Laravel Sail for Local Development</h2>
            <p>Laravel Sail provides a lightweight command-line interface for interacting with Laravel's default Docker development environment. It makes setting up a consistent development environment across your team much easier.</p>
            
            <h2>2. Implement Repository Pattern</h2>
            <p>The repository pattern creates an abstraction layer between your data access code and business logic. This makes your code more maintainable and testable.</p>
            
            <h2>3. Utilize Laravel's Built-in Features</h2>
            <p>Laravel comes with many powerful features out of the box. Make sure you're taking advantage of:</p>
            <ul>
                <li>Laravel Sanctum for API authentication</li>
                <li>Laravel Telescope for debugging</li>
                <li>Laravel Horizon for queue monitoring</li>
                <li>Laravel Nova for admin panels</li>
            </ul>
            
            <h2>4. Write Comprehensive Tests</h2>
            <p>Testing is crucial for maintaining a healthy codebase. Laravel makes testing easy with PHPUnit integration. Aim for high test coverage, especially for critical business logic.</p>
            
            <h2>5. Use Laravel's Queue System</h2>
            <p>For time-consuming tasks like sending emails or processing large datasets, use Laravel's queue system to improve application performance and user experience.</p>
            
            <h2>Conclusion</h2>
            <p>By following these best practices, you can build Laravel applications that are not only powerful but also maintainable and scalable. The Laravel ecosystem continues to evolve, so staying up-to-date with the latest tools and techniques is essential for any Laravel developer.</p>
        `,
        relatedPosts: ['php-8-features', 'laravel-deployment', 'tailwind-tips']
    },
    {
        id: 'tailwind-tips',
        title: 'Advanced Tailwind CSS Tips and Tricks',
        excerpt: 'Learn advanced techniques for using Tailwind CSS to create beautiful, responsive interfaces with less code.',
        category: 'CSS',
        date: 'April 28, 2024',
        content: `
            <p>Tailwind CSS has revolutionized the way developers approach styling web applications. Here are some advanced tips and tricks to take your Tailwind skills to the next level.</p>
            
            <h2>1. Custom Variants</h2>
            <p>Tailwind allows you to create custom variants for specific use cases. This is particularly useful for complex interactive components.</p>
            
            <h2>2. Component Extraction</h2>
            <p>While Tailwind encourages utility-first CSS, extracting common patterns into components can help maintain consistency and reduce duplication.</p>
            
            <h2>3. Advanced Responsive Design</h2>
            <p>Go beyond the basic responsive classes by combining them with container queries and custom breakpoints for truly adaptive interfaces.</p>
            
            <h2>4. Performance Optimization</h2>
            <p>Learn how to optimize your Tailwind setup for production, including proper purging of unused styles and minimizing your CSS bundle size.</p>
            
            <h2>5. Theme Customization</h2>
            <p>Leverage Tailwind's powerful theming system to create consistent design systems that can be easily maintained and updated.</p>
            
            <h2>Conclusion</h2>
            <p>Tailwind CSS continues to evolve, offering more powerful features with each release. By mastering these advanced techniques, you can create more efficient, maintainable, and beautiful user interfaces.</p>
        `,
        relatedPosts: ['wordpress-performance', 'alpine-js-guide', 'laravel-best-practices']
    },
    {
        id: 'wordpress-performance',
        title: 'Optimizing WordPress Performance',
        excerpt: 'Practical strategies to improve your WordPress site speed and performance for better user experience and SEO.',
        category: 'WordPress',
        date: 'April 10, 2024',
        content: `
            <p>WordPress powers over 40% of all websites, but without proper optimization, WordPress sites can become slow and unresponsive. Here are practical strategies to improve your WordPress site's performance.</p>
            
            <h2>1. Choose a Quality Hosting Provider</h2>
            <p>Your hosting environment is the foundation of your site's performance. Invest in quality WordPress-specific hosting that offers good server resources and optimization.</p>
            
            <h2>2. Implement Caching</h2>
            <p>Caching creates static versions of your dynamic content, significantly reducing server load and improving page load times. Use plugins like WP Rocket or W3 Total Cache.</p>
            
            <h2>3. Optimize Images</h2>
            <p>Images often account for the majority of a page's weight. Compress and properly size images before uploading, and consider lazy loading for images below the fold.</p>
            
            <h2>4. Minimize Plugin Usage</h2>
            <p>Each plugin adds code that needs to be loaded, potentially slowing down your site. Regularly audit your plugins and remove any that aren't essential.</p>
            
            <h2>5. Use a Content Delivery Network (CDN)</h2>
            <p>A CDN distributes your static content across multiple servers worldwide, reducing latency and improving load times for visitors regardless of their location.</p>
            
            <h2>Conclusion</h2>
            <p>Optimizing WordPress performance is an ongoing process. Regularly test your site's speed using tools like Google PageSpeed Insights and GTmetrix, and make adjustments as needed to ensure your site provides the best possible user experience.</p>
        `,
        relatedPosts: ['php-8-features', 'tailwind-tips', 'laravel-deployment']
    }
];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const post = BLOG_POSTS.find(post => post.id === id);
    
    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.'
        };
    }
    
    return {
        title: `${post.title} | Mydeen Pitchai Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: ['Mydeen Pitchai'],
            tags: [post.category, 'Web Development', 'Programming'],
        },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = BLOG_POSTS.find(post => post.id === id);
    
    if (!post) {
        notFound();
    }
    
    // Find related posts
    const relatedPosts = post.relatedPosts 
        ? BLOG_POSTS.filter(p => post.relatedPosts?.includes(p.id))
        : [];
    
    return (
        <div className="py-20">
            <div className="container max-w-4xl">
                {/* Category badge */}
                <div className="mb-4">
                    <Link 
                        href={`/blog/category/${post.category.toLowerCase()}`}
                        className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                        {post.category}
                    </Link>
                </div>
                
                {/* Post header */}
                <h1 className="text-3xl md:text-5xl font-anton mb-4">{post.title}</h1>
                
                {/* Post meta */}
                <div className="flex items-center text-muted-foreground mb-8">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>By Mydeen Pitchai</span>
                </div>
                
                {/* Featured image */}
                <div className="w-full h-[300px] md:h-[400px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-8"></div>
                
                {/* Post content */}
                <div 
                    className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-anton prose-headings:text-primary prose-a:text-primary"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-muted-foreground">Tags:</span>
                        {[post.category, 'Web Development', 'Programming'].map(tag => (
                            <Link 
                                key={tag}
                                href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
                                className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs border border-border hover:border-primary/20 hover:bg-primary/10 transition-colors duration-300"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
                
                {/* Related posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-anton mb-6">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map(relatedPost => (
                                <Link 
                                    href={`/blog/${relatedPost.id}`} 
                                    key={relatedPost.id}
                                    className="group block bg-background/40 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 overflow-hidden"
                                >
                                    <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 relative">
                                        <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-medium text-primary">
                                            {relatedPost.category}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">{relatedPost.title}</h3>
                                        <p className="text-muted-foreground text-xs">{relatedPost.date}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Back to blog */}
                <div className="mt-16 flex justify-between">
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="m12 19-7-7 7-7"></path>
                            <path d="M19 12H5"></path>
                        </svg>
                        <span>Back to Blog</span>
                    </Link>
                    
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full transition-colors duration-300"
                    >
                        <span>Home</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}