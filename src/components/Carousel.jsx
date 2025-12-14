import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ children, className = "" }) => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding tolerance
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [children]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth / 2; // Scroll half a screen width
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            // checkScroll will be triggered by onScroll event
        }
    };

    return (
        <div className={`relative group/carousel ${className}`}>
            {/* Scroll Container */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto gap-6 md:gap-6 pb-8 -mx-4 px-4 md:-mx-4 md:px-4 snap-x snap-mandatory scrollbar-hide"
            >
                {children}
            </div>

            {/* Navigation Buttons - Visible on Desktop hover or always if active */}
            {canScrollLeft && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-6 z-10 p-3 bg-neutral-900 border border-neutral-800 text-white rounded-full shadow-xl hover:bg-orange-500 hover:border-orange-500 transition-all hidden md:flex"
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={24} />
                </button>
            )}
            {canScrollRight && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-6 z-10 p-3 bg-neutral-900 border border-neutral-800 text-white rounded-full shadow-xl hover:bg-orange-500 hover:border-orange-500 transition-all hidden md:flex"
                    aria-label="Scroll right"
                >
                    <ChevronRight size={24} />
                </button>
            )}
        </div>
    );
};

export default Carousel;
