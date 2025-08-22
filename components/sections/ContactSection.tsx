'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi de formulaire
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: ['Quartier Recasement', '3ème latérite, plaque Adouwal Adamou', 'Niamey, Niger'],
      link: 'https://maps.google.com'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: ['+227 81 83 65 71'],
      link: 'tel:+22781836571'
    },
    {
      icon: Mail,
      title: 'Email',
      content: ['contact@ninamassage.com'],
      link: 'mailto:contact@ninamassage.com'
    },
    {
      icon: Clock,
      title: 'Horaires',
      content: ['Lun-Sam: 8h-20h', 'Dimanche: Sur rendez-vous'],
      link: null
    }
  ];

  const services = [
    'Drainage Lymphatique',
    'Massage 4 mains',
    'Pédicure',
    'Manucure',
    'Massage Relaxant',
    'Massage Thérapeutique',
    'Consultation Personnalisée'
  ];

  const timeSlots = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Luxury Background */}
      <div className="absolute inset-0 nina-luxury-gradient-diagonal opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair nina-burgundy mb-6">
            Contact & Réservation
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Prenez rendez-vous facilement ou contactez-nous pour toute question. 
            Notre équipe est à votre disposition pour vous offrir la meilleure expérience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <h3 className="text-2xl font-playfair nina-burgundy mb-6">Informations de Contact</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 nina-gradient rounded-full flex items-center justify-center">
                      <info.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                      {info.link && info.title !== 'Horaires' ? (
                        <a 
                          href={info.link}
                          className="text-gray-600 hover:text-[var(--nina-burgundy)] transition-colors duration-300"
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.content.map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </a>
                      ) : (
                        <div className="text-gray-600">
                          {info.content.map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <Card className="overflow-hidden border-0 luxury-shadow">
              <div className="h-64 nina-luxury-gradient-light flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin size={48} className="mx-auto mb-2" />
                  <p>Carte interactive</p>
                  <p className="text-sm">123 Rue de la Beauté, 75001 Paris</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Reservation Form */}
          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <Card className="border-0 luxury-shadow-dark">
              <CardHeader>
                <CardTitle className="text-2xl font-playfair nina-burgundy">
                  Réserver un Rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto mb-4 text-green-500" size={64} />
                    <h3 className="text-xl font-semibold mb-2">Demande Envoyée!</h3>
                    <p className="text-gray-600">
                      Nous vous contacterons dans les plus brefs délais pour confirmer votre rendez-vous.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Votre nom complet"
                          required
                          className="border-gray-300 focus:border-[var(--nina-burgundy)] focus:ring-[var(--nina-burgundy)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="votre@email.com"
                          required
                          className="border-gray-300 focus:border-[var(--nina-burgundy)] focus:ring-[var(--nina-burgundy)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+33 1 23 45 67 89"
                        className="border-gray-300 focus:border-[var(--nina-burgundy)] focus:ring-[var(--nina-burgundy)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service souhaité *
                      </label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                        <SelectTrigger className="border-gray-300 focus:border-[var(--nina-burgundy)] focus:ring-[var(--nina-burgundy)]">
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date souhaitée *
                        </label>
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                          className="border-gray-300 focus:border-[var(--nina-burgundy)] focus:ring-[var(--nina-burgundy)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Heure préférée
                        </label>
                        <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                          <SelectTrigger className="border-gray-300 focus:border-[var(--nina-burgundy)] focus:ring-[var(--nina-burgundy)]">
                            <SelectValue placeholder="Choisir l'heure" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message (optionnel)
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Précisions sur vos besoins ou préférences..."
                        rows={4}
                        className="border-gray-300 focus:border-[var(--nina-burgundy)] focus:ring-[var(--nina-burgundy)]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full nina-luxury-gradient-dark text-white hover:opacity-90 transition-all duration-300 py-3 text-lg luxury-shadow"
                    >
                      <Send className="mr-2" size={20} />
                      Envoyer la Demande
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}