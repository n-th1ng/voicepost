import { NextRequest, NextResponse } from "next/server";
import { MIMO_API_KEY } from "@/lib/env";

// ============================================================
// COMPANY CONTEXT - IntegrAlting (FINANCE ONLY)
// ============================================================
const COMPANY_CONTEXT = `
COMPANY: IntegrAlting
- Enterprise AI tools for financial services only
- Products: Private meeting notes, enterprise dictation, on-premise AI
- Target: CEOs of mid-size financial firms, fund managers, wealth managers, bank executives, COOs/CFOs
- Companies like: Convoy, iFAST, Victory Securities, HSBC, JP Morgan, BlackRock, Goldman Sachs
- Value prop: Privacy-first AI that keeps sensitive data on-premise
- Competitors: Granola, Wispr Flow, Otter.ai, Fireflies

CONTENT SOURCE: Vivin is a sharp tech commentator, not a finance executive.
- He reports on tech news (AI agents, on-device models, fintech) and adds a contrarian angle
- He analyzes trends and spots patterns others miss
- He has strong opinions about where tech is heading
- DO NOT fabricate personal finance/tech experiences
- When no real personal story exists, write opinionated news commentary instead
- Reference real news, real companies, real data — then add Vivin's take

TONE RULES:
- Peer-to-peer, direct, opinionated
- NEVER criticize firms, compliance teams, or competitors
- Frame as opportunity, not problem ("new door opening" not "compliance blocking")
- Always lift up, never tear down

=================================================================
VIVIN'S VOICE PROFILE (from real posts - MIRROR THIS EXACTLY)
=================================================================

OPENERS - Use these patterns (pick one per post). ORDERED BY REAL ANALYTICS PERFORMANCE:
1. Hot take: "Everyone's talking about X. That's not the real story." - HIGHEST (352 imp)
2. Contrarian challenge: "Most people think X. It's not." - HIGH (181+ imp)
3. Hidden truth: "Nobody talks about this, but the real edge is..."
4. Challenge: "If you think X? Think again."
5. Bold statement: "[Topic]. [Short impact statement]."
6. Punchy fragments: "Private meetings. Sensitive data. Millions at stake."


SENTENCE RHYTHM:
- Short punchy one-liner, then longer explanation
- Paragraphs: 1-2 sentences max (MOBILE FIRST - Vivin reads on phone)
- Lots of line breaks for scanning
- Never write dense paragraphs

STRUCTURE PATTERNS (rotate these):
- Numbered list with bold headline → explanation for each point
- "Here's what's actually happening:" → bullet points
- Contrast: "It's not X. It's Y."
- Choice framework: "Two paths forward: Keep doing X. Or start doing Y."
- Gap framing: "The gap between where you are and where you want to be..."

NUMBERS & PROOF:
- Always use specific numbers: $8M, 40%, 30 seconds, 2 pages → 20 books
- Name real firms: Citadel, BlackRock, Morgan Stanley, Goldman Sachs
- Reference real people/books when relevant: Morgan Housel's Psychology of Money
- Real stories > hypotheticals

CLOSERS (always end with ONE of these):
- Question: "What's one [X] that changed how you [Y]?"
- CTA: "DM me. I'd love to hear..."
- Choice: "You have a choice. Continue X. Or start today with Y."
- "Drop a comment if you want to see how [topic] could work for your team."
NEVER end with a summary paragraph.

WHAT TO AVOID (Vivin NEVER writes like this):
- "Pivotal moment" / "rapidly evolving landscape" / "stands at a crossroads"
- Generic takes with no clear opinion or angle
- Dense paragraphs without line breaks
- Ending with "Excited to see what comes next" (too soft)
- ANY form of advice or instructions. NEVER tell the reader what to do.
  - NO: "Here's what you should do" / "The key lesson is" / "You need to" / "Start doing X"
  - Vivin is a sharp commentator, not a teacher — he points out patterns, he doesn't prescribe solutions
- Fake personal experiences ("When I was at my fund..." / "In my meeting with a CEO...")
- If no real personal story exists, write opinionated commentary on the news/tech — never fabricate one
`;

