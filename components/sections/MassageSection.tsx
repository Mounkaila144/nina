'use client';

import { useState, useEffect, useRef } from 'react';
import { Clock, Star, Users, Zap, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    name: 'Drainage Lymphatique',
    description: 'Technique spécialisée pour stimuler la circulation lymphatique et éliminer les toxines',
    duration: '60 min',
    price: '25,000 CFA',
    image: 'https://ninamassage.com/cdn/shop/files/Designsanstitre.zip-20.png?v=1746389423&width=600',
    popular: true
  },
  {
    name: 'Massage 4 mains',
    description: 'Expérience unique avec deux thérapeutes pour une relaxation maximale',
    duration: '60 min',
    price: '50,000 CFA',
    image: 'https://ninamassage.com/cdn/shop/files/Untitleddesign_1.png?v=1746389286&width=600',
    popular: true
  },
  {
    name: 'Pédicure',
    description: 'Soin complet des pieds avec exfoliation, massage et pose de vernis',
    duration: '45 min',
    price: '10,000 CFA',
    image: 'https://ninamassage.com/cdn/shop/files/IMG_0814.jpg?v=1746459466&width=600',
    popular: false
  },
  {
    name: 'Manucure',
    description: 'Soin des mains avec lime, cuticules et pose de vernis professionnel',
    duration: '30 min',
    price: '8,000 CFA',
    image: 'https://ninamassage.com/cdn/shop/files/Designsanstitre.zip-9.png?v=1746386760&width=600',
    popular: false
  },
  {
    name: 'Massage Relaxant',
    description: 'Massage complet du corps aux huiles essentielles pour une détente profonde',
    duration: '60 min',
    price: '30,000 CFA',
    image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: false
  },
  {
    name: 'Massage Thérapeutique',
    description: 'Soulagement des tensions musculaires avec techniques spécialisées',
    duration: '75 min',
    price: '35,000 CFA',
    image: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: false
  }
];

const features = [
  {
    icon: Star,
    title: 'Excellence',
    description: 'Équipe de professionnels certifiés avec plus de 10 ans d\'expérience'
  },
  {
    icon: Clock,
    title: 'Flexibilité',
    description: 'Horaires étendus et rendez-vous disponibles 7j/7'
  },
  {
    icon: Users,
    title: 'Personnalisé',
    description: 'Chaque soin adapté à vos besoins spécifiques'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Techniques modernes et équipements haut de gamme'
  }
];

export default function MassageSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="massage" className="py-24 bg-gradient-to-br from-white via-gray-50 to-[var(--nina-burgundy)]/5 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full nina-luxury-gradient-radial"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--nina-gold)] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--nina-burgundy)] rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[var(--nina-gold)]/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-[var(--nina-burgundy)]/10 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-[var(--nina-burgundy)]" />
            <span className="text-[var(--nina-burgundy)] font-medium">Services Premium</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-playfair nina-burgundy mb-6 luxury-text-glow">
            Nina <span className="text-[var(--nina-gold)]">Massage</span>
            <span className="sr-only"> & Kiné - Centre de Massage Professionnel à Niamey, Niger</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Découvrez l'art du bien-être dans notre centre d'exception.
            Nos thérapeutes certifiés vous offrent une expérience unique
            alliant techniques traditionnelles et innovations modernes.
          </p>
        </div>

        {/* Enhanced Features */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center bg-white rounded-2xl p-6 shadow-md border border-gray-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: `${200 + index * 100}ms`}}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full nina-gradient mb-6">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Modern Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`border-0 bg-white rounded-3xl overflow-hidden shadow-lg ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: `${400 + index * 150}ms`}}
            >
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {service.popular && (
                  <Badge className="absolute top-4 left-4 bg-[var(--nina-burgundy)] text-white px-3 py-1 rounded-full text-xs font-medium">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Populaire
                  </Badge>
                )}

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-[var(--nina-burgundy)] font-bold text-sm">{service.price}</span>
                </div>
              </div>

              <CardHeader className="p-6">
                <div className="mb-4">
                  <CardTitle className="text-xl font-semibold text-gray-800 mb-2">
                    {service.name}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock size={16} className="mr-2 text-[var(--nina-burgundy)]" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <CardDescription className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </CardDescription>

                {/* Modern Service Features */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Heart className="w-4 h-4 mr-1 text-[var(--nina-burgundy)]" />
                      <span>Bien-être</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="w-4 h-4 mr-1 text-[var(--nina-burgundy)]" />
                      <span>Expert</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="bg-[var(--nina-burgundy)] text-white px-4 py-2 rounded-full text-sm font-medium">
                    Réserver
                  </button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="nina-luxury-gradient-dark rounded-3xl p-12 text-white luxury-shadow-dark relative overflow-hidden group">
            {/* Enhanced Luxury overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--nina-gold)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Floating Elements */}
            <div className="absolute top-6 right-6">
              <Sparkles className="w-8 h-8 text-[var(--nina-gold)] animate-pulse" />
            </div>
            <div className="absolute bottom-6 left-6">
              <Heart className="w-6 h-6 text-[var(--nina-gold)] animate-pulse" />
            </div>

            <div className="relative z-10">
              <h3 className="text-4xl font-playfair mb-6 luxury-text-shadow">
                Réservez Votre <span className="text-[var(--nina-gold)]">Moment</span> de Détente
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                Contactez-nous dès maintenant pour personnaliser votre expérience bien-être
                et découvrir nos offres exclusives
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/22781836571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[var(--nina-burgundy)] px-8 py-3 rounded-lg font-semibold luxury-shadow"
                >
                  WhatsApp
                </a>
                <a
                  href="tel:+22781836571"
                  className="inline-block luxury-backdrop border border-white/30 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  Appeler Maintenant
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}