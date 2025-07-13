'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import PurchaseDomainManager from '@/components/dashboard/PurchaseDomainManager';

interface PurchaseDomainPageProps {
  params: {
    id: string;
  };
}

const PurchaseDomainPage: React.FC<PurchaseDomainPageProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <PurchaseDomainManager purchaseId={id} />
      </div>
    </div>
  );
};

export default PurchaseDomainPage; 