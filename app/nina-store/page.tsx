'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Search, Filter, ShoppingCart, Star, Heart, Eye, Plus } from 'lucide-react';
import HeaderWithCart from '@/components/layout/HeaderWithCart';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <HeaderWithCart />
      <Cart />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://chezninastore.com/cdn/shop/files/La_texture.jpg?v=1746090575&width=1920"
            alt="Nina Store - Boutique en ligne"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 nina-luxury-overlay" />
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-playfair font-light mb-6 luxury-text-shadow">
              Nina Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Votre boutique de produits de beauté et bien-être
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed opacity-80">
              Découvrez notre sélection exclusive de cosmétiques, produits de bien-être, 
              accessoires et épices authentiques.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm sticky top-20 z-40 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-[var(--nina-burgundy)] focus:ring-[var(--nina-burgundy)]"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category 
                      ? 'nina-luxury-gradient-dark text-white' 
                      : 'border-gray-300 hover:border-[var(--nina-burgundy)] hover:text-[var(--nina-burgundy)]'
                  } transition-all duration-300`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-playfair nina-burgundy mb-4">
              {selectedCategory === 'Tous' ? 'Tous nos produits' : selectedCategory}
            </h2>
            <p className="text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover-lift border-0 luxury-shadow overflow-hidden animate-slide-up luxury-glow bg-white/80 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Badges */}
                  {product.badge && (
                    <Badge className="absolute top-4 left-4 nina-luxury-gradient-dark text-white luxury-shadow text-xs font-semibold px-3 py-1">
                      {product.badge}
                    </Badge>
                  )}

                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 luxury-shadow ${
                        favorites.includes(product.id)
                          ? 'bg-red-500 text-white shadow-red-500/25'
                          : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-3 rounded-full bg-white/90 text-gray-600 hover:bg-[var(--nina-burgundy)] hover:text-white backdrop-blur-md transition-all duration-300 hover:scale-110 luxury-shadow">
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category
                      })}
                      className="p-3 rounded-full bg-[var(--nina-burgundy)] text-white hover:bg-[var(--nina-gold)] backdrop-blur-md transition-all duration-300 hover:scale-110 luxury-shadow"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Quick add to cart overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <Button
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category
                      })}
                      className="w-full nina-luxury-gradient-dark text-white hover:opacity-90 transition-all duration-300 luxury-shadow backdrop-blur-md"
                    >
                      <Plus size={16} className="mr-2" />
                      Ajouter au panier
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6 bg-gradient-to-b from-white to-gray-50/50">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current drop-shadow-sm'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2 font-medium">({product.rating})</span>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight group-hover:text-[var(--nina-burgundy)] transition-colors duration-300 min-h-[3.5rem] flex items-center">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold nina-burgundy bg-gradient-to-r from-[var(--nina-burgundy)] to-[var(--nina-gold)] bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <Badge variant="outline" className="text-xs font-medium px-3 py-1 border-[var(--nina-burgundy)]/20 text-[var(--nina-burgundy)]">
                      {product.category}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 nina-luxury-gradient-dark text-white hover:opacity-90 transition-all duration-300 luxury-shadow font-semibold"
                      onClick={() => window.open('https://wa.me/22781836571?text=' + encodeURIComponent(`Bonjour, je suis intéressé(e) par le produit: ${product.name} - ${product.price}`), '_blank')}
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      Commander
                    </Button>
                    <Button
                      variant="outline"
                      className="px-4 border-[var(--nina-burgundy)]/30 text-[var(--nina-burgundy)] hover:bg-[var(--nina-burgundy)] hover:text-white transition-all duration-300"
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category
                      })}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
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
