'use client';

import { useState, useEffect } from 'react';
import { 
  Add, 
  Edit, 
  Delete, 
  Visibility,
  Phone,
  Email,
  Person
} from '@mui/icons-material';
import DataTable, { Column, TableAction } from '../components/DataTable';
import Modal, { ConfirmModal } from '../components/Modal';
import { useToast, ToastContainer } from '../components/Toast';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'M' | 'F';
  address: string;
  city: string;
  postalCode: string;
  registrationDate: string;
  lastVisit?: string;
  totalSpent: number;
  status: 'active' | 'inactive';
  notes?: string;
}

interface ClientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'M' | 'F';
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<ClientFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: 'M',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { toasts, removeToast, success, error } = useToast();

  // Simulation du chargement des données
  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setLoading(true);
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockClients: Client[] = [
        {
          id: '1',
          firstName: 'Marie',
          lastName: 'Dubois',
          email: 'marie.dubois@email.com',
          phone: '06 12 34 56 78',
          birthDate: '1985-03-15',
          gender: 'F',
          address: '123 Rue de la Paix',
          city: 'Paris',
          postalCode: '75001',
          registrationDate: '2024-01-15',
          lastVisit: '2024-03-10',
          totalSpent: 450,
          status: 'active'
        },
        {
          id: '2',
          firstName: 'Jean',
          lastName: 'Martin',
          email: 'jean.martin@email.com',
          phone: '06 98 76 54 32',
          birthDate: '1978-07-22',
          gender: 'M',
          address: '456 Avenue des Champs',
          city: 'Lyon',
          postalCode: '69001',
          registrationDate: '2024-02-01',
          lastVisit: '2024-03-08',
          totalSpent: 320,
          status: 'active'
        },
        {
          id: '3',
          firstName: 'Sophie',
          lastName: 'Bernard',
          email: 'sophie.bernard@email.com',
          phone: '06 11 22 33 44',
          birthDate: '1992-11-08',
          gender: 'F',
          address: '789 Boulevard Saint-Germain',
          city: 'Marseille',
          postalCode: '13001',
          registrationDate: '2024-01-20',
          totalSpent: 180,
          status: 'inactive'
        }
      ];
      
      setClients(mockClients);
    } catch (err) {
      error('Erreur', 'Impossible de charger les clients');
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<Client>[] = [
    {
      key: 'firstName',
      label: 'Prénom',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <Person className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.firstName} {row.lastName}</div>
            <div className="text-sm text-gray-500">{row.gender === 'M' ? 'Homme' : 'Femme'}</div>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Contact',
      render: (value, row) => (
        <div>
          <div className="flex items-center text-sm text-gray-900">
            <Email className="h-4 w-4 mr-1 text-gray-400" />
            {row.email}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Phone className="h-4 w-4 mr-1 text-gray-400" />
            {row.phone}
          </div>
        </div>
      )
    },
    {
      key: 'city',
      label: 'Ville',
      sortable: true
    },
    {
      key: 'registrationDate',
      label: 'Inscription',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
    },
    {
      key: 'lastVisit',
      label: 'Dernière visite',
      sortable: true,
      render: (value) => value ? new Date(value).toLocaleDateString('fr-FR') : 'Jamais'
    },
    {
      key: 'totalSpent',
      label: 'Total dépensé',
      sortable: true,
      align: 'right',
      render: (value) => `€${value}`
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (value) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value === 'active' ? 'Actif' : 'Inactif'}
        </span>
      )
    }
  ];

  const actions: TableAction<Client>[] = [
    {
      label: 'Voir',
      icon: <Visibility className="h-4 w-4" />,
      onClick: (client) => {
        // TODO: Implement view client
        console.log('Voir client:', client);
      },
      color: 'secondary'
    },
    {
      label: 'Modifier',
      icon: <Edit className="h-4 w-4" />,
      onClick: (client) => {
        setSelectedClient(client);
        setFormData({
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email,
          phone: client.phone,
          birthDate: client.birthDate,
          gender: client.gender,
          address: client.address,
          city: client.city,
          postalCode: client.postalCode,
          notes: client.notes || ''
        });
        setShowModal(true);
      }
    },
    {
      label: 'Supprimer',
      icon: <Delete className="h-4 w-4" />,
      onClick: (client) => {
        setSelectedClient(client);
        setShowDeleteModal(true);
      },
      color: 'danger'
    }
  ];

  const handleAddClient = () => {
    setSelectedClient(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      gender: 'M',
      address: '',
      city: '',
      postalCode: '',
      notes: ''
    });
    setFormErrors({});
    setShowModal(true);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) errors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) errors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Format d\'email invalide';
    if (!formData.phone.trim()) errors.phone = 'Le téléphone est requis';
    if (!formData.birthDate) errors.birthDate = 'La date de naissance est requise';
    if (!formData.city.trim()) errors.city = 'La ville est requise';
    if (!formData.postalCode.trim()) errors.postalCode = 'Le code postal est requis';

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

      if (selectedClient) {
        // Mise à jour
        setClients(prev => prev.map(client => 
          client.id === selectedClient.id 
            ? { ...client, ...formData }
            : client
        ));
        success('Client modifié', 'Les informations du client ont été mises à jour avec succès');
      } else {
        // Création
        const newClient: Client = {
          id: Date.now().toString(),
          ...formData,
          registrationDate: new Date().toISOString().split('T')[0],
          totalSpent: 0,
          status: 'active'
        };
        setClients(prev => [...prev, newClient]);
        success('Client ajouté', 'Le nouveau client a été créé avec succès');
      }

      setShowModal(false);
    } catch (err) {
      error('Erreur', 'Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedClient) return;

    setDeleting(true);
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      setClients(prev => prev.filter(client => client.id !== selectedClient.id));
      success('Client supprimé', 'Le client a été supprimé avec succès');
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
          <h1 className="text-3xl font-bold text-white">Clients</h1>
          <p className="text-gray-300 mt-1">Gestion de votre clientèle</p>
        </div>
        <button
          onClick={handleAddClient}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
        >
          <Add className="mr-2 h-4 w-4" />
          Nouveau client
        </button>
      </div>

      {/* Tableau */}
      <DataTable
        data={clients}
        columns={columns}
        actions={actions}
        loading={loading}
        onRefresh={loadClients}
        onExport={(format) => {
          // TODO: Implement export
          console.log('Export:', format);
        }}
      />

      {/* Modal de formulaire */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedClient ? 'Modifier le client' : 'Nouveau client'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Prénom *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  formErrors.firstName ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.firstName && (
                <p className="text-sm text-red-300 mt-1">{formErrors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nom *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  formErrors.lastName ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.lastName && (
                <p className="text-sm text-red-300 mt-1">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  formErrors.email ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.email && (
                <p className="text-sm text-red-300 mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Téléphone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  formErrors.phone ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.phone && (
                <p className="text-sm text-red-300 mt-1">{formErrors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Date de naissance *
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  formErrors.birthDate ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.birthDate && (
                <p className="text-sm text-red-300 mt-1">{formErrors.birthDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Genre
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as 'M' | 'F' }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="M">Homme</option>
                <option value="F">Femme</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Adresse
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Ville *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  formErrors.city ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.city && (
                <p className="text-sm text-red-300 mt-1">{formErrors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Code postal *
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  formErrors.postalCode ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.postalCode && (
                <p className="text-sm text-red-300 mt-1">{formErrors.postalCode}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Notes sur le client..."
            />
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
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 shadow-lg"
            >
              {submitting ? 'Enregistrement...' : selectedClient ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer le client"
        message={`Êtes-vous sûr de vouloir supprimer le client ${selectedClient?.firstName} ${selectedClient?.lastName} ? Cette action est irréversible.`}
        confirmText="Supprimer"
        type="danger"
        loading={deleting}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
