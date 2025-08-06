import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import QuoteCalculator from './components/QuoteCalculator';
import GeographicZones from './components/GeographicZones';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <QuoteCalculator />
      <GeographicZones />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;