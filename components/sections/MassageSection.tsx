'use client';

import { Clock, Star, Users, Zap } from 'lucide-react';
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
  return (
    <section id="massage" className="py-20 nina-elegant-bg relative overflow-hidden">
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full nina-luxury-gradient-radial"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair nina-burgundy mb-6">
            Nina Massage
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Offrez-vous un moment d'exception dans notre centre esthétique. 
            Nos thérapeutes experts vous accompagnent vers un bien-être absolu 
            grâce à des soins personnalisés et des techniques raffinées.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full nina-gradient mb-4">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover-lift border-0 luxury-shadow overflow-hidden animate-slide-up luxury-glow" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                {service.popular && (
                  <Badge className="absolute top-3 right-3 nina-luxury-gradient-dark text-white luxury-shadow">
                    Populaire
                  </Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <div className="text-right">
                    <div className="text-2xl font-bold nina-burgundy">{service.price}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {service.duration}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="nina-luxury-gradient-dark rounded-2xl p-8 text-white luxury-shadow-dark relative overflow-hidden">
            {/* Luxury overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-playfair mb-4 luxury-text-shadow">Réservez Votre Moment de Détente</h3>
              <p className="text-lg mb-6 opacity-90">
                Contactez-nous pour personnaliser votre expérience bien-être
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/22781836571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[var(--nina-burgundy)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 luxury-shadow"
                >
                  WhatsApp
                </a>
                <a
                  href="tel:+22781836571"
                  className="inline-block luxury-backdrop border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
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