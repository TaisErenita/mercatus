// Helpers para períodos e legendas dinâmicas

export const meses = [
  { id: 0, nome: 'Todos os Meses', abrev: 'Todos' },
  { id: 1, nome: 'Janeiro', abrev: 'Jan' },
  { id: 2, nome: 'Fevereiro', abrev: 'Fev' },
  { id: 3, nome: 'Março', abrev: 'Mar' },
  { id: 4, nome: 'Abril', abrev: 'Abr' },
  { id: 5, nome: 'Maio', abrev: 'Mai' },
  { id: 6, nome: 'Junho', abrev: 'Jun' },
  { id: 7, nome: 'Julho', abrev: 'Jul' },
  { id: 8, nome: 'Agosto', abrev: 'Ago' },
  { id: 9, nome: 'Setembro', abrev: 'Set' },
  { id: 10, nome: 'Outubro', abrev: 'Out' },
  { id: 11, nome: 'Novembro', abrev: 'Nov' },
  { id: 12, nome: 'Dezembro', abrev: 'Dez' }
];

// Meses para MTRIX (Jul/2023 - Set/2025) - 27 meses
export const mesesMTRIX = [
  // 2023 (Jul-Dez)
  { id: 1, nome: 'Julho 2023', abrev: 'Jul/23', ano: 2023, mes: 7 },
  { id: 2, nome: 'Agosto 2023', abrev: 'Ago/23', ano: 2023, mes: 8 },
  { id: 3, nome: 'Setembro 2023', abrev: 'Set/23', ano: 2023, mes: 9 },
  { id: 4, nome: 'Outubro 2023', abrev: 'Out/23', ano: 2023, mes: 10 },
  { id: 5, nome: 'Novembro 2023', abrev: 'Nov/23', ano: 2023, mes: 11 },
  { id: 6, nome: 'Dezembro 2023', abrev: 'Dez/23', ano: 2023, mes: 12 },
  // 2024 (Jan-Dez)
  { id: 7, nome: 'Janeiro 2024', abrev: 'Jan/24', ano: 2024, mes: 1 },
  { id: 8, nome: 'Fevereiro 2024', abrev: 'Fev/24', ano: 2024, mes: 2 },
  { id: 9, nome: 'Março 2024', abrev: 'Mar/24', ano: 2024, mes: 3 },
  { id: 10, nome: 'Abril 2024', abrev: 'Abr/24', ano: 2024, mes: 4 },
  { id: 11, nome: 'Maio 2024', abrev: 'Mai/24', ano: 2024, mes: 5 },
  { id: 12, nome: 'Junho 2024', abrev: 'Jun/24', ano: 2024, mes: 6 },
  { id: 13, nome: 'Julho 2024', abrev: 'Jul/24', ano: 2024, mes: 7 },
  { id: 14, nome: 'Agosto 2024', abrev: 'Ago/24', ano: 2024, mes: 8 },
  { id: 15, nome: 'Setembro 2024', abrev: 'Set/24', ano: 2024, mes: 9 },
  { id: 16, nome: 'Outubro 2024', abrev: 'Out/24', ano: 2024, mes: 10 },
  { id: 17, nome: 'Novembro 2024', abrev: 'Nov/24', ano: 2024, mes: 11 },
  { id: 18, nome: 'Dezembro 2024', abrev: 'Dez/24', ano: 2024, mes: 12 },
  // 2025 (Jan-Set)
  { id: 19, nome: 'Janeiro 2025', abrev: 'Jan/25', ano: 2025, mes: 1 },
  { id: 20, nome: 'Fevereiro 2025', abrev: 'Fev/25', ano: 2025, mes: 2 },
  { id: 21, nome: 'Março 2025', abrev: 'Mar/25', ano: 2025, mes: 3 },
  { id: 22, nome: 'Abril 2025', abrev: 'Abr/25', ano: 2025, mes: 4 },
  { id: 23, nome: 'Maio 2025', abrev: 'Mai/25', ano: 2025, mes: 5 },
  { id: 24, nome: 'Junho 2025', abrev: 'Jun/25', ano: 2025, mes: 6 },
  { id: 25, nome: 'Julho 2025', abrev: 'Jul/25', ano: 2025, mes: 7 },
  { id: 26, nome: 'Agosto 2025', abrev: 'Ago/25', ano: 2025, mes: 8 },
  { id: 27, nome: 'Setembro 2025', abrev: 'Set/25', ano: 2025, mes: 9 }
]

