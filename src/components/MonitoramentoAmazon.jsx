import React from 'react';
import FiltrosMonitoramento from './FiltrosMonitoramento';
import AnaliseAmazon from './AnaliseAmazon';

const MonitoramentoAmazon = ({
  onVoltar,
  selectedCategory,
  setSelectedCategory,
  selectedPeriod,
  setSelectedPeriod,
  selectedMes,
  setSelectedMes,
  periodoLegenda
}) => {
  return (
    <div className="space-y-6">
      {/* Filtros */}
      <FiltrosMonitoramento
        titulo="Amazon - E-commerce & Digital"
        subtitulo="Análise de vendas no marketplace Amazon"
        badgeTexto="Amazon"
        badgeColor="bg-orange-100 text-orange-800 border-orange-300"
        onVoltar={onVoltar}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        selectedMes={selectedMes}
        setSelectedMes={setSelectedMes}
        periodoLegenda={periodoLegenda}
      />

      {/* Componente AnaliseAmazon */}
      <AnaliseAmazon />
    </div>
  );
};

export default MonitoramentoAmazon;
