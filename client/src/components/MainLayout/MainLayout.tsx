import { CubeCanvas } from '../CubeCanvas/CubeCanvas';
import { ReferencesPanel } from '../ReferencesPanel/ReferencesPanel';
import { Header } from '../Header/Header';
import SearchButton from '../SearchButton/SearchButton';

export function MainLayout() {
  return (
    <div className="w-screen min-h-screen max-h-screen flex flex-col overflow-hidden bg-zinc-900">
      <Header />
      <main className="flex-1 grid grid-cols-2 md:grid-cols-[500px_2fr] overflow-hidden">
        <section className="min-h-[85%] relative p-2 " aria-label="3D Model Section">
          <CubeCanvas />    
          <SearchButton/>
        </section>
        <section className="min-h-full max-h-full" aria-label="References Section">
          <ReferencesPanel />
        </section>
      </main>
    </div>
  );
}
