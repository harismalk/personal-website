import SectionHeading from '../SectionHeading';

export default function Biquadris() {
    return (
      <div className="mt-4 space-y-6">
        <div className="mb-6">
          <SectionHeading>The Project</SectionHeading>
          <p className="font-body  font-light mb-2">
            Some features of the project include:
          </p>
          <ul className="list-disc pl-5 font-body font-light dark:[&>li]:marker:text-darkSecondary">
            <li>Multiplayer mechanics (compete 1v1 with another player)</li>
            <li>Tetris mechanics (e.g hold queue, block previews, ghost piece visualization)</li>
            <li>Customizable commands (the ability to rename commands and create macros)</li>
            <li>Level system (5 distinct levels with unique block generation rules)</li>
            <li>Special effects ("blind" and "heavy" modifiers to disrupt opponents)</li>
          </ul>
        </div>
        <div className="mb-6">
          <SectionHeading>Technical Overview</SectionHeading>
          <ul className="list-disc pl-5 font-body  font-light dark:[&>li]:marker:text-darkSecondary">
            <li>C++ with smart pointers for automatic memory management</li>
            <li>Object-oriented design (e.g abstract Block and Level hierarchies)</li>
            <li>Observer design pattern for decoupled UI rendering (text and graphical displays via X11)</li>
            <li>Factory design pattern for dynamic block/level generation</li>
            <li>Modular components (separated game logic, UI, and gameplay mechanics)</li>
          </ul>
        </div>
        <div className="mb-6">
          <SectionHeading>Thoughts</SectionHeading>
          <p className="font-body  mb-6 font-light">
          The process of developing Biquadris was a deep dive into object-oriented programming. Before writing a single line of code, our team invested significant time in designing a detailed UML diagram to map out class relationships, responsibilities, and interactions. This upfront planning paid off; by agreeing on architecture early, we avoided major refactoring headaches later and could work in parallel without stepping on each other’s toes. We spent a lot of time thinking about good design, so this project also reinforced the benefits of encapsulation and loose coupling for making teamwork smoother. After implementing the core game mechanics, I had the opportunity to enhance the project with bonus features. I grew up playing Tetris, so I had a lot of fun with refining the design of the game and adding features. We ended up earning a 106% final grade on the project, which I was pretty happy about! The experience not only strengthened my skills with C++ but also deepened my appreciation for clean, scalable design.
          </p>
        </div>
      </div>
    );
  }