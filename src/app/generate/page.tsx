"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [framework, setFramework] = useState("stanley");
  const [bucket, setBucket] = useState("");
  const [post, setPost] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePost = async () => {
    if (!topic) return;
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, framework, bucket }),
      });

      const data = await res.json();
      if (data.post) {
        setPost(data.post);
        setImagePrompt(data.imagePrompt || "");
      }
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Generate LinkedIn Post</h1>

        <div className="space-y-6">
          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              What's your post about?
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Why on-premise AI is crucial for financial firms handling sensitive client data"
              className="w-full p-4 bg-slate-800 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none resize-none"
              rows={3}
            />
          </div>

          {/* Framework Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Framework</label>
            <div className="flex gap-3">
              {["stanley", "brandon", "daniel"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFramework(f)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    framework === f
                      ? "bg-blue-600"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Bucket Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Content Bucket (optional)
            </label>
            <div className="flex gap-3">
              {["Growth", "Authority", "Conversion"].map((b) => (
                <button
                  key={b}
                  onClick={() => setBucket(bucket === b ? "" : b)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    bucket === b
                      ? "bg-green-600"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePost}
            disabled={loading || !topic}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
          >
            {loading ? "Generating..." : "Generate Post"}
          </button>
        </div>

        {/* Generated Post */}
        {post && (
          <div className="mt-8 space-y-4">
            <div className="p-6 bg-slate-800 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Generated Post</h2>
                <button
                  onClick={() => copyToClipboard(post)}
                  className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm"
                >
                  Copy
                </button>
              </div>
              <p className="whitespace-pre-wrap text-slate-200">{post}</p>
              <p className="mt-4 text-sm text-slate-400">
                {post.length} characters
              </p>
            </div>

            {/* Image Prompt */}
            {imagePrompt && (
              <div className="p-6 bg-slate-800 rounded-xl border border-purple-500/30">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-purple-400">
                    🖼️ Image Prompt
                  </h2>
                  <button
                    onClick={() => copyToClipboard(imagePrompt)}
                    className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-slate-300">{imagePrompt}</p>
                <p className="mt-4 text-xs text-slate-500">
                  Use this prompt with your preferred image generation tool
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
