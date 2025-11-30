import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart3, Building2, Globe2, ShoppingCart, ArrowRight } from 'lucide-react';

const MonitoramentoOverview = ({ onSelectSubmodulo, periodoLegenda }) => {
  const submodulos = [
    {
      id: 'scanntech',
      icon: BarChart3,
      titulo: 'Scanntech',
      subtitulo: 'Mercado Total & Concorrência',
      descricao: 'Análise completa do mercado de barras com dados Scanntech, share de mercado, análise competitiva e tendências por região.',
      badge: 'Mercado',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      gradient: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-50 via-blue-50 to-indigo-50',
      borderColor: 'border-cyan-400'
    },
    {
      id: 'internos',
      icon: Building2,
      titulo: 'Dados Internos',
      subtitulo: 'Performance Nutrimental',
      descricao: 'Visão detalhada das vendas internas por canal, região, produtos e clientes com análise de performance YTD completa.',
      badge: 'Interno',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 via-pink-50 to-rose-50',
      borderColor: 'border-purple-400'
    },
    {
      id: 'mtrix',
      icon: Globe2,
      titulo: 'MTRIX',
      subtitulo: 'Distribuição & Cobertura',
      descricao: 'Mapeamento completo da rede de distribuição nacional, cobertura geográfica e performance por distribuidor.',
      badge: 'Distribuição',
      badgeColor: 'bg-green-100 text-green-800 border-green-300',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 via-emerald-50 to-teal-50',
      borderColor: 'border-green-400'
    },
    {
      id: 'amazon',
      icon: ShoppingCart,
      titulo: 'Amazon',
      subtitulo: 'E-commerce & Digital',
      descricao: 'Análise de vendas no marketplace Amazon, performance de produtos, avaliações e oportunidades no canal digital.',
      badge: 'Digital',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
      gradient: 'from-orange-500 to-amber-600',
      bgGradient: 'from-orange-50 via-amber-50 to-yellow-50',
      borderColor: 'border-orange-400'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Premium */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Monitoramento de Performance
              </h2>
              <p className="text-lg text-slate-300">
                Selecione uma fonte de dados para análises detalhadas e insights estratégicos
              </p>
            </div>
            {periodoLegenda && (
              <Badge className="bg-blue-500 text-white border-blue-400 text-sm px-4 py-2">
                {periodoLegenda.curto}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Grid de Cards Simplificados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {submodulos.map((submod) => {
          const Icon = submod.icon;
          return (
            <Card
              key={submod.id}
              className={`group relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border-2 ${submod.borderColor} bg-gradient-to-br ${submod.bgGradient}`}
              onClick={() => onSelectSubmodulo(submod.id)}
            >
              {/* Header com Gradiente */}
              <div className={`relative bg-gradient-to-r ${submod.gradient} p-6 text-white overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{submod.titulo}</h3>
                      <p className="text-white/90 text-sm">{submod.subtitulo}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>

              {/* Conteúdo Simplificado */}
              <CardContent className="p-6 space-y-5">
                {/* Descrição */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {submod.descricao}
                </p>

                {/* Badge */}
                <div>
                  <Badge className={`${submod.badgeColor} text-xs font-semibold px-3 py-1`}>
                    {submod.badge}
                  </Badge>
                </div>

                {/* Botão de Ação */}
                <button
                  className={`w-full mt-4 py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r ${submod.gradient} hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-[1.02]`}
                >
                  <span>Ver Análise Completa</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Rodapé com Dica */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="py-5">
          <div className="flex items-start space-x-4">
            <div className="text-3xl">💡</div>
            <div>
              <h5 className="font-bold text-blue-900 mb-1.5 text-lg">Dica de Navegação</h5>
              <p className="text-sm text-blue-800 leading-relaxed">
                Clique em qualquer card acima para acessar análises detalhadas, gráficos interativos, filtros personalizados e insights específicos de cada fonte de dados.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoramentoOverview;
