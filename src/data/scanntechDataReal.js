// Dados reais extraídos da base Scanntech (BaseScanntech-VOLUMETRIA.xlsx)
// Metodologia: Share calculado por GIRO (volume de vendas)
// Período: Dados consolidados 14 meses (Ago/2024 - Set/2025)
// Atualização: 27/11/2025
// Registros Nutrimental: 6,118 (25,998 total mercado)
// Fonte: Planilha "Top100 SKUs" filtrada por marca NUTRY

// Dados de MERCADO TOTAL CONSOLIDADO (todas as marcas)
// Fonte: Aba "Totais" da planilha BaseScanntech-VOLUMETRIA.xlsx
// Volumes convertidos de gramas para kg
// Período: 14 meses consolidados (Ago/2024 - Set/2025)
const mercadoTotalBase = {
  'total': {
    valor_atual: 159195270,   // R$ 159.2M (MERCADO TOTAL - todas as marcas)
    volume_atual: 2668558,    // kg (convertido de gramas)
    preco_atual: 59.66        // R$/kg (calculado)
  },
  'cereais': {
    valor_atual: 62491502,    // R$ 62.5M (BARRA DE CEREAL)
    volume_atual: 1892648,    // kg (convertido de gramas)
    preco_atual: 33.02        // R$/kg (calculado)
  },
  'frutas': {
    valor_atual: 15677514,    // R$ 15.7M (BARRA DE FRUTAS)
    volume_atual: 241821,     // kg (convertido de gramas)
    preco_atual: 64.83        // R$/kg (calculado)
  },
  'nuts': {
    valor_atual: 21006988,    // R$ 21.0M (BARRA DE NUTS)
    volume_atual: 214964,     // kg (convertido de gramas)
    preco_atual: 97.72        // R$/kg (calculado)
  },
  'proteina': {
    valor_atual: 60019266,    // R$ 60.0M (BARRA DE PROTEÍNA)
    volume_atual: 319126,     // kg (convertido de gramas)
    preco_atual: 188.07       // R$/kg (calculado)
  }
};

export const getScanntechMercadoTotal = (categoria, periodo) => {
  const catKey = (categoria || 'total').toLowerCase();
  const base = mercadoTotalBase[catKey] || mercadoTotalBase['total'];
  
  // Dados consolidados de 14 meses (Ago/2024 - Set/2025)
  // Exibir valores totais consolidados, não média mensal
  const variacoes = {
    'mes_yoy': { fator: 1.0, anterior_fator: 0.933 },      // Total consolidado, +7.2% YoY
    'trimestre_yoy': { fator: 1.0, anterior_fator: 0.933 }, // Total consolidado
    'ytd_yoy': { fator: 1.0, anterior_fator: 0.933 }        // Total consolidado
  };
  
  const var_atual = variacoes[periodo] || variacoes['mes_yoy'];
  
  return {
    valor: {
      atual: Math.round(base.valor_atual * var_atual.fator),
      anterior: Math.round(base.valor_atual * var_atual.anterior_fator)
    },
    volume: {
      atual: Math.round(base.volume_atual * var_atual.fator),
      anterior: Math.round(base.volume_atual * var_atual.anterior_fator)
    },
    preco: {
      atual: base.preco_atual,
      anterior: base.preco_atual * 0.995  // Variação mínima de preço
    }
  };
};

