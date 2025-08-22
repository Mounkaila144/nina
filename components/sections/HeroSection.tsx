'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Heart, Star, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const heroImages = [
  'https://ninamassage.com/cdn/shop/files/1e24e693-988e-446c-a59a-e5eaadbee9f5_1.jpg?v=1746389815&width=3840',
  'https://ninamassage.com/cdn/shop/files/IMG_0814.jpg?v=1746459466&width=1920',
  'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Slightly longer for better UX
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
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
    <section ref={heroRef} id="accueil" className="relative min-h-screen overflow-hidden pt-14 sm:pt-16 md:pt-18">
      {/* Enhanced Background with Parallax Effect */}
      <div className="absolute inset-0 nina-luxury-gradient-radial opacity-30"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Interactive Glow Effect */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(212, 175, 55, 0.1), transparent 40%)`,
        }}
      />

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

      {/* Accessible Carousel Controls */}
      <button
        onClick={prevSlide}
        aria-label="Image précédente"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--nina-gold)]"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Image suivante"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--nina-gold)]"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Accessible Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10" role="tablist" aria-label="Sélecteur d'images">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Aller à l'image ${index + 1}`}
            className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--nina-gold)] ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Enhanced Hero Content */}
      <div className="relative z-10 min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4.5rem)] flex items-center justify-center py-4 sm:py-8">
        <div className={`text-center text-white max-w-5xl mx-auto px-4 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>

          {/* Premium Badge */}
          <div className={`inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8 transition-all duration-700 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Award className="text-[var(--nina-gold)] w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Centre de Bien-être Premium</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-[var(--nina-gold)] fill-current" />
              ))}
            </div>
          </div>

          {/* Main Title with Enhanced Animation */}
          <div className={`flex items-center justify-center mb-8 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <Sparkles className="text-[var(--nina-gold)] mr-4 drop-shadow-lg animate-pulse" size={40} />
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-playfair font-light luxury-text-shadow bg-gradient-to-r from-white via-[var(--nina-gold)] to-white bg-clip-text text-transparent animate-gradient-x">
              Nina
              <span className="sr-only"> Massage & Kiné - Centre de Massage Professionnel à Niamey, Niger</span>
            </h1>
            <Heart className="text-[var(--nina-gold)] ml-4 drop-shadow-lg animate-pulse" size={40} />
          </div>

          {/* Subtitle with Elegant Typography */}
          <div className={`mb-8 transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="text-2xl md:text-3xl lg:text-4xl mb-2 font-light tracking-wider text-[var(--nina-gold)]">
              Massage & Kinésithérapie
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[var(--nina-gold)] to-transparent mx-auto"></div>
          </div>

          {/* Enhanced Description */}
          <p className={`text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90 font-light transition-all duration-1000 delay-900 ${
            isLoaded ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Découvrez l'excellence du bien-être avec nos services premium :
            <span className="text-[var(--nina-gold)] font-medium"> drainage lymphatique</span>,
            <span className="text-[var(--nina-gold)] font-medium"> massage 4 mains</span>,
            <span className="text-[var(--nina-gold)] font-medium"> soins esthétiques</span> et bien plus encore.
          </p>

          {/* Stats Section */}
          <div className={`flex flex-wrap justify-center gap-8 mb-12 transition-all duration-1000 delay-1100 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[var(--nina-gold)] mb-1">500+</div>
              <div className="text-sm text-white/80 tracking-wide">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[var(--nina-gold)] mb-1">5★</div>
              <div className="text-sm text-white/80 tracking-wide">Note Moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[var(--nina-gold)] mb-1">3+</div>
              <div className="text-sm text-white/80 tracking-wide">Années d'Expérience</div>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-1300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Button
              onClick={() => window.location.href = '/massage'}
              size="lg"
              aria-label="Découvrir nos services de massage et kinésithérapie"
              className="group nina-luxury-gradient-dark text-white hover:opacity-90 transition-all duration-500 px-10 py-5 text-lg hover-lift luxury-shadow rounded-full relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--nina-gold)]"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 group-hover:animate-spin transition-transform duration-500" />
                <span>Découvrir Nos Services</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--nina-gold)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>
            <Button
              onClick={() => window.location.href = '/nina-store'}
              size="lg"
              variant="outline"
              aria-label="Visiter notre boutique en ligne Nina Store"
              className="group luxury-backdrop border-2 border-white/40 text-white hover:bg-white/20 hover:border-[var(--nina-gold)] transition-all duration-500 px-10 py-5 text-lg hover-lift luxury-border rounded-full relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--nina-gold)]"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Heart className="w-5 h-5 group-hover:animate-pulse transition-transform duration-500" />
                <span>Visiter Nina Store</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--nina-gold)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}