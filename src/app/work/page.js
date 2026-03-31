'use client';

import { useState, useRef, useEffect } from 'react';
import { FiGithub } from 'react-icons/fi';
import Image from 'next/image';
import BoxdOffice from './projects/BoxdOffice'
import Website from './projects/Website'
import Hydropower from './projects/Hydropower';
import Pokeplants from './projects/Pokeplants';
import Nudge from './projects/Nudge';
import Chroma from './projects/Chroma';
import Biquadris from './projects/Biquadris'

const githubUser = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? '';

const projects = [
  {
    id: 1,
    title: "Sunday Mail",
    subtitle: "An AI executive assistant that handles your emails",
    image: "/images/projects/boxdoffice/sundaymailprof.png",
    description: "Sunday is an AI virtual assistant that prioritizes action items, summarizes emails, and handles routine responses faster than any human could. Sunday delivers the same level of service as a personal assistant, 10x cheaper, for everyone, from students to CEOs, so you never need to check your email again.",
    expandedContent: <BoxdOffice />,
    link: "https://sunday-mail.vercel.app/login",
    linkText: "Try it Out",
    githubLink: `https://github.com/${githubUser}/Sunday-Mail`
  },
  {
    id: 4,
    title: "Terraform Pre-Change Validation Integration with Cisco Nexus Dashboard",
    subtitle: "Simulate network infrastructure changes before they are applied",
    image: "/images/projects/terraform.png",
    outlineImage: true,
    description: "A pipeline to run Terraform plans, parse and dynamically manipulate output payloads, and post refined payloads to an API endpoint to simulate changes.",
    expandedContent: <Hydropower />,
    link: "https://registry.terraform.io/providers/CiscoDevNet/aci/latest",
    linkText: "9M+ Downloads",
    githubLink: "https://github.com/CiscoDevNet/terraform-provider-aci"
  },
  {
    id: 2,
    title: "Personal Website",
    subtitle: "What you're looking at right now!",
    image: "/images/projects/website/website.png",
    description: "This website is like a central hub for my professional history, passion projects, and personal interests. It was designed with both aesthetics and functionality in mind, and I wanted to make it as personal as possible. Thanks for checking it out!",
    expandedContent: <Website />,
  },

  {
    id: 5,
    title: "Nudge",
    subtitle: "An AI-powered Chrome extension that knows when you're slacking and pressures you to get back on track",
    image: "/images/projects/nudge.png",
    description: "Nudge was built at Rutgers Hacks, where our team of 4 wanted to tackle productivity and procrastination in a way that felt more human than typical productivity apps. We built a Chrome extension that observes your browser activity and responds with sarcastic commentary inspired by the game The Stanley Parable.",
    expandedContent: <Nudge />,
  },
];

const ProjectTitle = ({ children, rotateRight = false, isHovered = false }) => (
  <div className="relative inline-block overflow-visible">
    <svg
      width="180"
      height="60"
      viewBox="0 0 180 60"
      className="absolute -left-2 -top-1 h-14 w-auto"
    >
      <ellipse
        cx="0"
        cy="0"
        rx="0"
        ry="0"
        transform={rotateRight ? "rotate(6, 90, 30)" : "rotate(-6, 90, 30)"}
        className="fill-none stroke-[0.5px] stroke-primary dark:stroke-darkSecondary"
        strokeDasharray={isHovered ? 'none' : '0, 314'}
        strokeDashoffset="0"
        style={{
          transition: 'stroke-dasharray 0.8s ease-in-out',
          strokeDasharray: isHovered ? '314' : '0, 314',
          filter: 'drop-shadow(0 0 4px var(--ellipse-glow))',
        }}
      />
    </svg>

    {/* Title Text */}
    <h2 className="relative text-3xl font-body font-bold tracking-tighter leading-8
      dark:text-transparent dark:font-extrabold dark:tracking-tighter dark:leading-8
      text-[var(--primary)] dark:text-darkPrimary">
      
      {/* Stroke Layer */}
      <span
        className="absolute top-0 left-0 -z-10 text-3xl font-body font-bold tracking-tighter leading-8 dark:block hidden"
        style={{
          WebkitTextStroke: '2px var(--secondary)',
          textStroke: '2px var(--secondary)',
        }}
      >
        {children}
      </span>

      {/* Fill Layer */}
      <span className="relative z-10 text-[var(--primary)] dark:text-darkPrimary">
        {children}
      </span>
    </h2>
  </div>
);

