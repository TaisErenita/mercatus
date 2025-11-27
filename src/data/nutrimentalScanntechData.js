// Dados Nutrimental Scanntech - Módulo Insights
// Gerado automaticamente em: 2025-11-26 19:28:44

const nutrimentalScanntechData = {
  resumo: {
    vendas_total: 114931609.0515,
    volume_total_kg: 1581351.7497659998,
    preco_medio_kg: 117.48649195775543,
    share_medio: 37.142
  },
  
  performance_regional: {
    "CO": {
        "Share_Vendas_%": 38.38,
        "Share_Volume_%": 59.09
    },
    "NE": {
        "Share_Vendas_%": 31.05,
        "Share_Volume_%": 47.71
    },
    "NO": {
        "Share_Vendas_%": 57.38,
        "Share_Volume_%": 71.19
    },
    "SE": {
        "Share_Vendas_%": 36.68,
        "Share_Volume_%": 57.53
    },
    "SU": {
        "Share_Vendas_%": 22.22,
        "Share_Volume_%": 27.82
    }
},
  
  top_produtos: {
    "CEREAL BARRA NUTRY MORANGO CHOC 22G": {
        "Vendas $": 9433955.59,
        "Volume (Kg)": 116458.41,
        "Pre\u00e7o (Kg)": 93.5,
        "Preco_Medio": 81.01
    },
    "CEREAL BARRA NUTRY BOLO DE CHOCOLATE 22G": {
        "Vendas $": 9190063.78,
        "Volume (Kg)": 116389.51,
        "Pre\u00e7o (Kg)": 91.11,
        "Preco_Medio": 78.96
    },
    "CEREAL BARRA NUTRY BANANA AVEIA MEL 22G": {
        "Vendas $": 8186117.44,
        "Volume (Kg)": 106137.58,
        "Pre\u00e7o (Kg)": 85.22,
        "Preco_Medio": 77.13
    },
    "CEREAL EM BARRA SAUD NUTRY AVELA/CHOCOLATE 22G": {
        "Vendas $": 7811452.23,
        "Volume (Kg)": 101382.44,
        "Pre\u00e7o (Kg)": 90.93,
        "Preco_Medio": 77.05
    },
    "CEREAL BARRA NUTRY MORANGO COM CHOCOLATE 24X22G": {
        "Vendas $": 6376693.85,
        "Volume (Kg)": 106554.12,
        "Pre\u00e7o (Kg)": 66.44,
        "Preco_Medio": 59.84
    },
    "CEREAL BARRA NUTRY BOLO DE CHOCOLATE 24X22G": {
        "Vendas $": 6150026.83,
        "Volume (Kg)": 103920.43,
        "Pre\u00e7o (Kg)": 66.45,
        "Preco_Medio": 59.18
    },
    "CEREAL BARRA NUTRY MORANGO CHOCOLATE 3X22G": {
        "Vendas $": 6134175.79,
        "Volume (Kg)": 71229.44,
        "Pre\u00e7o (Kg)": 86.87,
        "Preco_Medio": 86.12
    },
    "CEREAL BARRA NUTRY AVEIA BAN MEL 24X22G": {
        "Vendas $": 6004963.55,
        "Volume (Kg)": 164253.17,
        "Pre\u00e7o (Kg)": 206.04,
        "Preco_Medio": 36.56
    },
    "CEREAL BARRA NUTRY AVEIA BANANA MEL 3X22G": {
        "Vendas $": 5845381.41,
        "Volume (Kg)": 68481.4,
        "Pre\u00e7o (Kg)": 86.96,
        "Preco_Medio": 85.36
    },
    "CEREAL EM BARRA SAUD NUTRY AVELA CHOCOLATE 3X22G": {
        "Vendas $": 5371352.69,
        "Volume (Kg)": 64429.2,
        "Pre\u00e7o (Kg)": 86.47,
        "Preco_Medio": 83.37
    }
},
  
  insights: [
    {
      titulo: "Norte Lidera com 57% de Share",
      descricao: "Região Norte apresenta maior participação de mercado",
      impacto: "alto",
      regiao: "NO"
    },
    {
      titulo: "Sul tem Maior Potencial de Crescimento",
      descricao: "Apenas 22% de share, indicando grande oportunidade",
      impacto: "alto",
      regiao: "SU"
    },
    {
      titulo: "Sudeste com Preços Premium",
      descricao: "Preço médio 28% acima do Sul",
      impacto: "medio",
      regiao: "SE"
    }
  ]
};

export function getNutrimentalResumo() {
  return nutrimentalScanntechData.resumo;
}

export function getNutrimentalPerformanceRegional() {
  return nutrimentalScanntechData.performance_regional;
}

export function getNutrimentalTopProdutos(limit = 10) {
  return Object.entries(nutrimentalScanntechData.top_produtos)
    .slice(0, limit)
    .map(([nome, dados]) => ({ nome, ...dados }));
}

export function getNutrimentalInsights() {
  return nutrimentalScanntechData.insights;
}

export default nutrimentalScanntechData;
