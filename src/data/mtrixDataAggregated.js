// Dados MTRIX agregados - Setembro/2025 (dados reais)
// Este arquivo contém agregações mensais reais processadas do Excel

// Dados agregados por distribuidor, mês e UF (com contagem de clientes/PDVs)
const distribuidoresData = [
  { Distribuidor: "DISTRILOBO - SAO JOSE DOS PINHAIS PR", Mes: "2025/SET", UF: "PR", Sellout: 385947.39, Unidades: 246108, PDV: 777 },
  { Distribuidor: "KAYROS - RIO JANEIRO RJ", Mes: "2025/SET", UF: "RJ", Sellout: 332890.43, Unidades: 212580, PDV: 621 },
  { Distribuidor: "COMERCIAL COFIG - COTIA SP", Mes: "2025/SET", UF: "SP", Sellout: 229380.36, Unidades: 146388, PDV: 403 },
  { Distribuidor: "SPRINT - SAO PAULO SP", Mes: "2025/SET", UF: "SP", Sellout: 220199.69, Unidades: 140528, PDV: 338 },
  { Distribuidor: "DMULLER - ITAJAI - SC", Mes: "2025/SET", UF: "SC", Sellout: 209623.22, Unidades: 133758, PDV: 1015 },
  { Distribuidor: "DISTR. CENTRAL PRODUTOS - GOIANIA GO", Mes: "2025/SET", UF: "GO", Sellout: 180668.53, Unidades: 115227, PDV: 1224 },
  { Distribuidor: "DIN - CONTAGEM MG", Mes: "2025/SET", UF: "MG", Sellout: 168280.96, Unidades: 107379, PDV: 700 },
  { Distribuidor: "CDA - PARNAMIRIM RN", Mes: "2025/SET", UF: "RN", Sellout: 159570.57, Unidades: 101844, PDV: 1030 },
  { Distribuidor: "MAGUACAMP - CAMPINAS SP", Mes: "2025/SET", UF: "SP", Sellout: 155695.66, Unidades: 99372, PDV: 658 },
  { Distribuidor: "DISTRIMAR - REGENTE FEIJO SP", Mes: "2025/SET", UF: "SP", Sellout: 137223.90, Unidades: 87582, PDV: 340 },
  // ... outros distribuidores (total de 47)
];

// Mapeamento de categorias
const CATEGORIA_MAP = {
  'total': ['BARRA DE CEREAIS', 'BARRA PROTEICA', 'BARRA NUTS', 'BARRAS DE FRUTAS'],
  'cereais': ['BARRA DE CEREAIS'],
  'nuts': ['BARRA NUTS'],
  'proteina': ['BARRA PROTEICA'],
  'frutas': ['BARRAS DE FRUTAS']
};

// Mapeamento de meses para IDs (1-27)
const MESES_IDS = {
  '2023/JUL': 1, '2023/AGO': 2, '2023/SET': 3, '2023/OUT': 4, '2023/NOV': 5, '2023/DEZ': 6,
  '2024/JAN': 7, '2024/FEV': 8, '2024/MAR': 9, '2024/ABR': 10, '2024/MAI': 11, '2024/JUN': 12,
  '2024/JUL': 13, '2024/AGO': 14, '2024/SET': 15, '2024/OUT': 16, '2024/NOV': 17, '2024/DEZ': 18,
  '2025/JAN': 19, '2025/FEV': 20, '2025/MAR': 21, '2025/ABR': 22, '2025/MAI': 23, '2025/JUN': 24,
  '2025/JUL': 25, '2025/AGO': 26, '2025/SET': 27
};

// IDs para meses (reverso)
const IDS_MESES = Object.fromEntries(Object.entries(MESES_IDS).map(([k, v]) => [v, k]));

/**
 * Função principal para obter resumo MTRIX com filtros
 * @param {string} categoria - 'total', 'cereais', 'nuts', 'proteina', 'frutas'
 * @param {string} periodo - 'mes', 'trimestre', 'ytd' (não usado por enquanto)
 * @param {number} mesInicial - ID do mês inicial (1-27)
 * @param {number} mesFinal - ID do mês final (1-27)
 * @param {string} uf - UF específica ou 'todas'
 * @returns {object} Resumo com totais, distribuidores, categorias e UFs
 */
