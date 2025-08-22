'use client';

import { useState, useEffect, useRef } from 'react';
import { Star, Users, Award, Heart, Quote, CheckCircle, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: 500,
    suffix: '+',
    label: 'Clients Satisfaits',
    description: 'Nous avons accompagné plus de 500 clients vers le bien-être',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Star,
    number: 4.9,
    suffix: '/5',
    label: 'Note Moyenne',
    description: 'Excellence reconnue par nos clients',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Award,
    number: 3,
    suffix: '+',
    label: 'Années d\'Expérience',
    description: 'Une expertise développée au fil des années',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: TrendingUp,
    number: 95,
    suffix: '%',
    label: 'Taux de Satisfaction',
    description: 'Nos clients recommandent nos services',
    color: 'from-green-500 to-green-600'
  }
];

const testimonials = [
  {
    name: 'Marie Dubois',
    role: 'Cliente Régulière',
    content: 'Nina est exceptionnelle ! Ses massages m\'ont aidée à retrouver sérénité et bien-être. Je recommande vivement ses services.',
    rating: 5,
    image: '/image/clients/cliente1.png'
  },
  {
    name: 'Sophie Martin',
    role: 'Professionnelle',
    content: 'Le drainage lymphatique chez Nina a transformé ma routine bien-être. Professionnalisme et douceur au rendez-vous.',
    rating: 5,
    image: '/image/clients/client2.png'
  },
  {
    name: 'Amélie Laurent',
    role: 'Maman Active',
    content: 'Un moment de détente absolue ! Nina sait exactement comment soulager les tensions. Une vraie professionnelle.',
    rating: 5,
    image: '/image/clients/client3.png'
  }
];

export default function StatsTestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate numbers
          stats.forEach((stat, index) => {
            let start = 0;
            const end = stat.number;
            const duration = 2000;
            const increment = end / (duration / 16);
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                start = end;
                clearInterval(timer);
              }
              setAnimatedStats(prev => {
                const newStats = [...prev];
                newStats[index] = start;
                return newStats;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-white to-[var(--nina-gold-light)]/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--nina-burgundy)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[var(--nina-gold)] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-[var(--nina-burgundy)]/10 rounded-full px-6 py-2 mb-6">
            <Award className="w-5 h-5 text-[var(--nina-burgundy)]" />
            <span className="text-[var(--nina-burgundy)] font-medium">Excellence & Confiance</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair font-light text-gray-800 mb-4">
            Nos <span className="text-[var(--nina-burgundy)]">Résultats</span> Parlent
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez pourquoi nos clients nous font confiance pour leur bien-être
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="mb-3">
                <span className="text-3xl md:text-4xl font-bold text-gray-800">
                  {animatedStats[index].toFixed(stat.number % 1 !== 0 ? 1 : 0)}
                </span>
                <span className="text-xl font-bold text-[var(--nina-burgundy)]">{stat.suffix}</span>
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-2">{stat.label}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className={`transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-playfair font-light text-gray-800 mb-4">
              Ce que disent nos <span className="text-[var(--nina-burgundy)]">Clientes</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Leurs témoignages authentiques reflètent notre engagement envers l'excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-md border border-gray-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${1000 + index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{testimonial.name}</h4>
                    <p className="text-gray-600 text-xs">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[var(--nina-gold)] fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center text-[var(--nina-burgundy)]">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-xs font-medium">Témoignage Vérifié</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <Heart className="w-12 h-12 text-[var(--nina-burgundy)] mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-playfair font-light text-gray-800 mb-4">
              Rejoignez nos clients satisfaits
            </h3>
            <p className="text-gray-600 mb-6">
              Réservez votre séance et découvrez pourquoi Nina est le choix de confiance pour votre bien-être
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="nina-luxury-gradient-dark text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 luxury-shadow"
            >
              Réserver Maintenant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