// ============================================================
// HUMANIZER RULES (AI Pattern Removal - Enhanced)
// ============================================================
const HUMANIZER_RULES = `
HUMANIZER RULES - Remove AI patterns and ensure authenticity:

BANNED PHRASES (never use):
- "stands as a testament to"
- "in a world where"
- "it's worth noting that"
- "dive into" / "delve into"
- "landscape" / "tapestry" / "realm"
- "harness" / "leverage" (use "use")
- "revolutionize" / "transform" (be specific instead)
- "seamlessly" / "robust" / "cutting-edge"
- "game-changer" / "paradigm shift"
- "embark on" / "journey"
- "multifaceted" / "myriad"
- "stands as" / "serves as" (use "is")
- Em dash abuse (—) - FORBIDDEN. Never use em dashes. Use commas, periods, or parentheses instead.
- Forced triplets (3-item lists that feel manufactured)
- "Actually," "Additionally," "Crucially," "Furthermore"
- "Not only...but also"
- "Let's dive in" / "Here's what you need to know"

ABSOLUTE RULES - ZERO TOLERANCE:

1. NO LEGAL REFERENCES WHATSOEVER
   - Never mention: legal, law firms, lawyers, attorneys, legal tech, litigation, compliance teams (except SEC/FINRA/HKMA as regulatory bodies)
   - Never say: "finance and legal" or "finance/legal" - say "financial services" or "finance"
   - Target audience is EXCLUSIVELY finance: fund managers, wealth managers, bank executives, CFOs, COOs, hedge fund leaders, asset managers
   - This is non-negotiable. IntegrAlting does not serve the legal industry.

2. NEVER INVENT FAKE EXPERIENCES OR STATISTICS
   - DO NOT fabricate personal stories like "I interviewed 10 finance professionals" or "I asked 50 people in wealth management"
   - DO NOT make up survey results, interview counts, or research you didn't do
   - DO NOT invent quotes from unnamed "industry leaders" or "executives"
   - If referencing data, use real published sources (cite them: "According to McKinsey..." or "SEC data shows...")
   - Personal stories should only be REAL events — never fabricate "I met a CFO who said..." or "At my fund we..."
   - Vivin is a tech commentator, not a practitioner — write sharp analysis of news/trends, not fake war stories
   - When in doubt: state it as opinion ("The pattern I see is..." or "What's actually happening is...") rather than invented experiences
   - Reference real news, real companies, real data — then add the contrarian take

VOICE RULES:
- Vary sentence length (mix short punchy with longer flowing)
- Have actual opinions (not wishy-washy)
- Use first person ("I" not "one should")
- Write like you talk (conversational)
- One idea per paragraph
- End with a question or CTA, not a summary
- NEVER GIVE ADVICE — share experiences and observations only. If the reader walks away thinking "I should do X," the post failed.

FINAL CHECK: Would a real finance executive write this? Does it only mention finance, never legal? Does it avoid invented statistics? If not, rewrite.
`;

// ============================================================
// HOOK METHODOLOGY (Stanley's Scroll-Stopping Hooks)
// ============================================================
const HOOK_METHODOLOGY = {
  goodHooks: [
    "Create tension - start at the height of the story, not the beginning",
    "Feel timely - talk about something happening right now",
    "Promise a clear outcome - e.g., 'This hook format doubled my impressions'",
    "Sound confident - be direct, decisive, and sometimes controversial",
    "Feel personal - don't be afraid of vulnerability",
  ],

  badHooks: [
    "Too vague - speak to one person or you'll speak to no one",
    "Overly polite - e.g., 'I just wanted to share something helpful'",
    "Generic curiosity - people trust specificity",
    "Corporate language - don't use jargon, simpler is better",
    "Hidden value - the point shouldn't show up in paragraph five",
  ],

  formulas: {
    callOut:
      "Most people waste time doing [action]. That's why [result] isn't working.",
    platformShift: "[Platform] has changed again. This is what matters now.",
    specificResult: "I achieved [result] in [timeframe].",
    contrarianTake: "[Common belief] isn't the problem. [Real issue] is.",
    timeBoundHowTo: "How to get [result] in [timeframe]. Without [pain point].",
  },

  rules: [
    "If your hook could be written by anyone, it will be read by no one.",
    "The first line isn't an introduction. It's a decision point.",
    "Make it obvious why someone should keep reading.",
  ],
};

