'use client';

import { useState } from 'react';
import { Receipt, TrendingUp, Euro, CreditCard, Search, Add, Edit } from '@mui/icons-material';

interface Expense {
  id: string;
  description: string;
  category: 'rent' | 'utilities' | 'supplies' | 'marketing' | 'insurance' | 'maintenance' | 'other';
  amount: number;
  date: string;
  paymentMethod: 'cash' | 'card' | 'transfer' | 'check';
  receipt: boolean;
  vendor: string;
  notes?: string;
}

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState('all');

  // Données de démonstration
  const expenses: Expense[] = [
    {
      id: 'D001',
      description: 'Loyer mensuel janvier',
      category: 'rent',
      amount: 2500.00,
      date: '2024-01-01',
      paymentMethod: 'transfer',
      receipt: true,
      vendor: 'Immobilier SPA Properties',
      notes: 'Loyer mensuel + charges'
    },
    {
      id: 'D002',
      description: 'Électricité et gaz',
      category: 'utilities',
      amount: 350.75,
      date: '2024-01-05',
      paymentMethod: 'transfer',
      receipt: true,
      vendor: 'EDF Energy',
    },
    {
      id: 'D003',
      description: 'Publicité Facebook Ads',
      category: 'marketing',
      amount: 150.00,
      date: '2024-01-10',
      paymentMethod: 'card',
      receipt: true,
      vendor: 'Meta Business',
      notes: 'Campagne janvier 2024'
    },
    {
      id: 'D004',
      description: 'Assurance responsabilité civile',
      category: 'insurance',
      amount: 89.90,
      date: '2024-01-12',
      paymentMethod: 'transfer',
      receipt: true,
      vendor: 'Assurances Pro SPA'
    },
    {
      id: 'D005',
      description: 'Maintenance équipement massage',
      category: 'maintenance',
      amount: 275.50,
      date: '2024-01-15',
      paymentMethod: 'card',
      receipt: true,
      vendor: 'TechSPA Maintenance'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rent': return 'bg-red-100 text-red-800';
      case 'utilities': return 'bg-yellow-100 text-yellow-800';
      case 'supplies': return 'bg-blue-100 text-blue-800';
      case 'marketing': return 'bg-green-100 text-green-800';
      case 'insurance': return 'bg-purple-100 text-purple-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'rent': return 'Loyer';
      case 'utilities': return 'Services publics';
      case 'supplies': return 'Fournitures';
      case 'marketing': return 'Marketing';
      case 'insurance': return 'Assurance';
      case 'maintenance': return 'Maintenance';
      case 'other': return 'Autre';
      default: return category;
    }
  };

  const getPaymentIcon = (payment: string) => {
    switch (payment) {
      case 'cash': return '💵';
      case 'card': return '💳';
      case 'transfer': return '🏦';
      case 'check': return '📄';
      default: return '💰';
    }
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    const matchesPayment = selectedPayment === 'all' || expense.paymentMethod === selectedPayment;
    
    return matchesSearch && matchesCategory && matchesPayment;
  });

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(expensesByCategory).reduce((a, b) => a[1] > b[1] ? a : b, ['', 0]);

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Receipt className="mr-3 text-violet-400" />
            Gestion des Dépenses
          </h1>
          <p className="text-gray-400 mt-2">Suivi et catégorisation de toutes les dépenses</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors">
          <Add className="mr-2" />
          Nouvelle Dépense
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total dépenses</p>
              <p className="text-2xl font-bold text-white">{totalExpenses.toFixed(2)} €</p>
            </div>
            <div className="p-3 bg-red-600 rounded-lg">
              <Euro className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Catégorie principale</p>
              <p className="text-xl font-bold text-white">{getCategoryLabel(topCategory[0])}</p>
              <p className="text-sm text-gray-400">{topCategory[1].toFixed(2)} €</p>
            </div>
            <div className="p-3 bg-violet-600 rounded-lg">
              <TrendingUp className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Nombre de dépenses</p>
              <p className="text-2xl font-bold text-white">{expenses.length}</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <Receipt className="text-white" />
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
                placeholder="Rechercher par description ou fournisseur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="all">Toutes catégories</option>
            <option value="rent">Loyer</option>
            <option value="utilities">Services publics</option>
            <option value="supplies">Fournitures</option>
            <option value="marketing">Marketing</option>
            <option value="insurance">Assurance</option>
            <option value="maintenance">Maintenance</option>
            <option value="other">Autre</option>
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
            <option value="check">Chèque</option>
          </select>
        </div>
      </div>

      {/* Tableau des dépenses */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Dépense</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Description</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Fournisseur</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Catégorie</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Montant</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Paiement</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Reçu</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-750 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-white">{expense.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <span className="text-white">{expense.description}</span>
                      {expense.notes && (
                        <div className="text-sm text-gray-400 mt-1">{expense.notes}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{expense.vendor}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                      {getCategoryLabel(expense.category)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-red-400">-{expense.amount.toFixed(2)} €</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{new Date(expense.date).toLocaleDateString('fr-FR')}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-lg">{getPaymentIcon(expense.paymentMethod)}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      expense.receipt ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {expense.receipt ? 'Oui' : 'Non'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-violet-400 hover:text-violet-300 transition-colors mr-2">
                      <Edit className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-12">
            <Receipt className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-400">Aucune dépense trouvée</p>
          </div>
        )}
      </div>

      {/* Répartition par catégorie */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Répartition par catégorie</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(expensesByCategory).map(([category, amount]) => (
            <div key={category} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <span className="text-gray-300">{getCategoryLabel(category)}</span>
              <span className="font-semibold text-white">{amount.toFixed(2)} €</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}