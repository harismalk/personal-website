import SectionHeading from '../SectionHeading';
import { useState, useEffect, useRef } from 'react';

export default function Website() {
    const images = [
        '/images/projects/website/1.png',
        '/images/projects/website/2.png',
        '/images/projects/website/3.png',
        '/images/projects/website/4.png',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const carouselRef = useRef(null);

    // Intersection Observer for lazy loading and visibility detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1,
            }
        );

        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }

        return () => {
            if (carouselRef.current) {
                observer.unobserve(carouselRef.current);
            }
        };
    }, []);

    // Auto-advance carousel only when visible and not hovered
    useEffect(() => {
        if (!isVisible || isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isVisible, isHovered, images.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            nextSlide();
        }

        if (touchStart - touchEnd < -50) {
            prevSlide();
        }
    };

    return (
        <div className="mt-4 space-y-6">
            <div className="mb-6">
                <SectionHeading>Technical Overview</SectionHeading>
                <ul className="list-disc pl-5 font-body font-light dark:[&>li]:marker:text-darkSecondary">
                    <li>Next.js for building the front end</li>
                    <li>Tailwind CSS for styling</li>
                    <li>Vercel for deployment</li>
                    <li>
                        A couple of APIs & services:
                        <ul className="list-[circle] pl-6">
                            <li>Letterboxd RSS feed for recently watched movie data</li>
                            <li>Last.fm API for Spotify listening data</li>
                            <li>Deezer API for music artist images</li>
                            <li>Nodemailer for emailing recommendations</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="mb-6">
                <SectionHeading>Thoughts</SectionHeading>
                <p className="font-body mb-4 font-light">
                    I was initially unsure about whether I should make this website strictly professional or a little more casual. Ultimately, I leaned into the latter because I wanted it to be like a snapshot of the person I am right now.
                </p>
                <p className="font-body mb-4 font-light">
                    I built this website from scratch and I'm a bit of a perfectionist, so it ended up becoming a never-ending cycle of tweaks and refinements. I became very fixated on tiny design choices; as a result, I spent an embarrassing amount of time browsing fonts, adjusting hex codes, and trying out different hover animations. Still, it was fun and it felt very rewarding to create something that grows alongside my interests. I'll try to keep this website as up to date as possible.
                </p>
                {/* <p className="font-body mb-4 font-light">
                    Below are a few past iterations of the design, ordered from most to least recent:
                </p>
                
                <div
                    ref={carouselRef}
                    className="relative w-full my-4"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div
                        className="overflow-hidden rounded-lg border border-primary dark:border-darkBackground2 w-full"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="relative" style={{ aspectRatio: '2/1' }}>
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Website design iteration ${index + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <button
                            onClick={prevSlide}
                            className="text-[var(--primary)] transition-all flex items-center justify-center w-10 h-10 md:hover:scale-[1.2]"
                            aria-label="Previous image"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div className="flex space-x-4 px-2 overflow-x-auto py-2 no-scrollbar">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`flex-shrink-0 w-2 h-2 transition-all rounded-full md:hover:scale-[1.2] ${index === currentIndex ? 'bg-primary dark:bg-darkSecondary w-4' : 'bg-background dark:bg-darkPrimary border border-primary dark:border-0'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                    style={{ margin: '0 4px' }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="text-[var(--primary)] transition-all flex items-center justify-center w-10 h-10 md:hover:scale-[1.2]"
                            aria-label="Next image"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
}