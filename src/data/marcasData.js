// Dados de marcas por região e categoria
// Estrutura: marcasData[categoria][periodo][regiao]
// Top 3 marcas variam por região e categoria

export const marcasData = {
  // ========== TOTAL ==========
  total: {
    mes_yoy: {
      brasil: [
        { marca: 'Trio', shareValor: 22.5, shareVolume: 23.1, preco: 11.50 },
        { marca: 'Kobber', shareValor: 18.3, shareVolume: 17.8, preco: 12.20 },
        { marca: 'Integralmédica', shareValor: 9.2, shareVolume: 9.5, preco: 11.80 },
        { marca: 'Nutrimental', shareValor: 50.16, shareVolume: 49.6, preco: 11.95 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.85 }
      ],
      sp_rj_mg_es: [
        { marca: 'Trio', shareValor: 24.2, shareVolume: 24.8, preco: 11.60 },
        { marca: 'Kobber', shareValor: 20.1, shareVolume: 19.5, preco: 12.30 },
        { marca: 'Integralmédica', shareValor: 10.5, shareVolume: 10.8, preco: 11.90 },
        { marca: 'Nutrimental', shareValor: 45.2, shareVolume: 44.9, preco: 12.00 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.95 }
      ],
      sul: [
        { marca: 'Trio', shareValor: 19.8, shareVolume: 20.3, preco: 11.45 },
        { marca: 'Kobber', shareValor: 15.2, shareVolume: 14.8, preco: 12.10 },
        { marca: 'Integralmédica', shareValor: 7.5, shareVolume: 7.8, preco: 11.70 },
        { marca: 'Nutrimental', shareValor: 57.5, shareVolume: 57.1, preco: 11.90 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.75 }
      ],
      ne_no_co: [
        { marca: 'Trio', shareValor: 21.3, shareVolume: 21.9, preco: 11.40 },
        { marca: 'Kobber', shareValor: 16.8, shareVolume: 16.2, preco: 12.00 },
        { marca: 'Integralmédica', shareValor: 8.8, shareVolume: 9.2, preco: 11.60 },
        { marca: 'Nutrimental', shareValor: 53.1, shareVolume: 52.7, preco: 11.85 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.70 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'Trio', shareValor: 22.3, shareVolume: 22.9, preco: 11.52 },
        { marca: 'Kobber', shareValor: 18.1, shareVolume: 17.6, preco: 12.22 },
        { marca: 'Integralmédica', shareValor: 9.4, shareVolume: 9.7, preco: 11.82 },
        { marca: 'Nutrimental', shareValor: 50.2, shareVolume: 49.8, preco: 11.97 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.87 }
      ],
      sp_rj_mg_es: [
        { marca: 'Trio', shareValor: 24.0, shareVolume: 24.6, preco: 11.62 },
        { marca: 'Kobber', shareValor: 19.9, shareVolume: 19.3, preco: 12.32 },
        { marca: 'Integralmédica', shareValor: 10.3, shareVolume: 10.6, preco: 11.92 },
        { marca: 'Nutrimental', shareValor: 45.8, shareVolume: 45.5, preco: 12.02 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.97 }
      ],
      sul: [
        { marca: 'Trio', shareValor: 19.6, shareVolume: 20.1, preco: 11.47 },
        { marca: 'Kobber', shareValor: 15.0, shareVolume: 14.6, preco: 12.12 },
        { marca: 'Integralmédica', shareValor: 7.7, shareVolume: 8.0, preco: 11.72 },
        { marca: 'Nutrimental', shareValor: 57.7, shareVolume: 57.3, preco: 11.92 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.77 }
      ],
      ne_no_co: [
        { marca: 'Trio', shareValor: 21.1, shareVolume: 21.7, preco: 11.42 },
        { marca: 'Kobber', shareValor: 16.6, shareVolume: 16.0, preco: 12.02 },
        { marca: 'Integralmédica', shareValor: 9.0, shareVolume: 9.4, preco: 11.62 },
        { marca: 'Nutrimental', shareValor: 53.3, shareVolume: 52.9, preco: 11.87 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.72 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'Trio', shareValor: 22.8, shareVolume: 23.4, preco: 11.55 },
        { marca: 'Kobber', shareValor: 18.5, shareVolume: 18.0, preco: 12.25 },
        { marca: 'Integralmédica', shareValor: 9.0, shareVolume: 9.3, preco: 11.85 },
        { marca: 'Nutrimental', shareValor: 49.7, shareVolume: 49.3, preco: 12.00 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.90 }
      ],
      sp_rj_mg_es: [
        { marca: 'Trio', shareValor: 24.5, shareVolume: 25.1, preco: 11.65 },
        { marca: 'Kobber', shareValor: 20.3, shareVolume: 19.7, preco: 12.35 },
        { marca: 'Integralmédica', shareValor: 10.1, shareVolume: 10.4, preco: 11.95 },
        { marca: 'Nutrimental', shareValor: 45.1, shareVolume: 44.8, preco: 12.05 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 12.00 }
      ],
      sul: [
        { marca: 'Trio', shareValor: 20.0, shareVolume: 20.5, preco: 11.50 },
        { marca: 'Kobber', shareValor: 15.4, shareVolume: 15.0, preco: 12.15 },
        { marca: 'Integralmédica', shareValor: 7.3, shareVolume: 7.6, preco: 11.75 },
        { marca: 'Nutrimental', shareValor: 57.3, shareVolume: 56.9, preco: 11.95 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.80 }
      ],
      ne_no_co: [
        { marca: 'Trio', shareValor: 21.5, shareVolume: 22.1, preco: 11.45 },
        { marca: 'Kobber', shareValor: 17.0, shareVolume: 16.4, preco: 12.05 },
        { marca: 'Integralmédica', shareValor: 8.6, shareVolume: 9.0, preco: 11.65 },
        { marca: 'Nutrimental', shareValor: 52.9, shareVolume: 52.5, preco: 11.90 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.75 }
      ]
    }
  },

  // ========== CEREAIS ==========
  cereais: {
    mes_yoy: {
      brasil: [
        { marca: 'GrainBar', shareValor: 28.5, shareVolume: 29.2, preco: 9.85 },
        { marca: 'Trio', shareValor: 22.3, shareVolume: 23.1, preco: 9.75 },
        { marca: 'CerealPlus', shareValor: 14.8, shareVolume: 15.5, preco: 9.60 },
        { marca: 'Nutrimental', shareValor: 34.4, shareVolume: 32.2, preco: 10.75 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.10 }
      ],
      sp_rj_mg_es: [
        { marca: 'GrainBar', shareValor: 30.2, shareVolume: 31.1, preco: 9.95 },
        { marca: 'Trio', shareValor: 24.1, shareVolume: 24.8, preco: 9.85 },
        { marca: 'CerealPlus', shareValor: 16.2, shareVolume: 16.9, preco: 9.70 },
        { marca: 'Nutrimental', shareValor: 29.5, shareVolume: 27.2, preco: 11.10 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.25 }
      ],
      sul: [
        { marca: 'GrainBar', shareValor: 26.8, shareVolume: 27.5, preco: 9.90 },
        { marca: 'CerealSul', shareValor: 21.5, shareVolume: 22.3, preco: 9.75 },
        { marca: 'Trio', shareValor: 19.2, shareVolume: 19.8, preco: 9.80 },
        { marca: 'Nutrimental', shareValor: 32.5, shareVolume: 30.4, preco: 10.85 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.20 }
      ],
      ne_no_co: [
        { marca: 'CerealPlus', shareValor: 27.3, shareVolume: 28.9, preco: 9.55 },
        { marca: 'GrainBar', shareValor: 24.8, shareVolume: 25.6, preco: 9.80 },
        { marca: 'Trio', shareValor: 18.5, shareVolume: 19.2, preco: 9.75 },
        { marca: 'Nutrimental', shareValor: 29.4, shareVolume: 26.3, preco: 11.30 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.05 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'GrainBar', shareValor: 28.7, shareVolume: 29.4, preco: 9.87 },
        { marca: 'Trio', shareValor: 22.5, shareVolume: 23.3, preco: 9.77 },
        { marca: 'CerealPlus', shareValor: 15.0, shareVolume: 15.7, preco: 9.62 },
        { marca: 'Nutrimental', shareValor: 33.8, shareVolume: 31.6, preco: 10.82 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.15 }
      ],
      sp_rj_mg_es: [
        { marca: 'GrainBar', shareValor: 30.4, shareVolume: 31.3, preco: 9.97 },
        { marca: 'Trio', shareValor: 24.3, shareVolume: 25.0, preco: 9.87 },
        { marca: 'CerealPlus', shareValor: 16.4, shareVolume: 17.1, preco: 9.72 },
        { marca: 'Nutrimental', shareValor: 28.9, shareVolume: 26.6, preco: 11.15 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.30 }
      ],
      sul: [
        { marca: 'GrainBar', shareValor: 27.0, shareVolume: 27.7, preco: 9.92 },
        { marca: 'CerealSul', shareValor: 21.7, shareVolume: 22.5, preco: 9.77 },
        { marca: 'Trio', shareValor: 19.4, shareVolume: 20.0, preco: 9.82 },
        { marca: 'Nutrimental', shareValor: 31.9, shareVolume: 29.8, preco: 10.87 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.25 }
      ],
      ne_no_co: [
        { marca: 'CerealPlus', shareValor: 27.5, shareVolume: 29.1, preco: 9.57 },
        { marca: 'GrainBar', shareValor: 25.0, shareVolume: 25.8, preco: 9.82 },
        { marca: 'Trio', shareValor: 18.7, shareVolume: 19.4, preco: 9.77 },
        { marca: 'Nutrimental', shareValor: 28.8, shareVolume: 25.7, preco: 11.35 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.10 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'GrainBar', shareValor: 29.0, shareVolume: 29.7, preco: 9.90 },
        { marca: 'Trio', shareValor: 22.8, shareVolume: 23.6, preco: 9.80 },
        { marca: 'CerealPlus', shareValor: 15.3, shareVolume: 16.0, preco: 9.65 },
        { marca: 'Nutrimental', shareValor: 32.9, shareVolume: 30.7, preco: 10.85 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.20 }
      ],
      sp_rj_mg_es: [
        { marca: 'GrainBar', shareValor: 30.7, shareVolume: 31.6, preco: 10.00 },
        { marca: 'Trio', shareValor: 24.6, shareVolume: 25.3, preco: 9.90 },
        { marca: 'CerealPlus', shareValor: 16.7, shareVolume: 17.4, preco: 9.75 },
        { marca: 'Nutrimental', shareValor: 28.0, shareVolume: 25.7, preco: 11.20 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.35 }
      ],
      sul: [
        { marca: 'GrainBar', shareValor: 27.3, shareVolume: 28.0, preco: 9.95 },
        { marca: 'CerealSul', shareValor: 22.0, shareVolume: 22.8, preco: 9.80 },
        { marca: 'Trio', shareValor: 19.7, shareVolume: 20.3, preco: 9.85 },
        { marca: 'Nutrimental', shareValor: 31.0, shareVolume: 28.9, preco: 10.90 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.30 }
      ],
      ne_no_co: [
        { marca: 'CerealPlus', shareValor: 27.8, shareVolume: 29.4, preco: 9.60 },
        { marca: 'GrainBar', shareValor: 25.3, shareVolume: 26.1, preco: 9.85 },
        { marca: 'Trio', shareValor: 19.0, shareVolume: 19.7, preco: 9.80 },
        { marca: 'Nutrimental', shareValor: 27.9, shareVolume: 24.8, preco: 11.40 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 10.15 }
      ]
    }
  },

  // ========== FRUTAS ==========
  frutas: {
    mes_yoy: {
      brasil: [
        { marca: 'FruitBar', shareValor: 32.5, shareVolume: 31.8, preco: 12.25 },
        { marca: 'Kobber', shareValor: 24.3, shareVolume: 23.5, preco: 12.40 },
        { marca: 'TropicalMix', shareValor: 18.7, shareVolume: 19.2, preco: 11.65 },
        { marca: 'Nutrimental', shareValor: 24.5, shareVolume: 25.5, preco: 11.50 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 12.05 }
      ],
      sp_rj_mg_es: [
        { marca: 'FruitBar', shareValor: 34.8, shareVolume: 33.9, preco: 12.35 },
        { marca: 'Kobber', shareValor: 26.2, shareVolume: 25.3, preco: 12.50 },
        { marca: 'TropicalMix', shareValor: 19.5, shareVolume: 20.1, preco: 11.75 },
        { marca: 'Nutrimental', shareValor: 19.5, shareVolume: 20.7, preco: 11.35 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 12.15 }
      ],
      sul: [
        { marca: 'FruitBar', shareValor: 30.2, shareVolume: 29.5, preco: 12.30 },
        { marca: 'FrutaSul', shareValor: 23.8, shareVolume: 23.2, preco: 12.35 },
        { marca: 'Kobber', shareValor: 21.5, shareVolume: 20.8, preco: 12.45 },
        { marca: 'Nutrimental', shareValor: 24.5, shareVolume: 26.5, preco: 11.15 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 12.10 }
      ],
      ne_no_co: [
        { marca: 'TropicalMix', shareValor: 29.8, shareVolume: 31.5, preco: 11.35 },
        { marca: 'FruitBar', shareValor: 28.5, shareVolume: 27.8, preco: 12.30 },
        { marca: 'Kobber', shareValor: 20.2, shareVolume: 19.5, preco: 12.45 },
        { marca: 'Nutrimental', shareValor: 21.5, shareVolume: 21.2, preco: 12.20 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.95 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'FruitBar', shareValor: 32.7, shareVolume: 32.0, preco: 12.27 },
        { marca: 'Kobber', shareValor: 24.5, shareVolume: 23.7, preco: 12.42 },
        { marca: 'TropicalMix', shareValor: 18.9, shareVolume: 19.4, preco: 11.67 },
        { marca: 'Nutrimental', shareValor: 23.9, shareVolume: 24.9, preco: 11.52 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 12.07 }
      ],
      sp_rj_mg_es: [
        { marca: 'FruitBar', shareValor: 35.0, shareVolume: 34.1, preco: 12.37 },
        { marca: 'Kobber', shareValor: 26.4, shareVolume: 25.5, preco: 12.52 },
        { marca: 'TropicalMix', shareValor: 19.7, shareVolume: 20.3, preco: 11.77 },
        { marca: 'Nutrimental', shareValor: 18.9, shareVolume: 20.1, preco: 11.37 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 12.17 }
      ],
      sul: [
        { marca: 'FruitBar', shareValor: 30.4, shareVolume: 29.7, preco: 12.32 },
        { marca: 'FrutaSul', shareValor: 24.0, shareVolume: 23.4, preco: 12.37 },
        { marca: 'Kobber', shareValor: 21.7, shareVolume: 21.0, preco: 12.47 },
        { marca: 'Nutrimental', shareValor: 23.9, shareVolume: 25.9, preco: 11.17 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 12.12 }
      ],
      ne_no_co: [
        { marca: 'TropicalMix', shareValor: 30.0, shareVolume: 31.7, preco: 11.37 },
        { marca: 'FruitBar', shareValor: 28.7, shareVolume: 28.0, preco: 12.32 },
        { marca: 'Kobber', shareValor: 20.4, shareVolume: 19.7, preco: 12.47 },
        { marca: 'Nutrimental', shareValor: 20.9, shareVolume: 20.6, preco: 12.22 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 11.97 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'FruitBar', shareValor: 33.0, shareVolume: 32.3, preco: 12.30 },
        { marca: 'Kobber', shareValor: 24.8, shareVolume: 24.0, preco: 12.45 },
        { marca: 'TropicalMix', shareValor: 19.2, shareVolume: 19.7, preco: 11.70 },
        { marca: 'Nutrimental', shareValor: 23.0, shareVolume: 24.0, preco: 11.55 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 12.10 }
      ],
      sp_rj_mg_es: [
        { marca: 'FruitBar', shareValor: 35.3, shareVolume: 34.4, preco: 12.40 },
        { marca: 'Kobber', shareValor: 26.7, shareVolume: 25.8, preco: 12.55 },
        { marca: 'TropicalMix', shareValor: 20.0, shareVolume: 20.6, preco: 11.80 },
        { marca: 'Nutrimental', shareValor: 18.0, shareVolume: 19.2, preco: 11.40 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 12.20 }
      ],
      sul: [
        { marca: 'FruitBar', shareValor: 30.7, shareVolume: 30.0, preco: 12.35 },
        { marca: 'FrutaSul', shareValor: 24.3, shareVolume: 23.7, preco: 12.40 },
        { marca: 'Kobber', shareValor: 22.0, shareVolume: 21.3, preco: 12.50 },
        { marca: 'Nutrimental', shareValor: 23.0, shareVolume: 25.0, preco: 11.20 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 12.15 }
      ],
      ne_no_co: [
        { marca: 'TropicalMix', shareValor: 30.3, shareVolume: 32.0, preco: 11.40 },
        { marca: 'FruitBar', shareValor: 29.0, shareVolume: 28.3, preco: 12.35 },
        { marca: 'Kobber', shareValor: 20.7, shareVolume: 20.0, preco: 12.50 },
        { marca: 'Nutrimental', shareValor: 20.0, shareVolume: 19.7, preco: 12.25 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 12.00 }
      ]
    }
  },

  // ========== NUTS ==========
  nuts: {
    mes_yoy: {
      brasil: [
        { marca: 'NutPower', shareValor: 35.8, shareVolume: 34.2, preco: 14.50 },
        { marca: 'Kobber', shareValor: 28.5, shareVolume: 27.3, preco: 14.45 },
        { marca: 'CashewBar', shareValor: 19.2, shareVolume: 20.1, preco: 13.25 },
        { marca: 'Nutrimental', shareValor: 16.5, shareVolume: 18.4, preco: 12.40 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 13.85 }
      ],
      sp_rj_mg_es: [
        { marca: 'NutPower', shareValor: 38.2, shareVolume: 36.5, preco: 14.55 },
        { marca: 'Kobber', shareValor: 30.5, shareVolume: 29.2, preco: 14.50 },
        { marca: 'CashewBar', shareValor: 18.8, shareVolume: 19.7, preco: 13.30 },
        { marca: 'Nutrimental', shareValor: 12.5, shareVolume: 14.6, preco: 11.90 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.00 }
      ],
      sul: [
        { marca: 'NutPower', shareValor: 33.5, shareVolume: 32.1, preco: 14.50 },
        { marca: 'NutSul', shareValor: 27.8, shareVolume: 26.9, preco: 14.35 },
        { marca: 'Kobber', shareValor: 25.2, shareVolume: 24.1, preco: 14.50 },
        { marca: 'Nutrimental', shareValor: 13.5, shareVolume: 16.9, preco: 11.10 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 13.95 }
      ],
      ne_no_co: [
        { marca: 'CashewBar', shareValor: 32.5, shareVolume: 34.8, preco: 12.95 },
        { marca: 'NutPower', shareValor: 30.8, shareVolume: 29.2, preco: 14.60 },
        { marca: 'Kobber', shareValor: 24.2, shareVolume: 23.1, preco: 14.55 },
        { marca: 'Nutrimental', shareValor: 12.5, shareVolume: 12.9, preco: 13.45 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 13.65 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'NutPower', shareValor: 36.0, shareVolume: 34.4, preco: 14.52 },
        { marca: 'Kobber', shareValor: 28.7, shareVolume: 27.5, preco: 14.47 },
        { marca: 'CashewBar', shareValor: 19.4, shareVolume: 20.3, preco: 13.27 },
        { marca: 'Nutrimental', shareValor: 15.9, shareVolume: 17.8, preco: 12.42 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 13.87 }
      ],
      sp_rj_mg_es: [
        { marca: 'NutPower', shareValor: 38.4, shareVolume: 36.7, preco: 14.57 },
        { marca: 'Kobber', shareValor: 30.7, shareVolume: 29.4, preco: 14.52 },
        { marca: 'CashewBar', shareValor: 19.0, shareVolume: 19.9, preco: 13.32 },
        { marca: 'Nutrimental', shareValor: 11.9, shareVolume: 14.0, preco: 11.92 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.02 }
      ],
      sul: [
        { marca: 'NutPower', shareValor: 33.7, shareVolume: 32.3, preco: 14.52 },
        { marca: 'NutSul', shareValor: 28.0, shareVolume: 27.1, preco: 14.37 },
        { marca: 'Kobber', shareValor: 25.4, shareVolume: 24.3, preco: 14.52 },
        { marca: 'Nutrimental', shareValor: 12.9, shareVolume: 16.3, preco: 11.12 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 13.97 }
      ],
      ne_no_co: [
        { marca: 'CashewBar', shareValor: 32.7, shareVolume: 35.0, preco: 12.97 },
        { marca: 'NutPower', shareValor: 31.0, shareVolume: 29.4, preco: 14.62 },
        { marca: 'Kobber', shareValor: 24.4, shareVolume: 23.3, preco: 14.57 },
        { marca: 'Nutrimental', shareValor: 11.9, shareVolume: 12.3, preco: 13.47 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 13.67 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'NutPower', shareValor: 36.3, shareVolume: 34.7, preco: 14.55 },
        { marca: 'Kobber', shareValor: 29.0, shareVolume: 27.8, preco: 14.50 },
        { marca: 'CashewBar', shareValor: 19.7, shareVolume: 20.6, preco: 13.30 },
        { marca: 'Nutrimental', shareValor: 15.0, shareVolume: 16.9, preco: 12.45 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 13.90 }
      ],
      sp_rj_mg_es: [
        { marca: 'NutPower', shareValor: 38.7, shareVolume: 37.0, preco: 14.60 },
        { marca: 'Kobber', shareValor: 31.0, shareVolume: 29.7, preco: 14.55 },
        { marca: 'CashewBar', shareValor: 19.3, shareVolume: 20.2, preco: 13.35 },
        { marca: 'Nutrimental', shareValor: 11.0, shareVolume: 13.1, preco: 11.95 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.05 }
      ],
      sul: [
        { marca: 'NutPower', shareValor: 34.0, shareVolume: 32.6, preco: 14.55 },
        { marca: 'NutSul', shareValor: 28.3, shareVolume: 27.4, preco: 14.40 },
        { marca: 'Kobber', shareValor: 25.7, shareVolume: 24.6, preco: 14.55 },
        { marca: 'Nutrimental', shareValor: 12.0, shareVolume: 15.4, preco: 11.15 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.00 }
      ],
      ne_no_co: [
        { marca: 'CashewBar', shareValor: 33.0, shareVolume: 35.3, preco: 13.00 },
        { marca: 'NutPower', shareValor: 31.3, shareVolume: 29.7, preco: 14.65 },
        { marca: 'Kobber', shareValor: 24.7, shareVolume: 23.6, preco: 14.60 },
        { marca: 'Nutrimental', shareValor: 11.0, shareVolume: 11.4, preco: 13.50 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 13.70 }
      ]
    }
  },

  // ========== PROTEÍNA ==========
  proteina: {
    mes_yoy: {
      brasil: [
        { marca: 'ProteinMax', shareValor: 38.5, shareVolume: 36.8, preco: 15.25 },
        { marca: 'Kobber', shareValor: 32.2, shareVolume: 30.9, preco: 15.20 },
        { marca: 'PowerBar', shareValor: 21.8, shareVolume: 22.5, preco: 14.15 },
        { marca: 'Nutrimental', shareValor: 7.5, shareVolume: 9.8, preco: 11.15 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.65 }
      ],
      sp_rj_mg_es: [
        { marca: 'ProteinMax', shareValor: 40.8, shareVolume: 39.1, preco: 15.30 },
        { marca: 'Kobber', shareValor: 34.5, shareVolume: 33.1, preco: 15.25 },
        { marca: 'PowerBar', shareValor: 20.2, shareVolume: 20.9, preco: 14.20 },
        { marca: 'Nutrimental', shareValor: 4.5, shareVolume: 6.9, preco: 9.55 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.75 }
      ],
      sul: [
        { marca: 'ProteinMax', shareValor: 36.2, shareVolume: 34.7, preco: 15.25 },
        { marca: 'ProteinSul', shareValor: 31.5, shareVolume: 30.2, preco: 15.25 },
        { marca: 'Kobber', shareValor: 28.8, shareVolume: 27.6, preco: 15.25 },
        { marca: 'Nutrimental', shareValor: 3.5, shareVolume: 7.5, preco: 6.85 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.70 }
      ],
      ne_no_co: [
        { marca: 'PowerBar', shareValor: 35.8, shareVolume: 37.5, preco: 13.95 },
        { marca: 'ProteinMax', shareValor: 33.5, shareVolume: 31.9, preco: 15.35 },
        { marca: 'Kobber', shareValor: 27.2, shareVolume: 26.1, preco: 15.25 },
        { marca: 'Nutrimental', shareValor: 3.5, shareVolume: 4.5, preco: 11.40 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.50 }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { marca: 'ProteinMax', shareValor: 38.7, shareVolume: 37.0, preco: 15.27 },
        { marca: 'Kobber', shareValor: 32.4, shareVolume: 31.1, preco: 15.22 },
        { marca: 'PowerBar', shareValor: 22.0, shareVolume: 22.7, preco: 14.17 },
        { marca: 'Nutrimental', shareValor: 6.9, shareVolume: 9.2, preco: 10.95 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.67 }
      ],
      sp_rj_mg_es: [
        { marca: 'ProteinMax', shareValor: 41.0, shareVolume: 39.3, preco: 15.32 },
        { marca: 'Kobber', shareValor: 34.7, shareVolume: 33.3, preco: 15.27 },
        { marca: 'PowerBar', shareValor: 20.4, shareVolume: 21.1, preco: 14.22 },
        { marca: 'Nutrimental', shareValor: 3.9, shareVolume: 6.3, preco: 9.05 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.77 }
      ],
      sul: [
        { marca: 'ProteinMax', shareValor: 36.4, shareVolume: 34.9, preco: 15.27 },
        { marca: 'ProteinSul', shareValor: 31.7, shareVolume: 30.4, preco: 15.27 },
        { marca: 'Kobber', shareValor: 29.0, shareVolume: 27.8, preco: 15.27 },
        { marca: 'Nutrimental', shareValor: 2.9, shareVolume: 6.9, preco: 6.15 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.72 }
      ],
      ne_no_co: [
        { marca: 'PowerBar', shareValor: 36.0, shareVolume: 37.7, preco: 13.97 },
        { marca: 'ProteinMax', shareValor: 33.7, shareVolume: 32.1, preco: 15.37 },
        { marca: 'Kobber', shareValor: 27.4, shareVolume: 26.3, preco: 15.27 },
        { marca: 'Nutrimental', shareValor: 2.9, shareVolume: 3.9, preco: 10.90 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.52 }
      ]
    },
    ytd_yoy: {
      brasil: [
        { marca: 'ProteinMax', shareValor: 39.0, shareVolume: 37.3, preco: 15.30 },
        { marca: 'Kobber', shareValor: 32.7, shareVolume: 31.4, preco: 15.25 },
        { marca: 'PowerBar', shareValor: 22.3, shareVolume: 23.0, preco: 14.20 },
        { marca: 'Nutrimental', shareValor: 6.0, shareVolume: 8.3, preco: 10.60 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.70 }
      ],
      sp_rj_mg_es: [
        { marca: 'ProteinMax', shareValor: 41.3, shareVolume: 39.6, preco: 15.35 },
        { marca: 'Kobber', shareValor: 35.0, shareVolume: 33.6, preco: 15.30 },
        { marca: 'PowerBar', shareValor: 20.7, shareVolume: 21.4, preco: 14.25 },
        { marca: 'Nutrimental', shareValor: 3.0, shareVolume: 5.4, preco: 8.15 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.80 }
      ],
      sul: [
        { marca: 'ProteinMax', shareValor: 36.7, shareVolume: 35.2, preco: 15.30 },
        { marca: 'ProteinSul', shareValor: 32.0, shareVolume: 30.7, preco: 15.30 },
        { marca: 'Kobber', shareValor: 29.3, shareVolume: 28.1, preco: 15.30 },
        { marca: 'Nutrimental', shareValor: 2.0, shareVolume: 6.0, preco: 4.90 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.75 }
      ],
      ne_no_co: [
        { marca: 'PowerBar', shareValor: 36.3, shareVolume: 38.0, preco: 14.00 },
        { marca: 'ProteinMax', shareValor: 34.0, shareVolume: 32.4, preco: 15.40 },
        { marca: 'Kobber', shareValor: 27.7, shareVolume: 26.6, preco: 15.30 },
        { marca: 'Nutrimental', shareValor: 2.0, shareVolume: 3.0, preco: 9.80 },
        { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 14.55 }
      ]
    }
  }
};

// Função helper para obter dados de marcas baseado em categoria e período
export function getMarcasData(category, period) {
  const key = category.toLowerCase();
  
  // Retorna dados da categoria específica ou TOTAL como fallback
  if (marcasData[key] && marcasData[key][period]) {
    return marcasData[key][period];
  }
  
  // Fallback para TOTAL
  return marcasData.total[period] || marcasData.total.mes_yoy;
}
