import React, { useState, useEffect } from 'react';

const SimuladorElasticidade = ({ onClose }) => {
  const [params, setParams] = useState({
    priceChange: 0,        // % mudança no preço
    investment: 2000000,   // Investimento em R$
    marketing: 1000000,    // Investimento em marketing
    expansion: 3,          // Estados para expansão
    elasticity: -1.2       // Elasticidade preço-demanda
  });

  const [results, setResults] = useState(null);

  // Dados base
  const baseData = {
    revenue: 119500000,
    volume: 351804,        // Unidades vendidas
    marketShare: 50.16,
    avgPrice: 339.7,       // Preço médio por unidade (R$ 119.5M / 351.8k)
    elasticityCoeff: -1.2  // Elasticidade típica para produtos alimentícios premium
  };

  const elasticityOptions = [
    { value: -0.5, label: 'Baixa (-0.5)', desc: 'Produto essencial/viciante' },
    { value: -1.0, label: 'Unitária (-1.0)', desc: 'Produto padrão' },
    { value: -1.2, label: 'Moderada (-1.2)', desc: 'Alimento premium (atual)' },
    { value: -1.8, label: 'Alta (-1.8)', desc: 'Produto de luxo' },
    { value: -2.5, label: 'Muito Alta (-2.5)', desc: 'Produto supérfluo' }
  ];

  const calculateResults = () => {
    const priceMultiplier = 1 + (params.priceChange / 100);
    const newPrice = baseData.avgPrice * priceMultiplier;
    
    // Cálculo da elasticidade: % mudança na quantidade / % mudança no preço
    const volumeChangePercent = params.elasticity * (params.priceChange / 100);
    const newVolume = baseData.volume * (1 + volumeChangePercent);
    
    // Receita base com elasticidade
    const elasticityRevenue = newVolume * newPrice;
    
    // Impactos adicionais
    const investmentMultiplier = params.investment / 1000000;
    const marketingImpact = params.marketing / 500000;
    const expansionImpact = params.expansion / 2;
    
    // Receita final considerando todos os fatores
    const additionalGrowth = (investmentMultiplier * 0.15) + (marketingImpact * 0.12) + (expansionImpact * 0.08);
    const finalRevenue = elasticityRevenue * (1 + additionalGrowth);
    
    // Market share ajustado
    const shareImpact = (investmentMultiplier * 0.05) + (marketingImpact * 0.03) + (expansionImpact * 0.02);
    const volumeShareImpact = Math.max(-0.1, volumeChangePercent * 0.3); // Volume afeta share
    const finalShare = Math.min(75, baseData.marketShare * (1 + shareImpact + volumeShareImpact));
    
    // ROI e Payback
    const totalInvestment = params.investment + params.marketing;
    const netGain = finalRevenue - baseData.revenue - totalInvestment;
    const roi = (netGain / totalInvestment) * 100;
    const payback = totalInvestment / ((finalRevenue - baseData.revenue) / 12);
    
    // Análise de risco
    let risk = 'Baixo';
    if (params.priceChange > 15 || roi < 50) risk = 'Alto';
    else if (params.priceChange > 8 || roi < 100) risk = 'Médio';
    
    return {
      price: {
        old: baseData.avgPrice,
        new: newPrice,
        change: params.priceChange
      },
      volume: {
        old: baseData.volume,
        new: Math.round(newVolume),
        change: volumeChangePercent * 100,
        elasticityImpact: volumeChangePercent * 100
      },
      revenue: {
        old: baseData.revenue,
        new: finalRevenue,
        elasticityOnly: elasticityRevenue,
        change: ((finalRevenue - baseData.revenue) / baseData.revenue) * 100
      },
      marketShare: {
        old: baseData.marketShare,
        new: finalShare,
        change: finalShare - baseData.marketShare
      },
      financial: {
        roi: Math.max(roi, -50),
        payback: Math.max(payback, 1),
        risk,
        totalInvestment
      }
    };
  };

  useEffect(() => {
    setResults(calculateResults());
  }, [params]);

  const updateParam = (param, value) => {
    setParams(prev => ({
      ...prev,
      [param]: parseFloat(value) || 0
    }));
  };

  const getImpactColor = (value) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Alto': return 'bg-red-100 text-red-800';
      case 'Médio': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">
                Simulador de Elasticidade Preço-Demanda
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Simule o impacto de mudanças de preço no volume de vendas e receita
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Parâmetros */}
            <div className="space-y-6">
              <h4 className="font-semibold text-slate-900 text-lg">Parâmetros da Simulação</h4>
              
              {/* Mudança de Preço */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mudança no Preço (%)
                </label>
                <input
                  type="range"
                  min="-30"
                  max="50"
                  step="1"
                  value={params.priceChange}
                  onChange={(e) => updateParam('priceChange', e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>-30%</span>
                  <span className="font-medium">{params.priceChange > 0 ? '+' : ''}{params.priceChange}%</span>
                  <span>+50%</span>
                </div>
                <div className="text-sm text-slate-600 mt-2">
                  Preço atual: R$ {baseData.avgPrice.toFixed(2)} → 
                  <span className={getImpactColor(params.priceChange)}>
                    {' '}R$ {results?.price.new.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Elasticidade */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Elasticidade Preço-Demanda
                </label>
                <select
                  value={params.elasticity}
                  onChange={(e) => updateParam('elasticity', e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md"
                >
                  {elasticityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.desc}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-slate-500 mt-1">
                  Elasticidade mede a sensibilidade da demanda às mudanças de preço
                </div>
              </div>

              {/* Investimento */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Investimento em Produto (R$)
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="500000"
                  value={params.investment}
                  onChange={(e) => updateParam('investment', e.target.value)}
                  className="w-full"
                />
                <div className="text-sm text-slate-600 mt-1">
                  R$ {(params.investment / 1000000).toFixed(1)}M
                </div>
              </div>

              {/* Marketing */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Investimento em Marketing (R$)
                </label>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="250000"
                  value={params.marketing}
                  onChange={(e) => updateParam('marketing', e.target.value)}
                  className="w-full"
                />
                <div className="text-sm text-slate-600 mt-1">
                  R$ {(params.marketing / 1000000).toFixed(1)}M
                </div>
              </div>

              {/* Expansão */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Estados para Expansão
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={params.expansion}
                  onChange={(e) => updateParam('expansion', e.target.value)}
                  className="w-full"
                />
                <div className="text-sm text-slate-600 mt-1">
                  {params.expansion} estados
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="space-y-6">
              <h4 className="font-semibold text-slate-900 text-lg">Resultados da Simulação</h4>
              
              {results && (
                <div className="space-y-4">
                  {/* Impacto no Volume */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-700 font-medium mb-2">Impacto no Volume</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-blue-600">Volume Atual</div>
                        <div className="text-lg font-bold text-blue-800">
                          {results.volume.old.toLocaleString()} un
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-blue-600">Volume Projetado</div>
                        <div className="text-lg font-bold text-blue-800">
                          {results.volume.new.toLocaleString()} un
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm font-medium mt-2 ${getImpactColor(results.volume.change)}`}>
                      {results.volume.change > 0 ? '+' : ''}{results.volume.change.toFixed(1)}% 
                      ({results.volume.change > 0 ? '+' : ''}{(results.volume.new - results.volume.old).toLocaleString()} un)
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      Elasticidade: {results.volume.elasticityImpact.toFixed(1)}% por {params.priceChange}% de preço
                    </div>
                  </div>

                  {/* Receita */}
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm text-green-700 font-medium mb-2">Receita Projetada</div>
                    <div className="text-2xl font-bold text-green-800">
                      R$ {(results.revenue.new / 1000000).toFixed(1)}M
                    </div>
                    <div className={`text-sm font-medium mt-1 ${getImpactColor(results.revenue.change)}`}>
                      {results.revenue.change > 0 ? '+' : ''}{results.revenue.change.toFixed(1)}% vs atual
                    </div>
                    <div className="text-xs text-green-600 mt-2">
                      Apenas elasticidade: R$ {(results.revenue.elasticityOnly / 1000000).toFixed(1)}M
                    </div>
                  </div>

                  {/* Market Share */}
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-700 font-medium mb-2">Market Share</div>
                    <div className="text-2xl font-bold text-purple-800">
                      {results.marketShare.new.toFixed(1)}%
                    </div>
                    <div className={`text-sm font-medium mt-1 ${getImpactColor(results.marketShare.change)}`}>
                      {results.marketShare.change > 0 ? '+' : ''}{results.marketShare.change.toFixed(1)} pontos
                    </div>
                  </div>

                  {/* Métricas Financeiras */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-xs text-orange-700">ROI</div>
                      <div className={`text-lg font-bold ${getImpactColor(results.financial.roi)}`}>
                        {results.financial.roi.toFixed(0)}%
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-xs text-slate-700">Payback</div>
                      <div className="text-lg font-bold text-slate-800">
                        {results.financial.payback.toFixed(1)} meses
                      </div>
                    </div>
                  </div>

                  {/* Análise de Risco */}
                  <div className="p-4 bg-slate-50 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Nível de Risco</span>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${getRiskColor(results.financial.risk)}`}>
                        {results.financial.risk}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-2">
                      Investimento total: R$ {(results.financial.totalInvestment / 1000000).toFixed(1)}M
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-sm font-medium text-yellow-800 mb-2">💡 Insights</div>
                    <div className="text-xs text-yellow-700 space-y-1">
                      {params.priceChange > 0 && results.volume.change < 0 && (
                        <div>• Aumento de preço reduz volume conforme elasticidade</div>
                      )}
                      {Math.abs(results.volume.change) > Math.abs(params.priceChange) && (
                        <div>• Demanda é elástica (volume varia mais que preço)</div>
                      )}
                      {results.revenue.change > 0 && results.volume.change < 0 && (
                        <div>• Receita cresce apesar da queda no volume</div>
                      )}
                      {results.financial.roi > 200 && (
                        <div>• ROI muito alto pode indicar projeção otimista</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimuladorElasticidade;
