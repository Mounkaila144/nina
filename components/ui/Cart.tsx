'use client';

import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, isOpen, setIsOpen, getTotalItems } = useCart();

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return '';
    
    let message = 'Bonjour, je souhaite commander les produits suivants :\n\n';
    items.forEach(item => {
      message += `• ${item.name} - ${item.price} (Quantité: ${item.quantity})\n`;
    });
    message += '\nMerci de me confirmer la disponibilité et le total.';
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/22781836571?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="text-[var(--nina-burgundy)]" size={24} />
              <h2 className="text-lg font-semibold text-gray-900">
                Panier ({getTotalItems()})
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart size={64} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Votre panier est vide
                </h3>
                <p className="text-gray-500">
                  Ajoutez des produits pour commencer vos achats
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-[var(--nina-burgundy)] font-semibold">
                        {item.price}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 rounded-full hover:bg-red-100 text-red-500 transition-colors duration-200 ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Total articles: {getTotalItems()}
                </span>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  Vider le panier
                </button>
              </div>
              
              <Button
                onClick={handleWhatsAppOrder}
                className="w-full nina-luxury-gradient-dark text-white hover:opacity-90 transition-all duration-300 luxury-shadow"
              >
                <ShoppingCart size={16} className="mr-2" />
                Commander via WhatsApp
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Vous serez redirigé vers WhatsApp pour finaliser votre commande
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
