'use client';

import { useState, useEffect } from 'react';
import { 
  Add, 
  Edit, 
  Delete, 
  Visibility,
  Person,
  Work,
  Star,
  Phone,
  Email,
  CalendarToday,
  Assignment,
  TrendingUp,
  Schedule,
  Badge,
  LocationOn
} from '@mui/icons-material';
import DataTable, { Column, TableAction } from '../components/DataTable';
import Modal, { ConfirmModal } from '../components/Modal';
import { useToast, ToastContainer } from '../components/Toast';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  skills: string[];
  certifications: string[];
  performance: number;
  hoursPerWeek: number;
  avatar?: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  skills: string[];
  certifications: string[];
  hoursPerWeek: number;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

const EMPLOYEE_ROLES = [
  'Masseur/Masseuse',
  'Esthéticien/Esthéticienne',
  'Thérapeute',
  'Réceptionniste',
  'Manager',
  'Assistant manager',
  'Responsable produits',
  'Comptable',
  'Femme de ménage'
];

const DEPARTMENTS = [
  'Massages',
  'Soins esthétiques',
  'Thérapies',
  'Accueil',
  'Administration',
  'Ventes',
  'Entretien'
];

const SPA_SKILLS = [
  'Massage suédois',
  'Massage deep tissue',
  'Massage aux pierres chaudes',
  'Massage aromathérapie',
  'Reflexologie',
  'Soins du visage',
  'Épilation',
  'Manucure/Pédicure',
  'Maquillage',
  'Conseil client',
  'Vente produits',
  'Gestion planning'
];

