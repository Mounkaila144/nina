'use client';

import { useState } from 'react';
import { Assessment, TrendingUp, TrendingDown, BarChart, PieChart, Download, DateRange, Euro, People, Spa } from '@mui/icons-material';

interface SalesData {
  period: string;
  sales: number;
  services: number;
  products: number;
  appointments: number;
}

interface TopService {
  name: string;
  revenue: number;
  bookings: number;
}

interface TopEmployee {
  name: string;
  revenue: number;
  appointments: number;
  rating: number;
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-01-31');

  // Données de démonstration
  const salesData: SalesData[] = [
    { period: 'Semaine 1', sales: 3250, services: 2100, products: 1150, appointments: 28 },
    { period: 'Semaine 2', sales: 4180, services: 2850, products: 1330, appointments: 35 },
    { period: 'Semaine 3', sales: 3950, services: 2650, products: 1300, appointments: 32 },
    { period: 'Semaine 4', sales: 4520, services: 3200, products: 1320, appointments: 38 },
  ];

  const topServices: TopService[] = [
    { name: 'Massage relaxant 60min', revenue: 4200, bookings: 52 },
    { name: 'Soin visage purifiant', revenue: 2850, bookings: 38 },
    { name: 'Massage deep tissue', revenue: 3600, bookings: 30 },
    { name: 'Pédicure relaxante', revenue: 1800, bookings: 36 },
    { name: 'Massage aux pierres chaudes', revenue: 2250, bookings: 24 },
  ];

  const topEmployees: TopEmployee[] = [
    { name: 'Moubarack Ali', revenue: 5200, appointments: 65, rating: 4.8 },
    { name: 'Isabelle Moreau', revenue: 4850, appointments: 58, rating: 4.9 },
    { name: 'Thomas Leroy', revenue: 3200, appointments: 42, rating: 4.6 },
    { name: 'Mariame Ila', revenue: 4100, appointments: 48, rating: 4.7 },
  ];

  const monthlyStats = {
    totalRevenue: salesData.reduce((sum, data) => sum + data.sales, 0),
    totalAppointments: salesData.reduce((sum, data) => sum + data.appointments, 0),
    averageTicket: salesData.reduce((sum, data) => sum + data.sales, 0) / salesData.reduce((sum, data) => sum + data.appointments, 0),
    servicesRevenue: salesData.reduce((sum, data) => sum + data.services, 0),
    productsRevenue: salesData.reduce((sum, data) => sum + data.products, 0),
  };

  const getGrowthPercentage = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100);
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    console.log(`Exporting report as ${format}`);
    // Simulation d'export
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Assessment className="mr-3 text-violet-400" />
            Rapports & Analytics
          </h1>
          <p className="text-gray-400 mt-2">Analyses détaillées des performances de votre spa</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportReport('pdf')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            PDF
          </button>
          <button 
            onClick={() => exportReport('excel')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            <Download className="mr-2 h-4 w-4" />
            Excel
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type de rapport</label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="overview">Vue d'ensemble</option>
                <option value="sales">Ventes détaillées</option>
                <option value="services">Performance services</option>
                <option value="employees">Performance employés</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Période</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="quarter">Ce trimestre</option>
                <option value="year">Cette année</option>
                <option value="custom">Période personnalisée</option>
              </select>
            </div>

            {selectedPeriod === 'custom' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Du</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Au</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Vue d'ensemble */}
      {selectedReport === 'overview' && (
        <>
          {/* KPIs principaux */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Chiffre d'affaires</p>
                  <p className="text-2xl font-bold text-white">{monthlyStats.totalRevenue.toLocaleString()} €</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+12.5%</span>
                  </div>
                </div>
                <div className="p-3 bg-violet-600 rounded-lg">
                  <Euro className="text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Rendez-vous</p>
                  <p className="text-2xl font-bold text-white">{monthlyStats.totalAppointments}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+8.3%</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-600 rounded-lg">
                  <People className="text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Panier moyen</p>
                  <p className="text-2xl font-bold text-white">{monthlyStats.averageTicket.toFixed(0)} €</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-green-400 text-sm">+3.8%</span>
                  </div>
                </div>
                <div className="p-3 bg-green-600 rounded-lg">
                  <BarChart className="text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Taux de fidélité</p>
                  <p className="text-2xl font-bold text-white">78.5%</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                    <span className="text-red-400 text-sm">-2.1%</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-600 rounded-lg">
                  <Spa className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <BarChart className="mr-2 text-violet-400" />
                Évolution des ventes
              </h3>
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={data.period} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">{data.period}</span>
                      <span className="text-white font-semibold">{data.sales.toLocaleString()} €</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-violet-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(data.sales / Math.max(...salesData.map(d => d.sales))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <PieChart className="mr-2 text-green-400" />
                Répartition des revenus
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-violet-500 rounded mr-3"></div>
                    <span className="text-gray-300">Services</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{monthlyStats.servicesRevenue.toLocaleString()} €</div>
                    <div className="text-gray-400 text-sm">
                      {((monthlyStats.servicesRevenue / monthlyStats.totalRevenue) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                    <span className="text-gray-300">Produits</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{monthlyStats.productsRevenue.toLocaleString()} €</div>
                    <div className="text-gray-400 text-sm">
                      {((monthlyStats.productsRevenue / monthlyStats.totalRevenue) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Services les plus performants */}
      {selectedReport === 'services' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Top Services</h3>
            <p className="text-gray-400 mt-1">Classement par chiffre d'affaires</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Position</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Service</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">Réservations</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">Chiffre d'affaires</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">Prix moyen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {topServices.map((service, index) => (
                  <tr key={service.name} className="hover:bg-gray-750 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 
                          index === 2 ? 'bg-orange-600' : 'bg-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-white">{service.name}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-gray-300">{service.bookings}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-semibold text-green-400">{service.revenue.toLocaleString()} €</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-gray-300">{(service.revenue / service.bookings).toFixed(0)} €</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Performance des employés */}
      {selectedReport === 'employees' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-bold text-white">Performance des Employés</h3>
            <p className="text-gray-400 mt-1">Classement par chiffre d'affaires généré</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Employé</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">RDV traités</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">CA généré</th>
                  <th className="text-right py-4 px-6 text-gray-300 font-medium">CA moyen/RDV</th>
                  <th className="text-center py-4 px-6 text-gray-300 font-medium">Évaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {topEmployees.map((employee, index) => (
                  <tr key={employee.name} className="hover:bg-gray-750 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 
                          index === 2 ? 'bg-orange-600' : 'bg-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium text-white">{employee.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-gray-300">{employee.appointments}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-semibold text-green-400">{employee.revenue.toLocaleString()} €</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-gray-300">{(employee.revenue / employee.appointments).toFixed(0)} €</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-white">{employee.rating}</span>
                      </div>
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