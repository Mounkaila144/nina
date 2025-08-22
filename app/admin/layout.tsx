'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Dashboard, 
  People, 
  Spa, 
  Inventory, 
  ShoppingCart, 
  ShoppingBag, 
  Receipt, 
  AccountBalance, 
  Group, 
  CalendarToday, 
  Assessment, 
  Settings,
  Menu,
  Close,
  Search,
  Notifications,
  AccountCircle,
  Logout,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

interface User {
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  avatar?: string;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  // Simulation de l'authentification
  useEffect(() => {
    const mockUser: User = {
      name: 'Admin SPA',
      email: 'admin@spa-nina.com',
      role: 'admin'
    };
    setUser(mockUser);
  }, []);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    { id: 'clients', label: 'Clients', icon: <People />, path: '/admin/clients' },
    { id: 'services', label: 'Services & Massages', icon: <Spa />, path: '/admin/services' },
    { id: 'products', label: 'Produits', icon: <Inventory />, path: '/admin/products' },
    { id: 'sales', label: 'Ventes', icon: <ShoppingCart />, path: '/admin/sales' },
    { id: 'purchases', label: 'Achats', icon: <ShoppingBag />, path: '/admin/purchases' },
    { id: 'expenses', label: 'Dépenses', icon: <Receipt />, path: '/admin/expenses' },
    { id: 'accounting', label: 'Comptabilité', icon: <AccountBalance />, path: '/admin/accounting' },
    { id: 'employees', label: 'Employés', icon: <Group />, path: '/admin/employees' },
    { id: 'appointments', label: 'Rendez-vous', icon: <CalendarToday />, path: '/admin/appointments', badge: 5 },
    { id: 'reports', label: 'Rapports', icon: <Assessment />, path: '/admin/reports' },
    { id: 'settings', label: 'Paramètres', icon: <Settings />, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.push('/admin/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement global search
    console.log('Recherche:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-900 lg:flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-700 lg:w-64 ${!sidebarOpen ? 'lg:w-16' : ''}`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600">
          <div className="flex items-center">
            <Spa className="h-8 w-8 text-white mr-3" />
            <span className="text-xl font-bold text-white">SPA Nina</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:block text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
          >
            {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`flex items-center px-4 py-3 mb-1 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className={`mr-3 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {item.icon}
                </span>
                {sidebarOpen && (
                  <>
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2 animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0 transition-all duration-300">
        {/* Header */}
        <header className="bg-gray-800 shadow-lg border-b border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-gray-300 hover:text-white transition-colors"
            >
              <Menu />
            </button>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Recherche globale..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                />
              </div>
            </form>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative text-gray-300 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg">
                <Notifications />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                </div>
                <div className="h-8 w-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                  <AccountCircle className="h-6 w-6 text-white" />
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
                  title="Déconnexion"
                >
                  <Logout />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-900">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700 py-4 px-6">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <p>&copy; 2024 SPA Nina. Tous droits réservés.</p>
            <p className="text-violet-400">Version 1.0.0</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