// Gerar legenda dinâmica baseada no período e mês selecionado
export function getPeriodoLegenda(tipoPeriodo, mesAtual = 8, anoAtual = 2025) {
  const mes = meses.find(m => m.id === mesAtual);
  const mesAbrev = mes?.abrev || 'Ago';
  const mesNome = mes?.nome || 'Agosto';
  const anoAnterior = anoAtual - 1;
  
  switch (tipoPeriodo) {
    case 'mes_yoy':
      return {
        curto: `${mesAbrev}/${anoAtual.toString().slice(-2)} vs ${mesAbrev}/${anoAnterior.toString().slice(-2)}`,
        longo: `${mesNome} ${anoAtual} vs ${mesNome} ${anoAnterior}`,
        descricao: 'Comparação mensal YoY'
      };
      
    case 'trimestre_yoy':
      const mesAnterior2 = meses[(mesAtual - 3 + 12) % 12] || meses[5];
      const mesAnterior1 = meses[(mesAtual - 2 + 12) % 12] || meses[6];
      return {
        curto: `${mesAnterior2.abrev}-${mesAnterior1.abrev}-${mesAbrev}/${anoAtual.toString().slice(-2)} vs ${mesAnterior2.abrev}-${mesAnterior1.abrev}-${mesAbrev}/${anoAnterior.toString().slice(-2)}`,
        longo: `Trimestre ${mesAnterior2.nome}-${mesAnterior1.nome}-${mesNome} ${anoAtual} vs ${anoAnterior}`,
        descricao: 'Comparação trimestral YoY'
      };
      
    case 'ytd_yoy':
      return {
        curto: `Jan-${mesAbrev}/${anoAtual.toString().slice(-2)} vs Jan-${mesAbrev}/${anoAnterior.toString().slice(-2)}`,
        longo: `Janeiro a ${mesNome} ${anoAtual} vs ${anoAnterior}`,
        descricao: 'Acumulado do ano YoY'
      };
      
    case 'mes_anterior':
    case 'mes_mom':
      const mesAnt = meses[(mesAtual - 2 + 12) % 12] || meses[6];
      return {
        curto: `${mesAbrev}/${anoAtual.toString().slice(-2)} vs ${mesAnt.abrev}/${anoAtual.toString().slice(-2)}`,
        longo: `${mesNome} ${anoAtual} vs ${mesAnt.nome} ${anoAtual}`,
        descricao: 'Mês Atual x Mês Anterior (MoM)'
      };
      
    case 'trimestre_qoq':
      const mesAtualAbrev = meses[mesAtual - 1]?.abrev || 'Ago';
      const mes2Atras = meses[(mesAtual - 3 + 12) % 12]?.abrev || 'Jun';
      const mes1Atras = meses[(mesAtual - 2 + 12) % 12]?.abrev || 'Jul';
      const mes5Atras = meses[(mesAtual - 6 + 12) % 12]?.abrev || 'Mar';
      const mes4Atras = meses[(mesAtual - 5 + 12) % 12]?.abrev || 'Abr';
      const mes3Atras = meses[(mesAtual - 4 + 12) % 12]?.abrev || 'Mai';
      return {
        curto: `${mes2Atras}-${mes1Atras}-${mesAtualAbrev}/${anoAtual.toString().slice(-2)} vs ${mes5Atras}-${mes4Atras}-${mes3Atras}/${anoAtual.toString().slice(-2)}`,
        longo: `Trimestre atual vs trimestre anterior ${anoAtual}`,
        descricao: 'Trimestre Atual x Trimestre Anterior (QoQ)'
      };
      
    case 'ytd':
      return {
        curto: `YTD Jan-${mesAbrev}/${anoAtual.toString().slice(-2)}`,
        longo: `Acumulado de Janeiro a ${mesNome} ${anoAtual}`,
        descricao: 'Acumulado do Ano (YTD)'
      };
      
    default:
      return {
        curto: `${mesAbrev}/${anoAtual.toString().slice(-2)} vs ${mesAbrev}/${anoAnterior.toString().slice(-2)}`,
        longo: `${mesNome} ${anoAtual} vs ${mesNome} ${anoAnterior}`,
        descricao: 'Comparação mensal YoY'
      };
  }
}

// Obter nome do mês por ID
export function getMesNome(mesId) {
  const mes = meses.find(m => m.id === mesId);
  return mes?.nome || 'Agosto';
}

// Obter abreviação do mês por ID
export function getMesAbrev(mesId) {
  const mes = meses.find(m => m.id === mesId);
  return mes?.abrev || 'Ago';
}
