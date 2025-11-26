// Dados filtrados por categoria e período para o dashboard
export const filteredData = {
  // TOTAL - Todas as categorias
  total: {
    mes_yoy: {
      marketShare: 50.16,
      vendas: 351804,
      receita: 119.5,
      r2Score: 0.788,
      periodo: 'Ago/25 vs Ago/24',
      variacao: { marketShare: +2.3, vendas: +15.2, receita: +18.5, r2Score: +0.05 }
    },
    trimestre_yoy: {
      marketShare: 49.8,
      vendas: 1055412,
      receita: 358.4,
      r2Score: 0.792,
      periodo: 'Jun-Jul-Ago/25 vs Jun-Jul-Ago/24',
      variacao: { marketShare: +1.8, vendas: +12.5, receita: +14.2, r2Score: +0.04 }
    },
    ytd_yoy: {
      marketShare: 48.5,
      vendas: 2814432,
      receita: 956.0,
      r2Score: 0.805,
      periodo: 'Jan-Ago/25 vs Jan-Ago/24',
      variacao: { marketShare: +3.2, vendas: +18.7, receita: +21.3, r2Score: +0.08 }
    }
  },
  
  // CEREAIS
  cereais: {
    mes_yoy: {
      marketShare: 52.3,
      vendas: 184042,
      receita: 62.5,
      r2Score: 0.812,
      periodo: 'Ago/25 vs Ago/24',
      variacao: { marketShare: +3.1, vendas: +16.8, receita: +19.2, r2Score: +0.06 }
    },
    trimestre_yoy: {
      marketShare: 51.9,
      vendas: 552126,
      receita: 187.5,
      r2Score: 0.818,
      periodo: 'Jun-Jul-Ago/25 vs Jun-Jul-Ago/24',
      variacao: { marketShare: +2.5, vendas: +14.3, receita: +16.8, r2Score: +0.05 }
    },
    ytd_yoy: {
      marketShare: 50.8,
      vendas: 1473536,
      receita: 500.4,
      r2Score: 0.825,
      periodo: 'Jan-Ago/25 vs Jan-Ago/24',
      variacao: { marketShare: +4.2, vendas: +20.5, receita: +23.1, r2Score: +0.09 }
    }
  },
  
  // FRUTAS
  frutas: {
    mes_yoy: {
      marketShare: 34.8,
      vendas: 122428,
      receita: 41.6,
      r2Score: 0.745,
      periodo: 'Ago/25 vs Ago/24',
      variacao: { marketShare: +1.8, vendas: +12.5, receita: +14.8, r2Score: +0.04 }
    },
    trimestre_yoy: {
      marketShare: 34.2,
      vendas: 367284,
      receita: 124.7,
      r2Score: 0.752,
      periodo: 'Jun-Jul-Ago/25 vs Jun-Jul-Ago/24',
      variacao: { marketShare: +1.2, vendas: +9.8, receita: +11.5, r2Score: +0.03 }
    },
    ytd_yoy: {
      marketShare: 33.5,
      vendas: 979758,
      receita: 332.6,
      r2Score: 0.768,
      periodo: 'Jan-Ago/25 vs Jan-Ago/24',
      variacao: { marketShare: +2.5, vendas: +15.2, receita: +17.8, r2Score: +0.06 }
    }
  },
  
  // NUTS
  nuts: {
    mes_yoy: {
      marketShare: 28.9,
      vendas: 101671,
      receita: 34.5,
      r2Score: 0.698,
      periodo: 'Ago/25 vs Ago/24',
      variacao: { marketShare: +1.5, vendas: +10.2, receita: +12.3, r2Score: +0.03 }
    },
    trimestre_yoy: {
      marketShare: 28.3,
      vendas: 305013,
      receita: 103.5,
      r2Score: 0.705,
      periodo: 'Jun-Jul-Ago/25 vs Jun-Jul-Ago/24',
      variacao: { marketShare: +0.9, vendas: +8.5, receita: +9.8, r2Score: +0.02 }
    },
    ytd_yoy: {
      marketShare: 27.8,
      vendas: 813700,
      receita: 276.2,
      r2Score: 0.718,
      periodo: 'Jan-Ago/25 vs Jan-Ago/24',
      variacao: { marketShare: +2.1, vendas: +13.5, receita: +15.8, r2Score: +0.05 }
    }
  },
  
  // PROTEÍNA
  proteina: {
    mes_yoy: {
      marketShare: 15.6,
      vendas: 54881,
      receita: 18.6,
      r2Score: 0.625,
      periodo: 'Ago/25 vs Ago/24',
      variacao: { marketShare: +0.8, vendas: +7.5, receita: +8.9, r2Score: +0.02 }
    },
    trimestre_yoy: {
      marketShare: 15.2,
      vendas: 164643,
      receita: 55.9,
      r2Score: 0.632,
      periodo: 'Jun-Jul-Ago/25 vs Jun-Jul-Ago/24',
      variacao: { marketShare: +0.5, vendas: +5.8, receita: +6.5, r2Score: +0.01 }
    },
    ytd_yoy: {
      marketShare: 14.8,
      vendas: 439048,
      receita: 149.1,
      r2Score: 0.645,
      periodo: 'Jan-Ago/25 vs Jan-Ago/24',
      variacao: { marketShare: +1.2, vendas: +9.8, receita: +11.2, r2Score: +0.04 }
    }
  }
};

