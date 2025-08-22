'use client';

import { useState } from 'react';
import { ShoppingBag, TrendingDown, Euro, LocalShipping, Search, Add, Receipt } from '@mui/icons-material';

interface Purchase {
  id: string;
  supplier: string;
  items: { name: string; quantity: number; unitPrice: number }[];
  total: number;
  date: string;
  status: 'received' | 'pending' | 'cancelled';
  invoiceNumber: string;
  category: 'products' | 'equipment' | 'supplies';
}

export default function PurchasesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Données de démonstration
  const purchases: Purchase[] = [
    {
      id: 'A001',
      supplier: 'Beauty Supplies Co.',
      items: [
        { name: 'Huiles essentielles', quantity: 10, unitPrice: 15.50 },
        { name: 'Serviettes de massage', quantity: 20, unitPrice: 12.00 }
      ],
      total: 395.00,
      date: '2024-01-15',
      status: 'received',
      invoiceNumber: 'INV-2024-001',
      category: 'products'
    },
    {
      id: 'A002',
      supplier: 'SPA Equipment Ltd',
      items: [
        { name: 'Table de massage professionnelle', quantity: 1, unitPrice: 800.00 }
      ],
      total: 800.00,
      date: '2024-01-12',
      status: 'pending',
      invoiceNumber: 'INV-2024-002',
      category: 'equipment'
    },
    {
      id: 'A003',
      supplier: 'Wellness Distributor',
      items: [
        { name: 'Crèmes hydratantes bio', quantity: 15, unitPrice: 25.00 },
        { name: 'Gants exfoliants', quantity: 30, unitPrice: 8.50 }
      ],
      total: 630.00,
      date: '2024-01-10',
      status: 'received',
      invoiceNumber: 'INV-2024-003',
      category: 'supplies'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'products': return 'bg-blue-100 text-blue-800';
      case 'equipment': return 'bg-purple-100 text-purple-800';
      case 'supplies': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || purchase.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || purchase.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalPurchases = purchases.reduce((sum, purchase) => sum + purchase.total, 0);
  const receivedPurchases = purchases.filter(p => p.status === 'received').length;
  const pendingPurchases = purchases.filter(p => p.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <ShoppingBag className="mr-3 text-violet-400" />
            Gestion des Achats
          </h1>
          <p className="text-gray-400 mt-2">Suivi des commandes et gestion des fournisseurs</p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors">
          <Add className="mr-2" />
          Nouvel Achat
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total dépensé</p>
              <p className="text-2xl font-bold text-white">{totalPurchases.toFixed(2)} €</p>
            </div>
            <div className="p-3 bg-red-600 rounded-lg">
              <Euro className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Achats reçus</p>
              <p className="text-2xl font-bold text-white">{receivedPurchases}</p>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <LocalShipping className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">En attente</p>
              <p className="text-2xl font-bold text-white">{pendingPurchases}</p>
            </div>
            <div className="p-3 bg-yellow-600 rounded-lg">
              <TrendingDown className="text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total achats</p>
              <p className="text-2xl font-bold text-white">{purchases.length}</p>
            </div>
            <div className="p-3 bg-violet-600 rounded-lg">
              <ShoppingBag className="text-white" />
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
                placeholder="Rechercher par fournisseur ou numéro..."
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
            <option value="received">Reçu</option>
            <option value="pending">En attente</option>
            <option value="cancelled">Annulé</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="all">Toutes catégories</option>
            <option value="products">Produits</option>
            <option value="equipment">Équipement</option>
            <option value="supplies">Fournitures</option>
          </select>
        </div>
      </div>

      {/* Tableau des achats */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Achat</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Fournisseur</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Articles</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Montant</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Date</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Catégorie</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Statut</th>
                <th className="text-left py-4 px-6 text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredPurchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-gray-750 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <span className="font-medium text-white">{purchase.id}</span>
                      <div className="text-sm text-gray-400">{purchase.invoiceNumber}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{purchase.supplier}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {purchase.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          <span className="text-white">{item.name}</span>
                          <span className="text-gray-400 ml-2">({item.quantity} × {item.unitPrice}€)</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-white">{purchase.total.toFixed(2)} €</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-300">{new Date(purchase.date).toLocaleDateString('fr-FR')}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(purchase.category)}`}>
                      {purchase.category === 'products' ? 'Produits' :
                       purchase.category === 'equipment' ? 'Équipement' : 'Fournitures'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                      {purchase.status === 'received' ? 'Reçu' :
                       purchase.status === 'pending' ? 'En attente' : 'Annulé'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-violet-400 hover:text-violet-300 transition-colors">
                      <Receipt className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPurchases.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-500 mb-4" />
            <p className="text-gray-400">Aucun achat trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}