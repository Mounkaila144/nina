'use client';

import { useState } from 'react';
import { 
  Settings, 
  Business, 
  Security, 
  Notifications, 
  Payment, 
  Schedule, 
  Save, 
  Refresh,
  Visibility,
  VisibilityOff,
  Edit,
  Add,
  Delete
} from '@mui/icons-material';

interface BusinessSettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  logo?: string;
  openingHours: {
    [key: string]: { open: string; close: string; closed: boolean };
  };
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  newBookingAlerts: boolean;
  paymentAlerts: boolean;
  reviewAlerts: boolean;
}

interface PaymentSettings {
  acceptCash: boolean;
  acceptCard: boolean;
  acceptOnline: boolean;
  stripeKey?: string;
  paypalEmail?: string;
  taxRate: number;
  currency: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business');
  const [showPasswords, setShowPasswords] = useState(false);
  const [saving, setSaving] = useState(false);

  // États pour les différentes sections
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    name: 'SPA Nina',
    address: '123 Avenue de la Beauté, 75001 Paris',
    phone: '01 42 00 00 00',
    email: 'contact@spa-nina.com',
    website: 'www.spa-nina.com',
    description: 'Un oasis de bien-être et de détente au cœur de Paris',
    openingHours: {
      monday: { open: '09:00', close: '19:00', closed: false },
      tuesday: { open: '09:00', close: '19:00', closed: false },
      wednesday: { open: '09:00', close: '19:00', closed: false },
      thursday: { open: '09:00', close: '19:00', closed: false },
      friday: { open: '09:00', close: '20:00', closed: false },
      saturday: { open: '10:00', close: '18:00', closed: false },
      sunday: { open: '10:00', close: '17:00', closed: true },
    }
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    newBookingAlerts: true,
    paymentAlerts: true,
    reviewAlerts: false,
  });

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    acceptCash: true,
    acceptCard: true,
    acceptOnline: true,
    taxRate: 20,
    currency: 'EUR',
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 3,
  });

  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Google Maps API', key: 'AIza***************', active: true },
    { id: '2', name: 'SMS Provider', key: 'sms_***************', active: true },
    { id: '3', name: 'Email Service', key: 'email_*************', active: false },
  ]);

  const dayLabels = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche',
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Paramètres sauvegardés');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'business', label: 'Entreprise', icon: <Business /> },
    { id: 'schedule', label: 'Horaires', icon: <Schedule /> },
    { id: 'payments', label: 'Paiements', icon: <Payment /> },
    { id: 'notifications', label: 'Notifications', icon: <Notifications /> },
    { id: 'security', label: 'Sécurité', icon: <Security /> },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Settings className="mr-3 text-violet-400" />
            Paramètres
          </h1>
          <p className="text-gray-400 mt-2">Configuration générale de votre spa</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors disabled:opacity-50"
        >
          <Save className="mr-2" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation des onglets */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-violet-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            {/* Onglet Entreprise */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white">Informations de l'entreprise</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom de l'entreprise
                    </label>
                    <input
                      type="text"
                      value={businessSettings.name}
                      onChange={(e) => setBusinessSettings(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={businessSettings.phone}
                      onChange={(e) => setBusinessSettings(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={businessSettings.email}
                      onChange={(e) => setBusinessSettings(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Site web
                    </label>
                    <input
                      type="url"
                      value={businessSettings.website}
                      onChange={(e) => setBusinessSettings(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={businessSettings.address}
                    onChange={(e) => setBusinessSettings(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={businessSettings.description}
                    onChange={(e) => setBusinessSettings(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
            )}

            {/* Onglet Horaires */}
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white">Horaires d'ouverture</h2>
                
                <div className="space-y-4">
                  {Object.entries(businessSettings.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                      <div className="w-24">
                        <span className="text-gray-300 font-medium">{dayLabels[day as keyof typeof dayLabels]}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={!hours.closed}
                          onChange={(e) => setBusinessSettings(prev => ({
                            ...prev,
                            openingHours: {
                              ...prev.openingHours,
                              [day]: { ...hours, closed: !e.target.checked }
                            }
                          }))}
                          className="rounded border-gray-600 text-violet-600 focus:ring-violet-500"
                        />
                        <span className="text-gray-300 text-sm">Ouvert</span>
                      </div>

                      {!hours.closed && (
                        <>
                          <div>
                            <input
                              type="time"
                              value={hours.open}
                              onChange={(e) => setBusinessSettings(prev => ({
                                ...prev,
                                openingHours: {
                                  ...prev.openingHours,
                                  [day]: { ...hours, open: e.target.value }
                                }
                              }))}
                              className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-violet-500"
                            />
                          </div>
                          
                          <span className="text-gray-400">à</span>
                          
                          <div>
                            <input
                              type="time"
                              value={hours.close}
                              onChange={(e) => setBusinessSettings(prev => ({
                                ...prev,
                                openingHours: {
                                  ...prev.openingHours,
                                  [day]: { ...hours, close: e.target.value }
                                }
                              }))}
                              className="px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-violet-500"
                            />
                          </div>
                        </>
                      )}

                      {hours.closed && (
                        <span className="text-gray-500 italic">Fermé</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Onglet Paiements */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white">Méthodes de paiement</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Méthodes acceptées</h3>
                    
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={paymentSettings.acceptCash}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, acceptCash: e.target.checked }))}
                          className="rounded border-gray-600 text-violet-600 focus:ring-violet-500 mr-3"
                        />
                        <span className="text-gray-300">Espèces</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={paymentSettings.acceptCard}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, acceptCard: e.target.checked }))}
                          className="rounded border-gray-600 text-violet-600 focus:ring-violet-500 mr-3"
                        />
                        <span className="text-gray-300">Carte bancaire</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={paymentSettings.acceptOnline}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, acceptOnline: e.target.checked }))}
                          className="rounded border-gray-600 text-violet-600 focus:ring-violet-500 mr-3"
                        />
                        <span className="text-gray-300">Paiement en ligne</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Configuration</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Taux de TVA (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={paymentSettings.taxRate}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, taxRate: parseFloat(e.target.value) }))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Devise
                      </label>
                      <select
                        value={paymentSettings.currency}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, currency: e.target.value }))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      >
                        <option value="EUR">Euro (€)</option>
                        <option value="USD">Dollar US ($)</option>
                        <option value="GBP">Livre Sterling (£)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white">Préférences de notification</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-4">Notifications générales</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Notifications par email</span>
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                          className="rounded border-gray-600 text-violet-600 focus:ring-violet-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Notifications SMS</span>
                        <input
                          type="checkbox"
                          checked={notificationSettings.smsNotifications}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                          className="rounded border-gray-600 text-violet-600 focus:ring-violet-500"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-4">Notifications métier</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Rappels de rendez-vous</span>
                        <input
                          type="checkbox"
                          checked={notificationSettings.appointmentReminders}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, appointmentReminders: e.target.checked }))}
                          className="rounded border-gray-600 text-violet-600 focus:ring-violet-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Nouvelles réservations</span>
                        <input
                          type="checkbox"
                          checked={notificationSettings.newBookingAlerts}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, newBookingAlerts: e.target.checked }))}
                          className="rounded border-gray-600 text-violet-600 focus:ring-violet-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Alertes de paiement</span>
                        <input
                          type="checkbox"
                          checked={notificationSettings.paymentAlerts}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, paymentAlerts: e.target.checked }))}
                          className="rounded border-gray-600 text-violet-600 focus:ring-violet-500"
                        />
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-gray-300">Nouveaux avis clients</span>
                        <input
                          type="checkbox"
                          checked={notificationSettings.reviewAlerts}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, reviewAlerts: e.target.checked }))}
                          className="rounded border-gray-600 text-violet-600 focus:ring-violet-500"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Sécurité */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white">Paramètres de sécurité</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Authentification</h3>
                    
                    <div>
                      <label className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <span className="text-gray-300">Authentification à deux facteurs</span>
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                          className="rounded border-gray-600 text-violet-600 focus:ring-violet-500"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Timeout de session (minutes)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="480"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Politique des mots de passe</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Expiration des mots de passe (jours)
                      </label>
                      <input
                        type="number"
                        min="30"
                        max="365"
                        value={securitySettings.passwordExpiry}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordExpiry: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tentatives de connexion max
                      </label>
                      <input
                        type="number"
                        min="3"
                        max="10"
                        value={securitySettings.loginAttempts}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, loginAttempts: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Clés API */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Clés API</h3>
                    <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                      <Add className="mr-2 h-4 w-4" />
                      Ajouter
                    </button>
                  </div>

                  <div className="space-y-3">
                    {apiKeys.map((apiKey) => (
                      <div key={apiKey.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div>
                          <div className="text-white font-medium">{apiKey.name}</div>
                          <div className="text-gray-400 text-sm font-mono">
                            {showPasswords ? apiKey.key : '••••••••••••••••'}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            apiKey.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {apiKey.active ? 'Active' : 'Inactive'}
                          </span>
                          <button className="text-violet-400 hover:text-violet-300">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-400 hover:text-red-300">
                            <Delete className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="flex items-center text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    {showPasswords ? <VisibilityOff className="mr-2 h-4 w-4" /> : <Visibility className="mr-2 h-4 w-4" />}
                    {showPasswords ? 'Masquer les clés' : 'Afficher les clés'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}