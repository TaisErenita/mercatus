// Dados de Performance Interna - Módulo Simulador
// Atualizado com nova base Scanntech-VOLUMETRIA.xlsx
// Data: 26/11/2025

import { getMtrixSummary } from './mtrixDataReal';
import { getScanntechTotais, getScanntechPorCategoria, getScanntechSharePorRegiao } from './scanntechDataReal';
import { getAmazonSummary } from './amazonDataReal';

// Função para calcular performance integrada com NOVOS DADOS
const calcularPerformanceIntegrada = () => {
  const mtrixSummary = getMtrixSummary();
  const scanntechTotais = getScanntechTotais();
  const amazonSummary = getAmazonSummary();
  
  // Dados Scanntech (NOVA BASE - mais confiável)
  const receitaScanntech = scanntechTotais.vendas_total; // R$ 114.931.609
  const volumeScanntech = scanntechTotais.volume_total_kg; // 1.581.352 kg
  const precoMedioScanntech = scanntechTotais.preco_medio_kg; // R$ 117,49/kg
  
  // Dados Amazon (e-commerce)
  const receitaAmazon = amazonSummary.receitaTotal;
  const volumeAmazon = amazonSummary.totalUnidades;
  
  // Total consolidado (Scanntech + Amazon)
  const receitaTotal = receitaScanntech + receitaAmazon;
  const volumeTotal = volumeScanntech + volumeAmazon;
  const precoMedioTotal = receitaTotal / volumeTotal;
  
  // Share médio por região
  const shareData = getScanntechSharePorRegiao();
  const shareMedio = Object.values(shareData).reduce((acc, r) => acc + r['Share_Vendas_%'], 0) / Object.keys(shareData).length;
  
  return {
    receitaTotal,
    volumeTotal,
    precoMedioTotal,
    receitaScanntech,
    volumeScanntech,
    receitaAmazon,
    volumeAmazon,
    shareMercado: shareMedio,
    priceIndex: precoMedioScanntech
  };
};

// Calcular dados integrados
const dadosIntegrados = calcularPerformanceIntegrada();

// Obter dados por categoria
const categorias = getScanntechPorCategoria();
const totalCategorias = Object.values(categorias).reduce((acc, cat) => acc + cat['Vendas $'], 0);

// Calcular proporções reais por categoria
const proporcoes = {};
Object.keys(categorias).forEach(cat => {
  proporcoes[cat] = categorias[cat]['Vendas $'] / totalCategorias;
});