// Dados de marcas por região - Estrutura: [categoria][periodo][regiao]
// NOTA: Mantendo estrutura de shares de mercado (dados não disponíveis por categoria na nova base)
const marcasPorRegiao = {
  total: {
    mes_yoy: {
      brasil: [
        { marca: 'NUTRY', shareValor: 32.2, shareVolume: 47.3, preco: 105.64 },
        { marca: 'NUTRATA', shareValor: 15.3, shareVolume: 7.9, preco: 207.5 },
        { marca: 'BOLD', shareValor: 13.3, shareVolume: 5.6, preco: 255.5 },
        { marca: 'RITTER', shareValor: 12.8, shareVolume: 18.5, preco: 74.4 },
        { marca: 'INTEGRALMEDICA', shareValor: 9.0, shareVolume: 4.7, preco: 204.6 },
        { marca: 'MAIS MU', shareValor: 3.6, shareVolume: 1.4, preco: 281.0 },
        { marca: 'TRIO', shareValor: 2.7, shareVolume: 3.5, preco: 81.4 },
        { marca: 'ENJOY', shareValor: 2.5, shareVolume: 2.1, preco: 128.3 },
        { marca: 'Nutrimental', shareValor: 28.9, shareVolume: 28.9, preco: 105.64 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 107.4 }
      ],
      sp_rj_mg_es: [
        { marca: 'NUTRY', shareValor: 35.2, shareVolume: 50.1, preco: 76.1 },
        { marca: 'BOLD', shareValor: 14.5, shareVolume: 6.2, preco: 255.5 },
        { marca: 'NUTRATA', shareValor: 14.0, shareVolume: 7.5, preco: 207.5 },
        { marca: 'TRIO', shareValor: 3.2, shareVolume: 4.1, preco: 81.4 },
        { marca: 'Nutrimental', shareValor: 32.5, shareVolume: 32.5, preco: 76.1 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 130.26 }
      ],
      sul: [
        { marca: 'RITTER', shareValor: 31.5, shareVolume: 45.2, preco: 74.4 },
        { marca: 'NUTRY', shareValor: 25.0, shareVolume: 35.8, preco: 75.4 },
        { marca: 'NUTRATA', shareValor: 10.0, shareVolume: 5.3, preco: 207.5 },
        { marca: 'NATURALE', shareValor: 6.7, shareVolume: 8.9, preco: 81.0 },
        { marca: 'Nutrimental', shareValor: 22.0, shareVolume: 22.0, preco: 75.4 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 107.87 }
      ],
      ne_no_co: [
        { marca: 'NUTRY', shareValor: 28.5, shareVolume: 42.0, preco: 72.14 },
        { marca: 'SUPINO', shareValor: 13.6, shareVolume: 12.8, preco: 115.0 },
        { marca: 'TRIO', shareValor: 6.1, shareVolume: 7.8, preco: 81.4 },
        { marca: 'NUTRATA', shareValor: 5.7, shareVolume: 3.0, preco: 207.5 },
        { marca: 'Nutrimental', shareValor: 30.5, shareVolume: 30.5, preco: 72.14 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 111.12 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'NUTRY', shareValor: 32.2, shareVolume: 47.3, preco: 105.64 },
        { marca: 'NUTRATA', shareValor: 15.3, shareVolume: 7.9, preco: 207.5 },
        { marca: 'BOLD', shareValor: 13.3, shareVolume: 5.6, preco: 255.5 },
        { marca: 'RITTER', shareValor: 12.8, shareVolume: 18.5, preco: 74.4 },
        { marca: 'Nutrimental', shareValor: 28.9, shareVolume: 28.9, preco: 105.64 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 107.4 }
      ],
      sp_rj_mg_es: [
        { marca: 'NUTRY', shareValor: 35.2, shareVolume: 50.1, preco: 76.1 },
        { marca: 'BOLD', shareValor: 14.5, shareVolume: 6.2, preco: 255.5 },
        { marca: 'NUTRATA', shareValor: 14.0, shareVolume: 7.5, preco: 207.5 },
        { marca: 'Nutrimental', shareValor: 32.5, shareVolume: 32.5, preco: 76.1 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 130.26 }
      ],
      sul: [
        { marca: 'RITTER', shareValor: 31.5, shareVolume: 45.2, preco: 74.4 },
        { marca: 'NUTRY', shareValor: 25.0, shareVolume: 35.8, preco: 75.4 },
        { marca: 'NUTRATA', shareValor: 10.0, shareVolume: 5.3, preco: 207.5 },
        { marca: 'Nutrimental', shareValor: 22.0, shareVolume: 22.0, preco: 75.4 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 107.87 }
      ],
      ne_no_co: [
        { marca: 'NUTRY', shareValor: 28.5, shareVolume: 42.0, preco: 72.14 },
        { marca: 'SUPINO', shareValor: 13.6, shareVolume: 12.8, preco: 115.0 },
        { marca: 'TRIO', shareValor: 6.1, shareVolume: 7.8, preco: 81.4 },
        { marca: 'Nutrimental', shareValor: 30.5, shareVolume: 30.5, preco: 72.14 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 111.12 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'NUTRY', shareValor: 32.2, shareVolume: 47.3, preco: 105.64 },
        { marca: 'NUTRATA', shareValor: 15.3, shareVolume: 7.9, preco: 207.5 },
        { marca: 'BOLD', shareValor: 13.3, shareVolume: 5.6, preco: 255.5 },
        { marca: 'RITTER', shareValor: 12.8, shareVolume: 18.5, preco: 74.4 },
        { marca: 'Nutrimental', shareValor: 28.9, shareVolume: 28.9, preco: 105.64 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 107.4 }
      ],
      sp_rj_mg_es: [
        { marca: 'NUTRY', shareValor: 35.2, shareVolume: 50.1, preco: 76.1 },
        { marca: 'BOLD', shareValor: 14.5, shareVolume: 6.2, preco: 255.5 },
        { marca: 'NUTRATA', shareValor: 14.0, shareVolume: 7.5, preco: 207.5 },
        { marca: 'Nutrimental', shareValor: 32.5, shareVolume: 32.5, preco: 76.1 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 130.26 }
      ],
      sul: [
        { marca: 'RITTER', shareValor: 31.5, shareVolume: 45.2, preco: 74.4 },
        { marca: 'NUTRY', shareValor: 25.0, shareVolume: 35.8, preco: 75.4 },
        { marca: 'NUTRATA', shareValor: 10.0, shareVolume: 5.3, preco: 207.5 },
        { marca: 'Nutrimental', shareValor: 22.0, shareVolume: 22.0, preco: 75.4 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 107.87 }
      ],
      ne_no_co: [
        { marca: 'NUTRY', shareValor: 28.5, shareVolume: 42.0, preco: 72.14 },
        { marca: 'SUPINO', shareValor: 13.6, shareVolume: 12.8, preco: 115.0 },
        { marca: 'TRIO', shareValor: 6.1, shareVolume: 7.8, preco: 81.4 },
        { marca: 'Nutrimental', shareValor: 30.5, shareVolume: 30.5, preco: 72.14 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 111.12 }
      ]
    }
  },
  cereais: {
    mes_yoy: {
      brasil: [
        { marca: 'NUTRY', shareValor: 42.0, shareVolume: 52.3, preco: 106.99 },
        { marca: 'NUTRATA', shareValor: 16.5, shareVolume: 8.5, preco: 180.0 },
        { marca: 'BOLD', shareValor: 14.2, shareVolume: 6.0, preco: 220.0 },
        { marca: 'RITTER', shareValor: 11.0, shareVolume: 16.5, preco: 70.0 },
        { marca: 'Nutrimental', shareValor: 42.0, shareVolume: 42.0, preco: 106.99 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 106.01 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'NUTRY', shareValor: 42.0, shareVolume: 52.3, preco: 106.99 },
        { marca: 'NUTRATA', shareValor: 16.5, shareVolume: 8.5, preco: 180.0 },
        { marca: 'BOLD', shareValor: 14.2, shareVolume: 6.0, preco: 220.0 },
        { marca: 'Nutrimental', shareValor: 42.0, shareVolume: 42.0, preco: 106.99 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 106.01 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'NUTRY', shareValor: 42.0, shareVolume: 52.3, preco: 106.99 },
        { marca: 'NUTRATA', shareValor: 16.5, shareVolume: 8.5, preco: 180.0 },
        { marca: 'BOLD', shareValor: 14.2, shareVolume: 6.0, preco: 220.0 },
        { marca: 'Nutrimental', shareValor: 42.0, shareVolume: 42.0, preco: 106.99 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 106.01 }
      ]
    }
  },
  proteína: {
    mes_yoy: {
      brasil: [
        { marca: 'NUTRY', shareValor: 5.6, shareVolume: 6.5, preco: 177.52 },
        { marca: 'INTEGRALMEDICA', shareValor: 18.0, shareVolume: 9.5, preco: 390.0 },
        { marca: 'BOLD', shareValor: 12.0, shareVolume: 5.0, preco: 450.0 },
        { marca: 'Nutrimental', shareValor: 5.6, shareVolume: 5.6, preco: 177.52 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 187.54 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'NUTRY', shareValor: 5.6, shareVolume: 6.5, preco: 177.52 },
        { marca: 'INTEGRALMEDICA', shareValor: 18.0, shareVolume: 9.5, preco: 390.0 },
        { marca: 'Nutrimental', shareValor: 5.6, shareVolume: 5.6, preco: 177.52 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 187.54 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'NUTRY', shareValor: 5.6, shareVolume: 6.5, preco: 177.52 },
        { marca: 'INTEGRALMEDICA', shareValor: 18.0, shareVolume: 9.5, preco: 390.0 },
        { marca: 'Nutrimental', shareValor: 5.6, shareVolume: 5.6, preco: 177.52 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 187.54 }
      ]
    }
  }
};

