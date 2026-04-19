export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">LinkedIn Content Engine</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Generate high-performing content using proven frameworks
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <a href="/generate" className="block p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition">
          <h2 className="text-xl font-semibold mb-2">Generate Post</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Choose from 3 proven frameworks to create content that converts.</p>
        </a>
        <a href="/profile" className="block p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition">
          <h2 className="text-xl font-semibold mb-2">Profile Optimizer</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Optimize your LinkedIn profile using Stanley&apos;s 7-fix checklist.</p>
        </a>
        <a href="/calendar" className="block p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition">
          <h2 className="text-xl font-semibold mb-2">Content Calendar</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Plan your weekly content mix with TOFU/MOFU/BOFU strategy.</p>
        </a>
      </div>
    </div>
  );
}
