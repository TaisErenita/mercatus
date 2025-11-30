import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import SharePorSegmento from './SharePorSegmento';
import { getScanntechMercadoTotal, getScanntechShareNutrimental, getScanntechMarcasPorRegiao } from '../data/scanntechDataReal';

export default function MonitoramentoScanntech({ onVoltar }) {
  const [selectedCategoria, setSelectedCategoria] = useState('total');
  const [selectedPeriodo, setSelectedPeriodo] = useState('mes_mom');
  const [selectedMes, setSelectedMes] = useState(8); // Agosto = 8
  const [selectedRegiao, setSelectedRegiao] = useState('brasil');

  const dadosMercado = getScanntechMercadoTotal(selectedCategoria, selectedPeriodo);
  const dadosShare = getScanntechShareNutrimental(selectedCategoria, selectedPeriodo);
  
  // Buscar dados reais por região
  const dadosBrasil = getScanntechMarcasPorRegiao(selectedCategoria, selectedPeriodo, 'brasil');
  const dadosSPRJ = getScanntechMarcasPorRegiao(selectedCategoria, selectedPeriodo, 'sp_rj_mg_es');
  const dadosSul = getScanntechMarcasPorRegiao(selectedCategoria, selectedPeriodo, 'sul');
  const dadosNENOCO = getScanntechMarcasPorRegiao(selectedCategoria, selectedPeriodo, 'ne_no_co');
  
  // Extrair shares das principais marcas por região
  const getMarcaShare = (dados, marca) => {
    const item = dados.find(d => d.marca?.toUpperCase() === marca.toUpperCase());
    return item ? item.shareValor : 0;
  };
  
  // Dados comparativos para o gráfico com dados REAIS
  const dadosComparativo = [
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

  const regioes = {
    brasil: 'Brasil',
    sp_rj_mg_es: 'SP/RJ/MG/ES',
    sul: 'Sul',
    nordeste: 'Nordeste',
    centro_oeste: 'Centro-Oeste',
    norte: 'Norte'
  };

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

      {/* Filtro Região */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Filtrar por Região</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(regioes).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedRegiao(key)}
                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                  selectedRegiao === key
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Mercado Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-cyan-600">
                R$ {dadosMercado.valorAtual}M
              </p>
              <div className="flex items-center space-x-2">
                {dadosMercado.variacaoPercentual >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <Badge className={dadosMercado.variacaoPercentual >= 0 ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                  {dadosMercado.variacaoPercentual >= 0 ? '+' : ''}{dadosMercado.variacaoPercentual}%
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Anterior: R$ {dadosMercado.valorAnterior}M
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Volume Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-blue-600">
                {dadosMercado.volumeAtual}M kg
              </p>
              <div className="flex items-center space-x-2">
                {dadosMercado.variacaoPercentual >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <Badge className={dadosMercado.variacaoPercentual >= 0 ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                  {dadosMercado.variacaoPercentual >= 0 ? '+' : ''}{dadosMercado.variacaoPercentual}%
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Anterior: {dadosMercado.volumeAnterior}M kg
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Share Nutrimental</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-purple-600">
                {dadosShare.shareAtual}%
              </p>
              <div className="flex items-center space-x-2">
                {dadosShare.variacaoPontos >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <Badge className={dadosShare.variacaoPontos >= 0 ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                  {dadosShare.variacaoPontos >= 0 ? '+' : ''}{dadosShare.variacaoPontos}pp
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Anterior: {dadosShare.shareAnterior}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Análise Competitiva por Região */}
      <Card>
        <CardHeader>
          <CardTitle>Análise Competitiva por Região</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Comparação de market share entre principais marcas</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dadosComparativo}>
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

      {/* Share por Segmento */}
      <SharePorSegmento selectedCategory={selectedCategoria} selectedPeriod={selectedPeriodo} />

      {/* Detalhes da Análise */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Análise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Categoria Selecionada</p>
              <p className="text-lg font-semibold capitalize">{selectedCategoria}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Período</p>
              <p className="text-lg font-semibold">{selectedPeriodo === 'mes_mom' ? 'MoM' : selectedPeriodo === 'trimestre_qoq' ? 'QoQ' : 'YTD'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Região</p>
              <p className="text-lg font-semibold">{regioes[selectedRegiao]}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Mês de Referência</p>
              <p className="text-lg font-semibold">
                {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][selectedMes - 1]}/25
              </p>
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
                Nutrimental lidera o mercado com <strong>{dadosShare.shareAtual}%</strong> de participação
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
                Ganho de <strong>+{dadosShare.variacaoPontos}pp</strong> em market share
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
