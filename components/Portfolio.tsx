
import React from 'react';
import { Language, PortfolioItem } from '../types';

interface PortfolioProps {
  lang: Language;
}

const Portfolio: React.FC<PortfolioProps> = ({ lang }) => {
  const projects: PortfolioItem[] = [
    {
      id: 1,
      title: 'Campanha Lumina',
      category: lang === 'PT' ? 'Vídeo & Fotografia' : 'Video & Photography',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-Edn3Ety-g8DHpvrFMXQ7bNNgKVieelK_2XYzlDSPZf5F_IeZGS6hZxtJk9A14g3RnIDFio2vjEuLxYpiV1NfShPPt7h9E2rCkHBU8Zt0XsuddyZFI0wgF5UL40IaUqi2NSQ8Qz5Tyan2HP80xjoqDTM6MhCf5YTYsAxx362gC88wLRrLkLLpYnEhNk7yAqFqpRrgIydzuzCpVwNlFwoZSOVgYfw83lVxUtbb1-WUa7MSeKKtJD9QLbt-62pmAsu5gq_6GH6IB2c',
      alt: 'High fashion editorial'
    },
    {
      id: 2,
      title: 'TechFit App',
      category: lang === 'PT' ? 'Sistema Web' : 'Web System',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPjgX3i4MkocOo_pZU7S0Ez6z0UpqdoA6m-nuENT1eSOsSe2i9wvsKdW0WSgtx5qlJfnZwA1V2WgrLqUdbXWRKNgMOFe5hqRr8oDIgaaN9Fp4rQUg8aA9CvgjeRm6DWj4l90mNcWrKKa25s5khohQxG3-bXnOncxDaMr0bFz6acXpmCeG6AM4pM4WLgWU7_QUVuuYIUai4TDZwh_3ejwYR6nrCzDGzugN6MrBapij5nxhhUaUM7JZJIdUqU4uhe-Z7uM550R-y9Ik',
      alt: 'Dashboard UI'
    },
    {
      id: 3,
      title: 'Prototype X1',
      category: lang === 'PT' ? 'Impressão 3D' : '3D Printing',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASRgflD41n5D4v66IJBbOCI__xY3NGHMWE3z7aZmU78WlQJHuojRpo5J11LO9fyXARxH9u2j3DT7TgC33JPRM34PyjgZqu1wI-2Hr39t2s1ibSlS28VyxBnSsCrcY7iIZLys_ZoLjvIFTcKH1Cw1PMPZLzwCXwKdNr9qJ5-vaFTQzluUNARzR2K39ENHB9d8G6h8z2FbWvVi76sR5ZHLLYVhg3M8QKraYpGEFlrRL8RS8sdxGnEgC3yR3tBrmqNLHOgGsEkzzFAZk',
      alt: '3D printed model'
    },
    {
      id: 4,
      title: 'Aurora Render',
      category: lang === 'PT' ? 'Renderização 3D' : '3D Rendering',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3QeqyrpkX1xZw4LruGkPYvlJUx1EqrdgfpQeNyUSE8wIMtF6CcGLualtQtdHMJyBPpA7j3kredAG-K5H2OsB5HGR82sLCqw3bwXcxdDm035W33Ed94BJoMHwGUTSY71HP-Zhx_JeWoKhRlOQPvvqkpGkOfqWJXo566fcKKzauRoKq4QlVT8Nrlm2u0q6J6doGWqrSEKyqLrUAm0Asu0fFOVkcUJ_qtbMx7i2u5fZhnrT4XSgWvbb9eyVV1mNDHGYc-sl1eX0alf8',
      alt: '3D abstract render'
    },
    {
      id: 5,
      title: 'NextGen Landing',
      category: lang === 'PT' ? 'Web Design' : 'Web Design',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8TwaY39YjlQXioqR8UPmsDJV0p2jG5nJ0eZUii5hfWMV9R1A3kRGDOJuWr98oszia9-nZWMBa0_WemWp1MGeSg7Y5fnGmvVtd8hopMAFrLzEVGK5BFa088eLbuNa1qlDQ4m0Z4ZsRh_cMSurnvLjjIVH2caZtRTpSAqT7ZuPLO67vw8Zcgnit6Du9ZatkaYObsuSoEpjxqC101jYBcG89M3gnS8zAZhiCTuEcwmojRBoW34Dd8nzx7zay_rGARobsCcQHOHO5iqo',
      alt: 'Website mockup'
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative bg-gradient-to-b from-background-dark via-background-dark/80 to-background-dark">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3">
            {lang === 'PT' ? 'Portfólio' : 'Portfolio'}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            {lang === 'PT' ? 'Projetos Recentes' : 'Recent Projects'}
          </h3>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center p-6 text-center">
                <div>
                  <h4 className="text-white text-xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {project.title}
                  </h4>
                  <p className="text-primary text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.category}
                  </p>
                </div>
              </div>
              <img 
                src={project.image} 
                alt={project.alt}
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-background-dark transition-colors font-bold text-sm tracking-wide">
            {lang === 'PT' ? 'Ver Todos os Projetos' : 'View All Projects'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
