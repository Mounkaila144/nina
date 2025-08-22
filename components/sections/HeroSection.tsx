'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const heroImages = [
  'https://ninamassage.com/cdn/shop/files/1e24e693-988e-446c-a59a-e5eaadbee9f5_1.jpg?v=1746389815&width=3840',
  'https://ninamassage.com/cdn/shop/files/IMG_0814.jpg?v=1746459466&width=1920',
  'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="relative h-screen overflow-hidden">
      {/* Luxury Background Gradient */}
      <div className="absolute inset-0 nina-luxury-gradient-radial opacity-20"></div>

      {/* Carousel Background */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Spa ambiance ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 nina-luxury-overlay" />
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-[var(--nina-gold)] mr-2 drop-shadow-lg" size={32} />
            <h1 className="text-5xl md:text-7xl font-playfair font-light luxury-text-shadow">
              Nina
            </h1>
            <Heart className="text-[var(--nina-gold)] ml-2 drop-shadow-lg" size={32} />
          </div>
          
          <p className="text-xl md:text-2xl mb-6 font-light tracking-wide">
            Massage & Kiné
          </p>

          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
            Bienvenue chez Nina Massage & Kiné. Découvrez notre catalogue de services :
            drainage lymphatique, massage 4 mains, pédicure, manucure et bien plus encore.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => window.location.href = '/massage'}
              size="lg"
              className="nina-luxury-gradient-dark text-white hover:opacity-90 transition-all duration-300 px-8 py-4 text-lg hover-lift luxury-shadow"
            >
              Découvrir Nos Services
            </Button>
            <Button
              onClick={() => window.location.href = '/nina-store'}
              size="lg"
              variant="outline"
              className="luxury-backdrop border-white/30 text-white hover:bg-white/20 transition-all duration-300 px-8 py-4 text-lg hover-lift luxury-border"
            >
              Visiter Nina Store
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}