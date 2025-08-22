import { Heart, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-[var(--nina-dark)] to-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-[var(--nina-gold)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-[var(--nina-burgundy)] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Enhanced Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-2xl nina-luxury-gradient-dark flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white font-bold text-xl font-playfair">N</span>
              </div>
              <div>
                <h3 className="text-3xl font-playfair text-white mb-1">
                  Nina <span className="text-[var(--nina-gold)]">Massage & Kiné</span>
                </h3>
                <p className="text-[var(--nina-gold)]/80 text-sm font-medium">Centre de Bien-être Premium</p>
              </div>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              Votre destination beauté et bien-être à Niamey. Centre esthétique de luxe
              proposant massages, kinésithérapie et soins de beauté professionnels.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 transition-all duration-300 hover:bg-[var(--nina-burgundy)] hover:scale-110 hover:border-[var(--nina-burgundy)]">
                <Instagram size={22} />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 transition-all duration-300 hover:bg-[var(--nina-burgundy)] hover:scale-110 hover:border-[var(--nina-burgundy)]">
                <Facebook size={22} />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20 transition-all duration-300 hover:bg-[var(--nina-burgundy)] hover:scale-110 hover:border-[var(--nina-burgundy)]">
                <Twitter size={22} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-[var(--nina-gold)]">Nos Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#massage" className="text-gray-300 hover:text-[var(--nina-gold)] transition-all duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-[var(--nina-burgundy)] rounded-full mr-3 group-hover:bg-[var(--nina-gold)] transition-colors duration-300"></span>
                  Massages
                </a>
              </li>
              <li>
                <a href="#massage" className="text-gray-300 hover:text-[var(--nina-gold)] transition-all duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-[var(--nina-burgundy)] rounded-full mr-3 group-hover:bg-[var(--nina-gold)] transition-colors duration-300"></span>
                  Kinésithérapie
                </a>
              </li>
              <li>
                <a href="#massage" className="text-gray-300 hover:text-[var(--nina-gold)] transition-all duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-[var(--nina-burgundy)] rounded-full mr-3 group-hover:bg-[var(--nina-gold)] transition-colors duration-300"></span>
                  Soins Esthétiques
                </a>
              </li>
              <li>
                <a href="#store" className="text-gray-300 hover:text-[var(--nina-gold)] transition-all duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-[var(--nina-burgundy)] rounded-full mr-3 group-hover:bg-[var(--nina-gold)] transition-colors duration-300"></span>
                  Pédicure & Manucure
                </a>
              </li>
              <li>
                <a href="#store" className="text-gray-300 hover:text-[var(--nina-gold)] transition-all duration-300 flex items-center group">
                  <span className="w-2 h-2 bg-[var(--nina-burgundy)] rounded-full mr-3 group-hover:bg-[var(--nina-gold)] transition-colors duration-300"></span>
                  Drainage Lymphatique
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-[var(--nina-gold)]">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[var(--nina-burgundy)]/20 rounded-lg flex items-center justify-center mt-0.5">
                  <MapPin size={14} className="text-[var(--nina-burgundy)]" />
                </div>
                <div className="text-gray-300 leading-relaxed">
                  <div>Quartier Recasement</div>
                  <div>3ème latérite, plaque Adouwal Adamou</div>
                  <div>Niamey, Niger</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-[var(--nina-burgundy)]/20 rounded-lg flex items-center justify-center">
                  <Phone size={14} className="text-[var(--nina-burgundy)]" />
                </div>
                <a href="tel:+22781836571" className="text-gray-300 hover:text-[var(--nina-gold)] transition-colors duration-300">
                  +227 81 83 65 71
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-[var(--nina-burgundy)]/20 rounded-lg flex items-center justify-center">
                  <Mail size={14} className="text-[var(--nina-burgundy)]" />
                </div>
                <a href="mailto:contact@ninamassage.com" className="text-gray-300 hover:text-[var(--nina-gold)] transition-colors duration-300">
                  contact@ninamassage.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Nina Massage & Kiné. Tous droits réservés.
            </p>
            <p className="text-gray-400 flex items-center">
              Créé avec <Heart className="mx-1 text-[var(--nina-burgundy)]" size={16} /> à Niamey
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}