import { useState } from 'react';
import { useSearchStore } from '../../store/useSearchStore';
import { ImageModal } from '../ImageModal/ImageModal';

export function ReferencesPanel() {
  const {
    query,
    images,
    loading,
    error,
    hasMore,
    formInput,
    loadMore,
    setSelectedImageIndex,
    clearError,
    setFormInput
  } = useSearchStore();

  const skeletonCards = Array.from({ length: 6 });

  return (
    <aside className="min-w-full min-h-full max-w-full max-h-full bg-zinc-950 border-l border-zinc-800 flex flex-col p-4 text-zinc-200" aria-label="Reference Panel">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
        <h2 className="text-sm font-medium tracking-wide uppercase text-zinc-400">Reference Library</h2>
        <span className="text-xs text-zinc-500">{images.length} loaded</span>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex space-x-2">
          <input
            type="text"
            value={formInput}
            onChange={(e) => {
              setFormInput(e.target.value);
              if (error) clearError();
            }}
            placeholder="Search references on Unsplash..."
            className="flex-1 h-9 bg-zinc-900 border border-zinc-800 rounded-md px-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
        {error && (
          <p className="text-xs text-red-400 mt-1" role="alert">
            {error}
          </p>
        )}
      </div>

      {/* Reference Grid */}
      <div className="flex-1 overflow-y-scroll pr-1 space-y-4">
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <div
              key={img.id + index}
              onClick={() => setSelectedImageIndex(index)}
              className="aspect-square bg-zinc-900 border border-zinc-800 rounded-md overflow-hidden cursor-pointer group relative transition hover:border-indigo-500"
            >
              <img
                src={img.urls.small}
                alt={img.alt_description || 'Unsplash Reference'}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition duration-200">
                <p className="text-[10px] text-zinc-300 truncate">By {img.user.name}</p>
              </div>
            </div>
          ))}

          {/* Skeletons when loading */}
          {loading && skeletonCards.map((_, index) => (
            <div
              key={'skeleton-' + index}
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

        {/* Load More Button (hidden when exhausted) */}
        {hasMore && images.length > 0 && !loading && (
          <button
            onClick={() => loadMore()}
            className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-md text-xs font-medium transition"
          >
            Load More
          </button>
        )}

        {/* Empty State / Offline Notice when no images and not loading */}
        {!loading && images.length === 0 && !error && (
          <div className="text-center py-12 text-zinc-500 text-xs">
            No reference images loaded yet. Enter a query above to search Unsplash.
          </div>
        )}
      </div>

      {/* Full-screen Modal */}
      <ImageModal />
    </aside>
  );
}
