import { purchase } from '@/database/schema/purchase';
import { basedomain } from '@/database/schema/basedomain';
import { subdomainclaim } from '@/database/schema/subdomainclaim';
import {eq} from "drizzle-orm"
export interface CreatePurchaseData {
  buyerID: string;
  price: number;
  status?: string;
  paymentMethod?: string;
  paymentRefId?: string;
}

export interface PurchaseBaseDomainData {
  domainName: string;
  platform: string;
  apiKey?: string;
}

export interface PurchaseSubdomainData {
  subdomain: string;
  fulldomain: string;
  basedomainId: string;
  vercelProjectId?: string;
  vercelProjectUrl?: string;
  secretId: string;
}

export interface DomainPurchaseRequest {
  buyerID: string;
  price: number;
  paymentMethod?: string;
  paymentRefId?: string;
  purchaseType: 'base_domain' | 'subdomain';
  domainData: PurchaseBaseDomainData | PurchaseSubdomainData;
}

export function validatePurchaseData(data: CreatePurchaseData): boolean {
  return !!(data.buyerID && data.price && data.price > 0);
}

export function validateDomainPurchaseData(data: DomainPurchaseRequest): boolean {
  if (!data.buyerID || !data.price || !data.purchaseType || !data.domainData) {
    return false;
  }

  if (data.purchaseType === 'base_domain') {
    const baseDomainData = data.domainData as PurchaseBaseDomainData;
    return !!(baseDomainData.domainName && baseDomainData.platform);
  } else if (data.purchaseType === 'subdomain') {
    const subdomainData = data.domainData as PurchaseSubdomainData;
    return !!(subdomainData.subdomain && subdomainData.fulldomain && 
              subdomainData.basedomainId && subdomainData.secretId);
  }

  return false;
}

export function generatePaymentRefId(): string {
  return `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function calculateUserTotalSpent(db: any, userId: string): Promise<number> {
  const purchases = await db
    .select({ price: purchase.price })
    .from(purchase)
    .where(eq(purchase.buyerID, userId));

  return purchases.reduce((total: number, p: any) => total + parseFloat(p.price), 0);
}

