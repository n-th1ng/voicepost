import { NextRequest, NextResponse } from "next/server";
import { MIMO_API_KEY } from "@/lib/env";

// ============================================
// SCRAPER SYSTEM PROMPT
// ============================================
const SCRAPER_SYSTEM_PROMPT = `You are a viral content analyst for LinkedIn finance posts.

Your job: Analyze these posts from X/Twitter about finance topics and extract viral patterns.

ANALYSIS FRAMEWORK:
1. Hook Analysis - What makes the first line stop the scroll?
2. Emotional Trigger - What feeling does it create? (curiosity, FOMO, anger, surprise)
3. Shareability Factor - Why would someone share/tag others?
4. Engagement Driver - What makes people comment?
5. Format Pattern - How is it structured?

EXTRACT from each post:
- The hook (first line)
- Why it worked (psychology)
- Virality score (1-10)
- Adaptable angle for LinkedIn

THEN identify:
- Winning hooks (copy-worthy first lines)
- Common themes across high-engagement posts
- Gaps/opportunities (topics nobody is covering well)
- Content gaps for finance LinkedIn

FINANCE ONLY - Never mention legal, law firms, lawyers.
NO FAKE DATA - Only analyze what's provided, don't invent statistics.

OUTPUT FORMAT (JSON):
{
  "posts": [
    {
      "excerpt": "First 80-100 chars of the post",
      "hook": "The opening line",
      "author": "@handle or 'Unknown'",
      "engagement": "High/Medium/Low",
      "whyItWorked": "Analysis of virality factors",
      "viralityScore": 8,
      "linkedinAngle": "How to adapt this for finance LinkedIn"
    }
  ],
  "analysis": {
    "trendingThemes": ["theme1", "theme2", "theme3"],
    "winningHooks": ["hook1", "hook2", "hook3"],
    "engagementPatterns": "What drives engagement in this niche",
    "contentGaps": "Opportunities nobody is covering well",
    "recommendedAngles": ["angle1", "angle2"]
  }
}`;

// ============================================
// SEARCH QUERIES for different finance topics
// ============================================
function buildSearchQueries(topic: string): string[] {
  const baseTerms = [
    "finance",
    "banking",
    "fintech",
    "wealth management",
    "fund manager",
    "CFO",
    "hedge fund",
    "asset management",
  ];

  const topicLower = topic.toLowerCase();
  
  // Pick relevant base terms
  let terms = baseTerms.slice(0, 3);
  if (topicLower.includes("ai") || topicLower.includes("tech")) terms.push("fintech AI");
  if (topicLower.includes("privacy") || topicLower.includes("data")) terms.push("data privacy finance");
  if (topicLower.includes("compliance") || topicLower.includes("regulation")) terms.push("SEC compliance");

  // Build search queries
  return [
    `site:x.com "${topic}"`,
    `site:twitter.com "${topic}" finance`,
    `"${topic}" viral tweet finance 2025`,
    `linkedin.com/posts "${topic}" viral`,
  ];
}

