import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import { getScanntechMercadoTotal, getScanntechShareNutrimental, getScanntechMarcasPorRegiao } from '../data/scanntechDataReal';

export default function MonitoramentoScanntech({ onVoltar }) {
  const [selectedCategoria, setSelectedCategoria] = useState('total');
  const [selectedPeriodo, setSelectedPeriodo] = useState('mes');
  const [selectedMes, setSelectedMes] = useState('agosto');
  const [selectedRegiao, setSelectedRegiao] = useState('brasil');

  const dadosMercado = getScanntechMercadoTotal();
  const dadosShare = getScanntechShareNutrimental();
  // Dados comparativos mockados - TODO: integrar com dados reais
  const dadosComparativo = [
    { regiao: 'Brasil', nutrimental: 89.5, trio: 18.2, kobber: 15.1, integralMedica: 8.3 },
    { regiao: 'SP/RJ/MG/ES', nutrimental: 91.2, trio: 19.5, kobber: 16.2, integralMedica: 9.1 },
    { regiao: 'Sul', nutrimental: 88.3, trio: 17.8, kobber: 14.5, integralMedica: 7.9 },
    { regiao: 'Nordeste', nutrimental: 87.1, trio: 16.9, kobber: 13.8, integralMedica: 7.2 },
    { regiao: 'Centro-Oeste', nutrimental: 90.4, trio: 18.7, kobber: 15.6, integralMedica: 8.5 },
    { regiao: 'Norte', nutrimental: 86.2, trio: 16.2, kobber: 13.1, integralMedica: 6.8 }
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
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">R$ {dadosMercado.valorAtual}M</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{dadosMercado.variacaoPercentual}%
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">Anterior: R$ {dadosMercado.valorAnterior}M</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Volume Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">{dadosMercado.volumeAtual}M kg</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{dadosMercado.variacaoPercentual}%
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">Anterior: {dadosMercado.volumeAnterior}M kg</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Share Nutrimental</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">{dadosShare.shareAtual}%</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{dadosShare.variacaoPontos}pp
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">Anterior: {dadosShare.shareAnterior}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Análise Competitiva por Região */}
      <Card>
        <CardHeader>
          <CardTitle>Análise Competitiva por Região</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Comparação de market share entre principais marcas</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Região</th>
                  <th className="text-right py-3 px-4 font-semibold text-cyan-600">Nutrimental</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Trio</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Kobber</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Integral Médica</th>
                </tr>
              </thead>
              <tbody>
                {dadosComparativo.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.regiao}</td>
                    <td className="text-right py-3 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 font-semibold">
                        {item.nutrimental}%
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-gray-700">{item.trio}%</td>
                    <td className="text-right py-3 px-4 text-gray-700">{item.kobber}%</td>
                    <td className="text-right py-3 px-4 text-gray-700">{item.integralMedica}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