const ProjectCard = ({ project, index, expandedIds, toggleExpand, getHeight, contentRefs, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shadow Layer for Project Card */}
      <div className="absolute top-[4px] left-[4px] w-full h-full bg-primary dark:bg-darkSecondary rounded-2xl"></div>

      {/* Main Project Card Layer */}
      <div
        className={`relative z-10 transition-all bg-background dark:bg-darkBackground2 border border-primary dark:border-darkBackground2 p-6 sm:p-6 sm:pl-8 rounded-2xl md:hover:-translate-y-1 md:hover:-translate-x-1`}
      >
        {/* Header with image and basic info */}
        <div className={`flex flex-col md:flex-row gap-6 mb-6 items-center ${index % 2 ? 'md:flex-row-reverse' : ''}`}>
          <div className="md:w-1/3 relative">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className={`w-full h-auto object-contain transition-all ${project.outlineImage ? 'border border-primary dark:border-darkBackground2 rounded-xl' : ''}`}
            />
          </div>

          <div className="md:w-2/3">
            <ProjectTitle rotateRight={index % 2 === 0} isHovered={isHovered}>
              {project.title}
            </ProjectTitle>
            <h3 className="text-lg font-body text-primary dark:text-darkSecondary mb-6 mt-1 leading-tight dark:neon-glow">
              {project.subtitle}
            </h3>
            <p className="font-body font-light font-[var(--primary)]">
              {project.description}
            </p>
          </div>
        </div>

        {/* Expanded content with animated height */}
        <div
          ref={(el) => (contentRefs.current[project.id] = el)}
          className="transition-[height,opacity] duration-500 ease-in-out overflow-hidden"
          style={{
            height: expandedIds.includes(project.id)
              ? `${getHeight(project.id)}px`
              : '0px',
            opacity: expandedIds.includes(project.id) ? 1 : 0,
          }}
        >
          <div className="mt-4 space-y-6">
            {project.expandedContent}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
          {/* Left: GitHub + Link */}
          <div className="flex items-center gap-2">
            {project.githubLink && (
              <div className="relative group flex items-center">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] text-xl md:hover:scale-110 transition-all flex items-center -ml-2"
                >
                  <FiGithub className="align-middle" />
                </a>
                {!isMobile && (
                  <div className="absolute left-1/2 -translate-x-[54%] bottom-full mb-2 bg-[var(--background)] px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkBackground whitespace-nowrap pointer-events-none rounded-full font-body w-max dark:shadow-[0_0_15px_rgba(230,220,224,0.1)]">
                    <span>Github Repo</span>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary dark:border-t-darkBackground"></div>
                  </div>
                )}
              </div>
            )}

            {project.link && project.linkText && (
              <div className="relative inline-block">
                {/* Shadow Layer */}
                <div className="absolute top-[4px] left-[4px] z-0">
                  <div className="px-3 py-1 flex items-center whitespace-nowrap bg-primary dark:bg-darkSecondary rounded-full">
                    <span className="font-body font-medium text-sm text-[var(--primary)]">
                      {project.linkText}
                    </span>
                  </div>
                </div>
                {/* Main Button Layer */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 transition-all bg-background2 dark:bg-darkBackground px-3 py-1 flex items-center whitespace-nowrap border border-[var(--primary)] dark:border-darkBackground md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full"
                >
                  <span className="font-body font-medium text-sm text-[var(--primary)]">
                    {project.linkText}
                  </span>
                </a>
              </div>
            )}
          </div>

          {/* Right: Show More/Less */}
          <div className="relative inline-block">
            {/* Shadow Layer for Show More/Less */}
            <div className="absolute top-[4px] left-[4px] z-0">
              <div className="px-3 py-1 flex items-center whitespace-nowrap bg-primary dark:bg-darkSecondary rounded-full">
                <span className="font-body font-medium text-sm text-[var(--primary)]">
                  {expandedIds.includes(project.id) ? 'Show Less' : 'Show More'}
                </span>
              </div>
            </div>
            {/* Main Button Layer */}
            <button
              onClick={() => toggleExpand(project.id)}
              className="relative z-10 transition-all bg-background2 dark:bg-darkBackground px-3 py-1 flex items-center whitespace-nowrap border border-[var(--primary)] dark:border-darkBackground md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full"
            >
              <span className="font-body font-medium text-sm text-[var(--primary)]">
                {expandedIds.includes(project.id) ? 'Show Less' : 'Show More'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Work() {
  const [expandedIds, setExpandedIds] = useState([]);
  const contentRefs = useRef({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const getHeight = (id) => {
    const el = contentRefs.current[id];
    return el ? el.scrollHeight : 0;
  };

  return (
    <div className="p-6 relative bg-[var(--background)] transition-all">
      <p className="font-body font-light mb-6">
        For each project, you can click on <span className="font-bold tracking-tighter">Show More</span> for details about the technical process and my thoughts.
      </p>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
            getHeight={getHeight}
            contentRefs={contentRefs}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}