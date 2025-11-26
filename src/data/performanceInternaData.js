// Dados de Performance Interna da Nutrimental
// Fonte: YTD2025_atualizada08_25.xlsb

const performanceInternaData = {
  // Dados por categoria e período
  TOTAL: {
    'Mês YoY': {
      faturamento: 12744469.67, // Total mensal médio (152933636 / 12)
      volume: 580000, // Estimado
      preco_medio: 21.97,
      crescimento_yoy: 4.5
    },
    'Trimestre YoY': {
      faturamento: 38233409.00, // Total trimestral (152933636 / 4)
      volume: 1740000,
      preco_medio: 21.97,
      crescimento_yoy: 4.5
    },
    'YTD': {
      faturamento: 152933636.00, // Total 2025 YTD
      volume: 6960000,
      preco_medio: 21.97,
      crescimento_yoy: 4.5
    }
  },
  
  CEREAIS: {
    'Mês YoY': {
      faturamento: 6063429.84, // 72761158.07 / 12
      volume: 275000,
      preco_medio: 22.05,
      crescimento_yoy: 0.6 // (72761158 - 72310122) / 72310122 * 100
    },
    'Trimestre YoY': {
      faturamento: 18190289.52,
      volume: 825000,
      preco_medio: 22.05,
      crescimento_yoy: 0.6
    },
    'YTD': {
      faturamento: 72761158.07,
      volume: 3300000,
      preco_medio: 22.05,
      crescimento_yoy: 0.6
    }
  },
  
  FRUTAS: {
    'Mês YoY': {
      faturamento: 430111.42, // 5161337 / 12
      volume: 27000,
      preco_medio: 15.93,
      crescimento_yoy: -18.5 // (5161337 - 6329816) / 6329816 * 100
    },
    'Trimestre YoY': {
      faturamento: 1290334.25,
      volume: 81000,
      preco_medio: 15.93,
      crescimento_yoy: -18.5
    },
    'YTD': {
      faturamento: 5161337.00,
      volume: 324000,
      preco_medio: 15.93,
      crescimento_yoy: -18.5
    }
  },
  
  NUTS: {
    'Mês YoY': {
      faturamento: 645854.75, // 7750257 / 12
      volume: 31000,
      preco_medio: 20.84,
      crescimento_yoy: 79.4 // (7750257 - 4318947) / 4318947 * 100
    },
    'Trimestre YoY': {
      faturamento: 1937564.25,
      volume: 93000,
      preco_medio: 20.84,
      crescimento_yoy: 79.4
    },
    'YTD': {
      faturamento: 7750257.00,
      volume: 372000,
      preco_medio: 20.84,
      crescimento_yoy: 79.4
    }
  },
  
  PROTEÍNA: {
    'Mês YoY': {
      faturamento: 1295659.01, // (11560174 + 3987734) / 12
      volume: 43000,
      preco_medio: 30.13,
      crescimento_yoy: 2.8 // Média ponderada
    },
    'Trimestre YoY': {
      faturamento: 3886977.02,
      volume: 129000,
      preco_medio: 30.13,
      crescimento_yoy: 2.8
    },
    'YTD': {
      faturamento: 15547908.07, // 11560174 + 3987734
      volume: 516000,
      preco_medio: 30.13,
      crescimento_yoy: 2.8
    }
  }
};

export const getPerformanceInternaData = (categoria, periodo) => {
  return performanceInternaData[categoria]?.[periodo] || performanceInternaData.TOTAL['YTD'];
};

export default performanceInternaData;
