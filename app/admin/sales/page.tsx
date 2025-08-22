'use client';

import { useState } from 'react';
import { ShoppingCart, TrendingUp, Euro, CalendarToday, Search, Filter, Download } from '@mui/icons-material';

interface Sale {
  id: string;
  client: string;
  services: string[];
  products: string[];
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  payment: 'cash' | 'card' | 'transfer';
}

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');

  // Données de démonstration
  const sales: Sale[] = [
    {
      id: 'V001',
      client: 'Mariame Ila',
      services: ['Massage relaxant', 'Soin visage'],
      products: ['Huile essentielle', 'Crème hydratante'],
      total: 125.00,
      date: '2024-01-15',
      status: 'completed',
      payment: 'card'
    },
    {
      id: 'V002',
      client: 'Moubarack Ali',
      services: ['Massage thérapeutique'],
      products: [],
      total: 80.00,
      date: '2024-01-14',
      status: 'completed',
      payment: 'cash'
    },
    {
      id: 'V003',
      client: 'Julie Leroy',
      services: ['Soin complet'],
      products: ['Sérum anti-âge'],
      total: 180.00,
      date: '2024-01-13',
      status: 'pending',
      payment: 'transfer'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentIcon = (payment: string) => {
    switch (payment) {
      case 'cash': return '💵';
      case 'card': return '💳';
      case 'transfer': return '🏦';
      default: return '💰';
    }
  };

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || sale.status === selectedStatus;
    const matchesPayment = selectedPayment === 'all' || sale.payment === selectedPayment;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
  const completedSales = sales.filter(sale => sale.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <ShoppingCart className="mr-3 text-violet-400" />
            Gestion des Ventes
          </h1>
          <p className="text-gray-400 mt-2">Suivi et analyse de toutes les ventes du spa</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors">
          <Download className="mr-2" />
          Exporter
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Chiffre d'affaires</p>
              <p className="text-2xl font-bold text-white">{totalSales.toFixed(2)} €</p>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <Euro className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ventes complétées</p>
              <p className="text-2xl font-bold text-white">{completedSales}</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <TrendingUp className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total ventes</p>
              <p className="text-2xl font-bold text-white">{sales.length}</p>
            </div>
            <div className="p-3 bg-violet-600 rounded-lg">
              <ShoppingCart className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par client ou numéro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="completed">Complétée</option>
            <option value="pending">En attente</option>
            <option value="cancelled">Annulée</option>
          </select>

          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="all">Tous les paiements</option>
            <option value="cash">Espèces</option>
            <option value="card">Carte</option>
            <option value="transfer">Virement</option>
          </select>
        </div>
      </div>

      {/* Tableau des ventes */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Vente</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Client</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Services/Produits</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Montant</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Paiement</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-750 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-white">{sale.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{sale.client}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {sale.services.map((service, index) => (
                        <div key={index} className="text-sm text-blue-400">• {service}</div>
                      ))}
                      {sale.products.map((product, index) => (
                        <div key={index} className="text-sm text-green-400">• {product}</div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-white">{sale.total.toFixed(2)} €</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{new Date(sale.date).toLocaleDateString('fr-FR')}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-lg">{getPaymentIcon(sale.payment)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                      {sale.status === 'completed' ? 'Complétée' :
                       sale.status === 'pending' ? 'En attente' : 'Annulée'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSales.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-400">Aucune vente trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}