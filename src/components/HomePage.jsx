import React from 'react';
import { BarChart3, Lightbulb, Zap, Target, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const HomePage = ({ onSelectModule }) => {
  const modules = [
    {
      id: 'monitoramento',
      icon: BarChart3,
      title: 'Monitoramento',
      description: 'KPIs em tempo real, análise de mercado e performance',
      gradient: 'from-cyan-100 to-cyan-200',
      iconColor: 'text-cyan-500'
    },
    {
      id: 'insights',
      icon: Lightbulb,
      title: 'Insights',
      description: 'Modelo preditivo IA e análise de tendências',
      gradient: 'from-cyan-100 to-cyan-200',
      iconColor: 'text-cyan-500'
    },
    {
      id: 'estrategia',
      icon: Zap,
      title: 'Estratégia',
      description: 'Roadmap estratégico e plano de ação IA',
      gradient: 'from-cyan-100 to-cyan-200',
      iconColor: 'text-cyan-500'
    },
    {
      id: 'simulador',
      icon: Target,
      title: 'Simulador',
      description: 'Cenários e projeções com modelo econômico',
      gradient: 'from-cyan-100 to-cyan-200',
      iconColor: 'text-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-slate-800 mb-4">
            Selecione um Módulo
          </h2>
          <p className="text-xl text-slate-600">
            Escolha o módulo que deseja acessar
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Precisão do Modelo Preditivo */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-semibold text-slate-700 text-center mb-4">
              Precisão do Modelo Preditivo Nutrimental
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

        {/* 4 Módulos Clicáveis */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.id}
                  onClick={() => onSelectModule(module.id)}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border-2 border-transparent hover:border-cyan-500"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${module.gradient} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto`}>
                    <Icon className={`w-10 h-10 ${module.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 text-center group-hover:text-cyan-500 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed text-center mb-4">
                    {module.description}
                  </p>
                  <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-cyan-500 hover:text-cyan-600"
                    >
                      Acessar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Informação Adicional */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-700 mb-3">
              Sistema de Inteligência de Mercado
            </h3>
            <p className="text-slate-600">
              Navegue pelos módulos para acessar análises detalhadas, insights de IA, 
              estratégias de mercado e simulações de cenários.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