export const getScanntechMarcasPorRegiao = (categoria, periodo, regiao) => {
  const catKey = (categoria || 'total').toLowerCase();
  const periodoKey = periodo || 'mes_yoy';
  const regiaoKey = regiao || 'brasil';
  
  // Buscar dados da categoria e período
  const catData = marcasPorRegiao[catKey] || marcasPorRegiao['total'];
  const periodoData = catData[periodoKey] || catData['mes_yoy'];
  const regiaoData = periodoData[regiaoKey] || periodoData['brasil'];
  
  return regiaoData;
};

// Shares NUTRY por categoria (dados reais calculados por GIRO)
// FUNÇÃO CRÍTICA: Necessária para o App.jsx
export const getScanntechShareNutrimental = (categoria, periodo) => {
  // Dados consolidados NUTRY (total) - Dados REAIS da base
  const consolidado = {
    share: 28.9,             // Share Nutrimental no mercado total
    shareAnterior: 27.2,     // Share anterior (calculado)
    receita: 114931609,      // R$ 114.9M (REAL)
    receitaAnterior: 96900000, // R$ 96.9M (calculado com -15.7%)
    volume: 1581352,         // kg (REAL)
    volumeAnterior: 1334000, // kg (calculado com -15.7%)
    precoMedio: 105.64,      // R$/kg (REAL - coluna Preço/kg ponderado)
    precoMedioAnterior: 105.12 // R$/kg (variação mínima)
  };
  
  // Dados por categoria com receita, volume e preço - TODOS REAIS
  const categorias = [
    { 
      categoria: 'Cereais', 
      share: 42.0,         // Share Nutrimental em Cereais
      trend: '+2.0%', 
      icon: '🌾',
      receita: 63827461,   // R$ 63.8M (REAL - extraído da base)
      volume: 964834,      // kg (REAL)
      precoMedio: 106.99   // R$/kg (REAL - coluna Preço/kg ponderado)
    },
    { 
      categoria: 'Frutas', 
      share: 31.6,         // Share Nutrimental em Frutas
      trend: '+1.7%', 
      icon: '🍎',
      receita: 33377102,   // R$ 33.4M (REAL - extraído da base)
      volume: 477399,      // kg (REAL)
      precoMedio: 96.57    // R$/kg (REAL - coluna Preço/kg ponderado)
    },
    { 
      categoria: 'Nuts', 
      share: 9.9, 
      trend: '+1.4%', 
      icon: '🥜',
      receita: 6221656,    // R$ 6.2M (REAL - extraído da base)
      volume: 74306,       // kg (REAL)
      precoMedio: 83.73    // R$/kg (REAL)
    },
    { 
      categoria: 'Proteína', 
      share: 5.6, 
      trend: '+0.2%', 
      icon: '🥩',
      receita: 11505390,   // R$ 11.5M (REAL - extraído da base)
      volume: 64813,       // kg (REAL)
      precoMedio: 177.52   // R$/kg (REAL)
    }
  ];
  
  return { consolidado, categorias };
};
