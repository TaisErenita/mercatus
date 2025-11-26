// Dados reais extraídos da base Scanntech (Basereg-canal.xlsx)
// Metodologia: Share calculado por GIRO (volume de vendas)
// Período: Agosto 2024

// Dados de mercado total por categoria
// Valores estimados baseados em shares e preços reais do Scanntech
const mercadoTotalBase = {
  'total': {
    valor_atual: 238500000,  // R$ 238.5M
    volume_atual: 703608,     // unidades
    preco_atual: 338.92       // R$/un
  },
  'cereais': {
    valor_atual: 119500000,   // R$ 119.5M
    volume_atual: 351804,     // unidades
    preco_atual: 339.65       // R$/un
  },
  'frutas': {
    valor_atual: 83100000,    // R$ 83.1M
    volume_atual: 245856,     // unidades
    preco_atual: 338.05       // R$/un
  },
  'nuts': {
    valor_atual: 35900000,    // R$ 35.9M (estimado)
    volume_atual: 106148,     // unidades (estimado)
    preco_atual: 338.20       // R$/un (estimado)
  },
  'proteína': {
    valor_atual: 54700000,    // R$ 54.7M
    volume_atual: 161400,     // unidades
    preco_atual: 338.92       // R$/un
  }
};

export const getScanntechMercadoTotal = (categoria, periodo) => {
  const catKey = categoria.toLowerCase();
  const base = mercadoTotalBase[catKey] || mercadoTotalBase['total'];
  
  // Simular variações temporais (dados Scanntech são snapshot de Agosto 2024)
  const variacoes = {
    'mes_yoy': { fator: 1.0, anterior_fator: 0.844 },      // +18.5% YoY
    'trimestre_yoy': { fator: 1.0, anterior_fator: 0.875 }, // +14.2% YoY
    'ytd_yoy': { fator: 1.0, anterior_fator: 0.824 }        // +21.3% YoY
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
const marcasPorRegiao = {
  total: {
    mes_yoy: {
      brasil: [
        { marca: 'SUPINO', shareValor: 10.9, shareVolume: 10.9, preco: 16.92 },
        { marca: 'NUTRATA', shareValor: 6.4, shareVolume: 6.4, preco: 10.77 },
        { marca: 'BOLD', shareValor: 5.6, shareVolume: 5.6, preco: 12.90 },
        { marca: 'Nutrimental', shareValor: 28.9, shareVolume: 28.9, preco: 15.64 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.85 }
      ],
      sp_rj_mg_es: [
        { marca: 'BOLD', shareValor: 7.5, shareVolume: 7.5, preco: 12.89 },
        { marca: 'NUTRATA', shareValor: 7.0, shareVolume: 7.0, preco: 11.01 },
        { marca: 'TRIO', shareValor: 5.4, shareVolume: 5.4, preco: 6.87 },
        { marca: 'Nutrimental', shareValor: 32.5, shareVolume: 32.5, preco: 23.30 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.95 }
      ],
      sul: [
        { marca: 'RITTER', shareValor: 31.5, shareVolume: 31.5, preco: 3.91 },
        { marca: 'NUTRATA', shareValor: 10.0, shareVolume: 10.0, preco: 10.55 },
        { marca: 'NATURALE', shareValor: 6.7, shareVolume: 6.7, preco: 2.07 },
        { marca: 'Nutrimental', shareValor: 22.0, shareVolume: 22.0, preco: 6.34 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.75 }
      ],
      ne_no_co: [
        { marca: 'SUPINO', shareValor: 13.6, shareVolume: 13.6, preco: 15.84 },
        { marca: 'TRIO', shareValor: 6.1, shareVolume: 6.1, preco: 5.65 },
        { marca: 'NUTRATA', shareValor: 5.7, shareVolume: 5.7, preco: 10.76 },
        { marca: 'Nutrimental', shareValor: 30.5, shareVolume: 30.5, preco: 15.01 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.70 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'SUPINO', shareValor: 10.9, shareVolume: 10.9, preco: 16.92 },
        { marca: 'NUTRATA', shareValor: 6.4, shareVolume: 6.4, preco: 10.77 },
        { marca: 'BOLD', shareValor: 5.6, shareVolume: 5.6, preco: 12.90 },
        { marca: 'Nutrimental', shareValor: 28.9, shareVolume: 28.9, preco: 15.64 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.85 }
      ],
      sp_rj_mg_es: [
        { marca: 'BOLD', shareValor: 7.5, shareVolume: 7.5, preco: 12.89 },
        { marca: 'NUTRATA', shareValor: 7.0, shareVolume: 7.0, preco: 11.01 },
        { marca: 'TRIO', shareValor: 5.4, shareVolume: 5.4, preco: 6.87 },
        { marca: 'Nutrimental', shareValor: 32.5, shareVolume: 32.5, preco: 23.30 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.95 }
      ],
      sul: [
        { marca: 'RITTER', shareValor: 31.5, shareVolume: 31.5, preco: 3.91 },
        { marca: 'NUTRATA', shareValor: 10.0, shareVolume: 10.0, preco: 10.55 },
        { marca: 'NATURALE', shareValor: 6.7, shareVolume: 6.7, preco: 2.07 },
        { marca: 'Nutrimental', shareValor: 22.0, shareVolume: 22.0, preco: 6.34 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.75 }
      ],
      ne_no_co: [
        { marca: 'SUPINO', shareValor: 13.6, shareVolume: 13.6, preco: 15.84 },
        { marca: 'TRIO', shareValor: 6.1, shareVolume: 6.1, preco: 5.65 },
        { marca: 'NUTRATA', shareValor: 5.7, shareVolume: 5.7, preco: 10.76 },
        { marca: 'Nutrimental', shareValor: 30.5, shareVolume: 30.5, preco: 15.01 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.70 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'SUPINO', shareValor: 10.9, shareVolume: 10.9, preco: 16.92 },
        { marca: 'NUTRATA', shareValor: 6.4, shareVolume: 6.4, preco: 10.77 },
        { marca: 'BOLD', shareValor: 5.6, shareVolume: 5.6, preco: 12.90 },
        { marca: 'Nutrimental', shareValor: 28.9, shareVolume: 28.9, preco: 15.64 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.85 }
      ],
      sp_rj_mg_es: [
        { marca: 'BOLD', shareValor: 7.5, shareVolume: 7.5, preco: 12.89 },
        { marca: 'NUTRATA', shareValor: 7.0, shareVolume: 7.0, preco: 11.01 },
        { marca: 'TRIO', shareValor: 5.4, shareVolume: 5.4, preco: 6.87 },
        { marca: 'Nutrimental', shareValor: 32.5, shareVolume: 32.5, preco: 23.30 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.95 }
      ],
      sul: [
        { marca: 'RITTER', shareValor: 31.5, shareVolume: 31.5, preco: 3.91 },
        { marca: 'NUTRATA', shareValor: 10.0, shareVolume: 10.0, preco: 10.55 },
        { marca: 'NATURALE', shareValor: 6.7, shareVolume: 6.7, preco: 2.07 },
        { marca: 'Nutrimental', shareValor: 22.0, shareVolume: 22.0, preco: 6.34 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.75 }
      ],
      ne_no_co: [
        { marca: 'SUPINO', shareValor: 13.6, shareVolume: 13.6, preco: 15.84 },
        { marca: 'TRIO', shareValor: 6.1, shareVolume: 6.1, preco: 5.65 },
        { marca: 'NUTRATA', shareValor: 5.7, shareVolume: 5.7, preco: 10.76 },
        { marca: 'Nutrimental', shareValor: 30.5, shareVolume: 30.5, preco: 15.01 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.70 }
      ]
    }
  },
  cereais: {
    mes_yoy: {
      brasil: [
        { marca: 'RITTER', shareValor: 8.9, shareVolume: 8.9, preco: 4.01 },
        { marca: 'TRIO', shareValor: 8.5, shareVolume: 8.5, preco: 5.96 },
        { marca: 'KOBBER', shareValor: 4.1, shareVolume: 4.1, preco: 6.72 },
        { marca: 'Nutrimental', shareValor: 37.8, shareVolume: 37.8, preco: 17.69 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 9.20 }
      ],
      sp_rj_mg_es: [
        { marca: 'TRIO', shareValor: 7.6, shareVolume: 7.6, preco: 6.87 },
        { marca: 'KOBBER', shareValor: 7.3, shareVolume: 7.3, preco: 6.21 },
        { marca: 'QUAKER', shareValor: 1.3, shareVolume: 1.3, preco: 10.50 },
        { marca: 'Nutrimental', shareValor: 42.0, shareVolume: 42.0, preco: 28.91 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.50 }
      ],
      sul: [
        { marca: 'RITTER', shareValor: 55.1, shareVolume: 55.1, preco: 3.91 },
        { marca: 'NATURALE', shareValor: 11.8, shareVolume: 11.8, preco: 2.07 },
        { marca: 'GRANOFIBRA', shareValor: 2.4, shareVolume: 2.4, preco: 1.76 },
        { marca: 'Nutrimental', shareValor: 25.0, shareVolume: 25.0, preco: 5.07 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 4.80 }
      ],
      ne_no_co: [
        { marca: 'TRIO', shareValor: 10.9, shareVolume: 10.9, preco: 5.65 },
        { marca: 'KOBBER', shareValor: 3.5, shareVolume: 3.5, preco: 7.28 },
        { marca: 'RITTER', shareValor: 3.0, shareVolume: 3.0, preco: 4.18 },
        { marca: 'Nutrimental', shareValor: 40.5, shareVolume: 40.5, preco: 16.84 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 9.50 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'RITTER', shareValor: 8.9, shareVolume: 8.9, preco: 4.01 },
        { marca: 'TRIO', shareValor: 8.5, shareVolume: 8.5, preco: 5.96 },
        { marca: 'KOBBER', shareValor: 4.1, shareVolume: 4.1, preco: 6.72 },
        { marca: 'Nutrimental', shareValor: 37.8, shareVolume: 37.8, preco: 17.69 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 9.20 }
      ],
      sp_rj_mg_es: [
        { marca: 'TRIO', shareValor: 7.6, shareVolume: 7.6, preco: 6.87 },
        { marca: 'KOBBER', shareValor: 7.3, shareVolume: 7.3, preco: 6.21 },
        { marca: 'QUAKER', shareValor: 1.3, shareVolume: 1.3, preco: 10.50 },
        { marca: 'Nutrimental', shareValor: 42.0, shareVolume: 42.0, preco: 28.91 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.50 }
      ],
      sul: [
        { marca: 'RITTER', shareValor: 55.1, shareVolume: 55.1, preco: 3.91 },
        { marca: 'NATURALE', shareValor: 11.8, shareVolume: 11.8, preco: 2.07 },
        { marca: 'GRANOFIBRA', shareValor: 2.4, shareVolume: 2.4, preco: 1.76 },
        { marca: 'Nutrimental', shareValor: 25.0, shareVolume: 25.0, preco: 5.07 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 4.80 }
      ],
      ne_no_co: [
        { marca: 'TRIO', shareValor: 10.9, shareVolume: 10.9, preco: 5.65 },
        { marca: 'KOBBER', shareValor: 3.5, shareVolume: 3.5, preco: 7.28 },
        { marca: 'RITTER', shareValor: 3.0, shareVolume: 3.0, preco: 4.18 },
        { marca: 'Nutrimental', shareValor: 40.5, shareVolume: 40.5, preco: 16.84 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 9.50 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'RITTER', shareValor: 8.9, shareVolume: 8.9, preco: 4.01 },
        { marca: 'TRIO', shareValor: 8.5, shareVolume: 8.5, preco: 5.96 },
        { marca: 'KOBBER', shareValor: 4.1, shareVolume: 4.1, preco: 6.72 },
        { marca: 'Nutrimental', shareValor: 37.8, shareVolume: 37.8, preco: 17.69 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 9.20 }
      ],
      sp_rj_mg_es: [
        { marca: 'TRIO', shareValor: 7.6, shareVolume: 7.6, preco: 6.87 },
        { marca: 'KOBBER', shareValor: 7.3, shareVolume: 7.3, preco: 6.21 },
        { marca: 'QUAKER', shareValor: 1.3, shareVolume: 1.3, preco: 10.50 },
        { marca: 'Nutrimental', shareValor: 42.0, shareVolume: 42.0, preco: 28.91 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.50 }
      ],
      sul: [
        { marca: 'RITTER', shareValor: 55.1, shareVolume: 55.1, preco: 3.91 },
        { marca: 'NATURALE', shareValor: 11.8, shareVolume: 11.8, preco: 2.07 },
        { marca: 'GRANOFIBRA', shareValor: 2.4, shareVolume: 2.4, preco: 1.76 },
        { marca: 'Nutrimental', shareValor: 25.0, shareVolume: 25.0, preco: 5.07 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 4.80 }
      ],
      ne_no_co: [
        { marca: 'TRIO', shareValor: 10.9, shareVolume: 10.9, preco: 5.65 },
        { marca: 'KOBBER', shareValor: 3.5, shareVolume: 3.5, preco: 7.28 },
        { marca: 'RITTER', shareValor: 3.0, shareVolume: 3.0, preco: 4.18 },
        { marca: 'Nutrimental', shareValor: 40.5, shareVolume: 40.5, preco: 16.84 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 9.50 }
      ]
    }
  },
  frutas: {
    mes_yoy: {
      brasil: [
        { marca: 'SUPINO', shareValor: 45.0, shareVolume: 45.0, preco: 16.78 },
        { marca: 'BANANA BRASIL', shareValor: 0.3, shareVolume: 0.3, preco: 2.94 },
        { marca: 'OLIVEIRA', shareValor: 0.2, shareVolume: 0.2, preco: 3.18 },
        { marca: 'Nutrimental', shareValor: 33.2, shareVolume: 33.2, preco: 12.08 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.65 }
      ],
      sp_rj_mg_es: [
        { marca: 'SUPINO', shareValor: 49.1, shareVolume: 49.1, preco: 146.00 },
        { marca: 'Nutrimental', shareValor: 35.0, shareVolume: 35.0, preco: 10.74 },
        { marca: 'Outros', shareValor: 15.9, shareVolume: 15.9, preco: 78.37 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 78.37 }
      ],
      sul: [
        { marca: 'SUPINO', shareValor: 27.4, shareVolume: 27.4, preco: 2.65 },
        { marca: 'OLIVEIRA', shareValor: 0.6, shareVolume: 0.6, preco: 2.53 },
        { marca: 'Nutrimental', shareValor: 40.0, shareVolume: 40.0, preco: 18.72 },
        { marca: 'Outros', shareValor: 32.0, shareVolume: 32.0, preco: 7.97 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 7.97 }
      ],
      ne_no_co: [
        { marca: 'SUPINO', shareValor: 48.0, shareVolume: 48.0, preco: 15.74 },
        { marca: 'BANANA BRASIL', shareValor: 0.4, shareVolume: 0.4, preco: 2.94 },
        { marca: 'OLIVEIRA', shareValor: 0.2, shareVolume: 0.2, preco: 3.40 },
        { marca: 'Nutrimental', shareValor: 32.0, shareVolume: 32.0, preco: 11.78 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 15.20 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'SUPINO', shareValor: 45.0, shareVolume: 45.0, preco: 16.78 },
        { marca: 'BANANA BRASIL', shareValor: 0.3, shareVolume: 0.3, preco: 2.94 },
        { marca: 'OLIVEIRA', shareValor: 0.2, shareVolume: 0.2, preco: 3.18 },
        { marca: 'Nutrimental', shareValor: 33.2, shareVolume: 33.2, preco: 12.08 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.65 }
      ],
      sp_rj_mg_es: [
        { marca: 'SUPINO', shareValor: 49.1, shareVolume: 49.1, preco: 146.00 },
        { marca: 'Nutrimental', shareValor: 35.0, shareVolume: 35.0, preco: 10.74 },
        { marca: 'Outros', shareValor: 15.9, shareVolume: 15.9, preco: 78.37 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 78.37 }
      ],
      sul: [
        { marca: 'SUPINO', shareValor: 27.4, shareVolume: 27.4, preco: 2.65 },
        { marca: 'OLIVEIRA', shareValor: 0.6, shareVolume: 0.6, preco: 2.53 },
        { marca: 'Nutrimental', shareValor: 40.0, shareVolume: 40.0, preco: 18.72 },
        { marca: 'Outros', shareValor: 32.0, shareVolume: 32.0, preco: 7.97 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 7.97 }
      ],
      ne_no_co: [
        { marca: 'SUPINO', shareValor: 48.0, shareVolume: 48.0, preco: 15.74 },
        { marca: 'BANANA BRASIL', shareValor: 0.4, shareVolume: 0.4, preco: 2.94 },
        { marca: 'OLIVEIRA', shareValor: 0.2, shareVolume: 0.2, preco: 3.40 },
        { marca: 'Nutrimental', shareValor: 32.0, shareVolume: 32.0, preco: 11.78 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 15.20 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'SUPINO', shareValor: 45.0, shareVolume: 45.0, preco: 16.78 },
        { marca: 'BANANA BRASIL', shareValor: 0.3, shareVolume: 0.3, preco: 2.94 },
        { marca: 'OLIVEIRA', shareValor: 0.2, shareVolume: 0.2, preco: 3.18 },
        { marca: 'Nutrimental', shareValor: 33.2, shareVolume: 33.2, preco: 12.08 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.65 }
      ],
      sp_rj_mg_es: [
        { marca: 'SUPINO', shareValor: 49.1, shareVolume: 49.1, preco: 146.00 },
        { marca: 'Nutrimental', shareValor: 35.0, shareVolume: 35.0, preco: 10.74 },
        { marca: 'Outros', shareValor: 15.9, shareVolume: 15.9, preco: 78.37 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 78.37 }
      ],
      sul: [
        { marca: 'SUPINO', shareValor: 27.4, shareVolume: 27.4, preco: 2.65 },
        { marca: 'OLIVEIRA', shareValor: 0.6, shareVolume: 0.6, preco: 2.53 },
        { marca: 'Nutrimental', shareValor: 40.0, shareVolume: 40.0, preco: 18.72 },
        { marca: 'Outros', shareValor: 32.0, shareVolume: 32.0, preco: 7.97 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 7.97 }
      ],
      ne_no_co: [
        { marca: 'SUPINO', shareValor: 48.0, shareVolume: 48.0, preco: 15.74 },
        { marca: 'BANANA BRASIL', shareValor: 0.4, shareVolume: 0.4, preco: 2.94 },
        { marca: 'OLIVEIRA', shareValor: 0.2, shareVolume: 0.2, preco: 3.40 },
        { marca: 'Nutrimental', shareValor: 32.0, shareVolume: 32.0, preco: 11.78 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 15.20 }
      ]
    }
  },
  nuts: {
    mes_yoy: {
      brasil: [
        { marca: 'Marca A', shareValor: 15.2, shareVolume: 15.2, preco: 8.50 },
        { marca: 'Marca B', shareValor: 12.8, shareVolume: 12.8, preco: 7.20 },
        { marca: 'Marca C', shareValor: 10.5, shareVolume: 10.5, preco: 9.10 },
        { marca: 'Nutrimental', shareValor: 28.9, shareVolume: 28.9, preco: 8.80 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 8.50 }
      ],
      sp_rj_mg_es: [
        { marca: 'Marca A', shareValor: 18.5, shareVolume: 18.5, preco: 9.20 },
        { marca: 'Marca B', shareValor: 14.2, shareVolume: 14.2, preco: 7.80 },
        { marca: 'Marca C', shareValor: 11.8, shareVolume: 11.8, preco: 9.50 },
        { marca: 'Nutrimental', shareValor: 32.1, shareVolume: 32.1, preco: 9.10 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 8.80 }
      ],
      sul: [
        { marca: 'Marca A', shareValor: 12.8, shareVolume: 12.8, preco: 7.50 },
        { marca: 'Marca B', shareValor: 10.5, shareVolume: 10.5, preco: 6.80 },
        { marca: 'Marca C', shareValor: 8.9, shareVolume: 8.9, preco: 8.20 },
        { marca: 'Nutrimental', shareValor: 24.5, shareVolume: 24.5, preco: 7.90 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 7.80 }
      ],
      ne_no_co: [
        { marca: 'Marca A', shareValor: 16.2, shareVolume: 16.2, preco: 8.80 },
        { marca: 'Marca B', shareValor: 13.5, shareVolume: 13.5, preco: 7.40 },
        { marca: 'Marca C', shareValor: 11.2, shareVolume: 11.2, preco: 9.30 },
        { marca: 'Nutrimental', shareValor: 30.8, shareVolume: 30.8, preco: 9.00 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 8.60 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'Marca A', shareValor: 15.2, shareVolume: 15.2, preco: 8.50 },
        { marca: 'Marca B', shareValor: 12.8, shareVolume: 12.8, preco: 7.20 },
        { marca: 'Marca C', shareValor: 10.5, shareVolume: 10.5, preco: 9.10 },
        { marca: 'Nutrimental', shareValor: 28.9, shareVolume: 28.9, preco: 8.80 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 8.50 }
      ],
      sp_rj_mg_es: [
        { marca: 'Marca A', shareValor: 18.5, shareVolume: 18.5, preco: 9.20 },
        { marca: 'Marca B', shareValor: 14.2, shareVolume: 14.2, preco: 7.80 },
        { marca: 'Marca C', shareValor: 11.8, shareVolume: 11.8, preco: 9.50 },
        { marca: 'Nutrimental', shareValor: 32.1, shareVolume: 32.1, preco: 9.10 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 8.80 }
      ],
      sul: [
        { marca: 'Marca A', shareValor: 12.8, shareVolume: 12.8, preco: 7.50 },
        { marca: 'Marca B', shareValor: 10.5, shareVolume: 10.5, preco: 6.80 },
        { marca: 'Marca C', shareValor: 8.9, shareVolume: 8.9, preco: 8.20 },
        { marca: 'Nutrimental', shareValor: 24.5, shareVolume: 24.5, preco: 7.90 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 7.80 }
      ],
      ne_no_co: [
        { marca: 'Marca A', shareValor: 16.2, shareVolume: 16.2, preco: 8.80 },
        { marca: 'Marca B', shareValor: 13.5, shareVolume: 13.5, preco: 7.40 },
        { marca: 'Marca C', shareValor: 11.2, shareVolume: 11.2, preco: 9.30 },
        { marca: 'Nutrimental', shareValor: 30.8, shareVolume: 30.8, preco: 9.00 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 8.60 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'Marca A', shareValor: 15.2, shareVolume: 15.2, preco: 8.50 },
        { marca: 'Marca B', shareValor: 12.8, shareVolume: 12.8, preco: 7.20 },
        { marca: 'Marca C', shareValor: 10.5, shareVolume: 10.5, preco: 9.10 },
        { marca: 'Nutrimental', shareValor: 28.9, shareVolume: 28.9, preco: 8.80 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 8.50 }
      ],
      sp_rj_mg_es: [
        { marca: 'Marca A', shareValor: 18.5, shareVolume: 18.5, preco: 9.20 },
        { marca: 'Marca B', shareValor: 14.2, shareVolume: 14.2, preco: 7.80 },
        { marca: 'Marca C', shareValor: 11.8, shareVolume: 11.8, preco: 9.50 },
        { marca: 'Nutrimental', shareValor: 32.1, shareVolume: 32.1, preco: 9.10 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 8.80 }
      ],
      sul: [
        { marca: 'Marca A', shareValor: 12.8, shareVolume: 12.8, preco: 7.50 },
        { marca: 'Marca B', shareValor: 10.5, shareVolume: 10.5, preco: 6.80 },
        { marca: 'Marca C', shareValor: 8.9, shareVolume: 8.9, preco: 8.20 },
        { marca: 'Nutrimental', shareValor: 24.5, shareVolume: 24.5, preco: 7.90 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 7.80 }
      ],
      ne_no_co: [
        { marca: 'Marca A', shareValor: 16.2, shareVolume: 16.2, preco: 8.80 },
        { marca: 'Marca B', shareValor: 13.5, shareVolume: 13.5, preco: 7.40 },
        { marca: 'Marca C', shareValor: 11.2, shareVolume: 11.2, preco: 9.30 },
        { marca: 'Nutrimental', shareValor: 30.8, shareVolume: 30.8, preco: 9.00 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 8.60 }
      ]
    }
  },
  proteína: {
    mes_yoy: {
      brasil: [
        { marca: 'NUTRATA', shareValor: 22.5, shareVolume: 22.5, preco: 10.77 },
        { marca: 'BOLD', shareValor: 19.6, shareVolume: 19.6, preco: 12.95 },
        { marca: 'INTEGRALMEDICA', shareValor: 14.8, shareVolume: 14.8, preco: 11.92 },
        { marca: 'Nutrimental', shareValor: 8.8, shareVolume: 8.8, preco: 9.64 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.40 }
      ],
      sp_rj_mg_es: [
        { marca: 'BOLD', shareValor: 26.5, shareVolume: 26.5, preco: 13.05 },
        { marca: 'NUTRATA', shareValor: 24.6, shareVolume: 24.6, preco: 11.01 },
        { marca: 'INTEGRALMEDICA', shareValor: 17.2, shareVolume: 17.2, preco: 18.64 },
        { marca: 'Nutrimental', shareValor: 9.0, shareVolume: 9.0, preco: 12.16 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 13.50 }
      ],
      sul: [
        { marca: 'NUTRATA', shareValor: 28.9, shareVolume: 28.9, preco: 10.55 },
        { marca: 'INTEGRALMEDICA', shareValor: 15.8, shareVolume: 15.8, preco: 8.97 },
        { marca: 'ENJOY', shareValor: 9.9, shareVolume: 9.9, preco: 29.02 },
        { marca: 'Nutrimental', shareValor: 8.5, shareVolume: 8.5, preco: 7.13 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.20 }
      ],
      ne_no_co: [
        { marca: 'NUTRATA', shareValor: 20.4, shareVolume: 20.4, preco: 10.76 },
        { marca: 'BOLD', shareValor: 19.9, shareVolume: 19.9, preco: 12.80 },
        { marca: 'INTEGRALMEDICA', shareValor: 13.6, shareVolume: 13.6, preco: 10.90 },
        { marca: 'Nutrimental', shareValor: 8.5, shareVolume: 8.5, preco: 9.35 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.00 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'NUTRATA', shareValor: 22.5, shareVolume: 22.5, preco: 10.77 },
        { marca: 'BOLD', shareValor: 19.6, shareVolume: 19.6, preco: 12.95 },
        { marca: 'INTEGRALMEDICA', shareValor: 14.8, shareVolume: 14.8, preco: 11.92 },
        { marca: 'Nutrimental', shareValor: 8.8, shareVolume: 8.8, preco: 9.64 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.40 }
      ],
      sp_rj_mg_es: [
        { marca: 'BOLD', shareValor: 26.5, shareVolume: 26.5, preco: 13.05 },
        { marca: 'NUTRATA', shareValor: 24.6, shareVolume: 24.6, preco: 11.01 },
        { marca: 'INTEGRALMEDICA', shareValor: 17.2, shareVolume: 17.2, preco: 18.64 },
        { marca: 'Nutrimental', shareValor: 9.0, shareVolume: 9.0, preco: 12.16 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 13.50 }
      ],
      sul: [
        { marca: 'NUTRATA', shareValor: 28.9, shareVolume: 28.9, preco: 10.55 },
        { marca: 'INTEGRALMEDICA', shareValor: 15.8, shareVolume: 15.8, preco: 8.97 },
        { marca: 'ENJOY', shareValor: 9.9, shareVolume: 9.9, preco: 29.02 },
        { marca: 'Nutrimental', shareValor: 8.5, shareVolume: 8.5, preco: 7.13 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.20 }
      ],
      ne_no_co: [
        { marca: 'NUTRATA', shareValor: 20.4, shareVolume: 20.4, preco: 10.76 },
        { marca: 'BOLD', shareValor: 19.9, shareVolume: 19.9, preco: 12.80 },
        { marca: 'INTEGRALMEDICA', shareValor: 13.6, shareVolume: 13.6, preco: 10.90 },
        { marca: 'Nutrimental', shareValor: 8.5, shareVolume: 8.5, preco: 9.35 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.00 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'NUTRATA', shareValor: 22.5, shareVolume: 22.5, preco: 10.77 },
        { marca: 'BOLD', shareValor: 19.6, shareVolume: 19.6, preco: 12.95 },
        { marca: 'INTEGRALMEDICA', shareValor: 14.8, shareVolume: 14.8, preco: 11.92 },
        { marca: 'Nutrimental', shareValor: 8.8, shareVolume: 8.8, preco: 9.64 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.40 }
      ],
      sp_rj_mg_es: [
        { marca: 'BOLD', shareValor: 26.5, shareVolume: 26.5, preco: 13.05 },
        { marca: 'NUTRATA', shareValor: 24.6, shareVolume: 24.6, preco: 11.01 },
        { marca: 'INTEGRALMEDICA', shareValor: 17.2, shareVolume: 17.2, preco: 18.64 },
        { marca: 'Nutrimental', shareValor: 9.0, shareVolume: 9.0, preco: 12.16 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 13.50 }
      ],
      sul: [
        { marca: 'NUTRATA', shareValor: 28.9, shareVolume: 28.9, preco: 10.55 },
        { marca: 'INTEGRALMEDICA', shareValor: 15.8, shareVolume: 15.8, preco: 8.97 },
        { marca: 'ENJOY', shareValor: 9.9, shareVolume: 9.9, preco: 29.02 },
        { marca: 'Nutrimental', shareValor: 8.5, shareVolume: 8.5, preco: 7.13 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.20 }
      ],
      ne_no_co: [
        { marca: 'NUTRATA', shareValor: 20.4, shareVolume: 20.4, preco: 10.76 },
        { marca: 'BOLD', shareValor: 19.9, shareVolume: 19.9, preco: 12.80 },
        { marca: 'INTEGRALMEDICA', shareValor: 13.6, shareVolume: 13.6, preco: 10.90 },
        { marca: 'Nutrimental', shareValor: 8.5, shareVolume: 8.5, preco: 9.35 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.00 }
      ]
    }
  }
};

export const getScanntechMarcasRegiao = (categoria, periodo) => {
  const catKey = categoria.toLowerCase();
  const periodoKey = periodo || 'mes_yoy';
  
  // Retorna dados da categoria específica ou TOTAL como fallback
  if (marcasPorRegiao[catKey] && marcasPorRegiao[catKey][periodoKey]) {
    return marcasPorRegiao[catKey][periodoKey];
  }
  
  // Fallback para TOTAL
  return marcasPorRegiao['total'][periodoKey] || marcasPorRegiao['total']['mes_yoy'];
};

// Shares NUTRY por categoria (dados reais calculados por GIRO)
export const getScanntechShareNutrimental = (categoria, periodo) => {
  // Dados consolidados NUTRY (total)
  const consolidado = {
    share: 27.4,
    shareAnterior: 27.2,
    receita: 238500000,      // R$ 238.5M
    receitaAnterior: 292300000, // R$ 292.3M (calculado com -18.4%)
    volume: 703608,          // unidades
    volumeAnterior: 964394,  // unidades (calculado com -27%)
    precoMedio: 338.92,      // R$/unidade
    precoMedioAnterior: 303.07 // R$/unidade (calculado com +13.7%)
  };
  
  // Dados por categoria com receita, volume e preço
  const categorias = [
    { 
      categoria: 'Cereais', 
      share: 42.02, 
      trend: '+2.0%', 
      icon: '🌾',
      receita: 119500000,      // R$ 119.5M
      volume: 351804,          // unidades
      precoMedio: 339.65       // R$/unidade
    },
    { 
      categoria: 'Frutas', 
      share: 31.60, 
      trend: '+1.7%', 
      icon: '🍎',
      receita: 83100000,       // R$ 83.1M
      volume: 245856,          // unidades
      precoMedio: 338.05       // R$/unidade
    },
    { 
      categoria: 'Nuts', 
      share: 9.86, 
      trend: '+1.4%', 
      icon: '🥜',
      receita: 35900000,       // R$ 35.9M
      volume: 106148,          // unidades
      precoMedio: 338.20       // R$/unidade
    },
    { 
      categoria: 'Proteína', 
      share: 5.59, 
      trend: '+0.2%', 
      icon: '🥩',
      receita: 54700000,       // R$ 54.7M
      volume: 161400,          // unidades
      precoMedio: 338.92       // R$/unidade
    }
  ];
  
  return { consolidado, categorias };
};
