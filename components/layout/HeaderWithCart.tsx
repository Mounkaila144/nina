'use client';

import { CartProvider } from '@/contexts/CartContext';
import Header from './Header';

export default function HeaderWithCart() {
  return (
    <CartProvider>
      <Header />
    </CartProvider>
  );
}
