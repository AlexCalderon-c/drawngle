export function ReferencesPanel() {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <aside className="w-full h-full bg-zinc-950 border-l border-zinc-800 flex flex-col p-4 text-zinc-200" aria-label="Reference Panel">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
        <h2 className="text-sm font-medium tracking-wide uppercase text-zinc-400">Reference Library</h2>
        <span className="text-xs text-zinc-500">0 loaded</span>
      </div>

      <div className="mb-4">
        <div className="h-9 w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 flex items-center text-xs text-zinc-500">
          Search references by tag or semantic prompt...
        </div>
      </div>

      <div className="flex-1 overflow-y-auto grid grid-cols-4 gap-3 pr-1">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="aspect-square bg-zinc-900/80 border border-zinc-800/80 rounded-md animate-pulse flex flex-col justify-between p-3"
          >
            <div className="w-8 h-3 bg-zinc-800 rounded" />
            <div className="space-y-1">
              <div className="w-full h-2.5 bg-zinc-800 rounded" />
              <div className="w-2/3 h-2.5 bg-zinc-800/60 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
