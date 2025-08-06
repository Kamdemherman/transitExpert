import React, { useState } from 'react';
import { Globe, MapPin, Plane, Ship, Truck } from 'lucide-react';

const GeographicZones: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState('europe');

  const zones = {
    europe: {
      title: 'Europe',
      description: 'Réseau dense couvrant tous les pays européens avec des liaisons quotidiennes.',
      countries: ['France', 'Allemagne', 'Italie', 'Espagne', 'Royaume-Uni', 'Pays-Bas', 'Belgique', 'Pologne'],
      transports: ['Route', 'Rail', 'Maritime', 'Aérien'],
      features: ['Livraisons express 24-48h', 'Groupage optimisé', 'Dédouanement UE simplifié']
    },
    asia: {
      title: 'Asie',
      description: 'Couverture complète de l\'Asie avec des hubs stratégiques dans les principales métropoles.',
      countries: ['Chine', 'Japon', 'Corée du Sud', 'Singapour', 'Hong Kong', 'Thaïlande', 'Vietnam', 'Inde'],
      transports: ['Maritime FCL/LCL', 'Aérien', 'Rail Chine-Europe'],
      features: ['Consolidation Shenzhen/Shanghai', 'Express aérien Asie', 'Rail route de la soie']
    },
    americas: {
      title: 'Amériques',
      description: 'Solutions complètes pour l\'Amérique du Nord et du Sud avec nos partenaires locaux.',
      countries: ['États-Unis', 'Canada', 'Brésil', 'Argentine', 'Mexique', 'Chili', 'Colombie', 'Pérou'],
      transports: ['Maritime', 'Aérien', 'Route Amérique du Nord'],
      features: ['Hubs Miami/Los Angeles', 'Dédouanement USA/Canada', 'Solutions Amérique latine']
    },
    africa: {
      title: 'Afrique & Moyen-Orient',
      description: 'Expertise régionale pour les marchés africains et du Moyen-Orient en croissance.',
      countries: ['Maroc', 'Tunisie', 'Algérie', 'Égypte', 'Afrique du Sud', 'EAU', 'Arabie Saoudite', 'Qatar'],
      transports: ['Maritime', 'Aérien', 'Route Afrique du Nord'],
      features: ['Hub Dubaï', 'Expertise Maghreb', 'Solutions projet Afrique']
    }
  };

  const currentZone = zones[selectedZone as keyof typeof zones];

  return (
    <section id="zones" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Globe className="mx-auto mb-4 text-blue-600" size={48} />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Nos zones géographiques
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un réseau mondial de plus de 150 destinations pour accompagner 
            votre développement international.
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
                    Modes de transport disponibles
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
                    Services spécialisés
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
                  Principales destinations
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
                    Destination non listée ?
                  </h5>
                  <p className="text-gray-600 mb-4 text-sm">
                    Notre réseau couvre plus de 150 pays. Contactez-nous pour toute destination spécifique.
                  </p>
                  <button
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Nous consulter
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