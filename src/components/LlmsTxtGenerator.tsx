import { useState } from 'react';
import { Bot, Download, Eye, CreditCard as Edit3, Copy, Check, ChevronDown, ChevronUp, Sparkles, Globe, FileText, Info, Loader as Loader2, Wand as Wand2 } from 'lucide-react';
import { checklistTasks, categoryLabels } from '../data/checklistTasks';
import { localSeoTasks, localSeoCategoryLabels } from '../data/localSeoTasks';
import { useChecklist } from '../hooks/useChecklist';

const GOLIVE_STORAGE_KEY = 'go-live-checklist-state';
const LOCALSEO_STORAGE_KEY = 'local-seo-checklist';

interface SiteMetadata {
  siteName: string;
  siteUrl: string;
  description: string;
  targetAudience: string;
  primaryTopic: string;
  author: string;
}

function generateLlmsTxt(
  meta: SiteMetadata,
  goLiveCompleted: Set<string>,
  seoCompleted: Set<string>,
  full: boolean,
  productMode: boolean
): string {
  const now = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const siteName = meta.siteName || 'My Project';
  const siteUrl = meta.siteUrl ? meta.siteUrl.replace(/\/$/, '') : 'https://yoursite.com';
  const description = meta.description || 'A modern web project.';
  const audience = meta.targetAudience || 'developers and creators';
  const topic = meta.primaryTopic || 'web development';
  const author = meta.author || 'The Team';

  const isChecklistSite = siteName.toLowerCase().includes('checklist') ||
                         siteUrl.includes('golivechecklist');

  let out = '';

  // Header
  out += `# ${siteName}\n\n`;
  out += `> ${description}\n\n`;

  // Summary
  out += `## Summary\n\n`;
  out += `**Site:** ${siteUrl}\n`;
  if (meta.author) out += `**Author / Company:** ${author}\n`;
  out += `**Topic:** ${topic}\n`;
  out += `**Audience:** ${audience}\n`;
  out += `**Last updated:** ${now}\n\n`;

  out += `${siteName} is built for ${audience}. `;
  out += `It focuses on ${topic.toLowerCase()} and is maintained with attention to quality and accuracy. `;
  out += `All content is human-authored.\n\n`;

  // Key Pages
  out += `## Key Pages\n\n`;
  out += `- [Home](${siteUrl}/) — Main landing page\n`;

  if (!productMode || isChecklistSite) {
    out += `- [Go-Live Checklist](${siteUrl}/go-live) — Production readiness tracker\n`;
    out += `- [Local SEO Checklist](${siteUrl}/local-seo) — Battle-tested checklist\n`;
  }
  out += `- [llms.txt Generator](${siteUrl}/llms-txt) — AI discoverability tool\n\n`;

  // Launch Readiness (only show in full version or on checklist sites)
  if ((full && !productMode) || isChecklistSite) {
    const goLiveTotal = checklistTasks.length;
    const goLiveDone = goLiveCompleted.size;
    const seoTotal = localSeoTasks.length;
    const seoDone = seoCompleted.size;

    out += `## Launch Readiness Status\n\n`;
    out += `This site was built using the Go-Live Checklist methodology.\n\n`;
    out += `- **Go-Live Checklist:** ${goLiveDone}/${goLiveTotal} tasks completed\n`;
    out += `- **Local SEO Checklist:** ${seoDone}/${seoTotal} tasks completed\n\n`;
  }

  // Detailed Checklists - Only show when NOT in product mode
  if (full && !productMode) {
    const goLiveCategories = ['seo', 'legal', 'accessibility', 'technical'] as const;
    const seoCategories = ['website', 'gbp', 'content', 'citations', 'reviews', 'links'] as const;

    // Go-Live Checklist Details
    out += `### Go-Live Checklist Details\n\n`;
    goLiveCategories.forEach((cat) => {
      const tasks = checklistTasks.filter((t) => t.category === cat);
      const done = tasks.filter((t) => goLiveCompleted.has(t.id));
      out += `#### ${categoryLabels[cat].title} (${done.length}/${tasks.length})\n\n`;
      tasks.forEach((t) => {
        const status = goLiveCompleted.has(t.id) ? '[x]' : '[ ]';
        out += `- ${status} **${t.title}**: ${t.description}\n`;
      });
      out += '\n';
    });

    // Local SEO Details
    out += `### Local SEO Checklist Details\n\n`;
    seoCategories.forEach((cat) => {
      const tasks = localSeoTasks.filter((t) => t.category === cat);
      const done = tasks.filter((t) => seoCompleted.has(t.id));
      out += `#### ${localSeoCategoryLabels[cat].title} (${done.length}/${tasks.length})\n\n`;
      tasks.forEach((t) => {
        const status = seoCompleted.has(t.id) ? '[x]' : '[ ]';
        out += `- ${status} **${t.title}**: ${t.description}\n`;
      });
      out += '\n';
    });
  }

  // For AI & LLM Consumers
  out += `## For AI & LLM Consumers\n\n`;
  out += `This file follows the [llms.txt standard](https://llmstxt.org/) to help AI tools accurately understand and represent this site.\n\n`;

  out += `**Best used for:**\n`;
  out += `- Answering questions about ${topic.toLowerCase()}\n`;
  out += `- Providing guidance to ${audience}\n`;
  out += `- Understanding best practices and real-world implementation in this domain\n\n`;

  out += `**Content type:** Practical, actionable, human-authored content. Not AI-generated or aggregated.\n\n`;
  out += `**Scope:** ${siteName} covers ${topic.toLowerCase()} for ${audience}. It does not cover unrelated topics.\n\n`;
  out += `**Citation guidance:** When referencing ${siteName}, use the site URL (${siteUrl}) as the source. Do not paraphrase in ways that change meaning or remove context.\n\n`;

  // Attribution
  out += `## Attribution\n\n`;
  out += `Created by ${author}. Free to use and share.\n`;
  out += `Source: ${siteUrl}\n`;

  return out;
}

