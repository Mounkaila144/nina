'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartButton from '@/components/ui/CartButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    // Si on n'est pas sur la page d'accueil, rediriger vers la page d'accueil avec l'ancre
    if (window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section only on home page
      if (window.location.pathname === '/') {
        const sections = ['accueil', 'massage', 'store', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      } else {
        // Set active section based on current path
        const path = window.location.pathname;
        if (path.includes('nina-store')) {
          setActiveSection('nina-store');
        } else if (path.includes('massage')) {
          setActiveSection('massage');
        } else if (path.includes('contact')) {
          setActiveSection('contact');
        } else {
          setActiveSection('accueil');
        }
      }
    };

    // Initial call
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 navbar-animate ${
      isScrolled
        ? 'glass-effect-dark shadow-2xl'
        : 'bg-white/10 backdrop-blur-xl border-b border-white/10'
    }`}>
      <div className="container mx-auto px-4 relative">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--nina-burgundy)]/5 via-transparent to-[var(--nina-gold)]/5 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>


        {/* Enhanced Main navigation */}
        <div className={`relative flex justify-between items-center transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-3'
        }`}>
          <div className="flex items-center group cursor-pointer relative overflow-hidden rounded-xl px-3 py-2 glass-effect hover:glass-effect-dark transition-all duration-700 hover:scale-105 logo-container animate-fade-in-up" onClick={() => window.location.href = '/'}>
            {/* Enhanced Background luxury effects */}
            <div className="absolute inset-0 nina-luxury-gradient-light opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--nina-gold)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[var(--nina-gold)]/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-float"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            {/* Enhanced Decorative icon */}
            <div className="relative mr-3 group-hover:scale-110 transition-transform duration-700">
              <div className="w-8 h-8 rounded-full nina-luxury-gradient-dark flex items-center justify-center luxury-shadow group-hover:shadow-2xl transition-all duration-500">
                <span className="text-white font-bold text-sm font-playfair group-hover:scale-125 transition-transform duration-500">N</span>
              </div>
              {/* Enhanced Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--nina-burgundy)] via-[var(--nina-gold)] to-[var(--nina-burgundy)] opacity-0 group-hover:opacity-50 transition-opacity duration-700 blur-md animate-gradient-x"></div>
              <div className="absolute inset-0 rounded-full bg-[var(--nina-gold)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
            </div>

            {/* Text content */}
            <div className="relative z-10">
              <h1 className={`font-bold transition-all duration-500 group-hover:scale-102 ${
                isScrolled ? 'text-base md:text-lg' : 'text-lg md:text-xl'
              }`}>
                <span className="bg-gradient-to-r from-[var(--nina-burgundy)] via-[var(--nina-gold)] to-[var(--nina-burgundy)] bg-clip-text text-transparent font-playfair text-logo-glow gradient-text-animate group-hover:from-[var(--nina-gold)] group-hover:via-[var(--nina-burgundy)] group-hover:to-[var(--nina-gold)] transition-all duration-500">
                  Nina
                </span>
                <span className="text-white ml-2 font-light group-hover:text-[var(--nina-gold)] transition-colors duration-300 relative text-logo-glow">
                  {typeof window !== 'undefined' && window.location.pathname === '/nina-store' ? 'Store' : 'Massage & Kiné'}
                  {/* Underline effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--nina-burgundy)] to-[var(--nina-gold)] group-hover:w-full transition-all duration-500"></div>
                </span>
              </h1>
              <p className="text-xs text-white/80 font-medium tracking-wide group-hover:text-[var(--nina-gold)] transition-colors duration-300 opacity-70 group-hover:opacity-100 hidden sm:block">
                <span className="inline-block mr-1 group-hover:animate-pulse">✨</span>
                {typeof window !== 'undefined' && window.location.pathname === '/nina-store' ? 'Boutique en ligne' : 'Centre de Bien-être'}
                <span className="inline-block ml-1 group-hover:animate-pulse">
                  {typeof window !== 'undefined' && window.location.pathname === '/nina-store' ? '🛍️' : '💆‍♀️'}
                </span>
              </p>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-[var(--nina-burgundy)] to-[var(--nina-gold)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-gradient-to-tr from-[var(--nina-gold)] to-[var(--nina-burgundy)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => scrollToSection('accueil')}
              className={`group nav-link-hover px-4 py-2 transition-all duration-500 font-medium rounded-lg relative overflow-hidden ${
                activeSection === 'accueil'
                  ? 'text-white bg-gradient-to-r from-[var(--nina-burgundy)] to-[var(--nina-gold)] luxury-shadow'
                  : 'text-white hover:text-[var(--nina-gold)] glass-effect hover:glass-effect-dark'
              }`}
            >
              <span className="relative z-10">Accueil</span>
              {activeSection !== 'accueil' && (
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--nina-burgundy)]/20 to-[var(--nina-gold)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
            </button>
            <button
              onClick={() => scrollToSection('massage')}
              className={`group nav-link-hover px-4 py-2 transition-all duration-500 font-medium rounded-lg relative overflow-hidden ${
                activeSection === 'massage'
                  ? 'text-white bg-gradient-to-r from-[var(--nina-burgundy)] to-[var(--nina-gold)] luxury-shadow'
                  : 'text-white hover:text-[var(--nina-gold)] glass-effect hover:glass-effect-dark'
              }`}
            >
              <span className="relative z-10">Services</span>
              {activeSection !== 'massage' && (
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--nina-burgundy)]/20 to-[var(--nina-gold)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
            </button>
            <a
              href="/nina-store"
              className={`group nav-link-hover px-4 py-2 transition-all duration-500 font-medium rounded-lg relative overflow-hidden ${
                activeSection === 'nina-store'
                  ? 'text-white bg-gradient-to-r from-[var(--nina-burgundy)] to-[var(--nina-gold)] luxury-shadow'
                  : 'text-white hover:text-[var(--nina-gold)] glass-effect hover:glass-effect-dark'
              }`}
            >
              <span className="relative z-10">Nina Store</span>
              {activeSection !== 'nina-store' && (
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--nina-burgundy)]/20 to-[var(--nina-gold)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className={`group nav-link-hover px-4 py-2 transition-all duration-500 font-medium rounded-lg relative overflow-hidden ${
                activeSection === 'contact'
                  ? 'text-white bg-gradient-to-r from-[var(--nina-burgundy)] to-[var(--nina-gold)] luxury-shadow'
                  : 'text-white hover:text-[var(--nina-gold)] glass-effect hover:glass-effect-dark'
              }`}
            >
              <span className="relative z-10">Contact</span>
              {activeSection !== 'contact' && (
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--nina-burgundy)]/20 to-[var(--nina-gold)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
            </button>
            <div className="ml-4 flex items-center space-x-3">
              {/* Show cart button only on Nina Store page */}
              {typeof window !== 'undefined' && window.location.pathname === '/nina-store' && (
                <div className="animate-scale-in">
                  <CartButton />
                </div>
              )}
              <a
                href="https://wa.me/22781836571"
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-effect border border-white/30 text-white px-4 py-2 rounded-full font-semibold hover:glass-effect-dark hover:text-[var(--nina-gold)] transition-all duration-500 hover:scale-105 luxury-shadow text-sm relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 group-hover:animate-bounce" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </span>
                <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </a>
              <Button
                onClick={() => scrollToSection('contact')}
                className="group nina-luxury-gradient-dark text-white hover:opacity-90 transition-all duration-500 px-4 py-2 rounded-full font-semibold hover:scale-105 luxury-shadow relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Phone className="w-4 h-4 group-hover:animate-pulse" />
                  <span className="hidden sm:inline">Réserver</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--nina-gold)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-3 rounded-full luxury-backdrop border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 luxury-shadow"
          >
            {isMenuOpen ?
              <X size={20} className="text-[var(--nina-burgundy)]" /> :
              <Menu size={20} className="text-[var(--nina-burgundy)]" />
            }
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/10 mobile-menu-animate nina-luxury-gradient-light/50 backdrop-blur-xl">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection('accueil')}
                className="text-left text-white hover:text-[var(--nina-gold)] transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/20 font-medium"
              >
                🏠 Accueil
              </button>
              <button
                onClick={() => scrollToSection('massage')}
                className="text-left text-white hover:text-[var(--nina-gold)] transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/20 font-medium"
              >
                💆‍♀️ Services
              </button>
              <a
                href="/nina-store"
                className="text-left text-white hover:text-[var(--nina-gold)] transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/20 font-medium block"
              >
                🛍️ Nina Store
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-white hover:text-[var(--nina-gold)] transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/20 font-medium"
              >
                📞 Contact
              </button>
              <div className="pt-4 space-y-3">
                <a
                  href="https://wa.me/22781836571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 luxury-shadow"
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp</span>
                </a>
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="nina-luxury-gradient-dark text-white w-full py-3 rounded-lg font-semibold luxury-shadow"
                >
                  Réserver Maintenant
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}