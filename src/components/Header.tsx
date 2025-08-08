import React, { useState, useEffect } from 'react';
import { Menu, X, Plane, Phone, Mail } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <span>+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} />
              <span>contact@transitaire-expert.fr</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Service client 24h/7j</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg mt-0' : 'bg-transparent mt-10'
      }`}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Plane className="text-blue-600" size={32} />
              <div>
                <h1 className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                  TransitExpert
                </h1>
                <p className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-blue-200'}`}>
                  Votre partenaire logistique international
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('accueil')}
                className={`hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                {t('nav.services')}
              </button>
              <button
                onClick={() => scrollToSection('zones')}
                className={`hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                {t('nav.zones')}
              </button>
              <button
                onClick={() => scrollToSection('apropos')}
                className={`hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className={`hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                {t('nav.blog')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                {t('nav.contact')}
              </button>
              <LanguageToggle 
                currentLanguage={currentLanguage} 
                onLanguageChange={onLanguageChange} 
              />
              <button
                onClick={() => scrollToSection('devis')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('nav.quote')}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection('accueil')}
                  className="text-left text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {t('nav.home')}
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-left text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {t('nav.services')}
                </button>
                <button
                  onClick={() => scrollToSection('zones')}
                  className="text-left text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {t('nav.zones')}
                </button>
                <button
                  onClick={() => scrollToSection('apropos')}
                  className="text-left text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {t('nav.about')}
                </button>
                <button
                  onClick={() => scrollToSection('blog')}
                  className="text-left text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {t('nav.blog')}
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-left text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {t('nav.contact')}
                </button>
                <button
                  onClick={() => scrollToSection('devis')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  {t('nav.quote')}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;