// Dados Internos Nutrimental - DADOS REAIS
// Fonte: YTD2025_atualizada08_25_CRUA.xlsb (BASE ATUALIZADA)
// Processado em: 29/10/2025
// Período: YTD 2025 (primeiras 10k linhas processadas)

const nutrimentalInternaData = {
  // Receita por Canal
  receita_por_canal: {
    total: 10738556.02,
    canais: [
      { nome: 'Distribuidor', valor: 5040033.83, percentual: 46.9 },
      { nome: 'Atacado', valor: 3172481.27, percentual: 29.5 },
      { nome: 'AS', valor: 1056687.69, percentual: 9.8 },
      { nome: 'Doceiro', valor: 936404.37, percentual: 8.7 },
      { nome: 'KA', valor: 346646.78, percentual: 3.2 },
      { nome: 'C&C', valor: 95722.93, percentual: 0.9 },
      { nome: 'HSA', valor: 90579.15, percentual: 0.8 }
    ]
  },
  
  // Receita por Região
  receita_por_regiao: {
    total: 10738556.02,
    regioes: [
      { nome: 'Norte', valor: 7230159.12, percentual: 67.3 },
      { nome: 'SP Capital', valor: 3271090.74, percentual: 30.5 },
      { nome: 'Nordeste', valor: 126353.52, percentual: 1.2 },
      { nome: 'SP Interior', valor: 102213.16, percentual: 1.0 },
      { nome: 'RJ', valor: 8739.48, percentual: 0.1 }
    ]
  },
  
  // Volume por Canal (em KG)
  volume_por_canal: {
    total: 532019.784,
    canais: [
      { nome: 'Distribuidor', volume: 271498.128, percentual: 51.0 },
      { nome: 'Atacado', volume: 193664.544, percentual: 36.4 },
      { nome: 'AS', volume: 32017.824, percentual: 6.0 },
      { nome: 'Doceiro', volume: 22850.568, percentual: 4.3 },
      { nome: 'KA', volume: 6274.368, percentual: 1.2 },
      { nome: 'C&C', volume: 1837.152, percentual: 0.3 },
      { nome: 'HSA', volume: 3877.200, percentual: 0.7 }
    ]
  },
  
  // Volume por Região (em KG)
  volume_por_regiao: {
    total: 532019.784,
    regioes: [
      { nome: 'Norte', volume: 435905.808, percentual: 81.9 },
      { nome: 'SP Capital', volume: 84136.92, percentual: 15.8 },
      { nome: 'Nordeste', volume: 7992.0, percentual: 1.5 },
      { nome: 'SP Interior', volume: 3785.904, percentual: 0.7 },
      { nome: 'RJ', volume: 199.152, percentual: 0.0 }
    ]
  },
  
  // Clientes
  clientes: {
    total: 28,
    diretos: 0,
    indiretos: 28
  },
  
  // Top 10 Mais Vendidos (YTD 2025)
  top10_mais_vendidos: [
    { posicao: 1, produto: 'NUTRIBOM MULTICEREAIS 24X180G', categoria: 'Cereais', volume: 135691.2, receita: 2195645.66 },
    { posicao: 2, produto: 'NUTRIBOM ARROZ 24X180G', categoria: 'Cereais', volume: 96789.6, receita: 1570468.01 },
    { posicao: 3, produto: 'NUTRIBOM AVEIA E ARROZ 24X180G', categoria: 'Cereais', volume: 93350.88, receita: 1519009.44 },
    { posicao: 4, produto: 'NUTRIBOM BANANA E MAÇÃ 24X180G', categoria: 'Frutas', volume: 43446.24, receita: 718014.12 },
    { posicao: 5, produto: 'NUTRIBOM MILHO 24X180G', categoria: 'Cereais', volume: 40232.16, receita: 666531.47 },
    { posicao: 6, produto: 'BC NUTRY MORANGO CHOC 12X24X22G', categoria: 'Cereais', volume: 9865.152, receita: 399708.34 },
    { posicao: 7, produto: 'BC NUTRY AV BAN MEL 12X24X22G', categoria: 'Cereais', volume: 9237.888, receita: 360978.85 },
    { posicao: 8, produto: 'BC NUTRY BOLO CHOC 12X24X22G', categoria: 'Cereais', volume: 8857.728, receita: 357427.96 },
    { posicao: 9, produto: 'BC NUTRY FRUTAS VERM 12X24X22G', categoria: 'Frutas', volume: 7343.424, receita: 320719.71 },
    { posicao: 10, produto: 'BC NUTRY CAJU CHOC 12X24X22G', categoria: 'Nuts', volume: 5639.040, receita: 211390.59 }
  ],
  
  // Top 10 Menos Vendidos (YTD 2025)
  top10_menos_vendidos: [
    { posicao: 1, produto: 'BN NUTRY SEMENTES 6X12X30G', categoria: 'Nuts', volume: 4.32, receita: 251.20 },
    { posicao: 2, produto: 'BN NUTRY DAMASCO 6X12X30G', categoria: 'Frutas', volume: 8.64, receita: 502.40 },
    { posicao: 3, produto: 'BN NUTRY CRANBERRY 6X12X25G', categoria: 'Frutas', volume: 9.00, receita: 704.00 },
    { posicao: 4, produto: 'BN NUTRY SEMENTES 6X12X25G', categoria: 'Nuts', volume: 9.00, receita: 704.00 },
    { posicao: 5, produto: 'BN NUTRY DAMASCO 24X2X30G', categoria: 'Frutas', volume: 11.52, receita: 704.16 },
    { posicao: 6, produto: 'BF NUTRY AMEIXA CHOC 6X24X20G', categoria: 'Frutas', volume: 14.40, receita: 735.99 },
    { posicao: 7, produto: 'BN NUTRY MORANGO 6X12X30G', categoria: 'Frutas', volume: 12.96, receita: 753.60 },
    { posicao: 8, produto: 'NUTRY CASTANHA 12X24X22G', categoria: 'Nuts', volume: 19.008, receita: 933.14 },
    { posicao: 9, produto: 'BN NUTRY COCO 6X12X25G', categoria: 'Frutas', volume: 18.00, receita: 1408.00 },
    { posicao: 10, produto: 'NUTRY BANANA 12X24X22G', categoria: 'Frutas', volume: 31.68, receita: 1536.00 }
  ]
};

export const getNutrimentalInternaData = () => {
  return nutrimentalInternaData;
};

export default nutrimentalInternaData;
