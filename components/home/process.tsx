import { Section, SectionHeading } from '@/components/section';
import { StepList } from '@/components/step-list';
import { processSteps } from '@/lib/home-content';

export function Process() {
  return (
    <Section id="how-it-works" labelledBy="process-heading">
      <SectionHeading
        id="process-heading"
        title="How it works"
        intro="Four simple steps. You see real results on your own calls and tasks before you commit to a rollout."
      />
      <StepList
        className="mt-10"
        columns={4}
        steps={processSteps.map((s) => ({ title: s.title, meta: s.duration, share: s.share, get: s.get }))}
      />
    </Section>
  );
}
