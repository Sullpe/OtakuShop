import React from 'react';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, Clock, XCircle, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';

// Моковые данные заказов
const orders = [
  {
    id: 'ORD-12345',
    date: '28 мая 2025',
    status: 'completed',
    items: [
      { title: 'Берсерк. Том 1', price: 8.00, quantity: 1 },
      { title: 'Ванпанчмен. Том 5', price: 10.00, quantity: 2 }
    ],
    total: 28.00
  },
  {
    id: 'ORD-12346',
    date: '5 июня 2025',
    status: 'processing',
    items: [
      { title: 'Токийские мстители. Том 3', price: 7.00, quantity: 1 }
    ],
    total: 7.00
  },
  {
    id: 'ORD-12347',
    date: '26 мая 2025',
    status: 'cancelled',
    items: [
      { title: 'Дорохедоро. Том 7', price: 5.99, quantity: 1 }
    ],
    total: 5.99
  }
];

const OrdersPage: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Завершен';
      case 'processing':
        return 'В обработке';
      case 'cancelled':
        return 'Отменен';
      default:
        return 'Статус неизвестен';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b flex justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <Package className="mr-2" /> Мои заказы
          </h1>
          <Link to="/profile" className='text-purple-700 hover:text-purple-900'>
            Вернуться в профиль
          </Link>
        </div>

        <div className="p-6">
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-gray-50 flex justify-between items-center border-b">
                    <div>
                      <h3 className="font-bold">Заказ #{order.id}</h3>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{getStatusText(order.status)}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between py-3 border-b last:border-0">
                        <div>
                          <p>{item.title}</p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} × {item.price} $
                          </p>
                        </div>
                        <p className="font-medium">{item.price * item.quantity} $</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-gray-50 flex justify-between items-center">
                    <p className="font-bold">Итого: {order.total} $</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Подробнее
                      </Button>
                      {order.status === 'processing' && (
                        <Button variant="danger" size="sm">
                          Отменить заказ
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">У вас пока нет заказов</h3>
              <p className="mt-2 text-gray-500">
                После оформления заказа вы сможете отслеживать его статус здесь
              </p>
              <div className="mt-6">
                <Link to="/manga">
                  <Button variant="primary" icon={<ChevronRight className="w-4 h-4" />}>
                    Перейти в каталог
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;