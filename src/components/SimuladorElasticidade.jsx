import React, { useState, useEffect } from 'react';

const SimuladorElasticidade = () => {
  const [params, setParams] = useState({
    priceChange: 0,        // % mudança no preço
    investment: 2000000,   // Investimento em R$
    marketing: 1000000,    // Investimento em marketing
    expansion: 3,          // Estados para expansão
    elasticity: -1.2       // Elasticidade preço-demanda
  });

  const [results, setResults] = useState(null);

  // Dados base - NUTRIMENTAL (Dados Scanntech atualizados)
  const baseData = {
    revenue: 114931609,    // R$ 114.9M (Total Nutrimental YTD)
    volume: 1581352,       // kg vendidos (Total Nutrimental)
    marketShare: 28.9,     // 28.9% share de mercado
    avgPrice: 105.64,      // R$ 105.64/kg (Preço médio ponderado)
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
    return 'text-slate-600';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Alto': return 'bg-red-100 text-red-800 border-red-300';
      case 'Médio': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-purple-900 mb-3">
            🎯 Simulador
          </h2>
          <p className="text-base text-slate-600">
            Simule o impacto de mudanças de preço, investimentos e expansão no volume de vendas, receita e market share
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Parâmetros */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
              <h3 className="font-semibold text-purple-900 text-2xl mb-6 flex items-center gap-2">
                <span>⚙️</span>
                Parâmetros da Simulação
              </h3>
              
              {/* Mudança de Preço */}
              <div className="mb-6">
                <label className="block text-base font-semibold text-purple-700 mb-3">
                  📊 Mudança no Preço (%)
                </label>
                <input
                  type="range"
                  min="-30"
                  max="50"
                  step="1"
                  value={params.priceChange}
                  onChange={(e) => updateParam('priceChange', e.target.value)}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>-30%</span>
                  <span className="font-bold text-purple-700 text-base">
                    {params.priceChange > 0 ? '+' : ''}{params.priceChange}%
                  </span>
                  <span>+50%</span>
                </div>
                <div className="text-base text-slate-700 mt-3 p-3 bg-purple-50 rounded-md">
                  Preço atual: <span className="font-semibold">R$ {baseData.avgPrice.toFixed(2)}</span> → 
                  <span className={`font-bold ${getImpactColor(params.priceChange)}`}>
                    {' '}R$ {results?.price.new.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Elasticidade */}
              <div className="mb-6">
                <label className="block text-base font-semibold text-purple-700 mb-3">
                  📈 Elasticidade Preço-Demanda
                </label>
                <select
                  value={params.elasticity}
                  onChange={(e) => updateParam('elasticity', e.target.value)}
                  className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                >
                  {elasticityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.desc}
                    </option>
                  ))}
                </select>
                <div className="text-sm text-slate-500 mt-2 italic">
                  Elasticidade mede a sensibilidade da demanda às mudanças de preço
                </div>
              </div>

              {/* Investimento */}
              <div className="mb-6">
                <label className="block text-base font-semibold text-purple-700 mb-3">
                  💰 Investimento em Produto (R$)
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="500000"
                  value={params.investment}
                  onChange={(e) => updateParam('investment', e.target.value)}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="text-base font-bold text-purple-700 mt-2">
                  R$ {(params.investment / 1000000).toFixed(1)}M
                </div>
              </div>

              {/* Marketing */}
              <div className="mb-6">
                <label className="block text-base font-semibold text-purple-700 mb-3">
                  📢 Investimento em Marketing (R$)
                </label>
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="250000"
                  value={params.marketing}
                  onChange={(e) => updateParam('marketing', e.target.value)}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="text-base font-bold text-purple-700 mt-2">
                  R$ {(params.marketing / 1000000).toFixed(1)}M
                </div>
              </div>

              {/* Expansão */}
              <div>
                <label className="block text-base font-semibold text-purple-700 mb-3">
                  🗺️ Estados para Expansão
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={params.expansion}
                  onChange={(e) => updateParam('expansion', e.target.value)}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="text-base font-bold text-purple-700 mt-2">
                  {params.expansion} estados
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-cyan-500">
              <h3 className="font-semibold text-cyan-900 text-2xl mb-6 flex items-center gap-2">
                <span>📊</span>
                Resultados da Simulação
              </h3>
              
              {results && (
                <div className="space-y-4">
                  {/* Impacto no Volume */}
                  <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg border-2 border-cyan-200">
                    <div className="text-base text-cyan-700 font-semibold mb-3">📦 Impacto no Volume</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-cyan-600 mb-1">Volume Atual</div>
                        <div className="text-2xl font-bold text-cyan-800">
                          {results.volume.old.toLocaleString()} un
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-cyan-600 mb-1">Volume Projetado</div>
                        <div className="text-2xl font-bold text-cyan-800">
                          {results.volume.new.toLocaleString()} un
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm font-bold mt-3 ${getImpactColor(results.volume.change)}`}>
                      {results.volume.change > 0 ? '+' : ''}{results.volume.change.toFixed(1)}% 
                      ({results.volume.change > 0 ? '+' : ''}{(results.volume.new - results.volume.old).toLocaleString()} un)
                    </div>
                    <div className="text-xs text-cyan-600 mt-2 italic">
                      Elasticidade: {results.volume.elasticityImpact.toFixed(1)}% por {params.priceChange}% de preço
                    </div>
                  </div>

                  {/* Receita Projetada */}
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                    <div className="text-base text-green-700 font-semibold mb-2">💵 Receita Projetada</div>
                    <div className="text-4xl font-bold text-green-800">
                      R$ {(results.revenue.new / 1000000).toFixed(1)}M
                    </div>
                    <div className={`text-base font-bold mt-2 ${getImpactColor(results.revenue.change)}`}>
                      {results.revenue.change > 0 ? '+' : ''}{results.revenue.change.toFixed(1)}% vs atual
                    </div>
                    <div className="text-xs text-green-600 mt-2 italic">
                      Apenas elasticidade: R$ {(results.revenue.elasticityOnly / 1000000).toFixed(1)}M
                    </div>
                  </div>

                  {/* Market Share */}
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300">
                    <div className="text-base text-purple-700 font-semibold mb-2">🎯 Market Share</div>
                    <div className="text-4xl font-bold text-purple-800">
                      {results.marketShare.new.toFixed(1)}%
                    </div>
                    <div className={`text-base font-bold mt-2 ${getImpactColor(results.marketShare.change)}`}>
                      {results.marketShare.change > 0 ? '+' : ''}{results.marketShare.change.toFixed(1)} pontos
                    </div>
                  </div>

                  {/* ROI e Payback */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border-2 border-yellow-300">
                      <div className="text-sm text-yellow-700 font-semibold mb-1">💎 ROI</div>
                      <div className="text-3xl font-bold text-yellow-800">
                        {results.financial.roi.toFixed(0)}%
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border-2 border-orange-300">
                      <div className="text-sm text-orange-700 font-semibold mb-1">⏱️ Payback</div>
                      <div className="text-3xl font-bold text-orange-800">
                        {results.financial.payback.toFixed(1)} meses
                      </div>
                    </div>
                  </div>

                  {/* Nível de Risco */}
                  <div className={`p-4 rounded-lg border-2 ${getRiskColor(results.financial.risk)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold mb-1">⚠️ Nível de Risco</div>
                        <div className="text-2xl font-bold">{results.financial.risk}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold mb-1">Investimento total</div>
                        <div className="text-xl font-bold">
                          R$ {(results.financial.totalInvestment / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-amber-300">
                    <div className="text-base text-amber-800 font-semibold mb-2">💡 Insights</div>
                    <ul className="text-sm text-amber-700 space-y-1">
                      {results.financial.roi > 200 && (
                        <li>✅ ROI muito alto pode indicar projeção otimista</li>
                      )}
                      {results.financial.payback < 6 && (
                        <li>✅ Payback rápido indica baixo risco financeiro</li>
                      )}
                      {Math.abs(params.priceChange) > 15 && (
                        <li>⚠️ Mudanças de preço acima de 15% podem gerar resistência do mercado</li>
                      )}
                      {results.marketShare.new > 60 && (
                        <li>🎯 Share projetado muito alto pode atrair regulação antitruste</li>
                      )}
                      {results.volume.change < -20 && (
                        <li>⚠️ Queda de volume acima de 20% pode comprometer operação</li>
                      )}
                    </ul>
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
