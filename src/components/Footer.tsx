import React from 'react';
import { Plane, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Plane className="text-blue-400" size={32} />
              <div>
                <h3 className="text-xl font-bold">TransitExpert</h3>
                <p className="text-gray-400 text-sm">{t('footer.tagline')}</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {t('services.air.title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {t('services.sea.title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {t('services.road.title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {t('services.customs.title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {t('services.warehouse.title')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {t('services.custom.title')}
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.links')}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('accueil')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('apropos')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('zones')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {t('nav.zones')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('devis')}
                  className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                >
                  {t('nav.quote')}
                </button>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t('nav.blog')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                  {t('footer.careers')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">{t('footer.contact')}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-400 flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="text-gray-300">123 Avenue des Champs-Élysées</p>
                  <p className="text-gray-300">75008 Paris, France</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="text-blue-400 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300">+33 1 23 45 67 89</p>
                  <p className="text-gray-400 text-sm">{t('footer.service.hours')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-400 flex-shrink-0" size={18} />
                <div>
                  <p className="text-gray-300">contact@transitaire-expert.fr</p>
                  <p className="text-gray-400 text-sm">{t('footer.response')}</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            {/* <div className="mt-6">
              <h5 className="text-sm font-semibold text-gray-300 mb-3">Certifications</h5>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">IATA</span>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">OEA</span>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">ISO 9001</span>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">ISO 14001</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>&copy; 2024 TransitExpert. {t('footer.rights')}.</p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                {t('footer.legal')}
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                RGPD
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                {t('footer.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;