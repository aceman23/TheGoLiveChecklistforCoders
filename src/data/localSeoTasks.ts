export interface LocalSEOTask {
  id: string;
  title: string;
  description: string;
  category: 'website' | 'gbp' | 'content' | 'citations' | 'reviews' | 'links';
}

export const localSeoTasks: LocalSEOTask[] = [
  {
    id: 'web-address-footer',
    title: 'Full Address in Footer',
    description: 'Put your full physical address (street, city, state, ZIP) in the footer of every page.',
    category: 'website',
  },
  {
    id: 'web-phone-visible',
    title: 'Phone Number Above Fold',
    description: 'Make your phone number visible without scrolling (header / top bar / sticky CTA).',
    category: 'website',
  },
  {
    id: 'web-title-keyword',
    title: 'Front-load Keywords in Title',
    description: 'Front-load your main keyword in the <title> tag. Example: "Tree Removal Sacramento | Fast 24/7 Service"',
    category: 'website',
  },
  {
    id: 'web-h1-keyword',
    title: 'H1 with Keyword + City',
    description: 'Every important H1 should contain the primary keyword + city. Example: "Emergency Tree Removal in Sacramento"',
    category: 'website',
  },
  {
    id: 'web-url-slugs',
    title: 'Descriptive URL Slugs',
    description: 'URL slugs must be descriptive, readable, and keyword-inclusive. Good: /tree-removal-sacramento',
    category: 'website',
  },
  {
    id: 'web-no-cannibalization',
    title: 'Avoid Keyword Cannibalization',
    description: 'Never build two pages targeting the same service + city keyword combo (Google ranks neither).',
    category: 'website',
  },
  {
    id: 'web-indexed',
    title: 'Confirm Site Indexing',
    description: 'Search "site:yourdomain.com" in Google to confirm indexing. Fix in Search Console if missing.',
    category: 'website',
  },
  {
    id: 'web-404-check',
    title: 'Check for 404 Errors',
    description: 'Check for 404 errors weekly using Google Search Console Coverage report or crawler.',
    category: 'website',
  },
  {
    id: 'gbp-link-location',
    title: 'Link GBP to Location Page',
    description: 'Link Google Business Profile to your location/service-area page, NOT the homepage.',
    category: 'gbp',
  },
  {
    id: 'gbp-weekly-photo',
    title: 'Upload Photo Every Week',
    description: 'Upload at least one new photo every single week (progress shots, team, vehicles, completed jobs).',
    category: 'gbp',
  },
  {
    id: 'gbp-reply-reviews',
    title: 'Reply to Every Review',
    description: 'Reply to every review (good or bad) within 24 hours.',
    category: 'gbp',
  },
  {
    id: 'gbp-products-section',
    title: 'Complete Products Section',
    description: 'Fill out the Products section completely with descriptions, photos, and price ranges.',
    category: 'gbp',
  },
  {
    id: 'gbp-primary-category',
    title: 'Match Competitor Categories',
    description: 'Match your primary GBP category to what the top 3 ranking competitors use.',
    category: 'gbp',
  },
  {
    id: 'gbp-keyword-posts',
    title: 'Keywords in GBP Posts',
    description: 'Put your main keyword + city naturally in every GBP post/update.',
    category: 'gbp',
  },
  {
    id: 'content-commercial-intent',
    title: 'Target Commercial Intent Keywords',
    description: 'Target "service + city" searches only (e.g., "tree removal sacramento"). Avoid "how to" or DIY queries.',
    category: 'content',
  },
  {
    id: 'content-no-generic-blogs',
    title: 'Skip Generic Blog Posts',
    description: 'Stop writing generic blog posts. Focus on service pages, location pages, reviews, and before/afters.',
    category: 'content',
  },
  {
    id: 'citations-yelp',
    title: 'Yelp Listing',
    description: 'Create/claim/verify consistent NAP (Name, Address, Phone) listing on Yelp.',
    category: 'citations',
  },
  {
    id: 'citations-bbb',
    title: 'Better Business Bureau',
    description: 'Create/claim/verify consistent NAP listing on BBB.',
    category: 'citations',
  },
  {
    id: 'citations-yellowpages',
    title: 'YellowPages Listing',
    description: 'Create/claim/verify consistent NAP listing on YellowPages.',
    category: 'citations',
  },
  {
    id: 'citations-chamber',
    title: 'Local Chamber of Commerce',
    description: 'Create/claim/verify listing on Local Chamber of Commerce.',
    category: 'citations',
  },
  {
    id: 'citations-bing',
    title: 'Bing Places Verification',
    description: 'Get verified on Bing Places (LLMs and map results still pull heavily from Bing).',
    category: 'citations',
  },
  {
    id: 'reviews-systematic-requests',
    title: 'Systematic Review Requests',
    description: 'Ask every single customer for a Google review (text, email, QR code, post-service automation).',
    category: 'reviews',
  },
  {
    id: 'links-homepage-focus',
    title: 'Focus Backlinks on Homepage',
    description: 'Send 80-90% of your early backlinks to the homepage.',
    category: 'links',
  },
  {
    id: 'links-branded-anchors',
    title: 'Use Branded Anchor Text',
    description: 'Use mostly branded anchor text like "[Business Name]" or "visit [Business Name]" (safest and powerful).',
    category: 'links',
  },
];

export const localSeoCategoryLabels: Record<LocalSEOTask['category'], { title: string; icon: string }> = {
  website: { title: 'Website Structure & On-Page', icon: '🌐' },
  gbp: { title: 'Google Business Profile', icon: '📍' },
  content: { title: 'Content Strategy', icon: '📝' },
  citations: { title: 'Citations & Directories', icon: '📋' },
  reviews: { title: 'Reviews & Social Proof', icon: '⭐' },
  links: { title: 'Link Building', icon: '🔗' },
};
