import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Clock, Star, Users, Zap, ArrowLeft, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const services = [
  {
    name: 'Massage Relaxant',
    description: 'Massage complet du corps aux huiles essentielles pour une détente profonde. Techniques douces et apaisantes pour libérer les tensions du quotidien.',
    duration: '60 min',
    price: '85€',
    image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: false,
    benefits: ['Réduction du stress', 'Amélioration du sommeil', 'Détente musculaire']
  },
  {
    name: 'Massage Thérapeutique',
    description: 'Soulagement des tensions musculaires avec techniques spécialisées. Idéal pour les douleurs chroniques et la récupération sportive.',
    duration: '75 min',
    price: '95€',
    image: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: true,
    benefits: ['Soulagement des douleurs', 'Amélioration de la mobilité', 'Récupération musculaire']
  },
  {
    name: 'Soin du Visage Premium',
    description: 'Nettoyage, exfoliation et hydratation avec produits de luxe. Traitement personnalisé selon votre type de peau.',
    duration: '90 min',
    price: '110€',
    image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: false,
    benefits: ['Peau éclatante', 'Anti-âge', 'Hydratation profonde']
  },
  {
    name: 'Épilation Intégrale',
    description: 'Épilation professionnelle à la cire chaude, toutes zones. Techniques expertes pour un résultat durable et confortable.',
    duration: '45 min',
    price: '65€',
    image: 'https://images.pexels.com/photos/3985363/pexels-photo-3985363.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: false,
    benefits: ['Résultat durable', 'Peau douce', 'Technique professionnelle']
  },
  {
    name: 'Forfait Détente Complète',
    description: 'Massage + soin du visage + épilation pour une expérience totale de bien-être. Notre forfait le plus complet.',
    duration: '3h',
    price: '220€',
    image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: true,
    benefits: ['Expérience complète', 'Économie de 40€', 'Journée détente']
  },
  {
    name: 'Massage Couples',
    description: 'Séance de massage simultanée dans notre suite privée. Moment privilégié à partager à deux.',
    duration: '60 min',
    price: '160€',
    image: 'https://images.pexels.com/photos/3985331/pexels-photo-3985331.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    popular: false,
    benefits: ['Moment à deux', 'Suite privée', 'Ambiance romantique']
  }
];

const features = [
  {
    icon: Star,
    title: 'Excellence',
    description: 'Équipe de professionnels certifiés avec plus de 10 ans d\'expérience dans le bien-être et l\'esthétique'
  },
  {
    icon: Clock,
    title: 'Flexibilité',
    description: 'Horaires étendus et rendez-vous disponibles 7j/7 pour s\'adapter à votre emploi du temps'
  },
  {
    icon: Users,
    title: 'Personnalisé',
    description: 'Chaque soin adapté à vos besoins spécifiques après consultation personnalisée'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Techniques modernes et équipements haut de gamme pour des résultats optimaux'
  }
];

export default function MassagePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Nina Massage - Centre esthétique"
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
              Nina Massage
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
              Centre esthétique de luxe dédié à votre bien-être et votre détente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="nina-gradient text-white hover:opacity-90 transition-all duration-300 px-8 py-4 text-lg"
              >
                <Calendar className="mr-2" size={20} />
                Réserver Maintenant
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 px-8 py-4 text-lg"
              >
                <Phone className="mr-2" size={20} />
                Nous Contacter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair nina-burgundy mb-6">Pourquoi Choisir Nina Massage ?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Notre expertise et notre passion pour le bien-être font de chaque visite une expérience unique
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
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

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair nina-burgundy mb-6">Nos Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète de soins esthétiques et de massages thérapeutiques
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <div className="text-right">
                      <div className="text-2xl font-bold nina-burgundy">{service.price}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {service.duration}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Bienfaits :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-2 h-2 nina-gradient rounded-full mr-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--nina-burgundy)] to-[var(--nina-light-burgundy)]">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-playfair mb-6">Offrez-vous un Moment d'Exception</h2>
            <p className="text-xl mb-8 opacity-90">
              Réservez dès maintenant votre séance de bien-être dans notre centre esthétique de luxe
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-[var(--nina-burgundy)] hover:bg-gray-100 transition-colors duration-300 px-8 py-4 text-lg font-semibold"
              >
                <Calendar className="mr-2" size={20} />
                Réserver en Ligne
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 px-8 py-4 text-lg"
              >
                <Phone className="mr-2" size={20} />
                +33 1 23 45 67 89
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}