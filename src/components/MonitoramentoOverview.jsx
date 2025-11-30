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
      badge: 'Mercado',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      metricas: [
        { label: 'Mercado Total', valor: 'R$ 159.2M', variacao: '+7.2%', positivo: true },
        { label: 'Volume', valor: '2.67M kg', variacao: '+7.2%', positivo: true },
        { label: 'Share Nutrimental', valor: '89.5%', variacao: '+2.3%', positivo: true }
      ],
      gradient: 'from-cyan-50 to-blue-50',
      borderColor: 'border-cyan-300'
    },
    {
      id: 'internos',
      icon: Building2,
      titulo: 'Dados Internos',
      subtitulo: 'Performance Nutrimental',
      badge: 'Interno',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      metricas: [
        { label: 'Receita Total', valor: 'R$ 142.5M', variacao: '+18.5%', positivo: true },
        { label: 'Volume', valor: '2.92M kg', variacao: '+15.2%', positivo: true },
        { label: 'Top Canal', valor: 'C&C 37.9%', variacao: null, positivo: null }
      ],
      gradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-300'
    },
    {
      id: 'mtrix',
      icon: Globe2,
      titulo: 'MTRIX',
      subtitulo: 'Distribuição & Cobertura',
      badge: 'Distribuição',
      badgeColor: 'bg-green-100 text-green-800 border-green-300',
      metricas: [
        { label: 'Receita', valor: 'R$ 14.0M', variacao: null, positivo: null },
        { label: 'Distribuidores', valor: '35', variacao: null, positivo: null },
        { label: 'Cobertura', valor: '25 UFs', variacao: null, positivo: null }
      ],
      gradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-300'
    },
    {
      id: 'amazon',
      icon: ShoppingCart,
      titulo: 'Amazon',
      subtitulo: 'E-commerce & Digital',
      badge: 'Digital',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
      metricas: [
        { label: 'Receita', valor: 'R$ 3.67M', variacao: null, positivo: null },
        { label: 'Unidades', valor: '351.8k', variacao: null, positivo: null },
        { label: 'Produtos', valor: '88 SKUs', variacao: null, positivo: null }
      ],
      gradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-300'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 to-slate-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Monitoramento - Visão Geral</CardTitle>
              <CardDescription className="text-base mt-2">
                Selecione uma fonte de dados para análise detalhada
              </CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-300 text-sm px-3 py-1">
              {periodoLegenda.curto}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {submodulos.map((submod) => {
          const Icon = submod.icon;
          return (
            <Card
              key={submod.id}
              className={`border-2 ${submod.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 bg-gradient-to-br ${submod.gradient}`}
              onClick={() => onSelectSubmodulo(submod.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${submod.badgeColor.replace('text-', 'bg-').replace('border-', 'bg-').split(' ')[0]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{submod.titulo}</CardTitle>
                      <CardDescription className="text-sm">{submod.subtitulo}</CardDescription>
                    </div>
                  </div>
                  <Badge className={`${submod.badgeColor} text-xs`}>
                    {submod.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {submod.metricas.map((metrica, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/70 rounded-lg">
                      <span className="text-sm font-medium text-slate-700">{metrica.label}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-slate-900">{metrica.valor}</span>
                        {metrica.variacao && (
                          <span className={`text-xs font-semibold ${metrica.positivo ? 'text-green-600' : 'text-red-600'}`}>
                            {metrica.variacao}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Botão Ver Detalhes */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <button className="w-full flex items-center justify-center space-x-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
                    <span>Ver Análise Completa</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info Footer */}
      <Card className="border-0 shadow-md bg-blue-50">
        <CardContent className="py-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💡</div>
            <div>
              <h5 className="font-semibold text-blue-900 mb-1">Dica de Navegação</h5>
              <p className="text-sm text-blue-800">
                Clique em qualquer card acima para acessar análises detalhadas, gráficos interativos e insights específicos de cada fonte de dados.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoramentoOverview;
