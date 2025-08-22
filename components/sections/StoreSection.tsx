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
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="border-0 bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <h4 className="text-lg font-semibold mb-1">{category.name}</h4>
                    <p className="text-xs opacity-90">{category.products}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
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
              <Card key={index} className="border-0 bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <Badge
                    className={`absolute top-3 left-3 text-xs font-medium px-2 py-1 rounded-full ${
                      product.badge === 'Promo' ? 'bg-red-500 text-white' :
                      product.badge === 'Nouveau' ? 'bg-[var(--nina-burgundy)] text-white' :
                      'bg-gray-800 text-white'
                    }`}
                  >
                    {product.badge}
                  </Badge>

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-[var(--nina-burgundy)] font-bold text-sm">{product.price}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.brand}</div>
                  <h4 className="font-semibold mb-3 text-gray-800">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <button className="bg-[var(--nina-burgundy)] text-white px-3 py-1 rounded-full text-xs font-medium">
                      Commander
                    </button>
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
                  className="inline-block bg-white text-[var(--nina-burgundy)] px-8 py-3 rounded-lg font-semibold luxury-shadow"
                >
                  Commander via WhatsApp
                </a>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-block luxury-backdrop border border-white/30 text-white px-8 py-3 rounded-lg font-semibold"
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