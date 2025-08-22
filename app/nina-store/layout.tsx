import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nina Store - Boutique en ligne de produits de beauté et bien-être',
  description: 'Découvrez Nina Store : cosmétiques, produits de bien-être, accessoires et épices authentiques. Livraison rapide au Niger. Commandez via WhatsApp.',
  keywords: 'Nina Store, cosmétiques Niger, produits beauté Niamey, épices authentiques, bien-être, boutique en ligne Niger',
  openGraph: {
    title: 'Nina Store - Votre boutique beauté et bien-être',
    description: 'Produits de beauté, cosmétiques et épices authentiques disponibles au Niger',
    images: [
      {
        url: 'https://chezninastore.com/cdn/shop/files/La_texture.jpg?v=1746090575&width=1200',
        width: 1200,
        height: 630,
        alt: 'Nina Store - Boutique en ligne',
      },
    ],
  },
};

export default function NinaStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