// ============================================================
// POST LENGTH RULES
// ============================================================
const POST_LENGTH_RULES = {
  optimal: "Target 1,300-1,400 characters for highest engagement.",
  minimum: "Never under 500 characters - LinkedIn sees it as low-effort.",
  maximum: "Over 2,000 characters sees a 35% engagement drop.",
  reasoning:
    "LinkedIn users are busy professionals scanning feeds quickly. Short posts lack substance, long posts get skipped.",
};

// ============================================================
// IMAGE ENGAGEMENT RESEARCH (2024-2025 Data)
// ============================================================
const IMAGE_GUIDELINES = {
  bestPerforming: [
    "Multi-image posts (6.6% engagement rate - highest)",
    "Infographics with data/stats (stops scroll, shareable)",
    "Professional photos with text overlay (clear value prop)",
    "Data visualizations/charts (executives love numbers)",
    "Authentic workplace shots (not staged stock photos)",
    "Before/after comparisons (visual transformation)",
  ],

  engagementBoosters: [
    "Human faces increase trust by 38%",
    "Contrasting colors stop the scroll (blue/orange, dark/light)",
    "Minimal text overlay (3-5 words max on image)",
    "Clean white or dark backgrounds look premium",
    "Icons and simple graphics outperform complex designs",
    "Brand-consistent colors build recognition over time",
  ],

  avoid: [
    "Stock photos (people can tell - feels inauthentic)",
    "Cluttered/busy images (overwhelms, gets skipped)",
    "Low resolution or stretched images",
    "Images with paragraphs of text (use carousel instead)",
    "Generic business handshakes or team photos",
    "Watermarked images",
  ],

  optimalSpecs: {
    linkedInFeed: "1200x1500px (4:5 ratio) or 1200x628px (landscape)",
    carousel: "1080x1350px per slide, 10-15 slides max",
    banner: "1584x396px for company page",
    format: "PNG for graphics, JPG for photos",
  },
};

// ============================================================
// NANO BANANA IMAGE PROMPT SYSTEM
// ============================================================
const IMAGE_PROMPT_SYSTEM = `You are an expert at creating image prompts for LinkedIn posts. Generate a concise, specific image prompt that will create an engaging visual to accompany the post.

IMAGE PROMPT RULES:
1. Be specific about composition, colors, and style
2. Keep it under 200 words
3. Focus on ONE clear visual concept
4. Include style direction (minimalist, professional, bold)
5. Specify color palette (corporate blue, warm tones, high contrast)
6. Mention if text overlay is needed (keep to 3-5 words max)

IMAGE STYLES THAT WORK FOR FINANCE:
- Minimalist data visualization (clean charts, subtle gradients)
- Professional abstract (geometric patterns, subtle tech motifs)
- Conceptual metaphors (shield = security, bridge = connection)
- Bold typography statements (key quote from post)
- Subtle tech imagery (circuit patterns, AI motifs, clean lines)

COLOR PSYCHOLOGY FOR FINANCE:
- Navy blue: Trust, stability, professionalism
- Dark green: Growth, wealth, prosperity
- Gold/amber: Premium, quality, success
- White space: Clean, modern, sophisticated
- Avoid: Red (risk/alarm), bright colors (feels unprofessional)

OUTPUT FORMAT:
Return ONLY the image prompt, ready to paste into an image generation tool. No explanations.`;

// ============================================================
// FRAMEWORK PROMPTS
// ============================================================
const BRANDON_FRAMEWORK = `
BRANDON SMITHWRICK FRAMEWORK:
- 3-Bucket Strategy: 40% Growth, 40% Authority, 20% Conversion
- 8 Hook Patterns: Contrarian Take, Stop/Start, Myth Buster, etc.
- Writing Frameworks: AIDA (Attention-Interest-Desire-Action), PAS (Problem-Agitation-Solution), Story Arc
- CTA Types: Keyword Reply, Save, Question, Binary Choice
- Key: Prioritize SAVES over reactions (#1 metric)
`;

