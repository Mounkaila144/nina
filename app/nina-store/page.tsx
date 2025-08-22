'use client';

import { useState } from 'react';
import { Search, Filter, ShoppingCart, Star, Heart, Eye, Plus, Sparkles, TrendingUp, Package } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import Cart from '@/components/ui/Cart';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CartProvider, useCart } from '@/contexts/CartContext';

const products = [
  {
    id: 1,
    name: '$ex Spray',
    price: 'CFA10,000',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-28.png?v=1746197378&width=533',
    category: 'Bien-être',
    inStock: true,
    rating: 4.5
  },
  {
    id: 2,
    name: '4Ex Lubrifiant',
    price: 'CFA10,000',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-29.png?v=1746197619&width=533',
    category: 'Bien-être',
    inStock: true,
    rating: 4.3
  },
  {
    id: 3,
    name: 'Attache pour cheveux',
    price: 'CFA2,500',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-14.png?v=1746129534&width=533',
    category: 'Accessoires',
    inStock: true,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Bome François',
    price: 'CFA2,000',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-4.png?v=1746129282&width=533',
    category: 'Cosmétiques',
    inStock: true,
    rating: 4.2
  },
  {
    id: 5,
    name: 'Brosse cheveux pour BabyHair - double face',
    price: 'CFA1,000',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-11.png?v=1746200655&width=533',
    category: 'Accessoires',
    inStock: true,
    rating: 4.8
  },
  {
    id: 6,
    name: 'Café MaxMan',
    price: 'CFA2,500',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-38.png?v=1746199782&width=533',
    category: 'Bien-être',
    inStock: true,
    rating: 4.4
  },
  {
    id: 7,
    name: 'Café minceur',
    price: 'CFA20,000',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-26.png?v=1746130850&width=533',
    category: 'Bien-être',
    inStock: true,
    rating: 4.6,
    badge: 'Premium'
  },
  {
    id: 8,
    name: 'Chocolat aphrodisiaque femme',
    price: 'CFA2,500',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-27.png?v=1746197253&width=533',
    category: 'Bien-être',
    inStock: true,
    rating: 4.5
  },
  {
    id: 9,
    name: 'Collins - Pommade cheveux',
    price: 'CFA10,000',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-41.png?v=1746200352&width=533',
    category: 'Cosmétiques',
    inStock: true,
    rating: 4.3
  },
  {
    id: 10,
    name: 'Crème Dr-Rachel',
    price: 'Sur devis',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-35.png?v=1746199883&width=533',
    category: 'Cosmétiques',
    inStock: true,
    rating: 4.7
  },
  {
    id: 11,
    name: 'Crème fessier',
    price: 'CFA10,000',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-33.png?v=1746197849&width=533',
    category: 'Cosmétiques',
    inStock: true,
    rating: 4.4
  },
  {
    id: 12,
    name: 'Crème hydratante Homme',
    price: 'Sur devis',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-30.png?v=1746197962&width=533',
    category: 'Cosmétiques',
    inStock: true,
    rating: 4.2
  },
  {
    id: 13,
    name: 'Crème Solaire Visage',
    price: 'Sur devis',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-34.png?v=1746199980&width=533',
    category: 'Cosmétiques',
    inStock: true,
    rating: 4.6
  },
  {
    id: 14,
    name: 'Dr\'s Secret',
    price: 'CFA2,500',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-36.png?v=1746199477&width=533',
    category: 'Bien-être',
    inStock: true,
    rating: 4.5
  },
  {
    id: 15,
    name: 'Épice Djanssan',
    price: 'CFA2,500',
    image: 'https://chezninastore.com/cdn/shop/files/Designsanstitre.zip-3.png?v=1746384320&width=533',
    category: 'Épices',
    inStock: true,
    rating: 4.8
  },
  {
    id: 16,
    name: 'Épice Maggi',
    price: 'Sur devis',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-16.png?v=1746384913&width=533',
    category: 'Épices',
    inStock: true,
    rating: 4.3
  },
  {
    id: 17,
    name: 'Épice Mbol',
    price: 'CFA2,500',
    image: 'https://chezninastore.com/cdn/shop/files/Designsanstitre.zip-5.png?v=1746384378&width=533',
    category: 'Épices',
    inStock: true,
    rating: 4.7
  },
  {
    id: 18,
    name: 'Épice Mbongo',
    price: 'CFA2,500',
    image: 'https://chezninastore.com/cdn/shop/files/Designsanstitre.zip-6.png?v=1746384217&width=533',
    category: 'Épices',
    inStock: true,
    rating: 4.6
  },
  {
    id: 19,
    name: 'Épice poivre long',
    price: 'CFA2,500',
    image: 'https://chezninastore.com/cdn/shop/files/Designsanstitre.zip-4.png?v=1746384545&width=533',
    category: 'Épices',
    inStock: true,
    rating: 4.4
  },
  {
    id: 20,
    name: 'Épice Rondelles',
    price: 'CFA2,500',
    image: 'https://chezninastore.com/cdn/shop/files/Rondelle.png?v=1746384109&width=533',
    category: 'Épices',
    inStock: true,
    rating: 4.5
  },
  {
    id: 21,
    name: 'Épice TopGou',
    price: 'Sur devis',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-5.png?v=1746384999&width=533',
    category: 'Épices',
    inStock: true,
    rating: 4.2
  },
  {
    id: 22,
    name: 'Épices Assaisonnement',
    price: 'Sur devis',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-2.png?v=1746130235&width=533',
    category: 'Épices',
    inStock: true,
    rating: 4.6
  },
  {
    id: 23,
    name: 'Etumax - Miel sensuel',
    price: 'CFA2,000',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-37.png?v=1746200440&width=533',
    category: 'Bien-être',
    inStock: true,
    rating: 4.7
  },
  {
    id: 24,
    name: 'Gel pour cheveux',
    price: 'CFA1,000',
    image: 'https://chezninastore.com/cdn/shop/files/Latexture.zip-15.png?v=1746129139&width=533',
    category: 'Cosmétiques',
    inStock: true,
    rating: 4.1
  }
];

