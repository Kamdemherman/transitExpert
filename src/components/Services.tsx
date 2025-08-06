import React from 'react';
import { Plane, Ship, Truck, FileCheck, Warehouse, MapPin, AlertTriangle, Settings } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Plane,
      title: 'Transport aérien',
      description: 'Solutions de fret aérien rapides et sécurisées pour vos expéditions urgentes.',
      features: ['Express et standard', 'Cargo charter', 'Marchandises périssables']
    },
    {
      icon: Ship,
      title: 'Transport maritime',
      description: 'FCL, LCL et solutions roll-on/roll-off pour tous types de marchandises.',
      features: ['Conteneurs complets/groupage', 'Roro et breakbulk', 'Projets industriels']
    },
    {
      icon: Truck,
      title: 'Transport terrestre',
      description: 'Livraisons terrestres fiables en Europe et corridors internationaux.',
      features: ['Route Europe', 'Multimodal', 'Livraisons porte à porte']
    },
    {
      icon: FileCheck,
      title: 'Dédouanement',
      description: 'Expertise douanière complète pour simplifier vos formalités.',
      features: ['Import/Export', 'Régimes douaniers', 'Conseils réglementaires']
    },
    {
      icon: Warehouse,
      title: 'Stockage & Distribution',
      description: 'Entrepôts sécurisés et solutions de distribution sur mesure.',
      features: ['Stockage longue durée', 'Cross-docking', 'Préparation commandes']
    },
    {
      icon: MapPin,
      title: 'Suivi temps réel',
      description: 'Traçabilité complète de vos marchandises avec notre plateforme.',
      features: ['Géolocalisation', 'Alertes SMS/Email', 'Reporting détaillé']
    },
    {
      icon: AlertTriangle,
      title: 'Marchandises dangereuses',
      description: 'Transport sécurisé de matières dangereuses selon réglementations.',
      features: ['ADR/IMDG/IATA DGR', 'Formation équipes', 'Documentation complète']
    },
    {
      icon: Settings,
      title: 'Solutions sur mesure',
      description: 'Projets industriels et solutions logistiques personnalisées.',
      features: ['Projets clés en main', 'Ingénierie logistique', 'Consultation expert']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Nos services de transitariat
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solutions complètes de transport international, dédouanement et logistique 
            adaptées à tous vos besoins professionnels.
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
                  En savoir plus
                </button>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Besoin d'une solution sur mesure ?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Nos experts analysent vos besoins et vous proposent la solution logistique 
            la plus adaptée à votre activité.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Contactez nos experts
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;