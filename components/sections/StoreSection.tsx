'use client';

import { ShoppingBag, Gift, Truck, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = [
  {
    name: 'Massages',
    description: 'Drainage lymphatique, massage 4 mains et techniques spécialisées',
    products: '6+ services',
    image: 'https://ninamassage.com/cdn/shop/files/Designsanstitre.zip-20.png?v=1746389423&width=600'
  },
  {
    name: 'Soins Esthétiques',
    description: 'Pédicure, manucure et soins de beauté professionnels',
    products: '4+ services',
    image: 'https://ninamassage.com/cdn/shop/files/IMG_0814.jpg?v=1746459466&width=600'
  },
  {
    name: 'Soins Personnalisés',
    description: 'Services sur mesure selon vos besoins spécifiques',
    products: 'Sur demande',
    image: 'https://ninamassage.com/cdn/shop/files/Untitleddesign_1.png?v=1746389286&width=600'
  }
];

const featuredProducts = [
  {
    name: 'Drainage Lymphatique',
    brand: 'Nina Massage',
    price: '25,000 CFA',
    originalPrice: null,
    image: 'https://ninamassage.com/cdn/shop/files/Designsanstitre.zip-20.png?v=1746389423&width=400',
    badge: 'Populaire'
  },
  {
    name: 'Massage 4 mains',
    brand: 'Nina Massage',
    price: '50,000 CFA',
    originalPrice: null,
    image: 'https://ninamassage.com/cdn/shop/files/Untitleddesign_1.png?v=1746389286&width=400',
    badge: 'Premium'
  },
  {
    name: 'Pédicure Complète',
    brand: 'Nina Massage',
    price: '10,000 CFA',
    originalPrice: null,
    image: 'https://ninamassage.com/cdn/shop/files/IMG_0814.jpg?v=1746459466&width=400',
    badge: 'Nouveau'
  },
  {
    name: 'Manucure Professionnelle',
    brand: 'Nina Massage',
    price: '8,000 CFA',
    originalPrice: null,
    image: 'https://ninamassage.com/cdn/shop/files/Designsanstitre.zip-9.png?v=1746386760&width=400',
    badge: 'Classique'
  }
];

const storeFeatures = [
  {
    icon: Gift,
    title: 'Services Professionnels',
    description: 'Techniques expertes et équipements de qualité'
  },
  {
    icon: Truck,
    title: 'Service à Domicile',
    description: 'Possibilité de déplacement selon disponibilité'
  },
  {
    icon: CreditCard,
    title: 'Paiement Flexible',
    description: 'Plusieurs modes de paiement acceptés'
  },
  {
    icon: ShoppingBag,
    title: 'Conseils Personnalisés',
    description: 'Accompagnement sur mesure selon vos besoins'
  }
];

export default function StoreSection() {
  return (
    <section id="store" className="py-20 relative overflow-hidden">
      {/* Luxury Background */}
      <div className="absolute inset-0 nina-luxury-gradient-light opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-transparent to-white/70"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair nina-burgundy mb-6">
            Nos Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre gamme complète de services de massage et de soins esthétiques.
            Des techniques professionnelles pour votre bien-être et votre beauté.
          </p>
        </div>

        {/* Store Features */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {storeFeatures.map((feature, index) => (
            <div key={index} className="text-center animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full nina-gradient mb-4">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h3 className="text-3xl font-playfair text-center mb-12 nina-burgundy">Types de Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="hover-lift border-0 luxury-shadow overflow-hidden animate-slide-up luxury-glow" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 nina-luxury-overlay" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-semibold mb-1 luxury-text-shadow">{category.name}</h4>
                    <p className="text-sm opacity-90">{category.products}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-16">
          <h3 className="text-3xl font-playfair text-center mb-12 nina-burgundy">Services Populaires</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="hover-lift border-0 luxury-shadow overflow-hidden animate-slide-up luxury-glow" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                  <Badge
                    className={`absolute top-3 right-3 luxury-shadow ${
                      product.badge === 'Promo' ? 'bg-red-500' :
                      product.badge === 'Nouveau' ? 'nina-luxury-gradient-dark' :
                      'bg-black'
                    } text-white`}
                  >
                    {product.badge}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                  <h4 className="font-semibold mb-3 text-sm">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold nina-burgundy">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="nina-luxury-gradient-dark rounded-2xl p-8 text-white luxury-shadow-dark relative overflow-hidden">
            {/* Luxury overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="relative z-10">
              <ShoppingBag className="mx-auto mb-4 drop-shadow-lg" size={48} />
              <h3 className="text-3xl font-playfair mb-4 luxury-text-shadow">Réservez Votre Service</h3>
              <p className="text-lg mb-6 opacity-90">
                Contactez-nous directement via WhatsApp pour réserver votre service ou demander des informations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/22781836571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[var(--nina-burgundy)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 luxury-shadow"
                >
                  Commander via WhatsApp
                </a>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-block luxury-backdrop border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Réserver en Ligne
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}