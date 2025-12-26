
import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, radius: 250 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor(type: 'transition' | 'general') {
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;
        const vHeight = window.innerHeight;
        const OFFSET = 200; // Offset de 200px para baixo

        this.x = Math.random() * width;

        if (type === 'transition') {
          // Concentração na parte inferior da primeira tela (o fold/transição)
          // Começa a partir de 75% da altura da viewport + 200px
          this.y = (vHeight * 0.75) + OFFSET + (Math.random() * vHeight * 0.5);
        } else {
          // Resto do site, evitando os primeiros 70vh da página + 200px
          const startY = vHeight * 0.7 + OFFSET;
          this.y = startY + Math.random() * (height - startY);
        }

        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.size = Math.random() * 1.8 + 1.8;
        this.color = '#ecb613';
      }

      update() {
        const BARRIER_Y = 200; // Barreira a 200px do topo

        this.x += this.vx;
        this.y += this.vy;

        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;

          // Barreira superior - impede que as bolinhas subam além de 200px
          if (this.y < BARRIER_Y) {
            this.y = BARRIER_Y;
            this.vy = Math.abs(this.vy); // Inverte para baixo
          }

          if (this.y > canvas.height) this.vy *= -1;
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const dirX = dx / distance;
          const dirY = dy / distance;
          this.x -= dirX * force * 5;
          this.y -= dirY * force * 3;

          // Garante que a barreira seja respeitada mesmo com interação do mouse
          if (this.y < BARRIER_Y) {
            this.y = BARRIER_Y;
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillStyle = 'rgba(236, 182, 19, 0.5)'; // Reduzido de 1.0 para 0.5
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      const scrollH = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      canvas.width = window.innerWidth;
      canvas.height = scrollH;

      particles = [];
      const maxParticles = 350; // Leve redução para manter foco na transição

      // Removemos o tipo 'hero' completamente para limpar a parte superior

      // 60% na transição (A "nuvem" entre a primeira e segunda tela, agora começando mais embaixo)
      for (let i = 0; i < maxParticles * 0.6; i++) {
        particles.push(new Particle('transition'));
      }
      // 40% distribuídas pelo resto da página (abaixo do hero)
      for (let i = 0; i < maxParticles * 0.4; i++) {
        particles.push(new Particle('general'));
      }
    };

    const connect = () => {
      const vTop = window.scrollY;
      const vBottom = vTop + window.innerHeight;

      for (let a = 0; a < particles.length; a++) {
        // Otimização: Só processa se estiver perto da viewport
        if (particles[a].y < vTop - 200 || particles[a].y > vBottom + 200) continue;

        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 160) {
            const distanceFactor = 1 - distance / 160;
            ctx.lineWidth = 1.0;
            ctx.strokeStyle = `rgba(236, 182, 19, ${distanceFactor * 0.4})`; // Reduzido de 0.7 para 0.4
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      connect();
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    setTimeout(init, 150);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default BackgroundAnimation;
