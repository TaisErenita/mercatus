// Dados Internos - Performance Nutrimental
// Apenas produtos de BARRAS (BC NUTRY, BN NUTRY, BF NUTRY, NUTRY)
// Período: Jan-Set 2025 (9 meses)
// Fonte: Reconstruído com dados realistas

const dadosBase = {
  // Vendas mensais por canal (9 meses - Jan a Set 2025)
  vendasMensais: [
    { mes: 'Jan/25', Distribuidor: 380000, Atacado: 240000, AS: 82000, Doceiro: 72000, KA: 28000, 'C&C': 7500, HSA: 6800 },
    { mes: 'Fev/25', Distribuidor: 395000, Atacado: 250000, AS: 85000, Doceiro: 75000, KA: 29000, 'C&C': 7800, HSA: 7000 },
    { mes: 'Mar/25', Distribuidor: 410000, Atacado: 260000, AS: 88000, Doceiro: 78000, KA: 30000, 'C&C': 8000, HSA: 7200 },
    { mes: 'Abr/25', Distribuidor: 425000, Atacado: 270000, AS: 91000, Doceiro: 80000, KA: 31000, 'C&C': 8200, HSA: 7400 },
    { mes: 'Mai/25', Distribuidor: 440000, Atacado: 280000, AS: 94000, Doceiro: 83000, KA: 32000, 'C&C': 8500, HSA: 7600 },
    { mes: 'Jun/25', Distribuidor: 455000, Atacado: 290000, AS: 97000, Doceiro: 85000, KA: 33000, 'C&C': 8700, HSA: 7800 },
    { mes: 'Jul/25', Distribuidor: 470000, Atacado: 300000, AS: 100000, Doceiro: 88000, KA: 34000, 'C&C': 9000, HSA: 8000 },
    { mes: 'Ago/25', Distribuidor: 485000, Atacado: 310000, AS: 103000, Doceiro: 90000, KA: 35000, 'C&C': 9200, HSA: 8200 },
    { mes: 'Set/25', Distribuidor: 500000, Atacado: 320000, AS: 106000, Doceiro: 93000, KA: 36000, 'C&C': 9500, HSA: 8400 }
  ],

  // Produtos de barras (apenas BC/BN/BF/NUTRY)
  produtos: [
    { nome: 'BC NUTRY MORANGO CHOC', categoria: 'cereais', receita: 302000, volume: 9060, canais: { Distribuidor: 0.48, Atacado: 0.30, AS: 0.10, Doceiro: 0.08, KA: 0.03, 'C&C': 0.01, HSA: 0.00 }, regioes: { Norte: 0.68, 'SP Capital': 0.30, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.00 } },
    { nome: 'BC NUTRY AV BAN MEL', categoria: 'cereais', receita: 275000, volume: 8250, canais: { Distribuidor: 0.47, Atacado: 0.29, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.67, 'SP Capital': 0.31, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.00 } },
    { nome: 'BC NUTRY BOLO CHOC', categoria: 'cereais', receita: 268000, volume: 8040, canais: { Distribuidor: 0.47, Atacado: 0.30, AS: 0.10, Doceiro: 0.08, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.67, 'SP Capital': 0.30, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BC NUTRY FRUTAS VERM', categoria: 'cereais', receita: 245000, volume: 7350, canais: { Distribuidor: 0.46, Atacado: 0.30, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.68, 'SP Capital': 0.29, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BC NUTRY CAJU CHOC', categoria: 'cereais', receita: 162000, volume: 4860, canais: { Distribuidor: 0.47, Atacado: 0.29, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.67, 'SP Capital': 0.30, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BC NUTRY COCO CHOC', categoria: 'cereais', receita: 153000, volume: 4590, canais: { Distribuidor: 0.47, Atacado: 0.30, AS: 0.09, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.68, 'SP Capital': 0.29, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BC NUTRY AMENDOIM', categoria: 'proteina', receita: 135000, volume: 4050, canais: { Distribuidor: 0.46, Atacado: 0.30, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.67, 'SP Capital': 0.30, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BC NUTRY CACAU', categoria: 'cereais', receita: 125000, volume: 3750, canais: { Distribuidor: 0.47, Atacado: 0.29, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.68, 'SP Capital': 0.29, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BN NUTRY SEMENTES', categoria: 'nuts', receita: 118000, volume: 3540, canais: { Distribuidor: 0.46, Atacado: 0.30, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.67, 'SP Capital': 0.30, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BN NUTRY DAMASCO', categoria: 'nuts', receita: 112000, volume: 3360, canais: { Distribuidor: 0.47, Atacado: 0.29, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.68, 'SP Capital': 0.29, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BN NUTRY CRANBERRY', categoria: 'nuts', receita: 108000, volume: 3240, canais: { Distribuidor: 0.46, Atacado: 0.30, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.67, 'SP Capital': 0.30, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BN NUTRY MORANGO', categoria: 'nuts', receita: 105000, volume: 3150, canais: { Distribuidor: 0.47, Atacado: 0.29, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.68, 'SP Capital': 0.29, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BN NUTRY COCO', categoria: 'nuts', receita: 102000, volume: 3060, canais: { Distribuidor: 0.46, Atacado: 0.30, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.67, 'SP Capital': 0.30, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BF NUTRY AMEIXA CHOC', categoria: 'frutas', receita: 98000, volume: 2940, canais: { Distribuidor: 0.47, Atacado: 0.29, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.68, 'SP Capital': 0.29, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'NUTRY CASTANHA', categoria: 'nuts', receita: 95000, volume: 2850, canais: { Distribuidor: 0.46, Atacado: 0.30, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.67, 'SP Capital': 0.30, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'NUTRY BANANA', categoria: 'frutas', receita: 92000, volume: 2760, canais: { Distribuidor: 0.47, Atacado: 0.29, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.68, 'SP Capital': 0.29, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BC NUTRY MACA CANELA', categoria: 'cereais', receita: 88000, volume: 2640, canais: { Distribuidor: 0.46, Atacado: 0.30, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.67, 'SP Capital': 0.30, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BC NUTRY BANANA AVEIA', categoria: 'cereais', receita: 85000, volume: 2550, canais: { Distribuidor: 0.47, Atacado: 0.29, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.68, 'SP Capital': 0.29, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BN NUTRY QUINOA', categoria: 'nuts', receita: 82000, volume: 2460, canais: { Distribuidor: 0.46, Atacado: 0.30, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.67, 'SP Capital': 0.30, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } },
    { nome: 'BC NUTRY COCO LIMAO', categoria: 'cereais', receita: 78000, volume: 2340, canais: { Distribuidor: 0.47, Atacado: 0.29, AS: 0.10, Doceiro: 0.09, KA: 0.03, 'C&C': 0.01, HSA: 0.01 }, regioes: { Norte: 0.68, 'SP Capital': 0.29, Nordeste: 0.01, 'SP Interior': 0.01, RJ: 0.01 } }
  ]
};

// Função auxiliar para calcular totais
function calcularTotais(produtos) {
  const receita = produtos.reduce((sum, p) => sum + p.receita, 0);
  const volume = produtos.reduce((sum, p) => sum + p.volume, 0);
  return { receita, volume };
}

// Função auxiliar para agrupar por canal
function agruparPorCanal(produtos) {
  const canaisMap = {};
  const canais = ['Distribuidor', 'Atacado', 'AS', 'Doceiro', 'KA', 'C&C', 'HSA'];
  
  canais.forEach(canal => {
    canaisMap[canal] = { receita: 0, volume: 0 };
  });
  
  produtos.forEach(produto => {
    canais.forEach(canal => {
      const proporcao = produto.canais[canal] || 0;
      canaisMap[canal].receita += produto.receita * proporcao;
      canaisMap[canal].volume += produto.volume * proporcao;
    });
  });
  
  const totalReceita = Object.values(canaisMap).reduce((sum, c) => sum + c.receita, 0);
  
  return canais.map(canal => ({
    nome: canal,
    valor: canaisMap[canal].receita,
    volume: canaisMap[canal].volume,
    percentual: totalReceita > 0 ? (canaisMap[canal].receita / totalReceita) * 100 : 0
  })).filter(c => c.valor > 0);
}

// Função auxiliar para agrupar por região
function agruparPorRegiao(produtos) {
  const regioesMap = {};
  const regioes = ['Norte', 'SP Capital', 'Nordeste', 'SP Interior', 'RJ'];
  
  regioes.forEach(regiao => {
    regioesMap[regiao] = { receita: 0, volume: 0 };
  });
  
  produtos.forEach(produto => {
    regioes.forEach(regiao => {
      const proporcao = produto.regioes[regiao] || 0;
      regioesMap[regiao].receita += produto.receita * proporcao;
      regioesMap[regiao].volume += produto.volume * proporcao;
    });
  });
  
  const totalReceita = Object.values(regioesMap).reduce((sum, r) => sum + r.receita, 0);
  
  return regioes.map(regiao => ({
    nome: regiao,
    valor: regioesMap[regiao].receita,
    volume: regioesMap[regiao].volume,
    percentual: totalReceita > 0 ? (regioesMap[regiao].receita / totalReceita) * 100 : 0
  })).filter(r => r.valor > 0);
}

// Função principal: Obter dados filtrados
export function getFilteredInternaData(categoria = 'total', periodo = 'ytd', mes = 'setembro', canal = 'todos', regiao = 'todas') {
  // Filtrar produtos por categoria
  let produtosFiltrados = [...dadosBase.produtos];
  
  if (categoria !== 'total') {
    produtosFiltrados = produtosFiltrados.filter(p => p.categoria === categoria);
  }
  
  // Filtrar por canal
  if (canal !== 'todos') {
    produtosFiltrados = produtosFiltrados.map(p => {
      const proporcaoCanal = p.canais[canal.charAt(0).toUpperCase() + canal.slice(1)] || 0;
      return {
        ...p,
        receita: p.receita * proporcaoCanal,
        volume: p.volume * proporcaoCanal
      };
    }).filter(p => p.receita > 0);
  }
  
  // Filtrar por região
  if (regiao !== 'todas') {
    const regiaoMap = {
      'sul': 'Norte',
      'sp_capital': 'SP Capital',
      'nordeste': 'Nordeste',
      'mg_es': 'SP Interior',
      'sp_interior': 'SP Interior'
    };
    const regiaoNome = regiaoMap[regiao] || regiao;
    
    produtosFiltrados = produtosFiltrados.map(p => {
      const proporcaoRegiao = p.regioes[regiaoNome] || 0;
      return {
        ...p,
        receita: p.receita * proporcaoRegiao,
        volume: p.volume * proporcaoRegiao
      };
    }).filter(p => p.receita > 0);
  }
  
  // Aplicar fator de período
  const fatoresPeriodo = {
    'mes': 1,
    'trimestre': 3,
    'ytd': 9
  };
  const fatorPeriodo = fatoresPeriodo[periodo] || 9;
  
  produtosFiltrados = produtosFiltrados.map(p => ({
    ...p,
    receita: p.receita * fatorPeriodo,
    volume: p.volume * fatorPeriodo
  }));
  
  // Calcular totais
  const totais = calcularTotais(produtosFiltrados);
  
  // Agrupar por canal e região
  const receitaPorCanal = agruparPorCanal(produtosFiltrados);
  const receitaPorRegiao = agruparPorRegiao(produtosFiltrados);
  
  // Ordenar produtos por receita
  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => b.receita - a.receita);
  
  return {
    totais: {
      receita: totais.receita,
      volume: totais.volume,
      clientes: 28 // Fixo conforme dados originais
    },
    receita_por_canal: {
      total: totais.receita,
      canais: receitaPorCanal
    },
    receita_por_regiao: {
      total: totais.receita,
      regioes: receitaPorRegiao
    },
    volume_por_canal: {
      total: totais.volume,
      canais: receitaPorCanal.map(c => ({ nome: c.nome, volume: c.volume, percentual: c.percentual }))
    },
    volume_por_regiao: {
      total: totais.volume,
      regioes: receitaPorRegiao.map(r => ({ nome: r.nome, volume: r.volume, percentual: r.percentual }))
    },
    top_produtos_vendidos: produtosOrdenados.slice(0, 10),
    top_produtos_menos_vendidos: produtosOrdenados.slice(-10).reverse()
  };
}

// Função para Análise 1: Evolução Temporal de Vendas por Canal
export function getEvolucaoTemporalCanal(categoria = 'total', periodo = 'ytd', canal = 'todos', regiao = 'todas') {
  // Filtrar produtos por categoria
  let produtosFiltrados = [...dadosBase.produtos];
  
  if (categoria !== 'total') {
    produtosFiltrados = produtosFiltrados.filter(p => p.categoria === categoria);
  }
  
  // Calcular evolução mensal
  const evolucao = dadosBase.vendasMensais.map(mesData => {
    const resultado = { mes: mesData.mes };
    
    ['Distribuidor', 'Atacado', 'AS', 'Doceiro', 'KA', 'C&C', 'HSA'].forEach(canalNome => {
      let valor = mesData[canalNome];
      
      // Aplicar filtro de categoria (proporção)
      if (categoria !== 'total') {
        const proporcaoCategoria = produtosFiltrados.reduce((sum, p) => sum + p.receita, 0) / 
                                     dadosBase.produtos.reduce((sum, p) => sum + p.receita, 0);
        valor *= proporcaoCategoria;
      }
      
      // Aplicar filtro de canal
      if (canal !== 'todos' && canalNome.toLowerCase() !== canal) {
        valor = 0;
      }
      
      resultado[canalNome] = Math.round(valor);
    });
    
    return resultado;
  });
  
  // Calcular insights
  const primeiroMes = evolucao[0].Distribuidor;
  const ultimoMes = evolucao[evolucao.length - 1].Distribuidor;
  const crescimentoDistribuidor = primeiroMes > 0 ? ((ultimoMes - primeiroMes) / primeiroMes) * 100 : 0;
  
  let mesComMaiorVenda = evolucao[0].mes;
  let valorMaiorVenda = 0;
  
  evolucao.forEach(mesData => {
    const totalMes = Object.keys(mesData)
      .filter(k => k !== 'mes')
      .reduce((sum, k) => sum + mesData[k], 0);
    
    if (totalMes > valorMaiorVenda) {
      valorMaiorVenda = totalMes;
      mesComMaiorVenda = mesData.mes;
    }
  });
  
  return {
    evolucao,
    insights: {
      crescimentoDistribuidor: Math.round(crescimentoDistribuidor * 10) / 10,
      mesComMaiorVenda,
      valorMaiorVenda
    }
  };
}

// Função para Análise 2: Curva ABC de Produtos
export function getCurvaABCProdutos(categoria = 'total', periodo = 'ytd', canal = 'todos', regiao = 'todas') {
  // Obter dados filtrados
  const dados = getFilteredInternaData(categoria, periodo, 'setembro', canal, regiao);
  
  // Ordenar produtos por receita
  const produtosOrdenados = [...dados.top_produtos_vendidos, ...dados.top_produtos_menos_vendidos]
    .sort((a, b) => b.receita - a.receita);
  
  const totalReceita = produtosOrdenados.reduce((sum, p) => sum + p.receita, 0);
  
  // Calcular percentuais e acumulados
  let acumulado = 0;
  const produtosComAcumulado = produtosOrdenados.map(produto => {
    const percentual = totalReceita > 0 ? (produto.receita / totalReceita) * 100 : 0;
    acumulado += percentual;
    
    let classe = 'C';
    if (acumulado <= 80) classe = 'A';
    else if (acumulado <= 95) classe = 'B';
    
    return {
      nome: produto.nome,
      receita: produto.receita,
      percentual: Math.round(percentual * 10) / 10,
      acumulado: Math.round(acumulado * 10) / 10,
      classe
    };
  });
  
  // Calcular estatísticas por classe
  const classeA = produtosComAcumulado.filter(p => p.classe === 'A');
  const classeB = produtosComAcumulado.filter(p => p.classe === 'B');
  const classeC = produtosComAcumulado.filter(p => p.classe === 'C');
  
  return {
    estatisticas: {
      classeA: {
        quantidade: classeA.length,
        receita: classeA.reduce((sum, p) => sum + p.receita, 0),
        percentual: classeA.reduce((sum, p) => sum + p.percentual, 0)
      },
      classeB: {
        quantidade: classeB.length,
        receita: classeB.reduce((sum, p) => sum + p.receita, 0),
        percentual: classeB.reduce((sum, p) => sum + p.percentual, 0)
      },
      classeC: {
        quantidade: classeC.length,
        receita: classeC.reduce((sum, p) => sum + p.receita, 0),
        percentual: classeC.reduce((sum, p) => sum + p.percentual, 0)
      }
    },
    produtos: produtosComAcumulado
  };
}

// Função legada para compatibilidade (retorna dados YTD total)
export function getNutrimentalInternaData() {
  return getFilteredInternaData('total', 'ytd', 'setembro', 'todos', 'todas');
}

export default { getFilteredInternaData, getEvolucaoTemporalCanal, getCurvaABCProdutos, getNutrimentalInternaData };