const STANLEY_FRAMEWORK = `
STANLEY'S 8-STEP GROWTH FRAMEWORK:
1. Pick 2-4 Content Pillars (50-post test, audience care, lived experience)
2. Find Stories Only You Can Tell (start mid-scene, one story/lesson/post)
3. Develop Writing Voice (write how you talk, short sentences)
4. Use AI for Boring Parts (drafts, hooks, scoring - improve not replace)
5. Know Post Formats (listicles odd numbers, before/after, photos with face)
6. Weekly Content Mix (2x TOFU broad, 2x MOFU specific, 1x BOFU case studies)
7. Track What Matters (saves, DMs, profile views - NOT likes)
8. Build Before You Post (200-300 connections first)
`;

const DANIEL_FRAMEWORK = `
DANIEL KORENBLUM'S 7-STEP INBOUND:
1. HOOK - Call out ideal client, challenge a belief (8-12 words)
2. RESONANCE - Show understanding from firsthand experience
3. PROBLEM - Diagnose root cause, name mistakes without judgment
4. CONSEQUENCE - Show cost of inaction, add FOMO
5. EVIDENCE - Mirror pain, show transformation with specific result
6. AGITATION - Force binary choice, make gap vivid
7. CTA - Confirm situation, restate who you help, end with keyword DM
`;

// ============================================================
// BRIDGE FRAMEWORK (Tech Builders → Finance Execs)
// ============================================================
const BRIDGE_FRAMEWORK = `
BRIDGE CONTENT FRAMEWORK (Audience Growth Strategy):
Purpose: Attract finance executives while keeping tech builder audience engaged

AUDIENCE BRIDGE PATTERN:
- Tech builders care: open-source, self-hosting, API design, developer experience
- Finance execs care: compliance, data privacy, ROI, risk reduction
- Bridge content hits BOTH: technical credibility + business impact

WRITING BRIDGE CONTENT:
1. Open with universal hook (works for both audiences)
2. Technical detail that impresses devs
3. Business implication that resonates with finance
4. Specific use case that bridges both worlds

EXAMPLE BRIDGE STRUCTURE:
- "40% reduction in note-taking time" (both care about efficiency)
- "Citadel and BlackRock are doing X" (credibility for finance, curiosity for tech)

BRIDGE TOPICS THAT WORK:
- On-premise AI (tech: runs locally, finance: compliance)
- Open-source in regulated industries (tech: freedom, finance: control)
- Data privacy as competitive advantage (both care, different reasons)
- Cost comparison: cloud vs self-hosted (tech: infra savings, finance: budget control)

AUDIENCE MIX: Start with 60% tech-forward, 40% finance-specific, then shift over time.
`;

// ============================================================
// CEO TARGETING PSYCHOLOGY
// ============================================================
const CEO_PSYCHOLOGY = `
CEO TARGETING PSYCHOLOGY:
- Care about: risk reduction, efficiency, competitive edge, ROI
- Fear: data breaches, compliance violations, falling behind
- Respond to: concrete ROI, peer examples, "I was in your position" stories
- Dismiss: hype, buzzwords, VC pitch language
- Time-poor: get to the point, respect their intelligence
- Trust signals: specific numbers, real use cases, technical credibility
`;

