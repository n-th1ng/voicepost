"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SavedPost {
  id: string;
  topic: string;
  framework: string;
  bucket: string;
  post: string;
  imagePrompt: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [posts, setPosts] = useState<SavedPost[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("voicepost_history");
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  const deletePost = (id: string) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem("voicepost_history", JSON.stringify(updated));
  };

  const clearAll = () => {
    if (confirm("Delete all saved posts?")) {
      setPosts([]);
      localStorage.removeItem("voicepost_history");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Post History</h1>
          <p className="text-slate-400 text-sm">
            {posts.length === 0
              ? "No posts yet"
              : `${posts.length} post${posts.length !== 1 ? "s" : ""} saved`}
          </p>
        </div>
        <div className="flex gap-2">
          {posts.length > 0 && (
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm text-red-400 hover:text-red-300 bg-red-400/10 rounded-lg"
            >
              Clear All
            </button>
          )}
          <Link
            href="/generate"
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            + New Post
          </Link>
        </div>
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="p-12 bg-slate-900 border border-slate-800 rounded-xl text-center">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-slate-400 mb-4">Your generated posts will appear here</p>
          <Link
            href="/generate"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl"
          >
            Generate Your First Post
          </Link>
        </div>
      )}

      {/* Post List */}
      <div className="space-y-4">
        {posts.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-slate-900 border border-slate-800 rounded-xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-slate-200">
                  {item.topic.substring(0, 80)}
                  {item.topic.length > 80 ? "..." : ""}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded capitalize">
                    {item.framework}
                  </span>
                  {item.bucket && (
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded">
                      {item.bucket}
                    </span>
                  )}
                  <span className="text-xs text-slate-500">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deletePost(item.id)}
                className="text-slate-500 hover:text-red-400 p-1"
              >
                ✕
              </button>
            </div>

            {/* Post Content */}
            <div className="p-4 bg-slate-950/50 rounded-lg mb-3">
              <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                {item.post}
              </p>
            </div>

            {/* Image Prompt */}
            {item.imagePrompt && (
              <div className="p-3 bg-purple-500/5 border border-purple-500/20 rounded-lg mb-3">
                <div className="text-xs text-purple-400 mb-1">Image Prompt</div>
                <p className="text-slate-400 text-xs">{item.imagePrompt}</p>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{item.post.length} chars</span>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(item.post)}
                  className="text-xs text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded"
                >
                  Copy Post
                </button>
                {item.imagePrompt && (
                  <button
                    onClick={() => copyToClipboard(item.imagePrompt)}
                    className="text-xs text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded"
                  >
                    Copy Prompt
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
