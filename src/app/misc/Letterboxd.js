'use client';

import { useEffect, useState, useRef } from 'react';

function Letterboxd() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [visibleItems, setVisibleItems] = useState(4);

    const containerRef = useRef(null);
    const autoScrollInterval = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const componentRef = useRef(null);
    const [touchStartX, setTouchStartX] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/letterboxd');
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setMovies(data.slice(0, 20));
            } catch (error) {
                console.error('Fetch error:', error);
                setError('Failed to load movie data');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleItems(2); // mobile
            } else if (width < 1024) {
                setVisibleItems(3); // tablet
            } else {
                setVisibleItems(4); // laptop/desktop
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAutoScroll();
                } else {
                    stopAutoScroll();
                }
            },
            { threshold: 0.1 }
        );

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
            stopAutoScroll();
        };
    }, [movies.length, visibleItems, offset]);

    const maxOffset = Math.max(0, movies.length - visibleItems);

    const startAutoScroll = () => {
        if (autoScrollInterval.current) return;
        if (movies.length === 0) return;

        autoScrollInterval.current = setInterval(() => {
            nextMovie();
        }, 5000);
    };

    const stopAutoScroll = () => {
        if (autoScrollInterval.current) {
            clearInterval(autoScrollInterval.current);
            autoScrollInterval.current = null;
        }
    };

    const resetAutoScroll = () => {
        stopAutoScroll();
        if (!isHovered) startAutoScroll();
    };

    const nextMovie = () => {
        setOffset(prev => {
            if (prev >= maxOffset) return 0;
            return prev + 1;
        });
        resetAutoScroll();
    };

    const prevMovie = () => {
        setOffset(prev => {
            if (prev <= 0) return maxOffset;
            return prev - 1;
        });
        resetAutoScroll();
    };

    const goToMovie = (index) => {
        let safeIndex = index;
        if (safeIndex > maxOffset) safeIndex = maxOffset;
        setOffset(safeIndex);
        resetAutoScroll();
    };

    useEffect(() => {
        if (isHovered) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    }, [isHovered]);

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) nextMovie();
            else prevMovie();
        }
    };

    const getStarRating = (rating) => {
        if (!rating) return null;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (
            <span className="text-primary dark:text-darkSecondary text-xs">
                {'★'.repeat(fullStars)}
                {hasHalfStar && '½'}
            </span>
        );
    };

    if (loading) return <p className="font-body font-light">Loading movie data...</p>;
    if (error) return <p className="font-body font-light">{error}</p>;

    return (
        <div ref={componentRef}>
            <h3 className="text-2xl font-body font-bold text-primary dark:text-darkSecondary mb-1 tracking-tight dark:neon-glow">Recently Watched Movies</h3>

            <div
                className="group/container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* --- Slider Wrapper --- */}
                <div className="relative">

                    {/* --- Left Button --- */}
                    <button
                        onClick={prevMovie}
                        className="absolute left-2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-40 
                               w-10 h-10 rounded-full 
                               bg-background dark:bg-darkPrimary
                               border border-primary dark:border-darkPrimary 
                               text-primary dark:text-darkBackground
                               flex items-center justify-center 
                               transition-transform duration-200 hover:scale-110 shadow-md cursor-pointer"
                        aria-label="Previous movie"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>

                    {/* --- Movie Cards Container --- */}
                    <div className="relative w-full overflow-hidden min-h-[19rem] px-1 pt-1 pb-4 pl-2">
                        <div
                            ref={containerRef}
                            className="flex transition-transform duration-500 ease-in-out -ml-2"
                            style={{
                                transform: `translateX(-${offset * (100 / visibleItems)}%)`
                            }}
                        >
                            {movies.map((movie, index) => (
                                <div
                                    key={`${movie.title}-${index}`}
                                    className="relative flex-shrink-0 cursor-pointer"
                                    style={{
                                        width: `${100 / visibleItems}%`,
                                        padding: '0 0.5rem'
                                    }}
                                    onClick={() => goToMovie(index)}
                                >
                                    {/* Shadow Layer */}
                                    <div className="absolute top-0 left-[0.5rem] right-[0.5rem] bottom-0 h-full bg-primary dark:bg-darkSecondary rounded-2xl -z-10 translate-x-[4px] translate-y-[4px]"></div>

                                    {/* Main Card Layer */}
                                    <div className="relative z-10 transition-all bg-background dark:bg-darkBackground2 border border-primary dark:border-darkBackground2 p-3 md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-2xl h-full">
                                        <div className="w-full mb-3 overflow-hidden border border-primary dark:border-darkBackground2 rounded-xl">
                                            {movie.image ? (
                                                <img
                                                    src={movie.image}
                                                    alt={movie.title}
                                                    className="w-full h-auto object-contain"
                                                    onError={(e) => {
                                                        e.target.src = '/default-movie.png';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full bg-gray-300 flex items-center justify-center" style={{ aspectRatio: '2/3' }}>
                                                    <span className="text-xs">No image</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-between items-baseline">
                                                <span
                                                    className="font-body font-bold truncate w-full tracking-tighter"
                                                    title={movie.title}
                                                >
                                                    {movie.title}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="font-body text-xs">
                                                    {movie.year}
                                                </div>
                                                {movie.rating && (
                                                    <div className="font-sans flex items-center">
                                                        {getStarRating(movie.rating)}
                                                    </div>
                                                )}
                                            </div>

                                            {movie.watchedDate && (
                                                <div className="font-body text-xs opacity-80">
                                                    Watched <span className="font-black tracking-tighter">{movie.watchedDate}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- Right Button --- */}
                    <button
                        onClick={nextMovie}
                        className="absolute right-2 top-1/2 -translate-y-1/2 translate-x-1/2 z-40 
                               w-10 h-10 rounded-full 
                               bg-background dark:bg-darkPrimary
                               border border-primary dark:border-darkPrimary
                               text-primary dark:text-darkBackground
                               flex items-center justify-center 
                               transition-transform duration-200 hover:scale-110 shadow-md cursor-pointer"
                        aria-label="Next movie"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>

                {/* --- Dots Indicator --- */}
                <div className="flex justify-center mt-2 space-x-2 overflow-x-auto py-2 no-scrollbar">
                    {movies.map((_, index) => {
                        if (index > maxOffset && index !== offset) return null;

                        return (
                            <button
                                key={`indicator-${index}`}
                                onClick={() => goToMovie(index)}
                                className={`flex-shrink-0 w-2 h-2 transition-all rounded-full md:hover:scale-[1.2] ${index === offset ? 'bg-primary dark:bg-darkSecondary w-4 dark:drop-shadow-[0_0_4px_rgba(230,220,224,0.3)]' : 'bg-background dark:bg-darkPrimary border border-primary dark:border-0'}`}
                                aria-label={`Go to movie ${index + 1}`}
                            />
                        );
                    })}
                </div>
            </div>
        </div >
    );
}

export default Letterboxd;