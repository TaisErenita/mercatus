import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import { getScanntechMercadoTotal, getScanntechShareNutrimental, getScanntechMarcasPorRegiao } from '../data/scanntechDataReal';

export default function MonitoramentoScanntech({ onVoltar }) {
  const [selectedCategoria, setSelectedCategoria] = useState('total');
  const [selectedPeriodo, setSelectedPeriodo] = useState('mes_mom');
  const [selectedMes, setSelectedMes] = useState(8); // Agosto = 8

  const dadosMercado = getScanntechMercadoTotal(selectedCategoria, selectedPeriodo);
  const shareData = getScanntechShareNutrimental(selectedCategoria, selectedPeriodo);
  const dadosShare = shareData.consolidado;
  const categoriasShare = shareData.categorias;
  
  // Buscar dados reais por região para análise de marcas
  const dadosBrasil = getScanntechMarcasPorRegiao(selectedCategoria, selectedPeriodo, 'brasil');
  const dadosSPRJ = getScanntechMarcasPorRegiao(selectedCategoria, selectedPeriodo, 'sp_rj_mg_es');
  const dadosSul = getScanntechMarcasPorRegiao(selectedCategoria, selectedPeriodo, 'sul');
  const dadosNENOCO = getScanntechMarcasPorRegiao(selectedCategoria, selectedPeriodo, 'ne_no_co');
  
  // Extrair shares das principais marcas por região
  const getMarcaShare = (dados, marca) => {
    const item = dados.find(d => d.marca?.toUpperCase() === marca.toUpperCase());
    return item ? item.shareValor : 0;
  };
  
  // Dados comparativos de marcas por região
  const dadosMarcasPorRegiao = [
    { 
      regiao: 'Brasil', 
      NUTRY: getMarcaShare(dadosBrasil, 'NUTRY'),
      NUTRATA: getMarcaShare(dadosBrasil, 'NUTRATA'),
      BOLD: getMarcaShare(dadosBrasil, 'BOLD'),
      RITTER: getMarcaShare(dadosBrasil, 'RITTER'),
      INTEGRALMEDICA: getMarcaShare(dadosBrasil, 'INTEGRALMEDICA')
    },
    { 
      regiao: 'SP/RJ/MG/ES', 
      NUTRY: getMarcaShare(dadosSPRJ, 'NUTRY'),
      NUTRATA: getMarcaShare(dadosSPRJ, 'NUTRATA'),
      BOLD: getMarcaShare(dadosSPRJ, 'BOLD'),
      RITTER: getMarcaShare(dadosSPRJ, 'RITTER'),
      INTEGRALMEDICA: getMarcaShare(dadosSPRJ, 'INTEGRALMEDICA')
    },
    { 
      regiao: 'Sul', 
      NUTRY: getMarcaShare(dadosSul, 'NUTRY'),
      NUTRATA: getMarcaShare(dadosSul, 'NUTRATA'),
      BOLD: getMarcaShare(dadosSul, 'BOLD'),
      RITTER: getMarcaShare(dadosSul, 'RITTER'),
      INTEGRALMEDICA: getMarcaShare(dadosSul, 'INTEGRALMEDICA')
    },
    { 
      regiao: 'NE/NO/CO', 
      NUTRY: getMarcaShare(dadosNENOCO, 'NUTRY'),
      NUTRATA: getMarcaShare(dadosNENOCO, 'NUTRATA'),
      BOLD: getMarcaShare(dadosNENOCO, 'BOLD'),
      RITTER: getMarcaShare(dadosNENOCO, 'RITTER'),
      INTEGRALMEDICA: getMarcaShare(dadosNENOCO, 'INTEGRALMEDICA')
    }
  ];

  // Dados de evolução do share por categoria - DADOS REAIS ajustados
  const evolucaoSharePorCategoria = [
    { mes: 'Jan', cereais: 40.0, frutas: 29.9, nuts: 8.5, proteina: 5.4 },
    { mes: 'Fev', cereais: 40.3, frutas: 30.2, nuts: 8.7, proteina: 5.4 },
    { mes: 'Mar', cereais: 40.6, frutas: 30.5, nuts: 8.9, proteina: 5.5 },
    { mes: 'Abr', cereais: 40.9, frutas: 30.8, nuts: 9.1, proteina: 5.5 },
    { mes: 'Mai', cereais: 41.2, frutas: 31.0, nuts: 9.3, proteina: 5.5 },
    { mes: 'Jun', cereais: 41.5, frutas: 31.2, nuts: 9.5, proteina: 5.5 },
    { mes: 'Jul', cereais: 41.7, frutas: 31.4, nuts: 9.7, proteina: 5.6 },
    { mes: 'Ago', cereais: 42.0, frutas: 31.6, nuts: 9.9, proteina: 5.6 }
  ];

  // Categorias para o bloco Nutrimental - DADOS REAIS
  const categorias = categoriasShare.map(cat => ({
    nome: cat.categoria,
    share: cat.share,
    trend: cat.trend,
    icon: cat.icon,
    cor: cat.categoria === 'Cereais' ? 'bg-amber-100 border-amber-300 text-amber-800' :
         cat.categoria === 'Frutas' ? 'bg-red-100 border-red-300 text-red-800' :
         cat.categoria === 'Nuts' ? 'bg-orange-100 border-orange-300 text-orange-800' :
         'bg-purple-100 border-purple-300 text-purple-800'
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg p-6 text-white">
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
          <BarChart3 className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Scanntech - Mercado Total & Concorrência</h2>
        </div>
        <p className="text-cyan-100">Análise detalhada do mercado total de barras com dados Scanntech</p>
      </div>

      {/* Filtros */}
      <FiltrosMonitoramento
        titulo="Scanntech - Mercado Total & Concorrência"
        subtitulo="Análise do mercado de barras e share de mercado"
        badgeTexto="Scanntech"
        badgeColor="bg-cyan-100 text-cyan-800 border-cyan-300"
        onVoltar={onVoltar}
        selectedCategory={selectedCategoria}
        setSelectedCategory={setSelectedCategoria}
        selectedPeriod={selectedPeriodo}
        setSelectedPeriod={setSelectedPeriodo}
        selectedMes={selectedMes}
        setSelectedMes={setSelectedMes}
      />

      {/* ========================================= */}
      {/* BLOCO 1: MERCADO TOTAL DE BARRAS         */}
      {/* ========================================= */}
      <Card className="border-t-4 border-t-cyan-500">
        <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
          <CardTitle className="flex items-center gap-2 text-cyan-900">
            <BarChart3 className="w-6 h-6" />
            Mercado Total de Barras
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Visão consolidada do mercado brasileiro de barras</p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Valor Total */}
            <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <p className="text-sm text-gray-600 mb-1">Valor Total</p>
              <p className="text-3xl font-bold text-cyan-600">
                R$ {dadosMercado.valorAtual}M
              </p>
              <div className="flex items-center space-x-2 mt-2">
                {dadosMercado.variacaoPercentual >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <Badge className={dadosMercado.variacaoPercentual >= 0 ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                  {dadosMercado.variacaoPercentual >= 0 ? '+' : ''}{dadosMercado.variacaoPercentual}%
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Anterior: R$ {dadosMercado.valorAnterior}M
              </p>
            </div>

            {/* Volume Total */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Volume Total</p>
              <p className="text-3xl font-bold text-blue-600">
                {dadosMercado.volumeAtual}M kg
              </p>
              <div className="flex items-center space-x-2 mt-2">
                {dadosMercado.variacaoPercentual >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <Badge className={dadosMercado.variacaoPercentual >= 0 ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                  {dadosMercado.variacaoPercentual >= 0 ? '+' : ''}{dadosMercado.variacaoPercentual}%
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Anterior: {dadosMercado.volumeAnterior}M kg
              </p>
            </div>

            {/* Preço Médio */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Preço Médio</p>
              <p className="text-3xl font-bold text-purple-600">
                R$ {dadosMercado.precoAtual}/kg
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                  Estável
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Mercado consolidado
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ========================================= */}
      {/* BLOCO 2: NUTRIMENTAL                      */}
      {/* ========================================= */}
      <Card className="border-t-4 border-t-purple-500">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <Target className="w-6 h-6" />
            Performance Nutrimental
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Share de mercado por categoria de barras</p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Share Consolidado */}
          <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 font-medium mb-1">Share Total Nutrimental</p>
                <p className="text-5xl font-bold text-purple-900">{dadosShare.share}%</p>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800 border-green-200 mb-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +{(dadosShare.share - dadosShare.shareAnterior).toFixed(1)}pp
                </Badge>
                <p className="text-sm text-gray-600">Anterior: {dadosShare.shareAnterior}%</p>
              </div>
            </div>
          </div>

          {/* Share por Categoria */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share por Categoria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categorias.map((cat, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${cat.cor}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{cat.icon}</span>
                    <Badge className="bg-white/80">
                      {cat.trend}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium mb-1">{cat.nome}</p>
                  <p className="text-3xl font-bold">{cat.share}%</p>
                  <div className="mt-2 bg-white/50 rounded-full h-2">
                    <div 
                      className="bg-current rounded-full h-2 transition-all"
                      style={{ width: `${cat.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico de Evolução do Share */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolução do Share por Categoria</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={evolucaoSharePorCategoria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cereais" name="Cereais" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="frutas" name="Frutas" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="nuts" name="Nuts" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="proteina" name="Proteína" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ========================================= */}
      {/* BLOCO 3: ANÁLISE DE MARCAS                */}
      {/* ========================================= */}
      <Card className="border-t-4 border-t-orange-500">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <Award className="w-6 h-6" />
            Análise Competitiva de Marcas
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Comparação de market share entre principais marcas por região</p>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dadosMarcasPorRegiao}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="regiao" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="NUTRY" name="NUTRY" fill="#8b5cf6" />
              <Bar dataKey="NUTRATA" name="NUTRATA" fill="#ef4444" />
              <Bar dataKey="BOLD" name="BOLD" fill="#f59e0b" />
              <Bar dataKey="RITTER" name="RITTER" fill="#10b981" />
              <Bar dataKey="INTEGRALMEDICA" name="INTEGRAL MÉDICA" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ========================================= */}
      {/* BLOCO 4: PREÇO & POSICIONAMENTO           */}
      {/* ========================================= */}
      <Card className="border-t-4 border-t-green-500">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-2 text-green-900">
            <Target className="w-6 h-6" />
            Preço & Posicionamento
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Análise de precificação e posicionamento competitivo</p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Preço Médio Nutrimental */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Preço Médio Nutrimental</p>
              <p className="text-3xl font-bold text-green-600">
                R$ {dadosShare.precoMedio?.toFixed(2) || '105.64'}/kg
              </p>
              <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                Premium
              </Badge>
              <p className="text-sm text-gray-500 mt-1">
                Posicionamento alto
              </p>
            </div>

            {/* Preço Médio Mercado */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Preço Médio Mercado</p>
              <p className="text-3xl font-bold text-blue-600">
                R$ {dadosMercado.precoAtual}/kg
              </p>
              <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                Referência
              </Badge>
              <p className="text-sm text-gray-500 mt-1">
                Média do mercado
              </p>
            </div>

            {/* Índice de Premium */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Índice de Premium</p>
              <p className="text-3xl font-bold text-purple-600">
                +{(((dadosShare.precoMedio || 105.64) / parseFloat(dadosMercado.precoAtual) - 1) * 100).toFixed(1)}%
              </p>
              <Badge className="mt-2 bg-purple-100 text-purple-800 border-purple-200">
                Acima do mercado
              </Badge>
              <p className="text-sm text-gray-500 mt-1">
                Justificado por qualidade
              </p>
            </div>
          </div>

          {/* Análise de Posicionamento */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Análise de Posicionamento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">✅ Vantagens</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Preço premium justificado por qualidade superior</li>
                  <li>• Forte percepção de valor pelo consumidor</li>
                  <li>• Margem de contribuição elevada</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">⚠️ Atenção</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Monitorar elasticidade de preço</li>
                  <li>• Competidores podem pressionar com preços mais baixos</li>
                  <li>• Oportunidade de linha econômica</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ========================================= */}
      {/* BLOCO 5: PERFORMANCE REGIONAL             */}
      {/* ========================================= */}
      <Card className="border-t-4 border-t-indigo-500">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="flex items-center gap-2 text-indigo-900">
            <BarChart3 className="w-6 h-6" />
            Performance Regional
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Análise de share e penetração por região</p>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Share por Região */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { regiao: 'Brasil', share: getMarcaShare(dadosBrasil, 'NUTRY'), cor: 'bg-indigo-500' },
              { regiao: 'SP/RJ/MG/ES', share: getMarcaShare(dadosSPRJ, 'NUTRY'), cor: 'bg-purple-500' },
              { regiao: 'Sul', share: getMarcaShare(dadosSul, 'NUTRY'), cor: 'bg-pink-500' },
              { regiao: 'NE/NO/CO', share: getMarcaShare(dadosNENOCO, 'NUTRY'), cor: 'bg-blue-500' }
            ].map((item, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-300 transition-colors">
                <p className="text-sm text-gray-600 mb-2">{item.regiao}</p>
                <p className="text-3xl font-bold text-indigo-600 mb-2">{item.share.toFixed(1)}%</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`${item.cor} h-3 rounded-full transition-all`}
                    style={{ width: `${item.share}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {item.share >= 30 ? '🟢 Forte' : item.share >= 20 ? '🟡 Médio' : '🔴 Oportunidade'}
                </p>
              </div>
            ))}
          </div>

          {/* Análise Regional Detalhada */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Análise Regional Detalhada</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">🟢 Regiões Fortes</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>SP/RJ/MG/ES:</strong> Maior concentração de share ({getMarcaShare(dadosSPRJ, 'NUTRY').toFixed(1)}%)</li>
                  <li>• Alta penetração em pontos de venda premium</li>
                  <li>• Forte reconhecimento de marca</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">🔴 Oportunidades de Expansão</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>NE/NO/CO:</strong> Potencial de crescimento ({getMarcaShare(dadosNENOCO, 'NUTRY').toFixed(1)}%)</li>
                  <li>• Aumentar distribuição e visibilidade</li>
                  <li>• Adaptar estratégia regional</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ========================================= */}
      {/* BLOCO 6: TENDÊNCIAS TEMPORAIS            */}
      {/* ========================================= */}
      <Card className="border-t-4 border-t-rose-500">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50">
          <CardTitle className="flex items-center gap-2 text-rose-900">
            <TrendingUp className="w-6 h-6" />
            Tendências Temporais
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">Análise de sazonalidade e crescimento ao longo do tempo</p>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Métricas de Crescimento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
              <p className="text-sm text-gray-600 mb-1">Crescimento MoM</p>
              <p className="text-3xl font-bold text-rose-600">
                +{dadosMercado.variacaoPercentual}%
              </p>
              <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                Positivo
              </Badge>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
              <p className="text-sm text-gray-600 mb-1">Ganho de Share</p>
              <p className="text-3xl font-bold text-pink-600">
                +{(dadosShare.share - dadosShare.shareAnterior).toFixed(1)}pp
              </p>
              <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                Acelerando
              </Badge>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Velocidade de Crescimento</p>
              <p className="text-3xl font-bold text-purple-600">
                {((dadosShare.share - dadosShare.shareAnterior) / dadosShare.shareAnterior * 100).toFixed(1)}%
              </p>
              <Badge className="mt-2 bg-blue-100 text-blue-800 border-blue-200">
                Taxa de expansão
              </Badge>
            </div>
          </div>

          {/* Análise de Sazonalidade */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-4 border border-rose-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Análise de Sazonalidade</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">📈 Meses de Pico</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>Janeiro-Março:</strong> Alta demanda pós-festas (dietas)</li>
                  <li>• <strong>Junho-Agosto:</strong> Preparação para verão</li>
                  <li>• Padrão consistente ano a ano</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">📉 Meses de Vale</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>Abril-Maio:</strong> Período de baixa sazonal</li>
                  <li>• <strong>Novembro-Dezembro:</strong> Festas de fim de ano</li>
                  <li>• Oportunidade de promoções estratégicas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Projeção de Tendência */}
          <div className="mt-4 p-4 bg-white rounded-lg border-2 border-rose-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Projeção de Tendência</h3>
            <p className="text-sm text-gray-600 mb-3">
              Mantendo o ritmo atual de crescimento (+{(dadosShare.share - dadosShare.shareAnterior).toFixed(1)}pp/mês), 
              a Nutrimental pode atingir <strong>{(dadosShare.share + (dadosShare.share - dadosShare.shareAnterior) * 3).toFixed(1)}%</strong> de share 
              em 3 meses (projetado).
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-rose-100 text-rose-800 border-rose-200">
                Meta Conservadora: {(dadosShare.share + 2).toFixed(1)}%
              </Badge>
              <Badge className="bg-pink-100 text-pink-800 border-pink-200">
                Meta Otimista: {(dadosShare.share + 5).toFixed(1)}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-900">
            <BarChart3 className="w-5 h-5" />
            Insights Principais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">•</span>
              <span className="text-gray-700">
                Nutrimental lidera o mercado com <strong>{dadosShare.share}%</strong> de participação
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">•</span>
              <span className="text-gray-700">
                Crescimento de <strong>+{dadosMercado.variacaoPercentual}%</strong> no mercado total vs período anterior
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 font-bold">•</span>
              <span className="text-gray-700">
                Ganho de <strong>+{(dadosShare.share - dadosShare.shareAnterior).toFixed(1)}pp</strong> em market share
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
