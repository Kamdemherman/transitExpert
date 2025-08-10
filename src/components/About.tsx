import React from 'react';
import { Award, Users, MapPin, Calendar, Shield, Target } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const About: React.FC = () => {
  const { t } = useTranslation();

  // const certifications = [
  //   { name: 'IATA', description: 'Agent agréé transport aérien' },
  //   { name: 'OEA', description: 'Opérateur Économique Agréé' },
  //   { name: 'ISO 9001', description: 'Management de la qualité' },
  //   { name: 'ISO 14001', description: 'Management environnemental' }
  // ];

  const team = [
    {
      name: 'Marie Dubois',
      position: t('about.team.title') === 'Notre équipe dirigeante' ? 'Directrice Générale' : 'General Manager',
      experience: t('about.team.title') === 'Notre équipe dirigeante' ? '20 ans d\'expérience' : '20 years experience',
      photo: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Jean Martin',
      position: t('about.team.title') === 'Notre équipe dirigeante' ? 'Directeur des Opérations' : 'Operations Director',
      experience: t('about.team.title') === 'Notre équipe dirigeante' ? '15 ans d\'expérience' : '15 years experience',
      photo: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      name: 'Sophie Laurent',
      position: t('about.team.title') === 'Notre équipe dirigeante' ? 'Responsable Douanes' : 'Customs Manager',
      experience: t('about.team.title') === 'Notre équipe dirigeante' ? '12 ans d\'expérience' : '12 years experience',
      photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ];

  const milestones = [
    { 
      year: '2008', 
      event: t('about.history.title') === 'Notre histoire' ? 'Création de TransitExpert' : 'TransitExpert founded'
    },
    { 
      year: '2012', 
      event: t('about.history.title') === 'Notre histoire' ? 'Obtention certification IATA' : 'IATA certification obtained'
    },
    { 
      year: '2015', 
      event: t('about.history.title') === 'Notre histoire' ? 'Ouverture agence Lyon' : 'Lyon office opening'
    },
    { 
      year: '2018', 
      event: t('about.history.title') === 'Notre histoire' ? 'Certification OEA' : 'AEO certification'
    },
    { 
      year: '2020', 
      event: t('about.history.title') === 'Notre histoire' ? 'Plateforme digitale de suivi' : 'Digital tracking platform'
    },
    { 
      year: '2023', 
      event: t('about.history.title') === 'Notre histoire' ? '5000+ expéditions/mois' : '5000+ shipments/month'
    }
  ];

  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
          <div className="bg-blue-50 p-6 rounded-lg">
            <Calendar className="mx-auto mb-4 text-blue-600" size={40} />
            <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
            <div className="text-gray-600">{t('about.years')}</div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <Users className="mx-auto mb-4 text-blue-600" size={40} />
            <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
            <div className="text-gray-600">{t('about.experts')}</div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <MapPin className="mx-auto mb-4 text-blue-600" size={40} />
            <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
            <div className="text-gray-600">{t('about.agencies')}</div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <Target className="mx-auto mb-4 text-blue-600" size={40} />
            <div className="text-3xl font-bold text-gray-900 mb-2">2000+</div>
            <div className="text-gray-600">{t('about.clients')}</div>
          </div>
        </div>

        {/* Certifications */}
        {/* <div className="mb-16">
          <div className="text-center mb-12">
            <Shield className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Nos certifications
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des certifications reconnues qui garantissent la qualité et la sécurité 
              de nos services de transitariat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white border-2 border-gray-100 p-6 rounded-lg text-center hover:border-blue-200 transition-colors">
                <Award className="mx-auto mb-4 text-blue-600" size={40} />
                <h4 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('about.team.title')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('about.team.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-gray-50 p-6 rounded-lg">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h4>
                <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('about.history.title')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('about.history.description')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
              
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-4 rounded-lg shadow-md border">
                      <div className="text-blue-600 font-bold text-lg mb-1">
                        {milestone.year}
                      </div>
                      <div className="text-gray-700">{milestone.event}</div>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-blue-50 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('about.mission.title')}
          </h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t('about.mission.description')}
          </p>
          
          <div className="mt-8">
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              {t('about.mission.cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;