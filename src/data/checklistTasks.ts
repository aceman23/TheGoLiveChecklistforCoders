export interface ChecklistTask {
  id: string;
  title: string;
  description: string;
  category: 'seo' | 'legal' | 'accessibility' | 'technical';
  aiPrompt: string;
}

export const checklistTasks: ChecklistTask[] = [
  {
    id: 'seo-meta-tags',
    title: 'SEO Meta Tags',
    description: 'Optimized title tags and meta descriptions for every page.',
    category: 'seo',
    aiPrompt: 'Audit all pages in my app and add optimized title tags (50-60 characters) and meta descriptions (150-160 characters) for every route. Include primary keywords naturally and make them compelling for click-through. Show me the implementation in my framework.',
  },
  {
    id: 'seo-og-images',
    title: 'Social Preview (OG) Images',
    description: 'High-quality images for social sharing (1200x630px).',
    category: 'seo',
    aiPrompt: 'Add Open Graph meta tags to all pages for social media sharing. Include og:image (1200x630px), og:title, og:description, og:url, and Twitter Card tags. Generate a template I can reuse across my site.',
  },
  {
    id: 'seo-sitemap',
    title: 'Sitemap & Robots.txt',
    description: 'Automated XML sitemap and crawler instructions.',
    category: 'seo',
    aiPrompt: 'Generate an automated XML sitemap for all my routes and create a robots.txt file with proper crawler directives. Make it dynamic so new pages are automatically included. Show me how to implement this in my framework and where to host the files.',
  },
  {
    id: 'seo-structured-data',
    title: 'Structured Data',
    description: 'Schema.org JSON-LD for rich search results.',
    category: 'seo',
    aiPrompt: 'Add Schema.org JSON-LD structured data to my pages. Include Organization, WebSite, and relevant schemas for my content type (Article, Product, Service, etc.). Make it validate in Google\'s Rich Results Test.',
  },
  {
    id: 'seo-canonical',
    title: 'Canonical Links',
    description: 'Defined preferred URLs to prevent duplicate content.',
    category: 'seo',
    aiPrompt: 'Add canonical link tags to all pages to prevent duplicate content issues. Handle URL parameters, trailing slashes, and www vs non-www consistently. Show me how to implement this dynamically in my framework.',
  },
  {
    id: 'seo-performance',
    title: 'Core Web Vitals',
    description: 'Optimized LCP, FID, and CLS scores for better rankings.',
    category: 'seo',
    aiPrompt: 'Analyze my site for Core Web Vitals. Optimize LCP (Largest Contentful Paint) by lazy-loading images and preloading critical resources. Minimize CLS (Cumulative Layout Shift) by setting image dimensions. Improve FID (First Input Delay) by reducing JavaScript execution time.',
  },
  {
    id: 'legal-terms',
    title: 'Terms of Service',
    description: 'Legal agreement for user interaction.',
    category: 'legal',
    aiPrompt: 'Create a Terms of Service page for my application. Include sections on user responsibilities, acceptable use, intellectual property, limitations of liability, and dispute resolution. Generate a template appropriate for my app type and add a dedicated route for it.',
  },
  {
    id: 'legal-privacy',
    title: 'Privacy Policy',
    description: 'GDPR/CCPA compliant data handling disclosures.',
    category: 'legal',
    aiPrompt: 'Generate a GDPR and CCPA compliant Privacy Policy for my application. Include data collection practices, cookie usage, third-party services, user rights, and data retention policies. Create a dedicated page and add it to my footer navigation.',
  },
  {
    id: 'legal-cookies',
    title: 'Cookie Consent',
    description: 'Proper disclosure and tracking management.',
    category: 'legal',
    aiPrompt: 'Implement a cookie consent banner that complies with GDPR and CCPA. Allow users to accept/reject non-essential cookies. Store consent preferences and only load analytics/tracking scripts after explicit consent. Show me a clean, non-intrusive implementation.',
  },
  {
    id: 'legal-form-feedback',
    title: 'Form Feedback',
    description: 'Clear success/error messaging and validation.',
    category: 'legal',
    aiPrompt: 'Review all forms in my application and ensure they have clear validation, error messages, and success feedback. Add loading states during submission and prevent double-submissions. Make error messages specific and actionable for users.',
  },
  {
    id: 'legal-contact',
    title: 'Contact Information',
    description: 'Accessible contact page and support email address.',
    category: 'legal',
    aiPrompt: 'Create a professional Contact page with multiple contact methods (email, contact form, physical address if applicable). Make it easily accessible from the footer and ensure the email addresses are functional and monitored.',
  },
  {
    id: 'legal-dmca',
    title: 'DMCA Compliance',
    description: 'Copyright takedown process and designated agent.',
    category: 'legal',
    aiPrompt: 'Create a DMCA compliance page with takedown procedures and designated agent contact information. If my app has user-generated content, explain the safe harbor provisions and counter-notice process. Add this to my legal pages.',
  },
  {
    id: 'a11y-wcag',
    title: 'WCAG Compliance',
    description: 'High color contrast and accessible font sizes.',
    category: 'accessibility',
    aiPrompt: 'Audit my site for WCAG 2.1 AA compliance. Check color contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text), ensure readable font sizes (minimum 16px), and fix any accessibility violations. Use tools like axe DevTools or Lighthouse to identify issues.',
  },
  {
    id: 'a11y-aria',
    title: 'ARIA Labels',
    description: 'Proper semantic HTML and screen-reader support.',
    category: 'accessibility',
    aiPrompt: 'Review all interactive elements and add proper ARIA labels where needed. Ensure semantic HTML is used (nav, main, header, footer, article). Add aria-label to icon buttons, aria-describedby for form hints, and role attributes where appropriate. Test with a screen reader.',
  },
  {
    id: 'a11y-responsive',
    title: 'Responsive Design',
    description: 'Fully tested on mobile, tablet, and desktop.',
    category: 'accessibility',
    aiPrompt: 'Test my application on mobile (320px-480px), tablet (768px-1024px), and desktop (1280px+) viewports. Fix any layout issues, ensure touch targets are at least 44x44px, and make sure content is readable at all screen sizes without horizontal scrolling.',
  },
  {
    id: 'a11y-404',
    title: 'Custom 404 Page',
    description: 'A helpful, branded error page to keep users on-site.',
    category: 'accessibility',
    aiPrompt: 'Create a custom 404 error page that matches my brand. Include a friendly message, navigation links back to key pages, and possibly a search function. Make it helpful rather than frustrating. Show me how to set it up in my framework.',
  },
  {
    id: 'a11y-keyboard',
    title: 'Keyboard Navigation',
    description: 'All interactive elements accessible via keyboard.',
    category: 'accessibility',
    aiPrompt: 'Test my entire application using only keyboard navigation (Tab, Shift+Tab, Enter, Space, Arrow keys). Ensure all interactive elements are reachable and functional. Fix any keyboard traps, add proper tabindex where needed, and ensure modals can be closed with Escape.',
  },
  {
    id: 'a11y-focus',
    title: 'Focus Indicators',
    description: 'Clear visual focus states for all interactive elements.',
    category: 'accessibility',
    aiPrompt: 'Add visible focus indicators to all interactive elements (links, buttons, form inputs). Use focus-visible to show focus only for keyboard users. Make focus states clear and high-contrast (e.g., outline or ring with good color contrast). Never use outline: none without a replacement.',
  },
  {
    id: 'tech-ssl',
    title: 'SSL / HTTPS',
    description: 'Secure connection verification.',
    category: 'technical',
    aiPrompt: 'Ensure my site is served over HTTPS with a valid SSL certificate. Set up automatic redirects from HTTP to HTTPS. Add HSTS headers for security. If using a hosting platform, show me how to enable SSL. Check for mixed content warnings.',
  },
  {
    id: 'tech-browsers',
    title: 'Cross-Browser Check',
    description: 'Verification on Chrome, Safari, Firefox, and Edge.',
    category: 'technical',
    aiPrompt: 'Test my application in Chrome, Safari, Firefox, and Edge. Check for browser-specific CSS issues, JavaScript compatibility, and feature support. Add polyfills if needed for older browsers. Use tools like BrowserStack or real devices for testing.',
  },
  {
    id: 'tech-code-hygiene',
    title: 'Code Hygiene',
    description: 'Removal of console.log, dead code, and unused packages.',
    category: 'technical',
    aiPrompt: 'Scan my codebase for console.log statements, commented-out code, unused imports, and dead code. Remove all debugging code. Run a dependency audit to find unused packages and remove them. Set up ESLint rules to prevent console.log in production.',
  },
  {
    id: 'tech-optimization',
    title: 'Asset Optimization',
    description: 'Minified assets and optimized image formats (WebP/AVIF).',
    category: 'technical',
    aiPrompt: 'Optimize all images by converting to WebP or AVIF format with proper fallbacks. Enable code minification and compression in my build process. Set up lazy loading for images below the fold. Add proper caching headers for static assets. Show me the build configuration.',
  },
  {
    id: 'tech-monitoring',
    title: 'Error Monitoring',
    description: 'Production error tracking (Sentry, LogRocket, etc.).',
    category: 'technical',
    aiPrompt: 'Set up error monitoring with Sentry or a similar service. Add error boundaries in React to catch component errors gracefully. Configure source maps for debugging. Set up alerts for critical errors. Include user context in error reports for easier debugging.',
  },
  {
    id: 'tech-backup',
    title: 'Backup Strategy',
    description: 'Automated database backups and disaster recovery plan.',
    category: 'technical',
    aiPrompt: 'Set up automated daily database backups with point-in-time recovery. Store backups in a separate location from the main database. Create a disaster recovery plan with RTO/RPO targets. Test the restore process to ensure backups are functional. Document the recovery procedure.',
  },
];

export const categoryLabels: Record<ChecklistTask['category'], { title: string; icon: string }> = {
  seo: { title: 'SEO & Discoverability', icon: '🔍' },
  legal: { title: 'Legal & Compliance', icon: '⚖️' },
  accessibility: { title: 'Accessibility & UX', icon: '♿' },
  technical: { title: 'Technical Performance', icon: '🛠️' },
};
