import { useState, useContext, useEffect } from "react";
import { ChevronLeft, ChevronRight, Eye, Crown } from "lucide-react";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";
import React from "react";

// Add context for waitlist join state
export const WaitlistContext = React.createContext({ joined: false });

const CollectionPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Use context for joined state
  const { joined } = useContext(WaitlistContext);

  useEffect(() => {
    // Attempt to block PrintScreen key
    const blockPrintScreen = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        // Optionally, clear clipboard
        navigator.clipboard.writeText('Screenshots are not allowed.');
      }
    };
    window.addEventListener('keydown', blockPrintScreen);
    return () => window.removeEventListener('keydown', blockPrintScreen);
  }, []);

  const collections = [
    {
      id: 1,
      image: collection1,
      alt: "Luxury Collection Piece 1"
    },
    {
      id: 2,
      image: collection2,
      alt: "Luxury Collection Piece 2"
    },
    {
      id: 3,
      image: collection3,
      alt: "Luxury Collection Piece 3"
    },
    {
      id: 4,
      image: collection4,
      alt: "Luxury Collection Piece 4"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % collections.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + collections.length) % collections.length);
  };

  return (
    <section className="py-16 sm:py-24 px-2 sm:px-6 bg-surface-gradient">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-luxury text-3xl sm:text-5xl md:text-6xl font-bold text-accent-gradient mb-4 sm:mb-6 uppercase tracking-tight break-words">
            PREVIEW
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-md sm:max-w-3xl mx-auto font-light leading-relaxed uppercase tracking-wide">
            FIRST LOOK AT OUR LUXURY COLLECTION
          </p>
        </div>
        {/* Collection Grid for desktop/tablet only */}
        <div className="hidden md:grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-10 sm:mb-16">
          {collections.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl bg-surface-elevated shadow-dark hover-scale border border-accent/20"
            >
              <div className="aspect-[3/4] overflow-hidden relative" onContextMenu={e => e.preventDefault()}>
                <div className="absolute inset-0 z-10" style={{ pointerEvents: 'none', userSelect: 'none' }} />
                <img
                  src={item.image}
                  alt={item.alt}
                  className={`w-full h-full object-cover transition-streetwear group-hover:scale-110 ${!joined ? 'filter blur-lg opacity-75' : 'filter '}${joined ? 'group-hover:blur-0 group-hover:opacity-100' : ''}`}
                  style={!joined ? {} : { transition: 'filter 0.4s, opacity 0.4s' }}
                />
                {/* Overlay */}
                {!joined && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                    <p className="text-base sm:text-lg font-bold text-accent-orange uppercase tracking-wider text-center px-2">Join Elite to Reveal</p>
                  </div>
                )}
                {joined && (
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-streetwear flex items-end justify-center p-4 sm:p-6">
                    <div className="text-center text-foreground">
                      <Crown className="w-6 h-6 mx-auto mb-2 text-accent-orange" />
                      <p className="text-xs sm:text-sm font-bold tracking-wider uppercase">
                        REVEALED
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Mobile Carousel (slide view) only for mobile */}
        <div className="block md:hidden">
          <div className="relative max-w-xs sm:max-w-sm mx-auto">
            <div className="overflow-hidden rounded-xl border border-accent/20">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {collections.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0">
                    <div className="aspect-[3/4] relative" onContextMenu={e => e.preventDefault()}>
                      <div className="absolute inset-0 z-10" style={{ pointerEvents: 'none', userSelect: 'none' }} />
                      <img
                        src={item.image}
                        alt={item.alt}
                        className={`w-full h-full object-cover ${!joined ? 'filter blur-lg opacity-75' : ''}`}
                        style={!joined ? {} : { transition: 'filter 0.4s, opacity 0.4s' }}
                      />
                      {/* Overlay */}
                      {!joined && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                          <p className="text-base sm:text-lg font-bold text-accent-orange uppercase tracking-wider text-center px-2">Join Elite to Reveal</p>
                        </div>
                      )}
                      {joined && (
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-0 transition-streetwear flex items-end justify-center p-4 sm:p-6">
                          <div className="text-center text-foreground">
                            <Crown className="w-6 h-6 mx-auto mb-2 text-accent-orange" />
                            <p className="text-xs sm:text-sm font-bold tracking-wider uppercase">
                              REVEALED
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-surface-elevated rounded-full shadow-glow flex items-center justify-center text-foreground hover-scale border border-accent/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-surface-elevated rounded-full shadow-glow flex items-center justify-center text-foreground hover-scale border border-accent/20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {/* Dots */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-1 sm:space-x-2">
              {collections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-streetwear ${index === currentIndex ? 'bg-accent-orange shadow-glow' : 'bg-accent'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionPreview;