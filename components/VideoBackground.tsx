
import React from 'react';

const VideoBackground: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-[200px] z-0 overflow-hidden">
            {/* Vídeo de fundo */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                {/* 
          INSTRUÇÕES PARA ADICIONAR SEU VÍDEO:
          
          1. Coloque seu arquivo de vídeo na pasta 'public' do projeto
             Exemplo: public/background-video.mp4
          
          2. Descomente a linha abaixo e ajuste o caminho para seu vídeo
             Você pode usar múltiplos formatos para melhor compatibilidade
        */}

                {<source src="/background-video.mp4" type="video/mp4" />}
                {/* <source src="/background-video.webm" type="video/webm" /> */}

                {/* Mensagem de fallback caso o navegador não suporte vídeo */}
                Seu navegador não suporta vídeos HTML5.
            </video>

            {/* Gradiente suave na parte inferior para transição - mais sutil */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark z-20"></div>
        </div>
    );
};

export default VideoBackground;