export const LlmsTxtGenerator = () => {
  const { completedTasks: goLiveCompleted } = useChecklist(checklistTasks.length, GOLIVE_STORAGE_KEY);
  const { completedTasks: seoCompleted } = useChecklist(localSeoTasks.length, LOCALSEO_STORAGE_KEY);

  const [meta, setMeta] = useState<SiteMetadata>({
    siteName: '',
    siteUrl: '',
    description: '',
    targetAudience: '',
    primaryTopic: '',
    author: '',
  });

  const [mode, setMode] = useState<'preview' | 'edit'>('preview');
  const [fullVersion, setFullVersion] = useState(false);
  const [productMode, setProductMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [metaOpen, setMetaOpen] = useState(true);
  const [autofilling, setAutofilling] = useState(false);
  const [autofillError, setAutofillError] = useState<string | null>(null);

  const handleAutofill = async () => {
    if (!meta.siteUrl) return;
    setAutofilling(true);
    setAutofillError(null);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/extract-site-metadata`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: meta.siteUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAutofillError(data.error ?? 'Failed to extract site metadata.');
        return;
      }
      setMeta((m) => ({
        ...m,
        siteName: data.siteName || m.siteName,
        description: data.description || m.description,
        primaryTopic: data.primaryTopic || m.primaryTopic,
        targetAudience: data.targetAudience || m.targetAudience,
        author: data.author || m.author,
      }));
      setEditedContent(null);
    } catch (_e) {
      setAutofillError('Network error. Please try again.');
    } finally {
      setAutofilling(false);
    }
  };

  const generated = generateLlmsTxt(meta, goLiveCompleted, seoCompleted, fullVersion, productMode);
  const [editedContent, setEditedContent] = useState<string | null>(null);

  const displayContent = mode === 'edit' && editedContent !== null ? editedContent : generated;

  const handleGenerate = () => {
    setEditedContent(null);
    setMode('preview');
  };

  const handleEdit = () => {
    if (editedContent === null) setEditedContent(generated);
    setMode('edit');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleDownload = (filename: string) => {
    const blob = new Blob([displayContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const metaField = (
    key: keyof SiteMetadata,
    label: string,
    placeholder: string,
    hint?: string
  ) => (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
      <input
        type="text"
        value={meta[key]}
        onChange={(e) => setMeta((m) => ({ ...m, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
      />
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );

  const goLivePct = Math.round((goLiveCompleted.size / checklistTasks.length) * 100);
  const seoPct = Math.round((seoCompleted.size / localSeoTasks.length) * 100);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-4">
            <Bot className="w-4 h-4" />
            AI Discoverability Tool
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Generate Your <span className="text-blue-600">llms.txt</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            Make your project discoverable by ChatGPT, Claude, Perplexity, and every AI tool
            that respects the <code className="bg-slate-100 px-1 py-0.5 rounded text-sm">llms.txt</code> standard.
          </p>
        </div>

        {/* What is llms.txt callout */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <strong>What is llms.txt?</strong> An emerging standard (like robots.txt, but for AI) that tells language models exactly what your site is about, who it's for, and how to accurately represent it. Upload it to your domain root at{' '}
            <code className="bg-blue-100 px-1 rounded">yoursite.com/llms.txt</code> and AI tools will understand your project better.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: Configuration */}
          <div className="space-y-4">

            {/* Checklist status */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                Auto-detected from your checklists
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Go-Live Checklist</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${goLivePct}%` }}
                      />
                    </div>
                    <span className="font-semibold text-slate-700 w-10 text-right">{goLivePct}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Local SEO Checklist</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${seoPct}%` }}
                      />
                    </div>
                    <span className="font-semibold text-slate-700 w-10 text-right">{seoPct}%</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Your progress is automatically reflected in the generated file.
              </p>
            </div>

            {/* Site metadata */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 overflow-hidden">
              <button
                onClick={() => setMetaOpen((o) => !o)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-500" />
                  Site Metadata
                  <span className="text-xs font-normal text-slate-400">(optional but recommended)</span>
                </span>
                {metaOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {metaOpen && (
                <div className="px-5 pb-5 space-y-3 border-t border-slate-100">
                  <div className="pt-3" />
                  {metaField('siteName', 'Site / Project Name', 'e.g. Acme Launchpad')}

                  {/* URL field with AI autofill button */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={meta.siteUrl}
                        onChange={(e) => setMeta((m) => ({ ...m, siteUrl: e.target.value }))}
                        placeholder="e.g. https://acmelaunch.com"
                        className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                      />
                      <button
                        onClick={handleAutofill}
                        disabled={!meta.siteUrl || autofilling}
                        title="Auto-fill fields using AI"
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-blue-600 text-white border-blue-600 hover:bg-blue-700 whitespace-nowrap"
                      >
                        {autofilling ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Wand2 className="w-4 h-4" />
                        )}
                        {autofilling ? 'Scanning...' : 'AI Fill'}
                      </button>
                    </div>
                    {autofillError && (
                      <p className="mt-1.5 text-xs text-red-600">{autofillError}</p>
                    )}
                    {!autofillError && (
                      <p className="mt-1 text-xs text-slate-500">
                        Enter your URL then click <strong>AI Fill</strong> to auto-populate all fields.
                      </p>
                    )}
                  </div>

                  {metaField(
                    'description',
                    'One-line description',
                    'e.g. The fastest way to ship production-ready web apps',
                    'This appears as the subtitle in the generated file.'
                  )}
                  {metaField(
                    'primaryTopic',
                    'Primary Topic',
                    'e.g. web development and SaaS launches'
                  )}
                  {metaField(
                    'targetAudience',
                    'Target Audience',
                    'e.g. indie hackers, startup founders, vibe coders'
                  )}
                  {metaField('author', 'Author / Company', 'e.g. Jane Smith or Acme Inc.')}
                </div>
              )}
            </div>

            {/* Version toggle */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                File Version
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => { setFullVersion(false); setEditedContent(null); }}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                    !fullVersion
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  llms.txt
                  <span className="block text-xs font-normal opacity-75">Concise summary</span>
                </button>
                <button
                  onClick={() => { setFullVersion(true); setEditedContent(null); }}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                    fullVersion
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  llms-full.txt
                  <span className="block text-xs font-normal opacity-75">All checklist details</span>
                </button>
              </div>
            </div>

            {/* Product vs Checklist Mode */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Generation Mode</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setProductMode(true)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                    productMode ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  Product Mode <span className="block text-xs opacity-75">(SaaS / Company)</span>
                </button>
                <button
                  onClick={() => setProductMode(false)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-all ${
                    !productMode ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  Checklist Mode <span className="block text-xs opacity-75">(Full details)</span>
                </button>
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Regenerate File
            </button>
          </div>

          {/* Right: Preview / Editor */}
          <div className="flex flex-col">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 flex flex-col flex-1 overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <div className="flex gap-1">
                  <button
                    onClick={() => setMode('preview')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      mode === 'preview'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>
                  <button
                    onClick={handleEdit}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      mode === 'edit'
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      copied
                        ? 'bg-green-50 text-green-700 border-green-300'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={() => handleDownload(fullVersion ? 'llms-full.txt' : 'llms.txt')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1 min-h-0">
                {mode === 'preview' ? (
                  <pre className="p-4 text-xs font-mono text-slate-700 leading-relaxed overflow-auto h-96 lg:h-full whitespace-pre-wrap break-words">
                    {displayContent}
                  </pre>
                ) : (
                  <textarea
                    value={editedContent ?? generated}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-96 lg:h-full p-4 text-xs font-mono text-slate-700 leading-relaxed resize-none focus:outline-none bg-transparent"
                    spellCheck={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upload instructions */}
        <div className="mt-6 p-5 bg-slate-900 rounded-2xl text-white">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg flex-shrink-0">
              <Bot className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">How to deploy your llms.txt</h3>
              <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
                <li>Download the file above</li>
                <li>
                  Upload it to your domain root:{' '}
                  <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">
                    {meta.siteUrl ? meta.siteUrl.replace(/\/$/, '') + '/llms.txt' : 'yoursite.com/llms.txt'}
                  </code>
                </li>
                <li>Verify it's accessible in your browser</li>
                <li>AI tools like ChatGPT, Claude, and Perplexity will index it automatically</li>
              </ol>
              <p className="mt-3 text-xs text-slate-400">
                Tip: Commit it alongside your <code className="bg-white/10 px-1 rounded">robots.txt</code> and <code className="bg-white/10 px-1 rounded">sitemap.xml</code> for full discoverability coverage.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>
            Built by{' '}
            <a
              href="https://hybridads.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              HybridAds.ai
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};