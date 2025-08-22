'use client';

import { useState } from 'react';
import { AccountBalance, TrendingUp, TrendingDown, Euro, Receipt, BarChart, PieChart } from '@mui/icons-material';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string;
  account: string;
}

interface Account {
  id: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  balance: number;
}

export default function AccountingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedView, setSelectedView] = useState('overview');

  // Données de démonstration
  const transactions: Transaction[] = [
    { id: 'T001', type: 'income', description: 'Vente services SPA', amount: 2500.00, date: '2024-01-15', category: 'Services', account: 'Revenus services' },
    { id: 'T002', type: 'expense', description: 'Loyer janvier', amount: 2000.00, date: '2024-01-01', category: 'Loyer', account: 'Charges locatives' },
    { id: 'T003', type: 'income', description: 'Vente produits', amount: 850.00, date: '2024-01-14', category: 'Produits', account: 'Revenus produits' },
    { id: 'T004', type: 'expense', description: 'Salaires', amount: 3500.00, date: '2024-01-31', category: 'Personnel', account: 'Charges personnel' },
    { id: 'T005', type: 'expense', description: 'Achats matériel', amount: 750.00, date: '2024-01-10', category: 'Équipement', account: 'Investissements' },
  ];

  const accounts: Account[] = [
    { id: 'A001', name: 'Compte courant', type: 'asset', balance: 15750.00 },
    { id: 'A002', name: 'Caisse', type: 'asset', balance: 1250.00 },
    { id: 'A003', name: 'Revenus services', type: 'revenue', balance: 28500.00 },
    { id: 'A004', name: 'Revenus produits', type: 'revenue', balance: 8750.00 },
    { id: 'A005', name: 'Charges locatives', type: 'expense', balance: 24000.00 },
    { id: 'A006', name: 'Charges personnel', type: 'expense', balance: 42000.00 },
    { id: 'A007', name: 'Investissements', type: 'expense', balance: 5250.00 },
  ];

  const totalRevenue = accounts.filter(a => a.type === 'revenue').reduce((sum, a) => sum + a.balance, 0);
  const totalExpenses = accounts.filter(a => a.type === 'expense').reduce((sum, a) => sum + a.balance, 0);
  const netProfit = totalRevenue - totalExpenses;
  const totalAssets = accounts.filter(a => a.type === 'asset').reduce((sum, a) => sum + a.balance, 0);

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'asset': return 'bg-green-100 text-green-800';
      case 'liability': return 'bg-red-100 text-red-800';
      case 'equity': return 'bg-blue-100 text-blue-800';
      case 'revenue': return 'bg-violet-100 text-violet-800';
      case 'expense': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case 'asset': return 'Actif';
      case 'liability': return 'Passif';
      case 'equity': return 'Capitaux propres';
      case 'revenue': return 'Revenus';
      case 'expense': return 'Charges';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <AccountBalance className="mr-3 text-violet-400" />
            Comptabilité
          </h1>
          <p className="text-gray-400 mt-2">Vue d'ensemble financière et comptable</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="overview">Vue d'ensemble</option>
            <option value="accounts">Plan comptable</option>
            <option value="transactions">Transactions</option>
          </select>
        </div>
      </div>

      {/* Indicateurs clés */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Chiffre d'affaires</p>
              <p className="text-2xl font-bold text-green-400">{totalRevenue.toFixed(2)} €</p>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <TrendingUp className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Charges totales</p>
              <p className="text-2xl font-bold text-red-400">{totalExpenses.toFixed(2)} €</p>
            </div>
            <div className="p-3 bg-red-600 rounded-lg">
              <TrendingDown className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Résultat net</p>
              <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {netProfit >= 0 ? '+' : ''}{netProfit.toFixed(2)} €
              </p>
            </div>
            <div className={`p-3 ${netProfit >= 0 ? 'bg-green-600' : 'bg-red-600'} rounded-lg`}>
              <Euro className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Trésorerie</p>
              <p className="text-2xl font-bold text-blue-400">{totalAssets.toFixed(2)} €</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <AccountBalance className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {selectedView === 'overview' && (
        <>
          {/* Bilan simplifié */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <BarChart className="mr-2 text-green-400" />
                Revenus par catégorie
              </h3>
              <div className="space-y-3">
                {accounts.filter(a => a.type === 'revenue').map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">{account.name}</span>
                    <span className="font-semibold text-green-400">{account.balance.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <PieChart className="mr-2 text-red-400" />
                Charges par catégorie
              </h3>
              <div className="space-y-3">
                {accounts.filter(a => a.type === 'expense').map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <span className="text-gray-300">{account.name}</span>
                    <span className="font-semibold text-red-400">{account.balance.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compte de résultat simplifié */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Compte de résultat</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-green-400 font-medium">Total des revenus</span>
                <span className="text-green-400 font-bold">{totalRevenue.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-red-400 font-medium">Total des charges</span>
                <span className="text-red-400 font-bold">-{totalExpenses.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t-2 border-violet-600">
                <span className="text-white font-bold text-lg">Résultat net</span>
                <span className={`font-bold text-lg ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {netProfit >= 0 ? '+' : ''}{netProfit.toFixed(2)} €
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedView === 'accounts' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Plan comptable</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Compte</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Type</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">Solde</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {accounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-750 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-white">{account.name}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccountTypeColor(account.type)}`}>
                        {getAccountTypeLabel(account.type)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`font-semibold ${
                        account.type === 'revenue' || account.type === 'asset' ? 'text-green-400' : 
                        account.type === 'expense' ? 'text-red-400' : 'text-white'
                      }`}>
                        {account.balance.toFixed(2)} €
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedView === 'transactions' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Dernières transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Date</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Description</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Compte</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Catégorie</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-750 transition-colors">
                    <td className="py-4 px-6">
                      <span className="text-gray-300">{new Date(transaction.date).toLocaleDateString('fr-FR')}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-white">{transaction.description}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-300">{transaction.account}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-300">{transaction.category}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toFixed(2)} €
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}