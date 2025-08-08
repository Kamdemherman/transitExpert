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
    
    // Contact
    'contact.title': 'Contactez nos experts',
    'contact.description': 'Une question, un projet ? Notre équipe d\'experts est à votre disposition pour vous accompagner dans tous vos besoins logistiques.',
    'contact.form.name': 'Nom complet',
    'contact.form.email': 'Email professionnel',
    'contact.form.company': 'Entreprise',
    'contact.form.phone': 'Téléphone',
    'contact.form.subject': 'Sujet de votre demande',
    'contact.form.message': 'Votre message',
    'contact.form.send': 'Envoyer le message',
    
    // Footer
    'footer.services': 'Nos Services',
    'footer.links': 'Liens rapides',
    'footer.contact': 'Contact',
    'footer.certifications': 'Certifications',
    'footer.rights': 'Tous droits réservés',
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
    
    // Contact
    'contact.title': 'Contact Our Experts',
    'contact.description': 'A question, a project? Our team of experts is at your disposal to support you in all your logistics needs.',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Professional Email',
    'contact.form.company': 'Company',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    
    // Footer
    'footer.services': 'Our Services',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.certifications': 'Certifications',
    'footer.rights': 'All rights reserved',
  }
};

export const useTranslation = (language?: string) => {
  const currentLanguage = language || 'fr';

  const changeLanguage = useCallback((lang: string) => {
    if (translations[lang]) {
      localStorage.setItem('language', lang);
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