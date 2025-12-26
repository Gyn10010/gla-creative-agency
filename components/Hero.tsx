
import React from 'react';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  return (
    <section id="home" className="relative min-h-[95vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Container de fundo - apenas para esta seção */}
      <div className="absolute inset-0 z-0">
        {/* 1. VÍDEO DE FUNDO - Camada base */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/background-video.mp4" type="video/mp4" />
          {/* Fallback para vídeo online */}
          <source src="https://v.storage.googleapis.com/veo-public/Veo-GLA-Background.mp4" type="video/mp4" />
        </video>

        {/* 2. GRADIENTE - Transição suave na parte inferior */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent z-10"></div>

        {/* 3. OVERLAY TRANSLÚCIDO - Camada preta 50% transparente para melhorar legibilidade do texto */}
        <div className="absolute inset-0 bg-black/70 z-5"></div>
      </div>

      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-primary text-xs font-bold uppercase tracking-wider">
            {lang === 'PT' ? 'Inovação & Design' : 'Innovation & Design'}
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1]">
          {lang === 'PT' ? (
            <>DESIGN <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#f5d76e]">FUTURISTA</span><br />ESTRATÉGIA REAL</>
          ) : (
            <>FUTURISTIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#f5d76e]">DESIGN</span><br />REAL STRATEGY</>
          )}
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
          {lang === 'PT'
            ? 'Somos o trio GLA. Transformamos visões complexas em experiências digitais imersivas e produtos físicos tangíveis.'
            : 'We are the GLA trio. We transform complex visions into immersive digital experiences and tangible physical products.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a
            href="#portfolio"
            className="flex items-center justify-center h-14 px-8 rounded-lg bg-primary hover:bg-[#d9a60e] text-background-dark text-base font-bold transition-transform hover:scale-105"
          >
            {lang === 'PT' ? 'Ver Projetos' : 'View Projects'}
          </a>
          <a
            href="#servicos"
            className="flex items-center justify-center h-14 px-8 rounded-lg border border-surface-border bg-surface-dark/50 backdrop-blur-sm hover:bg-surface-dark text-white text-base font-bold transition-all"
          >
            {lang === 'PT' ? 'Nossos Serviços' : 'Our Services'}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
