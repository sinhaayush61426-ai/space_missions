import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: { src: string; name: string; mission: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ImageLightbox = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: ImageLightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrevious();
    },
    [isOpen, onClose, onNext, onPrevious]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-card/80 border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 z-50 p-3 rounded-full bg-card/80 border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 z-50 p-3 rounded-full bg-card/80 border border-border/50 text-foreground hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Image container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.name}
          className="max-w-full max-h-[75vh] object-contain rounded-xl border border-border/30 shadow-2xl"
        />
        
        {/* Caption */}
        <div className="mt-4 text-center">
          <h3 className="font-display text-xl font-bold text-foreground">
            {currentImage.name}
          </h3>
          <p className="text-muted-foreground">{currentImage.mission}</p>
        </div>

        {/* Image counter */}
        {images.length > 1 && (
          <div className="mt-2 text-sm text-muted-foreground">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border/50">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                const diff = index - currentIndex;
                if (diff > 0) {
                  for (let i = 0; i < diff; i++) onNext();
                } else {
                  for (let i = 0; i < Math.abs(diff); i++) onPrevious();
                }
              }}
              className={`w-12 h-12 rounded overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex
                  ? "border-primary scale-110"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.src}
                alt={img.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;
