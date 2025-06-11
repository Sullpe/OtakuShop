import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (mangaId: number, quantity?: number) => void;
  removeFromCart: (mangaId: number) => void;
  updateQuantity: (mangaId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('manga-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('manga-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (mangaId: number, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.mangaId === mangaId);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.mangaId === mangaId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { mangaId, quantity }];
      }
    });
  };

  const removeFromCart = (mangaId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.mangaId !== mangaId));
  };

  const updateQuantity = (mangaId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(mangaId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.mangaId === mangaId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return 0;
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};