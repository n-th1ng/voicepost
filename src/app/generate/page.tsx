"use client";

import { useState } from "react";
import Link from "next/link";

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [framework, setFramework] = useState("stanley");
  const [bucket, setBucket] = useState("");
  const [post, setPost] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const saveToHistory = (generatedPost: string, generatedImagePrompt: string) => {
    const history = JSON.parse(localStorage.getItem("voicepost_history") || "[]");
    const newItem = {
      id: Date.now().toString(),
      topic,
      framework,
      bucket,
      post: generatedPost,
      imagePrompt: generatedImagePrompt,
      createdAt: new Date().toISOString(),
    };
    history.unshift(newItem);
    localStorage.setItem("voicepost_history", JSON.stringify(history));
  };

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
        saveToHistory(data.post, data.imagePrompt || "");
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
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Generate Post</h1>
        <p className="text-slate-400">Create scroll-stopping LinkedIn content</p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            What's your post about?
          </label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Why on-premise AI is crucial for financial firms handling sensitive client data"
            className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl focus:border-blue-500 focus:outline-none resize-none placeholder-slate-600"
            rows={3}
          />
        </div>

        {/* Framework */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Framework
          </label>
          <div className="flex gap-2">
            {[
              { id: "stanley", label: "Stanley", desc: "8-step growth" },
              { id: "brandon", label: "Brandon", desc: "3-bucket strategy" },
              { id: "daniel", label: "Daniel", desc: "7-step inbound" },
              { id: "bridge", label: "Bridge", desc: "Tech → Finance" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFramework(f.id)}
                className={`flex-1 p-3 rounded-xl border text-left transition-all ${
                  framework === f.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-800 bg-slate-900 hover:border-slate-700"
                }`}
              >
                <div className="font-medium">{f.label}</div>
                <div className="text-xs text-slate-500">{f.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Bucket */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Content Bucket
          </label>
          <div className="flex gap-2">
            {[\"Growth\", \"Authority\", \"Conversion\", \"Bridge\"].map((b) => (
              <button
                key={b}
                onClick={() => setBucket(bucket === b ? "" : b)}
                className={`flex-1 py-2 px-4 rounded-lg border text-sm transition-all ${
                  bucket === b
                    ? "border-green-500 bg-green-500/10 text-green-400"
                    : "border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-400"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          {framework === "bridge" && (
            <p className="text-xs text-slate-500 mt-2">
              💡 Bridge = Tech builders + Finance execs. Start 60/40, shift over time.
            </p>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePost}
          disabled={loading || !topic}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded-xl font-medium transition-colors"
        >
          {loading ? "Generating..." : "Generate Post"}
        </button>
      </div>

      {/* Results */}
      {post && (
        <div className="space-y-4">
          {/* Post */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Generated Post</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                  Saved ✓
                </span>
                <button
                  onClick={() => copyToClipboard(post)}
                  className="text-sm text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg"
                >
                  Copy
                </button>
              </div>
            </div>
            <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">{post}</p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-sm text-slate-500">
              <span>{post.length} characters</span>
              <span>{post.split(/\s+/).length} words</span>
            </div>
          </div>

          {/* Image Prompt */}
          {imagePrompt && (
            <div className="p-6 bg-slate-900 border border-purple-500/30 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-purple-400">Image Prompt</h2>
                <button
                  onClick={() => copyToClipboard(imagePrompt)}
                  className="text-sm text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-lg"
                >
                  Copy
                </button>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{imagePrompt}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setPost("");
                setImagePrompt("");
              }}
              className="flex-1 py-3 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              Generate Another
            </button>
            <Link
              href="/history"
              className="flex-1 py-3 border border-slate-800 rounded-xl text-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              View History →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
