"use client";

import { useState, useEffect } from "react";

const days = [
  { name: "Monday", type: "TOFU", desc: "Broad topic, wide appeal", example: "Industry take, universal lesson" },
  { name: "Tuesday", type: "MOFU", desc: "Specific audience problem", example: "How-to guide, common mistakes" },
  { name: "Wednesday", type: "BOFU", desc: "Case study, proof, results", example: "Client outcome, before/after" },
  { name: "Thursday", type: "TOFU", desc: "Broad topic, wide appeal", example: "Contrarian view, trend analysis" },
  { name: "Friday", type: "MOFU", desc: "Specific audience problem", example: "Tool breakdown, framework" },
];

const timeSlots = [
  { time: "7:30-8:30 AM", label: "Morning commute", note: "Best for CEOs" },
  { time: "12:00-1:00 PM", label: "Lunch break", note: "High engagement" },
  { time: "5:30-6:30 PM", label: "End of workday", note: "Good for B2B" },
];

export default function CalendarPage() {
  const [posts, setPosts] = useState<Record<number, { topic: string; notes: string }>>(
    Object.fromEntries(days.map((_, i) => [i, { topic: "", notes: "" }]))
  );
  const [bulkInput, setBulkInput] = useState("");
  const [improving, setImproving] = useState<number | null>(null);
  const [exporting, setExporting] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [notionStatus, setNotionStatus] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("voicepost-calendar");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPosts((prev) => ({ ...prev, ...parsed }));
      } catch (e) {}
    }
  }, []);

  // Save to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("voicepost-calendar", JSON.stringify(posts));
  }, [posts]);

  const handleBulkParse = () => {
    const lines = bulkInput.split("\n").filter(Boolean);
    const newPosts: Record<number, { topic: string; notes: string }> = {};
    
    days.forEach((_, i) => {
      newPosts[i] = { topic: posts[i].topic, notes: posts[i].notes };
    });

    const dayMap: Record<string, number> = {
      monday: 0, tuesday: 1, wednesday: 2, thursday: 3, friday: 4,
      mon: 0, tue: 1, wed: 2, thu: 3, fri: 4,
    };

    lines.forEach((line) => {
      const match = line.match(/(monday|tuesday|wednesday|thursday|friday|mon|tue|wed|thu|fri)\s*[:\-–]\s*(.+)/i);
      if (match) {
        const dayIndex = dayMap[match[1].toLowerCase()];
        const topic = match[2].trim();
        if (dayIndex !== undefined) {
          newPosts[dayIndex] = { topic, notes: "" };
        }
      }
    });

    setPosts(newPosts);
    setBulkInput("");
  };

  const improvePost = async (dayIndex: number) => {
    const post = posts[dayIndex];
    if (!post.topic) return;

    setImproving(dayIndex);
    try {
      const res = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: post.topic,
          notes: post.notes,
          dayType: days[dayIndex].type,
          dayName: days[dayIndex].name,
        }),
      });
      const data = await res.json();
      if (data.suggestions) {
        setPosts((prev) => ({
          ...prev,
          [dayIndex]: { ...prev[dayIndex], notes: prev[dayIndex].notes + (prev[dayIndex].notes ? "\n\n" : "") + "AI Suggestions:\n" + data.suggestions },
        }));
      }
    } catch (err) {
      console.error("Improve failed:", err);
    }
    setImproving(null);
  };

  const exportToNotion = async (dayIndex: number) => {
    const post = posts[dayIndex];
    if (!post.topic) return;

    setExporting(dayIndex);
    setNotionStatus(null);
    try {
      const res = await fetch("/api/notion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day: days[dayIndex].name,
          dayType: days[dayIndex].type,
          topic: post.topic,
          notes: post.notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNotionStatus("Sent to Notion!");
      } else {
        setNotionStatus(data.error || "Failed to export");
      }
    } catch (err) {
      setNotionStatus("Export failed");
    }
    setExporting(null);
    setTimeout(() => setNotionStatus(null), 3000);
  };

  const updatePost = (dayIndex: number, field: "topic" | "notes", value: string) => {
    setPosts((prev) => ({
      ...prev,
      [dayIndex]: { ...prev[dayIndex], [field]: value },
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-6 md:p-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Weekly Content Calendar
        </h1>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Notion Settings
        </button>
      </div>
      <p className="text-gray-400 mb-6">2x TOFU + 2x MOFU + 1x BOFU = balanced content</p>

      {/* Notion Settings Panel */}
      {showSettings && (
        <div className="mb-6 bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
          <h2 className="text-lg font-semibold mb-3 text-purple-300">Notion Integration</h2>
          <p className="text-gray-400 text-sm mb-3">
            Add these to your Vercel environment variables:
          </p>
          <code className="block bg-gray-900 rounded-lg p-3 text-sm text-gray-300 mb-2">
            NOTION_API_KEY=secret_xxx...<br/>
            NOTION_DATABASE_ID=your-database-id
          </code>
          <p className="text-gray-500 text-xs">
            Create a Notion integration at notion.so/my-integrations. Share your database with the integration.
          </p>
        </div>
      )}

      {/* Notion Status Toast */}
      {notionStatus && (
        <div className="fixed top-4 right-4 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm z-50">
          {notionStatus}
        </div>
      )}

      {/* Time Slots */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {timeSlots.map((slot) => (
          <div key={slot.time} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <p className="text-lg font-semibold text-purple-300">{slot.time}</p>
            <p className="text-gray-400 text-sm">{slot.label}</p>
            <p className="text-gray-500 text-xs">{slot.note}</p>
          </div>
        ))}
      </div>

      {/* Bulk Input */}
      <div className="mb-8 bg-gray-800/30 rounded-xl p-5 border border-gray-700/50">
        <h2 className="text-lg font-semibold mb-3 text-purple-300">Quick Plan</h2>
        <p className="text-gray-400 text-sm mb-3">
          Paste your ideas, one per line. Format: <code className="text-gray-300">Day: topic</code>
        </p>
        <textarea
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          placeholder={"Monday: calculus for CEOs\nTuesday: Shake Shack case study\nWednesday: on-device AI story"}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 mb-3"
          rows={4}
        />
        <button
          onClick={handleBulkParse}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
        >
          Fill Calendar
        </button>
      </div>

      {/* Daily Slots */}
      <div className="space-y-4">
        {days.map((day, i) => (
          <div
            key={day.name}
            className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div>
                <h3 className="text-xl font-bold">{day.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  day.type === "TOFU" ? "bg-green-500/20 text-green-300" :
                  day.type === "MOFU" ? "bg-yellow-500/20 text-yellow-300" :
                  "bg-red-500/20 text-red-300"
                }`}>
                  {day.type}
                </span>
                <span className="text-gray-500 text-sm ml-2">{day.desc}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => improvePost(i)}
                  disabled={improving === i || !posts[i].topic}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    improving === i
                      ? "bg-gray-700 text-gray-400 cursor-wait"
                      : !posts[i].topic
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                  }`}
                >
                  {improving === i ? "Thinking..." : "Improve"}
                </button>
                <button
                  onClick={() => exportToNotion(i)}
                  disabled={exporting === i || !posts[i].topic}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    exporting === i
                      ? "bg-gray-700 text-gray-400 cursor-wait"
                      : !posts[i].topic
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  {exporting === i ? "Sending..." : "Send to Notion"}
                </button>
              </div>
            </div>
            <input
              type="text"
              value={posts[i].topic}
              onChange={(e) => updatePost(i, "topic", e.target.value)}
              placeholder="Post title / topic..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 mb-2"
            />
            <textarea
              value={posts[i].notes}
              onChange={(e) => updatePost(i, "notes", e.target.value)}
              placeholder="Notes, hooks, key points..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              rows={3}
            />
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-8 italic">
        "Never post 5x convert. Never post 0x convert. Balance is the strategy."
      </p>
    </main>
  );
}
