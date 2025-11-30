import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import { getScanntechMercadoTotal, getScanntechShareNutrimental } from '../data/scanntechDataReal';
import { getScanntechMarcasRegiaoComparativo } from '../data/scanntechDataReal_v2';
import SharePorSegmento from './SharePorSegmento';

const MonitoramentoScanntech = ({
  onVoltar,
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
  selectedMes,
  setSelectedMes,
  periodoLegenda
}) => {
  const [selectedRegiao, setSelectedRegiao] = useState('brasil');

  // Dados do mercado total
  const mercadoData = getScanntechMercadoTotal(selectedCategory, selectedPeriod);
  
  const calcVariacao = (atual, anterior) => {
    if (!atual || !anterior || anterior === 0) return '0.0';
    return ((atual - anterior) / anterior * 100).toFixed(1);
  };

  const valorVar = calcVariacao(mercadoData.valor.atual, mercadoData.valor.anterior);
  const volumeVar = calcVariacao(mercadoData.volume.atual, mercadoData.volume.anterior);
  const precoVar = calcVariacao(mercadoData.preco.atual, mercadoData.preco.anterior);

  // Dados de share
  const shareData = getScanntechShareNutrimental(selectedCategory, selectedPeriod);
  
  // Dados de marcas por região
  const marcasData = getScanntechMarcasRegiaoComparativo(selectedCategory, selectedPeriod);

  const regioes = [
    { id: 'brasil', label: 'Brasil' },
    { id: 'sp_rj_mg_es', label: 'SP/RJ/MG/ES' },
    { id: 'sul', label: 'Sul' },
    { id: 'nordeste', label: 'Nordeste' },
    { id: 'norte_centro_oeste', label: 'Norte/Centro-Oeste' }
  ];

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <FiltrosMonitoramento
        titulo="Scanntech - Mercado Total & Concorrência"
        subtitulo="Dados consolidados de mercado e análise competitiva"
        badgeTexto="Scanntech"
        badgeColor="bg-cyan-100 text-cyan-800 border-cyan-300"
        onVoltar={onVoltar}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedMes={selectedMes}
        setSelectedMes={setSelectedMes}
        periodoLegenda={periodoLegenda}
      >
        {/* Filtro de Região */}
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Região</h4>
          <div className="flex flex-wrap gap-2">
            {regioes.map((regiao) => (
              <button
                key={regiao.id}
                onClick={() => setSelectedRegiao(regiao.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedRegiao === regiao.id
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-cyan-300'
                }`}
              >
                {regiao.label}
              </button>
            ))}
          </div>
        </div>
      </FiltrosMonitoramento>

      {/* Mercado Total de Barras */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Mercado Total de Barras</span>
            </CardTitle>
            <Badge className="bg-cyan-50 text-cyan-700 border-cyan-200 text-xs">Scanntech</Badge>
          </div>
          <CardDescription>Visão consolidada do mercado - {periodoLegenda.curto}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Valor */}
            <div className="p-6 bg-white rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600 font-medium mb-3">Valor (R$)</div>
              <div className="flex items-baseline space-x-2 mb-2">
                <div className="text-3xl font-bold text-cyan-500">
                  R$ {(mercadoData.valor.atual / 1000000).toFixed(1)}M
                </div>
                {parseFloat(valorVar) > 0 ? (
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                <span className={`text-sm font-semibold ${parseFloat(valorVar) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {valorVar}%
                </span>
              </div>
              <div className="text-sm text-slate-400">
                Anterior: R$ {(mercadoData.valor.anterior / 1000000).toFixed(1)}M
              </div>
            </div>

            {/* Volume */}
            <div className="p-6 bg-white rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600 font-medium mb-3">Volume (unidades)</div>
              <div className="flex items-baseline space-x-2 mb-2">
                <div className="text-3xl font-bold text-cyan-500">
                  {mercadoData.volume.atual.toLocaleString('pt-BR')}
                </div>
                {parseFloat(volumeVar) > 0 ? (
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                <span className={`text-sm font-semibold ${parseFloat(volumeVar) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {volumeVar}%
                </span>
              </div>
              <div className="text-sm text-slate-400">
                Anterior: {mercadoData.volume.anterior.toLocaleString('pt-BR')}
              </div>
            </div>

            {/* Preço Médio */}
            <div className="p-6 bg-white rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600 font-medium mb-3">Preço Médio (R$/un)</div>
              <div className="flex items-baseline space-x-2 mb-2">
                <div className="text-3xl font-bold text-cyan-500">
                  R$ {mercadoData.preco.atual.toFixed(2)}
                </div>
                {parseFloat(precoVar) > 0 ? (
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                <span className={`text-sm font-semibold ${parseFloat(precoVar) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {precoVar}%
                </span>
              </div>
              <div className="text-sm text-slate-400">
                Anterior: R$ {mercadoData.preco.anterior.toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share por Segmento */}
      <SharePorSegmento />

      {/* Análise Competitiva por Região */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Análise Competitiva - {regioes.find(r => r.id === selectedRegiao)?.label}</CardTitle>
          <CardDescription>Participação de mercado por marca - {periodoLegenda.curto}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left p-3 text-sm font-semibold text-slate-700">Marca</th>
                  <th className="text-right p-3 text-sm font-semibold text-slate-700">Share Valor %</th>
                  <th className="text-right p-3 text-sm font-semibold text-slate-700">Share Volume %</th>
                  <th className="text-right p-3 text-sm font-semibold text-slate-700">Preço Médio (R$)</th>
                </tr>
              </thead>
              <tbody>
                {marcasData[selectedRegiao]?.map((marca, index) => (
                  <tr key={index} className={`border-b border-slate-100 ${marca.marca === 'Nutrimental' ? 'bg-purple-50 font-semibold' : ''}`}>
                    <td className="p-3">{marca.marca}</td>
                    <td className="p-3 text-right">{marca.shareValor.toFixed(1)}%</td>
                    <td className="p-3 text-right">{marca.shareVolume.toFixed(1)}%</td>
                    <td className="p-3 text-right">R$ {marca.preco.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoramentoScanntech;
