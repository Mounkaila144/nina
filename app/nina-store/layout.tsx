import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nina Store Niamey - Boutique de Produits de Beauté et Bien-être au Niger',
  description: 'Boutique en ligne Nina Store à Niamey, Niger. Cosmétiques, produits de bien-être, épices authentiques, accessoires de beauté. Livraison rapide au Niger. Commandez via WhatsApp +227 81 83 65 71',
  keywords: [
    'boutique beauté Niamey',
    'cosmétiques Niger',
    'produits bien-être Niamey',
    'épices Niger',
    'accessoires beauté Niamey',
    'Nina Store Niger',
    'boutique en ligne Niamey',
    'produits massage Niger',
    'huiles essentielles Niamey',
    'crèmes beauté Niger'
  ].join(', '),
  openGraph: {
    title: 'Nina Store - Boutique de Beauté Premium à Niamey, Niger',
    description: 'Découvrez notre sélection de produits de beauté, cosmétiques et bien-être à Niamey. Commande facile via WhatsApp.',
    url: 'https://ninamassage.com/nina-store',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: '/image/nina-store-niamey.jpg',
        width: 1200,
        height: 630,
        alt: 'Nina Store - Boutique de beauté à Niamey, Niger'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nina Store - Boutique de Beauté à Niamey, Niger',
    description: 'Produits de beauté, cosmétiques et bien-être à Niamey. Commandez via WhatsApp.',
    images: ['/image/nina-store-niamey.jpg']
  },
  alternates: {
    canonical: 'https://ninamassage.com/nina-store'
  }
};

export default function NinaStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
