import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send to backend API
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Message envoyé ! Nous vous répondrons dans les 2h ouvrées.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: ''
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

  const offices = [
    {
      city: 'Paris (Siège)',
      address: '123 Avenue des Champs-Élysées',
      postal: '75008 Paris',
      phone: '+33 1 23 45 67 89',
      email: 'paris@transitaire-expert.fr',
      hours: 'Lun-Ven: 8h-19h, Sam: 9h-17h',
      speciality: 'Hub aérien CDG/Orly'
    },
    {
      city: 'Lyon',
      address: '45 Rue de la République',
      postal: '69002 Lyon',
      phone: '+33 4 78 90 12 34',
      email: 'lyon@transitaire-expert.fr',
      hours: 'Lun-Ven: 8h-18h',
      speciality: 'Route Europe & Suisse'
    },
    {
      city: 'Marseille',
      address: '67 La Canebière',
      postal: '13001 Marseille',
      phone: '+33 4 91 23 45 67',
      email: 'marseille@transitaire-expert.fr',
      hours: 'Lun-Ven: 8h-18h',
      speciality: 'Fret maritime Méditerranée'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Contactez nos experts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une question, un projet ? Notre équipe d'experts est à votre disposition 
            pour vous accompagner dans tous vos besoins logistiques.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Send className="mr-3 text-blue-600" size={28} />
                  Envoyez-nous un message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet de votre demande *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Sélectionner un sujet</option>
                      <option value="devis">Demande de devis</option>
                      <option value="info">Informations générales</option>
                      <option value="support">Support client</option>
                      <option value="partenariat">Partenariat</option>
                      <option value="carriere">Carrière</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Votre message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Décrivez votre projet, vos besoins logistiques..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Send size={20} />
                    <span>Envoyer le message</span>
                  </button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    Réponse garantie sous 2h ouvrées
                  </p>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="bg-blue-600 text-white rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6">Contact rapide</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium">+33 1 23 45 67 89</p>
                      <p className="text-blue-200 text-sm">24h/7j urgences</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium">contact@transitaire-expert.fr</p>
                      <p className="text-blue-200 text-sm">Réponse sous 2h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium">Chat en direct</p>
                      <p className="text-blue-200 text-sm">Lun-Ven 8h-19h</p>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Démarrer un chat
                </button>
              </div>

              {/* Office Hours */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Clock className="mr-2 text-blue-600" size={24} />
                  Horaires d'ouverture
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-medium">8h00 - 19h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="font-medium">9h00 - 17h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="text-gray-500">Fermé</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-blue-600 font-medium">
                      Service d'urgence 24h/7j disponible
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Office Locations */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Nos agences en France
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{office.city}</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="flex-shrink-0 mt-1 text-blue-600" size={18} />
                      <div>
                        <p className="text-gray-700">{office.address}</p>
                        <p className="text-gray-700">{office.postal}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="flex-shrink-0 text-blue-600" size={18} />
                      <p className="text-gray-700">{office.phone}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="flex-shrink-0 text-blue-600" size={18} />
                      <p className="text-gray-700">{office.email}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Clock className="flex-shrink-0 text-blue-600" size={18} />
                      <p className="text-gray-700">{office.hours}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-blue-600 font-medium">{office.speciality}</p>
                  </div>
                  
                  <button className="w-full mt-4 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                    Voir sur la carte
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;