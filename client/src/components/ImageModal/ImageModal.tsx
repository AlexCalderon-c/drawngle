import { useEffect } from 'react';
import { useSearchStore } from '../../store/useSearchStore';

export function ImageModal() {
  const { images, selectedImageIndex, setSelectedImageIndex, nextImage, prevImage } = useSearchStore();

  if (selectedImageIndex === null || !images[selectedImageIndex]) return null;

  const currentImage = images[selectedImageIndex];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedImageIndex, nextImage, prevImage]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={() => setSelectedImageIndex(null)}
      role="dialog"
      aria-modal="true"
      aria-label="Image Preview Modal"
    >
      <div 
        className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedImageIndex(null)}
          className="absolute -top-10 right-0 text-zinc-400 hover:text-white text-sm font-semibold uppercase tracking-wider px-3 py-1 bg-zinc-800/80 rounded"
          aria-label="Close modal"
        >
          Close [Esc]
        </button>

        {/* Main Image */}
        <img
          src={currentImage.urls.regular}
          alt={currentImage.alt_description || 'Unsplash Reference'}
          className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl border border-zinc-800"
        />

        {/* Attribution & Info */}
        <div className="mt-4 flex items-center justify-between w-full text-zinc-300 text-sm px-2">
          <div>
            Photo by{' '}
            <a
              href={currentImage.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 underline hover:text-indigo-300"
            >
              {currentImage.user.name}
            </a>{' '}
            on Unsplash
          </div>
          <div className="text-zinc-500 text-xs">
            {selectedImageIndex + 1} of {images.length}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4">
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="pointer-events-auto p-3 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full shadow-lg border border-zinc-700 transition"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="pointer-events-auto p-3 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full shadow-lg border border-zinc-700 transition"
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
