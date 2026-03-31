import { useState, useEffect } from 'react';

const SectionHeading = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div 
      className="flex items-center mb-2 mt-4"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <h2 className="text-xl font-body font-bold text-primary dark:text-darkSecondary md:mb-0 md:whitespace-nowrap tracking-tighter">
        {children}
      </h2>
      <div className="hidden md:flex items-center w-full ml-4">
        <div className="w-full h-px bg-primary dark:bg-darkSecondary mt-1"></div>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          className="ml-1 mt-1 transition-transform duration-300 ease-in-out"
          style={{
            transform: isHovered ? 'scale(1.2)' : 'scale(1)'
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
            fill="var(--primary)"
            stroke="transparent"
            className="fill-background dark:fill-darkSecondary"
          />
        </svg>
      </div>
    </div>
  );
};

export default SectionHeading;