// Dados Internos da Nutrimental - YTD 2025 (Apenas BARRAS)
// Fonte: Sistema Comercial Interno
// Última atualização: Novembro 2025
// IMPORTANTE: Contém apenas produtos de BARRAS (BC, BN, BF, BP)

export const nutrimentalInternaData = {
  // Totais gerais
  totais: {
    volume: 2921408.05, // kg
    receita: 142509965.58 // R$
  },
  
  // Distribuição por Canal
  canais: [
    {
      canal: "C&C",
      volume: 1061105.81,
      receita: 53951771.79,
      percentual: 37.9,
      percentualReceita: 37.9
    },
    {
      canal: "DISTRIBUIDOR",
      volume: 1195205.72,
      receita: 53014498.44,
      percentual: 37.2,
      percentualReceita: 37.2
    },
    {
      canal: "DOCEIRO",
      volume: 235597.90,
      receita: 9239020.54,
      percentual: 6.5,
      percentualReceita: 6.5
    },
    {
      canal: "KA",
      volume: 115726.13,
      receita: 8099593.51,
      percentual: 5.7,
      percentualReceita: 5.7
    },
    {
      canal: "ATACADO",
      volume: 112741.37,
      receita: 4987956.21,
      percentual: 3.5,
      percentualReceita: 3.5
    },
    {
      canal: "HSA",
      volume: 67838.14,
      receita: 4359562.11,
      percentual: 3.1,
      percentualReceita: 3.1
    },
    {
      canal: "FARMA",
      volume: 39725.88,
      receita: 3204915.05,
      percentual: 2.2,
      percentualReceita: 2.2
    },
    {
      canal: "AS",
      volume: 43397.18,
      receita: 2800689.39,
      percentual: 2.0,
      percentualReceita: 2.0
    },
    {
      canal: "DIGITAL",
      volume: 31472.45,
      receita: 1922646.68,
      percentual: 1.3,
      percentualReceita: 1.3
    },
    {
      canal: "DISTR FARMA",
      volume: 15340.75,
      receita: 726592.30,
      percentual: 0.5,
      percentualReceita: 0.5
    },
    {
      canal: "LOJA DE DEPARTAMENTO",
      volume: 1597.39,
      receita: 97263.12,
      percentual: 0.1,
      percentualReceita: 0.1
    },
    {
      canal: "PEQUENO VAREJO",
      volume: 1157.47,
      receita: 69633.54,
      percentual: 0.0,
      percentualReceita: 0.0
    },
    {
      canal: "MARKETPLACE",
      volume: 489.82,
      receita: 34974.79,
      percentual: 0.0,
      percentualReceita: 0.0
    },
    {
      canal: "0x2a",
      volume: 12.05,
      receita: 848.11,
      percentual: 0.0,
      percentualReceita: 0.0
    },
  ],
  
  // Distribuição por Região
  regioes: [
    {
      regiao: "SUL",
      volume: 613288.13,
      receita: 30078554.66,
      percentual: 21.1,
      percentualReceita: 21.1
    },
    {
      regiao: "SP CAPITAL",
      volume: 542640.88,
      receita: 26309379.58,
      percentual: 18.5,
      percentualReceita: 18.5
    },
    {
      regiao: "NORDESTE",
      volume: 367226.71,
      receita: 19848170.78,
      percentual: 13.9,
      percentualReceita: 13.9
    },
    {
      regiao: "MG (MG / ES)",
      volume: 362004.24,
      receita: 17671612.02,
      percentual: 12.4,
      percentualReceita: 12.4
    },
    {
      regiao: "SP INTERIOR",
      volume: 368041.68,
      receita: 16201021.07,
      percentual: 11.4,
      percentualReceita: 11.4
    },
    {
      regiao: "RJ",
      volume: 323059.22,
      receita: 14386274.46,
      percentual: 10.1,
      percentualReceita: 10.1
    },
    {
      regiao: "CENTRO-OESTE",
      volume: 176640.94,
      receita: 9099249.85,
      percentual: 6.4,
      percentualReceita: 6.4
    },
    {
      regiao: "NORTE",
      volume: 129642.36,
      receita: 6952961.33,
      percentual: 4.9,
      percentualReceita: 4.9
    },
    {
      regiao: "CENTRO OESTE",
      volume: 38852.81,
      receita: 1962122.73,
      percentual: 1.4,
      percentualReceita: 1.4
    },
    {
      regiao: "E-COMMERCE",
      volume: 11.09,
      receita: 619.10,
      percentual: 0.0,
      percentualReceita: 0.0
    },
  ],
  
  // Top 10 SKUs mais vendidos (por volume)
  top10Skus: [
    {
      sku: "BC NUTRY MORANGO CHOC12X24X22G",
      produto: "BC REG 12x24x22G DSP",
      volume: 407675.14,
      receita: 16851101.29
    },
    {
      sku: "BC NUTRY BOLO CHOC 12X24X22G",
      produto: "BC REG 12x24x22G DSP",
      volume: 379127.23,
      receita: 15714659.99
    },
    {
      sku: "BC NUTRY AV BAN MEL 12X24X22G",
      produto: "BC REG 12x24x22G DSP",
      volume: 363501.60,
      receita: 14931713.68
    },
    {
      sku: "BC NUTRY AVELA CHOC 12X24X22G",
      produto: "BC REG 12x24x22G DSP",
      volume: 295112.93,
      receita: 12295159.89
    },
    {
      sku: "BC NUTRY FRUTAS VERM 12X24X22G",
      produto: "BC REG 12x24x22G DSP",
      volume: 182192.21,
      receita: 7331899.36
    },
    {
      sku: "BC NUTRY CAJU CHOC 12X24X22G",
      produto: "BC REG 12x24x22G DSP",
      volume: 106483.87,
      receita: 4158171.42
    },
    {
      sku: "BC NUTRY MORANGO CHOC 24X3X22G",
      produto: "BC REG 24X3x22G CXT",
      volume: 96776.06,
      receita: 4205687.59
    },
    {
      sku: "BC NUTRY AVEIA BAN MEL24X3X22G",
      produto: "BC REG 24X3x22G CXT",
      volume: 90619.06,
      receita: 3994537.06
    },
    {
      sku: "BC NUTRY BOLO CHOC 24X3X22G",
      produto: "BC REG 24X3x22G CXT",
      volume: 82722.82,
      receita: 3558045.76
    },
    {
      sku: "BC NUTRY COCO CHOC 12X24X22G",
      produto: "BC REG 12x24x22G DSP",
      volume: 80955.60,
      receita: 3147513.76
    },
  ],
  
  // Metadata
  metadata: {
    periodo: "YTD 2025",
    dataAtualizacao: "2025-11-29",
    fonte: "Sistema Comercial Interno",
    observacao: "Dados filtrados apenas para produtos de BARRAS (BC, BN, BF, BP). Produtos NUTRIBOM (biscoitos) foram removidos."
  }
};

// Função helper para obter dados internos
export function getNutrimentalInternaData() {
  return nutrimentalInternaData;
}
