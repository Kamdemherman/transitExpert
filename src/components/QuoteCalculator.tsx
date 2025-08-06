import React, { useState } from 'react';
import { Calculator, Package, MapPin, Clock, Weight } from 'lucide-react';

const QuoteCalculator: React.FC = () => {
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
    // Ici on simule l'envoi du devis
    alert('Demande de devis envoyée ! Nous vous répondrons dans les 2h ouvrées.');
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
  };

  return (
    <section id="devis" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Calculator className="mx-auto mb-4 text-blue-600" size={48} />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Calculateur de devis en ligne
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Obtenez un devis personnalisé en quelques clics. Notre équipe vous répond 
            sous 2h ouvrées avec une proposition détaillée.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Route Section */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="mr-2 text-blue-600" size={24} />
                  Itinéraire
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Origine *
                    </label>
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      placeholder="Ville/Port/Aéroport de départ"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination *
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="Ville/Port/Aéroport d'arrivée"
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
                  Détails de la marchandise
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de marchandise *
                    </label>
                    <select
                      name="cargoType"
                      value={formData.cargoType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option value="general">Marchandise générale</option>
                      <option value="perishable">Périssable</option>
                      <option value="dangerous">Matière dangereuse</option>
                      <option value="fragile">Fragile</option>
                      <option value="oversized">Hors gabarit</option>
                      <option value="vehicles">Véhicules</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poids (kg) *
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
                      Volume (m³)
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
                    Description de la marchandise
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Décrivez votre marchandise, emballage, contraintes spécifiques..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Timing Section */}
              <div className="border-b pb-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="mr-2 text-blue-600" size={24} />
                  Délai souhaité
                </h3>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Sélectionner le délai</option>
                  <option value="express">Express (24-48h)</option>
                  <option value="urgent">Urgent (2-5 jours)</option>
                  <option value="standard">Standard (1-2 semaines)</option>
                  <option value="economy">Économique (3-4 semaines)</option>
                </select>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Informations de contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Nom de votre entreprise"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contact@votre-entreprise.com"
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
                  <span>Obtenir mon devis gratuit</span>
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Réponse sous 2h ouvrées • Devis gratuit et sans engagement
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