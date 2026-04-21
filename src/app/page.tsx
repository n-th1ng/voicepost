import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">VoicePost</h1>
        <p className="text-xl text-slate-300 mb-8">
          AI-powered LinkedIn content engine for enterprise B2B
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/generate"
            className="block p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">✍️ Generate Post</h2>
            <p className="text-slate-400">
              Create scroll-stopping LinkedIn posts with AI
            </p>
          </Link>

          <Link
            href="/profile"
            className="block p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">👤 Profile Optimizer</h2>
            <p className="text-slate-400">
              Optimize your LinkedIn profile for conversions
            </p>
          </Link>

          <Link
            href="/calendar"
            className="block p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">📅 Content Calendar</h2>
            <p className="text-slate-400">
              Plan your weekly content strategy
            </p>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-slate-800/50 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Quick Tips</h2>
          <ul className="space-y-2 text-slate-300">
            <li>• Posts between 1,300-1,400 characters get highest engagement</li>
            <li>• Start with a hook that creates tension or promises a clear outcome</li>
            <li>• Always include an image - multi-image posts get 6.6% engagement</li>
            <li>• Track saves and DMs, not just likes</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
