'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = "22781836571";
  const message = "Bonjour, je souhaite prendre rendez-vous chez Nina Massage & Kiné.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 luxury-shadow"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  );
}
