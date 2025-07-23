'use client';

import { Clock, Star, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    name: 'Massage Relaxant',
    description: 'Massage complet du corps aux huiles essentielles pour une détente profonde',
    duration: '60 min',
    price: '85€',
    image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: false
  },
  {
    name: 'Massage Thérapeutique',
    description: 'Soulagement des tensions musculaires avec techniques spécialisées',
    duration: '75 min',
    price: '95€',
    image: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: true
  },
  {
    name: 'Soin du Visage Premium',
    description: 'Nettoyage, exfoliation et hydratation avec produits de luxe',
    duration: '90 min',
    price: '110€',
    image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: false
  },
  {
    name: 'Épilation Intégrale',
    description: 'Épilation professionnelle à la cire chaude, toutes zones',
    duration: '45 min',
    price: '65€',
    image: 'https://images.pexels.com/photos/3985363/pexels-photo-3985363.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: false
  },
  {
    name: 'Forfait Détente Complète',
    description: 'Massage + soin du visage + épilation pour une expérience totale',
    duration: '3h',
    price: '220€',
    image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: true
  },
  {
    name: 'Massage Couples',
    description: 'Séance de massage simultanée dans notre suite privée',
    duration: '60 min',
    price: '160€',
    image: 'https://images.pexels.com/photos/3985331/pexels-photo-3985331.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
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
    <section id="massage" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
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
            <Card key={index} className="hover-lift border-0 shadow-lg overflow-hidden animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                {service.popular && (
                  <Badge className="absolute top-3 right-3 nina-gradient text-white">
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
          <div className="nina-gradient rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-playfair mb-4">Réservez Votre Moment de Détente</h3>
            <p className="text-lg mb-6 opacity-90">
              Contactez-nous pour personnaliser votre expérience bien-être
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+33123456789"
                className="inline-block bg-white text-[var(--nina-burgundy)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Appeler Maintenant
              </a>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-block bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Réserver en Ligne
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}