import { NextRequest, NextResponse } from "next/server";

const MIMO_API_KEY = process.env.MIMO_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { topic, notes, dayType, dayName } = await req.json();

    if (!MIMO_API_KEY) {
      return NextResponse.json({ suggestions: "API key not configured" });
    }

    const prompt = `You are a LinkedIn content strategist helping improve a post idea.

Day: ${dayName} (${dayType} bucket)
Topic: ${topic}
Existing notes: ${notes || "none"}

The ${dayType} bucket means:
- TOFU: Broad appeal, universal lesson, contrarian view
- MOFU: Specific audience problem, how-to, frameworks
- BOFU: Case study, results, specific proof

Provide 3-4 specific suggestions to improve this post idea:
1. A stronger hook (first line that stops the scroll)
2. A story angle or personal experience to include
3. A specific CTA that fits the ${dayType} bucket
4. Any hashtags that would work well

Keep suggestions concise and actionable. Use positive framing — never criticize firms or compliance teams. The audience is CEOs of mid-size finance firms and law firm partners in Hong Kong.

Format your response as clear, numbered suggestions.`;

    const res = await fetch("https://token-plan-sgp.xiaomimimo.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MIMO_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mimo-v2-omni",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("MIMO API error:", JSON.stringify(data));
      return NextResponse.json({ suggestions: "Failed to generate suggestions" });
    }

    const suggestions = data.choices?.[0]?.message?.content || "No suggestions generated";
    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error("Improve route error:", err);
    return NextResponse.json({ suggestions: "Error generating suggestions" });
  }
}
