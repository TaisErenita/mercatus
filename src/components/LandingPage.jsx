import React from 'react';
import { BarChart3, Lightbulb, Zap, Target, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const LandingPage = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header com Logo */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center mb-16">
          <div className="bg-white px-12 py-6 rounded-2xl shadow-xl">
            <h1 className="text-5xl font-bold text-slate-800">
              MERC<span className="text-cyan-500">A</span>TUS
            </h1>
          </div>
        </div>

        {/* Título Principal */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-4">
            Inteligência de Mercado com IA
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full"></div>
        </div>

        {/* Precisão do Modelo Preditivo */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-slate-700 text-center mb-4">
              Precisão do Modelo Preditivo
            </h3>
            <p className="text-slate-500 text-center mb-8">
              Métricas de desempenho da IA de forecasting
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* R² Score */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 text-center">
                <div className="text-sm font-medium text-slate-600 mb-2">R² Score</div>
                <div className="text-5xl font-bold text-cyan-500 mb-2">0.980</div>
                <div className="text-xs text-slate-500">Coeficiente de determinação</div>
              </div>

              {/* MAPE */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 text-center">
                <div className="text-sm font-medium text-slate-600 mb-2">MAPE</div>
                <div className="text-5xl font-bold text-cyan-500 mb-2">4.2%</div>
                <div className="text-xs text-slate-500">Erro percentual absoluto médio</div>
              </div>

              {/* Acurácia */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 text-center">
                <div className="text-sm font-medium text-slate-600 mb-2">Acurácia</div>
                <div className="text-5xl font-bold text-cyan-500 mb-2">95.8%</div>
                <div className="text-xs text-slate-500">Taxa de acerto das previsões</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Módulos */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Botão Acessar Dashboard */}
        <div className="flex justify-center">
          <Button
            onClick={onEnter}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-12 py-6 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-3"
          >
            <span>Acessar Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-500 text-sm">
          <p>MERCATUS - Powered by Manus AI | Inteligência de Mercado Avançada</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
