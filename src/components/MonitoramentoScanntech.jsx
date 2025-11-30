import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import { getScanntechMercadoTotal, getScanntechShareNutrimental } from '../data/scanntechDataReal';
import { getPeriodoLegenda } from '../utils/periodHelpers';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MonitoramentoScanntech = ({
  onVoltar,
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
  selectedMes,
  setSelectedMes
}) => {
  const [selectedRegion, setSelectedRegion] = useState('brasil');
  
  const periodoLegenda = getPeriodoLegenda(selectedPeriod, selectedMes);
  
  // Dados Scanntech
  const mercadoTotal = getScanntechMercadoTotal();
  const shareNutrimental = getScanntechShareNutrimental();

  return (
    <div className="space-y-6">
      {/* Filtros Compartilhados */}
      <FiltrosMonitoramento
        titulo="Scanntech"
        subtitulo="Mercado Total & Concorrência"
        badgeTexto="Mercado"
        badgeColor="bg-cyan-100 text-cyan-800 border-cyan-300"
        onVoltar={onVoltar}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedMes={selectedMes}
        setSelectedMes={setSelectedMes}
        periodoLegenda={periodoLegenda}
      />

      {/* Filtro Específico: Região */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtro de Região</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['brasil', 'sp_rj_mg_es', 'sul', 'nordeste', 'centro_oeste', 'norte'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedRegion === region
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {region === 'brasil' ? 'Brasil' :
                 region === 'sp_rj_mg_es' ? 'SP/RJ/MG/ES' :
                 region === 'sul' ? 'Sul' :
                 region === 'nordeste' ? 'Nordeste' :
                 region === 'centro_oeste' ? 'Centro-Oeste' : 'Norte'}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mercado Total */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Mercado Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-cyan-600">
                R$ {(mercadoTotal.atual.valor / 1000000).toFixed(1)}M
              </p>
              <div className="flex items-center space-x-2">
                {mercadoTotal.variacao >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <Badge variant={mercadoTotal.variacao >= 0 ? "success" : "destructive"}>
                  {mercadoTotal.variacao >= 0 ? '+' : ''}{mercadoTotal.variacao.toFixed(1)}%
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Anterior: R$ {(mercadoTotal.anterior.valor / 1000000).toFixed(1)}M
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Volume */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Volume Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-cyan-600">
                {(mercadoTotal.atual.volume / 1000000).toFixed(2)}M kg
              </p>
              <div className="flex items-center space-x-2">
                {mercadoTotal.variacao >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <Badge variant={mercadoTotal.variacao >= 0 ? "success" : "destructive"}>
                  {mercadoTotal.variacao >= 0 ? '+' : ''}{mercadoTotal.variacao.toFixed(1)}%
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Anterior: {(mercadoTotal.anterior.volume / 1000000).toFixed(2)}M kg
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Share Nutrimental */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Share Nutrimental</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-purple-600">
                {shareNutrimental.atual.toFixed(1)}%
              </p>
              <div className="flex items-center space-x-2">
                {shareNutrimental.variacao >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <Badge variant={shareNutrimental.variacao >= 0 ? "success" : "destructive"}>
                  {shareNutrimental.variacao >= 0 ? '+' : ''}{shareNutrimental.variacao.toFixed(1)}pp
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Anterior: {shareNutrimental.anterior.toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Análise</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Categoria Selecionada</p>
              <p className="text-lg font-semibold">{selectedCategory}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Período</p>
              <p className="text-lg font-semibold">{periodoLegenda.longa}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Região</p>
              <p className="text-lg font-semibold">
                {selectedRegion === 'brasil' ? 'Brasil' :
                 selectedRegion === 'sp_rj_mg_es' ? 'SP/RJ/MG/ES' :
                 selectedRegion === 'sul' ? 'Sul' :
                 selectedRegion === 'nordeste' ? 'Nordeste' :
                 selectedRegion === 'centro_oeste' ? 'Centro-Oeste' : 'Norte'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Preço Médio</p>
              <p className="text-lg font-semibold">
                R$ {mercadoTotal.atual.precoMedio.toFixed(2)}/kg
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoramentoScanntech;
