
import React, { useState } from 'react';
import { Language } from '../types';

interface ContactProps {
  lang: Language;
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Selecione uma opção',
    message: ''
  });
  const [status, setStatus] = useState<null | 'sending' | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', service: 'Selecione uma opção', message: '' });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Erro ao enviar mensagem');
        setTimeout(() => setStatus(null), 5000);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage('Erro de conexão. Verifique se o servidor está rodando.');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contato" className="py-24 bg-surface-dark/20 relative">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3">
              {lang === 'PT' ? 'Contato' : 'Contact'}
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {lang === 'PT' ? 'Vamos criar algo extraordinário?' : 'Let\'s create something extraordinary?'}
            </h3>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              {lang === 'PT'
                ? 'Estamos prontos para ouvir sua ideia e transformá-la em realidade. Preencha o formulário e entraremos em contato em breve.'
                : 'We are ready to hear your idea and turn it into reality. Fill out the form and we will get back to you soon.'}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-dark flex items-center justify-center border border-surface-border text-primary">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-medium">contato@gla-design.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-dark flex items-center justify-center border border-surface-border text-primary">
                  <span className="material-symbols-outlined text-xl">location_on</span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{lang === 'PT' ? 'Localização' : 'Location'}</p>
                  <p className="text-white font-medium">São Paulo, Brasil</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-dark p-8 md:p-10 rounded-2xl border border-surface-border">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-300" htmlFor="name">
                    {lang === 'PT' ? 'Nome' : 'Name'}
                  </label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background-dark border-0 border-b-2 border-surface-border focus:border-primary focus:ring-0 text-white placeholder-gray-600 rounded-t-md px-4 py-3 transition-colors"
                    id="name"
                    placeholder={lang === 'PT' ? 'Seu nome' : 'Your name'}
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-300" htmlFor="email">Email</label>
                  <input
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background-dark border-0 border-b-2 border-surface-border focus:border-primary focus:ring-0 text-white placeholder-gray-600 rounded-t-md px-4 py-3 transition-colors"
                    id="email"
                    placeholder="seu@email.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-300" htmlFor="service">
                  {lang === 'PT' ? 'Serviço de Interesse' : 'Service of Interest'}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="bg-background-dark border-0 border-b-2 border-surface-border focus:border-primary focus:ring-0 text-white rounded-t-md px-4 py-3 transition-colors cursor-pointer"
                  id="service"
                >
                  <option disabled>{lang === 'PT' ? 'Selecione uma opção' : 'Select an option'}</option>
                  <option>{lang === 'PT' ? 'Vídeo & Foto' : 'Video & Photo'}</option>
                  <option>{lang === 'PT' ? 'Desenvolvimento Web' : 'Web Development'}</option>
                  <option>{lang === 'PT' ? 'Impressão & 3D' : 'Printing & 3D'}</option>
                  <option>{lang === 'PT' ? 'Marketing & Estratégia' : 'Marketing & Strategy'}</option>
                  <option>{lang === 'PT' ? 'Outro' : 'Other'}</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-300" htmlFor="message">
                  {lang === 'PT' ? 'Mensagem' : 'Message'}
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background-dark border-0 border-b-2 border-surface-border focus:border-primary focus:ring-0 text-white placeholder-gray-600 rounded-t-md px-4 py-3 transition-colors resize-none"
                  id="message"
                  placeholder={lang === 'PT' ? 'Conte um pouco sobre seu projeto...' : 'Tell us a bit about your project...'}
                  rows={4}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-primary hover:bg-[#d9a60e] text-background-dark font-bold py-4 rounded-lg transition-all mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <span className="w-5 h-5 border-2 border-background-dark border-t-transparent rounded-full animate-spin"></span>
                ) : status === 'success' ? (
                  <>
                    <span className="material-symbols-outlined">check_circle</span>
                    {lang === 'PT' ? 'Mensagem Enviada!' : 'Message Sent!'}
                  </>
                ) : (
                  lang === 'PT' ? 'Enviar Mensagem' : 'Send Message'
                )}
              </button>

              {status === 'error' && errorMessage && (
                <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">error</span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
