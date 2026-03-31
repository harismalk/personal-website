const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    className="text-primary hover:opacity-50 dark:hover:opacity-100 dark:text-darkSecondary dark:hover:text-darkPrimary transition-all font-bold [text-decoration:none] pb-[0.5px] [box-shadow:inset_0_-0.5px_0_0_var(--primary)] dark:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] hover:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] dark:hover:[box-shadow:inset_0_-0.5px_0_0_var(--primary)] tracking-tighter dark:neon-glow"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export default ExternalLink;