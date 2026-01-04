export interface ChecklistTask {
  id: string;
  title: string;
  description: string;
  category: 'seo' | 'legal' | 'accessibility' | 'technical';
}

export const checklistTasks: ChecklistTask[] = [
  {
    id: 'seo-meta-tags',
    title: 'SEO Meta Tags',
    description: 'Optimized title tags and meta descriptions for every page.',
    category: 'seo',
  },
  {
    id: 'seo-og-images',
    title: 'Social Preview (OG) Images',
    description: 'High-quality images for social sharing (1200x630px).',
    category: 'seo',
  },
  {
    id: 'seo-sitemap',
    title: 'Sitemap & Robots.txt',
    description: 'Automated XML sitemap and crawler instructions.',
    category: 'seo',
  },
  {
    id: 'seo-structured-data',
    title: 'Structured Data',
    description: 'Schema.org JSON-LD for rich search results.',
    category: 'seo',
  },
  {
    id: 'seo-canonical',
    title: 'Canonical Links',
    description: 'Defined preferred URLs to prevent duplicate content.',
    category: 'seo',
  },
  {
    id: 'seo-performance',
    title: 'Core Web Vitals',
    description: 'Optimized LCP, FID, and CLS scores for better rankings.',
    category: 'seo',
  },
  {
    id: 'legal-terms',
    title: 'Terms of Service',
    description: 'Legal agreement for user interaction.',
    category: 'legal',
  },
  {
    id: 'legal-privacy',
    title: 'Privacy Policy',
    description: 'GDPR/CCPA compliant data handling disclosures.',
    category: 'legal',
  },
  {
    id: 'legal-cookies',
    title: 'Cookie Consent',
    description: 'Proper disclosure and tracking management.',
    category: 'legal',
  },
  {
    id: 'legal-form-feedback',
    title: 'Form Feedback',
    description: 'Clear success/error messaging and validation.',
    category: 'legal',
  },
  {
    id: 'legal-contact',
    title: 'Contact Information',
    description: 'Accessible contact page and support email address.',
    category: 'legal',
  },
  {
    id: 'legal-dmca',
    title: 'DMCA Compliance',
    description: 'Copyright takedown process and designated agent.',
    category: 'legal',
  },
  {
    id: 'a11y-wcag',
    title: 'WCAG Compliance',
    description: 'High color contrast and accessible font sizes.',
    category: 'accessibility',
  },
  {
    id: 'a11y-aria',
    title: 'ARIA Labels',
    description: 'Proper semantic HTML and screen-reader support.',
    category: 'accessibility',
  },
  {
    id: 'a11y-responsive',
    title: 'Responsive Design',
    description: 'Fully tested on mobile, tablet, and desktop.',
    category: 'accessibility',
  },
  {
    id: 'a11y-404',
    title: 'Custom 404 Page',
    description: 'A helpful, branded error page to keep users on-site.',
    category: 'accessibility',
  },
  {
    id: 'a11y-keyboard',
    title: 'Keyboard Navigation',
    description: 'All interactive elements accessible via keyboard.',
    category: 'accessibility',
  },
  {
    id: 'a11y-focus',
    title: 'Focus Indicators',
    description: 'Clear visual focus states for all interactive elements.',
    category: 'accessibility',
  },
  {
    id: 'tech-ssl',
    title: 'SSL / HTTPS',
    description: 'Secure connection verification.',
    category: 'technical',
  },
  {
    id: 'tech-browsers',
    title: 'Cross-Browser Check',
    description: 'Verification on Chrome, Safari, Firefox, and Edge.',
    category: 'technical',
  },
  {
    id: 'tech-code-hygiene',
    title: 'Code Hygiene',
    description: 'Removal of console.log, dead code, and unused packages.',
    category: 'technical',
  },
  {
    id: 'tech-optimization',
    title: 'Asset Optimization',
    description: 'Minified assets and optimized image formats (WebP/AVIF).',
    category: 'technical',
  },
  {
    id: 'tech-monitoring',
    title: 'Error Monitoring',
    description: 'Production error tracking (Sentry, LogRocket, etc.).',
    category: 'technical',
  },
  {
    id: 'tech-backup',
    title: 'Backup Strategy',
    description: 'Automated database backups and disaster recovery plan.',
    category: 'technical',
  },
];

export const categoryLabels: Record<ChecklistTask['category'], { title: string; icon: string }> = {
  seo: { title: 'SEO & Discoverability', icon: '🔍' },
  legal: { title: 'Legal & Compliance', icon: '⚖️' },
  accessibility: { title: 'Accessibility & UX', icon: '♿' },
  technical: { title: 'Technical Performance', icon: '🛠️' },
};
