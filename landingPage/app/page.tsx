import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { NavMenu } from "@/components/nav-menu";

// Use dynamic imports with loading fallbacks for better performance
const HeroSection = dynamic(() => import("@/components/hero-section").then(mod => ({ default: mod.HeroSection })), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse p-8 bg-muted rounded-lg">Loading hero...</div></div>
});

const FeaturesSection = dynamic(() => import("@/components/features-section").then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <div className="py-20"><div className="container mx-auto px-4 animate-pulse h-64 bg-muted rounded-lg"></div></div>
});

const HowItWorks = dynamic(() => import("@/components/how-it-works").then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <div className="py-20 bg-muted/50"><div className="container mx-auto px-4 animate-pulse h-64 bg-background rounded-lg"></div></div>
});

const PricingSection = dynamic(() => import("@/components/pricing-section").then(mod => ({ default: mod.PricingSection })), {
  loading: () => <div className="py-20"><div className="container mx-auto px-4 animate-pulse h-64 bg-muted rounded-lg"></div></div>
});

const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <div className="py-20 bg-muted/30"><div className="container mx-auto px-4 animate-pulse h-64 bg-background rounded-lg"></div></div>
});

const CTASection = dynamic(() => import("@/components/cta-section").then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-20"><div className="container mx-auto px-4 animate-pulse h-24 bg-primary/20 rounded-lg"></div></div>
});

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="bg-muted/30 py-16"><div className="container mx-auto px-4 animate-pulse h-40 bg-background rounded-lg"></div></div>
});

console.log("Rendering home page with optimized loading");

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavMenu />
      
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse p-8 bg-muted rounded-lg">Loading content...</div></div>}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<div className="py-20"><div className="container mx-auto px-4 animate-pulse h-64 bg-muted rounded-lg"></div></div>}>
        <FeaturesSection />
      </Suspense>
      
      <Suspense fallback={<div className="py-20 bg-muted/50"><div className="container mx-auto px-4 animate-pulse h-64 bg-background rounded-lg"></div></div>}>
        <HowItWorks />
      </Suspense>
      
      <Suspense fallback={<div className="py-20"><div className="container mx-auto px-4 animate-pulse h-64 bg-muted rounded-lg"></div></div>}>
        <PricingSection />
      </Suspense>
      
      <Suspense fallback={<div className="py-20 bg-muted/30"><div className="container mx-auto px-4 animate-pulse h-64 bg-background rounded-lg"></div></div>}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<div className="py-20"><div className="container mx-auto px-4 animate-pulse h-24 bg-primary/20 rounded-lg"></div></div>}>
        <CTASection />
      </Suspense>
      
      <Suspense fallback={<div className="bg-muted/30 py-16"><div className="container mx-auto px-4 animate-pulse h-40 bg-background rounded-lg"></div></div>}>
        <Footer />
      </Suspense>
    </main>
  );
}