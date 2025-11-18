import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'mydeen144@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Mydeen, I am reaching out to you because...',

    upworkProfile: 'https://www.upwork.com/freelancers/~011081f8ac162b3abb?mp_source=share',
    fiverrrProfile: 'https://www.fiverr.com/amp_works/',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/mydeen144' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/mydeen-pitchai-developer/' },
    { name: 'facebook', url: 'https://www.facebook.com/mydeenpitchai.2000' },
];

export const MY_STACK = {
    'programming languages': [
        {
            name: 'PHP',
            icon: '/logo/php.svg',
        },
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
    ],
    'frameworks & libraries': [
        {
            name: 'Laravel',
            icon: '/logo/laravel.svg',
        },
        {
            name: 'Symfony',
            icon: '/logo/symfony.svg',
        },
        {
            name: 'Phalcon',
            icon: '/logo/phalcon.svg',
        },
        {
            name: 'Alpine.js',
            icon: '/logo/alpinejs.svg',
        },
        {
            name: 'ReactJS',
            icon: '/logo/react.png',
        },
    ],
    'frontend technologies': [
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
    ],
    'cms': [
        {
            name: 'WordPress',
            icon: '/logo/wordpress.svg',
        },
    ],
    'database': [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
    ],
    'devops & tools': [
        {
            name: 'Git & GitHub',
            icon: '/logo/git.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'cPanel',
            icon: '/logo/cpanel.svg',
        },
    ],
    'project management': [
        {
            name: 'Jira',
            icon: '/logo/jira.svg',
        },
        {
            name: 'ClickUp',
            icon: '/logo/clickup.svg',
        },
        {
            name: 'Zoho Projects',
            icon: '/logo/zoho.svg',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Proudify',
        slug: 'proudify',
        liveUrl: 'https://proudify.in',
        year: 2024,
        description: `
      A dynamic platform for generating professional certificates for courses, events, and organizations. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🎨 Customizable Templates: Flexible design options for various certificate needs</li>
        <li>⚡ Instant Downloads: Quick generation and delivery of certificates</li>
        <li>🔐 Google Login: Seamless user access with secure authentication</li>
        <li>📱 Responsive Design: Optimized for all device sizes</li>
        <li>♿ Accessibility: User-friendly interface for users with no technical skills</li>
      </ul>
      `,
        role: `
      Full-Stack Developer at OBII KRIATIONZ WEB LLP <br/>
      Sep 2024 - Present:
      <ul>
        <li>✅ Developed a dynamic platform for generating professional certificates</li>
        <li>🎨 Implemented customizable templates for various certificate needs</li>
        <li>🔄 Integrated Google login for seamless user authentication</li>
        <li>🚀 Focused on responsive design and accessibility for all users</li>
      </ul>
      `,
        techStack: [
            'Laravel',
            'Tailwind CSS',
            'Alpine.js',
            'PHP',
            'MySQL',
            'AJAX',
        ],
        thumbnail: '/projects/images/proudify.webp',
        longThumbnail: '/projects/images/proudify.webp',
        images: [
            '/projects/images/proudify.webp'
        ],
    },
    {
        title: 'Digital Dopamine',
        slug: 'digital-dopamine',
        liveUrl: 'https://digitaldopamine.in',
        year: 2024,
        description: `
      A content-focused blog platform using WordPress for a digital agency. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🎨 Custom Features: Built specialized functionality for content delivery</li>
        <li>⚡ Performance Optimization: Fixed issues affecting site speed and user experience</li>
        <li>📱 Responsive Design: Ensured consistent branding across all device sizes</li>
        <li>🔍 UX Improvements: Optimized page load times for engaging content delivery</li>
      </ul>
      `,
        role: `
      WordPress Developer at OBII KRIATIONZ WEB LLP <br/>
      Aug 2024 - Present:
      <ul>
        <li>✅ Contributed to the development of a content-focused blog platform</li>
        <li>🔧 Built custom features and fixed performance issues</li>
        <li>🎨 Ensured responsive and branded UI across all devices</li>
        <li>🚀 Optimized page load times to support engaging content delivery</li>
      </ul>
      `,
        techStack: [
            'WordPress',
            'PHP',
            'MySQL',
            'CSS',
            'JavaScript',
        ],
        thumbnail: '/projects/images/screencapture-digitaldopamine-in-2025-05-21-11_28_42.png',
        longThumbnail: '/projects/images/screencapture-digitaldopamine-in-2025-05-21-11_28_42.png',
        images: [
            '/projects/images/screencapture-digitaldopamine-in-2025-05-21-11_28_42.png'
        ],
    },
    {
        title: 'ASX (Students Xerox)',
        slug: 'students-xerox',
        liveUrl: 'https://studentsxerox.com',
        year: 2024,
        description: `
      An academic document ordering platform designed to improve efficiency and user interaction. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>📝 Document Ordering: Streamlined system for academic printing services</li>
        <li>⚡ Performance Enhancements: Addressed critical bugs affecting platform performance</li>
        <li>📱 User Experience: Improved ordering flow and customer interactions</li>
        <li>🛠 Backend Stability: Clean, stable architecture for reliable operations</li>
      </ul>
      `,
        role: `
      Full-Stack Developer at OBII KRIATIONZ WEB LLP <br/>
      Jun 2024 - Present:
      <ul>
        <li>✅ Enhanced an academic document ordering platform</li>
        <li>🔧 Developed modules for seamless operations</li>
        <li>🛠 Addressed critical bugs affecting performance</li>
        <li>🚀 Helped grow the platform with clean, stable architecture</li>
      </ul>
      `,
        techStack: [
            'Laravel',
            'Alpine.js',
            'Tailwind CSS',
            'PHP',
            'MySQL',
            'AJAX',
        ],
        thumbnail: '/projects/images/asx.webp',
        longThumbnail: '/projects/images/asx.webp',
        images: [
            '/projects/images/asx.webp'
        ],
    },
    {
        title: 'SevensGround',
        slug: 'sevensground',
        liveUrl: 'Internal Project',
        year: 2025,
        description: `
      A dual-platform system with a Laravel web app and Flutter mobile app. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>📱 Cross-Platform: Synchronized web and mobile experiences</li>
        <li>🛠 Scalable Architecture: Robust backend supporting multiple interfaces</li>
        <li>💾 PostgreSQL Integration: Advanced data storage and retrieval</li>
        <li>👥 Team Collaboration: Coordinated development across multiple components</li>
      </ul>
      `,
        role: `
      Lead Developer at OBII KRIATIONZ WEB LLP <br/>
      Mar 2025 - May 2025:
      <ul>
        <li>✅ Led a team to build a dual-platform system</li>
        <li>📱 Developed both Laravel web app and Flutter mobile app</li>
        <li>🛠 Focused on user-friendly design and scalable architecture</li>
        <li>🚀 Managed team collaboration and version control</li>
      </ul>
      `,
        techStack: [
            'Laravel',
            'Tailwind CSS',
            'Alpine.js',
            'Flutter',
            'PostgreSQL',
            'PHP',
        ],
        thumbnail: '/projects/images/screencapture-sevensground-ae-2025-05-21-11_26_57.png',
        longThumbnail: '/projects/images/screencapture-sevensground-ae-2025-05-21-11_26_57.png',
        images: [
            '/projects/images/screencapture-sevensground-ae-2025-05-21-11_26_57.png'
        ],
    },
    {
        title: 'Interview Node',
        slug: 'interview-node',
        liveUrl: 'Internal Plugin',
        year: 2025,
        description: `
      A custom WordPress plugin for managing courses, workshops, and technical training. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>📝 Course Management: Comprehensive system for educational content</li>
        <li>🔗 REST API Integration: Dynamic scheduling and resource allocation</li>
        <li>🔔 Real-time Notifications: Alerts for workshop delivery and updates</li>
        <li>💾 Optimization: Caching and database performance improvements</li>
      </ul>
      `,
        role: `
      WordPress Plugin Developer at OBII KRIATIONZ WEB LLP <br/>
      Mar 2025 - Apr 2025:
      <ul>
        <li>✅ Built a custom WordPress plugin for educational content management</li>
        <li>🔗 Integrated REST APIs and dynamic scheduling features</li>
        <li>💾 Implemented caching and database optimization</li>
        <li>📱 Developed a responsive admin UI for content management</li>
      </ul>
      `,
        techStack: [
            'WordPress Plugin Dev',
            'PHP',
            'JavaScript',
            'REST API',
            'Cache',
            'Custom Post Types',
        ],
        thumbnail: '/projects/images/screencapture-interviewnode-2025-05-21-11_27_59.png',
        longThumbnail: '/projects/images/screencapture-interviewnode-2025-05-21-11_27_59.png',
        images: [
            '/projects/images/screencapture-interviewnode-2025-05-21-11_27_59.png'
        ],
    },
    {
        title: 'WPBlazer',
        slug: 'wpblazer',
        liveUrl: 'https://wpblazer.com',
        year: 2023,
        description: `
      A comprehensive WordPress management platform with modules for one-click login, user data centralization, and onboarding. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🔑 One-Click Login: Seamless access to managed WordPress sites</li>
        <li>💾 Data Centralization: Unified user information across multiple sites</li>
        <li>💻 Improved System Logic: Enhanced site scalability and reduced setup time</li>
        <li>🚀 Performance Tuning: Optimized speed across managed WordPress sites</li>
      </ul>
      `,
        role: `
      Full-Stack Developer at Touch Logic Technologies <br/>
      Jun 2022 - Jul 2023:
      <ul>
        <li>✅ Enhanced WPBlazer with modules for improved user experience</li>
        <li>💾 Improved system logic to boost site scalability</li>
        <li>⏱ Reduced setup time and increased user retention</li>
        <li>🚀 Supported performance tuning across managed WordPress sites</li>
      </ul>
      `,
        techStack: [
            'Laravel',
            'Symfony',
            'WordPress',
            'AJAX',
            'API Development',
            'PHP',
        ],
        thumbnail: '/projects/images/screencapture-wpblazer-2025-05-21-11_29_35.png',
        longThumbnail: '/projects/images/screencapture-wpblazer-2025-05-21-11_29_35.png',
        images: [
            '/projects/images/screencapture-wpblazer-2025-05-21-11_29_35.png'
        ],
    },
    {
        title: 'ProofBlazer',
        slug: 'proofblazer',
        liveUrl: 'https://proof.blazers.io',
        year: 2023,
        description: `
      A social proof conversion tool for boosting real-time conversion metrics. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>📊 Conversion Metrics: Real-time social proof for increased conversions</li>
        <li>💾 Business Logic: Optimized accuracy and feature adoption</li>
        <li>📱 User Experience: Smooth navigation and intuitive interactions</li>
        <li>🔗 Onboarding: Streamlined setup for new users</li>
      </ul>
      `,
        role: `
      Full-Stack Developer at Touch Logic Technologies <br/>
      Feb 2022 - Apr 2023:
      <ul>
        <li>✅ Developed modules to manage onboarding and boost conversion metrics</li>
        <li>💾 Optimized business logic to ensure accuracy</li>
        <li>📱 Improved overall UX with smooth navigation</li>
        <li>🚀 Enhanced feature adoption through intuitive interactions</li>
      </ul>
      `,
        techStack: [
            'Laravel',
            'JavaScript',
            'HTML',
            'CSS',
            'AJAX',
            'PHP',
        ],
        thumbnail: '/projects/images/screencapture-blazers-io-proofblazer-2025-08-08-21_06_50.png',
        longThumbnail: '/projects/images/screencapture-blazers-io-proofblazer-2025-08-08-21_06_50.png',
        images: [
            '/projects/images/screencapture-blazers-io-proofblazer-2025-08-08-21_06_50.png',
        ],
    },
    {
        title: 'SiteBlazer',
        slug: 'siteblazer',
        liveUrl: 'https://site.blazers.io',
        year: 2022,
        description: `
      An instant website builder enabling users to launch websites in under two minutes. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>⚡ Rapid Deployment: Launch websites in under two minutes</li>
        <li>🛠 Scalable Infrastructure: Support for growing user bases</li>
        <li>📱 User-Friendly Templates: Minimal configuration required</li>
        <li>🚀 Efficient Web Creation: Responsive experience for non-tech users</li>
      </ul>
      `,
        role: `
      Full-Stack Developer at Touch Logic Technologies <br/>
      2022:
      <ul>
        <li>✅ Created a site builder tool for rapid website deployment</li>
        <li>🛠 Integrated scalable infrastructure with user-friendly templates</li>
        <li>📱 Minimized configuration requirements for non-technical users</li>
        <li>🚀 Delivered a responsive and efficient web creation experience</li>
      </ul>
      `,
        techStack: [
            'Laravel',
            'WordPress',
            'Cloud APIs',
            'PHP',
            'JavaScript',
        ],
        thumbnail: '/projects/images/screencapture-blazers-io-siteblazer-2025-08-08-21_02_58.png',
        longThumbnail: '/projects/images/screencapture-blazers-io-siteblazer-2025-08-08-21_02_58.png',
        images: [
            '/projects/images/screencapture-blazers-io-siteblazer-2025-08-08-21_02_58.png',
        ],
    },
    {
        title: 'MonitorBlazer',
        slug: 'monitorblazer',
        liveUrl: 'Internal Project (Unreleased)',
        year: 2022,
        description: `
      A system for real-time monitoring of uptime, speed, and performance of websites. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>📊 Real-Time Monitoring: Track uptime, speed, and performance</li>
        <li>🔔 Alert Systems: Instant notifications for performance issues</li>
        <li>📊 Dashboards: Visualize metrics across WordPress environments</li>
        <li>🛠 Resource Optimization: Focus on stability and efficiency</li>
      </ul>
      `,
        role: `
      Full-Stack Developer at Touch Logic Technologies <br/>
      2022:
      <ul>
        <li>✅ Developed a system for real-time website monitoring</li>
        <li>🔔 Built alert systems and performance dashboards</li>
        <li>📊 Created visualization tools for WordPress environments</li>
        <li>🚀 Focused on stability and resource optimization</li>
      </ul>
      `,
        techStack: [
            'PHP',
            'JavaScript',
            'WordPress',
            'Monitoring APIs',
            'Data Visualization',
        ],
        thumbnail: '/projects/images/screencapture-blazers-io-monitorblazer-2025-08-08-21_09_27.png',
        longThumbnail: '/projects/images/screencapture-blazers-io-monitorblazer-2025-08-08-21_09_27.png',
        images: [
            '/projects/images/screencapture-blazers-io-monitorblazer-2025-08-08-21_09_27.png',
        ],
    },
    {
        title: 'Blazers.io',
        slug: 'blazers-io',
        liveUrl: 'https://accounts.blazers.io',
        year: 2023,
        description: `
      The main product sales page to showcase WPBlazer and related tools. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>📱 Responsive Layouts: Fast load times across all devices</li>
        <li>🔍 SEO-Friendly: Content structures optimized for search engines</li>
        <li>👍 Engagement: Clean UI and smart call-to-actions</li>
        <li>⚡ Performance: Optimized for speed and user experience</li>
      </ul>
      `,
        role: `
      Full-Stack Developer at Touch Logic Technologies <br/>
      Nov 2022 - Feb 2023:
      <ul>
        <li>✅ Designed and built the main product sales page</li>
        <li>📱 Emphasized responsive layouts and fast load times</li>
        <li>🔍 Implemented SEO-friendly content structures</li>
        <li>🚀 Improved engagement through clean UI and performance optimization</li>
      </ul>
      `,
        techStack: [
            'Symfony',
            'Laravel',
            'JavaScript',
            'AJAX',
            'HTML5',
            'CSS3',
        ],
        thumbnail: '/projects/images/screencapture-blazers-io-2025-05-21-11_30_43.png',
        longThumbnail: '/projects/images/screencapture-blazers-io-2025-05-21-11_30_43.png',
        images: [
            '/projects/images/screencapture-blazers-io-2025-05-21-11_30_43.png'
        ],
    },
   
];

export const MY_EXPERIENCE = [
    {
        title: 'Software Developer',
        company: 'OBII KRIATIONZ WEB LLP',
        location: 'Bengaluru, Karnataka, India',
        duration: 'July 2024 - Present',
        description: `
        • Developed high-performance web applications using Laravel, enhancing both user experience and scalability.
        • Led and mentored junior developers, maintaining high-quality coding standards and delivery timelines.
        • Delivered end-to-end projects including Students Xerox (e-commerce platform for academic printing) and Proudify (certificate generation platform).
        • Designed and deployed WordPress solutions for clients like Terrain Flooring, RKM Goa, and Digital Dopamine.
        • Practiced clean coding, rigorous testing, and effective team communication.
        `,
    },
    {
        title: 'Software Developer',
        company: 'In2 Computing India Pvt. Ltd.',
        location: 'Tirunelveli, Tamil Nadu, India',
        duration: 'July 2023 - May 2024',
        description: `
        • Designed and developed software solutions to address various business challenges.
        • Collaborated cross-functionally to resolve integration issues and deliver stable systems.
        `,
    },
    {
        title: 'Software Developer',
        company: 'Touch Logic Technologies',
        location: 'Tirunelveli, Tamil Nadu, India',
        duration: 'May 2022 - July 2023',
        description: `
        • Spearheaded the redesign of WPBlazer, boosting usability and engagement.
        • Developed major modules:
          - SiteBlazer – Quick site deployment tool.
          - ProofBlazer – Content verification workflow.
          - MonitorBlazer – Website monitoring tool (unreleased).
        • Improved client satisfaction through optimized code and feature-rich interfaces.
        `,
    },
    {
        title: 'Web Developer',
        company: 'Techzarinfo Software Solutions',
        location: 'Tiruchirappalli, Tamil Nadu, India',
        duration: 'December 2020 - March 2022',
        description: `
        • Built and maintained responsive websites aligned with client goals.
        • Enhanced application speed and addressed technical issues efficiently.
        `,
    },
    {
        title: 'Junior Web Developer',
        company: 'Techsomo',
        location: 'Tirunelveli, Tamil Nadu, India',
        duration: 'June 2019 - December 2020',
        description: `
        • Assisted in development and deployment of client web projects.
        • Gained foundational experience in frontend/backend integration and user-centric design.
        `,
    },
];
