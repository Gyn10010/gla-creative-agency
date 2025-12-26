

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIConsultant from './components/AIConsultant';
import BackgroundAnimation from './components/BackgroundAnimation';


const App: React.FC = () => {
  const [lang, setLang] = useState<'PT' | 'EN'>('PT');

  return (
    <div className="min-h-screen bg-background-dark flex flex-col relative overflow-x-hidden">
      {/* BackgroundAnimation - bolinhas animadas */}
      <BackgroundAnimation />

      <div className="relative z-10 w-full">
        <Navbar lang={lang} setLang={setLang} />
        <main className="w-full">
          <Hero lang={lang} />
          <About lang={lang} />
          <Services lang={lang} />
          <Portfolio lang={lang} />
          <Contact lang={lang} />
        </main>
        <Footer lang={lang} />
      </div>

      <AIConsultant lang={lang} />
    </div>
  );
};

export default App;
