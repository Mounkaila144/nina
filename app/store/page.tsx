import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ShoppingBag, Gift, Truck, CreditCard, ArrowLeft, Star, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const categories = [
  {
    name: 'Soins Visage',
    description: 'Crèmes, sérums et masques haut de gamme pour tous types de peau',
    products: '25+ produits',
    image: 'https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    brands: ['La Mer', 'SK-II', 'Estée Lauder', 'Clinique']
  },
  {
    name: 'Soins Corps',
    description: 'Huiles, laits et gommages luxueux pour une peau douce et hydratée',
    products: '30+ produits',
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    brands: ['Clarins', 'L\'Occitane', 'Nuxe', 'Caudalie']
  },
  {
    name: 'Parfums & Fragrances',
    description: 'Sélection exclusive de parfums de niche et grandes maisons',
    products: '15+ parfums',
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    brands: ['Diptyque', 'Maison Margiela', 'Tom Ford', 'Byredo']
  },
  {
    name: 'Maquillage',
    description: 'Cosmétiques de luxe pour sublimer votre beauté naturelle',
    products: '40+ produits',
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    brands: ['Chanel', 'Dior', 'YSL', 'MAC']
  },
  {
    name: 'Soins Cheveux',
    description: 'Shampoings, masques et traitements professionnels',
    products: '20+ produits',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    brands: ['Kérastase', 'Olaplex', 'Moroccanoil', 'Redken']
  },
  {
    name: 'Accessoires Beauté',
    description: 'Pinceaux, éponges et outils de beauté professionnels',
    products: '35+ accessoires',
    image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    brands: ['Real Techniques', 'Beautyblender', 'Foreo', 'Clarisonic']
  }
];

const featuredProducts = [
  {
    name: 'Sérum Anti-Âge Premium',
    brand: 'La Mer',
    price: '165€',
    originalPrice: '185€',
    image: 'https://images.pexels.com/photos/5938322/pexels-photo-5938322.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    badge: 'Promo',
    rating: 4.8,
    description: 'Sérum révolutionnaire aux algues marines pour une peau visiblement plus jeune'
  },
  {
    name: 'Huile Corporelle Relaxante',
    brand: 'Clarins',
    price: '45€',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    badge: 'Nouveau',
    rating: 4.6,
    description: 'Huile nourrissante aux huiles essentielles pour une peau douce et parfumée'
  },
  {
    name: 'Parfum Rose Éternelle',
    brand: 'Diptyque',
    price: '98€',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    badge: 'Exclusif',
    rating: 4.9,
    description: 'Fragrance florale sophistiquée aux notes de rose et de pivoine'
  },
  {
    name: 'Masque Hydratant Intensif',
    brand: 'SK-II',
    price: '75€',
    originalPrice: '85€',
    image: 'https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    badge: 'Promo',
    rating: 4.7,
    description: 'Masque ultra-hydratant à la Pitera™ pour une peau éclatante'
  },
  {
    name: 'Rouge à Lèvres Velours',
    brand: 'Chanel',
    price: '42€',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    badge: 'Bestseller',
    rating: 4.8,
    description: 'Rouge à lèvres mat longue tenue aux pigments intenses'
  },
  {
    name: 'Shampoing Réparateur',
    brand: 'Kérastase',
    price: '28€',
    originalPrice: null,
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    badge: 'Nouveau',
    rating: 4.5,
    description: 'Shampoing professionnel pour cheveux abîmés et fragilisés'
  }
];

const storeFeatures = [
  {
    icon: Gift,
    title: 'Produits Authentiques',
    description: 'Sélection rigoureuse de marques de prestige, garantie d\'authenticité à 100%'
  },
  {
    icon: Truck,
    title: 'Livraison Gratuite',
    description: 'À partir de 50€ d\'achat partout en France, livraison express disponible'
  },
  {
    icon: CreditCard,
    title: 'Paiement Sécurisé',
    description: 'Transactions protégées et confidentielles, paiement en plusieurs fois possible'
  },
  {
    icon: ShoppingBag,
    title: 'Service Personnalisé',
    description: 'Conseils beauté sur mesure par nos experts, diagnostic de peau gratuit'
  }
];

export default function StorePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Nina Store - Boutique cosmétiques"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-300">
              <ArrowLeft className="mr-2" size={20} />
              Retour à l'accueil
            </Link>
            <h1 className="text-5xl md:text-6xl font-playfair font-light mb-6">
              Nina Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
              Boutique de cosmétiques et produits de beauté haut de gamme
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="nina-gradient text-white hover:opacity-90 transition-all duration-300 px-8 py-4 text-lg"
              >
                <ShoppingBag className="mr-2" size={20} />
                Découvrir la Boutique
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 px-8 py-4 text-lg"
              >
                <Gift className="mr-2" size={20} />
                Cartes Cadeaux
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Store Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair nina-burgundy mb-6">L'Excellence Nina Store</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une sélection exclusive de produits de beauté pour sublimer votre routine quotidienne
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {storeFeatures.map((feature, index) => (
              <div key={index} className="text-center animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full nina-gradient mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair nina-burgundy mb-6">Nos Catégories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explorez notre sélection organisée par univers beauté
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div>
                    <h5 className="font-semibold text-sm mb-2">Marques disponibles :</h5>
                    <div className="flex flex-wrap gap-2">
                      {category.brands.map((brand, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair nina-burgundy mb-6">Produits Vedettes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez notre sélection de produits coup de cœur, plébiscités par nos clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      product.badge === 'Bestseller' ? 'bg-green-500' :
                      'bg-black'
                    } text-white`}
                  >
                    {product.badge}
                  </Badge>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                    <Star className="text-yellow-400 fill-current" size={14} />
                    <span className="text-xs font-semibold ml-1">{product.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                  <h4 className="font-semibold mb-2">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold nina-burgundy">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="nina-gradient text-white">
                      <Heart size={16} className="mr-1" />
                      Ajouter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--nina-burgundy)] to-[var(--nina-light-burgundy)]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <ShoppingBag className="mx-auto mb-6" size={64} />
            <h2 className="text-4xl font-playfair mb-6">Boutique en Ligne Bientôt Disponible</h2>
            <p className="text-xl mb-8 opacity-90">
              En attendant, visitez notre boutique physique ou contactez-nous pour vos commandes personnalisées
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-[var(--nina-burgundy)] hover:bg-gray-100 transition-colors duration-300 px-8 py-4 text-lg font-semibold"
              >
                Nous Contacter
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 px-8 py-4 text-lg"
              >
                Voir l'Itinéraire
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}