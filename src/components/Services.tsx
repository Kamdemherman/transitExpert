import React from 'react';
import { Plane, Ship, Truck, FileCheck, Warehouse, MapPin, AlertTriangle, Settings } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Plane,
      title: t('services.air.title'),
      description: t('services.air.description'),
      features: [
        t('services.air.title') === 'Transport aérien' ? 'Express et standard' : 'Express and standard',
        t('services.air.title') === 'Transport aérien' ? 'Cargo charter' : 'Cargo charter',
        t('services.air.title') === 'Transport aérien' ? 'Marchandises périssables' : 'Perishable goods'
      ]
    },
    {
      icon: Ship,
      title: t('services.sea.title'),
      description: t('services.sea.description'),
      features: [
        t('services.sea.title') === 'Transport maritime' ? 'Conteneurs complets/groupage' : 'Full containers/groupage',
        t('services.sea.title') === 'Transport maritime' ? 'Roro et breakbulk' : 'Roro and breakbulk',
        t('services.sea.title') === 'Transport maritime' ? 'Projets industriels' : 'Industrial projects'
      ]
    },
    {
      icon: Truck,
      title: t('services.road.title'),
      description: t('services.road.description'),
      features: [
        t('services.road.title') === 'Transport terrestre' ? 'Route Europe' : 'European routes',
        t('services.road.title') === 'Transport terrestre' ? 'Multimodal' : 'Multimodal',
        t('services.road.title') === 'Transport terrestre' ? 'Livraisons porte à porte' : 'Door-to-door delivery'
      ]
    },
    {
      icon: FileCheck,
      title: t('services.customs.title'),
      description: t('services.customs.description'),
      features: [
        'Import/Export',
        t('services.customs.title') === 'Dédouanement' ? 'Régimes douaniers' : 'Customs regimes',
        t('services.customs.title') === 'Dédouanement' ? 'Conseils réglementaires' : 'Regulatory advice'
      ]
    },
    {
      icon: Warehouse,
      title: t('services.warehouse.title'),
      description: t('services.warehouse.description'),
      features: [
        t('services.warehouse.title') === 'Stockage & Distribution' ? 'Stockage longue durée' : 'Long-term storage',
        'Cross-docking',
        t('services.warehouse.title') === 'Stockage & Distribution' ? 'Préparation commandes' : 'Order preparation'
      ]
    },
    {
      icon: MapPin,
      title: t('services.tracking.title'),
      description: t('services.tracking.description'),
      features: [
        t('services.tracking.title') === 'Suivi temps réel' ? 'Géolocalisation' : 'Geolocation',
        t('services.tracking.title') === 'Suivi temps réel' ? 'Alertes SMS/Email' : 'SMS/Email alerts',
        t('services.tracking.title') === 'Suivi temps réel' ? 'Reporting détaillé' : 'Detailed reporting'
      ]
    },
    {
      icon: AlertTriangle,
      title: t('services.dangerous.title'),
      description: t('services.dangerous.description'),
      features: [
        'ADR/IMDG/IATA DGR',
        t('services.dangerous.title') === 'Marchandises dangereuses' ? 'Formation équipes' : 'Team training',
        t('services.dangerous.title') === 'Marchandises dangereuses' ? 'Documentation complète' : 'Complete documentation'
      ]
    },
    {
      icon: Settings,
      title: t('services.custom.title'),
      description: t('services.custom.description'),
      features: [
        t('services.custom.title') === 'Solutions sur mesure' ? 'Projets clés en main' : 'Turnkey projects',
        t('services.custom.title') === 'Solutions sur mesure' ? 'Ingénierie logistique' : 'Logistics engineering',
        t('services.custom.title') === 'Solutions sur mesure' ? 'Consultation expert' : 'Expert consultation'
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <IconComponent className="text-blue-600" size={32} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featIndex) => (
                    <li key={featIndex} className="text-sm text-gray-500 flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {t('services.custom.title') === 'Solutions sur mesure' ? 'En savoir plus' : 'Learn more'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {t('services.cta.title')}
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('services.cta.description')}
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            {t('services.cta.button')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;