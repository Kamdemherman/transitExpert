import React, { useState } from 'react';
import { Calculator, Package, MapPin, Clock, Weight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useAnalytics, useInternalAnalytics } from '../hooks/useAnalytics';

const QuoteCalculator: React.FC = () => {
  const { t } = useTranslation();
  const { trackQuoteRequest } = useAnalytics();
  const { trackAction } = useInternalAnalytics();

  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    cargoType: '',
    weight: '',
    volume: '',
    urgency: '',
    description: '',
    email: '',
    company: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track the quote request
    trackQuoteRequest(formData.origin, formData.destination, formData.cargoType);
    trackAction('quote_request', {
      origin: formData.origin,
      destination: formData.destination,
      cargo_type: formData.cargoType,
      weight: formData.weight,
      urgency: formData.urgency
    });
    
    // Send to backend API
    fetch('/api/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(`Demande de devis envoyée ! Référence: ${data.data.reference_number}. Nous vous répondrons dans les 2h ouvrées.`);
        // Reset form
        setFormData({
          origin: '',
          destination: '',
          cargoType: '',
          weight: '',
          volume: '',
          urgency: '',
          description: '',
          email: '',
          company: ''
        });
      } else {
        alert('Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    });
  };

  return (
    <section id="devis" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Calculator className="mx-auto mb-4 text-blue-600" size={48} />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('quote.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('quote.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Route Section */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="mr-2 text-blue-600" size={24} />
                  {t('quote.route.title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('quote.origin')} *
                    </label>
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      placeholder={t('quote.origin') === 'Origine' ? 'Ville/Port/Aéroport de départ' : 'City/Port/Airport of departure'}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('quote.destination')} *
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder={t('quote.destination') === 'Destination' ? 'Ville/Port/Aéroport d\'arrivée' : 'City/Port/Airport of arrival'}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Cargo Details Section */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="mr-2 text-blue-600" size={24} />
                  {t('quote.cargo.title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('quote.cargo.type')} *
                    </label>
                    <select
                      name="cargoType"
                      value={formData.cargoType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">{t('quote.cargo.type') === 'Type de marchandise' ? 'Sélectionner' : 'Select'}</option>
                      <option value="general">{t('quote.cargo.type') === 'Type de marchandise' ? 'Marchandise générale' : 'General cargo'}</option>
                      <option value="perishable">{t('quote.cargo.type') === 'Type de marchandise' ? 'Périssable' : 'Perishable'}</option>
                      <option value="dangerous">{t('quote.cargo.type') === 'Type de marchandise' ? 'Matière dangereuse' : 'Dangerous goods'}</option>
                      <option value="fragile">{t('quote.cargo.type') === 'Type de marchandise' ? 'Fragile' : 'Fragile'}</option>
                      <option value="oversized">{t('quote.cargo.type') === 'Type de marchandise' ? 'Hors gabarit' : 'Oversized'}</option>
                      <option value="vehicles">{t('quote.cargo.type') === 'Type de marchandise' ? 'Véhicules' : 'Vehicles'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('quote.weight')} *
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="1000"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('quote.volume')}
                    </label>
                    <input
                      type="number"
                      name="volume"
                      value={formData.volume}
                      onChange={handleInputChange}
                      step="0.1"
                      placeholder="2.5"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('quote.description')}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder={t('quote.description') === 'Description de la marchandise' ? 'Décrivez votre marchandise, emballage, contraintes spécifiques...' : 'Describe your goods, packaging, specific constraints...'}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Timing Section */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="mr-2 text-blue-600" size={24} />
                  {t('quote.timing.title')}
                </h3>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">{t('quote.timing.title') === 'Délai souhaité' ? 'Sélectionner le délai' : 'Select timeline'}</option>
                  <option value="express">{t('quote.timing.title') === 'Délai souhaité' ? 'Express (24-48h)' : 'Express (24-48h)'}</option>
                  <option value="urgent">{t('quote.timing.title') === 'Délai souhaité' ? 'Urgent (2-5 jours)' : 'Urgent (2-5 days)'}</option>
                  <option value="standard">{t('quote.timing.title') === 'Délai souhaité' ? 'Standard (1-2 semaines)' : 'Standard (1-2 weeks)'}</option>
                  <option value="economy">{t('quote.timing.title') === 'Délai souhaité' ? 'Économique (3-4 semaines)' : 'Economy (3-4 weeks)'}</option>
                </select>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('quote.contact.title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('quote.company')} *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={t('quote.company') === 'Entreprise' ? 'Nom de votre entreprise' : 'Your company name'}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('quote.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('quote.email') === 'Email professionnel' ? 'contact@votre-entreprise.com' : 'contact@your-company.com'}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center mx-auto space-x-2"
                >
                  <Calculator size={20} />
                  <span>{t('quote.submit')}</span>
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  {t('quote.response')}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteCalculator;