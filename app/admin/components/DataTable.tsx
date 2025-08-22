'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  FilterList, 
  Sort, 
  ArrowUpward, 
  ArrowDownward,
  GetApp,
  Refresh,
  MoreVert,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';

export interface Column<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableAction<T = any> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  color?: 'primary' | 'secondary' | 'danger';
  disabled?: (row: T) => boolean;
}

interface DataTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  exportable?: boolean;
  refreshable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  actions?: TableAction<T>[];
  onRefresh?: () => void;
  onExport?: (format: 'csv' | 'pdf') => void;
  className?: string;
  emptyMessage?: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination = ({ 
  currentPage, 
  totalPages, 
  pageSize, 
  totalItems, 
  onPageChange, 
  onPageSizeChange 
}: PaginationProps) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-800 border-t border-gray-700">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-300">
          Affichage de {startItem} à {endItem} sur {totalItems} résultats
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="ml-2 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-white focus:ring-2 focus:ring-violet-500"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span className="text-sm text-gray-300">par page</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-2 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft />
        </button>
        
        <div className="flex space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  currentPage === pageNum
                    ? 'bg-violet-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-2 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  searchable = true,
  filterable = true,
  sortable = true,
  exportable = true,
  refreshable = true,
  pagination = true,
  pageSize: initialPageSize = 10,
  actions = [],
  onRefresh,
  onExport,
  className = '',
  emptyMessage = 'Aucune donnée disponible'
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrage et tri des données
  const processedData = useMemo(() => {
    let filtered = [...data];

    // Recherche
    if (searchTerm && searchable) {
      filtered = filtered.filter(row =>
        columns.some(column => {
          const value = row[column.key];
          return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Tri
    if (sortConfig && sortable) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortConfig, columns, searchable, sortable]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return processedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return processedData.slice(startIndex, startIndex + pageSize);
  }, [processedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(processedData.length / pageSize);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;
    
    setSortConfig(current => {
      if (current?.key === columnKey) {
        return current.direction === 'asc' 
          ? { key: columnKey, direction: 'desc' }
          : null;
      }
      return { key: columnKey, direction: 'asc' };
    });
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const renderCell = (row: T, column: Column<T>) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }
    
    return value?.toString() || '-';
  };

  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <Sort className="h-4 w-4 text-gray-400" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ArrowUpward className="h-4 w-4 text-blue-600" />
      : <ArrowDownward className="h-4 w-4 text-blue-600" />;
  };

  return (
    <div className={`bg-gray-800 shadow-lg rounded-xl border border-gray-700 ${className}`}>
      {/* Header avec actions */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Recherche */}
            {searchable && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                />
              </div>
            )}
            
            {/* Filtres */}
            {filterable && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                <FilterList className="h-4 w-4 mr-2" />
                Filtres
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Export */}
            {exportable && onExport && (
              <div className="relative">
                <button className="flex items-center px-3 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                  <GetApp className="h-4 w-4 mr-2" />
                  Exporter
                </button>
              </div>
            )}
            
            {/* Actualiser */}
            {refreshable && onRefresh && (
              <button
                onClick={onRefresh}
                className="flex items-center px-3 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                <Refresh className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-750">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${
                    column.sortable && sortable ? 'cursor-pointer hover:bg-gray-700' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
                    <span className="ml-2 text-gray-400">Chargement...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="px-6 py-12 text-center text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-700 transition-colors">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-200 ${
                        column.align === 'center' ? 'text-center' :
                        column.align === 'right' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {renderCell(row, column)}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => action.onClick(row)}
                            disabled={action.disabled?.(row)}
                            className={`inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded transition-colors ${
                              action.color === 'danger' 
                                ? 'text-red-300 bg-red-900/30 hover:bg-red-900/50' :
                              action.color === 'secondary'
                                ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' :
                                'text-blue-300 bg-blue-900/30 hover:bg-blue-900/50'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {action.icon && <span className="mr-1">{action.icon}</span>}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && !loading && paginatedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={processedData.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
