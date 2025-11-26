import React, { useState } from 'react';
import { getAmazonDataByCategoria, formatarNomeProduto, formatarVariacao, getAmazonMetrics } from '../data/amazonData';

const AnaliseAmazon = ({ selectedCategory = 'total', selectedPeriod = 'mes_yoy' }) => {
  const [selectedMetric, setSelectedMetric] = useState('top10');

  // Mapear categorias do dashboard para categorias do Amazon
  const categoriaMap = {
    'total': 'Todos',
    'cereais': 'Cereais',
    'frutas': 'Frutas',
    'nuts': 'Nuts',
    'proteina': 'Proteína'
  };
  
  const categoriaAmazon = categoriaMap[selectedCategory] || 'Todos';
  
  // Obter dados filtrados por categoria
  const dadosAmazon = getAmazonDataByCategoria(categoriaAmazon);
  const metrics = getAmazonMetrics(categoriaAmazon);

  return (
    <div className="space-y-6">
      {/* Card Principal */}
      <div className="rounded-lg border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Amazon E-commerce - Performance de Produtos
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold bg-orange-200 text-orange-900 border border-orange-400">
                Amazon
              </span>
              <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold bg-cyan-100 text-cyan-700 border border-cyan-300">
                Nutrimental
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Análise comparativa Agosto 2024 vs Agosto 2025 - Vendas por produto
          </p>
        </div>
        
        <div className="p-6 pt-0">
          {/* Insight Destacado - Movido para o topo */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300">
            <div className="flex items-start space-x-3">
              <div className="text-3xl">💡</div>
              <div>
                <h5 className="font-semibold text-blue-900 mb-1">Insight Principal</h5>
                <p className="text-sm text-blue-800">
                  Os <strong>{metrics.qtdProdutos} produtos mais vendidos</strong> em Agosto/2025 representam <strong>{metrics.totalUnidades2025.toLocaleString('pt-BR')} unidades</strong>,
                  com crescimento médio de <strong className="text-green-600">{metrics.variacaoTotal > 0 ? '+' : ''}{metrics.variacaoTotal}%</strong> vs mesmo período de 2024.
                  Destaque para categorias <strong>Cereais</strong> e <strong>Proteína</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600">Unidades 2025</div>
              <div className="text-2xl font-bold text-orange-600">
                {metrics.totalUnidades2025.toLocaleString('pt-BR')}
              </div>
              <div className="text-xs text-slate-500">Agosto 2025</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600">Unidades 2024</div>
              <div className="text-2xl font-bold text-slate-600">
                {metrics.totalUnidades2024.toLocaleString('pt-BR')}
              </div>
              <div className="text-xs text-slate-500">Agosto 2024</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg border-2 border-green-300">
              <div className="text-sm text-green-700 font-medium">Variação Total</div>
              <div className="flex items-center space-x-2">
                <div className={`text-3xl font-bold ${metrics.variacaoTotal > 0 ? 'text-green-900' : 'text-red-900'}`}>
                  {metrics.variacaoTotal > 0 ? '+' : ''}{metrics.variacaoTotal}%
                </div>
                {metrics.variacaoTotal > 50 && <span className="text-2xl">🔥</span>}
              </div>
              <div className="text-xs text-green-600 mt-1">Crescimento YoY</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600">Produtos</div>
              <div className="text-2xl font-bold text-orange-600">
                {metrics.qtdProdutos}
              </div>
              <div className="text-xs text-slate-500">Top vendidos</div>
            </div>
          </div>

          {/* Seletor de Análise - Abas maiores e mais descritivas */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button 
              className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                selectedMetric === 'top10' 
                  ? 'bg-orange-500 text-white border-2 border-orange-600 shadow-md' 
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-orange-50 hover:border-orange-300'
              }`}
              onClick={() => setSelectedMetric('top10')}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">🔥</span>
                <span>Top 10 Mais Vendidos</span>
              </div>
            </button>
            <button 
              className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                selectedMetric === 'crescimento' 
                  ? 'bg-orange-500 text-white border-2 border-orange-600 shadow-md' 
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-orange-50 hover:border-orange-300'
              }`}
              onClick={() => setSelectedMetric('crescimento')}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">📈</span>
                <span>Top 3 Crescimentos</span>
              </div>
            </button>
            <button 
              className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                selectedMetric === 'quedas' 
                  ? 'bg-orange-500 text-white border-2 border-orange-600 shadow-md' 
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-orange-50 hover:border-orange-300'
              }`}
              onClick={() => setSelectedMetric('quedas')}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">📉</span>
                <span>Top 3 Quedas</span>
              </div>
            </button>
          </div>

          {/* Conteúdo da Análise */}
          {selectedMetric === 'top10' && (() => {
            // Função para obter badge de categoria
            const getCategoryBadge = (categoria) => {
              const badges = {
                'Cereais': { emoji: '🌾', color: 'bg-amber-100 text-amber-700 border-amber-300' },
                'Proteína': { emoji: '💪', color: 'bg-green-100 text-green-700 border-green-300' },
                'Frutas': { emoji: '🍓', color: 'bg-pink-100 text-pink-700 border-pink-300' },
                'Nuts': { emoji: '🥜', color: 'bg-purple-100 text-purple-700 border-purple-300' }
              };
              return badges[categoria] || { emoji: '', color: 'bg-slate-100 text-slate-700 border-slate-300' };
            };

            // Função para obter ícone de ranking
            const getRankingIcon = (ranking) => {
              if (ranking === 1) return '🥇';
              if (ranking === 2) return '🥈';
              if (ranking === 3) return '🥉';
              return `#${ranking}`;
            };

            // Função para obter ícone de variação
            const getVariationIcon = (variation) => {
              if (variation > 1000) return '🔥🔥🔥';
              if (variation > 100) return '🔥🔥';
              if (variation > 50) return '🔥';
              if (variation > 0) return '📈';
              return '📉';
            };

            return (
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Top 10 Produtos Mais Vendidos (Agosto 2025)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr className="border-b border-slate-200">
                        <th className="text-left p-3 font-semibold text-slate-700">Rank</th>
                        <th className="text-left p-3 font-semibold text-slate-700">Produto</th>
                        <th className="text-left p-3 font-semibold text-slate-700">Categoria</th>
                        <th className="text-right p-3 font-semibold text-slate-700">2025</th>
                        <th className="text-right p-3 font-semibold text-slate-700">2024</th>
                        <th className="text-right p-3 font-semibold text-slate-700">Variação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dadosAmazon.top10.map((produto, index) => {
                        const { texto, cor, seta } = formatarVariacao(produto.Variacao_Pct);
                        const categoryBadge = getCategoryBadge(produto.Categoria);
                        const ranking = index + 1;
                        const variationIcon = getVariationIcon(produto.Variacao_Pct);
                        
                        return (
                          <tr key={index} className={`border-b border-slate-100 hover:bg-orange-50 transition-colors ${
                            ranking <= 3 ? 'bg-yellow-50' : ''
                          }`}>
                            <td className="p-3">
                              <span className="text-lg font-bold">{getRankingIcon(ranking)}</span>
                            </td>
                            <td className="p-3 font-medium text-slate-900">
                              {formatarNomeProduto(produto['Nome do produto'])}
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium border ${categoryBadge.color}`}>
                                {categoryBadge.emoji} {produto.Categoria}
                              </span>
                            </td>
                            <td className="p-3 text-right font-semibold text-orange-600">
                              {produto['Unidades enviadas_2025'].toLocaleString('pt-BR')}
                            </td>
                            <td className="p-3 text-right text-slate-600">
                              {produto['Unidades enviadas_2024'].toLocaleString('pt-BR')}
                            </td>
                            <td className={`p-3 text-right font-semibold ${cor}`}>
                              <div className="flex items-center justify-end space-x-1">
                                <span>{variationIcon}</span>
                                <span>{seta} {texto}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}

          {selectedMetric === 'crescimento' && (
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900">Top 3 Produtos com Maior Crescimento (2024 → 2025)</h4>
              
              <div className="space-y-3">
                {dadosAmazon.crescimentos.map((produto, index) => {
                  const { texto, cor, seta } = formatarVariacao(produto.Variacao_Pct);
                  return (
                    <div key={index} className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-green-600">#{index + 1}</span>
                          <span className="px-2 py-0.5 bg-white text-slate-700 rounded text-xs border">
                            {produto.Categoria}
                          </span>
                        </div>
                        <div className={`text-xl font-bold ${cor}`}>
                          {seta} {texto}
                        </div>
                      </div>
                      <div className="font-medium text-slate-900 mb-2">
                        {formatarNomeProduto(produto['Nome do produto'])}
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">2024: </span>
                          <span className="font-semibold">{produto['Unidades enviadas_2024'].toLocaleString('pt-BR')} un</span>
                        </div>
                        <div>
                          <span className="text-slate-600">2025: </span>
                          <span className="font-semibold text-green-600">{produto['Unidades enviadas_2025'].toLocaleString('pt-BR')} un</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">🚀 Oportunidades</h5>
                <p className="text-sm text-green-700">
                  Produtos com crescimento acelerado indicam <strong>tendências de mercado</strong> e 
                  oportunidades para expansão de portfólio. Considere aumentar investimento em marketing 
                  e distribuição para estes produtos.
                </p>
              </div>
            </div>
          )}

          {selectedMetric === 'quedas' && (
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900">Top 3 Produtos com Maior Queda (2024 → 2025)</h4>
              
              <div className="space-y-3">
                {dadosAmazon.quedas.map((produto, index) => {
                  const { texto, cor, seta } = formatarVariacao(produto.Variacao_Pct);
                  return (
                    <div key={index} className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-red-600">#{index + 1}</span>
                          <span className="px-2 py-0.5 bg-white text-slate-700 rounded text-xs border">
                            {produto.Categoria}
                          </span>
                        </div>
                        <div className={`text-xl font-bold ${cor}`}>
                          {seta} {texto}
                        </div>
                      </div>
                      <div className="font-medium text-slate-900 mb-2">
                        {formatarNomeProduto(produto['Nome do produto'])}
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">2024: </span>
                          <span className="font-semibold">{produto['Unidades enviadas_2024'].toLocaleString('pt-BR')} un</span>
                        </div>
                        <div>
                          <span className="text-slate-600">2025: </span>
                          <span className="font-semibold text-red-600">{produto['Unidades enviadas_2025'].toLocaleString('pt-BR')} un</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h5 className="font-medium text-yellow-800 mb-2">⚠️ Atenção</h5>
                <p className="text-sm text-yellow-700">
                  Produtos com queda significativa podem indicar <strong>descontinuação</strong>, 
                  <strong>problemas de estoque</strong> ou <strong>mudança de preferência do consumidor</strong>. 
                  Recomenda-se análise detalhada para decisão estratégica.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnaliseAmazon;
