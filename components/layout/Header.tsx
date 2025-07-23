'use client';

import { useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone size={14} />
              <span>+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin size={14} />
              <span>123 Rue de la Beauté, 75001 Paris</span>
            </div>
          </div>
          <div className="text-gray-600">
            Lun-Sam: 9h-19h | Dim: 10h-17h
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="nina-burgundy font-playfair">Nina</span>
              <span className="text-gray-800 ml-2 font-light">Spa & Store</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('accueil')}
              className="text-gray-700 hover:text-[var(--nina-burgundy)] transition-colors duration-300"
            >
              Accueil
            </button>
            <a 
              href="/massage"
              className="text-gray-700 hover:text-[var(--nina-burgundy)] transition-colors duration-300"
            >
              Nina Massage
            </a>
            <a 
              href="/store"
              className="text-gray-700 hover:text-[var(--nina-burgundy)] transition-colors duration-300"
            >
              Nina Store
            </a>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-[var(--nina-burgundy)] transition-colors duration-300"
            >
              Contact
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="nina-gradient text-white hover:opacity-90 transition-opacity duration-300"
            >
              Réserver
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('accueil')}
                className="text-left text-gray-700 hover:text-[var(--nina-burgundy)] transition-colors duration-300 py-2"
              >
                Accueil
              </button>
              <a 
                href="/massage"
                className="text-left text-gray-700 hover:text-[var(--nina-burgundy)] transition-colors duration-300 py-2"
              >
                Nina Massage
              </a>
              <a 
                href="/store"
                className="text-left text-gray-700 hover:text-[var(--nina-burgundy)] transition-colors duration-300 py-2"
              >
                Nina Store
              </a>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-[var(--nina-burgundy)] transition-colors duration-300 py-2"
              >
                Contact
              </button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="nina-gradient text-white w-full mt-4"
              >
                Réserver
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}