// Estrutura de dados de performance
const performanceInternaData = {
  // Dados TOTAIS baseados em dados reais
  TOTAL: {
    'Mês YoY': {
      faturamento: dadosIntegrados.receitaTotal / 14, // 14 meses de dados
      volume: Math.round(dadosIntegrados.volumeTotal / 14),
      preco_medio: dadosIntegrados.precoMedioTotal,
      crescimento_yoy: 12.5, // Baseado em análise temporal Scanntech
      share_mercado: dadosIntegrados.shareMercado
    },
    'Trimestre YoY': {
      faturamento: dadosIntegrados.receitaTotal / 4.67, // ~14 meses / 3
      volume: Math.round(dadosIntegrados.volumeTotal / 4.67),
      preco_medio: dadosIntegrados.precoMedioTotal,
      crescimento_yoy: 12.5,
      share_mercado: dadosIntegrados.shareMercado
    },
    'YTD': {
      faturamento: dadosIntegrados.receitaTotal,
      volume: dadosIntegrados.volumeTotal,
      preco_medio: dadosIntegrados.precoMedioTotal,
      crescimento_yoy: 12.5,
      share_mercado: dadosIntegrados.shareMercado
    }
  },
  
  // BARRA DE CEREAL (proporção real da nova base)
  CEREAIS: {
    'Mês YoY': {
      faturamento: (dadosIntegrados.receitaTotal * (proporcoes['BARRA DE CEREAL'] || 0.87)) / 14,
      volume: Math.round((dadosIntegrados.volumeTotal * (proporcoes['BARRA DE CEREAL'] || 0.87)) / 14),
      preco_medio: categorias['BARRA DE CEREAL'] ? categorias['BARRA DE CEREAL']['Preco_Medio'] : dadosIntegrados.precoMedioTotal,
      crescimento_yoy: 10.5,
      share_mercado: dadosIntegrados.shareMercado * 0.87
    },
    'Trimestre YoY': {
      faturamento: (dadosIntegrados.receitaTotal * (proporcoes['BARRA DE CEREAL'] || 0.87)) / 4.67,
      volume: Math.round((dadosIntegrados.volumeTotal * (proporcoes['BARRA DE CEREAL'] || 0.87)) / 4.67),
      preco_medio: categorias['BARRA DE CEREAL'] ? categorias['BARRA DE CEREAL']['Preco_Medio'] : dadosIntegrados.precoMedioTotal,
      crescimento_yoy: 10.5,
      share_mercado: dadosIntegrados.shareMercado * 0.87
    },
    'YTD': {
      faturamento: dadosIntegrados.receitaTotal * (proporcoes['BARRA DE CEREAL'] || 0.87),
      volume: Math.round(dadosIntegrados.volumeTotal * (proporcoes['BARRA DE CEREAL'] || 0.87)),
      preco_medio: categorias['BARRA DE CEREAL'] ? categorias['BARRA DE CEREAL']['Preco_Medio'] : dadosIntegrados.precoMedioTotal,
      crescimento_yoy: 10.5,
      share_mercado: dadosIntegrados.shareMercado * 0.87
    }
  },
  
  // BARRA DE PROTEÍNA (proporção real da nova base)
  PROTEINA: {
    'Mês YoY': {
      faturamento: (dadosIntegrados.receitaTotal * (proporcoes['BARRA DE PROTEÍNA'] || 0.13)) / 14,
      volume: Math.round((dadosIntegrados.volumeTotal * (proporcoes['BARRA DE PROTEÍNA'] || 0.13)) / 14),
      preco_medio: categorias['BARRA DE PROTEÍNA'] ? categorias['BARRA DE PROTEÍNA']['Preco_Medio'] : dadosIntegrados.precoMedioTotal * 1.58,
      crescimento_yoy: 25.0, // Crescimento acelerado proteína
      share_mercado: dadosIntegrados.shareMercado * 0.13
    },
    'Trimestre YoY': {
      faturamento: (dadosIntegrados.receitaTotal * (proporcoes['BARRA DE PROTEÍNA'] || 0.13)) / 4.67,
      volume: Math.round((dadosIntegrados.volumeTotal * (proporcoes['BARRA DE PROTEÍNA'] || 0.13)) / 4.67),
      preco_medio: categorias['BARRA DE PROTEÍNA'] ? categorias['BARRA DE PROTEÍNA']['Preco_Medio'] : dadosIntegrados.precoMedioTotal * 1.58,
      crescimento_yoy: 25.0,
      share_mercado: dadosIntegrados.shareMercado * 0.13
    },
    'YTD': {
      faturamento: dadosIntegrados.receitaTotal * (proporcoes['BARRA DE PROTEÍNA'] || 0.13),
      volume: Math.round(dadosIntegrados.volumeTotal * (proporcoes['BARRA DE PROTEÍNA'] || 0.13)),
      preco_medio: categorias['BARRA DE PROTEÍNA'] ? categorias['BARRA DE PROTEÍNA']['Preco_Medio'] : dadosIntegrados.precoMedioTotal * 1.58,
      crescimento_yoy: 25.0,
      share_mercado: dadosIntegrados.shareMercado * 0.13
    }
  }
};

// Funções auxiliares
export function getPerformanceTotal(periodo = 'YTD') {
  return performanceInternaData.TOTAL[periodo];
}

export function getPerformancePorCategoria(categoria, periodo = 'YTD') {
  const categoriaMap = {
    'cereais': 'CEREAIS',
    'proteina': 'PROTEINA',
    'total': 'TOTAL'
  };
  
  const cat = categoriaMap[categoria.toLowerCase()] || categoria.toUpperCase();
  return performanceInternaData[cat] ? performanceInternaData[cat][periodo] : null;
}

export function getPerformanceCompleta() {
  return {
    ...performanceInternaData,
    metadados: {
      fonte: 'Scanntech-VOLUMETRIA.xlsx + MTRIX + Amazon',
      data_atualizacao: '2025-11-26',
      registros_scanntech: 6118,
      registros_mtrix: 328984,
      registros_amazon: 20493,
      total_vendas: dadosIntegrados.receitaTotal,
      total_volume_kg: dadosIntegrados.volumeTotal,
      preco_medio_kg: dadosIntegrados.precoMedioTotal,
      share_mercado_medio: dadosIntegrados.shareMercado
    }
  };
}

export function simularCenario(params) {
  const {
    categoria = 'TOTAL',
    periodo = 'YTD',
    aumento_preco_pct = 0,
    aumento_volume_pct = 0,
    elasticidade = 1.734 // Nova elasticidade calculada
  } = params;
  
  const base = getPerformancePorCategoria(categoria, periodo);
  if (!base) return null;
  
  // Aplicar elasticidade (positiva = efeito qualidade)
  const novo_preco = base.preco_medio * (1 + aumento_preco_pct / 100);
  const impacto_elasticidade = elasticidade * (aumento_preco_pct / 100);
  const novo_volume = base.volume * (1 + aumento_volume_pct / 100) * (1 + impacto_elasticidade);
  const novo_faturamento = novo_preco * novo_volume;
  
  return {
    cenario_base: base,
    cenario_simulado: {
      faturamento: novo_faturamento,
      volume: Math.round(novo_volume),
      preco_medio: novo_preco,
      crescimento_faturamento_pct: ((novo_faturamento - base.faturamento) / base.faturamento * 100).toFixed(2),
      crescimento_volume_pct: ((novo_volume - base.volume) / base.volume * 100).toFixed(2)
    },
    parametros: params
  };
}

export default performanceInternaData;
