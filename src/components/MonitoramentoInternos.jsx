import React, { useState } from 'react';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import NutrimentalInterna from './NutrimentalInterna';
import { getNutrimentalInternaData } from '../data/nutrimentalInternaData';

const MonitoramentoInternos = ({
  onVoltar,
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
  selectedMes,
  setSelectedMes,
  periodoLegenda
}) => {
  const [selectedCanal, setSelectedCanal] = useState('todos');
  const [selectedRegiao, setSelectedRegiao] = useState('todas');

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

  // Obter dados internos
  const dadosInternos = getNutrimentalInternaData();

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <FiltrosMonitoramento
        titulo="Dados Internos - Performance Nutrimental"
        subtitulo="Análise detalhada de vendas, canais e regiões"
        badgeTexto="Dados Internos"
        badgeColor="bg-purple-100 text-purple-800 border-purple-300"
        onVoltar={onVoltar}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedMes={selectedMes}
        setSelectedMes={setSelectedMes}
        periodoLegenda={periodoLegenda}
      >
        {/* Filtro de Canal */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Canal de Vendas</h4>
          <div className="flex flex-wrap gap-2">
            {canais.map((canal) => (
              <button
                key={canal.id}
                onClick={() => setSelectedCanal(canal.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCanal === canal.id
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-purple-300'
                }`}
              >
                {canal.label}
              </button>
            ))}
          </div>
        </div>

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
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-purple-300'
                }`}
              >
                {regiao.label}
              </button>
            ))}
          </div>
        </div>
      </FiltrosMonitoramento>

      {/* Componente NutrimentalInterna com dados */}
      <NutrimentalInterna data={dadosInternos} />
    </div>
  );
};

export default MonitoramentoInternos;
