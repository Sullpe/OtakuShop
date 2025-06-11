import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Связаться с нами</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Контактная информация</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-purple-700" />
                <p>ул. Ленина, 45, Кострома, 156001</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-purple-700" />
                <p>8 (967) 687-45-67</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-purple-700" />
                <p>info@otakushop.com</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Режим работы</h2>
            <p>Пн-Пт: 9:00 - 18:00</p>
            <p>Сб-Вс: 10:00 - 15:00</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Форма обратной связи</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Ваше имя"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                fullWidth
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                fullWidth
              />
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Сообщение</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" variant="primary" fullWidth>
                Отправить сообщение
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;