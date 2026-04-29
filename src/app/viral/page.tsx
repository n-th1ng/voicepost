"use client";

import { useState } from "react";
import Link from "next/link";

interface ScrapedPost {
  excerpt: string;
  hook: string;
  author: string;
  engagement: string;
  whyItWorked: string;
  viralityScore: number;
  linkedinAngle: string;
}

interface ViralAnalysis {
  trendingThemes: string[];
  winningHooks: string[];
  engagementPatterns: string;
  contentGaps: string;
  recommendedAngles: string[];
}

interface ViralIdea {
  hook: string;
  angle: string;
  whyItWorks: string;
  outline: string[];
  viralityScore: number;
  generatedPost?: string;
  imagePrompt?: string;
}

export default function ViralPage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrapedPosts, setScrapedPosts] = useState<ScrapedPost[]>([]);
  const [analysis, setAnalysis] = useState<ViralAnalysis | null>(null);
  const [generatedPosts, setGeneratedPosts] = useState<Record<number, string>>({});
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);

  const trendingTopics = [
    "AI replacing jobs in finance",
    "SEC crackdown on AI trading",
    "Why banks are hoarding data",
    "The death of the fund manager",
    "On-premise vs cloud for compliance",
    "How I use AI daily (real workflow)",
    "What hedge funds get wrong about privacy",
    "The compliance advantage nobody talks about",
  ];

  const findViralAngles = async () => {
    if (!topic) return;
    setLoading(true);
    setScrapedPosts([]);
    setAnalysis(null);
    setGeneratedPosts({});

    try {
      // First, scrape viral content patterns
      const scraperRes = await fetch("/api/scraper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const scraperData = await scraperRes.json();

      if (scraperData.posts) {
        setScrapedPosts(scraperData.posts);
        setAnalysis(scraperData.analysis);
      }
    } catch (error) {
      console.error("Failed to find viral angles:", error);
    } finally {
      setLoading(false);
    }
  };

  const generatePost = async (post: ScrapedPost, index: number) => {
    setGeneratingIndex(index);
    
    const fullTopic = `${post.linkedinAngle}. Based on hook: "${post.hook}"`;
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: fullTopic,
          framework: "stanley",
          bucket: "Authority",
        }),
      });
      const data = await res.json();
      
      if (data.post) {
        // Save to history
        const history = JSON.parse(localStorage.getItem("voicepost_history") || "[]");
        history.unshift({
          id: Date.now().toString(),
          topic: fullTopic,
          framework: "stanley",
          bucket: "Authority",
          post: data.post,
          imagePrompt: data.imagePrompt || "",
          createdAt: new Date().toISOString(),
          source: "viral",
          originalHook: post.hook,
        });
        localStorage.setItem("voicepost_history", JSON.stringify(history));
        
        setGeneratedPosts(prev => ({ ...prev, [index]: data.post }));
      }
    } catch (error) {
      console.error("Failed to generate post:", error);
    } finally {
      setGeneratingIndex(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">🔥 Viral Ideas</h1>
        <p className="text-slate-400">Find trending angles and viral hooks from X/Twitter for finance LinkedIn</p>
      </div>

      {/* Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            What do you want to post about?
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., AI privacy in banking, on-premise AI, fund manager workflow..."
              className="flex-1 p-4 bg-slate-900 border border-slate-800 rounded-xl focus:border-orange-500 focus:outline-none placeholder-slate-600"
              onKeyDown={(e) => e.key === "Enter" && findViralAngles()}
            />
            <button
              onClick={findViralAngles}
              disabled={loading || !topic}
              className="px-6 py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded-xl font-medium transition-colors whitespace-nowrap"
            >
              {loading ? "Scraping..." : "🔍 Find Viral Angles"}
            </button>
          </div>
        </div>

        {/* Trending Topics */}
        <div>
          <p className="text-xs text-slate-500 mb-2">Or pick a trending topic:</p>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  topic === t
                    ? "border-orange-500 bg-orange-500/10 text-orange-400"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4">
          <h2 className="font-semibold text-lg">📊 Viral Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-orange-400 mb-2">Trending Themes</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                {analysis.trendingThemes.map((theme, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-slate-500">•</span>
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-blue-400 mb-2">Winning Hook Patterns</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                {analysis.winningHooks.map((hook, i) => (
                  <li key={i} className="italic">&ldquo;{hook}&rdquo;</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-green-400 mb-2">What Drives Engagement</h3>
            <p className="text-sm text-slate-300">{analysis.engagementPatterns}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-purple-400 mb-2">Content Gaps (Your Opportunity)</h3>
            <p className="text-sm text-slate-300">{analysis.contentGaps}</p>
          </div>
        </div>
      )}

      {/* Scraped Posts */}
      {scrapedPosts.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">
            🎣 {scrapedPosts.length} Viral Hooks Found
            <span className="text-sm font-normal text-slate-500 ml-2">
              Click to generate a full post
            </span>
          </h2>

          <div className="grid gap-4">
            {scrapedPosts.map((post, i) => (
              <div
                key={i}
                className="p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-orange-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Hook */}
                    <p className="font-semibold text-white mb-1">&ldquo;{post.hook}&rdquo;</p>
                    
                    {/* Excerpt */}
                    <p className="text-sm text-slate-400 italic mb-2">{post.excerpt}</p>
                    
                    {/* Author & Engagement */}
                    <div className="flex gap-3 mb-3">
                      <span className="text-xs text-slate-500">{post.author}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        post.engagement === "High" 
                          ? "bg-green-500/10 text-green-400" 
                          : "bg-slate-800 text-slate-400"
                      }`}>
                        {post.engagement} engagement
                      </span>
                    </div>
                    
                    {/* Why it worked */}
                    <p className="text-sm text-slate-400 mb-3">{post.whyItWorked}</p>
                    
                    {/* LinkedIn Angle */}
                    <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                      <p className="text-xs text-orange-400 mb-1">LinkedIn Angle:</p>
                      <p className="text-sm text-slate-300">{post.linkedinAngle}</p>
                    </div>
                  </div>
                  
                  {/* Virality Score */}
                  <div className="flex-shrink-0 text-center">
                    <div
                      className={`text-2xl font-bold ${
                        post.viralityScore >= 8
                          ? "text-green-400"
                          : post.viralityScore >= 6
                          ? "text-yellow-400"
                          : "text-slate-400"
                      }`}
                    >
                      {post.viralityScore}
                    </div>
                    <div className="text-xs text-slate-500">/ 10</div>
                  </div>
                </div>

                {/* Generate / Generated Post */}
                <div className="mt-4 pt-4 border-t border-slate-800">
                  {generatedPosts[i] ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                          Generated ✓
                        </span>
                        <button
                          onClick={() => copyToClipboard(generatedPosts[i])}
                          className="text-sm text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg"
                        >
                          Copy Post
                        </button>
                      </div>
                      <p className="text-sm text-slate-300 whitespace-pre-wrap">
                        {generatedPosts[i]}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => generatePost(post, i)}
                      disabled={generatingIndex !== null}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        generatingIndex === i
                          ? "bg-orange-600/50 text-orange-300 cursor-wait"
                          : generatingIndex !== null
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                          : "bg-orange-600/10 text-orange-400 hover:bg-orange-600/20 border border-orange-500/30"
                      }`}
                    >
                      {generatingIndex === i ? "Generating..." : "✨ Generate Post from This Angle"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Refresh button */}
          <button
            onClick={findViralAngles}
            className="w-full py-3 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            🔍 Search Again with Different Angle
          </button>
        </div>
      )}

      {/* Empty State */}
      {scrapedPosts.length === 0 && !loading && (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-lg font-medium text-slate-300 mb-2">Find Your Next Viral Post</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            I&apos;ll scrape X/Twitter for viral finance content, analyze what hooks work, 
            and give you angles that finance LinkedIn loves. One click to generate a full post.
          </p>
        </div>
      )}
    </div>
  );
}
