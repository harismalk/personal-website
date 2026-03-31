import SectionHeading from '../SectionHeading';

export default function Hydropower() {
    return (
      <div className="mt-4 space-y-6">
        <div className="mb-6">
          <SectionHeading>Technical Overview</SectionHeading>
          <p className="font-body  font-light mb-2">
            Implemetning this integration involved:
          </p>
          <ul className="list-disc pl-5 font-body font-light dark:[&>li]:marker:text-darkSecondary">
            <li>Turned Terraform plan output into APIC-style JSON payloads so infrastructure defined in Terraform could be expressed in the same object model the controller expects, without hand-writing REST bodies</li>
            <li>Mapped Terraform resource attributes and lifecycle (including deletes) to ACI classes, DNs, and parent/child relationships so planned state stayed consistent with how the fabric is modeled</li>
            <li>Centralized per-resource conversion behind a registry and reused the provider’s own create/delete payload logic so generated payloads stayed aligned with production behavior as resources evolved</li>
            <li>Hierarchical assembly — Built a merge step that combined flat per-object fragments into a single tree under the fabric root (uni), with metadata-driven class resolution along DN paths for correct nesting</li>
            <li>End-to-end validation — Added an optional path to push the generated payload to APIC and re-check Terraform plans so conversions could be verified against a live fabric, not only static JSON            </li>






          </ul>
        </div>
        <div className="mb-6">
          <SectionHeading>Thoughts</SectionHeading>
          <p className="font-body  mb-6 font-light">
            Network programmability was a new frontier for me, so this project was a great learning experience. This project was interesting to work on because of the real-world application and potential for growth. 
            What excited me the most was seeing the potential for this technology to essentially solve all network incidences that could arise from infrastructure configuration changes.
             As for the development process, I ended up gaining a much deeper understanding of the networking and infrastructure as code. 
             It took a lot of time and learning, but I enjoyed the process!
          </p>
        </div>
      </div>
    );
  }