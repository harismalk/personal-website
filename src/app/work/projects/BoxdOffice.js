import { useEffect, useRef } from 'react';
import SectionHeading from '../SectionHeading';

export default function BoxdOffice() {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = videoRef.current;
            if (video) {
              video.play().catch(error => {
                console.log('Autoplay prevented:', error);
              });
            }
          } else {
            const video = videoRef.current;
            if (video) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="mt-4 space-y-6">
      <div className="mb-6">
        <SectionHeading>The Project</SectionHeading>
        <p className="font-body  font-light">
          Here's what you'll see after Sunday has processed your email inbox:
        </p>

        <div className="mt-4 overflow-hidden border border-primary dark:border-darkBackground2 rounded-lg">
          <video
            ref={videoRef}
            controls
            className="w-full"
            muted
            playsInline
          >
            <source src="/videos/Copy of Sunday_Demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="mb-6">
        <SectionHeading>Technical Overview</SectionHeading>
        <ul className="list-disc pl-5 font-body font-light dark:[&>li]:marker:text-darkSecondary">
          <li>React frontend with Framer Motion animations and UI design</li>
          <li>Node.js + Express backend with a cron job running to automatically process incoming emails</li>
          <li>Google OAuth 2.0 + Gmail API for authentication and all email read/write operations</li>
          <li>MongoDB Atlas for data storage, with Vector Search (1536-dimension embeddings) enabling semantic retrieval of email history</li>
          <li>Swilio for optional SMS notifications on matched automation rules</li>
        </ul>
      </div>

      <div className="mb-6">
        <SectionHeading>Thoughts</SectionHeading>
        <p className="font-body  mb-4 font-light">
        I built Sunday Mail as a cheaper alternative to a YCombinator company doing something similar, but charging $100/month. The core idea was simple: let users
  write automation rules in plain English ("if someone asks about invoices, draft a reply and text me"), and have the app handle the rest
  silently in the background. I ended up implementing a full RAG pipeline so it could reference real email history rather
  than hallucinate context. Storing embeddings directly in MongoDB Atlas kept the architecture clean without needing a separate vector
  database. The cron-based polling approach trades some latency for simplicity, which was the right call at this stage. There's a natural
  next step toward a recommendation or triage system using the embeddings already being collected, and adding more email providers beyond
  Gmail would open it up significantly. Overall, this was a great project for me to learn more about building RAG pipelines from scratch!    </p>
      </div>
    </div>
  );
}



  