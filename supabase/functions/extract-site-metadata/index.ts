import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid url parameter" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Normalize URL
    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    // Fetch the page HTML
    let html = "";
    try {
      const pageRes = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; LlmsTxtBot/1.0)",
          "Accept": "text/html,application/xhtml+xml",
        },
        signal: AbortSignal.timeout(10000),
      });
      if (pageRes.ok) {
        const raw = await pageRes.text();
        // Trim to first 30k chars to keep prompt size reasonable
        html = raw.slice(0, 30000);
      }
    } catch (_e) {
      // If fetch fails, proceed with just the URL — Grok can still infer from the domain
    }

    const grokApiKey = Deno.env.get("GROK_API_KEY");
    if (!grokApiKey) {
      return new Response(
        JSON.stringify({ error: "Grok API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are a web analyst. Given a website URL and optionally its HTML content, extract structured metadata about the site. Always respond with valid JSON only — no markdown, no explanation.`;

    const userPrompt = html
      ? `Extract metadata from this website.\n\nURL: ${targetUrl}\n\nHTML (first 30k chars):\n${html}\n\nReturn JSON with exactly these fields:\n{\n  "siteName": "short brand/project name",\n  "description": "one-sentence description of what the site does (max 160 chars)",\n  "primaryTopic": "the main subject area or industry (e.g. 'web development and SaaS launches')",\n  "targetAudience": "who this site is for (e.g. 'indie hackers, startup founders')",\n  "author": "company or person name if identifiable, else empty string"\n}`
      : `Extract metadata for this website URL: ${targetUrl}\n\nReturn JSON with exactly these fields:\n{\n  "siteName": "short brand/project name",\n  "description": "one-sentence description of what the site does (max 160 chars)",\n  "primaryTopic": "the main subject area or industry",\n  "targetAudience": "who this site is for",\n  "author": "company or person name if identifiable, else empty string"\n}`;

    const grokRes = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${grokApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-3-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.2,
        max_tokens: 400,
      }),
    });

    if (!grokRes.ok) {
      const errText = await grokRes.text();
      return new Response(
        JSON.stringify({ error: `Grok API error: ${grokRes.status}`, detail: errText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const grokData = await grokRes.json();
    const rawContent = grokData?.choices?.[0]?.message?.content ?? "";

    // Parse the JSON response — strip any accidental markdown fences
    const cleaned = rawContent.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    let extracted: Record<string, string>;
    try {
      extracted = JSON.parse(cleaned);
    } catch (_e) {
      return new Response(
        JSON.stringify({ error: "Failed to parse Grok response as JSON", raw: rawContent }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        siteName: extracted.siteName ?? "",
        description: extracted.description ?? "",
        primaryTopic: extracted.primaryTopic ?? "",
        targetAudience: extracted.targetAudience ?? "",
        author: extracted.author ?? "",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Unexpected error", detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
