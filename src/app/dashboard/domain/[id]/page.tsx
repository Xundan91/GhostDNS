import DomainDetail from '@/components/dashboard/DomainDetail';

export default function DomainDetailPage({ params }: { params: { id: string } }) {
  return <DomainDetail domainId={params.id} />;
} 