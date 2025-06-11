import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Lock, ArrowLeft } from 'lucide-react';

const ChangePasswordPage: React.FC = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    general: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      general: ''
    };

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Введите текущий пароль';
      isValid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Введите новый пароль';
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Пароль должен содержать минимум 8 символов';
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await updatePassword(
        formData.currentPassword,
        formData.newPassword
      );
      navigate('/profile', { state: { success: 'Пароль успешно изменен' } });
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Не удалось изменить пароль. Проверьте текущий пароль.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Link 
          to="/profile" 
          className="flex items-center text-gray-700 hover:text-purple-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Назад к профилю
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center">
            <Lock className="w-6 h-6 mr-2" />
            Сменить пароль
          </h1>

          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Текущий пароль"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              error={errors.currentPassword}
              fullWidth
            />

            <Input
              label="Новый пароль"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
              fullWidth
            />

            <Input
              label="Подтвердите новый пароль"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              fullWidth
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
              className="mt-6"
            >
              {isLoading ? 'Сохранение...' : 'Сохранить новый пароль'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;