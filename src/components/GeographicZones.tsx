import React, { useState } from 'react';
import { Globe, MapPin, Plane, Ship, Truck } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const GeographicZones: React.FC = () => {
  const { t } = useTranslation();
  const [selectedZone, setSelectedZone] = useState('europe');

  const zones = {
    europe: {
      title: t('zones.europe.title'),
      description: t('zones.europe.description'),
      countries: ['France', 'Allemagne', 'Italie', 'Espagne', 'Royaume-Uni', 'Pays-Bas', 'Belgique', 'Pologne'],
      transports: [
        t('zones.europe.title') === 'Europe' ? 'Route' : 'Road',
        t('zones.europe.title') === 'Europe' ? 'Rail' : 'Rail',
        t('zones.europe.title') === 'Europe' ? 'Maritime' : 'Maritime',
        t('zones.europe.title') === 'Europe' ? 'Aérien' : 'Air'
      ],
      features: [
        t('zones.europe.title') === 'Europe' ? 'Livraisons express 24-48h' : 'Express delivery 24-48h',
        t('zones.europe.title') === 'Europe' ? 'Groupage optimisé' : 'Optimized groupage',
        t('zones.europe.title') === 'Europe' ? 'Dédouanement UE simplifié' : 'Simplified EU customs'
      ]
    },
    asia: {
      title: t('zones.asia.title'),
      description: t('zones.asia.description'),
      countries: ['Chine', 'Japon', 'Corée du Sud', 'Singapour', 'Hong Kong', 'Thaïlande', 'Vietnam', 'Inde'],
      transports: [
        t('zones.asia.title') === 'Asie' ? 'Maritime FCL/LCL' : 'Maritime FCL/LCL',
        t('zones.asia.title') === 'Asie' ? 'Aérien' : 'Air',
        t('zones.asia.title') === 'Asie' ? 'Rail Chine-Europe' : 'China-Europe Rail'
      ],
      features: [
        t('zones.asia.title') === 'Asie' ? 'Consolidation Shenzhen/Shanghai' : 'Shenzhen/Shanghai consolidation',
        t('zones.asia.title') === 'Asie' ? 'Express aérien Asie' : 'Asia air express',
        t('zones.asia.title') === 'Asie' ? 'Rail route de la soie' : 'Silk road rail'
      ]
    },
    americas: {
      title: t('zones.americas.title'),
      description: t('zones.americas.description'),
      countries: ['États-Unis', 'Canada', 'Brésil', 'Argentine', 'Mexique', 'Chili', 'Colombie', 'Pérou'],
      transports: [
        t('zones.americas.title') === 'Amériques' ? 'Maritime' : 'Maritime',
        t('zones.americas.title') === 'Amériques' ? 'Aérien' : 'Air',
        t('zones.americas.title') === 'Amériques' ? 'Route Amérique du Nord' : 'North America road'
      ],
      features: [
        t('zones.americas.title') === 'Amériques' ? 'Hubs Miami/Los Angeles' : 'Miami/Los Angeles hubs',
        t('zones.americas.title') === 'Amériques' ? 'Dédouanement USA/Canada' : 'USA/Canada customs',
        t('zones.americas.title') === 'Amériques' ? 'Solutions Amérique latine' : 'Latin America solutions'
      ]
    },
    africa: {
      title: t('zones.africa.title'),
      description: t('zones.africa.description'),
      countries: ['Congo', 'Gabon', 'Cameroun', 'Égypte', 'Afrique du Sud', 'EAU', 'Arabie Saoudite', 'Qatar'],
      transports: [
        t('zones.africa.title') === 'Afrique & Moyen-Orient' ? 'Maritime' : 'Maritime',
        t('zones.africa.title') === 'Afrique & Moyen-Orient' ? 'Aérien' : 'Air',
        t('zones.africa.title') === 'Afrique & Moyen-Orient' ? 'Route Afrique du Nord' : 'North Africa road'
      ],
      features: [
        t('zones.africa.title') === 'Afrique & Moyen-Orient' ? 'Hub Dubaï' : 'Dubai hub',
        t('zones.africa.title') === 'Afrique & Moyen-Orient' ? 'Expertise Maghreb' : 'Maghreb expertise',
        t('zones.africa.title') === 'Afrique & Moyen-Orient' ? 'Solutions projet Afrique' : 'Africa project solutions'
      ]
    }
  };

  const currentZone = zones[selectedZone as keyof typeof zones];

  return (
    <section id="zones" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Globe className="mx-auto mb-4 text-blue-600" size={48} />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('zones.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('zones.description')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Zone Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(zones).map(([key, zone]) => (
              <button
                key={key}
                onClick={() => setSelectedZone(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedZone === key
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {zone.title}
              </button>
            ))}
          </div>

          {/* Zone Details */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Zone Info */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {currentZone.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {currentZone.description}
                </p>

                {/* Transport Modes */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('zones.transport.title')}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {currentZone.transports.map((transport, index) => {
                      const getIcon = (transport: string) => {
                        if (transport.includes('Aérien') || transport.includes('Express aérien')) return Plane;
                        if (transport.includes('Maritime') || transport.includes('FCL')) return Ship;
                        if (transport.includes('Route') || transport.includes('Rail')) return Truck;
                        return MapPin;
                      };
                      const Icon = getIcon(transport);
                      
                      return (
                        <div
                          key={index}
                          className="bg-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-sm"
                        >
                          <Icon className="text-blue-600" size={16} />
                          <span className="text-sm font-medium">{transport}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('zones.services.title')}
                  </h4>
                  <ul className="space-y-2">
                    {currentZone.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Countries Grid */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('zones.destinations.title')}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {currentZone.countries.map((country, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="text-blue-600 flex-shrink-0" size={20} />
                        <span className="font-medium text-gray-900">{country}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    {t('zones.not.listed')}
                  </h5>
                  <p className="text-gray-600 mb-4 text-sm">
                    {t('zones.not.listed') === 'Destination non listée ?' ? 'Notre réseau couvre plus de 150 pays. Contactez-nous pour toute destination spécifique.' : 'Our network covers over 150 countries. Contact us for any specific destination.'}
                  </p>
                  <button
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    {t('zones.consult')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Support client</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Expéditions/mois</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction client</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeographicZones;