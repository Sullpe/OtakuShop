import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { User, Edit, Lock, LogOut } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState({
    email: '',
    name: ''
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'email') {
      setErrors(prev => ({
        ...prev,
        email: validateEmail(value) ? '' : 'Введите корректный email'
      }));
    }
    
    if (name === 'name') {
      setErrors(prev => ({
        ...prev,
        name: value.trim() ? '' : 'Имя обязательно для заполнения'
      }));
    }
  };

  const handleSave = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
      isValid = false;
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email';
      isValid = false;
    }
    
    setErrors(newErrors);
    setIsEditing(false);
    alert('Изменения успешно сохранены')
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold flex items-center">
            <User className="mr-2" /> Мой профиль
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
          <div className="md:col-span-1 space-y-4">
            <Link 
              to="/profile" 
              className="flex items-center p-3 bg-purple-50 text-purple-700 rounded-lg font-medium"
            >
              <User className="w-5 h-5 mr-2" /> Личные данные
            </Link>
            <Link 
              to="/orders" 
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Мои заказы
            </Link>
            <Link 
              to="/change-password" 
              className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Lock className="w-5 h-5 mr-2" /> Сменить пароль
            </Link>
            <button 
              onClick={logout}
              className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" /> Выход
            </button>
          </div>

          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Личные данные</h2>
              {isEditing ? (
                <Button 
                  variant="primary" 
                  onClick={handleSave}
                  disabled={!!errors.email || !!errors.name}
                >
                  Сохранить
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(true)}
                  icon={<Edit className="w-4 h-4 mr-1" />}
                >
                  Редактировать
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <Input 
                label="Имя"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                error={errors.name}
                fullWidth
              />
              
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                error={errors.email}
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;