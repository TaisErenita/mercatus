import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import { mesesMTRIX } from '../utils/periodHelpers';
import { getMtrixSummary, getMtrixEvolucaoTemporal, getMtrixCurvaABC, getMtrixCrescimento } from '../data/mtrixDataReal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { filterNullish } from '../utils/safeString';

export default function MonitoramentoMTRIX({ onVoltar }) {
  const [selectedCategoria, setSelectedCategoria] = useState('total');
  const [selectedPeriodo, setSelectedPeriodo] = useState('mes');
  const [selectedMesInicial, setSelectedMesInicial] = useState(1); // Jul/2023
  const [selectedMesFinal, setSelectedMesFinal] = useState(27); // Set/2025
  const [selectedUF, setSelectedUF] = useState('todas');

  const dadosMTRIX = getMtrixSummary(selectedCategoria, selectedPeriodo, selectedMesInicial, selectedMesFinal, selectedUF);
  const dadosEvolucao = getMtrixEvolucaoTemporal(selectedCategoria);
  const curvaABC = getMtrixCurvaABC(selectedCategoria, selectedPeriodo, selectedMesInicial, selectedMesFinal, selectedUF);
  const dadosCrescimento = getMtrixCrescimento(selectedCategoria);

  const ufs = [
    'Todas', 'SP', 'RJ', 'MG', 'ES', 'PR', 'SC', 'RS', 'BA', 'CE', 'PE',
    'RN', 'PB', 'AL', 'SE', 'MA', 'PI', 'GO', 'DF', 'MT', 'MS', 'AM',
    'PA', 'RO', 'AC', 'RR', 'AP', 'TO'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-white">
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
          <MapPin className="w-8 h-8" />
          <h2 className="text-3xl font-bold">MTRIX - Distribuição & Cobertura</h2>
        </div>
        <p className="text-green-100">Análise de distribuidores e cobertura geográfica nacional</p>
      </div>

      {/* Filtros Personalizados MTRIX */}
      <Card className="border-2 border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle>Filtros de Análise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filtro de Categoria */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Categoria de Barras</h4>
            <div className="flex flex-wrap gap-2">
              {['total', 'cereais', 'nuts', 'proteina', 'frutas'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoria(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategoria === cat
                      ? 'bg-green-500 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-green-300'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro de Período */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Período de Comparação</h4>
            <div className="flex flex-wrap gap-2">
              {[{ id: 'mes', label: 'Mês' }, { id: 'trimestre', label: 'Trimestre' }, { id: 'ytd', label: 'YTD' }].map((per) => (
                <button
                  key={per.id}
                  onClick={() => setSelectedPeriodo(per.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriodo === per.id
                      ? 'bg-green-500 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-green-300'
                  }`}
                >
                  {per.label}
                </button>
              ))}
            </div>
          </div>

          {/* Seletores de Intervalo de Datas */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">📅 Período de Análise</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 mb-2">Data Inicial</label>
                <select
                  value={selectedMesInicial}
                  onChange={(e) => setSelectedMesInicial(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700"
                >
                  {mesesMTRIX.map((mes) => (
                    <option key={mes.id} value={mes.id}>
                      {mes.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-2">Data Final</label>
                <select
                  value={selectedMesFinal}
                  onChange={(e) => setSelectedMesFinal(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700"
                >
                  {mesesMTRIX.map((mes) => (
                    <option key={mes.id} value={mes.id}>
                      {mes.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Período selecionado: {mesesMTRIX.find(m => m.id === selectedMesInicial)?.abrev} até {mesesMTRIX.find(m => m.id === selectedMesFinal)?.abrev}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filtro UF */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Filtrar por Unidade Federativa</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={selectedUF}
            onChange={(e) => setSelectedUF(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700"
          >
            {filterNullish(ufs).map((uf) => (
              <option key={uf} value={uf.toLowerCase()}>
                {uf}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">
                R$ {(dadosMTRIX.totalVendas / 1000000).toFixed(1)}M
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Dados MTRIX consolidados</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Distribuidores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">{dadosMTRIX.totalDistribuidores}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Parceiros ativos</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Cobertura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">{dadosMTRIX.totalUFs}</span>
              <Badge className="bg-green-100 text-green-800">UFs</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">Unidades federativas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">{dadosMTRIX.totalCategorias}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Tipos de produtos</p>
          </CardContent>
        </Card>
      </div>

      {/* Métricas de Crescimento */}
      <Card className="border-t-4 border-t-purple-500">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <TrendingUp className="w-6 h-6" />
            Métricas de Crescimento
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Indicadores de desempenho ao longo do tempo</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* MoM */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-800 uppercase">Crescimento MoM</span>
                <Badge className={`${
                  dadosCrescimento.crescimentoMoM.valor >= 0 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {dadosCrescimento.crescimentoMoM.valor >= 0 ? '↑' : '↓'}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-blue-900 mb-1">
                {dadosCrescimento.crescimentoMoM.valorFormatado}
              </p>
              <p className="text-xs text-blue-700">{dadosCrescimento.crescimentoMoM.periodo}</p>
              <p className="text-xs text-blue-600 mt-2">Mês sobre Mês</p>
            </div>

            {/* QoQ */}
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-green-800 uppercase">Crescimento QoQ</span>
                <Badge className={`${
                  dadosCrescimento.crescimentoQoQ.valor >= 0 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {dadosCrescimento.crescimentoQoQ.valor >= 0 ? '↑' : '↓'}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-green-900 mb-1">
                {dadosCrescimento.crescimentoQoQ.valorFormatado}
              </p>
              <p className="text-xs text-green-700">{dadosCrescimento.crescimentoQoQ.periodo}</p>
              <p className="text-xs text-green-600 mt-2">Trimestre sobre Trimestre</p>
            </div>

            {/* YoY */}
            <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-orange-800 uppercase">Crescimento YoY</span>
                <Badge className={`${
                  dadosCrescimento.crescimentoYoY.valor >= 0 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {dadosCrescimento.crescimentoYoY.valor >= 0 ? '↑' : '↓'}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-orange-900 mb-1">
                {dadosCrescimento.crescimentoYoY.valorFormatado}
              </p>
              <p className="text-xs text-orange-700">{dadosCrescimento.crescimentoYoY.periodo}</p>
              <p className="text-xs text-orange-600 mt-2">Ano sobre Ano</p>
            </div>

            {/* CAGR */}
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-purple-800 uppercase">CAGR</span>
                <Badge className={`${
                  dadosCrescimento.cagr.valor >= 0 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {dadosCrescimento.cagr.valor >= 0 ? '↑' : '↓'}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-purple-900 mb-1">
                {dadosCrescimento.cagr.valorFormatado}
              </p>
              <p className="text-xs text-purple-700">{dadosCrescimento.cagr.periodo}</p>
              <p className="text-xs text-purple-600 mt-2">Taxa Composta Anual</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong className="text-purple-900">Insight:</strong> O negócio apresenta <strong>crescimento consistente</strong> em todos os horizontes temporais. 
              CAGR de <strong>{dadosCrescimento.cagr.valorFormatado}</strong> indica expansão sólida e sustentável ao longo de 27 meses.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Evolução Temporal de Vendas */}
      <Card className="border-t-4 border-t-green-500">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-2 text-green-900">
            <TrendingUp className="w-6 h-6" />
            Evolução Temporal de Vendas (Jul/2023 - Set/2025)
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Tendência de vendas ao longo de 27 meses</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={dadosEvolucao}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="mes" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                formatter={(value) => `R$ ${(value / 1000000).toFixed(2)}M`}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="vendas" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
                name="Vendas"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong className="text-green-900">Insight:</strong> Observa-se crescimento consistente de <strong>+80%</strong> entre Jul/2023 e Set/2025, 
              com picos sazonais em dezembro (festas de fim de ano) e recuperação gradual nos primeiros meses do ano.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Curva ABC de Distribuidores */}
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <TrendingUp className="w-6 h-6" />
            Curva ABC de Distribuidores
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Análise de concentração de vendas (Princípio de Pareto)</p>
        </CardHeader>
        <CardContent>
          {/* Estatísticas da Curva ABC */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800">Classe A</span>
                <Badge className="bg-green-600 text-white">Top</Badge>
              </div>
              <p className="text-2xl font-bold text-green-900">{curvaABC.estatisticas.classeA.quantidade}</p>
              <p className="text-xs text-green-700 mt-1">
                {curvaABC.estatisticas.classeA.percentual}% dos distribuidores
              </p>
              <p className="text-sm font-semibold text-green-800 mt-2">
                {curvaABC.estatisticas.classeA.percentualReceita}% da receita
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-800">Classe B</span>
                <Badge className="bg-yellow-600 text-white">Médio</Badge>
              </div>
              <p className="text-2xl font-bold text-yellow-900">{curvaABC.estatisticas.classeB.quantidade}</p>
              <p className="text-xs text-yellow-700 mt-1">
                {curvaABC.estatisticas.classeB.percentual}% dos distribuidores
              </p>
              <p className="text-sm font-semibold text-yellow-800 mt-2">
                {curvaABC.estatisticas.classeB.percentualReceita}% da receita
              </p>
            </div>
            
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-red-800">Classe C</span>
                <Badge className="bg-red-600 text-white">Baixo</Badge>
              </div>
              <p className="text-2xl font-bold text-red-900">{curvaABC.estatisticas.classeC.quantidade}</p>
              <p className="text-xs text-red-700 mt-1">
                {curvaABC.estatisticas.classeC.percentual}% dos distribuidores
              </p>
              <p className="text-sm font-semibold text-red-800 mt-2">
                {curvaABC.estatisticas.classeC.percentualReceita}% da receita
              </p>
            </div>
          </div>

          {/* Tabela Top 15 Distribuidores com Classificação */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Distribuidor</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">UF</th>
                  <th className="text-right py-3 px-4 font-semibold text-green-600">Receita</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">% Individual</th>
                  <th className="text-right py-3 px-4 font-semibold text-blue-600">% Acumulado</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">Classe</th>
                </tr>
              </thead>
              <tbody>
                {curvaABC.distribuidores.slice(0, 15).map((dist) => (
                  <tr key={dist.posicao} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-500">#{dist.posicao}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{dist.nome}</td>
                    <td className="text-center py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800">{dist.uf}</Badge>
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
                        R$ {(dist.receita / 1000).toFixed(1)}k
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-gray-700">{dist.percentual.toFixed(1)}%</td>
                    <td className="text-right py-3 px-4 text-blue-700 font-semibold">{dist.acumulado.toFixed(1)}%</td>
                    <td className="text-center py-3 px-4">
                      <Badge className={`${
                        dist.classe === 'A' ? 'bg-green-600 text-white' :
                        dist.classe === 'B' ? 'bg-yellow-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {dist.classe}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong className="text-blue-900">Insight (Princípio de Pareto):</strong> {curvaABC.estatisticas.classeA.quantidade} distribuidores 
              ({curvaABC.estatisticas.classeA.percentual}% do total) são responsáveis por <strong>80% da receita</strong>. 
              Foco na gestão de relacionamento com estes parceiros é <strong>crítico</strong> para o negócio.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Top Distribuidores */}
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Distribuidores</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Principais parceiros de distribuição por receita</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Distribuidor</th>
                  <th className="text-right py-3 px-4 font-semibold text-green-600">Receita</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">% Total</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-600">UF</th>
                </tr>
              </thead>
              <tbody>
                {dadosMTRIX.topDistribuidores.slice(0, 10).map((dist, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold text-gray-500">#{index + 1}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{dist.nome}</td>
                    <td className="text-right py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 font-semibold">
                        R$ {(dist.receita / 1000).toFixed(1)}k
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-gray-700">{dist.percentual.toFixed(1)}%</td>
                    <td className="text-center py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800">{dist.uf}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Categoria</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Receita por tipo de produto</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dadosMTRIX.porCategoria.map((cat, index) => {
              const percentual = (cat.receita / dadosMTRIX.totalVendas * 100);
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{cat.categoria}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      R$ {(cat.receita / 1000).toFixed(1)}k ({percentual.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all"
                      style={{ width: `${percentual}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <MapPin className="w-5 h-5" />
            Insights Principais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span className="text-gray-700">
                Receita total de <strong>R$ {(dadosMTRIX.totalVendas / 1000000).toFixed(1)}M</strong> via MTRIX
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span className="text-gray-700">
                Rede de <strong>{dadosMTRIX.totalDistribuidores} distribuidores</strong> em {dadosMTRIX.totalUFs} UFs
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span className="text-gray-700">
                Top distribuidor: <strong>{dadosMTRIX.topDistribuidores[0].nome}</strong> ({dadosMTRIX.topDistribuidores[0].uf})
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
