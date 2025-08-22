'use client';

import { useState, useEffect } from 'react';
import { 
  Add, 
  Edit, 
  Delete, 
  Visibility,
  Inventory,
  AttachMoney,
  TrendingDown,
  Category,
  LocalShipping,
  QrCode,
  Warning
} from '@mui/icons-material';
import DataTable, { Column, TableAction } from '../components/DataTable';
import Modal, { ConfirmModal } from '../components/Modal';
import { useToast, ToastContainer } from '../components/Toast';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  supplier: string;
  barcode?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductFormData {
  name: string;
  description: string;
  category: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  supplier: string;
  barcode: string;
  imageUrl: string;
}

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  productsCount: number;
}

const PRODUCT_CATEGORIES = [
  'Huiles essentielles',
  'Crèmes et lotions', 
  'Huiles de massage',
  'Produits de bain',
  'Savons et gels',
  'Accessoires',
  'Matériel professionnel',
  'Autre'
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuppliersModal, setShowSuppliersModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: PRODUCT_CATEGORIES[0],
    purchasePrice: 0,
    salePrice: 0,
    stock: 0,
    minStock: 5,
    supplier: '',
    barcode: '',
    imageUrl: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { toasts, removeToast, success, error } = useToast();

  // Simulation du chargement des données
  useEffect(() => {
    loadProducts();
    loadSuppliers();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Huile de massage argan bio',
          description: 'Huile précieuse d\'argan certifiée bio pour massages relaxants',
          category: 'Huiles de massage',
          purchasePrice: 15.50,
          salePrice: 28.90,
          stock: 12,
          minStock: 5,
          supplier: 'BioSpa France',
          barcode: '3456789012345',
          createdAt: '2024-01-15',
          updatedAt: '2024-03-10'
        },
        {
          id: '2',
          name: 'Crème hydratante visage',
          description: 'Crème anti-âge hydratante aux peptides',
          category: 'Crèmes et lotions',
          purchasePrice: 22.00,
          salePrice: 45.00,
          stock: 8,
          minStock: 3,
          supplier: 'Cosmétiques Deluxe',
          barcode: '2345678901234',
          createdAt: '2024-02-01',
          updatedAt: '2024-03-08'
        },
        {
          id: '3',
          name: 'Huile essentielle lavande',
          description: 'Huile essentielle pure de lavande vraie de Provence',
          category: 'Huiles essentielles',
          purchasePrice: 8.30,
          salePrice: 16.90,
          stock: 25,
          minStock: 10,
          supplier: 'Provence Arômes',
          barcode: '1234567890123',
          createdAt: '2024-01-20',
          updatedAt: '2024-03-05'
        },
        {
          id: '4',
          name: 'Gel douche relaxant',
          description: 'Gel douche aux extraits de camomille et miel',
          category: 'Savons et gels',
          purchasePrice: 4.20,
          salePrice: 12.50,
          stock: 3,
          minStock: 8,
          supplier: 'Natural Care',
          barcode: '9876543210987',
          createdAt: '2024-01-10',
          updatedAt: '2024-02-15'
        }
      ];
      
      setProducts(mockProducts);
    } catch (err) {
      error('Erreur', 'Impossible de charger les produits');
    } finally {
      setLoading(false);
    }
  };

  const loadSuppliers = async () => {
    try {
      const mockSuppliers: Supplier[] = [
        { id: '1', name: 'BioSpa France', contact: '01 23 45 67 89', email: 'contact@biospa-france.com', productsCount: 15 },
        { id: '2', name: 'Cosmétiques Deluxe', contact: '04 56 78 90 12', email: 'info@cosmetiques-deluxe.fr', productsCount: 8 },
        { id: '3', name: 'Provence Arômes', contact: '04 12 34 56 78', email: 'vente@provence-aromes.com', productsCount: 12 },
        { id: '4', name: 'Natural Care', contact: '02 34 56 78 90', email: 'commande@natural-care.fr', productsCount: 6 }
      ];
      setSuppliers(mockSuppliers);
    } catch (err) {
      console.error('Erreur chargement fournisseurs:', err);
    }
  };

  const columns: Column<Product>[] = [
    {
      key: 'name',
      label: 'Produit',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
            <Inventory className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <div className="font-medium text-white">{row.name}</div>
            <div className="text-sm text-gray-400">{row.category}</div>
          </div>
        </div>
      )
    },
    {
      key: 'supplier',
      label: 'Fournisseur',
      sortable: true,
      render: (value) => (
        <div className="flex items-center text-sm text-gray-300">
          <LocalShipping className="h-4 w-4 mr-1 text-gray-400" />
          {value}
        </div>
      )
    },
    {
      key: 'purchasePrice',
      label: 'Prix d\'achat',
      sortable: true,
      align: 'right',
      render: (value) => <span className="text-gray-300">€{value}</span>
    },
    {
      key: 'salePrice',
      label: 'Prix de vente',
      sortable: true,
      align: 'right',
      render: (value) => <span className="text-green-400 font-medium">€{value}</span>
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      align: 'center',
      render: (value, row) => (
        <div className="flex items-center justify-center">
          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
            value <= row.minStock 
              ? 'bg-red-100 text-red-800' 
              : value <= row.minStock * 2
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {value <= row.minStock && <Warning className="h-3 w-3 mr-1" />}
            {value}
          </span>
        </div>
      )
    },
    {
      key: 'salePrice',
      label: 'Marge',
      sortable: true,
      align: 'right',
      render: (value, row) => {
        const margin = ((row.salePrice - row.purchasePrice) / row.purchasePrice * 100);
        return (
          <span className={`font-medium ${margin > 50 ? 'text-green-400' : margin > 25 ? 'text-yellow-400' : 'text-red-400'}`}>
            {margin.toFixed(1)}%
          </span>
        );
      }
    }
  ];

  const actions: TableAction<Product>[] = [
    {
      label: 'Voir',
      icon: <Visibility className="h-4 w-4" />,
      onClick: (product) => {
        console.log('Voir produit:', product);
      },
      color: 'secondary'
    },
    {
      label: 'Modifier',
      icon: <Edit className="h-4 w-4" />,
      onClick: (product) => {
        setSelectedProduct(product);
        setFormData({
          name: product.name,
          description: product.description,
          category: product.category,
          purchasePrice: product.purchasePrice,
          salePrice: product.salePrice,
          stock: product.stock,
          minStock: product.minStock,
          supplier: product.supplier,
          barcode: product.barcode || '',
          imageUrl: product.imageUrl || ''
        });
        setShowModal(true);
      }
    },
    {
      label: 'Supprimer',
      icon: <Delete className="h-4 w-4" />,
      onClick: (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
      },
      color: 'danger'
    }
  ];

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      category: PRODUCT_CATEGORIES[0],
      purchasePrice: 0,
      salePrice: 0,
      stock: 0,
      minStock: 5,
      supplier: '',
      barcode: '',
      imageUrl: ''
    });
    setFormErrors({});
    setShowModal(true);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Le nom est requis';
    if (!formData.description.trim()) errors.description = 'La description est requise';
    if (formData.purchasePrice <= 0) errors.purchasePrice = 'Le prix d\'achat doit être positif';
    if (formData.salePrice <= 0) errors.salePrice = 'Le prix de vente doit être positif';
    if (formData.salePrice <= formData.purchasePrice) errors.salePrice = 'Le prix de vente doit être supérieur au prix d\'achat';
    if (formData.stock < 0) errors.stock = 'Le stock ne peut pas être négatif';
    if (formData.minStock <= 0) errors.minStock = 'Le stock minimum doit être positif';
    if (!formData.supplier.trim()) errors.supplier = 'Le fournisseur est requis';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (selectedProduct) {
        setProducts(prev => prev.map(product => 
          product.id === selectedProduct.id 
            ? { 
                ...product, 
                ...formData,
                updatedAt: new Date().toISOString().split('T')[0]
              }
            : product
        ));
        success('Produit modifié', 'Le produit a été mis à jour avec succès');
      } else {
        const newProduct: Product = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        setProducts(prev => [...prev, newProduct]);
        success('Produit ajouté', 'Le nouveau produit a été créé avec succès');
      }

      setShowModal(false);
    } catch (err) {
      error('Erreur', 'Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    setDeleting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProducts(prev => prev.filter(product => product.id !== selectedProduct.id));
      success('Produit supprimé', 'Le produit a été supprimé avec succès');
      setShowDeleteModal(false);
    } catch (err) {
      error('Erreur', 'Une erreur est survenue lors de la suppression');
    } finally {
      setDeleting(false);
    }
  };

  // Calculs pour les stats
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock <= p.minStock).length;
  const totalStockValue = products.reduce((sum, p) => sum + (p.stock * p.purchasePrice), 0);
  const averageMargin = products.length > 0 
    ? products.reduce((sum, p) => sum + ((p.salePrice - p.purchasePrice) / p.purchasePrice * 100), 0) / products.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Produits</h1>
          <p className="text-gray-300 mt-1">Gestion de votre inventaire et catalogue produits</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowSuppliersModal(true)}
            className="flex items-center px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-colors"
          >
            <LocalShipping className="mr-2 h-4 w-4" />
            Fournisseurs
          </button>
          <button
            onClick={handleAddProduct}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            <Add className="mr-2 h-4 w-4" />
            Nouveau produit
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-900/50 rounded-xl">
              <Inventory className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Total produits</p>
              <p className="text-2xl font-bold text-white">{totalProducts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-900/50 rounded-xl">
              <TrendingDown className="h-6 w-6 text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Stock bas</p>
              <p className="text-2xl font-bold text-white">{lowStockProducts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-900/50 rounded-xl">
              <AttachMoney className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Valeur stock</p>
              <p className="text-2xl font-bold text-white">€{totalStockValue.toFixed(0)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 hover:bg-gray-750 transition-all duration-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-900/50 rounded-xl">
              <TrendingDown className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Marge moyenne</p>
              <p className="text-2xl font-bold text-white">{averageMargin.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau */}
      <DataTable
        data={products}
        columns={columns}
        actions={actions}
        loading={loading}
        onRefresh={loadProducts}
        onExport={(format) => {
          console.log('Export:', format);
        }}
      />

      {/* Modal de formulaire produit */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedProduct ? 'Modifier le produit' : 'Nouveau produit'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nom du produit *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                  formErrors.name ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Ex: Huile de massage argan"
              />
              {formErrors.name && (
                <p className="text-sm text-red-300 mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                {PRODUCT_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                formErrors.description ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Description détaillée du produit..."
            />
            {formErrors.description && (
              <p className="text-sm text-red-300 mt-1">{formErrors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Prix d'achat (€) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.purchasePrice}
                onChange={(e) => setFormData(prev => ({ ...prev, purchasePrice: parseFloat(e.target.value) || 0 }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                  formErrors.purchasePrice ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.purchasePrice && (
                <p className="text-sm text-red-300 mt-1">{formErrors.purchasePrice}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Prix de vente (€) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.salePrice}
                onChange={(e) => setFormData(prev => ({ ...prev, salePrice: parseFloat(e.target.value) || 0 }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                  formErrors.salePrice ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.salePrice && (
                <p className="text-sm text-red-300 mt-1">{formErrors.salePrice}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Stock actuel *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                  formErrors.stock ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.stock && (
                <p className="text-sm text-red-300 mt-1">{formErrors.stock}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Stock minimum *
              </label>
              <input
                type="number"
                min="1"
                value={formData.minStock}
                onChange={(e) => setFormData(prev => ({ ...prev, minStock: parseInt(e.target.value) || 5 }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                  formErrors.minStock ? 'border-red-500' : 'border-gray-600'
                }`}
              />
              {formErrors.minStock && (
                <p className="text-sm text-red-300 mt-1">{formErrors.minStock}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Marge calculée
              </label>
              <div className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-gray-300 text-center">
                {formData.purchasePrice > 0 && formData.salePrice > formData.purchasePrice 
                  ? `${(((formData.salePrice - formData.purchasePrice) / formData.purchasePrice) * 100).toFixed(1)}%`
                  : '0%'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Fournisseur *
              </label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                  formErrors.supplier ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Nom du fournisseur"
              />
              {formErrors.supplier && (
                <p className="text-sm text-red-300 mt-1">{formErrors.supplier}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Code-barres
              </label>
              <input
                type="text"
                value={formData.barcode}
                onChange={(e) => setFormData(prev => ({ ...prev, barcode: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Code-barres produit"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              URL Image
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="https://example.com/image.jpg"
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
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 shadow-lg"
            >
              {submitting ? 'Enregistrement...' : selectedProduct ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de confirmation de suppression */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer le produit"
        message={`Êtes-vous sûr de vouloir supprimer le produit "${selectedProduct?.name}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        type="danger"
        loading={deleting}
      />

      {/* Modal Fournisseurs */}
      <Modal
        isOpen={showSuppliersModal}
        onClose={() => setShowSuppliersModal(false)}
        title="Fournisseurs"
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium text-white">Liste des fournisseurs</h4>
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-sm">
              <Add className="h-4 w-4 mr-1 inline" />
              Nouveau
            </button>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-white">{supplier.name}</h5>
                    <p className="text-sm text-gray-300">{supplier.contact}</p>
                    <p className="text-sm text-gray-400">{supplier.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-300">{supplier.productsCount} produits</span>
                    <div className="flex space-x-2 mt-2">
                      <button className="text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-400">
                        <Delete className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}