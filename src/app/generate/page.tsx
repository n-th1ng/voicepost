"use client";

import { useState } from "react";

const frameworks = [
  { id: "stanley", name: "Stanley", desc: "8-step growth framework — Best for: Consistent audience growth" },
  { id: "brandon", name: "Brandon Smithwrick", desc: "3-bucket system — Best for: Strategic content mix" },
  { id: "daniel", name: "Daniel Korenblum", desc: "7-step inbound framework — Best for: High-conversion posts" },
];

const dayIndexMap: Record<string, number> = {
  Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4,
};

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [framework, setFramework] = useState("stanley");
  const [bucket, setBucket] = useState("growth");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [sendingNotion, setSendingNotion] = useState(false);

  const dayMap: Record<string, string> = {
    monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday", friday: "Friday",
    mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday",
  };

  const detectDay = (text: string): string | null => {
    const lower = text.toLowerCase();
    for (const [abbr, full] of Object.entries(dayMap)) {
      const regex = new RegExp(`\\b${abbr}\\b`, "i");
      if (regex.test(lower)) return full;
    }
    return null;
  };

  const extractTopic = (text: string, day: string | null): string => {
    let cleaned = text
      .replace(/^make\s+(me\s+)?a\s+post\s+(on|about)\s+/i, "")
      .replace(/\s+for\s+(monday|tuesday|wednesday|thursday|friday|mon|tue|wed|thu|fri)\s*$/i, "")
      .trim();
    return cleaned || text;
  };

  const saveToCalendar = (day: string, postContent: string, topicText: string) => {
    const saved = localStorage.getItem("voicepost-calendar");
    const posts = saved ? JSON.parse(saved) : {};
    const dayIndex = dayIndexMap[day];
    posts[dayIndex] = { topic: topicText, notes: postContent };
    localStorage.setItem("voicepost-calendar", JSON.stringify(posts));
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    const detectedDay = detectDay(topic);
    const cleanTopic = extractTopic(topic, detectedDay);

    setLoading(true);
    setGenerated("");
    setStatus(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ framework, topic: cleanTopic, bucket }),
      });
      const data = await res.json();
      const postContent = data.post || "Generation failed";
      setGenerated(postContent);

      if (detectedDay && postContent && postContent !== "Generation failed") {
        saveToCalendar(detectedDay, postContent, cleanTopic);
        setStatus(`Generated and added to ${detectedDay}! Check your Calendar.`);
      }
    } catch (err) {
      setGenerated("Generation failed");
    }
    setLoading(false);
  };

  const sendToNotion = async () => {
    if (!generated) return;

    setSendingNotion(true);
    setStatus(null);

    const cleanTopic = extractTopic(topic, detectDay(topic));

    try {
      const res = await fetch("/api/notion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day: detectDay(topic) || "Monday",
          dayType: frameworks.find(f => f.id === framework)?.id === "brandon" ? bucket.toUpperCase() : 
                   frameworks.find(f => f.id === framework)?.id === "daniel" ? "MOFU" : "TOFU",
          topic: cleanTopic,
          notes: generated,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Sent to Notion!");
      } else {
        setStatus(data.error || "Failed to send to Notion");
      }
    } catch (err) {
      setStatus("Failed to send to Notion");
    }
    setSendingNotion(false);
    setTimeout(() => setStatus(null), 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    setStatus("Copied!");
    setTimeout(() => setStatus(null), 2000);
  };

  const detectedDay = detectDay(topic);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Generate LinkedIn Post
      </h1>
      <p className="text-gray-400 mb-8">Choose a framework, enter your topic, and generate</p>

      {/* Framework Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {frameworks.map((fw) => (
          <button
            key={fw.id}
            onClick={() => setFramework(fw.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              framework === fw.id
                ? "bg-purple-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {fw.name}
          </button>
        ))}
      </div>

      <p className="text-gray-500 text-sm mb-6">
        {frameworks.find((f) => f.id === framework)?.desc}
      </p>

      {/* Bucket Selector (Brandon only) */}
      {framework === "brandon" && (
        <div className="flex gap-2 mb-6">
          {["growth", "authority", "conversion"].map((b) => (
            <button
              key={b}
              onClick={() => setBucket(b)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                bucket === b
                  ? "bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {b.charAt(0).toUpperCase() + b.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Topic Input */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">
          What&apos;s your post about?
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., On-device AI for finance firms, or 'claude opus 4.7 for wednesday'"
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
        />
        {detectedDay && (
          <p className="text-green-400 text-sm mt-2">
            Post will be generated and saved to {detectedDay}.
          </p>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading || !topic.trim()}
        className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium transition-all ${
          loading
            ? "bg-gray-700 text-gray-400 cursor-wait"
            : !topic.trim()
            ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
            : detectedDay
            ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white"
            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
        }`}
      >
        {loading ? "Generating..." : detectedDay ? "Generate & Add to Calendar" : "Generate Post"}
      </button>

      {/* Status Message */}
      {status && (
        <div className="mt-4 text-sm text-green-300">{status}</div>
      )}

      {/* Generated Post */}
      {generated && (
        <div className="mt-8 bg-gray-800/40 rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-lg font-semibold text-purple-300">Generated Post</h2>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm transition-colors"
              >
                Copy
              </button>
              <button
                onClick={sendToNotion}
                disabled={sendingNotion}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  sendingNotion
                    ? "bg-gray-700 text-gray-400 cursor-wait"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                {sendingNotion ? "Sending..." : "Send to Notion"}
              </button>
            </div>
          </div>
          <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
            {generated}
          </div>
        </div>
      )}
    </main>
  );
}
