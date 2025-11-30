import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import { getScanntechMercadoTotal, getScanntechShareNutrimental } from '../data/scanntechDataReal';

export default function MonitoramentoScanntech({ onVoltar }) {
  const [selectedCategoria, setSelectedCategoria] = useState('total');
  const [selectedPeriodo, setSelectedPeriodo] = useState('mes');
  const [selectedMes, setSelectedMes] = useState('agosto');
  const [selectedRegiao, setSelectedRegiao] = useState('brasil');

  const dadosMercado = getScanntechMercadoTotal();
  const dadosShare = getScanntechShareNutrimental();

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
        <h2 className="text-3xl font-bold mb-2">Scanntech - Mercado Total & Concorrência</h2>
        <p className="text-cyan-100">Análise detalhada do mercado total de barras</p>
      </div>

      {/* Filtros */}
      <FiltrosMonitoramento
        selectedCategoria={selectedCategoria}
        setSelectedCategoria={setSelectedCategoria}
        selectedPeriodo={selectedPeriodo}
        setSelectedPeriodo={setSelectedPeriodo}
        selectedMes={selectedMes}
        setSelectedMes={setSelectedMes}
      />

      {/* Filtro Região */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {['brasil', 'sp_rj_mg_es', 'sul', 'nordeste', 'centro_oeste', 'norte'].map((regiao) => (
              <button
                key={regiao}
                onClick={() => setSelectedRegiao(regiao)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedRegiao === regiao
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {regiao.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Mercado Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">R$ {dadosMercado.valorAtual}M</span>
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{dadosMercado.variacaoPercentual}%
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">Anterior: R$ {dadosMercado.valorAnterior}M</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Volume Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{dadosMercado.volumeAtual}M kg</span>
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{dadosMercado.variacaoPercentual}%
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">Anterior: {dadosMercado.volumeAnterior}M kg</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Share Nutrimental</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold">{dadosShare.shareAtual}%</span>
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{dadosShare.variacaoPontos}pp
              </Badge>
            </div>
            <p className="text-sm text-gray-500 mt-2">Anterior: {dadosShare.shareAnterior}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Card de Teste */}
      <Card>
        <CardHeader>
          <CardTitle>✅ Versão Sem Gráficos - Funcionando!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Esta é uma versão sem gráficos Recharts para identificar se o problema está nos componentes de visualização.
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold">Categoria: {selectedCategoria}</p>
            <p className="font-semibold">Período: {selectedPeriodo}</p>
            <p className="font-semibold">Mês: {selectedMes}</p>
            <p className="font-semibold">Região: {selectedRegiao}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
