import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/manga?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    setSearchQuery('');
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  function toggleMenu(_event: React.MouseEvent<HTMLButtonElement>): void {
  console.log('Меню переключено');
  }


  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white bg-opacity-90 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          
          <Link to="/" className="text-2xl font-bold text-black-700 flex items-center">
            OtakuShop
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-black-700 hover:text-purple-700 transition-colors">
              Главная страница
            </Link>
            <Link to="/manga" className="text-black-700 hover:text-purple-700 transition-colors">
              Каталог
            </Link>
          </nav>
           
          <div className="hidden md:flex items-center space-x-4">
            <form 
              onSubmit={handleSearchSubmit}
              className={`relative transition-all duration-300 ${
                isSearchFocused ? 'w-64' : 'w-48'
              }`}
            >
              <input
                type="text"
                placeholder="Поиск манги"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="pl-10 pr-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
            
            <Link to="/cart" className="relative text-gray-700 hover:text-purple-700 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="group relative">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-700 transition-colors focus:outline-none">
                  <span className="text-sm">{user?.name}</span>
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-xl rounded-lg py-1 z-50 transform origin-top transition-all duration-200 ease-outscale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible">
                  <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                    <div className="flex items-center">
                      <span>Мой профиль</span>
                    </div>
                  </Link>
                  <Link to="/orders" className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-purple-50 hover:text-purple-700 transition-colors">
                    <div className="flex items-center">
                      <span>Мои заказы</span>
                    </div>
                  </Link>
                  <button onClick={logout}className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Выход из системы
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Авторизоваться
                </Button>
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="relative text-gray-700">
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            <button onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 py-4">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Поиск манги..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
            
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 py-2 border-b border-gray-100">
                Домашняя страница
              </Link>
              <Link to="/manga" className="text-gray-700 py-2 border-b border-gray-100">
                Каталог
              </Link>

              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-gray-700 py-2 border-b border-gray-100">
                    Мой профиль
                  </Link>
                  <Link to="/orders" className="text-gray-700 py-2 border-b border-gray-100">
                    Мои заказы
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-left text-red-600 py-2"
                  >
                    Выход из системы
                  </button>
                </>
              ) : (
                <Link to="/login" className="py-2">
                  <Button variant="primary" fullWidth>
                    Авторизоваться
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;