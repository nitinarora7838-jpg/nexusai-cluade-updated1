import { ServicePage, serviceMetadata } from '@/components/service-page';
import { getService } from '@/lib/services';

const service = getService('voice-chat');

export const metadata = serviceMetadata(service);

export default function VoiceChatPage() {
  return <ServicePage service={service} />;
}
