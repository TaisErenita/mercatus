// Dados reais do Amazon - Agosto 2024 vs Agosto 2025
// Fonte: RelatórioAmazon.xlsx (global-vendas)
// Categorização: Cereais, Frutas, Nuts, Proteína
// Última atualização: 29/10/2025

const amazonDataRaw = {
  "top10": [
    {
      "Nome do produto": "Nutry Display Barra De Cereal Morango Com Chocolate - 22G - Display 24 Unidades",
      "Categoria": "Cereais",
      "Unidades enviadas_2025": 1242,
      "Unidades enviadas_2024": 631,
      "Variacao_Pct": 96.83
    },
    {
      "Nome do produto": "Nutry Barra De Cereal Banana Aveia E Mel Com 24 Unidades",
      "Categoria": "Cereais",
      "Unidades enviadas_2025": 734,
      "Unidades enviadas_2024": 529,
      "Variacao_Pct": 38.75
    },
    {
      "Nome do produto": "Nutry Barra De Cereais Bolo De Chocolate 22G - Display Com 24 Unidades - Com 3 Cereais E Cacau",
      "Categoria": "Cereais",
      "Unidades enviadas_2025": 672,
      "Unidades enviadas_2024": 420,
      "Variacao_Pct": 60.0
    },
    {
      "Nome do produto": "Barra de Cereal Avelã com Chocolate Nutry com 24 Unidades",
      "Categoria": "Cereais",
      "Unidades enviadas_2025": 512,
      "Unidades enviadas_2024": 248,
      "Variacao_Pct": 106.45
    },
    {
      "Nome do produto": "Nutry Barra De Proteínas Crispy Chocolate Ao Leite 30G - Display Com 12 Unidades - Com Whey E 9G De Proteínas",
      "Categoria": "Proteína",
      "Unidades enviadas_2025": 481,
      "Unidades enviadas_2024": 337,
      "Variacao_Pct": 42.73
    },
    {
      "Nome do produto": "Nutry Display Barra De Cereal Frutas Vermelhas - 22G - Display 24 Unidades",
      "Categoria": "Cereais",
      "Unidades enviadas_2025": 408,
      "Unidades enviadas_2024": 315,
      "Variacao_Pct": 29.52
    },
    {
      "Nome do produto": "Nutry Barra De Cereais Castanha-De-Caju Com Chocolate 22G - Display Com 24 Unidades - Com 3 Cereais E Castanha",
      "Categoria": "Cereais",
      "Unidades enviadas_2025": 372,
      "Unidades enviadas_2024": 397,
      "Variacao_Pct": -6.30
    },
    {
      "Nome do produto": "Barra de Proteínas Nutry Crispy Protein Trufa de Avelã 30g - Display Com 12 Unidades - Com Whey e 9g de Proteínas",
      "Categoria": "Nuts",
      "Unidades enviadas_2025": 237,
      "Unidades enviadas_2024": 0,
      "Variacao_Pct": 23700.0
    },
    {
      "Nome do produto": "Nutry Barra De Fruta Coco 19G - Display Com 24 Unidades - Com Fruta Chocolate E Aveia",
      "Categoria": "Frutas",
      "Unidades enviadas_2025": 203,
      "Unidades enviadas_2024": 117,
      "Variacao_Pct": 73.50
    },
    {
      "Nome do produto": "Nutry Barra de Fruta Morango 20g - Display Com 24 Unidades - Com Fruta, Chocolate e Aveia",
      "Categoria": "Frutas",
      "Unidades enviadas_2025": 185,
      "Unidades enviadas_2024": 0,
      "Variacao_Pct": 18500.0
    }
  ],
  "crescimentos": [
    {
      "Nome do produto": "Nutry Barra De Fruta Ameixa 20G - Display Com 24 Unidades - Com Fruta Chocolate E Aveia",
      "Categoria": "Frutas",
      "Unidades enviadas_2025": 36,
      "Unidades enviadas_2024": 13,
      "Variacao_Pct": 176.92
    },
    {
      "Nome do produto": "Barra de Cereal Avelã com Chocolate Nutry com 24 Unidades",
      "Categoria": "Cereais",
      "Unidades enviadas_2025": 512,
      "Unidades enviadas_2024": 248,
      "Variacao_Pct": 106.45
    },
    {
      "Nome do produto": "Nutry Display Barra De Cereal Morango Com Chocolate - 22G - Display 24 Unidades",
      "Categoria": "Cereais",
      "Unidades enviadas_2025": 1242,
      "Unidades enviadas_2024": 631,
      "Variacao_Pct": 96.83
    }
  ],
  "quedas": [
    {
      "Nome do produto": "Nutry Barra De Cereais Avelã Com Chocolate 22G - Com 3 Cereais E Avelã",
      "Categoria": "Cereais",
      "Unidades enviadas_2025": 0,
      "Unidades enviadas_2024": 693,
      "Variacao_Pct": -100.0
    },
    {
      "Nome do produto": "Nutry Morango - Barra de Cereal com Chocolate - 22g",
      "Categoria": "Cereais",
      "Unidades enviadas_2025": 0,
      "Unidades enviadas_2024": 1200,
      "Variacao_Pct": -100.0
    },
    {
      "Nome do produto": "Barra de Fruta Nutry Banana 20g - Display Com 24 Unidades - Com Fruta, Chocolate e Aveia",
      "Categoria": "Frutas",
      "Unidades enviadas_2025": 0,
      "Unidades enviadas_2024": 61,
      "Variacao_Pct": -100.0
    }
  ]
};

