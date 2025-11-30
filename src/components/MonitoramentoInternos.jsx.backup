import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import { getNutrimentalInternaData } from '../data/nutrimentalInternaData';

export default function MonitoramentoInternos({ onVoltar }) {
  const [selectedCategoria, setSelectedCategoria] = useState('total');
  const [selectedPeriodo, setSelectedPeriodo] = useState('mes');
  const [selectedMes, setSelectedMes] = useState('agosto');
  const [selectedCanal, setSelectedCanal] = useState('todos');
  const [selectedRegiao, setSelectedRegiao] = useState('todas');

  const dadosInternos = getNutrimentalInternaData();

  const canais = [
    { id: 'todos', label: 'Todos' },
    { id: 'distribuidor', label: 'Distribuidor' },
    { id: 'c&c', label: 'C&C' },
    { id: 'doceiro', label: 'Doceiro' },
    { id: 'ka', label: 'KA' },
    { id: 'atacado', label: 'Atacado' }
  ];

  const regioes = [
    { id: 'todas', label: 'Todas' },
    { id: 'sul', label: 'SUL' },
    { id: 'sp_capital', label: 'SP Capital' },
    { id: 'nordeste', label: 'Nordeste' },
    { id: 'mg_es', label: 'MG/ES' },
    { id: 'sp_interior', label: 'SP Interior' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onVoltar}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Visão Geral
          </button>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Dados Internos - Performance Nutrimental</h2>
        </div>
        <p className="text-purple-100">Análise detalhada de vendas, canais e regiões com dados YTD 2025</p>
      </div>

      {/* Filtros */}
      <FiltrosMonitoramento
        titulo="Dados Internos - Performance Nutrimental"
        subtitulo="Análise de vendas internas por canal, região e produtos"
        badgeTexto="Interno"
        badgeColor="bg-purple-100 text-purple-800 border-purple-300"
        onVoltar={onVoltar}
        selectedCategory={selectedCategoria}
        setSelectedCategory={setSelectedCategoria}
        selectedPeriod={selectedPeriodo}
        setSelectedPeriod={setSelectedPeriodo}
        selectedMes={selectedMes}
        setSelectedMes={setSelectedMes}
      />

      {/* Filtros Específicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Canal de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {canais.map((canal) => (
                <button
                  key={canal.id}
                  onClick={() => setSelectedCanal(canal.id)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    selectedCanal === canal.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {canal.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Região</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {regioes.map((regiao) => (
                <button
                  key={regiao.id}
                  onClick={() => setSelectedRegiao(regiao.id)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    selectedRegiao === regiao.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {regiao.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">
                R$ {(dadosInternos.totais.receita / 1000000).toFixed(1)}M
              </span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18.9%
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">YTD 2025 - Dados BARRAS</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-pink-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Volume Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">
                {(dadosInternos.totais.volume / 1000).toFixed(1)}k kg
              </span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.2%
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">YTD 2025 - Dados BARRAS</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Clientes Diretos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">{dadosInternos.clientes.diretos}</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                Total: {dadosInternos.clientes.total}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">Base ativa de clientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Análise por Canal */}
      <Card>
        <CardHeader>
          <CardTitle>Análise por Canal de Vendas</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Distribuição de receita e volume por canal</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Canal</th>
                  <th className="text-right py-3 px-4 font-semibold text-purple-600">Receita</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">% Receita</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Volume (kg)</th>
                </tr>
              </thead>
              <tbody>
                {dadosInternos.receita_por_canal.canais.slice(0, 5).map((canal, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{canal.nome}</td>
                    <td className="text-right py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-semibold">
                        R$ {(canal.valor / 1000000).toFixed(1)}M
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-gray-700">{canal.percentual}%</td>
                    <td className="text-right py-3 px-4 text-gray-700">
                      {(canal.volume / 1000).toFixed(1)}k
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Análise por Região */}
      <Card>
        <CardHeader>
          <CardTitle>Análise por Região</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Distribuição geográfica de vendas</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Região</th>
                  <th className="text-right py-3 px-4 font-semibold text-purple-600">Receita</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">% Receita</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Volume (kg)</th>
                </tr>
              </thead>
              <tbody>
                {dadosInternos.receita_por_regiao.regioes.slice(0, 5).map((regiao, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{regiao.nome}</td>
                    <td className="text-right py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-100 text-pink-800 font-semibold">
                        R$ {(regiao.valor / 1000000).toFixed(1)}M
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-gray-700">{regiao.percentual}%</td>
                    <td className="text-right py-3 px-4 text-gray-700">
                      {(regiao.volume / 1000).toFixed(1)}k
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top 10 Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Produtos Mais Vendidos</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Ranking por receita</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Produto</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Categoria</th>
                  <th className="text-right py-3 px-4 font-semibold text-purple-600">Receita</th>
                </tr>
              </thead>
              <tbody>
                {dadosInternos.top10_mais_vendidos.map((produto, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-500">#{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{produto.produto}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800">{produto.categoria}</Badge>
                    </td>
                    <td className="text-right py-3 px-4 font-semibold text-purple-600">
                      R$ {(produto.receita / 1000000).toFixed(2)}M
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Building2 className="w-5 h-5" />
            Insights Principais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span className="text-gray-700">
                Receita total de <strong>R$ {(dadosInternos.totais.receita / 1000000).toFixed(1)}M</strong> em barras (YTD 2025)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span className="text-gray-700">
                Canal <strong>C&C</strong> lidera com {dadosInternos.receita_por_canal.canais[0].percentual}% da receita
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">•</span>
              <span className="text-gray-700">
                Região <strong>{dadosInternos.receita_por_regiao.regioes[0].nome}</strong> é a mais forte com {dadosInternos.receita_por_regiao.regioes[0].percentual}%
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
