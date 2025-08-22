'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  People, 
  ShoppingCart, 
  CalendarToday, 
  AttachMoney,
  Spa,
  Inventory,
  MoreVert,
  Refresh,
  Receipt,
  LocalShipping
} from '@mui/icons-material';

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface RecentActivity {
  id: string;
  type: 'appointment' | 'sale' | 'client' | 'expense' | 'purchase';
  title: string;
  description: string;
  time: string;
  amount?: number;
  status?: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatCard[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [salesChart, setSalesChart] = useState<ChartData | null>(null);

  // Simulation du chargement des données
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Données mockées - KPIs étendus
      const mockStats: StatCard[] = [
        {
          title: 'Ventes du jour',
          value: '€1,250',
          change: 8.5,
          icon: <AttachMoney />,
          color: 'bg-emerald-500'
        },
        {
          title: 'Revenus mensuels',
          value: '€42,300',
          change: 15.2,
          icon: <TrendingUp />,
          color: 'bg-blue-500'
        },
        {
          title: 'Clients du jour',
          value: '28',
          change: 12.0,
          icon: <People />,
          color: 'bg-indigo-500'
        },
        {
          title: 'RDV aujourd\'hui',
          value: '12/15',
          change: -3.2,
          icon: <CalendarToday />,
          color: 'bg-purple-500'
        },
        {
          title: 'Stock bas',
          value: '5 articles',
          change: -25.0,
          icon: <Inventory />,
          color: 'bg-red-500'
        },
        {
          title: 'Dépenses du mois',
          value: '€8,940',
          change: 5.8,
          icon: <AttachMoney />,
          color: 'bg-orange-500'
        },
        {
          title: 'Service populaire',
          value: 'Massage relaxant',
          change: 18.7,
          icon: <Spa />,
          color: 'bg-teal-500'
        },
        {
          title: 'Employés actifs',
          value: '6/8',
          change: 0,
          icon: <People />,
          color: 'bg-cyan-500'
        }
      ];

      const mockActivities: RecentActivity[] = [
        {
          id: '1',
          type: 'sale',
          title: 'Vente service + produit',
          description: 'Sophie L. - Massage + Huile argan',
          time: 'Il y a 5 min',
          amount: 125,
          status: 'Payé'
        },
        {
          id: '2',
          type: 'appointment',
          title: 'Rendez-vous confirmé',
          description: 'Marie D. - Soin visage 14h30',
          time: 'Il y a 12 min',
          amount: 95,
          status: 'Confirmé'
        },
        {
          id: '3',
          type: 'expense',
          title: 'Dépense matériel',
          description: 'Achat serviettes et draps',
          time: 'Il y a 25 min',
          amount: 180
        },
        {
          id: '4',
          type: 'purchase',
          title: 'Approvisionnement',
          description: 'Commande huiles essentielles',
          time: 'Il y a 45 min',
          amount: 340
        },
        {
          id: '5',
          type: 'client',
          title: 'Nouveau client VIP',
          description: 'Thomas R. - Programme fidélité',
          time: 'Il y a 1h',
          status: 'Actif'
        }
      ];

      const mockSalesChart: ChartData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Ventes',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgba(59, 130, 246, 1)'
          }
        ]
      };

      setStats(mockStats);
      setRecentActivities(mockActivities);
      setSalesChart(mockSalesChart);
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const refreshData = () => {
    // TODO: Implement data refresh
    console.log('Actualisation des données...');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-300 mt-1">Vue d'ensemble de votre SPA</p>
        </div>
        <button
          onClick={refreshData}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
        >
          <Refresh className="mr-2 h-4 w-4" />
          Actualiser
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {Math.abs(stat.change)}%
                  </span>
                  <span className="text-sm text-gray-400 ml-1">vs mois dernier</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphiques détaillés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Line Chart - Ventes/Revenus 12 mois */}
        <div className="xl:col-span-2 bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Évolution des revenus (12 mois)</h3>
            <button className="text-gray-400 hover:text-gray-300 p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVert />
            </button>
          </div>
          <div className="h-80 flex items-center justify-center bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-gray-400">Line Chart - Ventes & Revenus (Chart.js/Recharts)</p>
          </div>
        </div>

        {/* Pie Chart - Répartition revenus */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Répartition revenus</h3>
            <button className="text-gray-400 hover:text-gray-300 p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVert />
            </button>
          </div>
          <div className="h-80 flex items-center justify-center bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-gray-400 text-center">Pie Chart<br/>Services vs Produits</p>
          </div>
        </div>
      </div>

      {/* Deuxième rangée de graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Bar Chart - Top 5 services */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Top 5 Services</h3>
            <button className="text-gray-400 hover:text-gray-300 p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVert />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-gray-400 text-center">Bar Chart<br/>Top Services par bookings</p>
          </div>
        </div>

        {/* Bar Chart empilé - Dépenses vs Revenus */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Dépenses vs Revenus</h3>
            <button className="text-gray-400 hover:text-gray-300 p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVert />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-gray-400 text-center">Bar Chart empilé<br/>Trimestre par catégorie</p>
          </div>
        </div>

        {/* Doughnut Chart - Satisfaction clients */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Satisfaction Client</h3>
            <button className="text-gray-400 hover:text-gray-300 p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVert />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-gray-400 text-center">Doughnut Chart<br/>Taux de satisfaction</p>
          </div>
        </div>
      </div>

      {/* Heatmap et Activités */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap - Occupation RDV */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Occupation Rendez-vous</h3>
            <button className="text-gray-400 hover:text-gray-300 p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVert />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-700 rounded-lg border border-gray-600">
            <p className="text-gray-400 text-center">Heatmap/Calendrier<br/>Occupation par jour/semaine</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Activités récentes</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'appointment' ? 'bg-purple-900/50 text-purple-400' :
                  activity.type === 'sale' ? 'bg-green-900/50 text-green-400' :
                  activity.type === 'expense' ? 'bg-red-900/50 text-red-400' :
                  activity.type === 'purchase' ? 'bg-orange-900/50 text-orange-400' :
                  'bg-blue-900/50 text-blue-400'
                }`}>
                  {activity.type === 'appointment' ? <CalendarToday className="h-4 w-4" /> :
                   activity.type === 'sale' ? <ShoppingCart className="h-4 w-4" /> :
                   activity.type === 'expense' ? <Receipt className="h-4 w-4" /> :
                   activity.type === 'purchase' ? <LocalShipping className="h-4 w-4" /> :
                   <People className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">{activity.title}</p>
                    {activity.status && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activity.status === 'Payé' || activity.status === 'Confirmé' || activity.status === 'Actif' ? 
                        'bg-green-900/50 text-green-300' : 
                        'bg-yellow-900/50 text-yellow-300'
                      }`}>
                        {activity.status}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{activity.description}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    {activity.amount && (
                      <span className={`text-sm font-medium ${
                        activity.type === 'sale' || activity.type === 'appointment' ? 
                        'text-green-400' : 'text-red-400'
                      }`}>
                        {activity.type === 'expense' || activity.type === 'purchase' ? '-' : ''}€{activity.amount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Actions rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-600 rounded-xl hover:bg-gradient-to-br hover:from-blue-900/30 hover:to-blue-800/30 hover:border-blue-500 transition-all duration-200 group">
            <CalendarToday className="h-6 w-6 text-blue-400 mb-2 group-hover:text-blue-300" />
            <span className="text-xs font-medium text-gray-300 group-hover:text-white text-center">Ajouter rendez-vous</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-600 rounded-xl hover:bg-gradient-to-br hover:from-green-900/30 hover:to-green-800/30 hover:border-green-500 transition-all duration-200 group">
            <ShoppingCart className="h-6 w-6 text-green-400 mb-2 group-hover:text-green-300" />
            <span className="text-xs font-medium text-gray-300 group-hover:text-white text-center">Enregistrer vente</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-600 rounded-xl hover:bg-gradient-to-br hover:from-purple-900/30 hover:to-purple-800/30 hover:border-purple-500 transition-all duration-200 group">
            <TrendingUp className="h-6 w-6 text-purple-400 mb-2 group-hover:text-purple-300" />
            <span className="text-xs font-medium text-gray-300 group-hover:text-white text-center">Voir rapports</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-600 rounded-xl hover:bg-gradient-to-br hover:from-indigo-900/30 hover:to-indigo-800/30 hover:border-indigo-500 transition-all duration-200 group">
            <People className="h-6 w-6 text-indigo-400 mb-2 group-hover:text-indigo-300" />
            <span className="text-xs font-medium text-gray-300 group-hover:text-white text-center">Nouveau client</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-600 rounded-xl hover:bg-gradient-to-br hover:from-orange-900/30 hover:to-orange-800/30 hover:border-orange-500 transition-all duration-200 group">
            <Inventory className="h-6 w-6 text-orange-400 mb-2 group-hover:text-orange-300" />
            <span className="text-xs font-medium text-gray-300 group-hover:text-white text-center">Gérer stock</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-600 rounded-xl hover:bg-gradient-to-br hover:from-teal-900/30 hover:to-teal-800/30 hover:border-teal-500 transition-all duration-200 group">
            <Spa className="h-6 w-6 text-teal-400 mb-2 group-hover:text-teal-300" />
            <span className="text-xs font-medium text-gray-300 group-hover:text-white text-center">Nouveau service</span>
          </button>
        </div>
      </div>
    </div>
  );
}
