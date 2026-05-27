import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function Slideshow({ images = [], interval = 3500, aspect = 'video' }) {
  const [index, setIndex] = useState(0);
  const resolvedImages = useMemo(
    () => images.map((img) => `${import.meta.env.BASE_URL}${img}`),
    [images]
  );
  const [visibleImages, setVisibleImages] = useState(() => resolvedImages);
  const timeoutRef = useRef(null);
  const safeIndex = visibleImages.length > 0 ? index % visibleImages.length : 0;

  useEffect(() => {
    setVisibleImages(resolvedImages);
    setIndex(0);
  }, [resolvedImages]);

  useEffect(() => {
    if (!visibleImages || visibleImages.length === 0) return;
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % visibleImages.length);
    }, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [index, visibleImages, interval]);

  if (!visibleImages || visibleImages.length === 0) return null;

  const aspectClass = aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-video';

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-gray-200 ${aspectClass} shadow-2xl`}>
      <div className="absolute inset-0 flex transition-transform duration-700" style={{ transform: `translateX(-${safeIndex * 100}%)` }}>
        {visibleImages.map((img, i) => (
          <div
            key={i}
            className="w-full h-full min-w-full flex-shrink-0 block bg-center bg-cover"
            style={{ backgroundImage: `url('${img}')` }}
            role="img"
            aria-label={`slide-${i + 1}`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {visibleImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === safeIndex ? 'bg-white' : 'bg-white/40'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
