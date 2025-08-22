'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import StatsTestimonialsSection from '@/components/sections/StatsTestimonialsSection';
import MassageSection from '@/components/sections/MassageSection';
import StoreSection from '@/components/sections/StoreSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function Home() {
  // Handle anchor links when page loads
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Délai plus long pour laisser le temps à la page de se charger
    }
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://ninamassage.com',
    name: 'Nina Massage & Kiné',
    alternateName: 'Nina Centre de Bien-être',
    description: 'Centre de massage professionnel et kinésithérapie à Niamey, Niger. Services de massage thérapeutique, épilation, drainage lymphatique et soins esthétiques.',
    url: 'https://ninamassage.com',
    telephone: '+22781836571',
    email: 'contact@ninamassage.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Quartier Recasement, 3ème latérite, plaque Adouwal Adamou',
      addressLocality: 'Niamey',
      addressCountry: 'NE',
      addressRegion: 'Niamey'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.5116,
      longitude: 2.1254
    },
    openingHours: [
      'Mo-Fr 08:00-18:00',
      'Sa 09:00-17:00'
    ],
    priceRange: '$$',
    image: [
      'https://ninamassage.com/image/nina-massage-niamey.jpg'
    ],
    sameAs: [
      'https://wa.me/22781836571'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de Massage et Bien-être',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Massage Thérapeutique',
            description: 'Massage professionnel pour soulager les tensions musculaires'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kinésithérapie',
            description: 'Soins de kinésithérapie pour la rééducation et le bien-être'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Épilation',
            description: 'Services d\'épilation professionnelle'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Drainage Lymphatique',
            description: 'Drainage lymphatique pour améliorer la circulation'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127'
    }
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO Content Hidden */}
      <div className="sr-only">
        <h1>Centre de Massage Professionnel à Niamey, Niger - Nina Massage & Kiné</h1>
        <p>Nina Massage & Kiné est le centre de massage et kinésithérapie de référence à Niamey, Niger. Nous proposons des services professionnels de massage thérapeutique, épilation, drainage lymphatique, soins esthétiques, pédicure et manucure. Situé au Quartier Recasement, 3ème latérite, notre centre offre des soins de qualité dans un environnement relaxant. Contactez-nous au +227 81 83 65 71 pour réserver votre séance de bien-être.</p>
        <h2>Services de Massage à Niamey</h2>
        <ul>
          <li>Massage thérapeutique et relaxant à Niamey</li>
          <li>Kinésithérapie professionnelle au Niger</li>
          <li>Épilation définitive et traditionnelle à Niamey</li>
          <li>Drainage lymphatique au Niger</li>
          <li>Soins esthétiques et de beauté à Niamey</li>
          <li>Pédicure et manucure professionnelle au Niger</li>
          <li>Massage 4 mains à Niamey</li>
          <li>Soins du visage au Niger</li>
        </ul>
        <h3>Pourquoi choisir Nina Massage & Kiné à Niamey ?</h3>
        <p>Centre de massage professionnel situé à Niamey, Niger, Nina Massage & Kiné vous accueille dans un cadre moderne et relaxant. Nos thérapeutes qualifiés vous proposent des soins personnalisés adaptés à vos besoins. Que vous recherchiez un massage de relaxation, des soins de kinésithérapie ou des services d'épilation, nous sommes votre partenaire bien-être au Niger.</p>
      </div>

      <Header />
      <HeroSection />
      <StatsTestimonialsSection />
      <MassageSection />
      <StoreSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}