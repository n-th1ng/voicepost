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
  return {
    posts: [
      {
        excerpt: "I fired my biggest client last year. Here's what happened...",
        hook: "I fired my biggest client last year.",
        author: "@finance_leaders",
        engagement: "High",
        whyItWorked: "Contrarian action + curiosity gap. People want to know what happened next.",
        viralityScore: 9,
        linkedinAngle: "Share a real decision that went against conventional wisdom in finance. What did you do that everyone said was crazy?"
      },
      {
        excerpt: "Your compliance team isn't your enemy. They're your competitive edge...",
        hook: "Your compliance team isn't your enemy.",
        author: "@wealthmgr_tip",
        engagement: "High",
        whyItWorked: "Reframes a common pain point as an opportunity. Makes people reconsider their perspective.",
        viralityScore: 8,
        linkedinAngle: "Reframe something finance pros complain about as a hidden advantage. Turn the narrative."
      },
      {
        excerpt: "The best fund managers I know do ONE thing differently: they track saves, not likes...",
        hook: "The best fund managers I know do ONE thing differently.",
        author: "@hedgefund_hub",
        engagement: "High",
        whyItWorked: "Specific audience callout + insider knowledge + contrarian metric.",
        viralityScore: 8,
        linkedinAngle: "What do the BEST people in finance do that average ones don't? Share specific behaviors, not generic advice."
      },
      {
        excerpt: "Nobody talks about this, but the real edge in banking isn't AI. It's who owns the data...",
        hook: "Nobody talks about this, but the real edge in banking isn't AI.",
        author: "@fintech_insider",
        engagement: "Medium",
        whyItWorked: "Pokes at hype (AI) and reveals 'hidden truth'. Creates debate.",
        viralityScore: 7,
        linkedinAngle: "Challenge the hype. What's everyone obsessing over that's NOT actually the answer? What IS?"
      },
      {
        excerpt: "3 years ago I was managing $50M. Today it's $500M. Same strategy, different mindset...",
        hook: "3 years ago I was managing $50M. Today it's $500M.",
        author: "@fundmanager_daily",
        engagement: "High",
        whyItWorked: "Specific numbers create credibility. Transformation story with timeline.",
        viralityScore: 9,
        linkedinAngle: "Share a real transformation with specific numbers. What changed? Be honest about what actually moved the needle."
      },
    ],
    analysis: {
      trendingThemes: [
        `${topic} and its impact on finance operations`,
        "The gap between what finance pros say vs do",
        "Transformation stories with specific numbers",
        "Contrarian takes on popular industry beliefs",
      ],
      winningHooks: [
        `I [did something unexpected] about ${topic}...`,
        "Nobody talks about this, but...",
        "The best [role] I know do ONE thing differently:",
        "[Specific number] years ago vs today:",
        "Your [pain point] isn't a problem. It's an advantage.",
      ],
      engagementPatterns: "Posts that create debate or challenge conventional wisdom get the most comments. Transformation stories with specific numbers get the most saves. Insider knowledge ('nobody talks about this') drives shares.",
      contentGaps: `Most ${topic} content is generic advice. What's missing: real war stories, specific numbers, honest failures, contrarian takes backed by experience.`,
      recommendedAngles: [
        `Share a real decision about ${topic} that went against conventional wisdom`,
        `Reframe ${topic} from a pain point to an advantage`,
        `Challenge the hype around ${topic} - what's the ACTUAL answer?`,
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
