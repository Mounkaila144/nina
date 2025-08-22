'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Error, 
  Warning, 
  Info, 
  Close 
} from '@mui/icons-material';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

const Toast = ({ toast, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast.persistent && toast.duration !== 0) {
      const duration = toast.duration || 5000;
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.persistent]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <Error className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <Warning className="h-5 w-5 text-yellow-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-900/50 border-green-700 backdrop-blur-sm';
      case 'error':
        return 'bg-red-900/50 border-red-700 backdrop-blur-sm';
      case 'warning':
        return 'bg-yellow-900/50 border-yellow-700 backdrop-blur-sm';
      case 'info':
        return 'bg-blue-900/50 border-blue-700 backdrop-blur-sm';
      default:
        return 'bg-blue-900/50 border-blue-700 backdrop-blur-sm';
    }
  };

  const getTitleColor = () => {
    switch (toast.type) {
      case 'success':
        return 'text-green-300';
      case 'error':
        return 'text-red-300';
      case 'warning':
        return 'text-yellow-300';
      case 'info':
        return 'text-blue-300';
      default:
        return 'text-blue-300';
    }
  };

  const getMessageColor = () => {
    switch (toast.type) {
      case 'success':
        return 'text-green-200';
      case 'error':
        return 'text-red-200';
      case 'warning':
        return 'text-yellow-200';
      case 'info':
        return 'text-blue-200';
      default:
        return 'text-blue-200';
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`max-w-sm w-full ${getBackgroundColor()} border rounded-lg shadow-lg pointer-events-auto`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className={`text-sm font-medium ${getTitleColor()}`}>
                {toast.title}
              </p>
              {toast.message && (
                <p className={`mt-1 text-sm ${getMessageColor()}`}>
                  {toast.message}
                </p>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className={`inline-flex ${getTitleColor()} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-opacity`}
                onClick={handleClose}
              >
                <span className="sr-only">Fermer</span>
                <Close className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end justify-end px-4 py-6 pointer-events-none sm:p-6 z-50"
    >
      <div className="w-full flex flex-col items-end space-y-4 sm:items-end">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </div>
    </div>
  );
};

// Hook pour gérer les toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  // Méthodes de convenance
  const success = (title: string, message?: string, options?: Partial<ToastMessage>) => {
    addToast({ type: 'success', title, message, ...options });
  };

  const error = (title: string, message?: string, options?: Partial<ToastMessage>) => {
    addToast({ type: 'error', title, message, ...options });
  };

  const warning = (title: string, message?: string, options?: Partial<ToastMessage>) => {
    addToast({ type: 'warning', title, message, ...options });
  };

  const info = (title: string, message?: string, options?: Partial<ToastMessage>) => {
    addToast({ type: 'info', title, message, ...options });
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  };
};

export default Toast;