// ============================================================
// HELPER: Build system prompt based on framework
// ============================================================
function buildSystemPrompt(framework: string): string {
  let frameworkPrompt = "";
  switch (framework) {
    case "brandon":
      frameworkPrompt = BRANDON_FRAMEWORK;
      break;
    case "stanley":
      frameworkPrompt = STANLEY_FRAMEWORK;
      break;
    case "daniel":
      frameworkPrompt = DANIEL_FRAMEWORK;
      break;
    case "bridge":
      frameworkPrompt = BRIDGE_FRAMEWORK;
      break;
    default:
      frameworkPrompt = STANLEY_FRAMEWORK;
  }

  return `You are a LinkedIn content expert specializing in enterprise B2B content for financial services executives ONLY.

${COMPANY_CONTEXT}

${frameworkPrompt}

${CEO_PSYCHOLOGY}

${HUMANIZER_RULES}

=== HOOK CREATION RULES ===
Good hooks do this:
${HOOK_METHODOLOGY.goodHooks.map((h) => `- ${h}`).join("\n")}

Bad hooks look like this (AVOID):
${HOOK_METHODOLOGY.badHooks.map((h) => `- ${h}`).join("\n")}

Hook formulas that work:
${Object.entries(HOOK_METHODOLOGY.formulas)
  .map(([key, val]) => `- ${key}: "${val}"`)
  .join("\n")}

Hook rules to remember:
${HOOK_METHODOLOGY.rules.map((r) => `- ${r}`).join("\n")}

=== POST LENGTH RULES ===
- ${POST_LENGTH_RULES.optimal}
- ${POST_LENGTH_RULES.minimum}
- ${POST_LENGTH_RULES.maximum}
- ${POST_LENGTH_RULES.reasoning}

=== IMAGE ENGAGEMENT RULES ===
Best performing image types:
${IMAGE_GUIDELINES.bestPerforming.map((i) => `- ${i}`).join("\n")}

Engagement boosters:
${IMAGE_GUIDELINES.engagementBoosters.map((i) => `- ${i}`).join("\n")}

Avoid these images:
${IMAGE_GUIDELINES.avoid.map((i) => `- ${i}`).join("\n")}

Generate posts that are 1,300-1,400 characters. Count characters carefully.`;
}

