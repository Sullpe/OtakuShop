import React from 'react';
import { Link } from 'react-router-dom';
import { Manga } from '../types';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { useCart } from '../contexts/CartContext';

interface MangaCardProps {
  manga: Manga;
}

const MangaCard: React.FC<MangaCardProps> = ({ manga }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    addToCart(manga.id);
  };
  
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <Link to={`/manga/${manga.id}`} className="block overflow-hidden relative">
        <div className="relative pb-[140%] overflow-hidden">
          <img 
            src={manga.coverImage} 
            alt={manga.title}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute top-2 right-2">
          {!manga.inStock && (
            <Badge variant="danger">Распродано</Badge>
          )}
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/manga/${manga.id}`} className="hover:text-purple-700 transition-colors">
            <h3 className="font-bold text-lg line-clamp-2">{manga.title}</h3>
          </Link>
          <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
            <span className="text-yellow-800 font-medium text-sm">{manga.rating}</span>
            <span className="ml-1 text-yellow-500">★</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-2">{manga.author}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {manga.genres.slice(0, 2).map((genre, index) => (
            <Badge key={index} variant="primary">
              {genre}
            </Badge>
          ))}
        </div>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="font-bold text-lg">${manga.price.toFixed(2)}</span>
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleAddToCart}
            disabled={!manga.inStock}
          >
            Добавить в корзину
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MangaCard;