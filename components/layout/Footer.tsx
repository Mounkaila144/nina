import { Heart, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-playfair nina-burgundy mb-4">
              Nina Spa & Store
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Votre destination beauté et bien-être à Paris. Centre esthétique de luxe 
              proposant massages, soins du visage et boutique de cosmétiques haut de gamme.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--nina-burgundy)] transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--nina-burgundy)] transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--nina-burgundy)] transition-colors duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#massage" className="hover:text-white transition-colors duration-300">Massages</a></li>
              <li><a href="#massage" className="hover:text-white transition-colors duration-300">Soins du Visage</a></li>
              <li><a href="#massage" className="hover:text-white transition-colors duration-300">Épilation</a></li>
              <li><a href="#store" className="hover:text-white transition-colors duration-300">Cosmétiques</a></li>
              <li><a href="#store" className="hover:text-white transition-colors duration-300">Parfums</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>123 Rue de la Beauté</li>
              <li>75001 Paris, France</li>
              <li>
                <a href="tel:+33123456789" className="hover:text-white transition-colors duration-300">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li>
                <a href="mailto:contact@nina-spa.fr" className="hover:text-white transition-colors duration-300">
                  contact@nina-spa.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Nina Spa & Store. Tous droits réservés.
            </p>
            <p className="text-gray-400 flex items-center">
              Créé avec <Heart className="mx-1 text-[var(--nina-burgundy)]" size={16} /> à Paris
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}