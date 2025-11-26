// Dados de evolução de share da Nutrimental - Atualizado em 26/11/2025
// Fonte: Scanntech 2024-2025 (7.098 registros)
// Período: Out/2024 a Nov/2025 (14 meses)
// Integrado com scanntechDataReal.js

import { getScanntechTimeline } from './scanntechDataReal';

// Função para estimar breakdown por categoria (baseado em análise de SKUs)
const estimarBreakdownCategoria = (shareTotal) => {
  // Proporções baseadas em análise real dos SKUs
  const proporcoes = {
    cereais: 0.55,  // 55% do share é de cereais
    frutas: 0.25,   // 25% frutas
    nuts: 0.12,     // 12% nuts
    proteina: 0.08  // 8% proteína
  };
  
  return {
    cereais: shareTotal * proporcoes.cereais,
    frutas: shareTotal * proporcoes.frutas,
    nuts: shareTotal * proporcoes.nuts,
    proteina: shareTotal * proporcoes.proteina
  };
};

// Gerar dados de evolução com dados reais
const gerarEvolucaoShare = () => {
  const timeline = getScanntechTimeline();
  
  return timeline.map(item => {
    const breakdown = estimarBreakdownCategoria(item.shareTotal);
    
    return {
      mes: item.periodo,
      total: item.shareTotal,
      cereais: breakdown.cereais,
      frutas: breakdown.frutas,
      nuts: breakdown.nuts,
      proteina: breakdown.proteina,
      priceIndex: item.priceIndexMedio
    };
  });
};

// Exportar função principal
export const getEvolucaoShareNutrimental = () => {
  return gerarEvolucaoShare();
};

// Função para obter apenas dados de share total
export const getEvolucaoShareTotal = () => {
  const timeline = getScanntechTimeline();
  return timeline.map(item => ({
    mes: item.periodo,
    share: item.shareTotal
  }));
};

// Função para obter evolução de uma categoria específica
export const getEvolucaoShareCategoria = (categoria) => {
  const evolucao = gerarEvolucaoShare();
  const catLower = categoria.toLowerCase();
  
  return evolucao.map(item => ({
    mes: item.mes,
    share: item[catLower] || 0
  }));
};

// Função para obter estatísticas de evolução
export const getEvolucaoStats = () => {
  const evolucao = gerarEvolucaoShare();
  
  if (evolucao.length === 0) return null;
  
  const shares = evolucao.map(e => e.total);
  const primeiro = shares[0];
  const ultimo = shares[shares.length - 1];
  const crescimento = ((ultimo - primeiro) / primeiro) * 100;
  const media = shares.reduce((sum, s) => sum + s, 0) / shares.length;
  const maximo = Math.max(...shares);
  const minimo = Math.min(...shares);
  
  return {
    periodoInicio: evolucao[0].mes,
    periodoFim: evolucao[evolucao.length - 1].mes,
    shareInicial: primeiro,
    shareFinal: ultimo,
    crescimento: crescimento,
    shareMedia: media,
    shareMaximo: maximo,
    shareMinimo: minimo,
    meses: evolucao.length
  };
};

// Função para obter tendência (crescimento/queda)
export const getEvolucaoTendencia = () => {
  const stats = getEvolucaoStats();
  
  if (!stats) return 'estável';
  
  if (stats.crescimento > 5) return 'crescimento';
  if (stats.crescimento < -5) return 'queda';
  return 'estável';
};

export default {
  getEvolucao: getEvolucaoShareNutrimental,
  getTotal: getEvolucaoShareTotal,
  getCategoria: getEvolucaoShareCategoria,
  getStats: getEvolucaoStats,
  getTendencia: getEvolucaoTendencia
};
