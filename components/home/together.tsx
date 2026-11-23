import { FlowDiagram } from '@/components/flow-diagram';
import { Section, SectionHeading } from '@/components/section';
import { togetherFlow } from '@/lib/home-content';

export function Together() {
  return (
    <Section id="together" labelledBy="together-heading">
      <SectionHeading
        id="together-heading"
        eyebrow="One connected system"
        title="How they work together"
        intro="Voice handles the conversation. Automation handles everything that should happen after it."
      />
      <div className="mt-12">
        <FlowDiagram steps={togetherFlow} />
      </div>
    </Section>
  );
}
