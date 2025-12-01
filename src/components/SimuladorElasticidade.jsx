import React, { useState, useEffect } from 'react';

const SimuladorElasticidade = () => {
  const [selectedCategory, setSelectedCategory] = useState('TODAS');
  const [params, setParams] = useState({
    priceChange: 0,        // % mudança no preço
    investment: 2000000,   // Investimento em R$
    marketing: 1000000,    // Investimento em marketing
    expansion: 3,          // Estados para expansão
    elasticity: -1.2       // Elasticidade preço-demanda
  });

  const [results, setResults] = useState(null);

  // Dados por categoria (Último Ano Móvel - BARRAS)
  const categoryData = {
    'TODAS': {
      name: 'Todas as Categorias',
      revenue: 142509966,    // R$ 142.5M
      volume: 2921408,       // kg vendidos
      avgPrice: 48.79,       // R$ 48.79/kg
      marketShare: 32.2,     // 32.2% share REAL Scanntech (YTD Brasil)
      elasticityCoeff: -1.2
    },
    'BC': {
      name: 'Barras Cereais',
      revenue: 90900000,     // R$ 90.9M (63.8%)
      volume: 2160000,       // kg estimado
      avgPrice: 42.08,       // R$ 42.08/kg
      marketShare: 42.0,     // 42.0% share REAL Scanntech (Cereais)
      elasticityCoeff: -1.0  // menos elástica (produto mais básico)
    },
    'BP': {
      name: 'Barras Proteína',
      revenue: 19000000,     // R$ 19.0M (13.3%)
      volume: 184600,        // kg estimado
      avgPrice: 102.91,      // R$ 102.91/kg
      marketShare: 5.6,      // 5.6% share REAL Scanntech (Proteína)
      elasticityCoeff: -1.5  // mais elástica (produto premium)
    },

    'BN': {
      name: 'Barras Nuts',
      revenue: 9600000,      // R$ 9.6M (6.7%)
      volume: 134200,        // kg estimado
      avgPrice: 71.51,       // R$ 71.51/kg
      marketShare: 9.9,      // 9.9% share REAL Scanntech (Nuts)
      elasticityCoeff: -1.4  // elástica (produto premium)
    },
    'BF': {
      name: 'Barras Frutas',
      revenue: 6900000,      // R$ 6.9M (4.9%)
      volume: 107300,        // kg estimado
      avgPrice: 64.32,       // R$ 64.32/kg
      marketShare: 31.6,     // 31.6% share REAL Scanntech (Frutas)
      elasticityCoeff: -1.3
    }
  };

  const baseData = categoryData[selectedCategory];

  const elasticityOptions = [
    { value: -0.5, label: 'Baixa (-0.5)', desc: 'Produto essencial/viciante' },
    { value: -1.0, label: 'Unitária (-1.0)', desc: 'Produto padrão' },
    { value: -1.2, label: 'Moderada (-1.2)', desc: 'Alimento premium' },
    { value: -1.5, label: 'Alta (-1.5)', desc: 'Produto de luxo' },
    { value: -2.0, label: 'Muito Alta (-2.0)', desc: 'Produto supérfluo' }
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
    const finalShare = Math.min(100, baseData.marketShare * (1 + shareImpact + volumeShareImpact));
    
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
  }, [params, selectedCategory]);

  const updateParam = (param, value) => {
    setParams(prev => ({
      ...prev,
      [param]: parseFloat(value) || 0
    }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Ajustar elasticidade padrão da categoria
    setParams(prev => ({
      ...prev,
      elasticity: categoryData[category].elasticityCoeff
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
            🎯 Simulador de Elasticidade
          </h2>
          <p className="text-base text-slate-600">
            Simule o impacto de mudanças de preço, investimentos e expansão no volume de vendas, receita e market share
          </p>
        </div>

        {/* Filtro de Categoria */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-purple-500">
          <label className="block text-lg font-semibold text-purple-900 mb-3">
            📊 Categoria de Barras
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.keys(categoryData).map((key) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === key
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                <div className="text-sm font-bold">{key}</div>
                <div className="text-xs opacity-90">{categoryData[key].name}</div>
              </button>
            ))}
          </div>
          
          {/* Dados da Categoria Selecionada */}
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-purple-600 font-medium">Receita Base:</span>
                <div className="text-purple-900 font-bold">R$ {(baseData.revenue / 1000000).toFixed(1)}M</div>
              </div>
              <div>
                <span className="text-purple-600 font-medium">Volume Base:</span>
                <div className="text-purple-900 font-bold">{(baseData.volume / 1000).toFixed(0)}k kg</div>
              </div>
              <div>
                <span className="text-purple-600 font-medium">Preço Médio:</span>
                <div className="text-purple-900 font-bold">R$ {baseData.avgPrice.toFixed(2)}/kg</div>
              </div>
              <div>
                <span className="text-purple-600 font-medium">Market Share:</span>
                <div className="text-purple-900 font-bold">{baseData.marketShare.toFixed(1)}%</div>
              </div>
            </div>
          </div>
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
                  Elasticidade padrão da categoria: {baseData.elasticityCoeff.toFixed(1)}
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
                          {(results.volume.old / 1000).toFixed(0)}k kg
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-cyan-600 mb-1">Volume Projetado</div>
                        <div className={`text-2xl font-bold ${getImpactColor(results.volume.change)}`}>
                          {(results.volume.new / 1000).toFixed(0)}k kg
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-cyan-200">
                      <span className="text-sm text-cyan-600">Variação: </span>
                      <span className={`text-base font-bold ${getImpactColor(results.volume.change)}`}>
                        {results.volume.change > 0 ? '+' : ''}{results.volume.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Impacto na Receita */}
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                    <div className="text-base text-green-700 font-semibold mb-3">💰 Impacto na Receita</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-green-600 mb-1">Receita Atual</div>
                        <div className="text-2xl font-bold text-green-800">
                          R$ {(results.revenue.old / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-green-600 mb-1">Receita Projetada</div>
                        <div className={`text-2xl font-bold ${getImpactColor(results.revenue.change)}`}>
                          R$ {(results.revenue.new / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <span className="text-sm text-green-600">Variação: </span>
                      <span className={`text-base font-bold ${getImpactColor(results.revenue.change)}`}>
                        {results.revenue.change > 0 ? '+' : ''}{results.revenue.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Market Share */}
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                    <div className="text-base text-purple-700 font-semibold mb-3">📈 Market Share</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-purple-600 mb-1">Share Atual</div>
                        <div className="text-2xl font-bold text-purple-800">
                          {results.marketShare.old.toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-purple-600 mb-1">Share Projetado</div>
                        <div className={`text-2xl font-bold ${getImpactColor(results.marketShare.change)}`}>
                          {results.marketShare.new.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-purple-200">
                      <span className="text-sm text-purple-600">Variação: </span>
                      <span className={`text-base font-bold ${getImpactColor(results.marketShare.change)}`}>
                        {results.marketShare.change > 0 ? '+' : ''}{results.marketShare.change.toFixed(1)} p.p.
                      </span>
                    </div>
                  </div>

                  {/* Análise Financeira */}
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border-2 border-orange-200">
                    <div className="text-base text-orange-700 font-semibold mb-3">💼 Análise Financeira</div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-orange-600">Investimento Total:</span>
                        <span className="text-base font-bold text-orange-800">
                          R$ {(results.financial.totalInvestment / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-orange-600">ROI Projetado:</span>
                        <span className={`text-base font-bold ${getImpactColor(results.financial.roi)}`}>
                          {results.financial.roi.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-orange-600">Payback:</span>
                        <span className="text-base font-bold text-orange-800">
                          {results.financial.payback.toFixed(1)} meses
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-orange-200">
                        <span className="text-sm text-orange-600">Nível de Risco:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getRiskColor(results.financial.risk)}`}>
                          {results.financial.risk}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recomendações */}
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                    <div className="text-base text-blue-700 font-semibold mb-3">💡 Recomendações</div>
                    <div className="space-y-2 text-sm text-blue-800">
                      {results.financial.risk === 'Alto' && (
                        <p>⚠️ <strong>Risco Alto:</strong> Considere reduzir o aumento de preço ou aumentar investimentos em marketing.</p>
                      )}
                      {results.financial.roi > 150 && (
                        <p>✅ <strong>ROI Excelente:</strong> Cenário muito favorável para implementação.</p>
                      )}
                      {results.volume.change < -10 && (
                        <p>⚠️ <strong>Queda de Volume:</strong> Aumento de preço pode impactar significativamente as vendas.</p>
                      )}
                      {results.marketShare.change > 2 && (
                        <p>📈 <strong>Ganho de Share:</strong> Investimentos podem aumentar participação de mercado.</p>
                      )}
                      {results.financial.risk === 'Baixo' && results.financial.roi > 100 && (
                        <p>🎯 <strong>Cenário Ideal:</strong> Baixo risco com retorno atrativo. Recomendado para execução.</p>
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
