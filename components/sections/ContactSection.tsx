'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
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
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 via-white to-[var(--nina-burgundy)]/5 relative overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--nina-gold)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--nina-burgundy)] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Modern Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-[var(--nina-burgundy)]/10 rounded-full px-6 py-2 mb-6">
            <MessageCircle className="w-5 h-5 text-[var(--nina-burgundy)]" />
            <span className="text-[var(--nina-burgundy)] font-medium">Contactez-nous</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-playfair nina-burgundy mb-6">
            Contact & <span className="text-[var(--nina-gold)]">Réservation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Prenez rendez-vous facilement ou contactez-nous pour toute question.
            Notre équipe est à votre disposition pour vous offrir la meilleure expérience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-3xl font-playfair nina-burgundy mb-8">Informations de Contact</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50/50">
                    <div className="flex-shrink-0 w-14 h-14 nina-gradient rounded-2xl flex items-center justify-center shadow-md">
                      <info.icon className="text-white" size={22} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2 text-lg">{info.title}</h4>
                      {info.link && info.title !== 'Horaires' ? (
                        <a
                          href={info.link}
                          className="text-gray-600 hover:text-[var(--nina-burgundy)] transition-colors duration-300 block"
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.content.map((line, i) => (
                            <div key={i} className="leading-relaxed">{line}</div>
                          ))}
                        </a>
                      ) : (
                        <div className="text-gray-600">
                          {info.content.map((line, i) => (
                            <div key={i} className="leading-relaxed">{line}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin size={48} className="mx-auto mb-2 text-[var(--nina-burgundy)]" />
                  <p className="font-medium">Carte interactive</p>
                  <p className="text-sm">Quartier Recasement 3ème latérite, plaque Adouwal Adamou</p>
                  <p className="text-sm">Niamey, Niger</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="mb-8">
                <h3 className="text-3xl font-playfair nina-burgundy mb-2">
                  Réserver un Rendez-vous
                </h3>
                <p className="text-gray-600">Remplissez le formulaire ci-dessous pour prendre rendez-vous</p>
              </div>
              <div>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="text-green-500" size={40} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-gray-800">Demande Envoyée!</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Nous vous contacterons dans les plus brefs délais pour confirmer votre rendez-vous.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                          Nom complet *
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Votre nom complet"
                          required
                          className="h-12 border-2 border-gray-200 rounded-xl focus:border-[var(--nina-burgundy)] focus:ring-0 transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="votre@email.com"
                          required
                          className="h-12 border-2 border-gray-200 rounded-xl focus:border-[var(--nina-burgundy)] focus:ring-0 transition-colors duration-300"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}