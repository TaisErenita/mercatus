import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import { getPeriodoLegenda } from '../utils/periodHelpers';

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

      {/* Conteúdo Principal */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Mercado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Mercado Total</p>
              <p className="text-3xl font-bold text-cyan-600">R$ 159.2M</p>
            </div>
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
              <p className="text-lg font-semibold">{selectedRegion}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoramentoScanntech;
