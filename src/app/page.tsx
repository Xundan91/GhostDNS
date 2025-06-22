import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <div className="pt-24">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  );
}