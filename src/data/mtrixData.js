// Dados MTRIX - Distribuidores e Performance
// Estrutura: mtrixData[categoria][periodo][regiao]

export const mtrixData = {
  // ========== TOTAL ==========
  total: {
    mes_yoy: {
      brasil: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 1250000, volume: 105000, precoMedio: 11.90, uf: 'Nacional' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 980000, volume: 83500, precoMedio: 11.73, uf: 'Nacional' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 875000, volume: 74200, precoMedio: 11.79, uf: 'Nacional' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 720000, volume: 61800, precoMedio: 11.65, uf: 'Nacional' },
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 580000, volume: 49300, precoMedio: 11.76, uf: 'Sul' }
      ],
      sp_rj_mg_es: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 520000, volume: 43200, precoMedio: 12.04, uf: 'SP' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 410000, volume: 34800, precoMedio: 11.78, uf: 'SP' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 365000, volume: 30900, precoMedio: 11.81, uf: 'RJ' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 298000, volume: 25600, precoMedio: 11.64, uf: 'MG' },
        { distribuidor: 'ROLDÃO ATACADISTA', faturamento: 245000, volume: 20800, precoMedio: 11.78, uf: 'SP' }
      ],
      sul: [
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 580000, volume: 49300, precoMedio: 11.76, uf: 'RS' },
        { distribuidor: 'FORT ATACADISTA', faturamento: 420000, volume: 35900, precoMedio: 11.70, uf: 'PR' },
        { distribuidor: 'CONDOR SUPER CENTER', faturamento: 385000, volume: 32800, precoMedio: 11.74, uf: 'PR' },
        { distribuidor: 'ANGELONI', faturamento: 310000, volume: 26400, precoMedio: 11.74, uf: 'SC' },
        { distribuidor: 'IMEC SUPERMERCADOS', faturamento: 265000, volume: 22600, precoMedio: 11.73, uf: 'RS' }
      ],
      ne_no_co: [
        { distribuidor: 'ATACADÃO', faturamento: 450000, volume: 38700, precoMedio: 11.63, uf: 'BA' },
        { distribuidor: 'HIPER BOMPREÇO', faturamento: 380000, volume: 32800, precoMedio: 11.59, uf: 'PE' },
        { distribuidor: 'MAXXI ATACADO', faturamento: 325000, volume: 28100, precoMedio: 11.57, uf: 'CE' },
        { distribuidor: 'SUPER MUFFATO', faturamento: 280000, volume: 24200, precoMedio: 11.57, uf: 'GO' },
        { distribuidor: 'ASA BRANCA', faturamento: 235000, volume: 20400, precoMedio: 11.52, uf: 'AL' }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 3720000, volume: 313500, precoMedio: 11.87, uf: 'Nacional' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 2910000, volume: 248700, precoMedio: 11.70, uf: 'Nacional' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 2600000, volume: 221000, precoMedio: 11.76, uf: 'Nacional' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 2140000, volume: 184200, precoMedio: 11.62, uf: 'Nacional' },
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 1720000, volume: 146700, precoMedio: 11.73, uf: 'Sul' }
      ],
      sp_rj_mg_es: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 1545000, volume: 128400, precoMedio: 12.03, uf: 'SP' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 1217000, volume: 103600, precoMedio: 11.75, uf: 'SP' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 1084000, volume: 91900, precoMedio: 11.80, uf: 'RJ' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 885000, volume: 76200, precoMedio: 11.61, uf: 'MG' },
        { distribuidor: 'ROLDÃO ATACADISTA', faturamento: 728000, volume: 61900, precoMedio: 11.76, uf: 'SP' }
      ],
      sul: [
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 1720000, volume: 146700, precoMedio: 11.73, uf: 'RS' },
        { distribuidor: 'FORT ATACADISTA', faturamento: 1247000, volume: 106800, precoMedio: 11.68, uf: 'PR' },
        { distribuidor: 'CONDOR SUPER CENTER', faturamento: 1143000, volume: 97600, precoMedio: 11.71, uf: 'PR' },
        { distribuidor: 'ANGELONI', faturamento: 920000, volume: 78500, precoMedio: 11.72, uf: 'SC' },
        { distribuidor: 'IMEC SUPERMERCADOS', faturamento: 787000, volume: 67200, precoMedio: 11.71, uf: 'RS' }
      ],
      ne_no_co: [
        { distribuidor: 'ATACADÃO', faturamento: 1335000, volume: 115200, precoMedio: 11.59, uf: 'BA' },
        { distribuidor: 'HIPER BOMPREÇO', faturamento: 1128000, volume: 97600, precoMedio: 11.56, uf: 'PE' },
        { distribuidor: 'MAXXI ATACADO', faturamento: 965000, volume: 83600, precoMedio: 11.54, uf: 'CE' },
        { distribuidor: 'SUPER MUFFATO', faturamento: 831000, volume: 72000, precoMedio: 11.54, uf: 'GO' },
        { distribuidor: 'ASA BRANCA', faturamento: 698000, volume: 60700, precoMedio: 11.50, uf: 'AL' }
      ]
    },
    ytd_yoy: {
      brasil: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 9850000, volume: 830000, precoMedio: 11.87, uf: 'Nacional' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 7710000, volume: 659000, precoMedio: 11.70, uf: 'Nacional' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 6890000, volume: 585500, precoMedio: 11.77, uf: 'Nacional' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 5670000, volume: 488000, precoMedio: 11.62, uf: 'Nacional' },
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 4560000, volume: 388800, precoMedio: 11.73, uf: 'Sul' }
      ],
      sp_rj_mg_es: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 4095000, volume: 340200, precoMedio: 12.04, uf: 'SP' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 3225000, volume: 274600, precoMedio: 11.74, uf: 'SP' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 2873000, volume: 243600, precoMedio: 11.79, uf: 'RJ' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 2345000, volume: 201900, precoMedio: 11.61, uf: 'MG' },
        { distribuidor: 'ROLDÃO ATACADISTA', faturamento: 1930000, volume: 164000, precoMedio: 11.77, uf: 'SP' }
      ],
      sul: [
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 4560000, volume: 388800, precoMedio: 11.73, uf: 'RS' },
        { distribuidor: 'FORT ATACADISTA', faturamento: 3305000, volume: 283000, precoMedio: 11.68, uf: 'PR' },
        { distribuidor: 'CONDOR SUPER CENTER', faturamento: 3030000, volume: 258600, precoMedio: 11.72, uf: 'PR' },
        { distribuidor: 'ANGELONI', faturamento: 2440000, volume: 208100, precoMedio: 11.72, uf: 'SC' },
        { distribuidor: 'IMEC SUPERMERCADOS', faturamento: 2085000, volume: 178000, precoMedio: 11.72, uf: 'RS' }
      ],
      ne_no_co: [
        { distribuidor: 'ATACADÃO', faturamento: 3540000, volume: 305500, precoMedio: 11.59, uf: 'BA' },
        { distribuidor: 'HIPER BOMPREÇO', faturamento: 2990000, volume: 258700, precoMedio: 11.56, uf: 'PE' },
        { distribuidor: 'MAXXI ATACADO', faturamento: 2560000, volume: 221700, precoMedio: 11.55, uf: 'CE' },
        { distribuidor: 'SUPER MUFFATO', faturamento: 2200000, volume: 190600, precoMedio: 11.54, uf: 'GO' },
        { distribuidor: 'ASA BRANCA', faturamento: 1850000, volume: 160900, precoMedio: 11.50, uf: 'AL' }
      ]
    }
  },

  // ========== CEREAIS ==========
  cereais: {
    mes_yoy: {
      brasil: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 420000, volume: 42600, precoMedio: 9.86, uf: 'Nacional' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 335000, volume: 34100, precoMedio: 9.82, uf: 'Nacional' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 298000, volume: 30400, precoMedio: 9.80, uf: 'Nacional' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 245000, volume: 25100, precoMedio: 9.76, uf: 'Nacional' },
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 198000, volume: 20200, precoMedio: 9.80, uf: 'Sul' }
      ],
      sp_rj_mg_es: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 175000, volume: 17600, precoMedio: 9.94, uf: 'SP' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 140000, volume: 14200, precoMedio: 9.86, uf: 'SP' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 124000, volume: 12600, precoMedio: 9.84, uf: 'RJ' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 102000, volume: 10400, precoMedio: 9.81, uf: 'MG' },
        { distribuidor: 'ROLDÃO ATACADISTA', faturamento: 83000, volume: 8500, precoMedio: 9.76, uf: 'SP' }
      ],
      sul: [
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 198000, volume: 20200, precoMedio: 9.80, uf: 'RS' },
        { distribuidor: 'FORT ATACADISTA', faturamento: 143000, volume: 14600, precoMedio: 9.79, uf: 'PR' },
        { distribuidor: 'CONDOR SUPER CENTER', faturamento: 131000, volume: 13400, precoMedio: 9.78, uf: 'PR' },
        { distribuidor: 'ANGELONI', faturamento: 106000, volume: 10800, precoMedio: 9.81, uf: 'SC' },
        { distribuidor: 'IMEC SUPERMERCADOS', faturamento: 90000, volume: 9200, precoMedio: 9.78, uf: 'RS' }
      ],
      ne_no_co: [
        { distribuidor: 'ATACADÃO', faturamento: 153000, volume: 15700, precoMedio: 9.75, uf: 'BA' },
        { distribuidor: 'HIPER BOMPREÇO', faturamento: 130000, volume: 13400, precoMedio: 9.70, uf: 'PE' },
        { distribuidor: 'MAXXI ATACADO', faturamento: 111000, volume: 11400, precoMedio: 9.74, uf: 'CE' },
        { distribuidor: 'SUPER MUFFATO', faturamento: 95000, volume: 9800, precoMedio: 9.69, uf: 'GO' },
        { distribuidor: 'ASA BRANCA', faturamento: 80000, volume: 8300, precoMedio: 9.64, uf: 'AL' }
      ]
    },
    trimestre_yoy: {
      brasil: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 1250000, volume: 127000, precoMedio: 9.84, uf: 'Nacional' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 997000, volume: 101600, precoMedio: 9.81, uf: 'Nacional' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 887000, volume: 90500, precoMedio: 9.80, uf: 'Nacional' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 729000, volume: 74700, precoMedio: 9.76, uf: 'Nacional' },
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 589000, volume: 60100, precoMedio: 9.80, uf: 'Sul' }
      ],
      sp_rj_mg_es: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 521000, volume: 52400, precoMedio: 9.94, uf: 'SP' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 416000, volume: 42200, precoMedio: 9.86, uf: 'SP' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 370000, volume: 37600, precoMedio: 9.84, uf: 'RJ' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 304000, volume: 31000, precoMedio: 9.81, uf: 'MG' },
        { distribuidor: 'ROLDÃO ATACADISTA', faturamento: 247000, volume: 25300, precoMedio: 9.76, uf: 'SP' }
      ],
      sul: [
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 589000, volume: 60100, precoMedio: 9.80, uf: 'RS' },
        { distribuidor: 'FORT ATACADISTA', faturamento: 425000, volume: 43400, precoMedio: 9.79, uf: 'PR' },
        { distribuidor: 'CONDOR SUPER CENTER', faturamento: 390000, volume: 39900, precoMedio: 9.77, uf: 'PR' },
        { distribuidor: 'ANGELONI', faturamento: 315000, volume: 32100, precoMedio: 9.81, uf: 'SC' },
        { distribuidor: 'IMEC SUPERMERCADOS', faturamento: 268000, volume: 27400, precoMedio: 9.78, uf: 'RS' }
      ],
      ne_no_co: [
        { distribuidor: 'ATACADÃO', faturamento: 455000, volume: 46700, precoMedio: 9.74, uf: 'BA' },
        { distribuidor: 'HIPER BOMPREÇO', faturamento: 386000, volume: 39800, precoMedio: 9.70, uf: 'PE' },
        { distribuidor: 'MAXXI ATACADO', faturamento: 330000, volume: 33900, precoMedio: 9.73, uf: 'CE' },
        { distribuidor: 'SUPER MUFFATO', faturamento: 283000, volume: 29200, precoMedio: 9.69, uf: 'GO' },
        { distribuidor: 'ASA BRANCA', faturamento: 238000, volume: 24700, precoMedio: 9.64, uf: 'AL' }
      ]
    },
    ytd_yoy: {
      brasil: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 3310000, volume: 336500, precoMedio: 9.84, uf: 'Nacional' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 2640000, volume: 269100, precoMedio: 9.81, uf: 'Nacional' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 2350000, volume: 239900, precoMedio: 9.80, uf: 'Nacional' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 1930000, volume: 197800, precoMedio: 9.76, uf: 'Nacional' },
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 1560000, volume: 159200, precoMedio: 9.80, uf: 'Sul' }
      ],
      sp_rj_mg_es: [
        { distribuidor: 'MARTINS ATACADISTA', faturamento: 1380000, volume: 138800, precoMedio: 9.94, uf: 'SP' },
        { distribuidor: 'ASSAÍ ATACADISTA', faturamento: 1102000, volume: 111800, precoMedio: 9.86, uf: 'SP' },
        { distribuidor: 'MAKRO ATACADISTA', faturamento: 980000, volume: 99600, precoMedio: 9.84, uf: 'RJ' },
        { distribuidor: 'CARREFOUR ATACADÃO', faturamento: 805000, volume: 82100, precoMedio: 9.81, uf: 'MG' },
        { distribuidor: 'ROLDÃO ATACADISTA', faturamento: 655000, volume: 67100, precoMedio: 9.76, uf: 'SP' }
      ],
      sul: [
        { distribuidor: 'COMERCIAL ZAFFARI', faturamento: 1560000, volume: 159200, precoMedio: 9.80, uf: 'RS' },
        { distribuidor: 'FORT ATACADISTA', faturamento: 1125000, volume: 114900, precoMedio: 9.79, uf: 'PR' },
        { distribuidor: 'CONDOR SUPER CENTER', faturamento: 1033000, volume: 105700, precoMedio: 9.77, uf: 'PR' },
        { distribuidor: 'ANGELONI', faturamento: 835000, volume: 85100, precoMedio: 9.81, uf: 'SC' },
        { distribuidor: 'IMEC SUPERMERCADOS', faturamento: 710000, volume: 72600, precoMedio: 9.78, uf: 'RS' }
      ],
      ne_no_co: [
        { distribuidor: 'ATACADÃO', faturamento: 1205000, volume: 123700, precoMedio: 9.74, uf: 'BA' },
        { distribuidor: 'HIPER BOMPREÇO', faturamento: 1023000, volume: 105500, precoMedio: 9.70, uf: 'PE' },
        { distribuidor: 'MAXXI ATACADO', faturamento: 875000, volume: 89900, precoMedio: 9.73, uf: 'CE' },
        { distribuidor: 'SUPER MUFFATO', faturamento: 750000, volume: 77400, precoMedio: 9.69, uf: 'GO' },
        { distribuidor: 'ASA BRANCA', faturamento: 630000, volume: 65400, precoMedio: 9.63, uf: 'AL' }
      ]
    }
  }
};

// Função helper para obter dados MTRIX baseado em categoria e período
export function getMtrixData(category, period) {
  const key = (category || 'total').toLowerCase();
  
  // Retorna dados da categoria específica ou TOTAL como fallback
  if (mtrixData[key] && mtrixData[key][period]) {
    return mtrixData[key][period];
  }
  
  // Fallback para TOTAL
  return mtrixData.total[period] || mtrixData.total.mes_yoy;
}
