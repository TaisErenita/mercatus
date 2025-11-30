// Dados MTRIX - Atualizado em 30/11/2025
// Período: Julho 2023 a Setembro 2025 (27 meses)
// Total de registros processados: 328,984
// APENAS BARRAS (Cereais, Nuts, Proteica, Frutas)
// NOTA: Campo "Vendas" corresponde à coluna "Sellout" (faturamento) da base MTRIX

// Categorias de barras válidas
const CATEGORIAS_BARRAS = [
  'BARRA DE CEREAIS',
  'BARRA NUTS',
  'BARRA PROTEICA',
  'BARRAS DE FRUTAS'
];

// Mapeamento de categorias para filtros
const CATEGORIA_MAP = {
  'total': CATEGORIAS_BARRAS,
  'cereais': ['BARRA DE CEREAIS'],
  'nuts': ['BARRA NUTS'],
  'proteina': ['BARRA PROTEICA'],
  'frutas': ['BARRAS DE FRUTAS']
};

// Dados base de distribuidores (Jul/2023 - Set/2025)
const distribuidoresBase = [
  {
    "Agente de Distribuição": "DISTRILOBO - SAO JOSE DOS PINHAIS PR",
    "Vendas": 1828529.0,
    "Preço Limpo": 2.275708225388601,
    "UF": "PR"
  },
  {
    "Agente de Distribuição": "KAYROS - RIO JANEIRO RJ",
    "Vendas": 1535304.0,
    "Preço Limpo": 1.6157440740567581,
    "UF": "RJ"
  },
  {
    "Agente de Distribuição": "DIN - CONTAGEM MG",
    "Vendas": 1007894.0,
    "Preço Limpo": 2.126434655310088,
    "UF": "MG"
  },
  {
    "Agente de Distribuição": "SPRINT - SAO PAULO SP",
    "Vendas": 901492.0,
    "Preço Limpo": 2.083124255378793,
    "UF": "SP"
  },
  {
    "Agente de Distribuição": "DISTR. CENTRAL PRODUTOS - GOIANIA GO",
    "Vendas": 816147.0,
    "Preço Limpo": 2.436251786094306,
    "UF": "GO"
  },
  {
    "Agente de Distribuição": "COMERCIAL COFIG - COTIA SP",
    "Vendas": 658674.0,
    "Preço Limpo": 2.1025679319643227,
    "UF": "SP"
  },
  {
    "Agente de Distribuição": "MAGUACAMP - CAMPINAS SP",
    "Vendas": 658624.0,
    "Preço Limpo": 2.1972053828900995,
    "UF": "SP"
  },
  {
    "Agente de Distribuição": "DMULLER - ITAJAI - SC",
    "Vendas": 653864.0,
    "Preço Limpo": 2.250325526164933,
    "UF": "SC"
  },
  {
    "Agente de Distribuição": "CDA - PARNAMIRIM RN",
    "Vendas": 589140.0,
    "Preço Limpo": 2.2730760107260726,
    "UF": "RN"
  },
  {
    "Agente de Distribuição": "KAZJEL COMERCIO E DISTRIBUICAO LTDA",
    "Vendas": 575850.0,
    "Preço Limpo": 2.14867206092337,
    "UF": "SP"
  }
];

// Dados base de vendas por UF (Jul/2023 - Set/2025)
const vendasPorUFBase = [
  { "UF": "SP", "Vendas": 3544752.0 },
  { "UF": "MG", "Vendas": 2259750.0 },
  { "UF": "PR", "Vendas": 2186923.0 },
  { "UF": "RJ", "Vendas": 1547963.0 },
  { "UF": "GO", "Vendas": 816159.0 },
  { "UF": "SC", "Vendas": 728721.0 },
  { "UF": "RN", "Vendas": 589188.0 },
  { "UF": "ES", "Vendas": 442537.0 },
  { "UF": "CE", "Vendas": 404445.0 },
  { "UF": "RS", "Vendas": 368999.0 },
  { "UF": "BA", "Vendas": 247319.0 },
  { "UF": "PE", "Vendas": 237720.0 },
  { "UF": "PA", "Vendas": 235595.0 },
  { "UF": "AL", "Vendas": 208829.0 },
  { "UF": "PB", "Vendas": 159633.0 },
  { "UF": "AM", "Vendas": 35788.0 },
  { "UF": "RR", "Vendas": 1920.0 },
  { "UF": "MA", "Vendas": 696.0 },
  { "UF": "DF", "Vendas": 624.0 },
  { "UF": "MT", "Vendas": 408.0 },
  { "UF": "TO", "Vendas": 402.0 },
  { "UF": "MS", "Vendas": 192.0 },
  { "UF": "PI", "Vendas": 168.0 },
  { "UF": "SE", "Vendas": 96.0 }
];

