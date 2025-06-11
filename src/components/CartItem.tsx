import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Manga } from '../types';
import Button from './ui/Button';

interface CartItemProps {
  manga: Manga;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ manga, quantity }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleIncrement = () => {
    updateQuantity(manga.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(manga.id, quantity - 1);
    } else {
      removeFromCart(manga.id);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(manga.id);
  };
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-20 h-28 flex-shrink-0 overflow-hidden rounded">
        <img 
          src={manga.coverImage} 
          alt={manga.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between mb-1">
          <h3 className="font-medium text-gray-900">{manga.title}</h3>
          <p className="font-medium">${(manga.price * quantity).toFixed(2)}</p>
        </div>
        
        <p className="text-sm text-gray-500 mb-2">{manga.author}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-gray-300 rounded">
            <button 
              onClick={handleDecrement}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-3 py-1 text-center">{quantity}</span>
            <button 
              onClick={handleIncrement}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-800"
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;