import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mangaData } from '../data/manga';
import MangaCard from '../components/MangaCard';
import Button from '../components/ui/Button';
import { ChevronRight } from 'lucide-react';
import Badge from '../components/ui/Badge';

const HomePage: React.FC = () => {
  const [searchQuery] = useState('');
  
  const filteredManga = mangaData.filter(manga => 
    manga.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    manga.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularCategories = [
    { name: 'Action', genre: 'Action', variant: 'primary' as const },
    { name: 'Romance', genre: 'Romance', variant: 'secondary' as const },
    { name: 'Fantasy', genre: 'Fantasy', variant: 'success' as const },
    { name: 'Horror', genre: 'Horror', variant: 'warning' as const },
    { name: 'Comedy', genre: 'Comedy', variant: 'danger' as const },
    { name: 'Adventure', genre: 'Adventure', variant: 'primary' as const },
  ];

  const featuredManga = filteredManga.slice(0, 4);
  const newReleases = [...filteredManga].sort((a, b) => 
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  ).slice(0, 4);
  const bestsellers = [...filteredManga].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div>
      <section className="bg-gradient-to-r from-purple-800 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Добро пожаловать в наш магазин</h1>
              <p className="text-lg md:text-xl mb-8 text-purple-100">
                Откройте для себя последние релизы манги, бестселлеры и классику в одном месте
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/manga">
                  <Button variant="secondary" size="lg">
                    Перейти в каталог
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {featuredManga.slice(0, 4).map((manga) => (
                <div key={manga.id} className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105">
                  <img 
                    src={manga.coverImage} 
                    alt={manga.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold">{manga.title}</h3>
                      <p className="text-sm opacity-80">{manga.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Избранная манга</h2>
            <Link to="/manga" className="flex items-center text-purple-700 hover:text-purple-900 transition-colors">
              <span className="mr-1">Просмотреть все</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredManga.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </div>
      </section>


      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Популярные категории</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {popularCategories.map((category) => (
              <Link 
                key={category.genre}
                to={`/manga?genre=${category.genre}`}
                className="transition-transform hover:scale-105"
              >
                <Badge variant={category.variant} size="lg">
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Новые релизы</h2>
            <Link to="/manga" className="flex items-center text-purple-700 hover:text-purple-900 transition-colors">
              <span className="mr-1">Просмотреть все</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newReleases.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Бестселлеры</h2>
            <Link to="/manga" className="flex items-center text-purple-700 hover:text-purple-900 transition-colors">
              <span className="mr-1">Просмотреть все</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Будьте в курсе событий</h2>
            <p className="text-purple-100 mb-8">
              Подпишитесь на нашу рассылку, чтобы получать обновления о новых релизах, эксклюзивных предложениях и рекомендациях по манге.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Ваш электронный адрес"
                className="px-4 py-3 rounded-md flex-grow text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button variant="secondary" size="lg">
                Подписаться
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;