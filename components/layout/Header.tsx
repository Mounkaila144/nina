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
    <header className="fixed w-full top-0 z-50 transition-all duration-300 navbar-animate bg-white/95 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4">


        {/* Main navigation */}
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}>
          <div className="flex items-center group cursor-pointer relative overflow-hidden rounded-xl px-3 py-2 hover:bg-white/10 transition-all duration-500 luxury-backdrop border border-white/20 hover:border-[var(--nina-burgundy)]/50 hover:shadow-lg logo-container" onClick={() => window.location.href = '/'}>
            {/* Background luxury effects */}
            <div className="absolute inset-0 nina-luxury-gradient-light opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--nina-gold)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 luxury-shimmer"></div>

            {/* Decorative icon */}
            <div className="relative mr-3 group-hover:scale-105 transition-transform duration-500">
              <div className="w-8 h-8 rounded-full nina-luxury-gradient-dark flex items-center justify-center luxury-shadow group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-white font-bold text-sm font-playfair group-hover:scale-110 transition-transform duration-300">N</span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--nina-burgundy)] via-[var(--nina-gold)] to-[var(--nina-burgundy)] opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm"></div>
            </div>

            {/* Text content */}
            <div className="relative z-10">
              <h1 className={`font-bold transition-all duration-500 group-hover:scale-102 ${
                isScrolled ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
              }`}>
                <span className="bg-gradient-to-r from-[var(--nina-burgundy)] via-[var(--nina-gold)] to-[var(--nina-burgundy)] bg-clip-text text-transparent font-playfair text-logo-glow gradient-text-animate group-hover:from-[var(--nina-gold)] group-hover:via-[var(--nina-burgundy)] group-hover:to-[var(--nina-gold)] transition-all duration-500">
                  Nina
                </span>
                <span className="text-gray-800 ml-2 font-light group-hover:text-[var(--nina-burgundy)] transition-colors duration-300 relative text-logo-glow">
                  {typeof window !== 'undefined' && window.location.pathname === '/nina-store' ? 'Store' : 'Massage & Kiné'}
                  {/* Underline effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--nina-burgundy)] to-[var(--nina-gold)] group-hover:w-full transition-all duration-500"></div>
                </span>
              </h1>
              <p className="text-xs text-gray-600 font-medium tracking-wide group-hover:text-[var(--nina-burgundy)] transition-colors duration-300 opacity-70 group-hover:opacity-100">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => scrollToSection('accueil')}
              className={`nav-link-hover px-4 py-2 transition-all duration-300 font-medium rounded-lg hover:bg-white/20 ${
                activeSection === 'accueil'
                  ? 'text-[var(--nina-burgundy)] bg-white/20 luxury-shadow'
                  : 'text-gray-700 hover:text-[var(--nina-burgundy)]'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('massage')}
              className={`nav-link-hover px-4 py-2 transition-all duration-300 font-medium rounded-lg hover:bg-white/20 ${
                activeSection === 'massage'
                  ? 'text-[var(--nina-burgundy)] bg-white/20 luxury-shadow'
                  : 'text-gray-700 hover:text-[var(--nina-burgundy)]'
              }`}
            >
              Services
            </button>
            <a
              href="/nina-store"
              className={`nav-link-hover px-4 py-2 transition-all duration-300 font-medium rounded-lg hover:bg-white/20 ${
                activeSection === 'nina-store'
                  ? 'text-[var(--nina-burgundy)] bg-white/20 luxury-shadow'
                  : 'text-gray-700 hover:text-[var(--nina-burgundy)]'
              }`}
            >
              Nina Store
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className={`nav-link-hover px-4 py-2 transition-all duration-300 font-medium rounded-lg hover:bg-white/20 ${
                activeSection === 'contact'
                  ? 'text-[var(--nina-burgundy)] bg-white/20 luxury-shadow'
                  : 'text-gray-700 hover:text-[var(--nina-burgundy)]'
              }`}
            >
              Contact
            </button>
            <div className="ml-4 flex items-center space-x-3">
              {/* Show cart button only on Nina Store page */}
              {typeof window !== 'undefined' && window.location.pathname === '/nina-store' && (
                <CartButton />
              )}
              <a
                href="https://wa.me/22781836571"
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-backdrop border border-white/30 text-[var(--nina-burgundy)] px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 luxury-shadow text-sm"
              >
                WhatsApp
              </a>
              <Button
                onClick={() => scrollToSection('contact')}
                className="nina-luxury-gradient-dark text-white hover:opacity-90 transition-all duration-300 px-6 py-2 rounded-full font-semibold hover:scale-105 luxury-shadow"
              >
                Réserver
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
                className="text-left text-gray-700 hover:text-[var(--nina-burgundy)] transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/20 font-medium"
              >
                🏠 Accueil
              </button>
              <button
                onClick={() => scrollToSection('massage')}
                className="text-left text-gray-700 hover:text-[var(--nina-burgundy)] transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/20 font-medium"
              >
                💆‍♀️ Services
              </button>
              <a
                href="/nina-store"
                className="text-left text-gray-700 hover:text-[var(--nina-burgundy)] transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/20 font-medium block"
              >
                🛍️ Nina Store
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-[var(--nina-burgundy)] transition-all duration-300 py-3 px-4 rounded-lg hover:bg-white/20 font-medium"
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