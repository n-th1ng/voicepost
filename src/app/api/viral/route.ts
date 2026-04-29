import { NextRequest, NextResponse } from "next/server";
import { MIMO_API_KEY } from "@/lib/env";

const VIRAL_SYSTEM_PROMPT = `You are a viral content strategist specializing in LinkedIn posts for finance executives.

Your job: Given a topic, generate 5 viral-worthy angles with hooks, explanations, and outlines.

FINANCE ONLY - Never mention legal, law firms, lawyers, or anything legal-related.

VIRAL HOOK PATTERNS THAT WORK:
1. Contrarian Take - Challenge what everyone believes
2. Stop/Start - "Stop doing X. Start doing Y."
3. Personal Story - "I made this mistake so you don't have to"
4. Data Shock - Surprising statistic that reframes the topic
5. Call Out - "Most [role] are doing this wrong"
6. Prediction - "X will be gone in 2 years"
7. Behind the Scenes - What really happens at [companies]
8. Mistake Confession - "I wasted 3 years doing this"

VIRALITY FACTORS:
- Creates debate or strong opinion
- Makes people tag others ("@someone needs to see this")
- Offers contrarian view to common belief
- Specific and actionable (not generic)
- Makes finance execs feel seen/understood
- Creates FOMO or urgency

OUTPUT FORMAT (JSON):
Return ONLY valid JSON, no markdown, no explanation:
{
  "ideas": [
    {
      "hook": "First line that stops the scroll",
      "angle": "2-3 sentence explanation of the angle and why it works",
      "whyItWorks": "Psychology behind why this hooks finance execs",
      "outline": ["Hook", "Story/Setup", "Point 1", "Point 2", "CTA"],
      "viralityScore": 8
    }
  ]
}

Rules:
- Generate exactly 5 ideas
- Each hook must be under 15 words
- Virality score 1-10 based on debate potential, shareability, emotional response
- Ideas must be REAL and AUTHENTIC - no fake statistics, no fabricated experiences
- Focus on finance: fund managers, wealth managers, bank execs, CFOs, COOs
- Keep hooks punchy, opinionated, human`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic } = body;

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

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
            { role: "system", content: VIRAL_SYSTEM_PROMPT },
            {
              role: "user",
              content: `Generate 5 viral LinkedIn post ideas about: ${topic}\n\nTarget audience: Finance executives (fund managers, wealth managers, bank execs, CFOs).\nCompany: IntegrAlting (enterprise AI for finance).\n\nRemember: Finance ONLY. No legal. No fake experiences. No invented statistics.`,
            },
          ],
          max_tokens: 1500,
          temperature: 0.9,
        }),
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      console.error("API error:", data);
      return NextResponse.json(
        { error: "Generation failed", details: data },
        { status: 500 }
      );
    }

    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse the JSON from the response
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : content;
      const ideas = JSON.parse(jsonStr);
      return NextResponse.json(ideas);
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Raw content:", content);
      return NextResponse.json(
        { error: "Failed to parse ideas", raw: content },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
