
import React from 'react';
import { Language } from '../types';

interface ServicesProps {
  lang: Language;
}

const ServiceCard: React.FC<{ icon: string, title: string, description: string, lang: Language }> = ({ icon, title, description, lang }) => (
  <div className="group p-10 rounded-2xl bg-surface-dark/95 backdrop-blur-md border border-surface-border hover:border-primary transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(236,182,19,0.15)] h-full flex flex-col justify-between relative overflow-hidden">
    {/* Sutil brilho interno no hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    
    <div className="relative z-10">
      <div className="w-16 h-16 rounded-xl bg-[#2a261d] text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-background-dark transition-all duration-300 shadow-lg border border-surface-border/50 group-hover:border-transparent">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <h4 className="text-2xl font-bold text-primary mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-300">{title}</h4>
      <p className="text-gray-200 text-base leading-relaxed font-light">{description}</p>
    </div>
    
    <div className="mt-8 pt-6 border-t border-surface-border/50 relative z-10">
      <span className="text-sm font-bold text-white flex items-center gap-2 group-hover:text-primary transition-colors cursor-pointer group-hover:gap-3">
        {lang === 'PT' ? 'Saiba mais' : 'Learn more'} 
        <span className="material-symbols-outlined text-lg">arrow_forward</span>
      </span>
    </div>
  </div>
);

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const servicesData = [
    {
      icon: 'web',
      title: lang === 'PT' ? 'Landing Pages' : 'Landing Pages',
      description: lang === 'PT' 
        ? 'Desenvolvemos páginas de aterrissagem otimizadas para conversão máxima. Design moderno, veloz e focado em transformar visitantes em clientes reais.'
        : 'We develop landing pages optimized for maximum conversion. Modern, fast, and focused design to turn visitors into real customers.'
    },
    {
      icon: 'auto_fix_high',
      title: lang === 'PT' ? 'Fotos com IA' : 'AI Photography',
      description: lang === 'PT'
        ? 'Produção de imagens ultra-realistas e criativas geradas por IA. Perfeito para campanhas e conteúdo visual único sem os custos de grandes produções.'
        : 'Production of ultra-realistic and creative AI-generated images. Perfect for campaigns and unique visual content without high production costs.'
    },
    {
      icon: 'smart_toy',
      title: lang === 'PT' ? 'Criação de Mascote' : 'Mascot Creation',
      description: lang === 'PT'
        ? 'Criação de mascotes digitais carismáticos e produção de vídeos animados para engajar sua audiência e dar uma face memorável à sua marca.'
        : 'Creation of charismatic digital mascots and production of animated videos to engage your audience and give your brand a memorable face.'
    }
  ];

  return (
    <section id="servicos" className="py-24 relative bg-gradient-to-b from-background-dark via-surface-dark/40 to-background-dark border-y border-surface-border/50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="animate-fade-in-up">
            <h2 className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3">
              {lang === 'PT' ? 'O Que Fazemos' : 'What We Do'}
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
              {lang === 'PT' ? 'SERVIÇOS FOCADOS' : 'FOCUSED SERVICES'}
            </h3>
          </div>
          <p className="text-gray-400 max-w-md text-right md:text-left text-lg font-light leading-relaxed">
            {lang === 'PT' 
              ? 'Soluções de alta performance e criatividade para destacar sua presença digital e visual com tecnologia de ponta.'
              : 'High-performance creative solutions to make your digital and visual presence stand out with cutting-edge technology.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((s, i) => (
            <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
              <ServiceCard {...s} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
