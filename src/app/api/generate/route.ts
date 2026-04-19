import { NextRequest, NextResponse } from "next/server";

const MIMO_API_KEY = process.env.MIMO_API_KEY;

function getPrompt(framework: string, topic: string, bucket: string): string {
  if (framework === "brandon") {
    return `You are a LinkedIn content strategist. Write a ${bucket} bucket post about: ${topic}

Rules:
- ALWAYS positive framing, never criticize firms or competitors
- Say "new door opening" not "compliance blocking you"
- Semi-casual, direct, peer-to-peer tone
- Common phrases: "Here is...", "The key is...", "What this means is..."
- Short paragraphs, use lists
- Hook in first line (8-12 words, tension-based)
- End with CTA
- 3-5 hashtags at end
- No markdown formatting

Bucket guidelines:
- Growth: Broad appeal, universal lesson, contrarian view
- Authority: Systems breakdown, how-to, your expertise
- Conversion: Case study, results, specific proof`;
  }
  
  if (framework === "daniel") {
    return `You are writing a LinkedIn post using Daniel Korenblum 7-step inbound framework.

Structure:
1. HOOK - Call out ideal client, challenge a belief (8-12 words)
2. RESONANCE - Show understanding from firsthand experience
3. PROBLEM - Diagnose root cause, name mistakes without judgment
4. CONSEQUENCE - Show cost of inaction, add FOMO
5. EVIDENCE - Mirror pain, show transformation with specific result
6. AGITATION - Force binary choice, make gap vivid
7. CTA - Confirm situation, restate who you help, end with keyword DM

Topic: ${topic}

Rules:
- ALWAYS positive framing, never criticize firms or compliance
- "New door opening" not "compliance blocking you"
- Semi-casual, direct, peer-to-peer
- Common phrases: "Here is...", "The key is..."
- No markdown formatting
- 3-5 hashtags at end`;
  }
  
  // Default: Stanley
  return `You are a LinkedIn content strategist using Stanley 8-step framework. Write a post about: ${topic}

Follow this structure:
1. Hook (8-12 words, tension-based)
2. Story (start mid-scene, one story one lesson)
3. Insight (what this means for the audience)
4. Value (actionable takeaway)
5. CTA (question or keyword reply)

Rules:
- ALWAYS positive framing, never criticize
- Semi-casual, direct, confident
- Mix short and medium sentences
- Use lists over long paragraphs
- Peer-to-peer, not lecturing
- No markdown formatting
- 3-5 hashtags at end`;
}

export async function POST(req: NextRequest) {
  const { framework, topic, bucket } = await req.json();

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
  const post = data.choices?.[0]?.message?.content || "Generation failed";

  return NextResponse.json({ post });
}
