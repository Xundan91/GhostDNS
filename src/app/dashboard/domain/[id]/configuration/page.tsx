import DomainConfiguration from '@/components/dashboard/DomainConfiguration';

export default function DomainConfigurationPage({ params }: { params: { id: string } }) {
  return <DomainConfiguration domainId={params.id} />;
} 