'use client';

import Link from 'next/link';
import ExternalLink from '@/components/ExternalLink';
import SectionHeading from '@/components/SectionHeading';
import { useEffect, useState } from 'react';

const letterboxdUser = process.env.NEXT_PUBLIC_LETTERBOXD_USERNAME ?? '';

const SKILL_GROUPS = [
  { category: 'Programming Languages', items: ['Python', 'C++', 'C', 'C#', 'Java', 'JavaScript', 'Dart'] },
  { category: 'Web Development', items: ['HTML/CSS', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Flask'] },
  { category: 'Data Science & Machine Learning', items: ['TensorFlow', 'OpenCV', 'Pandas', 'Beautiful Soup', 'Streamlit'] },
  { category: 'Cloud & Database', items: ['Firebase', 'MongoDB', 'AWS', 'SQL'] },
  { category: 'Mobile Development', items: ['Flutter'] },
  { category: 'Desktop Development', items: ['.NET'] }
];

const TimelineItem = ({ children, logoSrc, isFirst, isLast }) => (
  <div className="relative grid grid-cols-[56px_1fr] gap-x-4 group mb-4 last:mb-0">
    <div className="relative flex justify-center items-center">
      
      {!isFirst && (
        <div className="absolute top-0 w-px h-[calc(50%+2px)] bg-primary dark:bg-darkSecondary z-0" />
      )}
      
      {!isLast && (
        <div className="absolute top-1/2 w-px h-[calc(50%+1rem+2px)] bg-primary dark:bg-darkSecondary z-0" />
      )}

      <img
        src={logoSrc}
        alt="Company Logo"
        className="relative z-10 w-14 h-14 rounded-full object-cover border border-primary dark:border-darkSecondary bg-white md:group-hover:scale-110 transition-transform duration-300 dark:drop-shadow-[0_0_10px_rgba(230,220,224,0.2)]"
      />
    </div>

    <div className="flex items-center">
      <div className="font-body font-light md:group-hover:translate-x-1.5 transition-transform duration-300 w-full">
        {children}
      </div>
    </div>
  </div>
);

export default function About() {
  const [displayCount, setDisplayCount] = useState(0);
  const [displayYearlyCount, setDisplayYearlyCount] = useState(0);

  useEffect(() => {
    const fetchMovieCount = async () => {
      try {
        const response = await fetch('/api/letterboxd_stats');
        const data = await response.json();
        if (data.count) animateCount(parseInt(data.count), setDisplayCount);
        if (data.yearlyCount) animateCount(parseInt(data.yearlyCount), setDisplayYearlyCount);
      } catch (error) {
        console.error('Failed to fetch movie count:', error);
      }
    };

    const animateCount = (finalNumber, setter) => {
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        setter(Math.floor(progress * finalNumber));
        if (progress < 1) requestAnimationFrame(updateCount);
        else setter(finalNumber);
      };

      requestAnimationFrame(updateCount);
    };

    fetchMovieCount();
  }, []);

  return (
    <div>
      <div className="p-6 bg-[var(--background)] transition-all">
        <SectionHeading ellipseRotation={-8} ellipseLength={175}>Hi, I'm Haris!</SectionHeading>
        <p className="mb-4 font-body font-light lg:text-lg">
          I study computer science at <ExternalLink href="https://maps.app.goo.gl/pMwmPBY1LVvr2nbp9">Rutgers University</ExternalLink>. My primary focus lies in backend engineering and distributed systems, but I'm increasingly fascinated by the infrastructure required to support large-scale AI/ML systems.
        </p>
        <p className="mb-4 font-body font-light lg:text-lg">
          When I'm not staring at a terminal, you'll probably find me looking at <Link href="/misc" className="text-primary hover:text-secondary dark:text-darkSecondary dark:hover:text-darkPrimary transition-all font-bold [text-decoration:none] pb-[0.5px] [box-shadow:inset_0_-0.5px_0_0_var(--primary)] dark:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] hover:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] dark:hover:[box-shadow:inset_0_-0.5px_0_0_var(--primary)] tracking-tighter dark:neon-glow">art</Link>. I also like to make an unnecessary amount of Spotify <ExternalLink href="https://open.spotify.com/playlist/4zrQBkUuuQqOy1TlYs0SFE?si=__iLDwCNRPydM1thPqkJ4Q">playlists</ExternalLink> and consider myself to be a movie enthusiast, having watched and logged <ExternalLink href={`https://letterboxd.com/${letterboxdUser}/`}>{displayCount} films</ExternalLink> (<ExternalLink href={`https://letterboxd.com/${letterboxdUser}/diary`}>{displayYearlyCount} this year</ExternalLink>) on Letterboxd so far. I've recently started learning guitar too.
        </p>
        <p className="mb-4 font-body font-light lg:text-lg">
          This website, which I’ve poured many hours into, is an attempt to capture my growth as a developer as well as the passions that fuel me outside of tech. Thanks for stopping by!
        </p>
      </div>
      
      <div className="p-6 bg-[var(--background)] transition-all mt-8">
        <SectionHeading ellipseRotation={5} ellipseLength={0}>Past, Present, and Future</SectionHeading>
        <div className="flex flex-col">
          <TimelineItem isFirst={true} logoSrc="images/logos/Jacobs.png">
            <p className="font-body font-light lg:text-lg">
              I am currently in New York, NY as a Software Engineer at <ExternalLink href="https://www.jacobs.com">Jacobs</ExternalLink> (Fortune 500)! I'm working on a decision-support system used to prioritize and track execution of $2B+ in infrastructure investments for the U.S Air Force.
            </p>
          </TimelineItem>
          <TimelineItem logoSrc="images/logos/hiyllo.png">
            <p className="font-body font-light lg:text-lg">
            I previously interned at Hiyllo, a startup developing a cloud-based collaboration platform towards for remote workforces. I did full-stack development and automated testing on their core product team.
            </p>
          </TimelineItem>
          <TimelineItem isLast={true} logoSrc="images/logos/cisco.jpeg">
            <p className="font-body font-light lg:text-lg">
              In summer 2024, I interned at <ExternalLink href="https://www.cisco.com">Cisco</ExternalLink> (Fortune 500) in San Jose, CA. I worked with the Network Automation team to integrate Terraform with pre-change validation capabilities available within <ExternalLink href="https://www.cisco.com/site/us/en/products/networking/cloud-networking/nexus-platform/index.html">Cisco Nexus Dashboard</ExternalLink>. I had the opportunity to work on Cisco's open-source Terraform provider framework with 9M+ downloads!
            </p>
          </TimelineItem>
        </div>
      </div>

      {/* <div className="p-6 bg-[var(--background)] transition-all mt-9">
        <SectionHeading ellipseRotation={-5} ellipseLength={200}>Technical Skills</SectionHeading>
        <p className="mb-4 font-body font-light text-lg">These are some languages, libraries, frameworks, and technologies that I have experience working with.</p>

        <div>
          {SKILL_GROUPS.map((group, index) => (
            <div
              key={group.category}
              className={index !== SKILL_GROUPS.length - 1 ? 'mb-8' : ''}
            >
              <h3 className="text-2xl font-body font-bold text-primary dark:text-darkSecondary mb-2 tracking-tighter dark:neon-glow">{group.category}</h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((skillName) => (
                  <SkillBadge key={skillName} skillName={skillName} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="p-6 bg-[var(--background)] transition-all mt-8">
        <SectionHeading ellipseRotation={5} ellipseLength={0}>Also</SectionHeading>
        <p className="mb-4 font-body font-light lg:text-lg">I've been reading a lot of <ExternalLink href="https://imagecomics.com/read/invincible">Invincible</ExternalLink> comic strips recently, so enjoy these gifs from <ExternalLink href="https://www.amazon.com/gp/video/detail/amzn1.dv.gti.b88cede2-2939-407a-a7b0-4b4a3a25bc76?autoplay=0&ref_=atv_cf_strg_wb">the show</ExternalLink>!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="relative">
            <div className="relative before:absolute before:content-[''] before:top-[4px] before:left-[4px] 
                      before:w-full before:h-full before:bg-primary dark:before:bg-darkSecondary 
                      before:rounded-xl before:z-0">
              <div className="relative z-10 transition-transform duration-300 
                        border border-primary dark:border-0 rounded-xl
                        md:hover:-translate-y-0.5 md:hover:-translate-x-0.5">
                <img
                  src="/images/peanuts/invinicblegif.gif" // CHNAGE THIS
                  alt="children dancing"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative before:absolute before:content-[''] before:top-[4px] before:left-[4px] 
                      before:w-full before:h-full before:bg-primary dark:before:bg-darkSecondary 
                      before:rounded-xl before:z-0">
              <div className="relative z-10 transition-transform duration-300 
                        border border-primary dark:border-0 rounded-xl
                        md:hover:-translate-y-0.5 md:hover:-translate-x-0.5">
                <img
                  src="/images/peanuts/invicniblegif3.gif" // CHANGE THIS
                  alt="snoopy dancing"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SkillBadge = ({ skillName }) => {
  const iconPath = `/images/tech_icons/${skillName.toLowerCase()
    .replace('.', '')
    .replace('/', '-')
    .replace('#', 'sharp')
    .replace(' ', '')}.png`;

  return (
    <div className="relative inline-block">
      <div className="absolute top-[4px] left-[4px] z-0">
        <div className="p-2 pr-4 flex items-center whitespace-nowrap bg-primary dark:bg-darkSecondary rounded-full">
          <div className="w-6 h-6 mr-2 flex items-center justify-center">
            <img src={iconPath} alt={`${skillName} icon`} className="w-5 h-5 object-contain" />
          </div>
          <span className="font-body font-medium text-[var(--primary)] text-base">
            {skillName}
          </span>
        </div>
      </div>

      <div className="relative z-10 transition-all bg-background dark:bg-darkBackground2 p-2 pr-4 flex items-center whitespace-nowrap border border-[var(--primary)] dark:border-darkBackground2 md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full">
        <div className="w-6 h-6 mr-2 flex items-center justify-center">
          <img src={iconPath} alt={skillName} className="w-5 h-5 object-contain" />
        </div>
        <span className="font-body font-medium text-[var(--primary)] text-base">{skillName}</span>
      </div>
    </div>
  );
};