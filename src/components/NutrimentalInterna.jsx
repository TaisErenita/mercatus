import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { DollarSign, Package, Users, TrendingUp, TrendingDown, ChevronDown, ChevronUp } from 'lucide-react';

const NutrimentalInterna = ({ data }) => {
  const { receita_por_canal, receita_por_regiao, volume_por_canal, volume_por_regiao, clientes, top10_mais_vendidos, top10_menos_vendidos } = data;
  
  const [selectedTab, setSelectedTab] = useState('mais');
  const [showAllCanais, setShowAllCanais] = useState(false);
  const [showAllRegioes, setShowAllRegioes] = useState(false);

  // Calcular total de receita
  const receitaTotal = receita_por_canal.total;

  // Helper para obter cor da categoria
  const getCategoryBadge = (categoria) => {
    const categoryMap = {
      'Cereais': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', emoji: '🌾' },
      'Frutas': { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300', emoji: '🍓' },
      'Nuts': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', emoji: '🥜' },
      'Proteína': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', emoji: '💪' }
    };
    
    const cat = categoryMap[categoria] || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', emoji: '📦' };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium border ${cat.bg} ${cat.text} ${cat.border}`}>
        {cat.emoji} {categoria}
      </span>
    );
  };

  // Helper para obter medalha
  const getMedal = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  // Componente de Barra de Progresso
  const ProgressBar = ({ percentage, color = 'purple' }) => {
    const colorMap = {
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600'
    };
    
    return (
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className={`bg-gradient-to-r ${colorMap[color]} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Nutrimental - Performance Interna</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-200 text-purple-900 border-purple-400 text-xs font-semibold">Dados Internos</Badge>
            <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-xs">YTD 2025 (Fixo)</Badge>
          </div>
        </div>
        <CardDescription>Dados comerciais internos da Nutrimental - Agosto 2025</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Insight Principal */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300">
          <div className="flex items-start space-x-3">
            <div className="text-3xl">💡</div>
            <div>
              <h5 className="font-semibold text-blue-900 mb-1">Insight Principal</h5>
              <p className="text-sm text-blue-800">
                Receita total de <strong>R$ {(receitaTotal / 1000000).toFixed(2)}M</strong> em Agosto/2025. 
                Canal <strong>Distribuidor</strong> lidera com {receita_por_canal.canais[0]?.percentual.toFixed(0)}% da receita, 
                enquanto a região <strong>Norte</strong> representa {receita_por_regiao.regioes[0]?.percentual.toFixed(0)}% do faturamento total.
              </p>
            </div>
          </div>
        </div>

        {/* Métricas Principais com Gradiente */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Receita Total */}
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-2 border-purple-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-purple-700 font-medium">Receita Total</div>
              <div className="text-2xl">💰</div>
            </div>
            <div className="text-3xl font-bold text-purple-900">
              R$ {(receita_por_canal.total / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-purple-600 mt-1">
              Agosto 2025
            </div>
          </div>

          {/* Volume Total */}
          <div className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border-2 border-indigo-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-indigo-700 font-medium">Volume Total</div>
              <div className="text-2xl">📦</div>
            </div>
            <div className="text-3xl font-bold text-indigo-900">
              {(volume_por_canal.total / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-indigo-600 mt-1">
              unidades
            </div>
          </div>

          {/* Clientes Diretos */}
          <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg border-2 border-cyan-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-cyan-700 font-medium">Clientes Diretos</div>
              <div className="text-2xl">👤</div>
            </div>
            <div className="text-3xl font-bold text-cyan-900">
              {clientes.diretos}
            </div>
            <div className="text-xs text-cyan-600 mt-1">
              ativos
            </div>
          </div>

          {/* Total de Clientes */}
          <div className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border-2 border-teal-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-teal-700 font-medium">Total de Clientes</div>
              <div className="text-2xl">👥</div>
            </div>
            <div className="text-3xl font-bold text-teal-900">
              {clientes.total}
            </div>
            <div className="text-xs text-teal-600 mt-1">
              diretos + indiretos
            </div>
          </div>
        </div>

        {/* Performance por Canal - Top 3 com Gráfico de Barras */}
        <div className="p-4 bg-white rounded-lg border-2 border-purple-200">
          <h4 className="text-md font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <span className="text-xl">📊</span>
            <span>Performance por Canal (Top 3)</span>
          </h4>
          <div className="space-y-3">
            {receita_por_canal.canais.slice(0, 3).map((canal, index) => {
              const volumeCanal = volume_por_canal.canais.find(v => v.nome === canal.nome);
              const percentage = canal.percentual;
              
              return (
                <div key={index} className={`p-3 rounded-lg ${index < 3 ? 'bg-purple-50' : 'bg-white'}`}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{getMedal(index)}</span>
                      <span className="font-medium text-slate-900">{canal.nome}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-purple-600">R$ {(canal.valor / 1000000).toFixed(2)}M</span>
                      <span className="text-slate-500">({percentage.toFixed(0)}%)</span>
                    </div>
                  </div>
                  <ProgressBar percentage={percentage} color="purple" />
                </div>
              );
            })}
          </div>
          
          <button 
            className="mt-3 text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center space-x-1"
            onClick={() => setShowAllCanais(!showAllCanais)}
          >
            {showAllCanais ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showAllCanais ? 'Ver menos' : 'Ver todos os canais'}</span>
          </button>

          {showAllCanais && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-purple-200">
                    <th className="text-left py-2 px-3 font-semibold text-slate-700">Rank</th>
                    <th className="text-left py-2 px-3 font-semibold text-slate-700">Canal</th>
                    <th className="text-right py-2 px-3 font-semibold text-purple-600">Receita</th>
                    <th className="text-right py-2 px-3 font-semibold text-indigo-600">Volume</th>
                    <th className="text-right py-2 px-3 font-semibold text-slate-600">% Receita</th>
                  </tr>
                </thead>
                <tbody>
                  {receita_por_canal.canais.map((canal, index) => {
                    const volumeCanal = volume_por_canal.canais.find(v => v.nome === canal.nome);
                    return (
                      <tr key={index} className="border-b border-slate-100 hover:bg-purple-50">
                        <td className="py-2 px-3 font-bold">{getMedal(index)}</td>
                        <td className="py-2 px-3">{canal.nome}</td>
                        <td className="py-2 px-3 text-right font-bold text-purple-600">R$ {(canal.valor / 1000000).toFixed(2)}M</td>
                        <td className="py-2 px-3 text-right font-bold text-indigo-600">{volumeCanal ? (volumeCanal.volume / 1000).toFixed(0) : 0}k un</td>
                        <td className="py-2 px-3 text-right text-slate-600">{canal.percentual.toFixed(0)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Performance por Região - Top 3 com Gráfico de Barras */}
        <div className="p-4 bg-white rounded-lg border-2 border-green-200">
          <h4 className="text-md font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <span className="text-xl">🗺️</span>
            <span>Performance por Região (Top 3)</span>
          </h4>
          <div className="space-y-3">
            {receita_por_regiao.regioes.slice(0, 3).map((regiao, index) => {
              const volumeRegiao = volume_por_regiao.regioes.find(v => v.nome === regiao.nome);
              const percentage = regiao.percentual;
              
              return (
                <div key={index} className={`p-3 rounded-lg ${index < 3 ? 'bg-green-50' : 'bg-white'}`}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{getMedal(index)}</span>
                      <span className="font-medium text-slate-900">{regiao.nome}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-green-600">R$ {(regiao.valor / 1000000).toFixed(2)}M</span>
                      <span className="text-slate-500">({percentage.toFixed(0)}%)</span>
                    </div>
                  </div>
                  <ProgressBar percentage={percentage} color="green" />
                </div>
              );
            })}
          </div>
          
          <button 
            className="mt-3 text-sm text-green-600 hover:text-green-800 font-medium flex items-center space-x-1"
            onClick={() => setShowAllRegioes(!showAllRegioes)}
          >
            {showAllRegioes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showAllRegioes ? 'Ver menos' : 'Ver todas as regiões'}</span>
          </button>

          {showAllRegioes && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-green-200">
                    <th className="text-left py-2 px-3 font-semibold text-slate-700">Rank</th>
                    <th className="text-left py-2 px-3 font-semibold text-slate-700">Região</th>
                    <th className="text-right py-2 px-3 font-semibold text-green-600">Receita</th>
                    <th className="text-right py-2 px-3 font-semibold text-blue-600">Volume</th>
                    <th className="text-right py-2 px-3 font-semibold text-slate-600">% Receita</th>
                  </tr>
                </thead>
                <tbody>
                  {receita_por_regiao.regioes.map((regiao, index) => {
                    const volumeRegiao = volume_por_regiao.regioes.find(v => v.nome === regiao.nome);
                    return (
                      <tr key={index} className="border-b border-slate-100 hover:bg-green-50">
                        <td className="py-2 px-3 font-bold">{getMedal(index)}</td>
                        <td className="py-2 px-3">{regiao.nome}</td>
                        <td className="py-2 px-3 text-right font-bold text-green-600">R$ {(regiao.valor / 1000000).toFixed(2)}M</td>
                        <td className="py-2 px-3 text-right font-bold text-blue-600">{volumeRegiao ? (volumeRegiao.volume / 1000).toFixed(0) : 0}k un</td>
                        <td className="py-2 px-3 text-right text-slate-600">{regiao.percentual.toFixed(0)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top 10 Produtos - Sistema de Abas */}
        <div className="p-4 bg-white rounded-lg border-2 border-purple-200">
          <div className="flex gap-3 mb-4">
            <button 
              className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                selectedTab === 'mais' 
                  ? 'bg-purple-500 text-white border-2 border-purple-600 shadow-md' 
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-purple-50'
              }`}
              onClick={() => setSelectedTab('mais')}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">📈</span>
                <span>Top 10 Mais Vendidos</span>
              </div>
            </button>
            <button 
              className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                selectedTab === 'menos' 
                  ? 'bg-purple-500 text-white border-2 border-purple-600 shadow-md' 
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-purple-50'
              }`}
              onClick={() => setSelectedTab('menos')}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">📉</span>
                <span>Top 10 Menos Vendidos</span>
              </div>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-purple-200">
                  <th className="text-left py-3 px-3 font-semibold text-slate-700">Rank</th>
                  <th className="text-left py-3 px-3 font-semibold text-slate-700">Produto</th>
                  <th className="text-left py-3 px-3 font-semibold text-slate-700">Categoria</th>
                  <th className="text-right py-3 px-3 font-semibold text-purple-600">Receita</th>
                  <th className="text-right py-3 px-3 font-semibold text-slate-600">% Total</th>
                </tr>
              </thead>
              <tbody>
                {(selectedTab === 'mais' ? top10_mais_vendidos : top10_menos_vendidos).map((item, index) => {
                  const percentualTotal = ((item.receita / receitaTotal) * 100);
                  
                  return (
                    <tr key={index} className={`border-b border-slate-100 hover:bg-purple-50 ${index < 3 ? 'bg-yellow-50' : ''}`}>
                      <td className="py-3 px-3">
                        <span className="text-lg font-bold">{getMedal(index)}</span>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-900">{item.produto}</td>
                      <td className="py-3 px-3">{getCategoryBadge(item.categoria)}</td>
                      <td className="py-3 px-3 text-right">
                        <div className="font-bold text-purple-600">R$ {(item.receita / 1000).toFixed(1)}k</div>
                        <div className="text-xs text-slate-500">{(item.volume / 1000).toFixed(1)}k un</div>
                      </td>
                      <td className="py-3 px-3 text-right text-slate-600">{percentualTotal.toFixed(2)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informação Adicional */}
        <div className="p-4 bg-white rounded-lg border-2 border-purple-200">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-slate-900 mb-1">Fonte de Dados</h5>
              <p className="text-sm text-slate-600">
                Dados extraídos da base interna <strong>YTD2025_atualizada08_25.xlsb</strong>. 
                Valores refletem o desempenho comercial da Nutrimental (Agosto 2025), 
                incluindo receita e volume por canal e região, número de clientes ativos e ranking de produtos.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutrimentalInterna;