const categories = ['Tous', 'Bien-être', 'Cosmétiques', 'Accessoires', 'Épices'];

function NinaStoreContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const storeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': 'https://ninamassage.com/nina-store',
    name: 'Nina Store',
    description: 'Boutique en ligne de produits de beauté, cosmétiques et bien-être à Niamey, Niger',
    url: 'https://ninamassage.com/nina-store',
    telephone: '+22781836571',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Quartier Recasement, 3ème latérite, plaque Adouwal Adamou',
      addressLocality: 'Niamey',
      addressCountry: 'NE'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Produits de Beauté et Bien-être',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Cosmétiques Premium',
            description: 'Gamme complète de cosmétiques de qualité'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Produits de Bien-être',
            description: 'Produits naturels pour le bien-être et la relaxation'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Épices Authentiques',
            description: 'Sélection d\'épices traditionnelles du Niger'
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[var(--nina-burgundy)]/5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
      />

      {/* SEO Content Hidden */}
      <div className="sr-only">
        <h1>Nina Store - Boutique de Produits de Beauté à Niamey, Niger</h1>
        <p>Nina Store est votre boutique en ligne de référence pour les produits de beauté, cosmétiques et bien-être à Niamey, Niger. Découvrez notre sélection exclusive de cosmétiques premium, produits de bien-être naturels, accessoires de beauté et épices authentiques du Niger. Commandez facilement via WhatsApp au +227 81 83 65 71 et bénéficiez d'une livraison rapide à Niamey.</p>
        <h2>Produits Disponibles à Nina Store Niamey</h2>
        <ul>
          <li>Cosmétiques et produits de beauté à Niamey</li>
          <li>Crèmes et soins du visage au Niger</li>
          <li>Produits de bien-être et relaxation à Niamey</li>
          <li>Épices traditionnelles du Niger</li>
          <li>Accessoires de beauté à Niamey</li>
          <li>Produits de massage au Niger</li>
          <li>Huiles essentielles à Niamey</li>
          <li>Compléments alimentaires au Niger</li>
        </ul>
        <h3>Pourquoi choisir Nina Store à Niamey ?</h3>
        <p>Nina Store vous propose une sélection rigoureuse de produits de qualité à Niamey, Niger. Tous nos produits sont soigneusement choisis pour leur efficacité et leur qualité. Commande facile via WhatsApp, conseils personnalisés et livraison rapide dans tout Niamey. Votre satisfaction est notre priorité.</p>
      </div>

      <Header variant="light" />
      <Cart />

      {/* Modern Hero Section */}
      <section className="relative min-h-screen overflow-hidden pt-16 sm:pt-20 md:pt-24">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--nina-gold)] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--nina-burgundy)] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[var(--nina-burgundy)]/20 to-[var(--nina-gold)]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 min-h-[calc(100vh-4rem)] flex items-center justify-center py-8">
          <div className="text-center max-w-6xl mx-auto px-4">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-[var(--nina-burgundy)]/10 rounded-full px-6 py-2 mb-8">
              <Package className="w-5 h-5 text-[var(--nina-burgundy)]" />
              <span className="text-[var(--nina-burgundy)] font-medium">Boutique Premium</span>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-8xl font-playfair font-light mb-8 text-gray-800">
              Nina <span className="text-[var(--nina-gold)]">Store</span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl mb-8 text-gray-600 font-light">
              Votre boutique de produits de beauté et bien-être
            </p>

            {/* Description */}
            <p className="text-xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-600">
              Découvrez notre sélection exclusive de cosmétiques premium, produits de bien-être,
              accessoires de beauté et épices authentiques. Chaque produit est soigneusement
              sélectionné pour vous offrir le meilleur de la beauté et du bien-être.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-[var(--nina-burgundy)] mb-2">200+</div>
                <div className="text-gray-600">Produits Premium</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-[var(--nina-burgundy)] mb-2">5★</div>
                <div className="text-gray-600">Qualité Garantie</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-3xl font-bold text-[var(--nina-burgundy)] mb-2">24h</div>
                <div className="text-gray-600">Livraison Rapide</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="nina-luxury-gradient-dark text-white px-8 py-4 text-lg rounded-full">
                <Sparkles className="w-5 h-5 mr-2" />
                Découvrir la Collection
              </Button>
              <Button variant="outline" className="border-2 border-[var(--nina-burgundy)] text-[var(--nina-burgundy)] px-8 py-4 text-lg rounded-full hover:bg-[var(--nina-burgundy)] hover:text-white">
                <TrendingUp className="w-5 h-5 mr-2" />
                Produits Tendance
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Search and Filter Section */}
      <section className="py-12 bg-white/90 backdrop-blur-sm  top-16 z-40 border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-2xl focus:border-[var(--nina-burgundy)] focus:ring-0 transition-colors duration-300"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'nina-luxury-gradient-dark text-white shadow-lg'
                        : 'border-2 border-gray-200 text-gray-600 hover:border-[var(--nina-burgundy)] hover:text-[var(--nina-burgundy)] hover:bg-[var(--nina-burgundy)]/5'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair nina-burgundy mb-6">
              Nos <span className="text-[var(--nina-gold)]">Catégories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explorez notre gamme complète de produits soigneusement sélectionnés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.slice(1).map((category, index) => {
              const categoryProducts = products.filter(p => p.category === category);
              const categoryIcons = {
                'Bien-être': '🌿',
                'Cosmétiques': '💄',
                'Accessoires': '✨',
                'Épices': '🌶️'
              };

              return (
                <div
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{categoryIcons[category as keyof typeof categoryIcons]}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{category}</h3>
                    <p className="text-gray-600 mb-4">{categoryProducts.length} produits</p>
                    <Button
                      className="nina-luxury-gradient-dark text-white rounded-full px-6 py-2 text-sm"
                    >
                      Découvrir
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-playfair nina-burgundy mb-6">
              {selectedCategory === 'Tous' ? 'Notre Collection' : selectedCategory}
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Découvrez nos produits soigneusement sélectionnés pour votre bien-être
            </p>
            <div className="inline-flex items-center space-x-2 bg-[var(--nina-burgundy)]/10 rounded-full px-4 py-2">
              <Package className="w-4 h-4 text-[var(--nina-burgundy)]" />
              <span className="text-[var(--nina-burgundy)] font-medium">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group border-0 bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                  {/* Badges */}
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-[var(--nina-burgundy)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {product.badge}
                    </Badge>
                  )}

                  {/* Favorite button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                      favorites.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-600'
                    }`}
                  >
                    <Heart size={16} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                  </button>

                  {/* Price badge */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-[var(--nina-burgundy)] font-bold text-sm">{product.price}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2 font-medium">({product.rating})</span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-3 text-base leading-tight min-h-[2.5rem] flex items-center">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-xs font-medium px-2 py-1 border-[var(--nina-burgundy)]/20 text-[var(--nina-burgundy)]">
                      {product.category}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 nina-luxury-gradient-dark text-white font-medium rounded-full"
                      onClick={() => window.open('https://wa.me/22781836571?text=' + encodeURIComponent(`Bonjour, je suis intéressé(e) par le produit: ${product.name} - ${product.price}`), '_blank')}
                    >
                      <ShoppingCart size={14} className="mr-2" />
                      Commander
                    </Button>
                    <Button
                      variant="outline"
                      className="px-3 border-[var(--nina-burgundy)]/30 text-[var(--nina-burgundy)] rounded-full"
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category
                      })}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-100 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Aucun produit trouvé</h3>
                <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche ou explorez d'autres catégories</p>
                <Button
                  onClick={() => {setSearchTerm(''); setSelectedCategory('Tous');}}
                  className="nina-luxury-gradient-dark text-white rounded-full px-6"
                >
                  Voir tous les produits
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--nina-burgundy)]/5 via-white to-[var(--nina-gold)]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-[var(--nina-burgundy)]/10 rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-[var(--nina-burgundy)]" />
              <span className="text-[var(--nina-burgundy)] font-medium">Sélection Premium</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair nina-burgundy mb-6">
              Produits <span className="text-[var(--nina-gold)]">Vedettes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos produits les plus populaires et les mieux notés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(p => p.rating >= 4.5).slice(0, 6).map((product) => (
              <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[var(--nina-burgundy)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    ⭐ {product.rating}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-[var(--nina-burgundy)] font-bold text-sm">{product.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.category}</p>
                  <Button
                    className="w-full nina-luxury-gradient-dark text-white rounded-full"
                    onClick={() => window.open('https://wa.me/22781836571?text=' + encodeURIComponent(`Bonjour, je suis intéressé(e) par le produit: ${product.name} - ${product.price}`), '_blank')}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Commander maintenant
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--nina-burgundy)] to-[var(--nina-gold)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-playfair mb-6">
              Prêt à découvrir nos produits ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contactez-nous dès maintenant pour passer commande ou obtenir des conseils personnalisés
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-white text-[var(--nina-burgundy)] px-8 py-4 text-lg rounded-full font-semibold"
                onClick={() => window.open('https://wa.me/22781836571', '_blank')}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Commander via WhatsApp
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 text-lg rounded-full font-semibold hover:bg-white hover:text-[var(--nina-burgundy)]"
                onClick={() => window.location.href = '/#contact'}
              >
                Nous Contacter
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function NinaStorePage() {
  return (
    <CartProvider>
      <NinaStoreContent />
    </CartProvider>
  );
}
