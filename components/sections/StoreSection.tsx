'use client';

import { ShoppingBag, Gift, Truck, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = [
  {
    name: 'Soins Visage',
    description: 'Crèmes, sérums et masques haut de gamme',
    products: '25+ produits',
    image: 'https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    name: 'Soins Corps',
    description: 'Huiles, laits et gommages luxueux',
    products: '30+ produits',
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    name: 'Parfums & Fragrances',
    description: 'Sélection exclusive de parfums de niche',
    products: '15+ parfums',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  }
];

const featuredProducts = [
  {
    name: 'Sérum Anti-Âge Premium',
    brand: 'La Mer',
    price: '165€',
    originalPrice: '185€',
    image: 'https://images.pexels.com/photos/5938322/pexels-photo-5938322.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    badge: 'Promo'
  },
  {
    name: 'Huile Corporelle Relaxante',
    brand: 'Clarins',
    price: '45€',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    badge: 'Nouveau'
  },
  {
    name: 'Parfum Rose Éternelle',
    brand: 'Diptyque',
    price: '98€',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    badge: 'Exclusif'
  },
  {
    name: 'Masque Hydratant Intensif',
    brand: 'SK-II',
    price: '75€',
    originalPrice: '85€',
    image: 'https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    badge: 'Promo'
  }
];

const storeFeatures = [
  {
    icon: Gift,
    title: 'Produits Authentiques',
    description: 'Sélection rigoureuse de marques de prestige'
  },
  {
    icon: Truck,
    title: 'Livraison Gratuite',
    description: 'À partir de 50€ d\'achat partout en France'
  },
  {
    icon: CreditCard,
    title: 'Paiement Sécurisé',
    description: 'Transactions protégées et confidentielles'
  },
  {
    icon: ShoppingBag,
    title: 'Service Personnalisé',
    description: 'Conseils beauté sur mesure par nos experts'
  }
];

export default function StoreSection() {
  return (
    <section id="store" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair nina-burgundy mb-6">
            Nina Store
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre sélection exclusive de cosmétiques et produits de beauté haut de gamme. 
            Des marques prestigieuses pour sublimer votre routine beauté quotidienne.
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
          <h3 className="text-3xl font-playfair text-center mb-12 nina-burgundy">Nos Catégories</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg overflow-hidden animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-semibold mb-1">{category.name}</h4>
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
          <h3 className="text-3xl font-playfair text-center mb-12 nina-burgundy">Produits Vedettes</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card key={index} className="hover-lift border-0 shadow-lg overflow-hidden animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                  <Badge 
                    className={`absolute top-3 right-3 ${
                      product.badge === 'Promo' ? 'bg-red-500' : 
                      product.badge === 'Nouveau' ? 'nina-gradient' : 
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
          <div className="nina-gradient rounded-2xl p-8 text-white">
            <ShoppingBag className="mx-auto mb-4" size={48} />
            <h3 className="text-3xl font-playfair mb-4">Boutique en Ligne Bientôt Disponible</h3>
            <p className="text-lg mb-6 opacity-90">
              En attendant, visitez notre boutique physique ou contactez-nous pour vos commandes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-block bg-white text-[var(--nina-burgundy)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Nous Contacter
              </button>
              <a 
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Voir l'Itinéraire
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}