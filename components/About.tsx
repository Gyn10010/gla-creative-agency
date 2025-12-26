
import React from 'react';
import { Language } from '../types';

interface AboutProps {
  lang: Language;
}

const About: React.FC<AboutProps> = ({ lang }) => {
  const stats = [
    { value: '50+', label: lang === 'PT' ? 'Projetos Entregues' : 'Projects Delivered' },
    { value: '3', label: lang === 'PT' ? 'Especialistas' : 'Specialists' },
    { value: '100%', label: lang === 'PT' ? 'Dedicação' : 'Dedication' },
  ];

  return (
    <section id="sobre" className="py-24 relative bg-gradient-to-b from-background-dark via-surface-dark/30 to-background-dark">
      {/* Overlay de fusão superior */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background-dark to-transparent z-10 pointer-events-none"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-orange-600 rounded-xl opacity-20 group-hover:opacity-40 blur-lg transition duration-500"></div>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-surface-border/30">
              <div 
                className="w-full h-full bg-cover bg-center transform transition duration-700 hover:scale-105" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeSFoOUsj7rdvBn6gRNJ1LATCXM8rewIV4A_NRh8nYOJyuPU3ATSTQ_7YhDzHCy3GHHcUk-QvxaIIbsw-4IFbX-rL-o7CdEDat3ZDHYlxlmX1ZTtrY3Sdn9QqevQ9l7ui2QFRC7dHSPpOSgbCzStBQbASxB-s2xDSlwN9Wdol7r8ZgO1r5z_K0Xr74zTpamUWOJZSveBXDTD2IWePhGq_iFiQWiU8hHhAtouckSakDHUsZGKolxqEZuOmD-RoWkJ5XUR-roSLURJQ")' }}
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div>
              <h2 className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3">
                {lang === 'PT' ? 'Quem Somos' : 'Who We Are'}
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {lang === 'PT' 
                  ? <>Um trio multidisciplinar unindo <br className="hidden md:block"/>design, tecnologia e visão.</>
                  : <>A multidisciplinary trio uniting <br className="hidden md:block"/>design, technology, and vision.</>}
              </h3>
            </div>
            
            <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed">
              <p>
                {lang === 'PT' 
                  ? 'Nascemos da necessidade de integrar o mundo criativo com a execução técnica precisa. No GLA, não entregamos apenas "arquivos"; entregamos soluções que posicionam marcas à frente do mercado.'
                  : 'We were born from the need to integrate the creative world with precise technical execution. At GLA, we don’t just deliver "files"; we deliver solutions that position brands ahead of the market.'}
              </p>
            </div>

            <div className="flex gap-12 border-t border-surface-border pt-8 mt-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