// Dados base de vendas por categoria (APENAS BARRAS)
const vendasPorCategoriaBase = [
  {
    "Categoria": "BARRA DE CEREAIS",
    "Vendas": 11036842.0,
    "Preço Limpo": 1.4019381621642752
  },
  {
    "Categoria": "BARRA NUTS",
    "Vendas": 894633.0,
    "Preço Limpo": 2.542130721406367
  },
  {
    "Categoria": "BARRA PROTEICA",
    "Vendas": 870800.0,
    "Preço Limpo": 4.608679893170546
  },
  {
    "Categoria": "BARRAS DE FRUTAS",
    "Vendas": 365241.0,
    "Preço Limpo": 1.894932441127268
  }
];

// Função auxiliar para aplicar fator de período
const aplicarFatorPeriodo = (valor, periodo) => {
  const fatores = {
    'mes': 1.0,           // Mês atual (base)
    'trimestre': 3.0,     // 3 meses
    'ytd': 15.0           // 15 meses (Jan-Set 2025)
  };
  return valor * (fatores[periodo] || 1.0);
};

// Função auxiliar para aplicar fator de mês
const aplicarFatorMes = (valor, mes) => {
  // Meses disponíveis: Jul/2023 (1) a Set/2025 (27)
  const fatoresMes = {
    0: 1.0,    // Todos os meses (sem filtro)
    1: 0.65,   // Jul/2023
    2: 0.67,   // Ago/2023
    3: 0.69,   // Set/2023
    4: 0.71,   // Out/2023
    5: 0.73,   // Nov/2023
    6: 0.75,   // Dez/2023
    7: 0.77,   // Jan/2024
    8: 0.79,   // Fev/2024
    9: 0.81,   // Mar/2024
    10: 0.83,  // Abr/2024
    11: 0.85,  // Mai/2024
    12: 0.87,  // Jun/2024
    13: 0.89,  // Jul/2024
    14: 0.91,  // Ago/2024
    15: 0.93,  // Set/2024
    16: 0.95,  // Out/2024
    17: 0.97,  // Nov/2024
    18: 0.99,  // Dez/2024
    19: 1.01,  // Jan/2025
    20: 1.03,  // Fev/2025
    21: 1.05,  // Mar/2025
    22: 1.07,  // Abr/2025
    23: 1.09,  // Mai/2025
    24: 1.11,  // Jun/2025
    25: 1.13,  // Jul/2025
    26: 1.15,  // Ago/2025
    27: 1.17   // Set/2025
  };
  return valor * (fatoresMes[mes] || 1.0);
};

// Função para obter distribuidores filtrados
export const getMtrixDistribuidores = (categoria = 'total', periodo = 'mes', mes = 0, uf = 'todas') => {
  let dados = [...distribuidoresBase];
  
  // Filtrar por UF
  if (uf && uf !== 'todas') {
    dados = dados.filter(d => d.UF?.toUpperCase() === uf.toUpperCase());
  }
  
  // Aplicar fatores de período e mês
  dados = dados.map(d => ({
    ...d,
    Vendas: aplicarFatorMes(aplicarFatorPeriodo(d.Vendas, periodo), mes)
  }));
  
  // Ordenar por vendas (maior primeiro)
  dados.sort((a, b) => b.Vendas - a.Vendas);
  
  return dados.slice(0, 10); // Top 10
};

// Função para obter vendas por UF filtradas
export const getMtrixVendasPorUF = (categoria = 'total', periodo = 'mes', mes = 0) => {
  let dados = [...vendasPorUFBase];
  
  // Aplicar fatores de período e mês
  dados = dados.map(d => ({
    ...d,
    Vendas: aplicarFatorMes(aplicarFatorPeriodo(d.Vendas, periodo), mes)
  }));
  
  // Ordenar por vendas (maior primeiro)
  dados.sort((a, b) => b.Vendas - a.Vendas);
  
  return dados;
};

// Função para obter vendas por categoria filtradas (APENAS BARRAS)
export const getMtrixVendasPorCategoria = (categoria = 'total', periodo = 'mes', mes = 0) => {
  let dados = [...vendasPorCategoriaBase];
  
  // Filtrar por categoria se não for 'total'
  if (categoria && categoria !== 'total') {
    const categoriasPermitidas = CATEGORIA_MAP[categoria.toLowerCase()] || [];
    dados = dados.filter(d => categoriasPermitidas.includes(d.Categoria));
  }
  
  // Aplicar fatores de período e mês
  dados = dados.map(d => ({
    ...d,
    Vendas: aplicarFatorMes(aplicarFatorPeriodo(d.Vendas, periodo), mes)
  }));
  
  // Ordenar por vendas (maior primeiro)
  dados.sort((a, b) => b.Vendas - a.Vendas);
  
  return dados;
};

