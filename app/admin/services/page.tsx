'use client';

import { useState, useEffect } from 'react';
import { 
  Add, 
  Edit, 
  Delete, 
  Visibility,
  Spa,
  AccessTime,
  AttachMoney,
  Category
} from '@mui/icons-material';
import DataTable, { Column, TableAction } from '../components/DataTable';
import Modal, { ConfirmModal } from '../components/Modal';
import { useToast, ToastContainer } from '../components/Toast';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number; // en minutes
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  bookingCount: number;
  revenue: number;
}

interface ServiceFormData {
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  isActive: boolean;
}

const SERVICE_CATEGORIES = [
  'Massage relaxant',
  'Massage thérapeutique',
  'Massage sportif',
  'Soin du visage',
  'Soin du corps',
  'Épilation',
  'Manucure/Pédicure',
  'Autre'
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    description: '',
    category: SERVICE_CATEGORIES[0],
    duration: 60,
    price: 0,
    isActive: true
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { toasts, removeToast, success, error } = useToast();

  // Simulation du chargement des données
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockServices: Service[] = [
        {
          id: '1',
          name: 'Massage relaxant aux huiles essentielles',
          description: 'Un massage complet du corps avec des huiles essentielles pour une détente profonde',
          category: 'Massage relaxant',
          duration: 60,
          price: 80,
          isActive: true,
          createdAt: '2024-01-15',
          updatedAt: '2024-03-10',
          bookingCount: 45,
          revenue: 3600
        },
        {
          id: '2',
          name: 'Soin du visage hydratant',
          description: 'Soin complet du visage avec nettoyage, gommage et masque hydratant',
          category: 'Soin du visage',
          duration: 90,
          price: 120,
          isActive: true,
          createdAt: '2024-02-01',
          updatedAt: '2024-03-08',
          bookingCount: 32,
          revenue: 3840
        },
        {
          id: '3',
          name: 'Massage thérapeutique du dos',
          description: 'Massage ciblé pour soulager les tensions et douleurs dorsales',
          category: 'Massage thérapeutique',
          duration: 45,
          price: 65,
          isActive: true,
          createdAt: '2024-01-20',
          updatedAt: '2024-03-05',
          bookingCount: 28,
          revenue: 1820
        },
        {
          id: '4',
          name: 'Épilation jambes complètes',
          description: 'Épilation à la cire des jambes complètes',
          category: 'Épilation',
          duration: 30,
          price: 45,
          isActive: false,
          createdAt: '2024-01-10',
          updatedAt: '2024-02-15',
          bookingCount: 15,
          revenue: 675
        }
      ];
      
      setServices(mockServices);
    } catch (err) {
      error('Erreur', 'Impossible de charger les services');
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<Service>[] = [
    {
      key: 'name',
      label: 'Service',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
            <Spa className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-sm text-gray-500">{row.category}</div>
          </div>
        </div>
      )
    },
    {
      key: 'duration',
      label: 'Durée',
      sortable: true,
      render: (value) => (
        <div className="flex items-center text-sm text-gray-900">
          <AccessTime className="h-4 w-4 mr-1 text-gray-400" />
          {value} min
        </div>
      )
    },
    {
      key: 'price',
      label: 'Prix',
      sortable: true,
      align: 'right',
      render: (value) => (
        <div className="flex items-center justify-end text-sm text-gray-900">
          <AttachMoney className="h-4 w-4 mr-1 text-gray-400" />
          €{value}
        </div>
      )
    },
    {
      key: 'bookingCount',
      label: 'Réservations',
      sortable: true,
      align: 'center',
      render: (value) => (
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {value}
        </span>
      )
    },
    {
      key: 'revenue',
      label: 'Chiffre d\'affaires',
      sortable: true,
      align: 'right',
      render: (value) => `€${value}`
    },
    {
      key: 'isActive',
      label: 'Statut',
      sortable: true,
      render: (value) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          value 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Actif' : 'Inactif'}
        </span>
      )
    }
  ];

  const actions: TableAction<Service>[] = [
    {
      label: 'Voir',
      icon: <Visibility className="h-4 w-4" />,
      onClick: (service) => {
        // TODO: Implement view service
        console.log('Voir service:', service);
      },
      color: 'secondary'
    },
    {
      label: 'Modifier',
      icon: <Edit className="h-4 w-4" />,
      onClick: (service) => {
        setSelectedService(service);
        setFormData({
          name: service.name,
          description: service.description,
          category: service.category,
          duration: service.duration,
          price: service.price,
          isActive: service.isActive
        });
        setShowModal(true);
      }
    },
    {
      label: 'Supprimer',
      icon: <Delete className="h-4 w-4" />,
      onClick: (service) => {
        setSelectedService(service);
        setShowDeleteModal(true);
      },
      color: 'danger'
    }
  ];

  const handleAddService = () => {
    setSelectedService(null);
    setFormData({
      name: '',
      description: '',
      category: SERVICE_CATEGORIES[0],
      duration: 60,
      price: 0,
      isActive: true
    });
    setFormErrors({});
    setShowModal(true);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Le nom est requis';
    if (!formData.description.trim()) errors.description = 'La description est requise';
    if (formData.duration <= 0) errors.duration = 'La durée doit être positive';
    if (formData.price <= 0) errors.price = 'Le prix doit être positif';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (selectedService) {
        // Mise à jour
        setServices(prev => prev.map(service => 
          service.id === selectedService.id 
            ? { 
                ...service, 
                ...formData,
                updatedAt: new Date().toISOString().split('T')[0]
              }
            : service
        ));
        success('Service modifié', 'Le service a été mis à jour avec succès');
      } else {
        // Création
        const newService: Service = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          bookingCount: 0,
          revenue: 0
        };
        setServices(prev => [...prev, newService]);
        success('Service ajouté', 'Le nouveau service a été créé avec succès');
      }

      setShowModal(false);
    } catch (err) {
      error('Erreur', 'Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedService) return;

    setDeleting(true);
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      setServices(prev => prev.filter(service => service.id !== selectedService.id));
      success('Service supprimé', 'Le service a été supprimé avec succès');
      setShowDeleteModal(false);
    } catch (err) {
      error('Erreur', 'Une erreur est survenue lors de la suppression');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Services & Massages</h1>
          <p className="text-gray-300 mt-1">Gestion de vos services et prestations</p>
        </div>
        <button
          onClick={handleAddService}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
        >
          <Add className="mr-2 h-4 w-4" />
          Nouveau service
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-900/50 rounded-xl">
              <Spa className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Total services</p>
              <p className="text-2xl font-bold text-white">{services.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-900/50 rounded-xl">
              <Category className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Services actifs</p>
              <p className="text-2xl font-bold text-white">
                {services.filter(s => s.isActive).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-900/50 rounded-xl">
              <AccessTime className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Durée moyenne</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(services.reduce((acc, s) => acc + s.duration, 0) / services.length || 0)} min
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-900/50 rounded-xl">
              <AttachMoney className="h-6 w-6 text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Prix moyen</p>
              <p className="text-2xl font-bold text-white">
                €{Math.round(services.reduce((acc, s) => acc + s.price, 0) / services.length || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau */}
      <DataTable
        data={services}
        columns={columns}
        actions={actions}
        loading={loading}
        onRefresh={loadServices}
        onExport={(format) => {
          // TODO: Implement export
          console.log('Export:', format);
        }}
      />

      {/* Modal de formulaire */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedService ? 'Modifier le service' : 'Nouveau service'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nom du service *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                formErrors.name ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Ex: Massage relaxant aux huiles essentielles"
            />
            {formErrors.name && (
              <p className="text-sm text-red-300 mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                formErrors.description ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Description détaillée du service..."
            />
            {formErrors.description && (
              <p className="text-sm text-red-300 mt-1">{formErrors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              >
                {SERVICE_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Durée (minutes) *
              </label>
              <input
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                  formErrors.duration ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.duration && (
                <p className="text-sm text-red-300 mt-1">{formErrors.duration}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Prix (€) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                  formErrors.price ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.price && (
                <p className="text-sm text-red-300 mt-1">{formErrors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Statut
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-300">
                  Service actif
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              disabled={submitting}
              className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-200 shadow-lg"
            >
              {submitting ? 'Enregistrement...' : selectedService ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer le service"
        message={`Êtes-vous sûr de vouloir supprimer le service "${selectedService?.name}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        type="danger"
        loading={deleting}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
