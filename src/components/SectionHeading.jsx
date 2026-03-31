'use client';

import { useState, useEffect, useRef } from 'react';

const SectionHeading = ({ children, ellipseRotation = -5, ellipseLength = 200 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  const calculateCircumference = (rx, ry) => {
    const h = Math.pow((rx - ry), 2) / Math.pow((rx + ry), 2);
    return Math.PI * (rx + ry) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
  };

  const rx = ellipseLength / 2 - 5;
  const circumference = calculateCircumference(rx, 18);

  return (
    <div
      ref={headingRef}
      className="flex items-center mb-4 relative group"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div className="relative inline-block">
        <svg
          width={ellipseLength}
          height="60"
          viewBox={`0 0 ${ellipseLength} 60`}
          className="absolute -left-3 -top-2 h-12 w-auto"
        >
          <ellipse
            cx={ellipseLength / 2}
            cy="25"
            rx={rx}
            ry="18"
            transform={`rotate(${ellipseRotation}, ${ellipseLength / 2 - 10}, 20)`}
            className="fill-none stroke-[0.5px] stroke-primary dark:stroke-darkSecondary"
            strokeDasharray={
              isVisible ? (isHovered && !isMobile ? `0, ${circumference}` : circumference) : `0, ${circumference}`
            }
            strokeDashoffset="0"
            style={{
              transition: isVisible
                ? 'stroke-dasharray 1.2s ease-in-out'
                : 'none',
              filter: 'drop-shadow(0 0 6px var(--ellipse-glow))',
            }}
          />
        </svg>

        <div className="relative">
          <div className="relative">
            {/* Shadow (offset) */}
            <h2
              className="text-5xl font-heading font-bold text-primary dark:text-transparent md:whitespace-nowrap tracking-tight"
              style={{
                transform: 'translate(2px, 2px)',
                position: 'absolute',
                zIndex: 0,
                WebkitTextStroke: 'var(--stroke-width) var(--shadow-colour)',
                textStroke: 'var(--stroke-width) var(--stroke-colour)',
              }}
            >
              {children}
            </h2>

            {/* Stroke Layer */}
            <h2
              className="text-5xl font-heading font-bold md:whitespace-nowrap tracking-tight"
              style={{
                WebkitTextStroke: 'var(--stroke-width) var(--stroke-colour)',
                textStroke: 'var(--stroke-width) var(--stroke-colour)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {children}
            </h2>

            {/* Fill Layer */}
            <h2
              className="text-5xl font-heading font-bold md:whitespace-nowrap tracking-tight absolute top-0 left-0"
              style={{
                color: 'var(--text-fill-colour)',
                zIndex: 2,
              }}
            >
              {children}
            </h2>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div className="hidden md:flex items-center w-full ml-4 relative top-[2px]">
          <div className="flex-grow h-px bg-primary dark:bg-darkSecondary"></div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="ml-1 transition-transform duration-300 ease-in-out"
            style={{
              transform: isHovered ? 'scale(1.2)' : 'scale(1)',
              filter: 'drop-shadow(0 0 3px var(--sparkle-glow))',
            }}
          >
            <path
              d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z"
              fill="transparent"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinejoin="round"
              className="dark:stroke-darkSecondary"
            />
            <path
              d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z"
              fill="background"
              stroke="transparent"
              className="dark:fill-darkSecondary"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SectionHeading;
