import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { mangaData } from '../data/manga';
import { Manga } from '../types';
import CartItem from '../components/CartItem';
import Button from '../components/ui/Button';
import { ShoppingCart, ArrowRight, AlertCircle } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [cartManga, setCartManga] = useState<{ manga: Manga, quantity: number }[]>([]);
  
  useEffect(() => {
    const mangaWithQuantity = cartItems.map(item => {
      const manga = mangaData.find(m => m.id === item.mangaId);
      if (!manga) return null;
      return { manga, quantity: item.quantity };
    }).filter(item => item !== null) as { manga: Manga, quantity: number }[];
    
    setCartManga(mangaWithQuantity);
  }, [cartItems]);
  
  const subtotal = cartManga.reduce(
    (total, item) => total + (item.manga.price * item.quantity), 
    0
  );
  
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Ваша корзина пуста</h1>
          <p className="text-gray-600 mb-8">
            Похоже, вы еще не добавили ни одной манги в корзину
          </p>
          <Link to="/manga">
            <Button variant="primary" size="lg">
              Просмотр манги
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ваша корзина</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Товары ({cartItems.length})</h2>
              <button 
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Очистить корзину
              </button>
            </div>
            
            {cartManga.map(item => (
              <CartItem 
                key={item.manga.id}
                manga={item.manga}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Информация о заказе</h2>
            
            <div className="space-y-4 mb-6">
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
                <span className="text-gray-600">Налог (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {shippingCost > 0 && (
              <div className="flex items-start space-x-2 text-sm bg-blue-50 p-3 rounded-md mb-6">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-blue-800">
                  Добавьте больше товаров к вашему заказу, чтобы получить бесплатную доставку, необходимо ${(50 - subtotal).toFixed(2)}
                </p>
              </div>
            )}
            
            <Link to="/checkout">
              <Button variant="primary" fullWidth size="lg" className="flex items-center justify-center">
                <span>Перейти к оформлению заказа</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            
            <div className="mt-6">
              <Link to="/manga" className="text-purple-700 hover:text-purple-900 text-sm flex justify-center">
                Продолжить покупки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;