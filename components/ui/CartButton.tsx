'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

export default function CartButton() {
  const { getTotalItems, setIsOpen } = useCart();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="relative p-2 rounded-full luxury-backdrop border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 luxury-shadow"
    >
      <ShoppingCart size={20} className="text-[var(--nina-burgundy)]" />
      {totalItems > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center nina-luxury-gradient-dark text-white text-xs font-bold">
          {totalItems > 99 ? '99+' : totalItems}
        </Badge>
      )}
    </button>
  );
}
