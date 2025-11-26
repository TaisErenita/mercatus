import React, { useState } from 'react';
import { BarChart3, Lightbulb, Zap, Target, LogIn, AlertCircle, X } from 'lucide-react';
import { Button } from './ui/button';

const LandingPage = ({ onEnter }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === 'nutrimental' && password === 'nutrimental') {
      setError('');
      setShowLoginModal(false);
      onEnter();
    } else {
      setError('Login ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Header com Logo Centralizado */}
      <div className="container mx-auto px-4 py-12 relative">
        {/* Botão Login no Canto */}
        <div className="absolute top-8 right-4">
          <Button
            onClick={() => setShowLoginModal(true)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        </div>
        
        {/* Logo Centralizado */}
        <div className="flex justify-center mb-16">
          <div className="bg-white px-12 py-6 rounded-2xl shadow-xl">
            <h1 className="text-5xl font-bold text-slate-800">
              MERC<span className="text-cyan-500">A</span>TUS
            </h1>
          </div>
        </div>

        {/* Título Principal */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">
            Inteligência de Mercado com IA
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full mb-8"></div>
          
          {/* Slogan MERCATUS */}
          <p className="text-lg text-slate-600 italic font-light">
            "De dados a insights. De insights a resultados."
          </p>
        </div>

        {/* 4 Módulos */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Monitoramento */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Monitoramento</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                KPIs em tempo real, análise de mercado e performance
              </p>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Insights</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Modelo preditivo IA e análise de tendências
              </p>
            </div>

            {/* Estratégia */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Estratégia</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Roadmap estratégico e plano de ação IA
              </p>
            </div>

            {/* Simulador */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Simulador</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cenários e projeções com modelo econômico
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-auto pt-16 pb-8 text-slate-500 text-sm">
          <p>MERCATUS - Powered by Manus AI | Inteligência de Mercado Avançada</p>
        </div>
      </div>

      {/* Modal de Login */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            {/* Botão Fechar */}
            <button
              onClick={() => {
                setShowLoginModal(false);
                setError('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Conteúdo do Modal */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-cyan-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Login MERCATUS</h2>
              <p className="text-slate-600 text-sm">Acesse o sistema de inteligência de mercado</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Usuário
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 flex items-center space-x-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Entrar no Dashboard
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500">
                Credenciais de demonstração disponíveis
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
