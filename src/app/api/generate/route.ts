import { NextRequest, NextResponse } from "next/server";

const MIMO_API_KEY = process.env.XIAOMI_API_KEY || process.env.MIMO_API_KEY || "";

const TONE_RULES = `Tone rules:
- ALWAYS positive framing — never criticize firms, compliance teams, or competitors
- Say "new door opening" not "compliance blocking you"
- Semi-casual, direct, peer-to-peer
- Common phrases: "Here is...", "The key is...", "What this means is..."
- Short paragraphs, use lists over long paragraphs
- Hook in first line (8-12 words, tension-based)
- End with CTA
- 3-5 hashtags at end
- No markdown formatting

CRITICAL RULES:
- NEVER fabricate quotes or conversations with real people
- NEVER make up specific people, firms, or statistics
- ONLY mention Vivin's on-device AI story (Gemma on a 4-hour flight, debugged code in 30 seconds) if the topic is directly related to AI, privacy, offline capability, or technology
- Keep the post focused on the topic
- The post must be ABOUT the given topic from start to finish`;

const COMPANY_CONTEXT = `About the author: Vivin, founder of IntegrAlting — enterprise AI tools for finance/legal firms in Hong Kong. This context should only be mentioned if the topic naturally relates to AI, privacy, or technology.`;

const HUMANIZER_RULES = `
## HUMANIZER RULES — CRITICAL
You MUST apply these to every post. LinkedIn penalizes AI-sounding content.

### BANNED PATTERNS:
- Inflated language: Never use "stands as", "serves as", "is a testament to", "marks a pivotal moment", "underscores", "reflects broader trends", "symbolizing", "indelible mark", "evolving landscape". Use: "is", "was", "shows", "means".
- Promotional words: Never "groundbreaking", "nestled", "vibrant", "profound", "breathtaking", "stunning", "renowned", "showcasing", "exemplifies". Be specific instead.
- Superficial -ing endings: Never end with "highlighting that...", "underscoring the need for...", "reflecting a broader trend...", "contributing to...". Start a new sentence.
- AI vocabulary: Never "delve", "intricate", "tapestry", "interplay", "garner", "pivotal", "landscape", "crucial", "foster", "align with", "enhance", "testament", "vibrant", "underscore". Use simple words.
- Copula avoidance: Never "serves as", "stands as", "marks", "represents [a]", "boasts". Use "is" or "has".
- Rule of three: Don't force triplets. Use 2 or 4 items. Vary it.
- Negative parallelisms: Never "It's not just about X, it's about Y" or "Not only...but also". State the point directly.
- Em dashes: Max 1 per post. Use commas or periods instead.
- Vague attributions: Never "Industry experts say", "Observers note". Name sources or say "I've seen".
- Filler phrases: Never "In order to", "Due to the fact that", "At this point in time", "It is important to note that". Use "To", "Because", "Now", "The data shows".
- Chatbot artifacts: Never "Great question!", "I hope this helps!", "Let me know if you'd like me to expand". Just write the content.
- Signposting: Never "Let's dive in", "Let's explore", "Here's what you need to know". Just start.
- Generic endings: Never "The future looks bright", "Exciting times lie ahead". End with a specific next step.
- Hedging: Never "It could potentially possibly be argued that". Use "may affect".
- Bold/emoji overuse: Max 1-2 bold phrases. Max 1 emoji total, preferably none.
- Hyphenated compounds: Don't over-hyphenate "cross-functional", "data-driven", "client-facing".

### VOICE RULES:
1. Vary sentence length. Mix short punchy with longer. Never 3 same-length in a row.
2. Have opinions. React, don't just report.
3. Use first person. "I" is honest, not unprofessional.
4. Acknowledge complexity. "This works, but there's a catch."
5. Be specific. Not "this is concerning" but a real example.
6. Let some mess in. Tangents and asides are human.
7. Talk to one person, not broadcasting.
8. End mid-thought sometimes. Not every post needs a neat conclusion.

### FINAL CHECK: Would a busy CEO write this on LinkedIn at 7am before their first meeting? If it sounds like a press release, rewrite it.`;

function getPrompt(framework: string, topic: string, bucket: string): string {
  const baseRules = `${TONE_RULES}\n\n${HUMANIZER_RULES}`;

  if (framework === "brandon") {
    return `Write a ${bucket} bucket LinkedIn post ABOUT THIS TOPIC: ${topic}

The entire post must be about "${topic}". Do not drift to unrelated subjects.

${COMPANY_CONTEXT}

Bucket guidelines:
- Growth: Broad appeal, universal lesson, contrarian view
- Authority: Systems breakdown, how-to, your expertise
- Conversion: Case study, results, specific proof

${baseRules}`;
  }

  if (framework === "daniel") {
    return `Write a LinkedIn post using Daniel Korenblum 7-step inbound framework ABOUT THIS TOPIC: ${topic}

The entire post must be about "${topic}".

${COMPANY_CONTEXT}

Structure:
1. HOOK - Call out ideal client, challenge a belief (8-12 words)
2. RESONANCE - Show understanding from firsthand experience
3. PROBLEM - Diagnose root cause
4. CONSEQUENCE - Show cost of inaction
5. EVIDENCE - Show transformation with specific result
6. AGITATION - Force binary choice
7. CTA - Restate who you help, end with keyword DM

${baseRules}`;
  }

  // Default: Stanley
  return `Write a LinkedIn post using Stanley 8-step framework ABOUT THIS TOPIC: ${topic}

The entire post must be about "${topic}". Every section — hook, story, insight, value — should revolve around this topic.

${COMPANY_CONTEXT}

Structure:
1. Hook (8-12 words, tension-based)
2. Story (start mid-scene, one story one lesson)
3. Insight (what this means for the audience)
4. Value (actionable takeaway)
5. CTA (question or keyword reply)

${baseRules}`;
}

export async function POST(req: NextRequest) {
  try {
    const { framework, topic, bucket } = await req.json();

    if (!MIMO_API_KEY) {
      console.error("MIMO_API_KEY is not set");
      return NextResponse.json({ post: "Generation failed", error: "MIMO_API_KEY not configured" });
    }

    if (!topic) {
      return NextResponse.json({ post: "Generation failed", error: "No topic provided" });
    }

    const prompt = getPrompt(framework || "stanley", topic, bucket || "growth");

    const res = await fetch("https://token-plan-sgp.xiaomimimo.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MIMO_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mimo-v2-omni",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("MIMO API error:", JSON.stringify(data));
      return NextResponse.json({ post: "Generation failed", error: data });
    }

    const post = data.choices?.[0]?.message?.content || "Generation failed";
    return NextResponse.json({ post });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json({ post: "Generation failed", error: String(err) });
  }
}
