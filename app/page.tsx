import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import MassageSection from '@/components/sections/MassageSection';
import StoreSection from '@/components/sections/StoreSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <MassageSection />
      <StoreSection />
      <ContactSection />
      <Footer />
    </main>
  );
}