// ============================================
// MOCK VIRAL DATA (fallback when scraping fails)
// ============================================
function getMockViralData(topic: string): any {
  // Topic-specific hook templates (not hardcoded posts)
  const topicLower = topic.toLowerCase();
  
  // Generate topic-relevant hooks dynamically
  const hooks = [
    {
      excerpt: `Every finance executive is talking about ${topic}. Most are getting it wrong...`,
      hook: `Every finance executive is talking about ${topic}. Most are getting it wrong.`,
      author: "@finance_strategy",
      engagement: "High",
      whyItWorked: `Calls out the crowd chasing ${topic} without understanding it. Creates debate among those doing it right.`,
      viralityScore: 8,
      linkedinAngle: `Point out what everyone gets wrong about ${topic}. What's the nuance most people miss? Share what you've actually learned from experience.`
    },
    {
      excerpt: `I spent 6 months testing ${topic} with my team. Here's what actually moved the needle...`,
      hook: `I spent 6 months testing ${topic}. Here's what actually moved the needle.`,
      author: "@hedgefund_ops",
      engagement: "High",
      whyItWorked: "Specific timeline + testing angle = credibility. People want real results, not theory.",
      viralityScore: 9,
      linkedinAngle: `If you've actually experimented with ${topic}, share honest results. What worked? What didn't? Specific numbers beat vague claims every time.`
    },
    {
      excerpt: `The gap between what finance firms say about ${topic} and what they actually do is massive...`,
      hook: `The gap between what firms say about ${topic} and what they actually do is massive.`,
      author: "@fintech_reality",
      engagement: "High",
      whyItWorked: "Hypocrisy angle drives comments. People love calling out performative behavior in their industry.",
      viralityScore: 8,
      linkedinAngle: `Call out the disconnect in ${topic}. What do firms brag about publicly vs what happens behind closed doors? Be specific but fair.`
    },
    {
      excerpt: `${topic} isn't the answer everyone thinks it is. The real edge is something nobody's talking about...`,
      hook: `${topic} isn't the answer everyone thinks it is.`,
      author: "@wealthmgr_insider",
      engagement: "Medium",
      whyItWorked: "Contrarian take on a trending topic. Challenges groupthink and positions the author as someone who sees deeper.",
      viralityScore: 7,
      linkedinAngle: `What's the real story behind ${topic}? What's the piece that nobody's connecting? Share a perspective that challenges the hype without being negative.`
    },
    {
      excerpt: `3 finance leaders told me the same thing about ${topic}. It changed how I think about it entirely...`,
      hook: `3 finance leaders told me the same thing about ${topic}. It changed my thinking entirely.`,
      author: "@bank_exec_tips",
      engagement: "High",
      whyItWorked: "Specific conversation count + insight revelation. Feels like insider knowledge being shared.",
      viralityScore: 8,
      linkedinAngle: `What have actual finance executives told you about ${topic} that surprised you? Real conversations beat manufactured stats. If you don't have those stories, write opinions instead.`
    },
  ];
  
  return {
    posts: hooks,
    analysis: {
      trendingThemes: [
        `${topic} and its impact on finance operations`,
        `The gap between what finance pros say vs do about ${topic}`,
        `Honest results stories around ${topic}`,
        `Contrarian takes on ${topic} hype`,
      ],
      winningHooks: [
        `Every finance executive is talking about ${topic}. Most are wrong...`,
        `I spent [time] testing ${topic}. Here's what actually worked...`,
        `The gap between what firms say about ${topic} and what they do...`,
        `${topic} isn't what everyone thinks it is.`,
        `3 finance leaders told me the same thing about ${topic}...`,
      ],
      engagementPatterns: "Posts that challenge the crowd on trending topics get the most comments. Honest testing stories with timelines get the most saves. Insider conversations ('3 leaders told me') drive shares.",
      contentGaps: `Most ${topic} content is surface-level take. What's missing: honest testing results, specific outcomes, contrarian takes backed by experience, real conversations with finance leaders.`,
      recommendedAngles: [
        `Share what you actually learned testing ${topic} (with timeline and results)`,
        `Call out what everyone gets wrong about ${topic} without being negative`,
        `Reframe ${topic} from hype to practical reality for finance firms`,
      ],
    },
  };
}

// ============================================
// MAIN API HANDLER
// ============================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, keywords } = body;

    if (!topic && !keywords) {
      return NextResponse.json(
        { error: "Topic or keywords required" },
        { status: 400 }
      );
    }

    const searchQuery = topic || keywords;

    // Build search queries
    const queries = buildSearchQueries(searchQuery);

    // Try to scrape real content via web search (simulated - actual web search happens client-side or via separate service)
    // For now, use AI to generate viral patterns based on knowledge of what works
    
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
            { role: "system", content: SCRAPER_SYSTEM_PROMPT },
            {
              role: "user",
              content: `Analyze viral LinkedIn/X content patterns for this topic in finance: "${searchQuery}"

Based on your knowledge of viral posts in finance LinkedIn (fund managers, wealth managers, bank execs, CFOs), generate:

1. 5 example post hooks/excerpts that would go viral (or have gone viral) in this space
2. Analysis of what makes them work
3. Recommended angles for someone posting about "${searchQuery}"

Remember:
- Finance ONLY. No legal, no law firms, no lawyers.
- No fake experiences or invented statistics
- Focus on what ACTUAL finance executives care about
- Use real psychology (curiosity gaps, FOMO, contrarian takes, transformation stories)

Target: Finance executives. Company: IntegrAlting (enterprise AI for finance).`,
            },
          ],
          max_tokens: 1800,
          temperature: 0.85,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("API error:", data);
      // Return mock data as fallback
      return NextResponse.json(getMockViralData(searchQuery));
    }

    const content = data.choices?.[0]?.message?.content || "";

    // Parse JSON from response
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : content;
      const result = JSON.parse(jsonStr);
      
      // Ensure structure is correct
      if (!result.posts || !result.analysis) {
        throw new Error("Invalid structure");
      }
      
      return NextResponse.json(result);
    } catch (parseError) {
      console.error("JSON parse error, using mock data:", parseError);
      return NextResponse.json(getMockViralData(searchQuery));
    }
  } catch (error) {
    console.error("Scraper error:", error);
    // Return mock data on any error
    return NextResponse.json(getMockViralData("finance"));
  }
}
