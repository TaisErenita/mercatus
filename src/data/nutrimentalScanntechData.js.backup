// Dados Scanntech da NUTRY - Métricas de Performance NORMALIZADAS POR KG
// Fonte: Basereg-canal.xlsx
// Metodologia: Volume normalizado por gramatura para eliminar distorções de packs e tamanhos
//   - Volume KG = GIRO × Gramatura / 1000
//   - Receita = GIRO × Preço
//   - Preço por KG = Receita / Volume KG
//   - Share Valor = % do faturamento total
//   - Share Volume KG = % do volume total em KG

const nutrimentalData = {
  // Dados gerais (todas as categorias) - Agosto 2025
  total: {
    mes_yoy_ago25: {
      share_valor: 26.8,
      share_volume_kg: 25.6,  // Normalizado por KG
      receita: 2964.89,
      volume_kg: 14.66,  // Volume em KG
      preco_kg: 202.30   // Preço por KG
    },
    mes_yoy_ago24: {
      share_valor: 28.6,
      share_volume_kg: 29.9,  // Estimado (não recalculado)
      receita: 3530.53,
      volume_kg: 17.45,  // Estimado
      preco_kg: 202.30   // Mantido igual
    }
  },
  
  // Dados por categoria (Agosto 2025) - NORMALIZADOS
  categorias: {
    cereais: {
      share_valor: 50.5,
      share_volume_kg: 41.2,  // Normalizado por KG
      receita: 2310.13,
      volume_kg: 11.25,  // Volume em KG
      preco_kg: 205.35   // Preço por KG
    },
    frutas: {
      share_valor: 45.2,
      share_volume_kg: 36.2,  // Normalizado por KG
      receita: 227.17,
      volume_kg: 1.11,  // Volume em KG
      preco_kg: 205.22  // Preço por KG
    },
    nuts: {
      share_valor: 9.5,
      share_volume_kg: 16.2,  // Normalizado por KG
      receita: 108.06,
      volume_kg: 0.86,  // Volume em KG
      preco_kg: 126.02  // Preço por KG (mais barato)
    },
    proteina: {
      share_valor: 6.6,
      share_volume_kg: 6.7,  // Normalizado por KG
      receita: 319.53,
      volume_kg: 1.44,  // Volume em KG
      preco_kg: 221.58  // Preço por KG (mais caro)
    }
  }
};

export const getNutrimentalScanntechData = (categoria, periodo) => {
  // Retornar dados gerais (total)
  if (periodo === 'mes_yoy') {
    return {
      atual: nutrimentalData.total.mes_yoy_ago25,
      anterior: nutrimentalData.total.mes_yoy_ago24
    };
  }
  
  // YTD ou outros períodos retornam dados atuais
  return {
    atual: nutrimentalData.total.mes_yoy_ago25,
    anterior: nutrimentalData.total.mes_yoy_ago24
  };
};

export const getNutrimentalCategorias = () => {
  return [
    {
      nome: 'Cereais',
      icon: '🌾',
      ...nutrimentalData.categorias.cereais
    },
    {
      nome: 'Frutas',
      icon: '🍎',
      ...nutrimentalData.categorias.frutas
    },
    {
      nome: 'Nuts',
      icon: '🥜',
      ...nutrimentalData.categorias.nuts
    },
    {
      nome: 'Proteína',
      icon: '🥩',
      ...nutrimentalData.categorias.proteina
    }
  ];
};

export default nutrimentalData;
