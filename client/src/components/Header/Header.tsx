export function Header() {
  return (
    <header className="h-12 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 text-zinc-200 select-none w-full bg-white">
      <div className="flex items-center space-x-2">
        <span className="font-bold tracking-wider text-sm uppercase text-indigo-400">Drawngle</span>
        <span className="text-xs text-zinc-500">v0.0.1</span>
      </div>
    </header>
  );
}
