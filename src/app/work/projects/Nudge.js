import SectionHeading from '../SectionHeading';

export default function Nudge() {
    return (
      <div className="mt-4 space-y-6">
        <div className="mb-6">
          <SectionHeading>The Project</SectionHeading>
          <p className="font-body  font-light">
            The user would express the task that they are trying to accomplish; for example, maybe they want to practice Leetcode and get a job. The extension would then start observing their activity, making snarky comments verbally and nudging them to get back on track (hence the name). If they opened a problem and went straight to the solution, they would get called out. The extension "speaks" out loud in a tone and voice that's meant to mimic the narrator in The Stanley Parable.
          </p>
        </div>
        <div className="mb-6">
          <SectionHeading>Technical Overview</SectionHeading>
          <ul className="list-disc pl-5 font-body  font-light dark:[&>li]:marker:text-darkSecondary">
            <li>JavaScript for the core functionality and user activity monitoring</li>
            <li>React for the extension's pop-up and dashboard</li>
            <li>MongoDB for storing activity logs</li>
            <li>Flask for the back end</li>
            <li>GPT-4 (OpenAI) for generating responses</li>
            <li>Eleven Labs TTS for giving voice to the narrator</li>
          </ul>
        </div>
        <div className="mb-6">
          <SectionHeading>Thoughts</SectionHeading>
          <p className="font-body  mb-6 font-light">
            This product isn't perfect (most hackathon projects aren't), but it taught me a lot about how Chrome extensions work under the hood. I gained some pretty valuable full-stack experience, but unfortunately also learned firsthand about how frustrating Chrome extensions can be to debug, especially when I'm trying to trace different messages and errors between background scripts, popups, and content scripts. However, this made it extra satisfying when the project started coming together nicely. I enjoyed the process of building Nudge, especially in the unique environment of a hackathon, and found the premise to be really fun to design.
          </p>
        </div>
      </div>
    );
  }