import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Требуется электронная почта';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Электронная почта недействительна';
    }
    
    if (!password) {
      newErrors.password = 'Требуется пароль';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать не менее 6 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        await login(email, password);
        navigate('/');
      } catch (error) {
        console.error('Ошибка входа:', error);
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Войдите в свой аккаунт</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                fullWidth
              />
            </div>
            
            <div className="mb-6">
              <Input
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                fullWidth
              />
              <div className="mt-1 text-right">
                <Link to="/forgot-password" className="text-sm text-purple-700 hover:text-purple-900">
                  Забыли пароль?
                </Link>
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              className="mb-4"
            >
              Авторизоваться
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              У вас нет аккаунта?{' '}
              <Link to="/register" className="text-purple-700 hover:text-purple-900 font-medium">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;