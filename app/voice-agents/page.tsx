import { ServicePage, serviceMetadata } from '@/components/service-page';
import { getService } from '@/lib/services';

const service = getService('voice-agents');

export const metadata = serviceMetadata(service);

export default function VoiceAgentsPage() {
  return <ServicePage service={service} />;
}