/**
 * Filtra dados Amazon por categoria
 * @param {string} categoria - "Cereais", "Frutas", "Nuts", "Proteína" ou "Todos"
 * @returns {object} Dados filtrados
 */
export function getAmazonDataByCategoria(categoria) {
  if (categoria === 'Todos' || categoria === 'total') {
    return amazonDataRaw;
  }
  
  return {
    top10: amazonDataRaw.top10.filter(p => p.Categoria === categoria),
    crescimentos: amazonDataRaw.crescimentos.filter(p => p.Categoria === categoria),
    quedas: amazonDataRaw.quedas.filter(p => p.Categoria === categoria)
  };
}

/**
 * Formata nome do produto para exibição
 * @param {string} nome - Nome completo do produto
 * @returns {string} Nome formatado (máximo 50 caracteres)
 */
export function formatarNomeProduto(nome) {
  if (nome.length <= 50) return nome;
  return nome.substring(0, 47) + '...';
}

/**
 * Formata variação percentual com seta
 * @param {number} variacao - Variação percentual
 * @returns {object} {texto, cor, seta}
 */
export function formatarVariacao(variacao) {
  const seta = variacao > 0 ? '↑' : variacao < 0 ? '↓' : '→';
  const cor = variacao > 0 ? 'text-green-600' : variacao < 0 ? 'text-red-600' : 'text-gray-600';
  const texto = variacao > 0 ? `+${variacao.toFixed(1)}%` : `${variacao.toFixed(1)}%`;
  
  return { texto, cor, seta };
}

/**
 * Retorna métricas agregadas do Amazon
 * @param {string} categoria - Categoria de produto
 * @returns {object} Métricas agregadas
 */
export function getAmazonMetrics(categoria) {
  const dados = getAmazonDataByCategoria(categoria);
  
  const totalUnidades2025 = dados.top10.reduce((sum, p) => sum + p['Unidades enviadas_2025'], 0);
  const totalUnidades2024 = dados.top10.reduce((sum, p) => sum + p['Unidades enviadas_2024'], 0);
  const variacaoTotal = totalUnidades2024 > 0 
    ? ((totalUnidades2025 - totalUnidades2024) / totalUnidades2024 * 100).toFixed(1)
    : '0.0';
  
  return {
    totalUnidades2025,
    totalUnidades2024,
    variacaoTotal,
    qtdProdutos: dados.top10.length,
    qtdCrescimentos: dados.crescimentos.length,
    qtdQuedas: dados.quedas.length
  };
}

export default amazonDataRaw;
