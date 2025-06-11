import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { mangaData } from '../data/manga';
import { Manga } from '../types';
import MangaCard from '../components/MangaCard';
import Input from '../components/ui/Input';
import { Sliders, X } from 'lucide-react';

const MangaCatalogPage: React.FC = () => {
  const [displayedManga, setDisplayedManga] = useState<Manga[]>(mangaData);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [sortOption, setSortOption] = useState<string>('title-asc');
  
  const location = useLocation();
  
  const allGenres = Array.from(
    new Set(mangaData.flatMap(manga => manga.genres))
  ).sort();

  const popularCategories = [
    { name: 'Action', genre: 'Action', color: 'bg-red-100 text-red-800' },
    { name: 'Romance', genre: 'Romance', color: 'bg-pink-100 text-pink-800' },
    { name: 'Fantasy', genre: 'Fantasy', color: 'bg-purple-100 text-purple-800' },
    { name: 'Horror', genre: 'Horror', color: 'bg-gray-100 text-gray-800' },
    { name: 'Comedy', genre: 'Comedy', color: 'bg-yellow-100 text-yellow-800' },
    { name: 'Adventure', genre: 'Adventure', color: 'bg-green-100 text-green-800' },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const genre = params.get('genre');
    const search = params.get('search');
    
    if (genre) {
      setSelectedGenres(genre.split(','));
    }
    
    if (search) {
      setSearchQuery(search);
    }
  }, [location]);

  useEffect(() => {
    let filteredManga = [...mangaData];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredManga = filteredManga.filter(
        manga => 
          manga.title.toLowerCase().includes(query) || 
          manga.author.toLowerCase().includes(query)
      );
    }
    
    if (selectedGenres.length > 0) {
      filteredManga = filteredManga.filter(manga => 
        selectedGenres.some(genre => manga.genres.includes(genre))
      );
    }
    
    filteredManga = filteredManga.filter(
      manga => manga.price >= priceRange[0] && manga.price <= priceRange[1]
    );
    
    switch (sortOption) {
      case 'title-asc':
        filteredManga.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filteredManga.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'price-asc':
        filteredManga.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredManga.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        filteredManga.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setDisplayedManga(filteredManga);
  }, [searchQuery, selectedGenres, priceRange, sortOption, mangaData]);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setPriceRange([value, priceRange[1]]);
    }
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setPriceRange([priceRange[0], value]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setPriceRange([0, 50]);
    setSortOption('title-asc');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Манга каталог</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Популярные категории</h2>
        <div className="flex flex-wrap gap-3">
          {popularCategories.map((category) => (
            <Link 
              key={category.genre}
              to={`/manga?genre=${category.genre}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category.color} hover:opacity-80`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Поиск по названию или автору"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          className="mb-4"
        />
        
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-purple-700 hover:text-purple-900 transition-colors"
          >
            <Sliders className="w-4 h-4 mr-2" />
            {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
          </button>
          
          <div className="sm:hidden">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded p-2 text-sm"
            >
              <option value="title-asc">Название (А-Я)</option>
              <option value="title-desc">Название (Я-А)</option>
              <option value="price-asc">Цена (по возрастанию)</option>
              <option value="price-desc">Цена (по убыванию)</option>
              <option value="rating-desc">Рейтинг (наивысший)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Фильтры</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-purple-700 hover:text-purple-900 transition-colors"
              >
                Очистить все
              </button>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Жанры</h4>
              <div className="flex flex-wrap gap-2">
                {allGenres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedGenres.includes(genre)
                        ? 'bg-purple-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {genre}
                    {selectedGenres.includes(genre) && (
                      <X className="inline-block w-3 h-3 ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Диапазон цен</h4>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={handlePriceMinChange}
                  className="w-20"
                />
                <span>к</span>
                <Input
                  type="number"
                  min={priceRange[0]}
                  value={priceRange[1]}
                  onChange={handlePriceMaxChange}
                  className="w-20"
                />
              </div>
            </div>
            
            <div className="hidden sm:block">
              <h4 className="font-medium mb-2">Сортировать по</h4>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="title-asc">Название (А-Я)</option>
                <option value="title-desc">Название (Я-А)</option>
                <option value="price-asc">Цена (по возрастанию)</option>
                <option value="price-desc">Цена (по убыванию)</option>
                <option value="rating-desc">Рейтинг (наивысший)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {displayedManga.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedManga.map(manga => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">Манга не найдена</h3>
              <p className="text-gray-600 mb-4">
                Попробуйте изменить критерии поиска или фильтра
              </p>
              <button
                onClick={clearFilters}
                className="text-purple-700 hover:text-purple-900 transition-colors"
              >
                Очистить все фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MangaCatalogPage;