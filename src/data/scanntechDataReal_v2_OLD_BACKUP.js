// Dados Scanntech Reais - Agosto 2024 vs Agosto 2025
// Fonte: Basereg-canal.xlsx
// Metodologia: 
//   - Share Valor = (Faturamento da Marca / Faturamento Total) × 100
//   - Share Volume = (Volume de Unidades da Marca / Volume Total) × 100
//   - Cálculo baseado em GIRO (volume de vendas) e Preço

// Dados Agosto 2024 (período anterior)
const marcas_ago24 = {
  sul: [
    { marca: 'RITTER', shareValor: 31.4, shareVolume: 39.2, preco: 3.92 },
    { marca: 'NUTRY', shareValor: 15.8, shareVolume: 17.5, preco: 6.12 },
    { marca: 'NUTRATA', shareValor: 10.8, shareVolume: 4.0, preco: 10.19 },
    { marca: 'ENJOY', shareValor: 9.5, shareVolume: 4.4, preco: 19.82 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 3.49 },
  ],
  ne_no_co: [
    { marca: 'NUTRY', shareValor: 26.0, shareVolume: 33.4, preco: 14.55 },
    { marca: 'ENJOY', shareValor: 12.6, shareVolume: 3.9, preco: 28.14 },
    { marca: 'BOLD', shareValor: 11.0, shareVolume: 4.4, preco: 11.05 },
    { marca: 'NUTRATA', shareValor: 8.8, shareVolume: 5.1, preco: 10.16 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 5.58 },
  ],
  brasil: [
    { marca: 'NUTRY', shareValor: 28.6, shareVolume: 29.9, preco: 15.07 },
    { marca: 'ENJOY', shareValor: 11.5, shareVolume: 4.1, preco: 25.86 },
    { marca: 'BOLD', shareValor: 9.8, shareVolume: 4.0, preco: 11.39 },
    { marca: 'NUTRATA', shareValor: 8.9, shareVolume: 5.1, preco: 10.32 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 5.64 },
  ]
};

// Dados Agosto 2025 (período atual)
const marcas_ago25 = {
  sul: [
    { marca: 'RITTER', shareValor: 28.7, shareVolume: 36.0, preco: 3.96 },
    { marca: 'NUTRY', shareValor: 17.4, shareVolume: 19.2, preco: 6.75 },
    { marca: 'NUTRATA', shareValor: 10.1, shareVolume: 3.9, preco: 10.99 },
    { marca: 'INTEGRALMEDICA', shareValor: 7.6, shareVolume: 3.2, preco: 9.25 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 3.76 },
  ],
  ne_no_co: [
    { marca: 'NUTRY', shareValor: 29.3, shareVolume: 36.3, preco: 16.24 },
    { marca: 'NUTRATA', shareValor: 10.5, shareVolume: 5.1, preco: 11.40 },
    { marca: 'ENJOY', shareValor: 10.1, shareVolume: 6.0, preco: 10.37 },
    { marca: 'BOLD', shareValor: 8.4, shareVolume: 3.3, preco: 12.01 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 5.49 },
  ],
  brasil: [
    { marca: 'NUTRY', shareValor: 26.8, shareVolume: 32.0, preco: 16.89 },
    { marca: 'NUTRATA', shareValor: 10.8, shareVolume: 5.6, preco: 11.29 },
    { marca: 'ENJOY', shareValor: 9.3, shareVolume: 5.9, preco: 10.82 },
    { marca: 'BOLD', shareValor: 8.2, shareVolume: 3.3, preco: 12.48 },
    { marca: 'Mercado Total', shareValor: 100.0, shareVolume: 100.0, preco: 5.47 },
  ]
};

// Função para combinar dados 2024 e 2025 com variações
export const getScanntechMarcasRegiaoComparativo = (categoria, periodo) => {
  // Por enquanto, retornando dados de 'total' (todas categorias)
  // Poderia ser expandido para filtrar por categoria específica
  
  const regioes = ['brasil', 'sul', 'ne_no_co'];
  const resultado = {};
  
  regioes.forEach(regiao => {
    const marcas2024 = marcas_ago24[regiao] || [];
    const marcas2025 = marcas_ago25[regiao] || [];
    
    // Criar mapa de marcas 2024 para fácil lookup
    const map2024 = {};
    marcas2024.forEach(m => {
      map2024[m.marca] = m;
    });
    
    // Combinar dados
    resultado[regiao] = marcas2025.map(m2025 => {
      const m2024 = map2024[m2025.marca];
      
      return {
        marca: m2025.marca,
        shareValor: m2025.shareValor,
        shareValorAnterior: m2024 ? m2024.shareValor : m2025.shareValor,
        shareVolume: m2025.shareVolume,
        shareVolumeAnterior: m2024 ? m2024.shareVolume : m2025.shareVolume,
        preco: m2025.preco,
        precoAnterior: m2024 ? m2024.preco : m2025.preco
      };
    });
  });
  
  return resultado;
};

// Manter compatibilidade com função antiga (sem comparativo)
export const getScanntechMarcasRegiao = (categoria, periodo) => {
  const regioes = ['brasil', 'sul', 'ne_no_co'];
  const resultado = {};
  
  regioes.forEach(regiao => {
    resultado[regiao] = (marcas_ago25[regiao] || []).map(m => ({
      marca: m.marca,
      shareValor: m.shareValor,
      shareVolume: m.shareVolume,
      preco: m.preco
    }));
  });
  
  return resultado;
};

// Exportar outras funções existentes (placeholder - manter compatibilidade)
export const getScanntechMercadoTotal = (categoria, periodo) => {
  return {
    valor: { atual: 238500000, anterior: 201200000 },
    volume: { atual: 703608, anterior: 594000 },
    preco: { atual: 338.92, anterior: 338.50 }
  };
};

export const getScanntechShareNutrimental = () => {
  return {
    categorias: [
      { categoria: 'Cereais', share: 37.8, trend: '+1.8%', icon: '🌾' },
      { categoria: 'Frutas', share: 33.2, trend: '+0.5%', icon: '🍎' },
      { categoria: 'Nuts', share: 28.9, trend: '-0.3%', icon: '🥜' },
      { categoria: 'Proteína', share: 8.8, trend: '-3.2%', icon: '🥩' }
    ]
  };
};
