import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mangaData } from '../data/manga';
import { Manga } from '../types';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import MangaCard from '../components/MangaCard';
import { Star, ArrowLeft, Plus, Minus } from 'lucide-react';

const MangaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [manga, setManga] = useState<Manga | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details'>('description');
  const [relatedManga, setRelatedManga] = useState<Manga[]>([]);
  
  useEffect(() => {
    if (id) {
      const mangaId = parseInt(id);
      const foundManga = mangaData.find(m => m.id === mangaId) || null;
      setManga(foundManga);
      
      if (foundManga) {
        const related = mangaData
          .filter(m => 
            m.id !== mangaId && 
            m.genres.some(genre => foundManga.genres.includes(genre))
          )
          .slice(0, 4);
        
        setRelatedManga(related);
      }
      
      setQuantity(1);
    }
  }, [id]);
  
  const handleAddToCart = () => {
    if (manga) {
      addToCart(manga.id, quantity);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };
  
  if (!manga) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Манга не найдена</h1>
          <Link to="/manga" className="text-purple-700 hover:text-purple-900">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/manga" 
        className="inline-flex items-center text-purple-700 hover:text-purple-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Вернуться в каталог
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <img 
            src={manga.coverImage} 
            alt={manga.title}
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{manga.title}</h1>
          <p className="text-lg text-gray-600 mb-4">от {manga.author}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded mr-3">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="ml-1 font-medium">{manga.rating}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {manga.genres.map((genre, index) => (
                <Badge key={index} variant="primary">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-2xl font-bold text-purple-800 mb-4">
            ${manga.price.toFixed(2)}
          </div>
          
          <div className="mb-6">
            <p className="mb-1">
              <span className="font-medium">Издательство:</span> {manga.publisher}
            </p>
            <p className="mb-1">
              <span className="font-medium">Объемы:</span> {manga.volumes}
            </p>
            <p className="mb-1">
              <span className="font-medium">Дата выпуска:</span> {
                new Date(manga.releaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              }
            </p>
          </div>
          
          <div className="flex items-center mb-6">
            <span className="mr-3 font-medium">Количество:</span>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <button 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="px-4 py-1 border-l border-r border-gray-300">
                {quantity}
              </div>
              <button 
                onClick={incrementQuantity}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="mb-8">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleAddToCart}
              disabled={!manga.inStock}
              fullWidth
            >
              {manga.inStock ? 'Добавить в корзину' : 'Распродано'}
            </Button>
          </div>
          
          <div className="border-b border-gray-200 mb-4">
            <div className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-purple-700 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Описание
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'details'
                    ? 'border-b-2 border-purple-700 text-purple-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Подробности
              </button>
            </div>
          </div>
          
          <div>
            {activeTab === 'description' && (
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {manga.description}
              </p>
            )}
            
            {activeTab === 'details' && (
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Заголовок</td>
                    <td className="py-2">{manga.title}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Автор</td>
                    <td className="py-2">{manga.author}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Издатель</td>
                    <td className="py-2">{manga.publisher}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Объемы</td>
                    <td className="py-2">{manga.volumes}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Дата выпуска</td>
                    <td className="py-2">
                      {new Date(manga.releaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 font-medium">Жанры</td>
                    <td className="py-2">{manga.genres.join(', ')}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      
      {relatedManga.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Вам также может понравиться</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedManga.map(manga => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaDetailPage;