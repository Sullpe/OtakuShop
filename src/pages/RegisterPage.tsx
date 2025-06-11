import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const validate = () => {
    const newErrors: { 
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Требуется имя';
    }
    
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
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        await register(name, email, password);
        navigate('/');
      } catch (error) {
        // Handle errors
        console.error('Регистрация не удалась:', error);
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Создать аккаунт</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Имя"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                fullWidth
              />
            </div>
            
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
            
            <div className="mb-4">
              <Input
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                fullWidth
              />
            </div>
            
            <div className="mb-6">
              <Input
                label="Подтвердите пароль"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                fullWidth
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              className="mb-4"
            >
              Зарегистрироваться
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              У вас уже есть аккаунт?{' '}
              <Link to="/login" className="text-purple-700 hover:text-purple-900 font-medium">
                Авторизоваться
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;