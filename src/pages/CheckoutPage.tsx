import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { mangaData } from '../data/manga';
import { Manga } from '../types';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { CreditCard, ArrowLeft, Check } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Russia',
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  
  const cartManga = cartItems.map(item => {
    const manga = mangaData.find(m => m.id === item.mangaId);
    if (!manga) return null;
    return { manga, quantity: item.quantity };
  }).filter(item => item !== null) as { manga: Manga, quantity: number }[];
  
  const subtotal = cartManga.reduce(
    (total, item) => total + (item.manga.price * item.quantity), 
    0
  );
  
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; 
  const total = subtotal + shippingCost + tax;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
  
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Электронная почта недействительна';
    }
    
    if (formData.expMonth) {
    const month = parseInt(formData.expMonth);
    if (isNaN(month) || month < 1 || month > 12) {
      newErrors.expMonth = 'Неверный месяц';
    }

    }
    if (formData.expYear) {
    const year = parseInt(formData.expYear);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < currentYear || year > currentYear + 10) {
      newErrors.expYear = 'Неверный год';
    }

    }
    if (formData.zipCode && !/^\d{6}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Почтовый индекс должен состоять из 6 цифр';
    }

    if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Номер карты должен состоять только из 16 цифр';
    }

    if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV должен состоять только из 3 или 4 цифр';
    }

    if (formData.firstName && !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(formData.firstName)) {
      newErrors.firstName = 'Имя может содержать только буквы';
    }

    if (formData.lastName && !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Фамилия может содержать только буквы';
    }

    if (formData.cardName && !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(formData.cardName)) {
      newErrors.cardName = 'Имя на карте может содержать только буквы';
    }

    if (formData.city && !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(formData.city)) {
      newErrors.city = 'Название города может содержать только буквы';
    }
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (validate()) {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsOrderComplete(true);
      clearCart(); 
    }, 2000);
  }
};

if (isOrderComplete) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Заказ подтвержден</h1>
        <p className="text-gray-600 mb-8">
          Спасибо за покупку. Ваш заказ получен и обрабатывается
        </p>
        <Link to="/">
          <Button variant="primary">
            Продолжить покупки
          </Button>
        </Link>
      </div>
    </div>
  );
}
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/корзина" 
        className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Вернуться в корзину
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Проверить</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-6">Информация о доставке</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input required={true} minLength={2}  maxLength={50}
                  label="Имя"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  fullWidth
                />
                
                <Input required={true} minLength={2}  maxLength={50}
                  label="Фамилия"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  fullWidth
                />
              </div>
              
              <div className="mb-4">
                <Input required={true} maxLength={50}
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  fullWidth
                />
              </div>
                            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input required={true} minLength={2}  maxLength={100}
                  label="Город"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={errors.city}
                  fullWidth
                />
                
                <Input required={true} minLength={2}  maxLength={100}
                  label="Улица"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  error={errors.state}
                  fullWidth
                />
                
                <Input required={true} minLength={6}  maxLength={6}
                  label="Почтовый индекс"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  error={errors.zipCode}
                  fullWidth
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-6">Информация об оплате</h2>
              
              <div className="mb-4">
                <Input required={true} minLength={2}  maxLength={26}
                  label="Имя на карте"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  error={errors.cardName}
                  fullWidth
                />
              </div>
              
              <div className="mb-4">
                <Input required={true} minLength={16}  maxLength={16}
                  label="Номер карты"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  error={errors.cardNumber}
                  fullWidth
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input required={true} minLength={2}  maxLength={2}
                  label="Месяц срока действия"
                  name="expMonth"
                  placeholder="MM"
                  value={formData.expMonth}
                  onChange={handleInputChange}
                  error={errors.expMonth}
                  fullWidth
                />
                
                <Input required={true} minLength={4}  maxLength={4}
                  label="Год срока действия"
                  name="expYear"
                  placeholder="YYYY"
                  value={formData.expYear}
                  onChange={handleInputChange}
                  error={errors.expYear}
                  fullWidth
                />
                
                <Input required={true} minLength={3}  maxLength={4}
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  error={errors.cvv}
                  fullWidth
                />
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isProcessing}
              className="hidden lg:block"
            >
              {isProcessing ? 'Обработка...' : `Оплатить заказ - $${total.toFixed(2)}`}
            </Button>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Информация о заказе</h2>
            
            <div className="mb-6">
              {cartManga.map(item => (
                <div key={item.manga.id} className="flex items-center py-3 border-b border-gray-200 last:border-0">
                  <div className="w-12 h-16 flex-shrink-0 overflow-hidden rounded">
                    <img 
                      src={item.manga.coverImage} 
                      alt={item.manga.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.manga.title}</p>
                    <p className="text-xs text-gray-500">Кол-во:{item.quantity}</p>
                  </div>
                  
                  <p className="text-sm font-medium">${(item.manga.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Итого</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Доставка</span>
                <span>
                  {shippingCost === 0 ? 'Бесплатно' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Комиссия</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center text-gray-600 text-sm mb-6">
              <CreditCard className="w-4 h-4 mr-2" />
              <span>Безопасная обработка платежей</span>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isProcessing}
              onClick={handleSubmit}
            >
              {isProcessing ? 'Обработка...' : 'Оплатить заказ'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;