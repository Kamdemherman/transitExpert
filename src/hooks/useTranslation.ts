import { useState, useEffect, useCallback } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.services': 'Services',
    'nav.zones': 'Zones',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.quote': 'Demander un devis',
    'nav.blog': 'Blog',
    
    // Hero
    'hero.title': 'Votre partenaire de confiance pour le',
    'hero.subtitle': 'transport international',
    'hero.description': 'Solutions complètes de transitariat, dédouanement et logistique internationale. Plus de 15 ans d\'expérience au service de votre supply chain.',
    'hero.cta.quote': 'Demander un devis gratuit',
    'hero.cta.services': 'Découvrir nos services',
    
    // Services
    'services.title': 'Nos services de transitariat',
    'services.description': 'Solutions complètes de transport international, dédouanement et logistique adaptées à tous vos besoins professionnels.',
    'services.air.title': 'Transport aérien',
    'services.air.description': 'Solutions de fret aérien rapides et sécurisées pour vos expéditions urgentes.',
    'services.sea.title': 'Transport maritime',
    'services.sea.description': 'FCL, LCL et solutions roll-on/roll-off pour tous types de marchandises.',
    'services.road.title': 'Transport terrestre',
    'services.road.description': 'Livraisons terrestres fiables en Europe et corridors internationaux.',
    'services.customs.title': 'Dédouanement',
    'services.customs.description': 'Expertise douanière complète pour simplifier vos formalités.',
    'services.warehouse.title': 'Stockage & Distribution',
    'services.warehouse.description': 'Entrepôts sécurisés et solutions de distribution sur mesure.',
    'services.tracking.title': 'Suivi temps réel',
    'services.tracking.description': 'Traçabilité complète de vos marchandises avec notre plateforme.',
    'services.dangerous.title': 'Marchandises dangereuses',
    'services.dangerous.description': 'Transport sécurisé de matières dangereuses selon réglementations.',
    'services.custom.title': 'Solutions sur mesure',
    'services.custom.description': 'Projets industriels et solutions logistiques personnalisées.',
    'services.cta.title': 'Besoin d\'une solution sur mesure ?',
    'services.cta.description': 'Nos experts analysent vos besoins et vous proposent la solution logistique la plus adaptée à votre activité.',
    'services.cta.button': 'Contactez nos experts',
    
    // Quote Calculator
    'quote.title': 'Calculateur de devis en ligne',
    'quote.description': 'Obtenez un devis personnalisé en quelques clics. Notre équipe vous répond sous 2h ouvrées avec une proposition détaillée.',
    'quote.route.title': 'Itinéraire',
    'quote.origin': 'Origine',
    'quote.destination': 'Destination',
    'quote.cargo.title': 'Détails de la marchandise',
    'quote.cargo.type': 'Type de marchandise',
    'quote.weight': 'Poids (kg)',
    'quote.volume': 'Volume (m³)',
    'quote.description': 'Description de la marchandise',
    'quote.timing.title': 'Délai souhaité',
    'quote.contact.title': 'Informations de contact',
    'quote.company': 'Entreprise',
    'quote.email': 'Email professionnel',
    'quote.submit': 'Obtenir mon devis gratuit',
    'quote.response': 'Réponse sous 2h ouvrées • Devis gratuit et sans engagement',
    
    // Geographic Zones
    'zones.title': 'Nos zones géographiques',
    'zones.description': 'Un réseau mondial de plus de 150 destinations pour accompagner votre développement international.',
    'zones.europe.title': 'Europe',
    'zones.europe.description': 'Réseau dense couvrant tous les pays européens avec des liaisons quotidiennes.',
    'zones.asia.title': 'Asie',
    'zones.asia.description': 'Couverture complète de l\'Asie avec des hubs stratégiques dans les principales métropoles.',
    'zones.americas.title': 'Amériques',
    'zones.americas.description': 'Solutions complètes pour l\'Amérique du Nord et du Sud avec nos partenaires locaux.',
    'zones.africa.title': 'Afrique & Moyen-Orient',
    'zones.africa.description': 'Expertise régionale pour les marchés africains et du Moyen-Orient en croissance.',
    'zones.transport.title': 'Modes de transport disponibles',
    'zones.services.title': 'Services spécialisés',
    'zones.destinations.title': 'Principales destinations',
    'zones.not.listed': 'Destination non listée ?',
    'zones.consult': 'Nous consulter',
    
    // About
    'about.title': 'À propos de TransitExpert',
    'about.description': 'Plus de 15 ans d\'expertise au service de votre supply chain internationale. Une équipe passionnée, des certifications reconnues et un engagement qualité constant.',
    'about.years': 'Années d\'expérience',
    'about.experts': 'Collaborateurs experts',
    'about.agencies': 'Agences en France',
    'about.clients': 'Clients satisfaits',
    'about.team.title': 'Notre équipe dirigeante',
    'about.team.description': 'Des professionnels expérimentés qui mettent leur expertise au service de votre réussite.',
    'about.history.title': 'Notre histoire',
    'about.history.description': '15 années de croissance continue et d\'innovation dans le secteur du transitaire international.',
    'about.mission.title': 'Notre mission',
    'about.mission.description': 'Accompagner nos clients dans leur développement international en leur offrant des solutions logistiques sur mesure, fiables et innovantes. Notre engagement : simplifier vos échanges internationaux pour vous permettre de vous concentrer sur votre cœur de métier.',
    'about.mission.cta': 'Rejoignez nos clients satisfaits',
    
    // Testimonials
    'testimonials.title': 'Témoignages clients',
    'testimonials.description': 'Découvrez pourquoi plus de 2000 entreprises nous font confiance pour leurs expéditions internationales.',
    'testimonials.partners.title': 'Nos partenaires transporteurs',
    'testimonials.partners.description': 'Nous travaillons avec les leaders mondiaux du transport pour vous offrir les meilleures solutions logistiques.',
    'testimonials.why.title': 'Pourquoi nous choisir ?',
    'testimonials.satisfaction': 'Satisfaction client',
    'testimonials.response': 'Délai de réponse',
    'testimonials.delivery': 'Livraisons à l\'heure',
    'testimonials.support': 'Support disponible',
    
    // Blog
    'blog.title': 'Blog Logistique',
    'blog.description': 'Actualités, conseils d\'experts et guides pratiques pour optimiser votre supply chain internationale.',
    'blog.all': 'Tous les articles',
    'blog.reading': 'min de lecture',
    'blog.views': 'vues',
    'blog.read': 'Lire l\'article',
    'blog.newsletter.title': 'Restez informé des dernières actualités logistiques',
    'blog.newsletter.description': 'Recevez notre newsletter mensuelle avec les tendances du secteur, conseils d\'experts et actualités réglementaires.',
    'blog.newsletter.placeholder': 'Votre email professionnel',
    'blog.newsletter.subscribe': 'S\'abonner',
    'blog.newsletter.note': 'Pas de spam, désabonnement en un clic',
    
    // Contact
    'contact.title': 'Contactez nos experts',
    'contact.description': 'Une question, un projet ? Notre équipe d\'experts est à votre disposition pour vous accompagner dans tous vos besoins logistiques.',
    'contact.form.title': 'Envoyez-nous un message',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email professionnel',
    'contact.form.company': 'Entreprise',
    'contact.form.phone': 'Téléphone',
    'contact.form.subject': 'Sujet de votre demande',
    'contact.form.message': 'Votre message',
    'contact.form.send': 'Envoyer le message',
    'contact.form.response': 'Réponse garantie sous 2h ouvrées',
    'contact.quick.title': 'Contact rapide',
    'contact.quick.phone': '24h/7j urgences',
    'contact.quick.email': 'Réponse sous 2h',
    'contact.quick.chat': 'Chat en direct',
    'contact.quick.hours': 'Lun-Ven 8h-19h',
    'contact.quick.start': 'Démarrer un chat',
    'contact.hours.title': 'Horaires d\'ouverture',
    'contact.hours.weekdays': 'Lundi - Vendredi',
    'contact.hours.saturday': 'Samedi',
    'contact.hours.sunday': 'Dimanche',
    'contact.hours.closed': 'Fermé',
    'contact.hours.emergency': 'Service d\'urgence 24h/7j disponible',
    'contact.offices.title': 'Nos agences en France',
    'contact.offices.map': 'Voir sur la carte',
    
    // Footer
    'footer.services': 'Nos Services',
    'footer.links': 'Liens rapides',
    'footer.contact': 'Contact',
    'footer.certifications': 'Certifications',
    'footer.rights': 'Tous droits réservés',
    'footer.tagline': 'Votre partenaire logistique',
    'footer.description': 'Plus de 15 ans d\'expertise dans le transitaire international. Solutions complètes pour tous vos besoins logistiques.',
    'footer.service.hours': 'Service client 24h/7j',
    'footer.response': 'Réponse sous 2h',
    'footer.careers': 'Carrières',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Politique de confidentialité',
    'footer.terms': 'Conditions générales',
    'footer.cookies': 'Cookies',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.zones': 'Zones',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.quote': 'Get Quote',
    'nav.blog': 'Blog',
    
    // Hero
    'hero.title': 'Your trusted partner for',
    'hero.subtitle': 'international transport',
    'hero.description': 'Complete freight forwarding, customs clearance and international logistics solutions. Over 15 years of experience serving your supply chain.',
    'hero.cta.quote': 'Get Free Quote',
    'hero.cta.services': 'Discover Our Services',
    
    // Services
    'services.title': 'Our Freight Forwarding Services',
    'services.description': 'Complete international transport, customs clearance and logistics solutions adapted to all your professional needs.',
    'services.air.title': 'Air Transport',
    'services.air.description': 'Fast and secure air freight solutions for your urgent shipments.',
    'services.sea.title': 'Sea Transport',
    'services.sea.description': 'FCL, LCL and roll-on/roll-off solutions for all types of goods.',
    'services.road.title': 'Road Transport',
    'services.road.description': 'Reliable land deliveries in Europe and international corridors.',
    'services.customs.title': 'Customs Clearance',
    'services.customs.description': 'Complete customs expertise to simplify your formalities.',
    'services.warehouse.title': 'Storage & Distribution',
    'services.warehouse.description': 'Secure warehouses and customized distribution solutions.',
    'services.tracking.title': 'Real-time Tracking',
    'services.tracking.description': 'Complete traceability of your goods with our platform.',
    'services.dangerous.title': 'Dangerous Goods',
    'services.dangerous.description': 'Secure transport of dangerous materials according to regulations.',
    'services.custom.title': 'Custom Solutions',
    'services.custom.description': 'Industrial projects and personalized logistics solutions.',
    'services.cta.title': 'Need a custom solution?',
    'services.cta.description': 'Our experts analyze your needs and propose the most suitable logistics solution for your business.',
    'services.cta.button': 'Contact Our Experts',
    
    // Quote Calculator
    'quote.title': 'Online Quote Calculator',
    'quote.description': 'Get a personalized quote in just a few clicks. Our team responds within 2 business hours with a detailed proposal.',
    'quote.route.title': 'Route',
    'quote.origin': 'Origin',
    'quote.destination': 'Destination',
    'quote.cargo.title': 'Cargo Details',
    'quote.cargo.type': 'Cargo Type',
    'quote.weight': 'Weight (kg)',
    'quote.volume': 'Volume (m³)',
    'quote.description': 'Cargo Description',
    'quote.timing.title': 'Desired Timeline',
    'quote.contact.title': 'Contact Information',
    'quote.company': 'Company',
    'quote.email': 'Professional Email',
    'quote.submit': 'Get My Free Quote',
    'quote.response': 'Response within 2 business hours • Free quote with no commitment',
    
    // Geographic Zones
    'zones.title': 'Our Geographic Zones',
    'zones.description': 'A global network of over 150 destinations to support your international development.',
    'zones.europe.title': 'Europe',
    'zones.europe.description': 'Dense network covering all European countries with daily connections.',
    'zones.asia.title': 'Asia',
    'zones.asia.description': 'Complete Asia coverage with strategic hubs in major metropolitan areas.',
    'zones.americas.title': 'Americas',
    'zones.americas.description': 'Complete solutions for North and South America with our local partners.',
    'zones.africa.title': 'Africa & Middle East',
    'zones.africa.description': 'Regional expertise for growing African and Middle Eastern markets.',
    'zones.transport.title': 'Available Transport Modes',
    'zones.services.title': 'Specialized Services',
    'zones.destinations.title': 'Main Destinations',
    'zones.not.listed': 'Destination not listed?',
    'zones.consult': 'Contact Us',
    
    // About
    'about.title': 'About TransitExpert',
    'about.description': 'Over 15 years of expertise serving your international supply chain. A passionate team, recognized certifications and constant quality commitment.',
    'about.years': 'Years of Experience',
    'about.experts': 'Expert Collaborators',
    'about.agencies': 'Agencies in France',
    'about.clients': 'Satisfied Clients',
    'about.team.title': 'Our Management Team',
    'about.team.description': 'Experienced professionals who put their expertise at the service of your success.',
    'about.history.title': 'Our History',
    'about.history.description': '15 years of continuous growth and innovation in the international freight forwarding sector.',
    'about.mission.title': 'Our Mission',
    'about.mission.description': 'Support our clients in their international development by offering them tailor-made, reliable and innovative logistics solutions. Our commitment: simplify your international exchanges so you can focus on your core business.',
    'about.mission.cta': 'Join Our Satisfied Clients',
    
    // Testimonials
    'testimonials.title': 'Client Testimonials',
    'testimonials.description': 'Discover why over 2000 companies trust us for their international shipments.',
    'testimonials.partners.title': 'Our Transport Partners',
    'testimonials.partners.description': 'We work with global transport leaders to offer you the best logistics solutions.',
    'testimonials.why.title': 'Why Choose Us?',
    'testimonials.satisfaction': 'Client Satisfaction',
    'testimonials.response': 'Response Time',
    'testimonials.delivery': 'On-time Deliveries',
    'testimonials.support': 'Support Available',
    
    // Blog
    'blog.title': 'Logistics Blog',
    'blog.description': 'News, expert advice and practical guides to optimize your international supply chain.',
    'blog.all': 'All Articles',
    'blog.reading': 'min read',
    'blog.views': 'views',
    'blog.read': 'Read Article',
    'blog.newsletter.title': 'Stay informed about the latest logistics news',
    'blog.newsletter.description': 'Receive our monthly newsletter with industry trends, expert advice and regulatory updates.',
    'blog.newsletter.placeholder': 'Your professional email',
    'blog.newsletter.subscribe': 'Subscribe',
    'blog.newsletter.note': 'No spam, unsubscribe with one click',
    
    // Contact
    'contact.title': 'Contact Our Experts',
    'contact.description': 'A question, a project? Our team of experts is at your disposal to support you in all your logistics needs.',
    'contact.form.title': 'Send Us a Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Professional Email',
    'contact.form.company': 'Company',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    'contact.form.response': 'Response guaranteed within 2 business hours',
    'contact.quick.title': 'Quick Contact',
    'contact.quick.phone': '24/7 emergencies',
    'contact.quick.email': 'Response within 2h',
    'contact.quick.chat': 'Live Chat',
    'contact.quick.hours': 'Mon-Fri 8am-7pm',
    'contact.quick.start': 'Start a Chat',
    'contact.hours.title': 'Opening Hours',
    'contact.hours.weekdays': 'Monday - Friday',
    'contact.hours.saturday': 'Saturday',
    'contact.hours.sunday': 'Sunday',
    'contact.hours.closed': 'Closed',
    'contact.hours.emergency': '24/7 emergency service available',
    'contact.offices.title': 'Our Offices in France',
    'contact.offices.map': 'View on Map',
    
    // Footer
    'footer.services': 'Our Services',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.certifications': 'Certifications',
    'footer.rights': 'All rights reserved',
    'footer.tagline': 'Your logistics partner',
    'footer.description': 'Over 15 years of expertise in international freight forwarding. Complete solutions for all your logistics needs.',
    'footer.service.hours': '24/7 customer service',
    'footer.response': 'Response within 2h',
    'footer.careers': 'Careers',
    'footer.legal': 'Legal Notice',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.cookies': 'Cookies',
  }
};

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('language') || 'fr';
  });

  const changeLanguage = useCallback((lang: string) => {
    if (translations[lang]) {
      localStorage.setItem('language', lang);
      setCurrentLanguage(lang);
    }
  }, []);

  const t = useCallback((key: string): string => {
    return translations[currentLanguage]?.[key] || key;
  }, [currentLanguage]);

  return {
    currentLanguage,
    changeLanguage,
    t
  };
};