import React from 'react';
import { useTranslation } from './hooks/useTranslation';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import QuoteCalculator from './components/QuoteCalculator';
import GeographicZones from './components/GeographicZones';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { currentLanguage, changeLanguage } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Header currentLanguage={currentLanguage} onLanguageChange={changeLanguage} />
      <Hero />
      <Services />
      <QuoteCalculator />
      <GeographicZones />
      <About />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;