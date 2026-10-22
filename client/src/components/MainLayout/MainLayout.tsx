import { CubeCanvas } from '../CubeCanvas/CubeCanvas';
import { ReferencesPanel } from '../ReferencesPanel/ReferencesPanel';
import { Header } from '../Header/Header';

export function MainLayout() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-zinc-900">
      <Header />
      <main className="flex-1 grid grid-cols-2 md:grid-cols-[1fr_2fr] overflow-hidden">
        <section className="h-full relative" aria-label="3D Model Section">
          <CubeCanvas />
        </section>
        <section className="h-full" aria-label="References Section">
          <ReferencesPanel />
        </section>
      </main>
    </div>
  );
}
