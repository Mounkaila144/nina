'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Spa, 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  Login as LoginIcon
} from '@mui/icons-material';

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginError {
  field?: string;
  message: string;
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    remember: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginError[]>([]);
  const router = useRouter();

  const handleInputChange = (field: keyof LoginForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear field-specific errors
    setErrors(prev => prev.filter(error => error.field !== field));
  };

  const validateForm = (): boolean => {
    const newErrors: LoginError[] = [];

    if (!form.email) {
      newErrors.push({ field: 'email', message: 'L\'email est requis' });
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.push({ field: 'email', message: 'Format d\'email invalide' });
    }

    if (!form.password) {
      newErrors.push({ field: 'password', message: 'Le mot de passe est requis' });
    } else if (form.password.length < 6) {
      newErrors.push({ field: 'password', message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors([]);

    try {
      // Simulation d'un appel API d'authentification
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulation de la validation des credentials
      if (form.email === 'admin@spa-nina.com' && form.password === 'admin123') {
        // Simulation du stockage du token
        if (form.remember) {
          localStorage.setItem('spa_auth_token', 'mock_token_123');
          localStorage.setItem('spa_user_role', 'admin');
        } else {
          sessionStorage.setItem('spa_auth_token', 'mock_token_123');
          sessionStorage.setItem('spa_user_role', 'admin');
        }
        
        // Redirection vers le dashboard
        router.push('/admin');
      } else {
        setErrors([{ message: 'Email ou mot de passe incorrect' }]);
      }
    } catch (error) {
      setErrors([{ message: 'Erreur de connexion. Veuillez réessayer.' }]);
    } finally {
      setLoading(false);
    }
  };

  const getFieldError = (field: string) => {
    return errors.find(error => error.field === field)?.message;
  };

  const getGeneralErrors = () => {
    return errors.filter(error => !error.field);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
              <Spa className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">
            Connexion Admin
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Accédez à votre espace d'administration SPA Nina
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800 py-8 px-6 shadow-2xl rounded-2xl border border-gray-700 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* General Errors */}
            {getGeneralErrors().length > 0 && (
              <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 backdrop-blur-sm">
                {getGeneralErrors().map((error, index) => (
                  <p key={index} className="text-sm text-red-300">
                    {error.message}
                  </p>
                ))}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Email className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all ${
                    getFieldError('email') 
                      ? 'border-red-500 bg-red-900/20' 
                      : 'border-gray-600'
                  }`}
                  placeholder="admin@spa-nina.com"
                />
              </div>
              {getFieldError('email') && (
                <p className="mt-1 text-sm text-red-300">{getFieldError('email')}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`block w-full pl-10 pr-10 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all ${
                    getFieldError('password') 
                      ? 'border-red-500 bg-red-900/20' 
                      : 'border-gray-600'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOff className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                  ) : (
                    <Visibility className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                  )}
                </button>
              </div>
              {getFieldError('password') && (
                <p className="mt-1 text-sm text-red-300">{getFieldError('password')}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => handleInputChange('remember', e.target.checked)}
                  className="h-4 w-4 text-violet-600 focus:ring-violet-500 bg-gray-700 border-gray-600 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                  Se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-violet-400 hover:text-violet-300 transition-colors">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connexion en cours...
                </div>
              ) : (
                <div className="flex items-center">
                  <LoginIcon className="mr-2 h-4 w-4" />
                  Se connecter
                </div>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-violet-900/30 border border-violet-700 rounded-lg backdrop-blur-sm">
            <h4 className="text-sm font-medium text-violet-300 mb-2">Identifiants de démonstration :</h4>
            <p className="text-sm text-violet-200">
              <strong>Email :</strong> admin@spa-nina.com<br />
              <strong>Mot de passe :</strong> admin123
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 SPA Nina. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
