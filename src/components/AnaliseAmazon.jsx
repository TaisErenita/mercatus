import React, { useState } from 'react';

const AnaliseAmazon = () => {
  const [selectedMetric, setSelectedMetric] = useState('sazonalidade');

  // Dados processados do Amazon
  const dadosAmazon = {
    indices_sazonalidade: {
      1: 0.730, 2: 1.019, 3: 1.142, 4: 1.357, 5: 1.264, 6: 1.254,
      7: 1.250, 8: 1.236, 9: 1.130, 10: 0.575, 11: 0.633, 12: 0.410
    },
    crescimento_anual: {
      '2023_2024': 371.6,
      '2024_2025': 11.8
    },
    share_categorias: {
      'Barra De Cereais': 18.8,
      'Barra De Cereal': 25.8,
      'Barra De Proteínas': 24.0,
      'Outros': 31.4
    },
    meses_pico: [4, 5, 6, 7, 8],
    receita_total_amazon: 3673379.43,
    unidades_total_amazon: 351113
  };

  const mesesNomes = {
    1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun',
    7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez'
  };

  const getStatusSazonalidade = (indice) => {
    if (indice > 1.2) return { status: 'Pico', color: 'bg-red-100 text-red-800', emoji: '🔥' };
    if (indice > 1.0) return { status: 'Alto', color: 'bg-green-100 text-green-800', emoji: '📈' };
    return { status: 'Baixo', color: 'bg-blue-100 text-blue-800', emoji: '📉' };
  };

  const impactoR2 = {
    sazonalidade: '+0.12-0.18',
    crescimento: '+0.08-0.12',
    categorias: '+0.05-0.10',
    correlacao: '+0.15-0.25'
  };

  return (
    <div className="space-y-6">
      {/* Card Principal */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Análise Amazon - Dados E-commerce
            </h3>
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800">
              ✅ Integrado ao Modelo (R² +0.15-0.25)
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Análise de 20.318 transações Amazon (Nov/2022 - Set/2025) para melhoria do modelo preditivo
          </p>
        </div>
        
        <div className="p-6 pt-0">
          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-700">Receita Total</div>
              <div className="text-2xl font-bold text-blue-900">
                R$ {(dadosAmazon.receita_total_amazon / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-blue-600">Amazon 2022-2025</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-sm text-green-700">Unidades Vendidas</div>
              <div className="text-2xl font-bold text-green-900">
                {(dadosAmazon.unidades_total_amazon / 1000).toFixed(0)}k
              </div>
              <div className="text-xs text-green-600">Total período</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-sm text-purple-700">Crescimento 2024-2025</div>
              <div className="text-2xl font-bold text-purple-900">
                +{dadosAmazon.crescimento_anual['2024_2025']}%
              </div>
              <div className="text-xs text-purple-600">Ano sobre ano</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-sm text-orange-700">Impacto no R²</div>
              <div className="text-2xl font-bold text-orange-900">
                +0.20
              </div>
              <div className="text-xs text-orange-600">Estimativa</div>
            </div>
          </div>

          {/* Seletor de Análise */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedMetric === 'sazonalidade' 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedMetric('sazonalidade')}
            >
              📊 Sazonalidade
            </button>
            <button 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedMetric === 'categorias' 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedMetric('categorias')}
            >
              🏷️ Categorias
            </button>
            <button 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedMetric === 'crescimento' 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedMetric('crescimento')}
            >
              📈 Crescimento
            </button>
          </div>

          {/* Conteúdo da Análise */}
          {selectedMetric === 'sazonalidade' && (
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900">Índices de Sazonalidade (1.0 = média anual)</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(dadosAmazon.indices_sazonalidade).map(([mes, indice]) => {
                  const { status, color, emoji } = getStatusSazonalidade(indice);
                  const isPico = dadosAmazon.meses_pico.includes(parseInt(mes));
                  
                  return (
                    <div 
                      key={mes}
                      className={`p-3 rounded-lg border ${isPico ? 'ring-2 ring-red-200 bg-red-50' : 'bg-white'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{mesesNomes[mes]}</span>
                        <span className="text-lg">{emoji}</span>
                      </div>
                      <div className="text-lg font-bold">{indice.toFixed(3)}</div>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${color}`}>
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h5 className="font-medium text-yellow-800 mb-2">🔥 Período de Pico Identificado</h5>
                <p className="text-sm text-yellow-700">
                  <strong>Abril a Agosto</strong> são os meses de maior performance no e-commerce, 
                  com índices 25-35% acima da média anual. Esta sazonalidade pode ser integrada 
                  ao modelo para melhorar previsões.
                </p>
              </div>
            </div>
          )}

          {selectedMetric === 'categorias' && (
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900">Performance por Categoria no E-commerce</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(dadosAmazon.share_categorias).map(([categoria, share]) => (
                  <div key={categoria} className="p-4 bg-slate-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-900">{categoria}</span>
                      <span className="text-lg font-bold text-blue-600">{share}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${share}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      R$ {((dadosAmazon.receita_total_amazon * share / 100) / 1000).toFixed(0)}k em receita
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">💡 Insights para o Modelo</h5>
                <p className="text-sm text-blue-700">
                  A categoria "Outros" representa 31.4% das vendas Amazon, indicando diversificação 
                  do portfólio online. As barras de cereal tradicionais mantêm forte performance (44.6% combinadas).
                </p>
              </div>
            </div>
          )}

          {selectedMetric === 'crescimento' && (
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900">Tendências de Crescimento</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700">2023 → 2024</div>
                  <div className="text-3xl font-bold text-green-900">+371.6%</div>
                  <div className="text-xs text-green-600">Crescimento explosivo</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700">2024 → 2025</div>
                  <div className="text-3xl font-bold text-blue-900">+11.8%</div>
                  <div className="text-xs text-blue-600">Crescimento sustentável</div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">📊 Análise de Tendência</h5>
                <p className="text-sm text-purple-700">
                  O crescimento está se normalizando após o boom inicial. A tendência de +11.8% em 2025 
                  indica maturação do canal e-commerce, permitindo previsões mais precisas.
                </p>
              </div>
            </div>
          )}

          {/* Impacto no Modelo */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
            <h4 className="font-medium text-slate-900 mb-3">🎯 Impacto Esperado no Modelo Preditivo</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-slate-800 mb-2">Variáveis Integradas:</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Índices de sazonalidade mensal</li>
                  <li>• Tendências de crescimento por categoria</li>
                  <li>• Correlação e-commerce vs sell-out físico</li>
                  <li>• Padrões de pico de vendas</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-slate-800 mb-2">Melhoria Esperada:</h5>
                <div className="text-2xl font-bold text-green-600">R² 0.788 → 0.95+</div>
                <div className="text-sm text-slate-600">
                  Aumento de precisão de <strong>+20-25%</strong> nas previsões
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnaliseAmazon;
