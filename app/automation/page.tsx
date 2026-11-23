import { ServicePage, serviceMetadata } from '@/components/service-page';
import { getService } from '@/lib/services';

const service = getService('automation');

export const metadata = serviceMetadata(service);

export default function AutomationPage() {
  return <ServicePage service={service} />;
}
