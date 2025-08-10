import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: 'Pierre Moreau',
      company: 'TechImport SAS',
      role: 'Directeur Logistique',
      rating: 5,
      text: 'TransitExpert a transformé notre supply chain. Leurs solutions sur mesure et leur réactivité nous ont permis de réduire nos délais de 30%. Une équipe exceptionnelle !',
      photo: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Sarah Chen',
      company: 'Global Fashion',
      role: 'Responsable Import',
      rating: 5,
      text: 'Excellente expertise douanière et suivi impeccable. Nous travaillons avec TransitExpert depuis 5 ans, jamais déçus. Ils comprennent vraiment les enjeux du textile.',
      photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Marc Dubois',
      company: 'Industrie Mécanique Française',
      role: 'PDG',
      rating: 5,
      text: 'Pour nos machines lourdes et projets complexes, TransitExpert trouve toujours la solution. Leur expertise technique et réseau mondial sont incomparables.',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Elena Rodriguez',
      company: 'Bio Aliments Europe',
      role: 'Directrice Supply Chain',
      rating: 5,
      text: 'Spécialistes du périssable, ils maîtrisent parfaitement la chaîne du froid. Nos produits bio arrivent toujours en parfait état. Service client remarquable.',
      photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Ahmed Benali',
      company: 'Maghreb Trading',
      role: 'Directeur Commercial',
      rating: 5,
      text: 'Excellente connaissance du marché africain. Leurs solutions nous ont ouvert de nouveaux marchés. Relation de confiance construite sur plusieurs années.',
      photo: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Lisa Wang',
      company: 'Asian Electronics Import',
      role: 'Import Manager',
      rating: 5,
      text: 'Consolidation Asie parfaitement maîtrisée. Gains significatifs sur nos coûts transport. Plateforme de suivi très pratique. Je recommande vivement !',
      photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const partners = [
    { 
      name: 'Maersk', 
      logo: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop',
      description: t('testimonials.partners.title') === 'Nos partenaires transporteurs' ? 'Leader mondial du transport maritime' : 'Global maritime transport leader'
    },
    { 
      name: 'CMA CGM', 
      logo: 'https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop',
      description: t('testimonials.partners.title') === 'Nos partenaires transporteurs' ? 'Compagnie maritime française' : 'French maritime company'
    },
    { 
      name: 'Air France-KLM', 
      logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop',
      description: t('testimonials.partners.title') === 'Nos partenaires transporteurs' ? 'Transport aérien de marchandises' : 'Air cargo transport'
    },
    { 
      name: 'DHL', 
      logo: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop',
      description: t('testimonials.partners.title') === 'Nos partenaires transporteurs' ? 'Express et logistique internationale' : 'Express and international logistics'
    },
    { 
      name: 'Hapag-Lloyd', 
      logo: 'https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop',
      description: t('testimonials.partners.title') === 'Nos partenaires transporteurs' ? 'Transport maritime conteneurisé' : 'Containerized maritime transport'
    },
    { 
      name: 'Emirates SkyCargo', 
      logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop',
      description: t('testimonials.partners.title') === 'Nos partenaires transporteurs' ? 'Fret aérien premium' : 'Premium air freight'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Testimonials Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute top-0 left-0 text-blue-100 -mt-2 -ml-1" size={24} />
                <p className="text-gray-700 italic pl-6 leading-relaxed">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            {t('testimonials.partners.title')}
          </h3>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('testimonials.partners.description')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-16 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <h4 className="text-gray-900 font-semibold text-sm text-center mb-1">{partner.name}</h4>
                <p className="text-gray-500 text-xs text-center leading-tight">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-8">{t('testimonials.why.title')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-200">{t('testimonials.satisfaction')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2h</div>
              <div className="text-blue-200">{t('testimonials.response')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99.5%</div>
              <div className="text-blue-200">{t('testimonials.delivery')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">{t('testimonials.support')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;