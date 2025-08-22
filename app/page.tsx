'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import MassageSection from '@/components/sections/MassageSection';
import StoreSection from '@/components/sections/StoreSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function Home() {
  // Handle anchor links when page loads
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Délai plus long pour laisser le temps à la page de se charger
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <MassageSection />
      <StoreSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}