
import React, { useState } from 'react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: lang === 'PT' ? 'Home' : 'Home', href: '#home' },
    { name: lang === 'PT' ? 'Sobre' : 'About', href: '#sobre' },
    { name: lang === 'PT' ? 'Serviços' : 'Services', href: '#servicos' },
    { name: lang === 'PT' ? 'Portfólio' : 'Portfolio', href: '#portfolio' },
    { name: lang === 'PT' ? 'Contato' : 'Contact', href: '#contato' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background-dark/80 border-b border-surface-border">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="size-8 text-primary group-hover:rotate-45 transition-transform duration-500">
            <span className="material-symbols-outlined text-4xl">pentagon</span>
          </div>
          <h2 className="text-white text-2xl font-black tracking-tighter">GLA</h2>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="text-sm font-medium text-white hover:text-primary transition-colors uppercase tracking-widest"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2 border-r border-white/10 pr-6 h-6">
            <button 
              onClick={() => setLang('PT')}
              className={`${lang === 'PT' ? 'text-primary font-bold' : 'text-gray-500'} text-sm tracking-wide transition-colors`}
            >
              PT
            </button>
            <span className="text-white/20 font-light">|</span>
            <button 
              onClick={() => setLang('EN')}
              className={`${lang === 'EN' ? 'text-primary font-bold' : 'text-gray-500'} text-sm tracking-wide transition-colors`}
            >
              EN
            </button>
          </div>
          
          <a 
            href="#contato"
            className="hidden sm:flex min-w-[120px] items-center justify-center rounded-lg h-10 px-4 bg-primary hover:bg-primary/90 transition-all text-background-dark text-sm font-bold tracking-wide"
          >
            {lang === 'PT' ? 'Fale Conosco' : 'Contact Us'}
          </a>

          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background-dark border-b border-surface-border animate-fade-in-up">
          <div className="flex flex-col p-6 gap-4">
            {menuItems.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="text-lg font-bold text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contato"
              className="mt-2 flex items-center justify-center rounded-lg h-12 px-4 bg-primary text-background-dark font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {lang === 'PT' ? 'Fale Conosco' : 'Contact Us'}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