// ============================================================
// API ROUTE HANDLER - POST
// ============================================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, framework, bucket, tone, action } = body;

    // Handle image prompt generation
    if (action === "generate-image-prompt") {
      const { postContent } = body;

      if (!postContent) {
        return NextResponse.json(
          { error: "Post content is required for image prompt generation" },
          { status: 400 }
        );
      }

      const imagePromptResponse = await fetch(
        "https://token-plan-sgp.xiaomimimo.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MIMO_API_KEY}`,
          },
          body: JSON.stringify({
            model: "mimo-v2-omni",
            messages: [
              { role: "system", content: IMAGE_PROMPT_SYSTEM },
              {
                role: "user",
                content: `Create an image prompt for this LinkedIn post:\n\n${postContent}\n\nTarget audience: CEOs of financial services firms in Hong Kong/Asia.\nCompany: IntegrAlting (enterprise AI for finance)`,
              },
            ],
            max_tokens: 300,
            temperature: 0.7,
          }),
        }
      );

      const imageData = await imagePromptResponse.json();
      const imagePrompt = imageData.choices?.[0]?.message?.content || "";

      return NextResponse.json({ imagePrompt });
    }

    // Handle post generation (default)
    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const selectedFramework = framework || "stanley";
    const systemPrompt = buildSystemPrompt(selectedFramework);

    const userPrompt = `Create a LinkedIn post about: ${topic}

${bucket ? `Content bucket: ${bucket} (Growth/Authority/Conversion)` : ""}
${tone ? `Tone: ${tone}` : "Tone: Direct, opinionated, peer-to-peer"}

WRITING THIS POST - FOLLOW VIVIN'S VOICE EXACTLY:

OPENING (pick one):
- Contrarian: "Most people think X. It's not."
- Hot take: "Everyone's talking about X. That's not the real story."
- Challenge: "If you think X? Think again."
- Four punchy fragments: "X. Y. Z. Just [result]."

BODY:
- Short paragraphs (1-2 sentences max) with line breaks
- Use numbered lists with bold headlines when listing points
- Include specific numbers ($, %, timeframes)
- Name real firms when relevant (Citadel, BlackRock, Goldman Sachs)
- Bridge abstract to practical: "In business, this means..."

CLOSING (pick one):
- Question: "What's one [X] that changed how you [Y]?"
- CTA: "DM me. I'd love to hear..."
- Choice: "You have a choice. Continue X. Or start today with Y."
NEVER end with a summary paragraph.

NO GYAAN:
- Don't lecture or teach. Share experiences, not instructions.
- Observations > Advice. Stories > Lessons.
- Write like talking to a friend, not presenting at a conference.

ABSOLUTE RULES:
1. FINANCE ONLY - no legal, no law firms, no lawyers
2. NEVER fake experiences or statistics - no "I interviewed 10 people" or "50 executives said"
3. Only use real stories from PERSONAL STORY ASSETS
4. Keep it 1,300-1,400 characters
5. Max 1-2 emojis
6. End with 3-5 hashtags
7. Mobile-first: lots of line breaks, short paragraphs

Generate the post now.`;

    const response = await fetch(
      "https://token-plan-sgp.xiaomimimo.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MIMO_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mimo-v2-omni",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          max_tokens: 1000,
          temperature: 0.8,
        }),
      }
    );

    const data = await response.json();
    console.log("API response:", data);

    if (!response.ok) {
      console.error("API error:", data);
      return NextResponse.json(
        { error: "Generation failed", details: data },
        { status: 500 }
      );
    }

    const generatedText = data.choices?.[0]?.message?.content || "";

    if (!generatedText) {
      return NextResponse.json(
        { error: "Generation failed - empty response", details: data },
        { status: 500 }
      );
    }

    // HUMANIZER AUDIT PASS - Remove fabricated content before returning
    const auditResponse = await fetch(
      "https://token-plan-sgp.xiaomimimo.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MIMO_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mimo-v2-omni",
          messages: [
            {
              role: "system",
              content: `You are a strict editor auditing LinkedIn posts for authenticity.

YOUR JOB: Find and remove ALL fabricated content. Return the cleaned post.

ABSOLUTE RULES:
1. REMOVE any invented story, scenario, or anecdote that didn't actually happen
   - Examples of FAKE: "$47M meeting nobody recorded", "A fund manager told me", "I asked 5 wealth managers", "A bank CEO said", "One client shared", "An executive told me", "Imagine you're in a meeting where..."
   - These are FICTION. Remove them entirely.

2. REMOVE any fabricated statistics or survey data
   - Examples: "I interviewed 10 professionals", "50 executives said", "80% of fund managers agree"
   - If it's not from a real cited source (McKinsey, SEC, published research), it's fake.

3. REMOVE vague attributions that hide fabrication
   - "Industry leaders say", "Experts agree", "Many professionals have noticed"
   - Replace with: state as opinion ("I've noticed", "In my view") or remove

4. KEEP only:
   - Real personal stories from the original prompt's PERSONAL STORY ASSETS
   - Opinions framed as opinions ("I think...", "In my experience...")
   - References to real, publicly known companies (Citadel, BlackRock, etc.) as examples, not as attributed quotes
   - Real published data with sources

5. After removing fake content, tighten the post so it still flows naturally.
   - Don't leave gaps or broken transitions
   - The post should read as if the fake content was never there

6. If the entire post is built on a fake premise, strip the fake hook/scenario and rebuild around whatever real point it was trying to make.

OUTPUT: Return ONLY the cleaned post text. No commentary, no explanation.`
            },
            {
              role: "user",
              content: `Audit this LinkedIn post for fabricated content. Remove all fake stories, invented statistics, and made-up scenarios:\n\n${generatedText}`,
            },
          ],
          max_tokens: 1000,
          temperature: 0.3,
        }),
      }
    );

    const auditData = await auditResponse.json();
    const auditedText = auditData.choices?.[0]?.message?.content || generatedText;

    // Auto-generate image prompt for the post
    const imagePromptResponse = await fetch(
      "https://token-plan-sgp.xiaomimimo.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MIMO_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mimo-v2-omni",
          messages: [
            { role: "system", content: IMAGE_PROMPT_SYSTEM },
            {
              role: "user",
              content: `Create an image prompt for this LinkedIn post:\n\n${auditedText}\n\nTarget audience: CEOs of financial services firms.\nCompany: IntegrAlting (enterprise AI for finance)`,
            },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      }
    );

    const imageData = await imagePromptResponse.json();
    const imagePrompt = imageData.choices?.[0]?.message?.content || "";

    return NextResponse.json({
      post: auditedText,
      imagePrompt: imagePrompt,
    });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