// Dados do mercado total de barras (considerando filtros)
export const mercadoTotalData = {
  total: {
    mes_yoy: {
      valor: { atual: 238500000, anterior: 201200000 },
      volume: { atual: 703608, anterior: 596800 },
      preco: { atual: 338.92, anterior: 337.15 }
    },
    trimestre_yoy: {
      valor: { atual: 715500000, anterior: 603600000 },
      volume: { atual: 2110824, anterior: 1790400 },
      preco: { atual: 338.92, anterior: 337.15 }
    },
    ytd_yoy: {
      valor: { atual: 1908000000, anterior: 1609600000 },
      volume: { atual: 5628864, anterior: 4774400 },
      preco: { atual: 338.92, anterior: 337.15 }
    }
  },
  cereais: {
    mes_yoy: {
      valor: { atual: 119500000, anterior: 100200000 },
      volume: { atual: 351804, anterior: 295600 },
      preco: { atual: 339.65, anterior: 338.92 }
    },
    trimestre_yoy: {
      valor: { atual: 358500000, anterior: 300600000 },
      volume: { atual: 1055412, anterior: 886800 },
      preco: { atual: 339.65, anterior: 338.92 }
    },
    ytd_yoy: {
      valor: { atual: 956000000, anterior: 801600000 },
      volume: { atual: 2814432, anterior: 2364800 },
      preco: { atual: 339.65, anterior: 338.92 }
    }
  },
  frutas: {
    mes_yoy: {
      valor: { atual: 83100000, anterior: 72000000 },
      volume: { atual: 245856, anterior: 213000 },
      preco: { atual: 338.05, anterior: 338.03 }
    },
    trimestre_yoy: {
      valor: { atual: 249300000, anterior: 216000000 },
      volume: { atual: 737568, anterior: 639000 },
      preco: { atual: 338.05, anterior: 338.03 }
    },
    ytd_yoy: {
      valor: { atual: 665000000, anterior: 576000000 },
      volume: { atual: 1966848, anterior: 1704000 },
      preco: { atual: 338.05, anterior: 338.03 }
    }
  },
  nuts: {
    mes_yoy: {
      valor: { atual: 69000000, anterior: 61000000 },
      volume: { atual: 203342, anterior: 179400 },
      preco: { atual: 339.35, anterior: 340.02 }
    },
    trimestre_yoy: {
      valor: { atual: 207000000, anterior: 183000000 },
      volume: { atual: 610026, anterior: 538200 },
      preco: { atual: 339.35, anterior: 340.02 }
    },
    ytd_yoy: {
      valor: { atual: 552000000, anterior: 488000000 },
      volume: { atual: 1627400, anterior: 1435200 },
      preco: { atual: 339.35, anterior: 340.02 }
    }
  },
  proteina: {
    mes_yoy: {
      valor: { atual: 37200000, anterior: 34500000 },
      volume: { atual: 109762, anterior: 101800 },
      preco: { atual: 338.92, anterior: 338.81 }
    },
    trimestre_yoy: {
      valor: { atual: 111600000, anterior: 103500000 },
      volume: { atual: 329286, anterior: 305400 },
      preco: { atual: 338.92, anterior: 338.81 }
    },
    ytd_yoy: {
      valor: { atual: 298000000, anterior: 276000000 },
      volume: { atual: 878096, anterior: 814400 },
      preco: { atual: 338.92, anterior: 338.81 }
    }
  }
};

// Função helper para obter dados filtrados
export function getFilteredData(category, period) {
  return filteredData[category]?.[period] || filteredData.total.mes_yoy;
}

// Função helper para obter dados do mercado total
export function getMercadoTotalData(category, period) {
  return mercadoTotalData[category]?.[period] || mercadoTotalData.total.mes_yoy;
}
