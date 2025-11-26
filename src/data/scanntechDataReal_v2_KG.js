// Dados Scanntech - NORMALIZADO POR KG
// Fonte: Basereg-canal.xlsx
// Metodologia: 
//   - Share Valor = (Faturamento da Marca / Faturamento Total) × 100
//   - Share Volume KG = (Volume em KG da Marca / Volume Total em KG) × 100
//   - Preço por KG = Receita / Volume_KG
//   - Volume KG = GIRO × Gramatura / 1000
//   - Normalização elimina distorções de packs e gramaturas diferentes

// Dados Agosto 2024 (período anterior)
const marcas_ago24 = {
  sul: [
    { marca: 'RITTER', shareValor: 31.4, shareVolumeKG: 34.2, precoKG: 122.40 },
    { marca: 'NUTRY', shareValor: 15.8, shareVolumeKG: 15.0, precoKG: 140.92 },
    { marca: 'NUTRATA', shareValor: 10.8, shareVolumeKG: 7.3, precoKG: 196.21 },
    { marca: 'ENJOY', shareValor: 9.5, shareVolumeKG: 5.0, precoKG: 251.11 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolumeKG: 100.0, precoKG: 133.20 },
  ],
  brasil: [
    { marca: 'NUTRY', shareValor: 42.0, shareVolumeKG: 30.8, precoKG: 452.14 },
    { marca: 'BOLD', shareValor: 11.3, shareVolumeKG: 14.5, precoKG: 258.75 },
    { marca: 'ENJOY', shareValor: 10.5, shareVolumeKG: 4.5, precoKG: 772.33 },
    { marca: 'NUTRATA', shareValor: 8.0, shareVolumeKG: 13.1, precoKG: 201.84 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolumeKG: 100.0, precoKG: 331.18 },
  ],
  ne_no_co: [
    { marca: 'NUTRY', shareValor: 26.0, shareVolumeKG: 26.1, precoKG: 195.25 },
    { marca: 'ENJOY', shareValor: 12.6, shareVolumeKG: 4.1, precoKG: 610.92 },
    { marca: 'BOLD', shareValor: 11.0, shareVolumeKG: 8.1, precoKG: 265.80 },
    { marca: 'NUTRATA', shareValor: 8.8, shareVolumeKG: 8.9, precoKG: 193.60 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolumeKG: 100.0, precoKG: 196.21 },
  ],
}

// Dados Agosto 2025 (período atual)
const marcas_ago25 = {
  sul: [
    { marca: 'RITTER', shareValor: 28.7, shareVolumeKG: 30.9, precoKG: 130.85 },
    { marca: 'NUTRY', shareValor: 17.4, shareVolumeKG: 16.2, precoKG: 152.05 },
    { marca: 'NUTRATA', shareValor: 10.1, shareVolumeKG: 6.9, precoKG: 206.60 },
    { marca: 'INTEGRALMEDICA', shareValor: 7.6, shareVolumeKG: 5.3, precoKG: 202.77 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolumeKG: 100.0, precoKG: 141.20 },
  ],
  brasil: [
    { marca: 'NUTRY', shareValor: 27.4, shareVolumeKG: 27.6, precoKG: 267.44 },
    { marca: 'NUTRATA', shareValor: 11.9, shareVolumeKG: 17.4, precoKG: 184.42 },
    { marca: 'BOLD', shareValor: 11.3, shareVolumeKG: 12.4, precoKG: 244.34 },
    { marca: 'QUAKER', shareValor: 11.2, shareVolumeKG: 2.3, precoKG: 1304.19 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolumeKG: 100.0, precoKG: 269.14 },
  ],
  ne_no_co: [
    { marca: 'NUTRY', shareValor: 29.3, shareVolumeKG: 28.8, precoKG: 195.26 },
    { marca: 'NUTRATA', shareValor: 10.5, shareVolumeKG: 9.6, precoKG: 209.05 },
    { marca: 'ENJOY', shareValor: 10.1, shareVolumeKG: 6.2, precoKG: 311.18 },
    { marca: 'BOLD', shareValor: 8.4, shareVolumeKG: 6.0, precoKG: 268.36 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolumeKG: 100.0, precoKG: 191.45 },
  ],
}

// Função para combinar dados 2024 e 2025 com variações
export const getScanntechMarcasRegiaoComparativo = (categoria, periodo) => {
  const regioes = ['brasil', 'sul', 'ne_no_co'];
  const resultado = {};
  
  regioes.forEach(regiao => {
    const marcas2024 = marcas_ago24[regiao] || [];
    const marcas2025 = marcas_ago25[regiao] || [];
    
    const map2024 = {};
    marcas2024.forEach(m => {
      map2024[m.marca] = m;
    });
    
    resultado[regiao] = marcas2025.map(m2025 => {
      const m2024 = map2024[m2025.marca];
      
      return {
        marca: m2025.marca,
        shareValor: m2025.shareValor,
        shareValorAnterior: m2024 ? m2024.shareValor : m2025.shareValor,
        shareVolumeKG: m2025.shareVolumeKG,
        shareVolumeKGAnterior: m2024 ? m2024.shareVolumeKG : m2025.shareVolumeKG,
        precoKG: m2025.precoKG,
        precoKGAnterior: m2024 ? m2024.precoKG : m2025.precoKG
      };
    });
  });
  
  return resultado;
};

// Dados do mercado total por região e período
const mercado_total = {
  ago24: {
    sul: { valor: 2036.50, volume: 15.29, preco: 133.20 },
    brasil: { valor: 3258.87, volume: 9.84, preco: 331.18 },
    ne_no_co: { valor: 7066.41, volume: 36.01, preco: 196.21 },
  },
  ago25: {
    sul: { valor: 1893.15, volume: 13.41, preco: 141.20 },
    brasil: { valor: 2658.45, volume: 9.88, preco: 269.14 },
    ne_no_co: { valor: 6493.17, volume: 33.92, preco: 191.45 },
  }
};

// Função para obter dados do mercado total
export const getScanntechMercadoTotal = (categoria, periodo) => {
  // Por enquanto retornando dados de 'total' (Brasil)
  const periodoKey = periodo === 'mes_yoy' ? 'ago25' : 'ago25';
  const periodoAnterior = 'ago24';
  
  const atual = mercado_total[periodoKey]?.brasil || { valor: 0, volume: 0, preco: 0 };
  const anterior = mercado_total[periodoAnterior]?.brasil || { valor: 0, volume: 0, preco: 0 };
  
  return {
    valor: {
      atual: atual.valor,
      anterior: anterior.valor
    },
    volume: {
      atual: atual.volume,
      anterior: anterior.volume
    },
    preco: {
      atual: atual.preco,
      anterior: anterior.preco
    }
  };
};

// Manter função de share Nutrimental (dados por categoria)
export const getScanntechShareNutrimental = () => {
  return {
    categorias: [
      { categoria: 'Cereais', icon: '🌾', share: 50.5, trend: '+1.8%' },
      { categoria: 'Frutas', icon: '🍎', share: 45.2, trend: '+0.5%' },
      { categoria: 'Nuts', icon: '🥜', share: 9.5, trend: '-0.3%' },
      { categoria: 'Proteína', icon: '🥩', share: 6.6, trend: '-3.2%' }
    ]
  };
};