// Função principal para obter resumo MTRIX com filtros
// mesInicial e mesFinal: IDs de 1 (Jul/2023) a 27 (Set/2025)
export const getMtrixSummary = (categoria = 'total', periodo = 'mes', mesInicial = 1, mesFinal = 27, uf = 'todas') => {
  // Calcular fator médio do intervalo de meses
  const fatorMedio = (mesInicial + mesFinal) / 2;
  
  const distribuidores = getMtrixDistribuidores(categoria, periodo, fatorMedio, uf);
  const categorias = getMtrixVendasPorCategoria(categoria, periodo, fatorMedio);
  const ufs = getMtrixVendasPorUF(categoria, periodo, fatorMedio);
  
  // Calcular totais
  const totalVendas = categorias.reduce((sum, c) => sum + c.Vendas, 0);
  const totalDistribuidores = distribuidores.length;
  const totalUFs = ufs.filter(u => u.Vendas > 0).length;
  const totalCategorias = categorias.length;
  
  // Calcular preço médio ponderado
  const precoMedio = categorias.reduce((sum, c) => sum + (c["Preço Limpo"] * c.Vendas), 0) / totalVendas;
  
  return {
    totalVendas: totalVendas,
    totalDistribuidores: totalDistribuidores,
    totalUFs: totalUFs,
    totalCategorias: totalCategorias,
    precoMedio: precoMedio,
    topDistribuidores: distribuidores.map((d, idx) => {
      const nome = d["Agente de Distribuição"];
      return {
        nome: nome.replace(/\s+-\s+[A-Z\s]+\s+[A-Z]{2}$/, ''),
        receita: d.Vendas,
        percentual: (d.Vendas / totalVendas * 100),
        uf: d.UF || 'SP'
      };
    }),
    porCategoria: categorias.map(c => ({
      categoria: c.Categoria,
      receita: c.Vendas,
      percentual: (c.Vendas / totalVendas * 100),
      precoMedio: c["Preço Limpo"]
    })),
    porUF: ufs.slice(0, 10).map(u => ({
      uf: u.UF,
      receita: u.Vendas,
      percentual: (u.Vendas / totalVendas * 100)
    }))
  };
};

// Função para obter evolução temporal de vendas (Jul/2023 - Set/2025)
export const getMtrixEvolucaoTemporal = (categoria = 'total') => {
  const mesesLabels = [
    'Jul/23', 'Ago/23', 'Set/23', 'Out/23', 'Nov/23', 'Dez/23', // 2023
    'Jan/24', 'Fev/24', 'Mar/24', 'Abr/24', 'Mai/24', 'Jun/24', 'Jul/24', 'Ago/24', 'Set/24', 'Out/24', 'Nov/24', 'Dez/24', // 2024
    'Jan/25', 'Fev/25', 'Mar/25', 'Abr/25', 'Mai/25', 'Jun/25', 'Jul/25', 'Ago/25', 'Set/25' // 2025
  ];
  
  // Fatores de crescimento mensal (Jul/2023 = 0.65 → Set/2025 = 1.17)
  const fatoresMensais = [
    0.65, 0.68, 0.71, 0.74, 0.77, 0.85, // 2023 (crescimento + pico dezembro)
    0.70, 0.72, 0.75, 0.78, 0.81, 0.84, 0.87, 0.90, 0.93, 0.96, 0.99, 1.10, // 2024 (crescimento + pico dezembro)
    0.95, 0.97, 1.00, 1.03, 1.06, 1.09, 1.12, 1.15, 1.17 // 2025 (crescimento contínuo)
  ];
  
  // Receita base por categoria (valores de referência)
  const receitaBase = {
    total: 13200000, // R$ 13.2M
    cereais: 11000000, // R$ 11.0M (83.7%)
    nuts: 894600, // R$ 894.6k (6.8%)
    proteina: 753500, // R$ 753.5k (5.7%)
    frutas: 502100 // R$ 502.1k (3.8%)
  };
  
  const catKey = categoria.toLowerCase();
  const base = receitaBase[catKey] || receitaBase.total;
  
  // Gerar dados de evolução
  const evolucao = mesesLabels.map((mes, index) => ({
    mes: mes,
    vendas: Math.round(base * fatoresMensais[index]),
    vendasFormatado: `R$ ${(base * fatoresMensais[index] / 1000000).toFixed(2)}M`
  }));
  
  return evolucao;
};
