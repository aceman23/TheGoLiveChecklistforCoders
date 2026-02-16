export interface LocalSEOTask {
  id: string;
  title: string;
  description: string;
  category: 'website' | 'gbp' | 'content' | 'citations' | 'reviews' | 'links';
  aiPrompt: string;
}

export const localSeoTasks: LocalSEOTask[] = [
  {
    id: 'web-address-footer',
    title: 'Full Address in Footer',
    description: 'Put your full physical address (street, city, state, ZIP) in the footer of every page.',
    category: 'website',
    aiPrompt: 'Add my full business address (street, city, state, ZIP) to the footer component that appears on every page of my website. Make it styled consistently and include proper Schema.org markup for the address.',
  },
  {
    id: 'web-phone-visible',
    title: 'Phone Number Above Fold',
    description: 'Make your phone number visible without scrolling (header / top bar / sticky CTA).',
    category: 'website',
    aiPrompt: 'Add my business phone number to the header or create a sticky top bar that keeps it visible above the fold at all times. Make it clickable with tel: link for mobile users.',
  },
  {
    id: 'web-title-keyword',
    title: 'Front-load Keywords in Title',
    description: 'Front-load your main keyword in the <title> tag. Example: "Tree Removal Sacramento | Fast 24/7 Service"',
    category: 'website',
    aiPrompt: 'Review all page titles and rewrite them to front-load my primary service keyword + city name. Keep titles under 60 characters and make them compelling for local search. Show me the updated title tags.',
  },
  {
    id: 'web-h1-keyword',
    title: 'H1 with Keyword + City',
    description: 'Every important H1 should contain the primary keyword + city. Example: "Emergency Tree Removal in Sacramento"',
    category: 'website',
    aiPrompt: 'Audit all H1 tags across my site and ensure each includes my primary service keyword + city name naturally. Rewrite them to be compelling while maintaining SEO best practices.',
  },
  {
    id: 'web-url-slugs',
    title: 'Descriptive URL Slugs',
    description: 'URL slugs must be descriptive, readable, and keyword-inclusive. Good: /tree-removal-sacramento',
    category: 'website',
    aiPrompt: 'Review all URL slugs and make them descriptive, lowercase, hyphen-separated, and keyword-rich. Convert any generic slugs (like /service-1 or /page-2) into semantic URLs that include service and location keywords.',
  },
  {
    id: 'web-no-cannibalization',
    title: 'Avoid Keyword Cannibalization',
    description: 'Never build two pages targeting the same service + city keyword combo (Google ranks neither).',
    category: 'website',
    aiPrompt: 'Analyze my site structure and identify any pages targeting the same service + city keyword combination. Help me consolidate duplicate pages or differentiate them with unique keyword variations to avoid cannibalization.',
  },
  {
    id: 'web-indexed',
    title: 'Confirm Site Indexing',
    description: 'Search "site:yourdomain.com" in Google to confirm indexing. Fix in Search Console if missing.',
    category: 'website',
    aiPrompt: 'Check if my site is properly indexed by Google. Generate a sitemap.xml file, add it to robots.txt, and show me how to submit it to Google Search Console. Ensure there are no noindex tags blocking important pages.',
  },
  {
    id: 'web-404-check',
    title: 'Check for 404 Errors',
    description: 'Check for 404 errors weekly using Google Search Console Coverage report or crawler.',
    category: 'website',
    aiPrompt: 'Help me set up 404 error monitoring. Create a custom 404 page with helpful navigation. Show me how to check for broken links using Google Search Console and fix or redirect any 404 errors.',
  },
  {
    id: 'gbp-link-location',
    title: 'Link GBP to Location Page',
    description: 'Link Google Business Profile to your location/service-area page, NOT the homepage.',
    category: 'gbp',
    aiPrompt: 'Create a dedicated location/service-area landing page optimized for my city that I can link from my Google Business Profile. Include address, service areas, embedded map, hours, and local content.',
  },
  {
    id: 'gbp-weekly-photo',
    title: 'Upload Photo Every Week',
    description: 'Upload at least one new photo every single week (progress shots, team, vehicles, completed jobs).',
    category: 'gbp',
    aiPrompt: 'Create a photo upload checklist and template for weekly Google Business Profile updates. Include categories: project progress, completed work, team photos, equipment/vehicles, and behind-the-scenes content.',
  },
  {
    id: 'gbp-reply-reviews',
    title: 'Reply to Every Review',
    description: 'Reply to every review (good or bad) within 24 hours.',
    category: 'gbp',
    aiPrompt: 'Generate review response templates for positive and negative reviews. Include personalization points, thank you messages, and professional responses to criticism. Make them natural, not robotic.',
  },
  {
    id: 'gbp-products-section',
    title: 'Complete Products Section',
    description: 'Fill out the Products section completely with descriptions, photos, and price ranges.',
    category: 'gbp',
    aiPrompt: 'Create a structured list of my services formatted for Google Business Profile Products section. Include compelling descriptions, price ranges, and what photos I should take for each service offering.',
  },
  {
    id: 'gbp-primary-category',
    title: 'Match Competitor Categories',
    description: 'Match your primary GBP category to what the top 3 ranking competitors use.',
    category: 'gbp',
    aiPrompt: 'Research the top 3 competitors in my area and identify what primary Google Business Profile categories they use. Recommend which category I should select and any relevant secondary categories.',
  },
  {
    id: 'gbp-keyword-posts',
    title: 'Keywords in GBP Posts',
    description: 'Put your main keyword + city naturally in every GBP post/update.',
    category: 'gbp',
    aiPrompt: 'Generate 4-6 Google Business Profile post templates that naturally include my service keyword + city. Include call-to-actions, seasonal angles, and promotional messaging that I can reuse monthly.',
  },
  {
    id: 'content-commercial-intent',
    title: 'Target Commercial Intent Keywords',
    description: 'Target "service + city" searches only (e.g., "tree removal sacramento"). Avoid "how to" or DIY queries.',
    category: 'content',
    aiPrompt: 'Analyze my content strategy and identify any pages targeting informational or DIY keywords. Help me pivot to commercial intent keywords (service + city) that attract ready-to-buy customers, not DIY researchers.',
  },
  {
    id: 'content-no-generic-blogs',
    title: 'Skip Generic Blog Posts',
    description: 'Stop writing generic blog posts. Focus on service pages, location pages, reviews, and before/afters.',
    category: 'content',
    aiPrompt: 'Audit my blog content and identify low-value generic posts. Help me create high-converting content templates: service pages, neighborhood/location pages, customer success stories, and before/after project showcases.',
  },
  {
    id: 'citations-yelp',
    title: 'Yelp Listing',
    description: 'Create/claim/verify consistent NAP (Name, Address, Phone) listing on Yelp.',
    category: 'citations',
    aiPrompt: 'Create a business profile template with consistent NAP (Name, Address, Phone) information formatted correctly for Yelp. Include category selection, business description, and photo recommendations.',
  },
  {
    id: 'citations-bbb',
    title: 'Better Business Bureau',
    description: 'Create/claim/verify consistent NAP listing on BBB.',
    category: 'citations',
    aiPrompt: 'Generate my business information formatted for Better Business Bureau submission. Ensure NAP consistency with my Google Business Profile and website. Include business description and accreditation benefits.',
  },
  {
    id: 'citations-yellowpages',
    title: 'YellowPages Listing',
    description: 'Create/claim/verify consistent NAP listing on YellowPages.',
    category: 'citations',
    aiPrompt: 'Format my business details for YellowPages directory submission. Ensure exact NAP match with other listings. Include relevant categories and compelling business description.',
  },
  {
    id: 'citations-chamber',
    title: 'Local Chamber of Commerce',
    description: 'Create/claim/verify listing on Local Chamber of Commerce.',
    category: 'citations',
    aiPrompt: 'Help me find my local Chamber of Commerce website and prepare my business profile information for membership and directory listing. Include networking and local link building benefits.',
  },
  {
    id: 'citations-bing',
    title: 'Bing Places Verification',
    description: 'Get verified on Bing Places (LLMs and map results still pull heavily from Bing).',
    category: 'citations',
    aiPrompt: 'Create my business profile for Bing Places with consistent NAP information. Show me the verification process and why Bing matters for LLM citations and voice search results.',
  },
  {
    id: 'reviews-systematic-requests',
    title: 'Systematic Review Requests',
    description: 'Ask every single customer for a Google review (text, email, QR code, post-service automation).',
    category: 'reviews',
    aiPrompt: 'Create a systematic review request system: follow-up email template, SMS text message, QR code for Google review link, and ideal timing for asking after service completion. Make it easy and non-pushy.',
  },
  {
    id: 'links-homepage-focus',
    title: 'Focus Backlinks on Homepage',
    description: 'Send 80-90% of your early backlinks to the homepage.',
    category: 'links',
    aiPrompt: 'Create a local link building strategy focused on getting backlinks to my homepage. Identify opportunities: local sponsorships, community partnerships, supplier directories, and local business associations.',
  },
  {
    id: 'links-branded-anchors',
    title: 'Use Branded Anchor Text',
    description: 'Use mostly branded anchor text like "[Business Name]" or "visit [Business Name]" (safest and powerful).',
    category: 'links',
    aiPrompt: 'Generate a list of safe branded anchor text variations I can use in outreach and link building. Include business name variations, URLs, and natural branded phrases that avoid over-optimization penalties.',
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
