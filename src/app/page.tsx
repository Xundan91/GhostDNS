import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </>
  );
}