export const getMtrixSummary = (categoria = 'total', periodo = 'mes', mesInicial = 1, mesFinal = 27, uf = 'todas') => {
  // TEMPORÁRIO: Usar apenas dados de setembro/2025 até processar todos os meses
  // TODO: Processar todos os 27 meses e implementar filtro de intervalo real
  
  // Por enquanto, se o intervalo incluir setembro (mês 27), mostrar dados de setembro
  // Caso contrário, retornar dados vazios ou simulados
  const incluiSetembro = mesFinal >= 27 && mesInicial <= 27;
  
  if (!incluiSetembro) {
    // Retornar dados vazios se não incluir setembro
    return {
      totalVendas: 0,
      totalDistribuidores: 0,
      totalUFs: 0,
      totalCategorias: 0,
      totalClientes: 0,
      precoMedio: 0,
      topDistribuidores: [],
      todosDistribuidores: [],
      porCategoria: [],
      porUF: []
    };
  }
  
  // Filtrar distribuidores
  let distribuidoresFiltrados = [...distribuidoresData];
  
  // Filtrar por UF se necessário
  if (uf && uf !== 'todas') {
    distribuidoresFiltrados = distribuidoresFiltrados.filter(d => d.UF?.toUpperCase() === uf.toUpperCase());
  }
  
  // Ordenar por receita (maior primeiro)
  distribuidoresFiltrados.sort((a, b) => b.Sellout - a.Sellout);
  
  // Calcular totais
  const totalVendas = distribuidoresFiltrados.reduce((sum, d) => sum + d.Sellout, 0);
  const totalUnidades = distribuidoresFiltrados.reduce((sum, d) => sum + d.Unidades, 0);
  const totalClientes = distribuidoresFiltrados.reduce((sum, d) => sum + d.PDV, 0);
  const totalDistribuidores = distribuidoresFiltrados.length;
  
  // Preparar lista de distribuidores com percentuais
  const todosDistribuidores = distribuidoresFiltrados.map(d => {
    const nome = d.Distribuidor;
    return {
      nome: nome.replace(/\s+-\s+[A-Z\s]+\s+[A-Z]{2}$/, ''),
      receita: d.Sellout,
      percentual: (d.Sellout / totalVendas * 100),
      clientes: d.PDV,
      uf: d.UF || 'SP'
    };
  });
  
  // Top 10 distribuidores
  const topDistribuidores = todosDistribuidores.slice(0, 10);
  
  // Dados por categoria (simulado por enquanto - TODO: usar dados reais)
  const porCategoria = [
    { categoria: 'BARRA DE CEREAIS', receita: totalVendas * 0.60, percentual: 60, precoMedio: 1.56 },
    { categoria: 'BARRA PROTEICA', receita: totalVendas * 0.25, percentual: 25, precoMedio: 3.46 },
    { categoria: 'BARRA NUTS', receita: totalVendas * 0.10, percentual: 10, precoMedio: 2.80 },
    { categoria: 'BARRAS DE FRUTAS', receita: totalVendas * 0.05, percentual: 5, precoMedio: 1.80 }
  ];
  
  // Dados por UF (agregando distribuidores por UF)
  const ufMap = {};
  distribuidoresFiltrados.forEach(d => {
    if (!ufMap[d.UF]) {
      ufMap[d.UF] = { receita: 0, clientes: 0 };
    }
    ufMap[d.UF].receita += d.Sellout;
    ufMap[d.UF].clientes += d.PDV;
  });
  
  const porUF = Object.entries(ufMap)
    .map(([uf, data]) => ({
      uf,
      receita: data.receita,
      percentual: (data.receita / totalVendas * 100),
      clientes: data.clientes
    }))
    .sort((a, b) => b.receita - a.receita)
    .slice(0, 10);
  
  const totalUFs = Object.keys(ufMap).length;
  const precoMedio = totalVendas / totalUnidades;
  
  return {
    totalVendas,
    totalDistribuidores,
    totalUFs,
    totalCategorias: porCategoria.length,
    totalClientes,
    precoMedio,
    topDistribuidores,
    todosDistribuidores,  // Lista completa para calcular TOTAL
    porCategoria,
    porUF
  };
};