const STATUS_LABELS = {
  active: 'Actif',
  inactive: 'Inactif',
  on_leave: 'En congé'
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: EMPLOYEE_ROLES[0],
    department: DEPARTMENTS[0],
    hireDate: new Date().toISOString().split('T')[0],
    salary: 0,
    status: 'active',
    skills: [],
    certifications: [],
    hoursPerWeek: 35,
    address: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const { toasts, removeToast, success, error } = useToast();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockEmployees: Employee[] = [
        {
          id: '1',
          firstName: 'Marie',
          lastName: 'Dubois',
          email: 'marie.dubois@spa.com',
          phone: '06 12 34 56 78',
          role: 'Masseur/Masseuse',
          department: 'Massages',
          hireDate: '2023-01-15',
          salary: 2800,
          status: 'active',
          skills: ['Massage suédois', 'Massage deep tissue', 'Aromathérapie'],
          certifications: ['Massage thérapeutique certifié', 'Formation aromathérapie'],
          performance: 4.8,
          hoursPerWeek: 35,
          address: '15 rue des Fleurs, 75012 Paris',
          emergencyContact: {
            name: 'Paul Dubois',
            phone: '06 98 76 54 32',
            relationship: 'Conjoint'
          },
          createdAt: '2023-01-15',
          updatedAt: '2024-03-10'
        },
        {
          id: '2',
          firstName: 'Sophie',
          lastName: 'Martin',
          email: 'sophie.martin@spa.com',
          phone: '06 23 45 67 89',
          role: 'Esthéticien/Esthéticienne',
          department: 'Soins esthétiques',
          hireDate: '2022-06-10',
          salary: 2600,
          status: 'active',
          skills: ['Soins du visage', 'Épilation', 'Manucure/Pédicure'],
          certifications: ['CAP Esthétique', 'Formation soins anti-âge'],
          performance: 4.6,
          hoursPerWeek: 32,
          address: '8 avenue Mozart, 75016 Paris',
          emergencyContact: {
            name: 'Claire Martin',
            phone: '01 45 67 89 12',
            relationship: 'Mère'
          },
          createdAt: '2022-06-10',
          updatedAt: '2024-02-20'
        },
        {
          id: '3',
          firstName: 'Thomas',
          lastName: 'Leroy',
          email: 'thomas.leroy@spa.com',
          phone: '06 34 56 78 90',
          role: 'Réceptionniste',
          department: 'Accueil',
          hireDate: '2023-09-01',
          salary: 2200,
          status: 'active',
          skills: ['Conseil client', 'Vente produits', 'Gestion planning'],
          certifications: ['Formation accueil client', 'Techniques de vente'],
          performance: 4.4,
          hoursPerWeek: 35,
          address: '22 boulevard Saint-Germain, 75007 Paris',
          emergencyContact: {
            name: 'Anne Leroy',
            phone: '06 11 22 33 44',
            relationship: 'Sœur'
          },
          createdAt: '2023-09-01',
          updatedAt: '2024-03-05'
        },
        {
          id: '4',
          firstName: 'Isabelle',
          lastName: 'Moreau',
          email: 'isabelle.moreau@spa.com',
          phone: '06 45 67 89 01',
          role: 'Manager',
          department: 'Administration',
          hireDate: '2021-03-20',
          salary: 3800,
          status: 'on_leave',
          skills: ['Management', 'Gestion planning', 'Formations équipe'],
          certifications: ['Master Management', 'Formation leadership'],
          performance: 4.9,
          hoursPerWeek: 39,
          address: '5 rue de la Paix, 75001 Paris',
          emergencyContact: {
            name: 'Marc Moreau',
            phone: '06 55 44 33 22',
            relationship: 'Époux'
          },
          createdAt: '2021-03-20',
          updatedAt: '2024-01-15'
        }
      ];
      
      setEmployees(mockEmployees);
    } catch (err) {
      error('Erreur', 'Impossible de charger les employés');
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<Employee>[] = [
    {
      key: 'firstName',
      label: 'Employé',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
            <Person className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <div className="font-medium text-white">{`${row.firstName} ${row.lastName}`}</div>
            <div className="text-sm text-gray-400">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Poste',
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-300">{value}</div>
          <div className="text-sm text-gray-400">{row.department}</div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      align: 'center',
      render: (value) => (
        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
          value === 'active' 
            ? 'bg-green-100 text-green-800' 
            : value === 'on_leave'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {STATUS_LABELS[value as keyof typeof STATUS_LABELS]}
        </span>
      )
    },
    {
      key: 'performance',
      label: 'Performance',
      sortable: true,
      align: 'center',
      render: (value) => (
        <div className="flex items-center justify-center">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-gray-300">{value.toFixed(1)}</span>
        </div>
      )
    },
    {
      key: 'hireDate',
      label: 'Date d\'embauche',
      sortable: true,
      render: (value) => (
        <div className="flex items-center text-sm text-gray-300">
          <CalendarToday className="h-4 w-4 mr-1 text-gray-400" />
          {new Date(value).toLocaleDateString('fr-FR')}
        </div>
      )
    },
    {
      key: 'salary',
      label: 'Salaire',
      sortable: true,
      align: 'right',
      render: (value) => (
        <span className="text-green-400 font-medium">€{value.toLocaleString()}</span>
      )
    }
  ];

  const actions: TableAction<Employee>[] = [
    {
      label: 'Voir',
      icon: <Visibility className="h-4 w-4" />,
      onClick: (employee) => {
        console.log('Voir employé:', employee);
      },
      color: 'secondary'
    },
    {
      label: 'Modifier',
      icon: <Edit className="h-4 w-4" />,
      onClick: (employee) => {
        setSelectedEmployee(employee);
        setFormData({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          role: employee.role,
          department: employee.department,
          hireDate: employee.hireDate,
          salary: employee.salary,
          status: employee.status,
          skills: employee.skills,
          certifications: employee.certifications,
          hoursPerWeek: employee.hoursPerWeek,
          address: employee.address,
          emergencyContact: employee.emergencyContact
        });
        setSelectedSkills(employee.skills);
        setShowModal(true);
      }
    },
    {
      label: 'Supprimer',
      icon: <Delete className="h-4 w-4" />,
      onClick: (employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
      },
      color: 'danger'
    }
  ];

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: EMPLOYEE_ROLES[0],
      department: DEPARTMENTS[0],
      hireDate: new Date().toISOString().split('T')[0],
      salary: 0,
      status: 'active',
      skills: [],
      certifications: [],
      hoursPerWeek: 35,
      address: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      }
    });
    setSelectedSkills([]);
    setFormErrors({});
    setShowModal(true);
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) errors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) errors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email invalide';
    if (!formData.phone.trim()) errors.phone = 'Le téléphone est requis';
    if (formData.salary <= 0) errors.salary = 'Le salaire doit être positif';
    if (formData.hoursPerWeek <= 0 || formData.hoursPerWeek > 48) errors.hoursPerWeek = 'Les heures par semaine doivent être entre 1 et 48';
    if (!formData.address.trim()) errors.address = 'L\'adresse est requise';
    if (!formData.emergencyContact.name.trim()) errors.emergencyContactName = 'Le nom du contact d\'urgence est requis';
    if (!formData.emergencyContact.phone.trim()) errors.emergencyContactPhone = 'Le téléphone du contact d\'urgence est requis';
    if (!formData.emergencyContact.relationship.trim()) errors.emergencyContactRelationship = 'La relation du contact d\'urgence est requise';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const employeeData = {
        ...formData,
        skills: selectedSkills
      };

      if (selectedEmployee) {
        setEmployees(prev => prev.map(employee => 
          employee.id === selectedEmployee.id 
            ? { 
                ...employee, 
                ...employeeData,
                updatedAt: new Date().toISOString().split('T')[0]
              }
            : employee
        ));
        success('Employé modifié', 'L\'employé a été mis à jour avec succès');
      } else {
        const newEmployee: Employee = {
          id: Date.now().toString(),
          ...employeeData,
          performance: 0,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        setEmployees(prev => [...prev, newEmployee]);
        success('Employé ajouté', 'Le nouvel employé a été créé avec succès');
      }

      setShowModal(false);
    } catch (err) {
      error('Erreur', 'Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;

    setDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setEmployees(prev => prev.filter(employee => employee.id !== selectedEmployee.id));
      success('Employé supprimé', 'L\'employé a été supprimé avec succès');
      setShowDeleteModal(false);
    } catch (err) {
      error('Erreur', 'Une erreur est survenue lors de la suppression');
    } finally {
      setDeleting(false);
    }
  };

  // Calculs pour les stats
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const averageSalary = employees.length > 0 ? employees.reduce((sum, e) => sum + e.salary, 0) / employees.length : 0;
  const averagePerformance = employees.length > 0 ? employees.reduce((sum, e) => sum + e.performance, 0) / employees.length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Employés</h1>
          <p className="text-gray-300 mt-1">Gestion de votre équipe et ressources humaines</p>
        </div>
        <button
          onClick={handleAddEmployee}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
        >
          <Add className="mr-2 h-4 w-4" />
          Nouvel employé
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-900/50 rounded-xl">
              <Person className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Total employés</p>
              <p className="text-2xl font-bold text-white">{totalEmployees}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-900/50 rounded-xl">
              <Badge className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Employés actifs</p>
              <p className="text-2xl font-bold text-white">{activeEmployees}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-900/50 rounded-xl">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Salaire moyen</p>
              <p className="text-2xl font-bold text-white">€{averageSalary.toFixed(0)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-900/50 rounded-xl">
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Performance moy.</p>
              <p className="text-2xl font-bold text-white">{averagePerformance.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau */}
      <DataTable
        data={employees}
        columns={columns}
        actions={actions}
        loading={loading}
        onRefresh={loadEmployees}
        onExport={(format) => {
          console.log('Export:', format);
        }}
      />

      {/* Modal de formulaire employé */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedEmployee ? 'Modifier l\'employé' : 'Nouvel employé'}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Informations personnelles</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    formErrors.firstName ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Ex: Marie"
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
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    formErrors.lastName ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Ex: Dubois"
                />
                {formErrors.lastName && (
                  <p className="text-sm text-red-300 mt-1">{formErrors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    formErrors.email ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="marie.dubois@spa.com"
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
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="06 12 34 56 78"
                />
                {formErrors.phone && (
                  <p className="text-sm text-red-300 mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Adresse *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                  formErrors.address ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="15 rue des Fleurs, 75012 Paris"
              />
              {formErrors.address && (
                <p className="text-sm text-red-300 mt-1">{formErrors.address}</p>
              )}
            </div>
          </div>

          {/* Informations professionnelles */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Informations professionnelles</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Poste
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  {EMPLOYEE_ROLES.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Département
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date d'embauche *
                </label>
                <input
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, hireDate: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="on_leave">En congé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Salaire (€) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.salary}
                  onChange={(e) => setFormData(prev => ({ ...prev, salary: parseFloat(e.target.value) || 0 }))}
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    formErrors.salary ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {formErrors.salary && (
                  <p className="text-sm text-red-300 mt-1">{formErrors.salary}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Heures par semaine *
                </label>
                <input
                  type="number"
                  min="1"
                  max="48"
                  value={formData.hoursPerWeek}
                  onChange={(e) => setFormData(prev => ({ ...prev, hoursPerWeek: parseInt(e.target.value) || 35 }))}
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    formErrors.hoursPerWeek ? 'border-red-500' : 'border-gray-600'
                  }`}
                />
                {formErrors.hoursPerWeek && (
                  <p className="text-sm text-red-300 mt-1">{formErrors.hoursPerWeek}</p>
                )}
              </div>
            </div>
          </div>

          {/* Compétences */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Compétences</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {SPA_SKILLS.map(skill => (
                <label key={skill} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="sr-only"
                  />
                  <div className={`flex items-center px-3 py-2 rounded-lg text-sm cursor-pointer transition-all ${
                    selectedSkills.includes(skill)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}>
                    <Assignment className="h-4 w-4 mr-2" />
                    {skill}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Contact d'urgence */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Contact d'urgence</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact.name}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                  }))}
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    formErrors.emergencyContactName ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Paul Dubois"
                />
                {formErrors.emergencyContactName && (
                  <p className="text-sm text-red-300 mt-1">{formErrors.emergencyContactName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                  }))}
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    formErrors.emergencyContactPhone ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="06 98 76 54 32"
                />
                {formErrors.emergencyContactPhone && (
                  <p className="text-sm text-red-300 mt-1">{formErrors.emergencyContactPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Relation *
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
                  }))}
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                    formErrors.emergencyContactRelationship ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Conjoint"
                />
                {formErrors.emergencyContactRelationship && (
                  <p className="text-sm text-red-300 mt-1">{formErrors.emergencyContactRelationship}</p>
                )}
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
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 shadow-lg"
            >
              {submitting ? 'Enregistrement...' : selectedEmployee ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer l'employé"
        message={`Êtes-vous sûr de vouloir supprimer l'employé "${selectedEmployee?.firstName} ${selectedEmployee?.lastName}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        type="danger"
        loading={deleting}
      />

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}